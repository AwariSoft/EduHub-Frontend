
    /* ============================================================
       Figma-aligned frontend interactions: preview, curriculum and
       already-enrolled lesson routing. No fabricated backend state.
       ============================================================ */
    (() => {
      'use strict';
      const byId = id => document.getElementById(id);
      const previewDialog=byId('previewDialog');
      const learningDialog=byId('learningDialog');
      const menuDialog=byId('menuDialog');
      const toast=byId('toast');
      function show(dialog) { if (typeof dialog.showModal==='function') dialog.showModal(); else dialog.setAttribute('open',''); }
      function hide(dialog) { if (dialog?.open && typeof dialog.close==='function') dialog.close(); else dialog?.removeAttribute('open'); }
      document.querySelectorAll('[data-open-preview]').forEach(button=>button.addEventListener('click',()=>show(previewDialog)));
      byId('continueLearningButton').addEventListener('click',()=>{
        byId('learningDialogLesson').textContent='Next lesson: Variables and Data Types';
        byId('learningDialogStart').href='../student/course-learning.html?lesson=3';
        show(learningDialog);
      });
      document.querySelectorAll('.curriculum-lesson').forEach(button=>button.addEventListener('click',()=>{
        byId('learningDialogLesson').textContent='Lesson: '+button.dataset.lesson;
        const lessonNames=['Welcome to the Course','What is C#?','Setting Up the Environment','Variables and Data Types','Operators','Conditional Statements','Classes and Objects','Inheritance','Polymorphism'];
        const lessonIndex=lessonNames.indexOf(button.dataset.lesson);
        byId('learningDialogStart').href='../student/course-learning.html?lesson='+(lessonIndex>=0?lessonIndex:3);
        show(learningDialog);
      }));
      byId('menuOpen').addEventListener('click',()=>show(menuDialog));
      document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>hide(byId(button.dataset.close))));
      document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{
        if (event.target===dialog) hide(dialog);
      }));
      document.querySelectorAll('[data-notice]').forEach(button=>button.addEventListener('click',()=>{
        toast.textContent=button.dataset.notice; toast.hidden=false;
      }));
      toast.addEventListener('click',()=>toast.hidden=true);
      document.addEventListener('keydown',event=>{ if(event.key==='Escape') toast.hidden=true; });
      // Integration point: authorize GET /api/courses/csharp/lessons/{id}
      // against enrollment before enabling real course media and progress APIs.
      // Never mark progress complete from this static page.
    })();
