/** EduHub global behaviors. Bootstrap owns modals, dropdowns, collapse and offcanvas. */
(() => {
  'use strict';

  const initBootstrap = (root = document) => {
    if (!window.bootstrap) {
      console.warn('EduHub: bootstrap.bundle.min.js is required before main.js.');
      return;
    }
    root.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      window.bootstrap.Tooltip.getOrCreateInstance(el);
    });
    root.querySelectorAll('[data-bs-toggle="popover"]').forEach((el) => {
      window.bootstrap.Popover.getOrCreateInstance(el);
    });
  };

  // Only UI behavior not provided by the Bootstrap Data API.
  const initSidebarToggle = () => {
    document.querySelectorAll('[data-eduhub-sidebar-collapse]').forEach((button) => {
      button.addEventListener('click', () => {
        const collapsed = document.body.classList.toggle('edu-sidebar-collapsed');
        button.setAttribute('aria-pressed', String(collapsed));
        button.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
        button.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
        const icon = button.querySelector('i');
        icon?.classList.toggle('fa-angles-right', collapsed);
        icon?.classList.toggle('fa-angles-left', !collapsed);
      });
    });
  };

  // Mark the matching link current on built pages; retain author-specified states.
  const initCurrentRoute = () => {
    const current = window.location.pathname.replace(/\/+$/, '') || '/';
    document.querySelectorAll('a[data-eduhub-route]').forEach((link) => {
      const url = new URL(link.href, window.location.href);
      if (url.pathname.replace(/\/+$/, '') === current) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  };

  const initialize = () => {
    initBootstrap();
    initSidebarToggle();
    initCurrentRoute();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();


/* Homepage search/category filtering — append to assets/js/main.js. */
(() => {
  "use strict";
  const initHomepage = () => {
    const form = document.getElementById("eduCourseSearch");
    if (!form) return;
    const input = document.getElementById("eduCourseQuery");
    const cards = [...document.querySelectorAll(".edu-course-item")];
    const empty = document.getElementById("eduNoResults");
    const status = document.getElementById("eduCourseResults");
    const categories = [...document.querySelectorAll("[data-course-category]")];
    const apply = (query = "", category = "") => {
      const normalized = query.trim().toLowerCase();
      let count = 0;
      cards.forEach(card => {
        const matches = (!normalized || card.dataset.search.includes(normalized)) &&
          (!category || card.dataset.category === category);
        card.classList.toggle("d-none", !matches);
        if (matches) count++;
      });
      empty.classList.toggle("d-none", count > 0);
      status.textContent = `${count} course${count === 1 ? "" : "s"} found`;
      categories.forEach(link => {
        const selected = !!category && link.dataset.courseCategory === category;
        link.classList.toggle("border-primary", selected);
        if (selected) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };
    form.addEventListener("submit", event => {
      event.preventDefault();
      apply(input.value);
      document.getElementById("featured-courses").scrollIntoView({behavior: "smooth"});
    });
    input.addEventListener("input", () => apply(input.value));
    categories.forEach(link => link.addEventListener("click", () => {
      input.value = "";
      apply("", link.dataset.courseCategory);
    }));
    const reset = () => { input.value = ""; apply(); };
    document.getElementById("eduResetCourses").addEventListener("click", reset);
    document.getElementById("eduClearSearch").addEventListener("click", reset);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomepage, {once: true});
  } else initHomepage();
})();


/* ZIP #4 — Add Lesson: progressive client-side UI behavior */
(() => {
  "use strict";
  const init = () => {
    const form = document.getElementById("eduAddLessonForm");
    if (!form) return;
    const videoInput = document.getElementById("eduVideoFile");
    const videoZone = document.getElementById("eduVideoDropzone");
    const videoStatus = document.getElementById("eduVideoStatus");
    const videoPreview = document.getElementById("eduVideoPreview");
    const duration = document.getElementById("eduLessonDuration");
    const resourceInput = document.getElementById("eduResourceFiles");
    const resourceList = document.getElementById("eduResourceList");
    const resourceEmpty = document.getElementById("eduResourceEmpty");
    const resourceStatus = document.getElementById("eduResourceStatus");
    const submitStatus = document.getElementById("eduLessonSubmitStatus");
    let previewUrl = null;
    const resources = new Map();
    const maxVideo = 500 * 1024 * 1024;
    const maxResource = 25 * 1024 * 1024;
    const videoTypes = new Set(["video/mp4", "video/quicktime", "video/webm"]);
    const resourceExtensions = new Set(["pdf", "docx", "pptx", "zip"]);
    const formatDuration = seconds => {
      const n = Math.floor(seconds);
      return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
    };
    const setVideo = file => {
      if (!file) return;
      if (!videoTypes.has(file.type) && !/\.(mp4|mov|webm)$/i.test(file.name)) {
        videoStatus.textContent = "Choose an MP4, MOV or WebM video."; return;
      }
      if (file.size > maxVideo) { videoStatus.textContent = "Video must not exceed 500 MB."; return; }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = URL.createObjectURL(file);
      videoPreview.src = previewUrl;
      videoPreview.classList.remove("d-none");
      videoStatus.textContent = `Selected: ${file.name} (${(file.size / 1048576).toFixed(1)} MB). Video is local and has not been uploaded.`;
    };
    document.getElementById("eduChooseVideo").addEventListener("click", e => { e.stopPropagation(); videoInput.click(); });
    videoZone.addEventListener("click", e => { if (!e.target.closest("button")) videoInput.click(); });
    videoZone.addEventListener("keydown", e => { if (e.target === videoZone && ["Enter", " "].includes(e.key)) { e.preventDefault(); videoInput.click(); } });
    videoInput.addEventListener("change", () => setVideo(videoInput.files[0]));
    videoZone.addEventListener("dragover", e => { e.preventDefault(); videoZone.classList.add("is-dragging"); });
    videoZone.addEventListener("dragleave", () => videoZone.classList.remove("is-dragging"));
    videoZone.addEventListener("drop", e => { e.preventDefault(); videoZone.classList.remove("is-dragging"); setVideo(e.dataTransfer.files[0]); });
    videoPreview.addEventListener("loadedmetadata", () => { if (Number.isFinite(videoPreview.duration)) duration.value = formatDuration(videoPreview.duration); });
    document.getElementById("eduChooseResources").addEventListener("click", () => resourceInput.click());
    const renderResources = () => {
      resourceList.replaceChildren();
      resources.forEach((file, key) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex align-items-center justify-content-between gap-2";
        const label = document.createElement("span"); label.className = "text-break"; label.textContent = `${file.name} (${(file.size / 1048576).toFixed(1)} MB)`;
        const remove = document.createElement("button"); remove.type = "button"; remove.className = "btn btn-sm btn-outline-danger"; remove.textContent = "Remove";
        remove.setAttribute("aria-label", `Remove ${file.name}`);
        remove.addEventListener("click", () => { resources.delete(key); renderResources(); });
        li.append(label, remove); resourceList.append(li);
      });
      resourceList.classList.toggle("d-none", resources.size === 0);
      resourceEmpty.classList.toggle("d-none", resources.size > 0);
    };
    resourceInput.addEventListener("change", () => {
      const errors = [];
      for (const file of resourceInput.files) {
        const ext = file.name.split(".").pop().toLowerCase();
        if (!resourceExtensions.has(ext)) { errors.push(`${file.name}: unsupported format`); continue; }
        if (file.size > maxResource) { errors.push(`${file.name}: exceeds 25 MB`); continue; }
        resources.set(`${file.name}:${file.size}:${file.lastModified}`, file);
      }
      resourceStatus.textContent = errors.join("; ") || `${resources.size} resource(s) selected locally.`;
      resourceInput.value = ""; renderResources();
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      form.classList.add("was-validated");
      if (!form.checkValidity()) { submitStatus.textContent = "Complete the required fields before saving."; form.querySelector(":invalid")?.focus(); return; }
      const payload = {
        title: form.elements.title.value.trim(), description: form.elements.description.value.trim(),
        section: form.elements.section.value, order: Number(form.elements.order.value),
        duration: duration.value, videoName: videoPreview.classList.contains("d-none") ? null : videoStatus.textContent,
        resourceNames: [...resources.values()].map(file => file.name)
      };
      if (!payload.title) { document.getElementById("eduLessonTitle").setCustomValidity("Title is required"); form.reportValidity(); return; }
      submitStatus.textContent = "Form validated. Connect the lesson API to persist data and upload the selected files; nothing has been saved to the server.";
      form.dispatchEvent(new CustomEvent("eduhub:lesson-ready", { bubbles: true, detail: payload }));
    });
    document.getElementById("eduLessonTitle").addEventListener("input", e => e.target.setCustomValidity(""));
    window.addEventListener("pagehide", () => { if (previewUrl) URL.revokeObjectURL(previewUrl); });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true}); else init();
})();


/* ZIP #4 Course Curriculum — client-side UI behavior; persistence requires backend. */
(() => {
  "use strict";
  function initCurriculum() {
    const accordion = document.getElementById("eduCurriculumAccordion");
    if (!accordion || !window.bootstrap) return;
    const status = document.getElementById("eduCurriculumStatus");
    const sectionModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("eduSectionModal"));
    const deleteModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("eduDeleteModal"));
    const sectionForm = document.getElementById("eduSectionForm");
    const title = document.getElementById("eduSectionTitle");
    let editing = null, pendingDelete = null;
    const announce = message => { status.textContent = message; };
    const emit = (type, detail) => accordion.dispatchEvent(new CustomEvent("eduhub:curriculum-change", {bubbles:true,detail:{type,...detail}}));
    const updateCounts = () => {
      const sections = [...accordion.querySelectorAll(".edu-curriculum-section")];
      const lessons = accordion.querySelectorAll(".edu-curriculum-lesson").length;
      document.getElementById("eduCurriculumCounts").textContent = `${sections.length} sections / ${lessons} lessons`;
      sections.forEach(section => {
        const count = section.querySelectorAll(".edu-curriculum-lesson").length;
        const expanded = section.querySelector(".accordion-collapse").classList.contains("show");
        section.querySelector(".edu-section-count").textContent = `${count} lesson${count===1?"":"s"} · ${expanded?"Expanded":"Collapsed"}`;
      });
    };
    const makeSection = (name) => {
      const id = `eduNewSection${Date.now()}`;
      const section = document.createElement("section");
      section.className = "accordion-item edu-curriculum-section mb-3";
      section.dataset.sectionId = id;
      const heading = document.createElement("h2"); heading.className="accordion-header";
      const head = document.createElement("div"); head.className="edu-curriculum-heading d-flex align-items-center gap-2 p-3";
      const move = document.createElement("button"); move.type="button";move.className="edu-curriculum-drag btn btn-sm btn-link text-secondary";move.setAttribute("aria-label","Move section");move.innerHTML='<i class="fa-solid fa-grip-vertical" aria-hidden="true"></i>';
      const toggle = document.createElement("button");toggle.type="button";toggle.className="accordion-button flex-grow-1 p-0 bg-transparent shadow-none";toggle.dataset.bsToggle="collapse";toggle.dataset.bsTarget=`#${id}`;toggle.setAttribute("aria-expanded","true");toggle.setAttribute("aria-controls",id);
      const label=document.createElement("span");const strong=document.createElement("strong");strong.className="edu-section-name";strong.textContent=name;const count=document.createElement("small");count.className="d-block text-secondary mt-1 edu-section-count";count.textContent="0 lessons · Expanded";label.append(strong,count);toggle.append(label);
      const actions=document.createElement("div");actions.className="dropdown";actions.innerHTML='<button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Section actions"><i class="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i></button><ul class="dropdown-menu dropdown-menu-end"><li><button class="dropdown-item" type="button" data-action="edit-section">Edit Section</button></li><li><button class="dropdown-item text-danger" type="button" data-action="delete-section">Delete Section</button></li></ul>';
      head.append(move,toggle,actions);heading.append(head);
      const collapse=document.createElement("div");collapse.id=id;collapse.className="accordion-collapse collapse show";
      const body=document.createElement("div");body.className="accordion-body pt-0 px-3 pb-3";
      body.innerHTML='<ul class="list-unstyled edu-curriculum-lessons mb-3"></ul><a class="btn btn-outline-primary" href="add-lesson.html"><i class="fa-solid fa-plus me-2" aria-hidden="true"></i>Add Lesson</a>';
      collapse.append(body);section.append(heading,collapse);return section;
    };
    document.getElementById("eduSectionModal").addEventListener("show.bs.modal", () => { if (!editing) {sectionForm.reset();document.getElementById("eduSectionModalTitle").textContent="Add New Section";} });
    document.getElementById("eduSectionModal").addEventListener("hidden.bs.modal", () => { editing=null;sectionForm.reset(); });
    sectionForm.addEventListener("submit", event => {
      event.preventDefault();if (!sectionForm.reportValidity())return;
      const name=title.value.trim();if(!name){title.setCustomValidity("Enter a section title.");title.reportValidity();title.setCustomValidity("");return;}
      if(editing){editing.querySelector(".edu-section-name").textContent=name;emit("section-renamed",{sectionId:editing.dataset.sectionId,name});}
      else{const section=makeSection(name);accordion.append(section);emit("section-added",{sectionId:section.dataset.sectionId,name});}
      sectionModal.hide();updateCounts();announce(`Section ${name} saved locally.`);
    });
    accordion.addEventListener("click",event => {
      const action=event.target.closest("[data-action]");
      const move=event.target.closest(".edu-curriculum-drag,.edu-lesson-move");
      if(move){const item=move.closest(".edu-curriculum-section,.edu-curriculum-lesson");const next=item.nextElementSibling;if(next){item.parentNode.insertBefore(next,item);emit("reordered",{id:item.dataset.sectionId||item.dataset.lessonId});announce("Item moved down one position.");}else{const prev=item.previousElementSibling;if(prev){item.parentNode.insertBefore(item,prev);emit("reordered",{id:item.dataset.sectionId||item.dataset.lessonId});announce("Item moved up one position.");}}return;}
      if(!action)return;
      const section=action.closest(".edu-curriculum-section");
      if(action.dataset.action==="edit-section"){editing=section;title.value=section.querySelector(".edu-section-name").textContent;document.getElementById("eduSectionModalTitle").textContent="Edit Section";sectionModal.show();}
      if(action.dataset.action.startsWith("delete-")){pendingDelete=action.dataset.action==="delete-section"?section:action.closest(".edu-curriculum-lesson");document.getElementById("eduDeleteModalText").textContent=`Delete ${pendingDelete.querySelector(".edu-section-name,.edu-curriculum-lesson-name strong").textContent}? This will remove it from the current page until you reload.`;deleteModal.show();}
    });
    document.getElementById("eduConfirmDelete").addEventListener("click",()=>{if(!pendingDelete)return;const id=pendingDelete.dataset.sectionId||pendingDelete.dataset.lessonId;pendingDelete.remove();pendingDelete=null;deleteModal.hide();updateCounts();emit("deleted",{id});announce("Item removed locally.");});
    accordion.addEventListener("shown.bs.collapse",updateCounts);accordion.addEventListener("hidden.bs.collapse",updateCounts);
    updateCounts();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initCurriculum,{once:true});else initCurriculum();
})();


/* ZIP #5 Course Analytics: accessible period selector; source contains All Time data only. */
(() => {const init=()=>{const root=document.querySelector('.edu-analytics-page');if(!root)return;const trigger=document.getElementById('eduAnalyticsPeriod');const status=document.getElementById('eduAnalyticsStatus');root.querySelectorAll('[data-analytics-period]').forEach(button=>button.addEventListener('click',()=>{const monthly=button.dataset.analyticsPeriod==='monthly';trigger.textContent=monthly?'Monthly breakdown':'All Time';root.querySelectorAll('[data-analytics-period]').forEach(b=>{b.classList.toggle('active',b===button);if(b===button)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});status.textContent=monthly?'Charts already show the May to October monthly breakdown. The KPI totals remain All Time values.':'All Time totals selected.';}));};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* ZIP #5 My Students — read-only source data; no invented remote pagination. */
(()=>{'use strict';const init=()=>{const table=document.getElementById('eduStudentRows');if(!table)return;const search=document.getElementById('eduStudentSearch'),course=document.getElementById('eduStudentCourse'),dates=document.getElementById('eduStudentDates'),count=document.getElementById('eduStudentCount'),empty=document.getElementById('eduStudentEmpty');const rows=[...table.querySelectorAll('tr')];const students=[{initial:'SA',name:'Sarah Ali',email:'sarah.ali@learners.example',status:'Active',courses:[{title:'Complete C# Programming',progress:67,lessons:'6 of 9 lessons completed',enrolled:'Oct 28, 2026',activity:'Oct 30, 2026'},{title:'Database Design Fundamentals',progress:40,lessons:'4 of 10 lessons completed',enrolled:'Oct 10, 2026',activity:'Oct 27, 2026'}]},{initial:'OH',name:'Omar Hassan',email:'omar.hassan@learners.example',status:'Active'},{initial:'MA',name:'Mariam Ahmed',email:'mariam.ahmed@learners.example',status:'Active'},{initial:'YM',name:'Youssef Mohamed',email:'youssef.m@learners.example',status:'Completed'},{initial:'NA',name:'Nour Adel',email:'nour.adel@learners.example',status:'Active'},{initial:'KS',name:'Khaled Samir',email:'khaled.samir@learners.example',status:'Active'}];const filter=()=>{const q=search.value.trim().toLowerCase();let visible=0;rows.forEach(row=>{const ok=(!q||row.textContent.toLowerCase().includes(q))&&(!course.value||row.dataset.course===course.value)&&(dates.value==='all'||row.dataset.month===dates.value);row.classList.toggle('d-none',!ok);if(ok)visible++});empty.classList.toggle('d-none',visible!==0);count.textContent=(q||course.value||dates.value!=='all')?`Showing ${visible} of 6 available sample enrollments`:'Showing 1–6 of 1,245 enrollments'};[search,course,dates].forEach(el=>el.addEventListener(el===search?'input':'change',filter));table.addEventListener('click',e=>{const btn=e.target.closest('[data-student-details]');if(!btn)return;const student=students[Number(btn.dataset.studentDetails)];document.getElementById('eduDetailsAvatar').textContent=student.initial;document.getElementById('eduDetailsName').textContent=student.name;document.getElementById('eduDetailsEmail').textContent=student.email;document.getElementById('eduDetailsStatus').textContent=`● ${student.status}`;document.getElementById('eduSelectedStudentText').textContent=`${student.name} selected`;const container=document.getElementById('eduDetailsCourses');container.replaceChildren();if(!student.courses){document.getElementById('eduDetailsCoursesTitle').textContent='Enrolled courses';const p=document.createElement('p');p.className='text-secondary small';p.textContent='Detailed course history for this student is not provided in the source export.';container.append(p);return;}document.getElementById('eduDetailsCoursesTitle').textContent=`Enrolled courses · ${student.courses.length}`;student.courses.forEach(c=>{const article=document.createElement('article');article.className='edu-students__detail-course';const heading=document.createElement('h4');heading.className='h6';heading.textContent=c.title;const info=document.createElement('p');info.className='small';info.textContent=`${c.progress}% · ${c.lessons}`;const progress=document.createElement('div');progress.className='progress mb-3';progress.setAttribute('role','progressbar');progress.setAttribute('aria-label',c.title+' progress');progress.setAttribute('aria-valuenow',String(c.progress));progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','100');const bar=document.createElement('div');bar.className='progress-bar';bar.style.width=c.progress+'%';progress.append(bar);const dates=document.createElement('p');dates.className='small text-secondary mb-0';dates.textContent=`Enrolled ${c.enrolled} · Last activity ${c.activity}`;article.append(heading,info,progress,dates);container.append(article);});});document.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>{count.textContent='Only the first six enrollment records are included in the ZIP export. Additional pages require the backend.';}));};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* ZIP #6 My Profile — local form interaction; backend persistence not implemented. */
(()=>{'use strict';function init(){const form=document.getElementById('eduProfileForm');if(!form)return;const $=id=>document.getElementById(id);const keys=['name','email','title','bio','expertise','website','linkedin','github'];const inputs=Object.fromEntries(keys.map(k=>[k,$('eduProfile_'+k)]));const initial=Object.fromEntries(keys.map(k=>[k,inputs[k].value]));const photo=$('eduProfilePhoto'),avatar=$('eduProfileAvatar'),previewAvatar=$('eduPreviewAvatar'),photoStatus=$('eduPhotoStatus'),status=$('eduProfileStatus');let objectURL=null,selectedPhoto=null;const initials=name=>name.trim().split(/\s+/).slice(0,2).map(s=>s.charAt(0).toUpperCase()).join('')||'AM';const setAvatar=(element,text,url)=>{element.replaceChildren();if(url){const img=document.createElement('img');img.src=url;img.alt='Instructor profile picture';element.append(img)}else element.textContent=text};const update=()=>{const v=k=>inputs[k].value.trim();$('eduPreviewName').textContent=v('name')||'Ahmed Mohamed';$('eduPreviewTitle').textContent=v('title');$('eduPreviewBio').textContent=v('bio');const letters=initials(v('name'));setAvatar(avatar,letters,objectURL);setAvatar(previewAvatar,letters,objectURL);const skills=$('eduPreviewExpertise');skills.replaceChildren();v('expertise').split(',').map(s=>s.trim()).filter(Boolean).forEach(skill=>{const span=document.createElement('span');span.className='edu-profile__skill';span.textContent=skill;skills.append(span)});const links=$('eduPreviewLinks');links.replaceChildren();[['website','Website'],['linkedin','LinkedIn'],['github','GitHub']].forEach(([key,label])=>{const url=v(key);if(!url)return;try{const parsed=new URL(url);if(!['https:','http:'].includes(parsed.protocol))return;const a=document.createElement('a');a.href=parsed.href;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;if(links.childNodes.length){const dot=document.createElement('span');dot.textContent=' · ';dot.setAttribute('aria-hidden','true');links.append(dot)}links.append(a)}catch{}})};keys.forEach(k=>inputs[k].addEventListener('input',()=>{update();status.textContent='Unsaved changes';}));$('eduUploadPhoto').addEventListener('click',()=>photo.click());photo.addEventListener('change',()=>{const file=photo.files&&photo.files[0];if(!file)return;if(!['image/jpeg','image/png'].includes(file.type)||file.size>2*1024*1024){photoStatus.textContent='Choose a JPG or PNG image no larger than 2 MB.';photo.value='';return}if(objectURL)URL.revokeObjectURL(objectURL);objectURL=URL.createObjectURL(file);selectedPhoto=file;photoStatus.textContent=`Selected: ${file.name}`;update();status.textContent='Unsaved changes';});$('eduProfileCancel').addEventListener('click',()=>{keys.forEach(k=>inputs[k].value=initial[k]);if(objectURL)URL.revokeObjectURL(objectURL);objectURL=null;selectedPhoto=null;photo.value='';photoStatus.textContent='';form.classList.remove('was-validated');update();status.textContent='Changes discarded.'});form.addEventListener('submit',event=>{event.preventDefault();form.classList.add('was-validated');if(!form.checkValidity()){status.textContent='Please correct the highlighted fields.';return}for(const k of ['website','linkedin','github']){const value=inputs[k].value.trim();if(value){try{const u=new URL(value);if(!['http:','https:'].includes(u.protocol))throw Error('Invalid protocol')}catch{inputs[k].setCustomValidity('Enter a valid http(s) URL');inputs[k].reportValidity();status.textContent='Please correct the social link URLs.';return}inputs[k].setCustomValidity('')}}const detail={...Object.fromEntries(keys.map(k=>[k,inputs[k].value.trim()])),photo:selectedPhoto};form.dispatchEvent(new CustomEvent('eduhub:profile-ready',{bubbles:true,detail}));status.textContent='Profile validated locally. Connect a backend to save changes.';});window.addEventListener('beforeunload',()=>{if(objectURL)URL.revokeObjectURL(objectURL)});update()}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()})();

/* ZIP #6 Settings: UI-only handlers. Connect authenticated backend to persist mutations. */
(()=>{ 'use strict';
function init(){const form=document.getElementById('eduSettingsForm');if(!form)return;
const $=id=>document.getElementById(id),name=$('eduSettingsName'),email=$('eduSettingsEmail'),enroll=$('eduNotifyEnrollment'),approval=$('eduNotifyApproval'),platform=$('eduNotifyPlatform'),status=$('eduSettingsStatus');
let saved={name:name.value,email:email.value,enroll:enroll.checked,approval:approval.checked,platform:platform.checked};
const show=(message,ok=false)=>{status.textContent=message;status.className='small mb-4 '+(ok?'text-success':'text-secondary')};
const platformState=()=>{$('eduPlatformState').textContent=platform.checked?'Currently on.':'Currently off.'};
platform.addEventListener('change',platformState);
function validate(){let valid=true;for(const [el,error] of [[name,$('eduSettingsNameError')],[email,$('eduSettingsEmailError')]]){const bad=!el.checkValidity()||!el.value.trim();el.classList.toggle('is-invalid',bad);error.hidden=!bad;if(bad)valid=false;}return valid;}
[name,email].forEach(el=>el.addEventListener('input',()=>{el.classList.remove('is-invalid');$(el===name?'eduSettingsNameError':'eduSettingsEmailError').hidden=true}));
form.addEventListener('submit',e=>{e.preventDefault();if(!validate()){show('Correct the highlighted account fields.');form.querySelector('.is-invalid')?.focus();return;}const detail={name:name.value.trim(),email:email.value.trim(),notifications:{courseEnrollment:enroll.checked,courseApproval:approval.checked,platform:platform.checked}};form.dispatchEvent(new CustomEvent('eduhub:settings-ready',{bubbles:true,detail}));show('Settings validated. Connect your backend to save changes.',true);});
$('eduSettingsCancel').addEventListener('click',()=>{name.value=saved.name;email.value=saved.email;enroll.checked=saved.enroll;approval.checked=saved.approval;platform.checked=saved.platform;platformState();[name,email].forEach(el=>el.classList.remove('is-invalid'));document.querySelectorAll('.edu-settings__error').forEach(el=>el.hidden=true);show('Unsaved changes discarded.');});
document.querySelectorAll('[data-toggle-password]').forEach(btn=>btn.addEventListener('click',()=>{const input=$(btn.dataset.togglePassword);const visible=input.type==='password';input.type=visible?'text':'password';btn.setAttribute('aria-label',(visible?'Hide':'Show')+' '+input.id.replace(/^edu/,'').replace(/([A-Z])/g,' $1').trim().toLowerCase());btn.querySelector('i').className='fa-regular '+(visible?'fa-eye-slash':'fa-eye');}));
$('eduPasswordForm').addEventListener('submit',e=>{e.preventDefault();const old=$('eduCurrentPassword'),next=$('eduNewPassword'),confirm=$('eduConfirmPassword'),out=$('eduPasswordStatus');if(!old.value||!next.checkValidity()||next.value!==confirm.value){out.textContent='Enter your current password and matching new passwords of at least 12 characters.';out.className='small mt-3 mb-0 text-danger';return;}out.textContent='Password change request validated. Authentication service integration required.';out.className='small mt-3 mb-0 text-secondary';e.currentTarget.dispatchEvent(new CustomEvent('eduhub:password-change-requested',{bubbles:true,detail:{currentPassword:old.value,newPassword:next.value}}));});
$('eduChangePasswordModal').addEventListener('hidden.bs.modal',()=>{$('eduPasswordForm').reset();$('eduPasswordStatus').textContent='';document.querySelectorAll('[data-toggle-password]').forEach(btn=>{const input=$(btn.dataset.togglePassword);input.type='password';btn.querySelector('i').className='fa-regular fa-eye';});});
$('eduLogoutConfirm').addEventListener('click',()=>{form.dispatchEvent(new CustomEvent('eduhub:logout-requested',{bubbles:true}));bootstrap.Modal.getInstance($('eduLogoutModal'))?.hide();show('Log-out request raised. Connect your authentication service to end the session.');});
const deletion=$('eduDeleteConfirmText'),deleteBtn=$('eduDeleteConfirmButton');deletion.addEventListener('input',()=>{deleteBtn.disabled=deletion.value!=='DELETE'});deleteBtn.addEventListener('click',()=>{if(deletion.value!=='DELETE')return;form.dispatchEvent(new CustomEvent('eduhub:account-deletion-requested',{bubbles:true}));bootstrap.Modal.getInstance($('eduDeleteAccountModal'))?.hide();show('Deletion request raised. No account has been deleted; server-side verification is required.');});$('eduDeleteAccountModal').addEventListener('hidden.bs.modal',()=>{deletion.value='';deleteBtn.disabled=true;});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

/* ZIP #8: Certificate completion — client-side controls */
(()=>{const start=()=>{const cert=document.getElementById('eduCertificate');if(!cert)return;const status=document.getElementById('eduCertStatus');const say=t=>{status.textContent=t};const link=document.getElementById('eduCertShareLink');link.value=location.protocol==='http:'||location.protocol==='https:'?location.href:'';document.getElementById('eduCertCopy').addEventListener('click',async()=>{if(!link.value){say('A hosted certificate URL is not yet available.');return}try{await navigator.clipboard.writeText(link.value);say('Page link copied.')}catch{link.select();say('Select and copy the displayed link.')}});document.getElementById('eduCertNativeShare').addEventListener('click',async()=>{if(!navigator.share){say('Device sharing is not supported in this browser.');return}try{await navigator.share({title:'EduHub Certificate of Completion',text:'I completed Complete C# Programming!',url:link.value||undefined})}catch(e){if(e.name!=='AbortError')say('Sharing could not be completed.')}});document.getElementById('eduCertLinkedIn').addEventListener('click',()=>{if(!link.value){say('A hosted certificate URL is needed for LinkedIn sharing.');return}window.open('https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(link.value),'_blank','noopener,noreferrer')});document.getElementById('eduFullCertificateModal').addEventListener('show.bs.modal',()=>{const target=document.getElementById('eduFullCertificateContent');target.replaceChildren(cert.cloneNode(true));target.querySelector('#eduCertificate').removeAttribute('id')});document.getElementById('eduCertDownload').addEventListener('click',()=>{say('Opening print dialog. Select Save as PDF to download your certificate.');const win=window.open('','_blank');if(!win){say('Please allow pop-ups to print your certificate.');return}win.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Certificate of Completion</title><style>body{font-family:Georgia,serif;text-align:center;padding:40px;color:#173c72}.paper{border:8px double #9ab9df;padding:50px}h1{font-size:36px}h2{font-size:32px}p{line-height:2}</style></head><body><div class="paper"><h1>Edu Hub — Certificate of Completion</h1><p>This certificate is proudly presented to</p><h2>Warda Mahmoud</h2><p>For successfully completing all course lessons and passing the final assessment.</p><h2>Complete C# Programming</h2><p>Ahmed Mohamed — Instructor signature</p><p>Oct 30, 2026 — Completion date</p><p>Sample Certificate ID: EDU-CSP-2026-01024</p></div></body></html>');win.document.close();win.focus();win.print()})};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start()})();

/* ZIP #8 Final Quiz — source-faithful UI; questions 2–10 not present in exports. */
(()=>{"use strict";const init=()=>{const root=document.querySelector(".edu-quiz");if(!root)return;const qTitle=document.getElementById("eduQuizQuestionTitle"),instruction=document.getElementById("eduQuizInstruction"),choices=document.getElementById("eduQuizChoices"),missing=document.getElementById("eduQuizMissing"),progress=document.getElementById("eduQuizProgress"),bar=document.getElementById("eduQuizProgressBar"),previous=document.getElementById("eduQuizPrevious"),next=document.getElementById("eduQuizNext"),live=document.getElementById("eduQuizLive"),navigator=document.getElementById("eduQuizNavigator");let current=1;let selected="class";const render=()=>{document.getElementById("eduQuizProgress").setAttribute("aria-valuenow",String(current));bar.style.width=`${current*10}%`;document.getElementById("eduQuizProgress").setAttribute("aria-valuetext",`Question ${current} of 10`);document.getElementById("eduQuizProgress").setAttribute("aria-label",`Question ${current} of 10`);document.getElementById("eduQuizNavigatorHelp").textContent=current===1?`Question 1 is current and ${selected?"answered":"unanswered"}. Review your selections before submitting.`:`Question ${current} is current. Its content is not included in the uploaded exports.`;document.getElementById("eduQuizCounts").textContent=`${selected?1:0} answered · ${selected?9:10} unanswered`;document.getElementById("eduQuizProgress").previousElementSibling.textContent=`Question ${current} of 10`;qTitle.textContent=current===1?"What is the correct keyword used to define a class in C#?":`Question ${current} — content not supplied`;instruction.textContent=current===1?"Select one answer.":"Question data is required to continue.";choices.classList.toggle("d-none",current!==1);missing.classList.toggle("d-none",current===1);previous.disabled=current===1;next.disabled=current===10;navigator.querySelectorAll("[data-question]").forEach(btn=>{const n=Number(btn.dataset.question);btn.classList.toggle("is-current",n===current);btn.classList.toggle("is-answered",n===1&&Boolean(selected));if(n===current)btn.setAttribute("aria-current","step");else btn.removeAttribute("aria-current");btn.setAttribute("aria-label",`Question ${n}${n===current?", current":""}${n===1&&selected?", answered":", unanswered"}`)});live.textContent=`Question ${current} of 10`;};choices.addEventListener("change",event=>{if(event.target.matches('input[type="radio"]')){selected=event.target.value;render()}});navigator.addEventListener("click",event=>{const btn=event.target.closest("[data-question]");if(btn){current=Number(btn.dataset.question);render()}});previous.addEventListener("click",()=>{current=Math.max(1,current-1);render()});next.addEventListener("click",()=>{current=Math.min(10,current+1);render()});document.getElementById("eduQuizSubmitModal").addEventListener("show.bs.modal",()=>{document.getElementById("eduQuizSubmitMessage").textContent=`${selected?1:0} of 10 questions answered. Submission cannot be completed without questions 2–10.`});render();};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init()})();

/* ZIP #7 + ZIP #8 Course Learning — source-grounded interactive demonstration. */
(()=>{'use strict';
const init=()=>{
 const root=document.querySelector('.edu-learning-shell');if(!root||!window.bootstrap)return;
 const lessons=[['Welcome to the Course','Introduction to C#','04:20'],['What is C#?','Introduction to C#','08:00'],['Setting Up the Environment','Introduction to C#','12:00'],['Variables and Data Types','C# Fundamentals','18:30'],['Operators','C# Fundamentals','14:00'],['Conditional Statements','C# Fundamentals','20:00'],['Classes and Objects','Object-Oriented Programming','22:00'],['Inheritance','Object-Oriented Programming','16:00'],['Polymorphism','Object-Oriented Programming','18:00']];
 const params=new URLSearchParams(location.search),policy=params.get('policy')==='no-final-quiz'?'no-final-quiz':'quiz';
 const allComplete=params.get('state')==='complete'||params.get('state')==='no-final-quiz';
 let current=allComplete?8:3, completed=new Set(allComplete?lessons.map((_,i)=>i):[0,1,2]), noteSaved='', playing=false, speedIndex=0;
 const speeds=[1,1.25,1.5,2],time=seconds=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
 const el=id=>document.getElementById(id),announce=message=>{el('eduLearningLive').textContent=message};
 const sync=()=>{
  const [name,section,duration]=lessons[current];el('eduLearningLessonName').textContent=name;el('eduLearningSectionName').textContent=`SECTION ${Math.floor(current/3)+1} · ${section.toUpperCase()}`;
  el('eduLearningPlayerTitle').textContent=current===8?'Polymorphism':current===3?'Variables & Data Types':name;
  el('eduLearningPlayerCode').innerHTML=current===8?'Animal pet = new Dog();<br>pet.Speak();':current===3?'int age = 25;<br>string name = &quot;Warda&quot;;<br>bool isLearning = true;':'// '+name.replaceAll('<','&lt;');
  el('eduLearningLessonSummary').textContent=current===8?'Use a common interface to work with different objects and bring your C# foundations together.':current===3?'Declare values with confidence and choose the right type for your data.':`Continue learning ${name} in ${section}.`;
  el('eduLearningPrevious').disabled=current===0;el('eduLearningNext').disabled=current===8;
  el('eduLearningComplete').textContent=completed.has(current)?'Completed ✓':'Mark as Completed';el('eduLearningComplete').disabled=completed.has(current);
  const durationSecs=duration.split(':').reduce((a,b)=>a*60+Number(b),0);el('eduLearningSeek').max=durationSecs;el('eduLearningSeek').value=current===8?durationSecs:Math.floor(durationSecs/2);el('eduLearningTime').textContent=`${time(+el('eduLearningSeek').value)} / ${duration}`;
  document.querySelectorAll('[data-lesson-index]').forEach(b=>{const idx=Number(b.dataset.lessonIndex);b.classList.toggle('is-current',idx===current);b.classList.toggle('is-complete',completed.has(idx));b.setAttribute('aria-current',idx===current?'true':'false')});
  const finished=completed.size===lessons.length;const progress=finished?100:current===3&&completed.size===3?35:Math.round(completed.size/9*100);
  document.querySelectorAll('[data-progress-label]').forEach(x=>x.textContent=progress+'%');document.querySelectorAll('[data-progress-bar]').forEach(x=>{x.setAttribute('aria-valuenow',progress);x.querySelector('.progress-bar').style.width=progress+'%'});
  document.querySelectorAll('[data-progress-description]').forEach(x=>x.textContent=finished?'All 9 lessons completed.':'Resume at your own pace. Earlier lessons are complete; the current lesson is in progress.');
  el('eduLearningCompletionBanner').classList.toggle('d-none',!finished);
  if(finished){const noQuiz=policy==='no-final-quiz';el('eduLearningPolicyMessage').textContent=noQuiz?'Optional policy branch · This course has no final quiz. Lesson completion is the certificate requirement.':'One final step: pass the final quiz with 70% or higher to unlock your certificate.';el('eduLearningPolicyLink').textContent=noQuiz?'View Certificate Eligibility':'Take Final Quiz';el('eduLearningPolicyLink').href=noQuiz?'certificate.html':'final-quiz.html';el('eduLearningPolicyFootnote').textContent=noQuiz?'No final quiz is required in this policy branch.':'Your certificate remains locked until the quiz is passed.'}
  document.querySelectorAll('[data-quiz-policy]').forEach(x=>x.textContent=policy==='no-final-quiz'?'No final quiz in this policy branch. All lessons must be complete.':'10 questions · 70% to pass. Complete all lessons before taking the final quiz.');
  document.querySelectorAll('[data-final-quiz-link]').forEach(x=>{x.textContent=policy==='no-final-quiz'?'View Certificate Eligibility':'Take Final Quiz';x.href=policy==='no-final-quiz'?'certificate.html':'final-quiz.html';x.classList.toggle('disabled',!finished);x.setAttribute('aria-disabled',String(!finished));x.tabIndex=finished?0:-1});
 };
 document.querySelectorAll('[data-lesson-index]').forEach(b=>b.addEventListener('click',()=>{current=Number(b.dataset.lessonIndex);sync();const drawer=bootstrap.Offcanvas.getInstance(el('eduLearningDrawer'));if(drawer)drawer.hide();announce(`Selected ${lessons[current][0]}`)}));
 el('eduLearningPrevious').addEventListener('click',()=>{if(current>0){current--;sync()}});el('eduLearningNext').addEventListener('click',()=>{if(current<8){current++;sync()}});
 el('eduLearningComplete').addEventListener('click',()=>{completed.add(current);sync();root.dispatchEvent(new CustomEvent('eduhub:lesson-complete',{bubbles:true,detail:{lessonIndex:current,lesson:lessons[current][0]}}));announce('Lesson marked complete locally; server synchronization is not configured.')});
 el('eduLearningSeek').addEventListener('input',e=>{el('eduLearningTime').textContent=`${time(+e.target.value)} / ${lessons[current][2]}`});
 const toggle=()=>{playing=!playing;el('eduLearningPlay').setAttribute('aria-pressed',String(playing));el('eduLearningPlay').querySelector('i').className=playing?'fa-solid fa-pause':'fa-solid fa-play';el('eduLearningToggle').querySelector('i').className=playing?'fa-solid fa-pause':'fa-solid fa-play';announce('Demonstration '+(playing?'playing':'paused')+'. No video file is provided.')};
 el('eduLearningPlay').addEventListener('click',toggle);el('eduLearningToggle').addEventListener('click',toggle);
 el('eduLearningSpeed').addEventListener('click',()=>{speedIndex=(speedIndex+1)%speeds.length;el('eduLearningSpeed').textContent=speeds[speedIndex]+'×'});
 el('eduLearningSaveNote').addEventListener('click',()=>{noteSaved=el('eduLearningNote').value;el('eduLearningNoteStatus').textContent='Saved locally for this page session';root.dispatchEvent(new CustomEvent('eduhub:note-ready',{bubbles:true,detail:{lessonIndex:current,text:noteSaved}}))});
 el('eduLearningNote').addEventListener('input',()=>{el('eduLearningNoteStatus').textContent='Personal note · Unsaved changes'});
 document.querySelectorAll('[data-resource]').forEach(b=>b.addEventListener('click',()=>{el('eduLearningResourceStatus').textContent='This file is not included in the source archive. Connect its download URL to enable downloads.'}));
 document.querySelectorAll('[data-final-quiz-link]').forEach(x=>x.addEventListener('click',e=>{if(x.getAttribute('aria-disabled')==='true'){e.preventDefault();announce('Complete all lessons before continuing.')}}));
 sync();
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

/* ZIP #9 Checkout: local demo validation only. Never transmit or persist payment data. */
(()=>{'use strict';const init=()=>{const form=document.getElementById('eduCheckoutForm');if(!form)return;const byId=id=>document.getElementById(id);const name=byId('eduCheckoutName'),number=byId('eduCheckoutNumber'),expiry=byId('eduCheckoutExpiry'),cvv=byId('eduCheckoutCvv'),reveal=byId('eduCheckoutReveal');const clean=s=>s.replace(/\D/g,'');number.addEventListener('input',()=>{number.value=clean(number.value).slice(0,19).replace(/(.{4})/g,'$1 ').trim();number.classList.remove('is-invalid');byId('eduCheckoutNumberError').classList.add('d-none')});expiry.addEventListener('input',()=>{const digits=clean(expiry.value).slice(0,4);expiry.value=digits.length>2?digits.slice(0,2)+' / '+digits.slice(2):digits;expiry.classList.remove('is-invalid');byId('eduCheckoutExpiryError').classList.add('d-none')});cvv.addEventListener('input',()=>{cvv.value=clean(cvv.value).slice(0,4);cvv.classList.remove('is-invalid');byId('eduCheckoutCvvError').classList.add('d-none')});reveal.addEventListener('click',()=>{const visible=cvv.type==='password';cvv.type=visible?'text':'password';reveal.setAttribute('aria-pressed',String(visible));reveal.setAttribute('aria-label',visible?'Hide CVV':'Show CVV');reveal.querySelector('i').className=visible?'fa-regular fa-eye-slash':'fa-regular fa-eye'});form.addEventListener('submit',event=>{event.preventDefault();event.stopPropagation();form.classList.add('was-validated');const digits=clean(number.value),exp=clean(expiry.value),month=Number(exp.slice(0,2));const checks=[[number,digits.length>=12&&digits.length<=19,'eduCheckoutNumberError'],[expiry,exp.length===4&&month>=1&&month<=12,'eduCheckoutExpiryError'],[cvv,/^\d{3,4}$/.test(cvv.value),'eduCheckoutCvvError']];for(const [input,ok,error]of checks){input.classList.toggle('is-invalid',!ok);byId(error).classList.toggle('d-none',ok)}if(!form.checkValidity()||checks.some(x=>!x[1])){byId('eduCheckoutStatus').textContent='Please correct the demonstration form fields.';form.querySelector(':invalid,.is-invalid')?.focus();return}const method=form.querySelector('input[name="paymentMethod"]:checked').value;form.dispatchEvent(new CustomEvent('eduhub:checkout-demo-ready',{bubbles:true,detail:{course:'Complete C# Programming',total:49,currency:'USD',paymentMethod:method,processed:false}}));byId('eduCheckoutStatus').textContent='Demo validation passed. No payment was processed.';bootstrap.Modal.getOrCreateInstance(byId('eduCheckoutDemoModal')).show()})};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()})();

/* ZIP #10 Admin Dashboard: backend-neutral logout request. */
(()=>{const button=document.getElementById('eduAdminLogoutConfirm');if(!button)return;button.addEventListener('click',()=>{const status=document.getElementById('eduAdminStatus');if(status)status.textContent='Logout requested. Connect your authentication service to complete sign-out.';document.dispatchEvent(new CustomEvent('eduhub:admin-logout-requested',{bubbles:true}));});})();

/* Course Approvals — source provides six sample rows out of 47 total. */
(()=>{const form=document.getElementById('eduApprovalsFilters');if(!form)return;const search=document.getElementById('eduApprovalsSearch'),date=document.getElementById('eduApprovalsDate'),status=document.getElementById('eduApprovalsStatus'),count=document.getElementById('eduApprovalsCount'),empty=document.getElementById('eduApprovalsEmpty');const records=[...document.querySelectorAll('.edu-approvals__record')];function apply(){const q=search.value.trim().toLowerCase();let visible=0;records.forEach(el=>{const d=el.dataset;const match=(!q||`${d.title} ${d.instructor}`.toLowerCase().includes(q))&&(status.value==='all'||d.status===status.value)&&(date.value==='all'||d.date.replace(/[, ]/g,'').toLowerCase().startsWith(date.value));el.hidden=!match;if(match)visible++;});count.textContent=(q||status.value!=='all'||date.value!=='all')?`Showing ${visible} of 6 loaded sample submissions (47 total in source)`:'Showing 1–6 of 47 submissions';empty.classList.toggle('d-none',visible!==0)}form.addEventListener('input',apply);form.addEventListener('change',apply);form.addEventListener('reset',()=>queueMicrotask(apply));apply()})();

/* ZIP #10 Course Review Details: client-side review requests, not persisted decisions. */
(()=>{'use strict';const init=()=>{const root=document.querySelector('.edu-review');if(!root)return;const byId=id=>document.getElementById(id);const lessonModal=byId('eduReviewLessonModal');lessonModal.addEventListener('show.bs.modal',event=>{const button=event.relatedTarget;if(!button)return;byId('eduReviewLessonName').textContent=button.dataset.lesson||'Lesson preview';byId('eduReviewLessonDuration').textContent='Video · '+(button.dataset.duration||'');});const feedback=byId('eduReviewFeedback');const emit=(decision,reason)=>{root.dispatchEvent(new CustomEvent('eduhub:course-review-requested',{bubbles:true,detail:{courseId:'CRS-028',decision,reason,processed:false}}));feedback.textContent=decision==='approved'?'Approval request prepared. Connect an admin API to record this decision.':'Rejection request prepared. Connect an admin API to record this decision.';};byId('eduReviewConfirmApprove').addEventListener('click',()=>emit('approved',null));const form=byId('eduReviewRejectForm'),reason=byId('eduReviewReason');form.addEventListener('submit',event=>{event.preventDefault();event.stopPropagation();reason.value=reason.value.trim();if(!form.checkValidity()){reason.classList.add('is-invalid');reason.reportValidity();return;}reason.classList.remove('is-invalid');emit('rejected',reason.value);bootstrap.Modal.getOrCreateInstance(byId('eduReviewRejectModal')).hide();form.reset();});reason.addEventListener('input',()=>reason.classList.remove('is-invalid'));};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* ZIP #11 User Management — append to assets/js/main.js */
(()=>{const form=document.getElementById('eduUsersFilters');if(!form)return;
const search=document.getElementById('eduUsersSearch'),role=document.getElementById('eduUsersRole'),status=document.getElementById('eduUsersStatusFilter'),count=document.getElementById('eduUsersCount'),empty=document.getElementById('eduUsersEmpty'),feedback=document.getElementById('eduUsersFeedback');
const records=[...document.querySelectorAll('.edu-users__record')],cards=[...document.querySelectorAll('.edu-users__card')];
function filter(){let visible=0;const q=search.value.trim().toLowerCase();records.forEach((row,i)=>{const ok=(!q||(row.dataset.name+' '+row.dataset.email).includes(q))&&(!role.value||row.dataset.role===role.value)&&(!status.value||row.dataset.statusValue===status.value);row.hidden=!ok;cards[i].hidden=!ok;if(ok)visible++});count.textContent=`Showing ${visible} of 1,284 users · Sample selection`;empty.classList.toggle('d-none',visible!==0)}
[search,role,status].forEach(el=>el.addEventListener('input',filter));form.addEventListener('reset',()=>requestAnimationFrame(filter));
const modal=document.getElementById('eduUsersAccessModal');let pending=null;
modal.addEventListener('show.bs.modal',event=>{const btn=event.relatedTarget;pending=btn?.dataset.userIndex??null;if(pending===null)return;const row=records[Number(pending)];const name=row.querySelector('strong').textContent;const next=row.dataset.statusValue==='active'?'deactivate':'activate';document.getElementById('eduUsersAccessTitle').textContent=`${next==='deactivate'?'Deactivate':'Activate'} ${name}?`;document.getElementById('eduUsersAccessText').textContent=next==='deactivate'?`Request to prevent ${name} from signing in while retaining their account record.`:`Request to restore sign-in access for ${name}.`;document.getElementById('eduUsersConfirm').dataset.action=next});
document.getElementById('eduUsersConfirm').addEventListener('click',event=>{if(pending===null)return;const row=records[Number(pending)],name=row.querySelector('strong').textContent,email=row.dataset.email,action=event.currentTarget.dataset.action;document.dispatchEvent(new CustomEvent('eduhub:user-access-requested',{detail:{email,action},bubbles:true}));feedback.textContent=`${action==='activate'?'Activation':'Deactivation'} request prepared for ${name}. Connect the backend to apply it.`;pending=null});
})();

/* ZIP #11 User Details — backend-neutral account access confirmation. */
(()=>{'use strict';const init=()=>{const root=document.querySelector('.edu-user-detail');if(!root)return;const byId=id=>document.getElementById(id);const modal=byId('eduUserDetailAccessModal'),confirm=byId('eduUserDetailConfirm'),actionButton=byId('eduUserDetailAccessButton'),feedback=byId('eduUserDetailFeedback');let active=true;const update=()=>{const next=active?'deactivate':'activate';byId('eduUserDetailIdentityStatus').textContent=active?'Active':'Inactive';byId('eduUserDetailAccountStatus').textContent=active?'Active':'Inactive';for(const id of ['eduUserDetailIdentityStatus','eduUserDetailAccountStatus']){byId(id).classList.toggle('text-bg-success',active);byId(id).classList.toggle('text-bg-secondary',!active)}byId('eduUserDetailSignIn').textContent=active?'Allowed':'Blocked';byId('eduUserAccessDescription').textContent=active?'Warda can currently sign in to EduHub. Deactivating her account will prevent sign-in without deleting her user record.':'Warda cannot currently sign in to EduHub. Activating her account will restore sign-in without changing her user record.';actionButton.querySelector('span').textContent=active?'Deactivate Account':'Activate Account';actionButton.classList.toggle('btn-outline-danger',active);actionButton.classList.toggle('btn-outline-success',!active);byId('eduUserDetailModalTitle').textContent=active?'Deactivate account?':'Activate account?';byId('eduUserDetailModalDescription').textContent=active?'Request to prevent Warda Mahmoud from signing in. Her user record and Student role will remain unchanged.':'Request to restore sign-in access for Warda Mahmoud. Her user record and Student role will remain unchanged.';confirm.textContent=active?'Confirm deactivation request':'Confirm activation request';confirm.classList.toggle('btn-danger',active);confirm.classList.toggle('btn-success',!active)};modal.addEventListener('show.bs.modal',update);confirm.addEventListener('click',()=>{const requested=active?'deactivate':'activate';root.dispatchEvent(new CustomEvent('eduhub:user-access-requested',{bubbles:true,detail:{userId:'USR-1204',email:'warda.mahmoud@example.com',action:requested,processed:false}}));feedback.textContent=`${requested==='deactivate'?'Deactivation':'Activation'} request prepared for Warda Mahmoud. Connect an admin API to apply the change; the account status displayed above remains unchanged.`;});update();};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* ZIP #11 — Payments: append to assets/js/main.js */
(() => {
  'use strict';
  const root = document.querySelector('.edu-payments');
  if (!root) return;
  const search = root.querySelector('#eduPaymentsSearch');
  const date = root.querySelector('#eduPaymentsDate');
  const status = root.querySelector('#eduPaymentsStatus');
  const count = root.querySelector('#eduPaymentsCount');
  const empty = root.querySelector('#eduPaymentsEmpty');
  const records = [...root.querySelectorAll('[data-payment-record]')];
  const applyFilters = () => {
    let visible = 0;
    records.forEach(record => {
      const match = record.dataset.paymentSearch.includes(search.value.trim().toLowerCase())
        && (!date.value || record.dataset.paymentDate === date.value)
        && (!status.value || record.dataset.paymentStatus === status.value);
      record.hidden = !match;
      if (match && record.tagName === 'TR') visible++;
    });
    empty.hidden = visible !== 0;
    count.textContent = visible ? `Showing 1–${visible} of 6 loaded sample records (1,048 total reported)` : 'Showing 0 of 6 loaded sample records (1,048 total reported)';
  };
  [search, date, status].forEach(control => control.addEventListener(control === search ? 'input' : 'change', applyFilters));
  root.querySelector('#eduPaymentsFilters').addEventListener('submit', event => event.preventDefault());
  root.querySelector('#eduPaymentsReset').addEventListener('click', () => {
    search.value = ''; date.value = ''; status.value = ''; applyFilters(); search.focus();
  });
  const modal = document.getElementById('eduPaymentRefundModal');
  let selected = null;
  modal.addEventListener('show.bs.modal', event => {
    const trigger = event.relatedTarget;
    selected = trigger?.dataset.paymentId === 'PAY-2026-1048' ? {
      id: trigger.dataset.paymentId,
      name: trigger.dataset.paymentName,
      amount: trigger.dataset.paymentAmount
    } : null;
    modal.querySelector('#eduPaymentRefundDescription').textContent = selected
      ? `Request a refund of $${selected.amount} for ${selected.name} (${selected.id})?`
      : 'This payment is not eligible for a refund request.';
    modal.querySelector('#eduPaymentRefundConfirm').disabled = !selected;
  });
  modal.querySelector('#eduPaymentRefundConfirm').addEventListener('click', () => {
    if (!selected) return;
    root.querySelector('#eduPaymentsFeedback').textContent = `Demo refund request prepared for ${selected.id}. No payment was refunded.`;
    document.dispatchEvent(new CustomEvent('eduhub:payment-refund-requested', {detail: {
      paymentId: selected.id, studentName: selected.name, amount: Number(selected.amount), currency: 'USD'
    }}));
  });
})();

/* ZIP #13 — Edit Student Profile; append once to assets/js/main.js */
(() => {
  const form = document.getElementById('eduStudentProfileForm');
  if (!form || form.dataset.eduProfileInitialized === 'true') return;
  form.dataset.eduProfileInitialized = 'true';
  const photo = document.getElementById('eduProfilePhoto');
  const change = document.getElementById('eduProfileChangePhoto');
  const remove = document.getElementById('eduProfileRemovePhoto');
  const preview = document.getElementById('eduProfileImage');
  const initials = document.getElementById('eduProfileInitials');
  const error = document.getElementById('eduProfilePhotoError');
  const bio = document.getElementById('eduProfileBiography');
  const count = document.getElementById('eduProfileBioCount');
  const status = document.getElementById('eduProfileStatus');
  const name = document.getElementById('eduProfileFullName');
  let photoUrl = null;
  let selectedPhoto = null;
  let photoRemoved = false;
  const updateCount = () => { count.textContent = `${bio.value.length} / 300`; };
  const showError = message => { error.textContent = message; error.hidden = !message; };
  const clearPreview = () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    photoUrl = null;
    preview.removeAttribute('src');
    preview.hidden = true;
    initials.hidden = false;
    photo.value = '';
    selectedPhoto = null;
  };
  change.addEventListener('click', () => photo.click());
  photo.addEventListener('change', () => {
    const file = photo.files && photo.files[0];
    if (!file) return;
    if (!['image/jpeg','image/png'].includes(file.type) || file.size > 2 * 1024 * 1024) {
      clearPreview();
      showError('Choose a JPG or PNG image no larger than 2 MB.');
      return;
    }
    clearPreview();
    selectedPhoto = file;
    photoRemoved = false;
    photoUrl = URL.createObjectURL(file);
    preview.src = photoUrl;
    preview.hidden = false;
    initials.hidden = true;
    showError('');
  });
  remove.addEventListener('click', () => {
    clearPreview();
    photoRemoved = true;
    showError('');
    status.textContent = 'Profile photo removal is ready to be saved.';
  });
  bio.addEventListener('input', updateCount);
  updateCount();
  name.addEventListener('input', () => {
    const parts = name.value.trim().split(/\s+/).filter(Boolean);
    initials.textContent = (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] || 'WM').slice(0, 2)).toUpperCase();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.classList.add('was-validated');
    if (!form.checkValidity()) { form.querySelector(':invalid')?.focus(); return; }
    const payload = {fullName:name.value.trim(),email:document.getElementById('eduProfileEmail').value.trim(),biography:bio.value,interests:document.getElementById('eduProfileInterests').value.split(',').map(x=>x.trim()).filter(Boolean),photo:selectedPhoto,removePhoto:photoRemoved};
    form.dispatchEvent(new CustomEvent('eduhub:student-profile-save-requested',{bubbles:true,detail:payload}));
    status.textContent = 'Profile validated; waiting for backend save integration.';
    if (window.bootstrap?.Modal) window.bootstrap.Modal.getOrCreateInstance(document.getElementById('eduProfileSavedModal')).show();
  });
  document.getElementById('eduStudentLogoutConfirm')?.addEventListener('click', () => document.dispatchEvent(new CustomEvent('eduhub:logout-requested',{detail:{role:'student'}})));
  window.addEventListener('pagehide', () => { if (photoUrl) URL.revokeObjectURL(photoUrl); }, {once:true});
})();

/* ZIP #13 — Notifications; append once to assets/js/main.js */
(() => {
  const list = document.getElementById('eduNotificationsList');
  if (!list || list.dataset.eduNotificationsInitialized === 'true') return;
  list.dataset.eduNotificationsInitialized = 'true';
  const cards = [...list.querySelectorAll('[data-edu-notification-id]')];
  const allButton = document.getElementById('eduNotificationsAll');
  const unreadButton = document.getElementById('eduNotificationsUnread');
  const markAllButton = document.getElementById('eduNotificationsMarkAll');
  const empty = document.getElementById('eduNotificationsEmpty');
  const status = document.getElementById('eduNotificationsStatus');
  let filter = 'all';
  const unreadCount = () => cards.filter(card => card.dataset.eduRead === 'false').length;
  function render() {
    const unread = unreadCount();
    document.getElementById('eduNotificationsTotal').textContent = String(cards.length);
    document.getElementById('eduNotificationsUnreadCount').textContent = String(unread);
    cards.forEach(card => { card.hidden = filter === 'unread' && card.dataset.eduRead === 'true'; });
    empty.hidden = cards.some(card => !card.hidden);
    markAllButton.disabled = unread === 0;
    [allButton, unreadButton].forEach(button => {
      const active = button.dataset.eduFilter === filter;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('btn-primary', active);
      button.classList.toggle('btn-outline-primary', !active);
    });
  }
  function markRead(card) {
    if (!card || card.dataset.eduRead === 'true') return;
    card.dataset.eduRead = 'true';
    card.classList.replace('is-unread', 'is-read');
    card.querySelector('.edu-notifications__status').textContent = 'Read';
    card.querySelector('[data-edu-mark-read]').hidden = true;
    const detail = {id: card.dataset.eduNotificationId, read: true};
    list.dispatchEvent(new CustomEvent('eduhub:notification-read-requested', {bubbles:true,detail}));
    render();
    status.textContent = `Marked notification ${detail.id} as read (demo only; not saved to a server).`;
  }
  list.addEventListener('click', event => {
    const button = event.target.closest('[data-edu-mark-read]');
    if (button) markRead(button.closest('[data-edu-notification-id]'));
  });
  [allButton, unreadButton].forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.eduFilter;
    render();
  }));
  markAllButton.addEventListener('click', () => {
    const ids = cards.filter(card => card.dataset.eduRead === 'false').map(card => card.dataset.eduNotificationId);
    if (!ids.length) return;
    cards.forEach(card => {
      if (card.dataset.eduRead === 'true') return;
      card.dataset.eduRead = 'true';
      card.classList.replace('is-unread','is-read');
      card.querySelector('.edu-notifications__status').textContent = 'Read';
      card.querySelector('[data-edu-mark-read]').hidden = true;
    });
    list.dispatchEvent(new CustomEvent('eduhub:notifications-mark-all-read-requested', {bubbles:true,detail:{ids}}));
    render();
    status.textContent = `Marked ${ids.length} notifications as read (demo only; not saved to a server).`;
  });
  render();
})();

/* ZIP #14 / Payment Failed — optional integration hook. No payment is initiated locally. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-edu-payment-retry]').forEach(link => {
    link.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('eduhub:payment-retry-requested', {
        detail: { course: 'Complete C# Programming', amount: 49, currency: 'USD' }
      }));
    });
  });
});

/* ZIP #13/14: Payment Success — no transaction is initiated by this static demo. */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-edu-payment-success-action]').forEach(link => {
    link.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('eduhub:payment-success-navigation', {
        detail: { action: link.dataset.eduPaymentSuccessAction, paymentId: 'PAY-2026-1048' }
      }));
    });
  });
});

/* ============================================================================
   ZIP #1–#14 — unified, backend-neutral interactions for restored screens.
   Bootstrap 5 owns modals, offcanvas, accordions and tabs. Avoid duplicate init.
   ============================================================================ */
(() => {
  'use strict';
  const FLAG = 'eduMasterInit';
  const announce = (message) => {
    const region = document.getElementById('eduLiveRegion');
    if (region) region.textContent = message;
    const toast = document.getElementById('eduMasterToast');
    if (toast) {
      const body = toast.querySelector('.toast-body');
      if (body) body.textContent = message;
      if (window.bootstrap?.Toast) bootstrap.Toast.getOrCreateInstance(toast).show();
    }
  };
  const event = (name, detail) => document.dispatchEvent(new CustomEvent(name, {
    detail,
    bubbles: false
  }));

  function init() {
    if (document.documentElement.dataset[FLAG]) return;
    document.documentElement.dataset[FLAG] = 'true';

    const toastHost = document.createElement('div');
    toastHost.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastHost.style.zIndex = '1090';
    toastHost.innerHTML = '<div id="eduMasterToast" class="toast align-items-center text-bg-dark border-0" role="status" aria-live="polite" aria-atomic="true"><div class="d-flex"><div class="toast-body"></div><button class="btn-close btn-close-white me-2 m-auto" type="button" data-bs-dismiss="toast" aria-label="Close"></button></div></div>';
    document.body.appendChild(toastHost);

    // The newest source exports use real native forms; never imply server persistence.
    document.querySelectorAll('form[data-edu-demo-form]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const passwords = [...form.querySelectorAll('input[type="password"]')];
        passwords.forEach(input => input.setCustomValidity(''));
        if (passwords.length >= 2 && passwords[0].value !== passwords[1].value) {
          passwords[1].setCustomValidity('Passwords must match.');
        }
        form.classList.add('was-validated');
        if (!form.checkValidity()) {
          const invalid = form.querySelector(':invalid');
          invalid?.focus();
          announce('Please correct the highlighted fields.');
          return;
        }
        const detail = {
          screen: form.dataset.eduDemoForm,
          fields: Object.fromEntries([...new FormData(form).entries()].filter(([key]) =>
            !/password|credit|card|cvv|token/i.test(key)
          )),
          isDemo: true
        };
        event('eduhub:form-save-requested', detail);
        announce('Validated successfully. A backend integration is required to save changes.');
      });
    });

    document.addEventListener('click', e => {
      const toggle = e.target.closest('[data-edu-toggle-password]');
      if (toggle) {
        const target = toggle.parentElement?.querySelector('input');
        if (!target) return;
        const revealing = target.type === 'password';
        target.type = revealing ? 'text' : 'password';
        toggle.setAttribute('aria-label', revealing ? 'Hide password' : 'Show password');
        const icon = toggle.querySelector('i');
        if (icon) icon.className = revealing ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
        target.focus();
        return;
      }
      const add = e.target.closest('[data-edu-add-item]');
      if (add) {
        const destination = document.getElementById(add.dataset.eduAddItem);
        if (!destination) return;
        const count = destination.children.length + 1;
        const wrapper = document.createElement('div');
        wrapper.className = 'list-group-item d-flex align-items-center justify-content-between gap-2';
        const input = document.createElement('input');
        input.className = 'form-control form-control-sm';
        input.value = `Section ${count}`;
        input.setAttribute('aria-label','New section name');
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'btn btn-outline-danger btn-sm';
        remove.dataset.eduRemove = '';
        remove.textContent = 'Remove';
        wrapper.append(input,remove);
        destination.appendChild(wrapper);
        input.focus();
        event('eduhub:draft-item-added',{section:count,isDemo:true});
        return;
      }
      const remove = e.target.closest('[data-edu-remove]');
      if (remove) {
        const row = remove.closest('.list-group-item');
        const name = row?.querySelector('input')?.value ?? row?.textContent.trim();
        row?.remove();
        event('eduhub:draft-item-removed',{name,isDemo:true});
        announce('Removed from this unsaved draft.');
        return;
      }
      const action = e.target.closest('[data-edu-action]');
      if (action) {
        const requested = action.dataset.eduAction;
        event('eduhub:action-requested',{action:requested,isDemo:true});
        announce(`${requested}: demonstration request recorded. Connect an API to persist this action.`);
      }
    });

    document.addEventListener('input', e => {
      const input = e.target.closest('[data-edu-filter-input]');
      if (!input) return;
      const group = input.dataset.eduFilterInput;
      const items = [...document.querySelectorAll('[data-edu-filter-card]')].filter(node => node.dataset.eduFilterCard === group);
      const query = input.value.trim().toLocaleLowerCase();
      let visible = 0;
      items.forEach(item => {
        const match = (item.dataset.eduSearch || item.textContent).toLocaleLowerCase().includes(query);
        item.classList.toggle('d-none',!match);
        if (match) visible++;
      });
      document.querySelectorAll('[data-edu-filter-empty]').forEach(empty => {
        if (empty.dataset.eduFilterEmpty === group) empty.classList.toggle('d-none',visible>0);
      });
      event('eduhub:client-filter-changed',{group,query,matches:visible});
    });

    document.querySelectorAll('[data-edu-image-input]').forEach(input => {
      let localUrl = null;
      input.addEventListener('change', () => {
        const file = input.files?.[0];
        const preview = input.closest('.card')?.querySelector('[data-edu-preview]');
        if (!preview) return;
        if (localUrl) URL.revokeObjectURL(localUrl);
        if (!file) { preview.classList.add('d-none'); preview.removeAttribute('src');return; }
        if (!['image/png','image/jpeg'].includes(file.type) || file.size > 5 * 1024 * 1024) {
          input.value = '';
          preview.classList.add('d-none');
          announce('Please choose a PNG or JPG under 5 MB.');
          return;
        }
        localUrl = URL.createObjectURL(file);
        preview.src = localUrl;
        preview.classList.remove('d-none');
        event('eduhub:image-preview-updated',{name:file.name,size:file.size,isDemo:true});
      });
      window.addEventListener('pagehide',() => { if (localUrl) URL.revokeObjectURL(localUrl); },{once:true});
    });

    const modal = document.getElementById('eduConfirmAction');
    if (modal) {
      let requestedAction = 'Confirm';
      modal.addEventListener('show.bs.modal', e => {
        requestedAction = e.relatedTarget?.dataset?.eduModalAction || 'Confirm';
        const title = modal.querySelector('#eduConfirmActionLabel');
        if (title) title.textContent = `Confirm: ${requestedAction}`;
      });
      modal.querySelector('[data-edu-confirm]')?.addEventListener('click', () => {
        event('eduhub:confirmation-requested',{action:requestedAction,isDemo:true});
        announce(`${requestedAction} requested in demo mode. No external records were changed.`);
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

/* Source-backed course facets and sorting (ZIP #9 / ZIP #3). */
(() => {
  'use strict';
  const updateCourses = (group) => {
    const container = document.getElementById(group);
    const cards = [...document.querySelectorAll('[data-edu-filter-card]')].filter(x=>x.dataset.eduFilterCard===group);
    if (!cards.length)return;
    const q=document.querySelector(`[data-edu-filter-input="${group}"]`)?.value.toLowerCase().trim() || '';
    const facets=[...document.querySelectorAll(`[data-edu-filter-group="${group}"]`)];
    let count=0;
    cards.forEach(c=>{
      const fitText=(c.dataset.eduSearch||c.textContent).toLowerCase().includes(q);
      const fitFacets=facets.every(el=> !el.value || (c.dataset.eduCategory===el.value || c.dataset.eduLevel===el.value));
      const match=fitText&&fitFacets;
      c.classList.toggle('d-none',!match);
      if(match)count++;
    });
    document.querySelectorAll(`[data-edu-filter-empty="${group}"]`).forEach(x=>x.classList.toggle('d-none',count>0));
    if(!container) return;
  };
  document.addEventListener('change', e => {
    const filter=e.target.closest('[data-edu-filter-select]');
    if(filter)updateCourses(filter.dataset.eduFilterGroup);
    const sort=e.target.closest('[data-edu-sort-courses]');
    if(sort){
      const group=sort.dataset.eduSortCourses;
      const container=document.getElementById(group);
      if(!container)return;
      const nodes=[...container.querySelectorAll('[data-edu-filter-card]')];
      if(sort.value==='title')nodes.sort((a,b)=>a.querySelector('h2')?.textContent.localeCompare(b.querySelector('h2')?.textContent));
      if(sort.value==='price')nodes.sort((a,b)=>{
        const price=s=>Number((s.match(/\$[\d,.]+/)?.[0]||'0').slice(1).replaceAll(',',''));
        return price(a.textContent)-price(b.textContent);
      });
      if(sort.value==='popular')nodes.sort((a,b)=> Number(a.dataset.originalOrder||nodes.indexOf(a))-Number(b.dataset.originalOrder||nodes.indexOf(b)));
      nodes.forEach(n=>container.appendChild(n));
    }
  });
  document.addEventListener('input',e=>{
    const inp=e.target.closest('[data-edu-filter-input="course-cards"]');
    if(inp)updateCourses('course-cards');
  });
})();
