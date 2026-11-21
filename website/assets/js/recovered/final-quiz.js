
  'use strict';
  (()=>{
    // 06 — Data. Question 1 is literal Figma copy; questions 2–10 are illustrative
    // frontend-only C# prompts, not sourced from a production question bank.
    const questions = [
      {title:'What is the correct keyword used to define a class in C#?',options:['function','class','object','method'],correct:1},
      {title:'Which C# type is commonly used to store whole numbers?',options:['string','bool','int','double'],correct:2},
      {title:'Which keyword creates a new object instance in C#?',options:['this','create','make','new'],correct:3},
      {title:'What access modifier makes a member available to any other class?',options:['private','protected','public','internal'],correct:2},
      {title:'Which C# keyword begins a conditional branch?',options:['if','for','return','using'],correct:0},
      {title:'Which statement is used to repeat code while a condition is true?',options:['switch','while','class','namespace'],correct:1},
      {title:'Which operator compares two values for equality in C#?',options:['=','===','==','=>'],correct:2},
      {title:'Which keyword defines a method that does not return a value?',options:['null','void','empty','string'],correct:1},
      {title:'Which OOP concept allows a derived class to reuse base-class behavior?',options:['Encapsulation','Inheritance','Overloading','Casting'],correct:1},
      {title:'What is polymorphism in object-oriented programming?',options:['Giving every class one fixed method','Writing code without classes','Using a common interface with different implementations','Making all fields public'],correct:2}
    ];
    const $ = selector=>document.querySelector(selector);
    const $$ = selector=>Array.from(document.querySelectorAll(selector));
    let answers = Array(questions.length).fill(null);answers[0]=1; // Figma: class preselected
    let current=0;let submitted=false;
    const answerOptions=$('#answerOptions'),heading=$('#questionHeading'),questionNumbers=$('#questionNumbers');
    const announcer=$('#announcer');
    function announce(msg){announcer.textContent='';requestAnimationFrame(()=>announcer.textContent=msg)}
    function counts(){const n=answers.filter(a=>a!==null).length;return {answered:n,unanswered:questions.length-n}}
    function renderQuestion(){
      const q=questions[current];heading.textContent=q.title;$('#questionCounter').textContent=`Question ${current+1} of ${questions.length}`;
      answerOptions.replaceChildren();
      q.options.forEach((text,i)=>{
        const label=document.createElement('label');label.className='answer-option'+(answers[current]===i?' selected':'');
        const input=document.createElement('input');input.type='radio';input.name='answer';input.value=String(i);input.checked=answers[current]===i;input.disabled=submitted;
        input.addEventListener('change',()=>{answers[current]=i;renderQuestion();announce(`Question ${current+1}: ${text} selected`)});
        const caption=document.createElement('span');caption.className='answer-text';caption.textContent=text;
        label.append(input,caption);
        if(answers[current]===i){const status=document.createElement('span');status.className='selected-caption';status.textContent='Selected';label.append(status)}
        answerOptions.append(label);
      });
      $('#previousQuestion').disabled=current===0;
      $('#nextQuestion').disabled=current===questions.length-1;
      $('#selectionHelp').textContent=submitted?'Demo submitted. Your previous answers remain visible for review.':'Your selection is recorded for review. Results appear after submission.';
      questionNumbers.replaceChildren();
      answers.forEach((answer,i)=>{
        const btn=document.createElement('button');btn.type='button';btn.className='nav-dot'+(answer!==null?' answered':'')+(i===current?' current':'');
        btn.textContent=i+1;btn.setAttribute('aria-label',`Question ${i+1}, ${answer===null?'unanswered':'answered'}${i===current?', current':''}`);
        if(i===current)btn.setAttribute('aria-current','step');
        btn.addEventListener('click',()=>goTo(i));questionNumbers.append(btn);
      });
      const {answered,unanswered}=counts();$('#answerCount').textContent=`${answered} answered · ${unanswered} unanswered`;
      $('#navDescription').textContent=`Question ${current+1} is current and ${answers[current]===null?'unanswered':'answered'}. Review your selections before submitting.`;
      $('#submitQuiz').disabled=false;$('#submitQuiz').textContent=submitted?'View Demo Result':'Submit Quiz';
    }
    function goTo(i){if(i<0||i>=questions.length)return;current=i;renderQuestion();announce(`Question ${i+1} of 10`)}
    $('#previousQuestion').addEventListener('click',()=>goTo(current-1));
    $('#nextQuestion').addEventListener('click',()=>goTo(current+1));
    $('#submitQuiz').addEventListener('click',()=>{
      if(submitted){$('#resultsDialog').showModal();return;}
      const c=counts();$('#submitDescription').textContent=`You answered ${c.answered} of ${questions.length} questions. You can still change answers by choosing Review Answers.`;
      const w=$('#unansweredNotice');w.textContent=c.unanswered?`${c.unanswered} unanswered question${c.unanswered===1?'':'s'} will count as incorrect if submitted.`:'All questions have been answered.';
      w.className='small mb-3 '+(c.unanswered?'text-danger':'text-success');$('#submitDialog').showModal();
    });
    function submit(){
      $('#submitDialog').close();submitted=true;renderQuestion();
      const correct=answers.reduce((total,a,i)=>total+(a===questions[i].correct?1:0),0);
      const score=Math.round(correct/questions.length*100),passed=score>=70;
      $('#resultPercent').textContent=`${score}%`;
      $('#resultStatus').textContent=passed?'Demo passing threshold reached (70%).':'Demo passing threshold not reached (70%).';
      $('#resultStatus').classList.toggle('passed',passed);
      $('#openPassingPreview').hidden=!passed;
      $('#resultDetails').textContent=`${correct} of ${questions.length} answers correct. This is a local demonstration result only.`;
      $('#resultsDialog').showModal();announce(`Demo quiz result: ${score} percent`);
    }
    $('#confirmSubmit').addEventListener('click',submit);
    $('#returnToQuestions').addEventListener('click',()=>$('#submitDialog').close());
    $('#closeSubmitDialog').addEventListener('click',()=>$('#submitDialog').close());
    $('#closeResultsDialog').addEventListener('click',()=>$('#resultsDialog').close());
    $('#reviewResult').addEventListener('click',()=>{$('#resultsDialog').close();heading.scrollIntoView({block:'center',behavior:'smooth'})});
    $('#retryQuiz').addEventListener('click',()=>{$('#resultsDialog').close();answers=Array(10).fill(null);answers[0]=1;current=0;submitted=false;renderQuestion();announce('Demo quiz reset')});
    ['desktopSearch','mobileSearch'].forEach(id=>$('#'+id).addEventListener('submit',e=>{e.preventDefault();const q=new FormData(e.currentTarget).get('q')?.toString().trim()||'';if(q)window.location.href='../public/explore-courses.html?search='+encodeURIComponent(q)}));
    $('#notificationButton').addEventListener('click',()=>announce('Notifications are available in the EduHub notification screens.'));
    $('#menuToggle').addEventListener('click',()=>$('#mobileMenu').showModal());
    $('#closeMobileMenu').addEventListener('click',()=>$('#mobileMenu').close());
    $('#mobileMenu').addEventListener('click',e=>{if(e.target===$('#mobileMenu'))$('#mobileMenu').close()});
    [$('#submitDialog'),$('#resultsDialog')].forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()}));
    renderQuestion();
  })();
  