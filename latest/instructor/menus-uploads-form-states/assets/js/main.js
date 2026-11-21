/* EduHub Instructor UI state reference
 * All actions are UI-only examples. Production uploads/submissions require backend endpoints.
 */
(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  let toastTimer = null;
  const toastEl = $('#toast');
  function toast(message) {
    toastEl.textContent = message; toastEl.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { toastEl.hidden = true; }, 4500);
  }

  /* 01. Profile menu — preserve its initial open Figma state. */
  const accountToggle = $('#accountMenuToggle');
  accountToggle?.addEventListener('click', () => {
    const region = $('#accountMenuBody'); const next = region.hidden;
    region.hidden = !next; accountToggle.setAttribute('aria-expanded', String(next));
    $('#accountMenuCaret').className = `fa-solid fa-chevron-${next?'up':'down'}`;
  });

  /* 02. Generic keyboard accessible dialog with focus return. */
  const backdrop = $('#confirmationModal');
  let modalAction = null, modalSource = null, modalKind = null;
  const modalFocusables = () => $$('button:not(:disabled),input:not(:disabled),select:not(:disabled)', backdrop).filter(x => !x.closest('[hidden]'));
  function openModal(title, description, buttonLabel, action, kind='generic') {
    modalSource = document.activeElement; modalAction = action; modalKind = kind;
    $('#modalTitle').textContent = title;
    $('#modalDescription').textContent = description;
    $('#modalConfirm').textContent = buttonLabel;
    $('#modalConfirm').classList.toggle('ed-btn--danger', kind === 'delete');
    $('#modalConfirm').classList.toggle('ed-btn--primary', kind !== 'delete');
    $('#customRangeFields').hidden = kind !== 'date';
    $('#dateRangeError').hidden = true;
    backdrop.hidden = false;
    document.body.style.overflow='hidden';
    $('#modalCancel').focus();
  }
  function closeModal() {
    backdrop.hidden = true; document.body.style.overflow=''; modalAction = null;
    if (modalSource && typeof modalSource.focus === 'function') modalSource.focus();
  }
  $('#closeModal').addEventListener('click', closeModal);
  $('#modalCancel').addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', e => {
    if (backdrop.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
    if (e.key === 'Tab') {
      const els = modalFocusables(); if (!els.length) return;
      const first = els[0], last = els[els.length-1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  $('#modalConfirm').addEventListener('click', () => { if (modalAction) modalAction(); if (modalKind !== 'date' || $('#dateRangeError').hidden) closeModal(); });
  $('#submitCourseAction')?.addEventListener('click', () => openModal('Submit course for review?',
    'JavaScript for Beginners will be sent to an administrator for approval. This reference only demonstrates the confirmation UI; no server request is made.',
    'Confirm submission', () => {
      $('#submitCourseAction').disabled = true; $('#submitCourseAction').textContent = 'Pending Approval';
      $('.course-description').innerHTML='<strong>JavaScript for Beginners</strong> · Pending Approval (UI demo)';
      toast('Submission state updated locally. No server request was made.');
    }));
  $('#deleteCourseAction')?.addEventListener('click', () => openModal('Delete course?',
    'Deleting this course would remove its lessons and materials. This is a UI-only confirmation: no course is actually deleted.',
    'Preview delete', () => toast('Deletion preview confirmed. No course was deleted.'), 'delete'));

  /* 03. Notification open / close. */
  $('#closeNotifications')?.addEventListener('click', () => { $('#notificationPanel').hidden=true; $('#openNotifications').hidden=false; $('#openNotifications').focus(); });
  $('#openNotifications')?.addEventListener('click', () => { $('#notificationPanel').hidden=false; $('#openNotifications').hidden=true; $('#closeNotifications').focus(); });

  /* 04. Filter menus: independent selections + custom enrollment date range. */
  function selectOption(cell, btn, displayValue=btn.dataset.value) {
    $$('.ed-menu-option', cell).forEach(option => {
      const selected = option === btn;
      option.classList.toggle('is-selected', selected);
      option.setAttribute('aria-pressed', String(selected));
      option.querySelector('i.fa-check')?.remove();
      if (selected) { const check = document.createElement('i');check.className='fa-solid fa-check';check.setAttribute('aria-hidden','true');option.appendChild(check); }
    });
    $('.filter-current', cell).textContent = displayValue;
    document.dispatchEvent(new CustomEvent('eduhub:filter-change', {detail:{filter:cell.dataset.filter,value:displayValue}}));
  }
  $$('.filter-cell').forEach(cell => {
    const menu=$('.ed-menu-wrap',cell), trigger=$('.ed-filter-trigger',cell);
    trigger.addEventListener('click',()=>{
      const expanded = menu.hidden;
      menu.hidden = !expanded;
      trigger.setAttribute('aria-expanded',String(expanded));
      $('i',trigger).className=`fa-solid fa-chevron-${expanded?'up':'down'}`;
    });
    $$('.ed-menu-option',cell).forEach(btn=>btn.addEventListener('click',()=>{
      if(btn.dataset.value==='Custom range...'){
        openModal('Custom enrollment date range','Select a start and end date to filter student enrollments.','Apply range',()=>{
          const from=$('#dateFrom').value,to=$('#dateTo').value;
          const valid=!!(from && to && from<=to);
          $('#dateRangeError').hidden=valid;
          if(valid){selectOption(cell,btn,`${from} to ${to}`);toast('Custom enrollment date range applied.');}
        },'date');
      } else {
        selectOption(cell,btn);
        if (matchMedia('(max-width: 767px)').matches) {
          menu.hidden=true;trigger.setAttribute('aria-expanded','false');$('i',trigger).className='fa-solid fa-chevron-down';
        }
      }
    }));
  });

  /* 05. Video input validation and local progress simulation; not a real upload. */
  const maxVideoBytes=500*1024*1024;
  let uploadTimer=null, progress=64, uploadBytes=148*1024*1024, currentFilename='variables-data-types.mp4';
  const formatMB=b=>(b/1024/1024).toFixed(b>=100*1024*1024?0:1);
  function updateProgress(v){
    progress=Math.max(0,Math.min(100,Math.round(v)));
    $('#progressPercent').textContent=`${progress}%`;
    $('#progressStatus').textContent=`Uploading · ${formatMB(uploadBytes*progress/100)} MB of ${formatMB(uploadBytes)} MB · ${progress}%`;
    $('#uploadFill').style.width=`${progress}%`;
    $('#uploadProgress').setAttribute('aria-valuenow',String(progress));
  }
  function setUploadTip(message,kind='blue'){
    const tip=$('#uploadTip'); tip.className='ed-guidance ed-guidance--'+kind;
    $('i',tip).className=`fa-solid fa-${kind==='blue'?'circle-info':'circle-check'}`;
    $('span',tip).textContent=message;
  }
  function cancelUpload(){clearInterval(uploadTimer);uploadTimer=null;
    $('#progressStatus').textContent='Upload canceled';
    setUploadTip('Transfer canceled. Choose another file to start again.');
    $('#cancelUpload').hidden=true;$('#restartUpload').hidden=false;
  }
  $('#cancelUpload').addEventListener('click', cancelUpload);
  $('#restartUpload').addEventListener('click',()=>$('#videoFileInput').click());
  $('#chooseVideo').addEventListener('click',()=>$('#videoFileInput').click());
  function setFileError(message,fileName=''){
    $('#videoErrorBadge').textContent='● Upload failed';
    $('#videoErrorBadge').className='ed-badge ed-badge--red';
    $('#errorFilename').textContent=fileName;
    $('#videoErrorAlert').className='ed-guidance ed-guidance--error';
    $('i',$('#videoErrorAlert')).className='fa-solid fa-circle-exclamation';
    $('#videoErrorText').textContent=message;
  }
  $('#removeVideo').addEventListener('click',()=>{
    $('#videoFileInput').value='';
    $('#errorFilename').textContent='No video selected';
    $('#videoErrorBadge').className='ed-badge';$('#videoErrorBadge').textContent='No file';
    $('#videoErrorAlert').className='ed-guidance ed-guidance--blue';
    $('i',$('#videoErrorAlert')).className='fa-solid fa-circle-info';
    $('#videoErrorText').textContent='Choose an MP4, MOV or WebM file of 500 MB or less.';
  });
  $('#videoFileInput').addEventListener('change',e=>{
    const f=e.target.files?.[0]; if(!f) return;
    if (!/\.(mp4|mov|webm)$/i.test(f.name) || (f.type && !['video/mp4','video/quicktime','video/webm'].includes(f.type))) {
      setFileError('Unsupported video format. Use MP4, MOV or WebM.',f.name);return;
    }
    if (f.size>maxVideoBytes){setFileError('This file exceeds the 500 MB limit. Compress the video or choose a smaller file, then try again.',`${f.name} · ${formatMB(f.size)} MB`);return;}
    clearInterval(uploadTimer);currentFilename=f.name;uploadBytes=Math.max(f.size,1);
    $('#progressFilename').textContent=f.name;$('#cancelUpload').hidden=false;$('#restartUpload').hidden=true;
    $('#videoErrorBadge').className='ed-badge ed-badge--green';$('#videoErrorBadge').textContent='● File validated';
    $('#errorFilename').textContent=f.name;
    $('#videoErrorAlert').className='ed-guidance ed-guidance--blue';
    $('i',$('#videoErrorAlert')).className='fa-solid fa-circle-info';
    $('#videoErrorText').textContent='Accepted file. The transfer on the left is simulated in this frontend demonstration.';
    setUploadTip('Local progress simulation running. Connect a real upload API for production.');
    updateProgress(0);
    uploadTimer=setInterval(()=>{
      updateProgress(progress+Math.max(3,Math.round((100-progress)*.18)));
      if(progress>=100){clearInterval(uploadTimer);uploadTimer=null;
        $('#progressStatus').textContent=`Ready to submit · ${formatMB(uploadBytes)} MB · 100% (UI demo)`;
        setUploadTip('Demo complete. The file was not uploaded to a server.','success');
        $('#cancelUpload').hidden=true;$('#restartUpload').hidden=false;
      }
    },350);
  });

  /* 06. Thumbnail replacement, removal and drag/drop. */
  const thumbInput=$('#thumbnailInput'), thumbImg=$('#thumbnailImg'), thumbPreview=$('#thumbnailPreview');
  let imageObjectUrl=null;
  const thumbError=$('#thumbnailError');
  function setThumbError(message){thumbError.textContent=message;thumbError.hidden=!message;}
  function handleThumbnail(file){
    if (!file) return;
    if(!['image/png','image/jpeg'].includes(file.type) || !/\.(jpg|jpeg|png)$/i.test(file.name)){setThumbError('Choose a PNG or JPEG image.');return;}
    if(file.size>5*1024*1024){setThumbError('Image exceeds 5 MB. Please choose a smaller PNG or JPEG.');return;}
    setThumbError('');
    if(imageObjectUrl) URL.revokeObjectURL(imageObjectUrl);
    imageObjectUrl=URL.createObjectURL(file);
    const inspector=new Image();inspector.onload=()=>{
      thumbImg.src=imageObjectUrl;thumbPreview.classList.remove('is-empty');
      $('#thumbnailMeta').textContent=`${file.name} · ${Math.round(file.size/1024)} KB · ${inspector.naturalWidth} × ${inspector.naturalHeight}`;
      $('#dropzoneText').textContent='Drop your image to replace the thumbnail';
      toast('Thumbnail preview updated locally.');
    };
    inspector.onerror=()=>setThumbError('The selected image could not be previewed.');
    inspector.src=imageObjectUrl;
  }
  $('#chooseThumbnail').addEventListener('click',()=>thumbInput.click());
  thumbInput.addEventListener('change',e=>handleThumbnail(e.target.files?.[0]));
  $('#removeThumbnail').addEventListener('click',()=>{
    thumbPreview.classList.add('is-empty');thumbInput.value='';setThumbError('');
    $('#thumbnailMeta').textContent='No image selected';
    $('#dropzoneText').textContent='Drop a PNG or JPEG image here, or click to select';
    if(imageObjectUrl){URL.revokeObjectURL(imageObjectUrl);imageObjectUrl=null;}
  });
  const dropzone=$('#thumbnailDropzone');
  ['dragenter','dragover'].forEach(t=>dropzone.addEventListener(t,e=>{e.preventDefault();dropzone.classList.add('is-dragging');}));
  ['dragleave','drop'].forEach(t=>dropzone.addEventListener(t,e=>{e.preventDefault();dropzone.classList.remove('is-dragging');}));
  dropzone.addEventListener('drop',e=>handleThumbnail(e.dataTransfer?.files?.[0]));
  dropzone.addEventListener('click',()=>thumbInput.click());
  dropzone.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();thumbInput.click();}});

  /* 07. Pricing and representative form validation. */
  const pricingFields=$('#pricingFields'),pricingDescription=$('#pricingDescription');
  $$('input[name=priceType]').forEach(input=>input.addEventListener('change',()=>{
    const paid=$('input[name=priceType]:checked').value==='paid';
    pricingFields.hidden=!paid;
    pricingDescription.textContent=paid ? 'Enter a course price and currency. Paid courses become enrollable only after admin approval.' : 'Students can enroll at no cost after admin approval. Course Price and currency fields are hidden for a free course.';
    $('#pricingCard h2').textContent=`Pricing · ${paid?'Paid':'Free'} selected`;
  }));
  $('#coursePrice').addEventListener('input',()=>{
    const valid=Number($('#coursePrice').value)>0;
    $('#coursePrice').classList.toggle('is-invalid',!valid);
    $('#priceHelp').hidden=valid;$('#coursePrice').setAttribute('aria-invalid',String(!valid));
  });
  function validateField(input,message,valid){
    input.classList.toggle('is-invalid',!valid);input.classList.toggle('is-valid',valid);
    input.setAttribute('aria-invalid',String(!valid));
    const msg=$(message);msg.classList.toggle('is-success',valid);
    msg.textContent=valid?(input=== $('#courseTitle')?'Course title is valid.':'Duration is valid.'):
      (input===$('#courseTitle')?'Use at least 5 characters so students understand your course topic.':'Upload a video and confirm a duration greater than 00:00 before saving.');
    return valid;
  }
  function validDuration(s){const m=/^(\d{1,3}):([0-5]\d)$/.exec(s.trim());return !!m && (+m[1]*60 + +m[2])>0;}
  const courseTitle=$('#courseTitle'), duration=$('#lessonDuration');
  function validateTitle(){return validateField(courseTitle,'#courseTitleError',courseTitle.value.trim().length>=5);}
  function validateDuration(){return validateField(duration,'#lessonDurationError',validDuration(duration.value));}
  ['input','blur'].forEach(evt=>{courseTitle.addEventListener(evt,validateTitle);duration.addEventListener(evt,validateDuration);});
  // Ctrl/Cmd+Enter offers an integration-friendly validation exercise without adding an off-design button.
  document.addEventListener('keydown',e=>{
    if ((e.ctrlKey||e.metaKey)&&e.key==='Enter'&&backdrop.hidden){
      e.preventDefault();const t=validateTitle(),d=validateDuration();
      if(!t)courseTitle.focus();else if(!d)duration.focus();
      else toast('All representative fields are valid. No data was sent to a server.');
    }
  });
})();
