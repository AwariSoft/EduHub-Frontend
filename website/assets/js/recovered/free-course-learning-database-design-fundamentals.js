
  (() => {
    'use strict';
    // 06 — Static Figma syllabus; all progress changes are page-local demonstrations.
    const lessons = [{"name": "Understanding Relational Databases", "duration": "12:00", "section": "Relational Foundations", "chapter": 1, "description": "Discover how tables, rows and relationships work together to organize information.", "overview": "Dina introduces relational databases using a simple library example. Learn what makes a table useful, how records are stored and why relationships help keep data consistent."}, {"name": "Entities and Attributes", "duration": "14:00", "section": "Relational Foundations", "chapter": 1, "description": "Identify entities and attributes in everyday information systems.", "overview": "Explore how meaningful entities and their attributes become the building blocks of a database design."}, {"name": "Keys and Relationships", "duration": "14:00", "section": "Relational Foundations", "chapter": 1, "description": "Understand primary keys and how records connect across tables.", "overview": "Practice recognizing unique identifiers and relationships between the entities in a database."}, {"name": "Gathering Requirements", "duration": "15:00", "section": "From Requirements to Schema", "chapter": 2, "description": "Translate user needs into clear database requirements.", "overview": "Review sample requirements and identify the data an application needs to store."}, {"name": "Normalization in Practice", "duration": "18:00", "section": "From Requirements to Schema", "chapter": 2, "description": "Organize data to reduce duplication and maintain consistency.", "overview": "Use simple examples to see how normalizing tables improves data organization."}, {"name": "Designing a Library Database", "duration": "17:00", "section": "From Requirements to Schema", "chapter": 2, "description": "Put the concepts together into a practical database schema.", "overview": "Apply your knowledge to outline a relational schema for a simple library system."}];
    const byId = id => document.getElementById(id);
    const completed = new Set();
    const notes = new Map();
    let activeLesson = 0;
    let playbackSeconds = 0;
    let playbackSpeed = 1;
    let activeTab = 'Overview';
    let feedbackCleanup = null;

    byId('playerImage').addEventListener('error',()=>{byId('playerImage').hidden=true;});
    function message(text){
      const box=byId('feedback');box.textContent=text;box.hidden=false;
      if(feedbackCleanup)window.clearTimeout(feedbackCleanup);
      feedbackCleanup=window.setTimeout(()=>{box.hidden=true;},4600);
    }
    function durationSeconds(value){const [min,sec]=value.split(':').map(Number);return min*60+sec;}
    function formatSeconds(value){const min=Math.floor(value/60);const sec=Math.floor(value%60);return String(min).padStart(2,'0')+':'+String(sec).padStart(2,'0');}
    function seekRender(){
      const total=durationSeconds(lessons[activeLesson].duration);
      playbackSeconds=Math.min(Math.max(playbackSeconds,0),total);
      const percentage=total ? 100*playbackSeconds/total : 0;
      byId('lessonSeek').max=String(total);
      byId('lessonSeek').value=String(Math.round(playbackSeconds));
      byId('lessonSeek').style.background=`linear-gradient(90deg,var(--ed-blue) ${percentage}%, #334155 ${percentage}%)`;
      byId('playbackLabel').textContent=formatSeconds(playbackSeconds)+' / '+lessons[activeLesson].duration;
    }
    function showPlayerNotice(){byId('playerNote').hidden=false;message('This is an illustrative player. No video or audio is streamed.');}
    function progressRender(){
      const value=Math.round(completed.size/lessons.length*100);
      byId('progressLabel').textContent='Course Progress: '+value+'%';
      byId('progressValue').style.width=value+'%';
      byId('progressExplanation').textContent=value===0?'Watch-time-based progress · saved viewing across lessons':'Demo completion progress · not saved to your account';
      byId('progressTrack').setAttribute('aria-valuenow',String(value));
      byId('journeyCaption').textContent=value===0?'Your journey starts here.':value===100?'All six lessons are marked complete in this demo.':'Your progress in this demo is not synced to an account.';
    }
    const groups=[
      {title:'Relational Foundations',meta:'3 lessons · 40m',start:0},
      {title:'From Requirements to Schema',meta:'3 lessons · 50m',start:3}
    ];
    function curriculumRender(){
      const root=byId('curriculumList');
      const expanded=[...root.querySelectorAll('details')].map(d=>d.open);
      root.textContent='';
      groups.forEach((g,groupIndex)=>{
        const section=document.createElement('details');section.className='curriculum-section';section.open=expanded[groupIndex]??true;
        const summary=document.createElement('summary');
        const titleWrapper=document.createElement('span');
        const name=document.createElement('span');name.className='section-name';name.textContent=g.title;
        const meta=document.createElement('span');meta.className='section-subtitle';meta.textContent=g.meta;
        titleWrapper.append(name,meta);
        const chevron=document.createElement('i');chevron.className='fa-solid fa-chevron-down section-chevron';chevron.setAttribute('aria-hidden','true');
        summary.append(titleWrapper,chevron);section.append(summary);
        lessons.slice(g.start,g.start+3).forEach((lesson,offset)=>{
          const index=g.start+offset;
          const btn=document.createElement('button');btn.type='button';btn.className='lesson-item';
          if(index===activeLesson)btn.setAttribute('aria-current','true');
          if(completed.has(index))btn.classList.add('completed');
          const symbol=document.createElement('i');symbol.className='state-icon '+(completed.has(index)?'fa-regular fa-circle-check':index===activeLesson?'fa-regular fa-circle-play':'fa-solid fa-play');symbol.setAttribute('aria-hidden','true');
          const text=document.createElement('span');text.className='lesson-name';text.textContent=lesson.name;
          const duration=document.createElement('span');duration.className='duration';duration.textContent=lesson.duration;
          btn.append(symbol,text,duration);
          btn.addEventListener('click',()=>changeLesson(index));section.append(btn);
        });
        root.append(section);
      });
    }
    function changeLesson(index){
      if(!Number.isInteger(index)||index<0||index>=lessons.length)return;
      // Do not silently discard a pending notes edit.
      const currentText=byId('noteInput').value;
      if(currentText!==String(notes.get(activeLesson)??'')&&activeTab==='Notes'){
        if(!window.confirm('Your note edits are not saved in this page. Switch lessons anyway?'))return;
      }
      activeLesson=index;playbackSeconds=0;
      const l=lessons[index];
      byId('lessonEyebrow').textContent='SECTION '+l.chapter+' · '+l.section.toUpperCase();
      byId('lessonTitle').textContent=l.name;
      byId('lessonDescription').textContent=l.description;
      byId('overviewHeading').textContent=index===0?'Start with the big picture':'About this lesson';
      byId('overviewText').textContent=l.overview;
      byId('notesLessonTitle').textContent=l.name;
      byId('noteInput').value=notes.get(index)||'';
      byId('noteCount').textContent=byId('noteInput').value.length+' / 2000';
      byId('previousLesson').disabled=index===0;
      byId('nextLesson').disabled=index===lessons.length-1;
      byId('markComplete').textContent=completed.has(index)?'Completed — Undo':'Mark as Completed';
      seekRender();curriculumRender();
    }
    byId('previousLesson').addEventListener('click',()=>changeLesson(activeLesson-1));
    byId('nextLesson').addEventListener('click',()=>changeLesson(activeLesson+1));
    byId('markComplete').addEventListener('click',()=>{
      if(completed.has(activeLesson)){completed.delete(activeLesson);message('Completion reverted in this page only.');}
      else{completed.add(activeLesson);message('Lesson marked complete in this demo. No account changes were saved.');}
      byId('markComplete').textContent=completed.has(activeLesson)?'Completed — Undo':'Mark as Completed';
      curriculumRender();progressRender();
    });
    // Accessible tabs: button and arrow navigation, with no backend resources.
    const tabNames=['Overview','Resources','Notes'];
    function chooseTab(name){
      activeTab=name;
      tabNames.forEach(k=>{
        const selected=k===name;
        byId('tab'+k).setAttribute('aria-selected',String(selected));
        byId('tab'+k).tabIndex=selected?0:-1;
        byId('panel'+k).hidden=!selected;
      });
    }
    tabNames.forEach((key,i)=>{
      const button=byId('tab'+key);
      button.addEventListener('click',()=>chooseTab(key));
      button.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
        event.preventDefault();
        const next=event.key==='Home'?0:event.key==='End'?tabNames.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabNames.length)%tabNames.length;
        chooseTab(tabNames[next]);byId('tab'+tabNames[next]).focus();
      });
    });
    byId('resourcePreview').addEventListener('click',()=>message('No lesson resource files are connected in this frontend demo.'));
    byId('noteInput').addEventListener('input',()=>{byId('noteCount').textContent=byId('noteInput').value.length+' / 2000';});
    byId('saveNotes').addEventListener('click',()=>{notes.set(activeLesson,byId('noteInput').value);message('Note saved in this page only; it will be lost on reload.');});
    byId('lessonSeek').addEventListener('input',e=>{playbackSeconds=Number(e.target.value);seekRender();});
    byId('playLarge').addEventListener('click',showPlayerNotice);
    byId('playToolbar').addEventListener('click',showPlayerNotice);
    byId('volumeToolbar').addEventListener('click',()=>{const i=byId('volumeToolbar').querySelector('i');i.classList.toggle('fa-volume-high');i.classList.toggle('fa-volume-xmark');message('Demo icon only — no audio is available.');});
    byId('speedToolbar').addEventListener('click',()=>{const speeds=[1,1.25,1.5,2];const next=(speeds.indexOf(playbackSpeed)+1)%speeds.length;playbackSpeed=speeds[next];byId('speedToolbar').textContent=playbackSpeed+'×';message('Demo playback speed control — no video stream is connected.');});
    byId('fullscreenToolbar').addEventListener('click',()=>{const box=byId('playerVisual');if(box.requestFullscreen){box.requestFullscreen().catch(()=>message('Fullscreen is unavailable in this environment.'));}else{message('Fullscreen is unavailable in this environment.');}});
    byId('notificationsButton').addEventListener('click',()=>message('Notifications are not connected to a live service in this page.'));
    byId('accountToggle').addEventListener('click',()=>{window.location.href='../student/student-profile.html';});
    const mobileMenu=byId('mobileMenu');
    byId('openMobileMenu').addEventListener('click',()=>{if(typeof mobileMenu.showModal==='function')mobileMenu.showModal();});
    byId('closeMobileMenu').addEventListener('click',()=>mobileMenu.close());
    mobileMenu.addEventListener('click',e=>{if(e.target===mobileMenu)mobileMenu.close();});
    const params=new URLSearchParams(window.location.search);
    const start=parseInt(params.get('lesson')||'1',10);
    changeLesson(Number.isInteger(start)&&start>=1&&start<=6?start-1:0);
    chooseTab('Overview');progressRender();
  })();
  