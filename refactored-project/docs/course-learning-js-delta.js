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
