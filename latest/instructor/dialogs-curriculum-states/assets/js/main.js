/* EduHub — Dialogs and Curriculum States. Client-side preview only.
   No account, course, or password is deleted, changed, or transmitted to a server. */
(() => {
  'use strict';
  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => [...root.querySelectorAll(q)];
  const notify=(name,detail={})=>document.dispatchEvent(new CustomEvent(`eduhub:${name}`,{detail}));
  const state = {sectionName:'C# Fundamentals',sectionOrder:2,newSectionCount:0, deletedSection:false};
  let toastTimer;
  const toast = (message) => {
    const box=$('#edToast'); $('#toastText').textContent=message;
    box.hidden=false; clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>{box.hidden=true;},6000);
  };
  $('#closeToast').addEventListener('click',()=>{$('#edToast').hidden=true;clearTimeout(toastTimer);});

  function setMessage(id,message,success=true){
    const el=$(id); if(!el)return;
    el.textContent=message;el.hidden=!message;el.classList.toggle('is-error',!success);
  }
  function setFieldError(input,message){
    const field=input.closest('.ed-field'); if(!field) return;
    input.setAttribute('aria-invalid',String(Boolean(message)));
    let tip=field.querySelector('.ed-validation-error');
    if(message){if(!tip){tip=document.createElement('small');tip.className='ed-helper ed-validation-error is-error';tip.setAttribute('role','alert');field.appendChild(tip);}tip.textContent=message;}
    else if(tip)tip.remove();
  }
  function requireTitle(input){const v=input.value.trim();const error=!v?'Section title is required.':v.length<3?'Use at least 3 characters for the section title.':'';setFieldError(input,error);return !error;}
  function requireOrder(input,exclude){
    const n=Number(input.value); const used=[state.sectionOrder];
    $$('.ed-curriculum-item[data-order]').forEach(item=>{if(item.dataset.sectionId!=='2')used.push(Number(item.dataset.order));});
    const error=!input.value?'Section order is required.':(!Number.isInteger(n)||n<1||n>999)?'Enter a whole number between 1 and 999.':(used.includes(n)&&!(exclude==='edit'&&n===state.sectionOrder))?'This section order is already in use.':'';
    setFieldError(input,error);return !error;
  }
  function resetErrors(form){$$('.ed-validation-error',form).forEach(e=>e.remove());$$('[aria-invalid]',form).forEach(i=>i.removeAttribute('aria-invalid'));}

  /* Dangerous actions are intentionally front-end previews only. */
  $('#cancelDeleteCourse').addEventListener('click',()=>{setMessage('#deleteCourseMessage','Cancellation confirmed. The course remains unchanged.');toast('Course deletion canceled.');});
  $('#confirmDeleteCourse').addEventListener('click',()=>{
    setMessage('#deleteCourseMessage','Preview confirmed. No course was deleted; connect an authorized backend endpoint to perform deletion.');
    toast('This was a UI-only delete confirmation — no course was deleted.');
    notify('delete-course-preview',{course:'JavaScript for Beginners',performed:false});
  });
  const accountInput=$('#deleteConfirm'), accountDelete=$('#confirmDeleteAccount');
  accountInput.addEventListener('input',()=>{const valid=accountInput.value==='DELETE';accountDelete.disabled=!valid;accountInput.setAttribute('aria-invalid',String(accountInput.value.length>0&&!valid));});
  $('#keepAccount').addEventListener('click',()=>{accountInput.value='';accountInput.removeAttribute('aria-invalid');accountDelete.disabled=true;toast('Account deletion canceled. Your account remains unchanged.');});
  accountDelete.addEventListener('click',()=>{
    if(accountInput.value!=='DELETE')return;
    toast('UI confirmation validated. No account was deleted and no sign-out occurred.');
    notify('delete-account-preview',{confirmed:true,performed:false});
    accountInput.value='';accountDelete.disabled=true;accountInput.removeAttribute('aria-invalid');
  });

  /* Add and edit sections: actual in-browser curriculum preview updates. */
  const addForm=$('#addSectionForm'), editForm=$('#editSectionForm');
  const addTitle=$('#newSectionTitle'), addOrder=$('#newSectionOrder');
  const editTitle=$('#editSectionName'), editOrder=$('#editSectionOrder');
  function resetAdd(){addTitle.value='Working with Collections';addOrder.value=String(4+state.newSectionCount);resetErrors(addForm);setMessage('#addSectionMessage','');}
  function resetEdit(){editTitle.value=state.sectionName;editOrder.value=String(state.sectionOrder);resetErrors(editForm);setMessage('#editSectionMessage','');}
  $('#cancelAddSection').addEventListener('click',()=>{resetAdd();toast('Section creation canceled.');});
  $('#cancelEditSection').addEventListener('click',()=>{resetEdit();toast('Unsaved section edits canceled.');});
  [addTitle,editTitle].forEach(input=>input.addEventListener('input',()=>{if(input.getAttribute('aria-invalid')==='true')requireTitle(input);}));
  [addOrder,editOrder].forEach(input=>input.addEventListener('input',()=>{if(input.getAttribute('aria-invalid')==='true')requireOrder(input,input===editOrder?'edit':'add');}));
  addForm.addEventListener('submit',e=>{
    e.preventDefault();
    const validTitle=requireTitle(addTitle),validOrder=requireOrder(addOrder,'add');
    if(!validTitle||!validOrder){(validTitle?addOrder:addTitle).focus();setMessage('#addSectionMessage','Correct the highlighted field before adding the section.',false);return;}
    const name=addTitle.value.trim(), order=Number(addOrder.value), id=`preview-${++state.newSectionCount}`;
    const wrap=document.createElement('div');wrap.className='ed-curriculum-item';wrap.dataset.sectionId=id;wrap.dataset.order=String(order);
    const button=document.createElement('button');button.className='ed-section-trigger';button.type='button';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',`${id}-lessons`);
    const grip=document.createElement('i');grip.className='fa-solid fa-grip-vertical ed-grip';grip.setAttribute('aria-hidden','true');
    const identity=document.createElement('span');identity.className='ed-section-identity';const strong=document.createElement('strong');strong.textContent=name;const small=document.createElement('small');small.textContent='0 lessons · New section';identity.append(strong,small);
    const chevron=document.createElement('i');chevron.className='fa-solid fa-chevron-down ed-chevron';chevron.setAttribute('aria-hidden','true');button.append(grip,identity,chevron);
    const lessons=document.createElement('div');lessons.className='ed-lessons';lessons.id=`${id}-lessons`;lessons.hidden=true;lessons.textContent='No lessons yet. Add a lesson from Course Curriculum.';
    wrap.append(button,lessons);$('#sectionList').appendChild(wrap);resetErrors(addForm);
    setMessage('#addSectionMessage',`“${name}” added to the local curriculum preview in position ${order}.`);
    notify('section-added',{name,order,previewOnly:true});
    toast('Section added to the local preview. Changes are not saved to a server.');
    addOrder.value=String(order+1);
  });
  editForm.addEventListener('submit',e=>{
    e.preventDefault();const validTitle=requireTitle(editTitle),validOrder=requireOrder(editOrder,'edit');
    if(!validTitle||!validOrder){(validTitle?editOrder:editTitle).focus();setMessage('#editSectionMessage','Correct the highlighted field before saving.',false);return;}
    state.sectionName=editTitle.value.trim();state.sectionOrder=Number(editOrder.value);
    $('#curriculumSectionName').textContent=state.sectionName;$('#curriculumItem2').dataset.order=String(state.sectionOrder);
    setMessage('#editSectionMessage','Section details saved in the preview. All 3 existing lessons are preserved.');
    toast('Section updated in the local preview. No backend request was made.');
    notify('section-updated',{name:state.sectionName,order:state.sectionOrder,lessonCount:3,previewOnly:true});
  });

  /* Password visibility + validation (never store, log, or transmit credentials). */
  $$('.ed-eye').forEach(button=>button.addEventListener('click',()=>{
    const input=document.getElementById(button.dataset.target);const show=input.type==='password';input.type=show?'text':'password';button.setAttribute('aria-pressed',String(show));button.setAttribute('aria-label',`${show?'Hide':'Show'} ${input.id==='currentPassword'?'current':input.id==='newPassword'?'new':'confirmed'} password`);
    $('i',button).className=`fa-regular fa-eye${show?'-slash':''}`;
  }));
  const passwordForm=$('#passwordForm');
  const resetPasswords=()=>{passwordForm.reset();resetErrors(passwordForm);setMessage('#passwordMessage','');$$('.ed-eye').forEach(b=>{const i=document.getElementById(b.dataset.target);i.type='password';b.setAttribute('aria-pressed','false');$('i',b).className='fa-regular fa-eye';});};
  $('#cancelPassword').addEventListener('click',()=>{resetPasswords();toast('Password change canceled.');});
  passwordForm.addEventListener('submit',e=>{
    e.preventDefault();const current=$('#currentPassword'),fresh=$('#newPassword'),confirm=$('#confirmPassword');
    const strong=/(?:[A-Z])/.test(fresh.value)&&/[a-z]/.test(fresh.value)&&/\d/.test(fresh.value)&&/[^A-Za-z\d]/.test(fresh.value)&&fresh.value.length>=12;
    const e1=!current.value?'Enter your current password.':'';
    const e2=!fresh.value?'Enter a new password.':!strong?'Use 12+ characters with uppercase, lowercase, a number and a symbol.':fresh.value===current.value?'The new password must differ from your current password.':'';
    const e3=!confirm.value?'Confirm your new password.':confirm.value!==fresh.value?'Passwords do not match.':'';
    [[current,e1],[fresh,e2],[confirm,e3]].forEach(([input,msg])=>setFieldError(input,msg));
    const first=[[current,e1],[fresh,e2],[confirm,e3]].find(([,err])=>err);if(first){first[0].focus();setMessage('#passwordMessage','Correct the highlighted fields to continue.',false);return;}
    setMessage('#passwordMessage','Password rules passed. This preview cannot change your password without a secure backend.');
    toast('Password validation passed. No password was updated or transmitted.');
    notify('password-validation',{valid:true,submitted:false});
    current.value='';fresh.value='';confirm.value='';
  });

  /* Expand/collapse curriculum without losing preserved lessons. */
  $('#sectionList').addEventListener('click',e=>{
    const btn=e.target.closest('.ed-section-trigger');if(!btn)return;
    const details=document.getElementById(btn.getAttribute('aria-controls'));if(!details)return;
    const open=details.hidden;details.hidden=!open;btn.setAttribute('aria-expanded',String(open));
    if(btn.id==='curriculumToggle')$('#curriculumTitle').textContent=`Curriculum section · ${open?'Expanded':'Collapsed'}`;
  });
  $('#editFromCurriculum').addEventListener('click',()=>{$('#editSectionCard').scrollIntoView({behavior:'smooth',block:'center'});editTitle.focus({preventScroll:true});});

  /* Section deletion uses Bootstrap modal if available, accessible native fallback if offline. */
  const modalEl=$('#sectionDeleteModal');let modalHandle=null;let fallbackBackdrop=null;
  function showDeleteSection(){
    $('#modalSectionName').textContent=state.sectionName;
    if(window.bootstrap?.Modal){modalHandle=bootstrap.Modal.getOrCreateInstance(modalEl);modalHandle.show();}
    else{modalEl.classList.add('show');modalEl.style.display='block';modalEl.setAttribute('aria-modal','true');modalEl.setAttribute('role','dialog');modalEl.removeAttribute('aria-hidden');fallbackBackdrop=document.createElement('div');fallbackBackdrop.className='modal-backdrop fade show';document.body.appendChild(fallbackBackdrop);document.body.classList.add('modal-open');}
  }
  function hideDeleteSection(){
    if(window.bootstrap?.Modal){modalHandle=bootstrap.Modal.getOrCreateInstance(modalEl);modalHandle.hide();}
    else{modalEl.classList.remove('show');modalEl.style.display='none';modalEl.setAttribute('aria-hidden','true');modalEl.removeAttribute('aria-modal');fallbackBackdrop?.remove();fallbackBackdrop=null;document.body.classList.remove('modal-open');}
  }
  $('#deleteSection').addEventListener('click',showDeleteSection);
  modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn=>btn.addEventListener('click',()=>{if(!window.bootstrap?.Modal)hideDeleteSection();}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modalEl.classList.contains('show')&&!window.bootstrap?.Modal)hideDeleteSection();});
  $('#confirmDeleteSection').addEventListener('click',()=>{
    hideDeleteSection();state.deletedSection=true;
    $('#curriculumItem2').hidden=true;$('#editFromCurriculum').disabled=true;$('#deleteSection').disabled=true;
    $('#curriculumTitle').textContent='Curriculum section · Deleted in preview';
    toast('Section removed from local preview only. Saved course content remains unchanged.');
    notify('section-deleted',{name:state.sectionName,previewOnly:true});
  });

  /* The cancel confirmation discards only unsaved field edits, not saved preview changes. */
  $('#keepEditing').addEventListener('click',()=>{$('#editSectionCard').scrollIntoView({behavior:'smooth',block:'center'});editTitle.focus({preventScroll:true});toast('Continue editing — no changes were discarded.');});
  $('#discardChanges').addEventListener('click',()=>{
    resetAdd();resetEdit();resetPasswords();
    accountInput.value='';accountDelete.disabled=true;accountInput.removeAttribute('aria-invalid');
    toast('Unsaved form edits discarded. Saved preview curriculum remains unchanged.');
    notify('changes-discarded',{unsavedOnly:true});
  });
})();
