
    'use strict';
    /* ==========================================================
       Local-only demonstration — no video stream, API, purchase,
       remote progress tracking, or lesson-download service.
       ========================================================== */
    const LESSONS = [{"name": "Welcome to the Course", "duration": "04:20", "section": "Introduction to C#", "sectionIndex": 0}, {"name": "What is C#?", "duration": "08:00", "section": "Introduction to C#", "sectionIndex": 0}, {"name": "Setting Up the Environment", "duration": "12:00", "section": "Introduction to C#", "sectionIndex": 0}, {"name": "Variables and Data Types", "duration": "18:30", "section": "C# Fundamentals", "sectionIndex": 1}, {"name": "Operators", "duration": "14:00", "section": "C# Fundamentals", "sectionIndex": 1}, {"name": "Conditional Statements", "duration": "20:00", "section": "C# Fundamentals", "sectionIndex": 1}, {"name": "Classes and Objects", "duration": "22:00", "section": "Object-Oriented Programming", "sectionIndex": 2}, {"name": "Inheritance", "duration": "16:00", "section": "Object-Oriented Programming", "sectionIndex": 2}, {"name": "Polymorphism", "duration": "18:00", "section": "Object-Oriented Programming", "sectionIndex": 2}];
    const sections = [{"name": "Introduction to C#", "meta": "3 lessons · 24m 20s", "lessons": [["Welcome to the Course", "04:20"], ["What is C#?", "08:00"], ["Setting Up the Environment", "12:00"]]}, {"name": "C# Fundamentals", "meta": "3 lessons · 52m 30s", "lessons": [["Variables and Data Types", "18:30"], ["Operators", "14:00"], ["Conditional Statements", "20:00"]]}, {"name": "Object-Oriented Programming", "meta": "3 lessons · 56m 00s", "lessons": [["Classes and Objects", "22:00"], ["Inheritance", "16:00"], ["Polymorphism", "18:00"]]}];
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => [...document.querySelectorAll(selector)];
    const state = {
      activeLesson: 3,
      completed: new Set([0, 1, 2]),
      openSections: new Set([0, 1, 2]),
      tab: 'Notes',
      notes: {},
      noteDrafts: {},
      noteSaved: {},
      timeline: 555,
      playing: false,
      interval: null,
      speed: 1,
      muted: false
    };
    const currentLesson = () => LESSONS[state.activeLesson];
    const seconds = (text) => { const [m,s] = text.split(':').map(Number); return m*60+s; };
    const fmt = (n) => `${String(Math.floor(n/60)).padStart(2,'0')}:${String(Math.round(n%60)).padStart(2,'0')}`;
    const escapeText = (str) => String(str).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    function announce(message) {
      const el=$('#feedback'); el.textContent=message; el.hidden=false;
    }
    function dismissNotice() {$('#feedback').hidden=true;}
    function buildCurriculum() {
      const el=$('#curriculumList');
      el.innerHTML=sections.map((section,i)=>{
        const start=i*3;
        const rows=section.lessons.map((_,j)=>{
          const idx=start+j, lesson=LESSONS[idx];
          const completed=state.completed.has(idx),active=idx===state.activeLesson;
          const icon=completed?'fa-circle-check':active?'fa-circle-play':'fa-play';
          const iconClass=completed||active?'':' is-pending';
          return `<button type="button" data-lesson="${idx}" class="lesson-item" aria-current="${active?'true':'false'}" aria-label="Open lesson: ${escapeText(lesson.name)}"><i aria-hidden="true" class="fa-${completed||active?'regular':'solid'} ${icon} lesson-state-icon${iconClass}"></i><span class="lesson-item-name">${escapeText(lesson.name)}</span><span class="lesson-duration">${lesson.duration}</span></button>`;
        }).join('');
        return `<details class="curriculum-section" data-section="${i}" ${state.openSections.has(i)?'open':''}><summary><span><span class="section-label">${escapeText(section.name)}</span><span class="section-meta">${escapeText(section.meta)}</span></span><i class="fa-solid fa-chevron-down section-chevron" aria-hidden="true"></i></summary><div>${rows}</div></details>`;
      }).join('');
      $$('details[data-section]').forEach(details=>details.addEventListener('toggle',()=>{
        const i=Number(details.dataset.section);
        if(details.open)state.openSections.add(i);else state.openSections.delete(i);
      }));
      $$('[data-lesson]').forEach(btn=>btn.addEventListener('click',()=>openLesson(Number(btn.dataset.lesson))));
    }
    function updateProgress() {
      const changed=state.completed.size!==3 || ![0,1,2].every(i=>state.completed.has(i));
      const pct=changed?Math.round(state.completed.size/LESSONS.length*100):35;
      $('#progressLabel').textContent=`Course Progress: ${pct}%`;
      $('#courseProgressFill').style.width=`${pct}%`;
      $('#courseProgressBar').setAttribute('aria-valuenow',pct);
      $('#progressNote').textContent=changed?'Demo completion progress · changes are local to this page':'Watch-time-based progress · saved viewing across lessons';
      $('#progressDescription').textContent=changed?'This is a frontend demonstration. Real watch time and completion require a connected learning service.':'Resume at your own pace. Earlier lessons are complete; the current lesson is in progress.';
      const done=state.completed.size===LESSONS.length;
      $('#finalQuiz').disabled=!done;
      $('#viewCompletedState').hidden=!done;
      $('#quizIcon').className=done?'fa-solid fa-unlock':'fa-solid fa-lock';
    }
    function updateTimeline() {
      const lesson=currentLesson();
      const duration=seconds(lesson.duration);
      $('#videoSeek').max=String(duration);
      state.timeline=Math.min(duration,Math.max(0,state.timeline));
      $('#videoSeek').value=state.timeline;
      $('#videoSeek').style.background=`linear-gradient(90deg, var(--ed-primary) ${100*state.timeline/duration}%, #334155 ${100*state.timeline/duration}%)`;
      $('#timeLabel').textContent=`${fmt(state.timeline)} / ${lesson.duration}`;
    }
    function stopPreview() { state.playing=false;clearInterval(state.interval);state.interval=null;updatePlayIcons(); }
    function updatePlayIcons() {
      const icon=state.playing?'fa-pause':'fa-play';
      $('#slidePlay').innerHTML=`<i class="fa-solid ${icon}" aria-hidden="true"></i>`;
      $('#toolbarPlay').innerHTML=`<i class="fa-solid ${icon}" aria-hidden="true"></i>`;
      $('#slidePlay').setAttribute('aria-label',state.playing?'Pause illustrative timeline':'Play illustrative timeline');
      $('#toolbarPlay').setAttribute('aria-label',state.playing?'Pause illustrative timeline':'Play illustrative timeline');
    }
    function startPreview() {
      state.playing=true;updatePlayIcons();$('#previewNotice').hidden=false;
      announce('This is an illustrative timeline, not a real video playback.');
      if(state.interval)clearInterval(state.interval);
      state.interval=setInterval(()=>{
        state.timeline+=state.speed;
        if(state.timeline>=seconds(currentLesson().duration)){state.timeline=seconds(currentLesson().duration);stopPreview();}
        updateTimeline();
      },1000);
    }
    function togglePreview(){if(state.playing)stopPreview();else startPreview();}
    function openLesson(index) {
      if(index<0||index>=LESSONS.length)return;
      if(index!==state.activeLesson)saveCurrentDraft();
      stopPreview();state.activeLesson=index;state.timeline=index===3?555:0;
      state.openSections.add(LESSONS[index].sectionIndex);
      const lesson=currentLesson();
      $('#sectionEyebrow').textContent=`SECTION ${lesson.sectionIndex+1} · ${lesson.section.toUpperCase()}`;
      $('#slideEyebrow').textContent=lesson.section.toUpperCase();
      $('#slideTitle').textContent=lesson.name==='Variables and Data Types'?'Variables & Data Types':lesson.name;
      $('#slideCode').textContent=index===3?'int age = 25;\nstring name = "Warda";\nbool isLearning = true;':`// ${lesson.name}\n// Illustrative lesson slide\n// No video media connected`;
      $('#lessonHeading').textContent=lesson.name;
      const specific=index===3;
      $('#lessonDescription').textContent=specific?'Declare values with confidence and choose the right type for your data.':`Explore ${lesson.name.toLowerCase()} with guided C# examples.`;
      $('#overviewText').textContent=specific?'Learn how C# stores information using variables and data types. Follow along as Ahmed declares values, names variables clearly and explains when to use int, string, double and bool.':`This is a placeholder overview for ${lesson.name}. Real lesson text and video will load from the course-content API.`;
      $('#practiceText').textContent=specific?'Declare three variables for a learner profile. Try changing their values, then print a short introduction to the console.':`Use the exercise resources supplied by your instructor for ${lesson.name}.`;
      $('#notesLessonName').textContent=lesson.name;
      loadLessonNote(index);
      updateNotesCounter();
      $('#previousLesson').disabled=index===0;
      $('#nextLesson').disabled=index===LESSONS.length-1;
      $('#markComplete').textContent=state.completed.has(index)?'Mark as Incomplete':'Mark as Completed';
      updateTimeline();buildCurriculum();updateProgress();
    }
    function setTab(name) {
      if(!['Overview','Resources','Notes'].includes(name))return;
      state.tab=name;
      for(const k of ['Overview','Resources','Notes']){
        const selected=k===name;
        $('#tab'+k).setAttribute('aria-selected',selected?'true':'false');
        $('#tab'+k).tabIndex=selected?0:-1;
        $('#panel'+k).hidden=!selected;
      }
    }
    const initialNoteHtml='<p>C# is strongly typed. Choose the type based on the value I need to store. Use int for whole numbers, string for text and bool for true/false values.</p><p class="notes-secondary">Remember to try the starter project after the lesson.</p>';
    const noteStoragePrefix='eduhub-demo-csharp-notes-v1:';
    function sanitizeNote(html){
      const root=document.createElement('div');root.innerHTML=html;
      const allowed=new Set(['P','DIV','BR','B','STRONG','I','EM','UL','OL','LI','A']);
      function safeNode(node){
        if(node.nodeType===Node.TEXT_NODE)return document.createTextNode(node.textContent);
        if(node.nodeType!==Node.ELEMENT_NODE)return document.createDocumentFragment();
        if(['SCRIPT','STYLE','IFRAME','OBJECT','SVG','FORM','INPUT'].includes(node.tagName))return document.createDocumentFragment();
        const tag=allowed.has(node.tagName)?node.tagName:'SPAN';
        const el=document.createElement(tag.toLowerCase());
        if(tag==='A'){
          const href=node.getAttribute('href')||'';
          try{const url=new URL(href);if(['https:','http:'].includes(url.protocol)){el.href=url.href;el.target='_blank';el.rel='noopener noreferrer';}}catch(_error){}
        }
        if(node.classList?.contains('notes-secondary') && (tag==='P'||tag==='DIV'))el.classList.add('notes-secondary');
        for(const child of node.childNodes)el.appendChild(safeNode(child));
        return el;
      }
      const output=document.createElement('div');for(const node of root.childNodes)output.appendChild(safeNode(node));
      return output.innerHTML;
    }
    function saveCurrentDraft(){
      const editor=$('#lessonNotes');if(editor)state.noteDrafts[state.activeLesson]=sanitizeNote(editor.innerHTML);
    }
    function loadLessonNote(index){
      const key=noteStoragePrefix+index;
      let saved='';
      try{saved=sessionStorage.getItem(key)||'';}catch(_error){}
      const hasSaved=Boolean(saved);
      if(hasSaved&&!state.noteSaved[index])state.noteSaved[index]=true;
      if(!(index in state.noteDrafts))state.noteDrafts[index]=hasSaved?sanitizeNote(saved):(index===3?initialNoteHtml:'');
      $('#lessonNotes').innerHTML=state.noteDrafts[index];
      showNoteStatus(!hasSaved||state.noteDrafts[index]!==sanitizeNote(saved));
    }
    function showNoteStatus(dirty){
      const status=$('#noteSaveStatus');status.textContent=dirty?'Personal note · Unsaved changes':'Personal note · Saved for this tab';
      status.dataset.dirty=dirty?'true':'false';
    }
    function updateNotesCounter(){
      const n=$('#lessonNotes').textContent.length;$('#notesCounter').textContent=`${n} characters in personal note`;
    }
    $('#previousLesson').addEventListener('click',()=>openLesson(state.activeLesson-1));
    $('#nextLesson').addEventListener('click',()=>openLesson(state.activeLesson+1));
    $('#markComplete').addEventListener('click',()=>{
      const idx=state.activeLesson;
      if(state.completed.has(idx)){state.completed.delete(idx);announce('Lesson marked incomplete in this local demo.');}
      else {state.completed.add(idx);announce('Lesson marked completed in this local demo; no account progress was saved.');}
      openLesson(idx);
    });
    for(const name of ['Overview','Resources','Notes']){$('#tab'+name).addEventListener('click',()=>setTab(name));}
    $('.lesson-tabs').addEventListener('keydown',(ev)=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(ev.key))return;
      const tabs=['Overview','Resources','Notes'];let i=tabs.indexOf(state.tab);
      i=ev.key==='Home'?0:ev.key==='End'?2:(i+(ev.key==='ArrowRight'?1:-1)+3)%3;
      setTab(tabs[i]);$('#tab'+tabs[i]).focus();ev.preventDefault();
    });
    $('#lessonNotes').addEventListener('input',()=>{
      state.noteDrafts[state.activeLesson]=sanitizeNote($('#lessonNotes').innerHTML);
      updateNotesCounter();showNoteStatus(true);
    });
    $('#lessonNotes').addEventListener('paste',(ev)=>{
      ev.preventDefault();const plain=ev.clipboardData?.getData('text/plain')||'';
      document.execCommand('insertText',false,plain);
    });
    $('#saveNotes').addEventListener('click',()=>{
      const html=sanitizeNote($('#lessonNotes').innerHTML);
      state.noteDrafts[state.activeLesson]=html;
      try{sessionStorage.setItem(noteStoragePrefix+state.activeLesson,html);state.noteSaved[state.activeLesson]=true;showNoteStatus(false);
        announce('Note saved for this browser tab only. It is not uploaded to EduHub or any account.');
      }catch(_error){announce('Browser session storage is unavailable. Your note remains only in this open page.');}
    });
    $$('.note-tool[data-command]').forEach(btn=>{
      btn.addEventListener('mousedown',(ev)=>ev.preventDefault());
      btn.addEventListener('click',()=>{
        $('#lessonNotes').focus();document.execCommand(btn.dataset.command,false,null);
        state.noteDrafts[state.activeLesson]=sanitizeNote($('#lessonNotes').innerHTML);showNoteStatus(true);updateNotesCounter();
      });
    });
    const noteLinkDialog=$('#noteLinkDialog');let noteSelection=null;
    $('#noteLink').addEventListener('click',()=>{
      const selection=window.getSelection();noteSelection=selection&&selection.rangeCount?selection.getRangeAt(0).cloneRange():null;
      $('#noteLinkUrl').value='';$('#noteLinkError').hidden=true;
      noteLinkDialog.showModal();$('#noteLinkUrl').focus();
    });
    $('#cancelNoteLink').addEventListener('click',()=>noteLinkDialog.close());
    $('#noteLinkForm').addEventListener('submit',(ev)=>{
      ev.preventDefault();let url;
      try{url=new URL($('#noteLinkUrl').value);if(!['https:','http:'].includes(url.protocol))throw Error('Bad protocol');}
      catch(_error){$('#noteLinkError').hidden=false;return;}
      noteLinkDialog.close();$('#lessonNotes').focus();
      if(noteSelection){const sel=window.getSelection();sel.removeAllRanges();sel.addRange(noteSelection);}
      if(window.getSelection()?.toString())document.execCommand('createLink',false,url.href);
      else document.execCommand('insertHTML',false,`<a href="${url.href.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" target="_blank" rel="noopener noreferrer">${url.hostname.replace(/</g,'&lt;')}</a>`);
      state.noteDrafts[state.activeLesson]=sanitizeNote($('#lessonNotes').innerHTML);showNoteStatus(true);updateNotesCounter();
    });
    $('#lessonNotes').addEventListener('keydown',ev=>{
      if((ev.ctrlKey||ev.metaKey)&&ev.key.toLowerCase()==='s'){
        ev.preventDefault();$('#saveNotes').click();
      }
    });
    const resourceDialog = $('#resourceDialog');
    $$('[data-resource]').forEach(btn=>btn.addEventListener('click',()=>{
      $('#resourceDialogTitle').textContent = btn.dataset.resource;
      $('#resourceDialogKind').textContent = btn.dataset.resourceKind;
      resourceDialog.showModal();
    }));
    $('#resourceDialogClose').addEventListener('click',()=>resourceDialog.close());
    $('#resourceDialogCloseX').addEventListener('click',()=>resourceDialog.close());
    resourceDialog.addEventListener('click',ev=>{if(ev.target===resourceDialog)resourceDialog.close();});
    $('#slidePlay').addEventListener('click',togglePreview);
    $('#toolbarPlay').addEventListener('click',togglePreview);
    $('#videoSeek').addEventListener('input',()=>{state.timeline=Number($('#videoSeek').value);updateTimeline();$('#previewNotice').hidden=false;});
    $('#speedButton').addEventListener('click',()=>{state.speed=state.speed===1?1.5:state.speed===1.5?2:1;$('#speedButton').textContent=`${state.speed}×`;});
    $('#volumeButton').addEventListener('click',()=>{state.muted=!state.muted;$('#volumeButton i').className='fa-solid '+(state.muted?'fa-volume-xmark':'fa-volume-high');announce('Audio control is illustrative. No audio is connected.');});
    $('#fullscreenButton').addEventListener('click',()=>{
      const el=$('.demo-player');
      if(document.fullscreenElement){document.exitFullscreen?.().catch(()=>{});return;}
      if(el.requestFullscreen){el.requestFullscreen().catch(()=>announce('Fullscreen is unavailable in this browser.'));}
      else announce('Fullscreen is unavailable in this browser.');
    });
    $('#finalQuiz').addEventListener('click',()=>announce('The Final Quiz page is not connected yet. This is a demo unlock state, not an assessment result.'));
    $('#notificationsButton').addEventListener('click',()=>announce('Notifications can be connected to the EduHub Notifications screen.'));
    $('#accountButton').addEventListener('click',()=>announce('Use the WM avatar to open your Student Profile.'));
    $('#openMobileMenu').addEventListener('click',()=>$('#mobileMenu').showModal());
    $('#closeMobileMenu').addEventListener('click',()=>$('#mobileMenu').close());
    $('#mobileMenu').addEventListener('click',(ev)=>{if(ev.target===$('#mobileMenu'))$('#mobileMenu').close();});
    $('#feedback').addEventListener('click',dismissNotice);
    window.addEventListener('pagehide',stopPreview);
    // First paint: Notes tab is active per Figma node 22:41670; lesson 4, 35% progress.
    // A local lesson query parameter allows links from the existing enrolled-course page.
    const requestedLesson = new URLSearchParams(window.location.search).get('lesson');
    const resolvedLesson = requestedLesson !== null && /^(?:[0-8])$/.test(requestedLesson) ? Number(requestedLesson) : 3;
    openLesson(resolvedLesson);setTab('Notes');
  