/* ===============================================================
   08. INTERACTIVE STATE EXAMPLES - no network/storage/API calls.
   =============================================================== */
(() => {
  'use strict';
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  // Keep all inputs empty on load. Never retain typed passwords across navigation.
  const showButton = (btn) => {
    const input = document.getElementById(btn.dataset.show);
    if (!input || input.disabled) return;
    const shown = input.type === 'password';
    input.type = shown ? 'text' : 'password';
    btn.setAttribute('aria-pressed', String(shown));
    btn.setAttribute('aria-label', (shown ? 'Hide' : 'Show') + ' ' + (input.name === 'confirm' ? 'confirm password' : 'new password'));
    const i = btn.querySelector('i');
    if (i) i.className = shown ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
  };
  document.querySelectorAll('[data-show]').forEach(btn => btn.addEventListener('click', () => showButton(btn)));
  const notice = (form, type, title, detail) => {
    let banner = form.querySelector('.feedback-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'feedback-banner';
      banner.setAttribute('role','status');
      banner.setAttribute('aria-live','polite');
      banner.innerHTML = '<span class="notice-icon" aria-hidden="true"></span><div class="flex-grow-1"><p class="feedback-title"></p><p class="feedback-copy"></p></div>';
      form.querySelector('.fields-panel').appendChild(banner);
    }
    banner.classList.toggle('good', type==='good');
    banner.classList.toggle('bad', type!=='good');
    banner.querySelector('.feedback-title').textContent = title;
    banner.querySelector('.feedback-copy').textContent = detail;
    const icon = banner.querySelector('.notice-icon');
    icon.textContent = type==='good' ? '✓' : '!';
  };
  const setState = (el,state) => {
    const frame = el.closest('.field-frame');
    frame.classList.toggle('field-valid',state==='good');
    frame.classList.toggle('field-invalid',state==='bad');
    if(state==='bad') el.setAttribute('aria-invalid','true'); else el.removeAttribute('aria-invalid');
  };
  const inspect = (form, announce = false) => {
    const p = form.querySelector('[name="password"]');
    const c = form.querySelector('[name="confirm"]');
    const mode = form.dataset.mode;
    const entered = p.value.length>0 || c.value.length>0;
    if (!entered && !announce) return;
    if (!pattern.test(p.value)) {
      setState(p,'bad'); setState(c, c.value && c.value !== p.value ? 'bad':'neutral');
      if(mode==='matching' || mode==='mismatch' || mode==='retry') notice(form,'bad','Password requirements not met','Use at least 8 characters, including uppercase, lowercase and a number.');
      if(mode==='requirements') {
        const error=form.querySelector('.inline-error');
        if(error) error.textContent='Enter a password that meets the requirements above.';
      } else if(announce) notice(form,'bad','Password requirements not met','Use at least 8 characters, including uppercase, lowercase and a number.');
      return false;
    }
    setState(p,'good');
    if (!c.value || p.value !== c.value) {
      setState(c,'bad');
      if(mode==='matching' || mode==='mismatch' || announce) notice(form,'bad','Passwords don’t match','Re-enter the same password in both fields.');
      return false;
    }
    setState(c,'good');
    if(mode==='matching' || mode==='mismatch') {
      notice(form,'good','Passwords match','Your new password meets the requirements and is ready to save.');
    } else if(announce) {
      notice(form,'good','Validation passed — demo only','Connect your reset-password API to save changes. No password has been changed.');
    }
    return true;
  };
  for(const form of document.querySelectorAll('.reset-form:not([data-mode="progress"])')) {
    const p=form.querySelector('[name="password"]');
    const c=form.querySelector('[name="confirm"]');
    // Clear native fields on load/back-forward restoration to protect secrets.
    p.value=''; c.value='';
    p.addEventListener('input',()=>inspect(form,false));
    c.addEventListener('input',()=>inspect(form,false));
    form.addEventListener('submit', e=> {
      e.preventDefault();
      const passed=inspect(form,true);
      if (!passed) { (p.getAttribute('aria-invalid')==='true'?p:c).focus(); return; }
      // UI validation only. Deliberately no fetch / localStorage / sessionStorage.
      notice(form,'good','Validated — demonstration only','No password was stored, reset, or sent to a server.');
    });
  }
  // If Font Awesome is not available, display inline line-art icons.
  const fontCheck = () => {
    const test=document.createElement('i');
    test.className='fa-solid fa-lock';
    test.style.cssText='position:absolute;visibility:hidden;';
    document.body.append(test);
    const loaded=getComputedStyle(test,'::before').fontFamily.includes('Font Awesome') &&
       document.fonts.check('900 16px "Font Awesome 6 Free"');
    test.remove();
    document.documentElement.classList.toggle('no-fa',!loaded);
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fontCheck);
  else fontCheck();
})();