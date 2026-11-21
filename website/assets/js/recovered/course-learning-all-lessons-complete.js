
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
      activeLesson: 8,
      completed: new Set(LESSONS.map((_,index)=>index)),
      openSections: new Set([0, 1, 2]),
      tab: 'Overview',
      notes: {},
      timeline: 1080,
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
      const pct=100;
      $('#progressLabel').textContent=`Course Progress: ${pct}%`;
      $('#courseProgressFill').style.width='100%';
      $('#courseProgressBar').setAttribute('aria-valuenow','100');
      $('#progressNote').textContent='Watch-time-based progress · saved viewing across lessons';
      $('#progressDescription').textContent='All 9 lessons completed.';
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
      stopPreview();state.activeLesson=index;state.timeline=index===8?seconds(LESSONS[8].duration):0;
      state.openSections.add(LESSONS[index].sectionIndex);
      const lesson=currentLesson();
      $('#sectionEyebrow').textContent=`SECTION ${lesson.sectionIndex+1} · ${lesson.section.toUpperCase()}`;
      $('#slideEyebrow').textContent=index===8?'C# FUNDAMENTALS':lesson.section.toUpperCase();
      $('#slideTitle').textContent=lesson.name==='Variables and Data Types'?'Variables & Data Types':lesson.name;
      $('#slideCode').textContent=index===8?'Animal pet = new Dog();\npet.Speak();':index===3?'int age = 25;\nstring name = "Warda";\nbool isLearning = true;':`// ${lesson.name}\n// Illustrative lesson slide\n// No video media connected`;
      $('#lessonHeading').textContent=lesson.name;
      const specific=index===8;
      $('#lessonDescription').textContent=specific?'Use a common interface to work with different objects and bring your C# foundations together.':`Explore ${lesson.name.toLowerCase()} with guided C# examples.`;
      $('#overviewText').textContent=specific?'Learn how C# stores information using variables and data types. Follow along as Ahmed declares values, names variables clearly and explains when to use int, string, double and bool.':`This is a placeholder overview for ${lesson.name}. Real lesson text and video will load from the course-content API.`;
      $('#practiceText').textContent=specific?'Declare three variables for a learner profile. Try changing their values, then print a short introduction to the console.':`Use the exercise resources supplied by your instructor for ${lesson.name}.`;
      $('#notesLessonName').textContent=lesson.name;
      $('#lessonNotes').value=state.notes[index]||'';
      updateNotesCounter();
      $('#previousLesson').disabled=index===0;
      $('#nextLesson').disabled=index===LESSONS.length-1;
      $('#markComplete').textContent='Completed ✓';
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
    function updateNotesCounter() {$('#notesCounter').textContent=`${$('#lessonNotes').value.length} / 2000`;}
    $('#previousLesson').addEventListener('click',()=>openLesson(state.activeLesson-1));
    $('#nextLesson').addEventListener('click',()=>openLesson(state.activeLesson+1));
    for(const name of ['Overview','Resources','Notes']){$('#tab'+name).addEventListener('click',()=>setTab(name));}
    $('.lesson-tabs').addEventListener('keydown',(ev)=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(ev.key))return;
      const tabs=['Overview','Resources','Notes'];let i=tabs.indexOf(state.tab);
      i=ev.key==='Home'?0:ev.key==='End'?2:(i+(ev.key==='ArrowRight'?1:-1)+3)%3;
      setTab(tabs[i]);$('#tab'+tabs[i]).focus();ev.preventDefault();
    });
    $('#lessonNotes').addEventListener('input',updateNotesCounter);
    $('#saveNotes').addEventListener('click',()=>{
      state.notes[state.activeLesson]=$('#lessonNotes').value;
      announce('Notes saved in this page session only. They are not stored on your device or account.');
    });
    $$('[data-resource]').forEach(btn=>btn.addEventListener('click',()=>announce(`${btn.dataset.resource} is not available until course resources are connected.`)));
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
    $('#takeFinalQuiz').addEventListener('click',()=>$('#quizDialog').showModal());
    $('#closeQuizDialog').addEventListener('click',()=>$('#quizDialog').close());
    $('#quizDialog').addEventListener('click',(ev)=>{if(ev.target===$('#quizDialog'))$('#quizDialog').close();});
    $('#notificationsButton').addEventListener('click',()=>announce('Notifications can be connected to the EduHub Notifications screen.'));
    $('#accountButton').addEventListener('click',()=>announce('Use the WM avatar to open your Student Profile.'));
    $('#openMobileMenu').addEventListener('click',()=>$('#mobileMenu').showModal());
    $('#closeMobileMenu').addEventListener('click',()=>$('#mobileMenu').close());
    $('#mobileMenu').addEventListener('click',(ev)=>{if(ev.target===$('#mobileMenu'))$('#mobileMenu').close();});
    $('#feedback').addEventListener('click',dismissNotice);
    window.addEventListener('pagehide',stopPreview);
    // First paint: exact Figma state — final lesson, 9 completed, 100% progress.
    // A local lesson query parameter allows links from the existing enrolled-course page.
    const requestedLesson = new URLSearchParams(window.location.search).get('lesson');
    const resolvedLesson = requestedLesson !== null && /^(?:[0-8])$/.test(requestedLesson) ? Number(requestedLesson) : 8;
    openLesson(resolvedLesson);setTab('Overview');
  