
  (() => {
    'use strict';
    const seed = {"student": [{"id": "s1", "icon": "book", "time": "Nov 1, 2026 · 9:30 AM", "title": "New practice resources available", "body": "Complete C# Programming has updated practice files for Classes and Objects.", "action": "View Course Details", "dest": "course", "unread": true}, {"id": "s2", "icon": "clipboard", "time": "Oct 31, 2026 · 3:15 PM", "title": "Your assessment is ready", "body": "SQL Server Essentials: review the final quiz requirements in My Learning.", "action": "Go to My Learning", "dest": "learning", "unread": true}, {"id": "s3", "icon": "award", "time": "Oct 30, 2026 · 11:00 AM", "title": "Your certificate is available", "body": "Your Python Programming Basics certificate is ready to view. Well done on completing your course.", "action": "View My Certificate", "dest": "certificate", "unread": true}, {"id": "s4", "icon": "receipt", "time": "Oct 29, 2026 · 10:05 AM", "title": "Payment completed", "body": "Complete C# Programming · $49.00. Your sample payment record is available.", "action": "View Payment Details", "dest": "payment", "unread": false}, {"id": "s5", "icon": "book", "time": "Oct 29, 2026 · 10:05 AM", "title": "You’re enrolled in Complete C# Programming", "body": "Your course with Ahmed Mohamed is now in My Learning.", "action": "Go to My Learning", "dest": "learning", "unread": false}, {"id": "s6", "icon": "book", "time": "Oct 28, 2026 · 2:20 PM", "title": "Course content updated", "body": "HTML & CSS Fundamentals: the responsive layout lesson has been updated.", "action": "View Course Details", "dest": "course", "unread": false}], "instructor": [{"id": "i1", "icon": "check", "time": "Nov 1, 2026 · 9:00 AM", "title": "Your course was approved", "body": "Complete C# Programming · Review the approval status in your course workspace.", "action": "View Course Review Status", "dest": "review", "unread": true}, {"id": "i2", "icon": "clipboard", "time": "Oct 31, 2026 · 2:30 PM", "title": "Your course needs changes", "body": "ASP.NET Core Web Development was not approved. Review the feedback before resubmitting.", "action": "View Course Review Status", "dest": "review", "unread": true}, {"id": "i3", "icon": "user", "time": "Oct 30, 2026 · 10:00 AM", "title": "A new student enrolled", "body": "Complete C# Programming has a new enrollment. View your course’s student list.", "action": "View Course Students", "dest": "students", "unread": false}], "admin": [{"id": "a1", "icon": "book-check", "time": "Nov 1, 2026 · 9:10 AM", "title": "A course was submitted for review", "body": "SQL Server Essentials by Mohamed Hassan is awaiting a course review.", "action": "Review Course", "dest": "review", "unread": true}, {"id": "a2", "icon": "receipt", "time": "Oct 31, 2026 · 4:00 PM", "title": "A refund request needs review", "body": "A request for HTML & CSS Fundamentals is available in its payment record.", "action": "View Payment Record", "dest": "payment-record", "unread": true}]};
    const state = new Map();
    for (const key of ['student','instructor','admin']) state.set(key, { items: seed[key].map(x=>({...x})), filter:key === 'student'?'unread':'all' });
    const $=(selector,root=document)=>root.querySelector(selector);
    const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
    const entities={
      course:'Course Details',learning:'My Learning',certificate:'My Certificates',payment:'Payment Details',
      review:'Course Review Status',students:'Course Students', 'payment-record':'Payment Record',dashboard:'Student Dashboard'
    };
    const glyphs = {"book": ["fa-solid fa-book-open", "<path d=\"M12 6.2C9 4.5 5.8 4.3 2 5.2v13.4c4.2-.9 7.5-.6 10 1.3m0-13.7c3-1.7 6.2-1.9 10-1v13.4c-4.2-.9-7.5-.6-10 1.3m0-13.7V20\"/>"], "clipboard": ["fa-regular fa-clipboard", "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"/><rect x=\"9\" y=\"2\" width=\"6\" height=\"4\" rx=\"1\"/><path d=\"m9 13 2 2 4-4\"/>"], "award": ["fa-solid fa-award", "<circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"m9 12-1 9 4-2 4 2-1-9\"/>"], "receipt": ["fa-solid fa-receipt", "<path d=\"M5 3h14v18l-3-2-4 2-4-2-3 2z\"/><path d=\"M8 8h8M8 12h8M8 16h4\"/>"], "check": ["fa-regular fa-circle-check", "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m8 12 3 3 5-6\"/>"], "user": ["fa-solid fa-user-plus", "<circle cx=\"10\" cy=\"8\" r=\"3.3\"/><path d=\"M3.5 20v-2.5C3.5 14 6 13 10 13s6.5 1 6.5 4.5V20M19 10v6m-3-3h6\"/>"], "book-check": ["fa-solid fa-book-open-reader", "<path d=\"M12 6.2C9 4.5 5.8 4.3 2 5.2v13.4c4.2-.9 7.5-.6 10 1.3m0-13.7c3-1.7 6.2-1.9 10-1v13.4c-4.2-.9-7.5-.6-10 1.3m0-13.7V20m4-10 2 2 4-4\"/>"], "bell-off": ["fa-regular fa-bell-slash", "<path d=\"M8 4a6 6 0 0 1 10 5v4l2 3H6l1-2M9 20h6M3 3l18 18\"/>"], "cloud-off": ["fa-solid fa-cloud-slash", "<path d=\"M8 7a6 6 0 0 1 10 4 5 5 0 0 1 1 9H6a5 5 0 0 1-1-10M3 3l18 18\"/>"], "info": ["fa-solid fa-circle-info", "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 11v5M12 7.4h.01\"/>"], "spinner": ["fa-solid fa-spinner fa-spin", "<path d=\"M20 12a8 8 0 1 1-8-8\"/>"]};
    const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const svgIcon=(name,size=20)=>{ const [klass,path]=glyphs[name]||glyphs.book; return `<span class="eh-icon" aria-hidden="true" style="--icon-size:${size}px"><i class="${klass}"></i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>`; };
    function toast(message) {
      const el=$('#feedback-toast'); $('#feedback-message').textContent=message; el.hidden=false;
      $('#feedback-close').focus({preventScroll:true});
    }
    $('#feedback-close').addEventListener('click',()=>{ $('#feedback-toast').hidden=true; });
    function rowHtml(item){
      return `<article class="notice-row ${item.unread?'is-unread':'is-read'}" data-note-id="${esc(item.id)}">
        <div class="notice-symbol">${svgIcon(item.icon)}</div><div class="notice-body">
          <div class="notice-meta">${item.unread?'<span class="unread-dot" aria-hidden="true"></span>':''}<span>${item.unread?'Unread':'Read'} · ${esc(item.time)}</span></div>
          <h3 class="notice-title">${esc(item.title)}</h3><p class="notice-text">${esc(item.body)}</p>
          <div class="notice-actions"><button type="button" class="text-action dest-action" data-dest="${esc(item.dest)}">${esc(item.action)} <span aria-hidden="true">→</span></button>
          ${item.unread?`<button type="button" class="text-action mark-one" data-note-id="${esc(item.id)}">Mark as read</button>`:''}</div></div></article>`;
    }
    function updatePanel(key){
      const panel=$(`[data-panel="${key}"]`);if(!panel||!state.has(key))return;
      const data=state.get(key);const count=data.items.filter(x=>x.unread).length;
      $('.count-all',panel).textContent=`(${data.items.length})`;
      $('.count-unread',panel).textContent=`(${count})`;
      $$('.notification-tab',panel).forEach(tab=>{const active=tab.dataset.filter===data.filter;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));});
      const summary=$('.panel-summary',panel);
      summary.textContent=key==='student' ? `${count} unread notification${count===1?'':'s'}`:'Most recent first';
      const all=$('.mark-all',panel);if(all)all.hidden=count===0;
      const display=data.filter==='unread'?data.items.filter(x=>x.unread):data.items;
      $('.notices-list',panel).innerHTML=display.length?display.map(rowHtml).join(''):'<div class="panel-empty-inline">No unread notifications to show.</div>';
      $('#status-live').textContent=`${key} notifications updated: ${count} unread`;
    }
    document.addEventListener('click',event=>{
      const button=event.target.closest('button');if(!button)return;
      const panel=button.closest('.notification-panel');
      if(button.matches('.dest-action')){
        const label=entities[button.dataset.dest]||'this page';
        toast(`${label} is not connected in this states demo. No navigation or account changes were made.`);return;
      }
      if(button.matches('.notification-tab')&&panel&&state.has(panel.dataset.panel)){
        const role=panel.dataset.panel;state.get(role).filter=button.dataset.filter;updatePanel(role);return;
      }
      if(button.matches('.mark-one')&&panel&&state.has(panel.dataset.panel)){
        const role=panel.dataset.panel,note=state.get(role).items.find(x=>x.id===button.dataset.noteId);
        if(note)note.unread=false;updatePanel(role);return;
      }
      if(button.matches('.mark-all')&&panel&&state.has(panel.dataset.panel)){
        const role=panel.dataset.panel;state.get(role).items.forEach(x=>x.unread=false);updatePanel(role);return;
      }
      if(button.matches('.retry-btn')&&panel){
        const contents=$('.error-state',panel);contents.innerHTML=`<div class="big-outcome">${svgIcon('spinner',36)}</div><h3>Loading your notifications…</h3><p>Demonstrating a retry with sample data. No server request is sent.</p>`;
        panel.setAttribute('aria-busy','true');
        setTimeout(()=>{
          panel.removeAttribute('aria-busy');
          const body=$('.error-state',panel);if(!body)return;
          body.className='retry-results';
          body.innerHTML=`<div class="retry-banner">Sample notifications restored · This is a local demonstration.</div>${seed.student.filter(x=>x.unread).map(rowHtml).join('')}`;
          toast('The retry demonstration loaded sample notifications only; no network request was made.');
        },650);
      }
    });
    // No network, backend calls, localStorage or sessionStorage: state resets on reload.
    // Render all 6 grounded student notifications only when the All tab is selected.
    const updateIconMode = () => {
      const loaded = document.fonts && Array.from(document.fonts).some(face => /Font Awesome 6 Free/i.test(face.family) && face.status === 'loaded');
      document.documentElement.classList.toggle('fa-ready', !!loaded);
    };
    updateIconMode();
    window.addEventListener('load', updateIconMode, { once:true });
    document.fonts?.ready?.then(updateIconMode);
  })();
