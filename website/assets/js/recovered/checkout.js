
    'use strict';
    /* ============================================================
       1. Navigation and accessible notices (no external JS required)
       ============================================================ */
    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];
    let toastTimeout;
    function notify(message){
      const el=$('#toastMessage');
      el.textContent=message; el.hidden=false;
      clearTimeout(toastTimeout);
      toastTimeout=setTimeout(()=>{el.hidden=true;},4500);
    }
    $('#mobileMenuButton').addEventListener('click',()=>$('#menuDialog').showModal());
    $$('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
    $$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();}));
    $$('[data-notifications]').forEach(button=>button.addEventListener('click',()=>notify('Notifications will link to the full Notifications page when it is implemented.')));
    $$('[data-search-form]').forEach(form=>form.addEventListener('submit',event=>{
      event.preventDefault();
      const q=new FormData(form).get('q')?.toString().trim()||'';
      window.location.href='../public/explore-courses.html'+(q?'?q='+encodeURIComponent(q):'');
    }));
    /* ============================================================
       2. Payment method and field interactions (demo only)
       No form data is transmitted, saved, logged or persisted.
       ============================================================ */
    const form=$('#paymentDemoForm');
    const fields={
      cardholder:{input:$('#cardholder'),group:$('#holderGroup'),error:$('#holderError')},
      cardNumber:{input:$('#cardNumber'),group:$('#numberGroup'),error:$('#numberError')},
      expiration:{input:$('#expiration'),group:$('#expiryGroup'),error:$('#expiryError')},
      cvv:{input:$('#cvv'),group:$('#cvvGroup'),error:$('#cvvError')}
    };
    function fieldError(key,message){
      fields[key].group.classList.toggle('has-error',!!message);
      fields[key].input.classList.toggle('is-invalid',!!message);
      fields[key].input.setAttribute('aria-invalid',message?'true':'false');
      fields[key].error.textContent=message||'';
    }
    function updateMethod(){
      $$('.method-option').forEach(label=>label.classList.toggle('selected',label.querySelector('input').checked));
    }
    $$('input[name="method"]').forEach(input=>input.addEventListener('change',updateMethod));
    $('#cardNumber').addEventListener('input',event=>{
      const digits=event.target.value.replace(/\D/g,'').slice(0,16);
      event.target.value=digits.replace(/.{4}/g,'$& ').trim();
      fieldError('cardNumber','');
    });
    $('#expiration').addEventListener('input',event=>{
      let digits=event.target.value.replace(/\D/g,'').slice(0,4);
      event.target.value=digits.length>2?digits.slice(0,2)+' / '+digits.slice(2):digits;
      fieldError('expiration','');
    });
    $('#cvv').addEventListener('input',event=>{event.target.value=event.target.value.replace(/\D/g,'').slice(0,4);fieldError('cvv','');});
    $('#cardholder').addEventListener('input',()=>fieldError('cardholder',''));
    function validateDemo(){
      const name=fields.cardholder.input.value.trim();
      const card=fields.cardNumber.input.value.replace(/\s/g,'');
      const expiration=fields.expiration.input.value.replace(/\s/g,'');
      const code=fields.cvv.input.value.trim();
      let first=null;
      const messages={
        cardholder: /^.{2,70}$/.test(name)?'':'Enter a demo name (at least two characters).',
        cardNumber: card==='4242424242424242'?'':'Use only the test card 4242 4242 4242 4242. Never enter a real card.',
        expiration: expiration==='12/30'?'':'For the demo, enter 12 / 30.',
        cvv: code==='123'?'':'For the demo, enter 123. Never enter a real security code.'
      };
      Object.entries(messages).forEach(([key,message])=>{fieldError(key,message);if(message&&!first)first=fields[key].input;});
      if(first){first.focus();notify('This page accepts test-only details. No real card information should be entered.');return false;}
      return true;
    }
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(!validateDemo())return;
      $('#checkoutDialogBody').textContent='Demo details were validated locally. No payment was processed, no charge was made, and no enrollment was created. Connect a PCI-compliant hosted checkout/payment provider before enabling real purchases.';
      // Immediately clear sensitive-shaped test values after validation.
      form.reset();Object.keys(fields).forEach(key=>fieldError(key,''));updateMethod();
      $('#checkoutDialog').showModal();
    });
  