
(()=>{'use strict';
 const courses=[{"name": "Complete C# Programming", "instructor": "Ahmed Mohamed", "percent": 65, "color": "1E293B", "image": "C%23", "id": "csharp"}, {"name": "HTML & CSS Fundamentals", "instructor": "Sara Ali", "percent": 40, "color": "DCE8EE", "image": "HTML", "id": "html"}, {"name": "SQL Server Essentials", "instructor": "Mohamed Hassan", "percent": 80, "color": "073B5B", "image": "SQL", "id": "sql"}, {"name": "Python Programming Basics", "instructor": "Omar Khaled", "percent": 100, "color": "BDC9C0", "image": "PY", "id": "python"}, {"name": "Git & GitHub Essentials", "instructor": "Nour Ahmed", "percent": 100, "color": "273139", "image": "GIT", "id": "git"}, {"name": "UI Design Essentials", "instructor": "Mariam Adel", "percent": 0, "color": "D5D6E6", "image": "UI", "id": "ui"}, {"name": "JavaScript for Beginners", "instructor": "Omar Khaled", "rating": "4.8 (1.2k)", "price": "$24.99", "color": "172633", "image": "JS", "id": "js"}, {"name": "ASP.NET Core Web Development", "instructor": "Ahmed Mohamed", "rating": "4.9 (856)", "price": "$39.99", "color": "17234B", "image": "ASP.NET", "id": "asp"}, {"name": "Database Design Fundamentals", "instructor": "Dina Mostafa", "rating": "4.7 (642)", "price": "$29.99", "color": "1C333C", "image": "DATA", "id": "database"}];
 const root=document.documentElement;
 const toast=document.getElementById('statusToast');let toastTimeout=null;
 function notice(message){toast.textContent=message;toast.hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.hidden=true,4500)}
 function q(selector,ctx=document){return ctx.querySelector(selector)}function qa(selector,ctx=document){return [...ctx.querySelectorAll(selector)]}
 // Shared search across the three dashboard regions. Preserve one input across viewport changes.
 let searchValue='';let activeTab='all';
 const searchInputs=qa('.course-search');
 function filterAll(){const term=searchValue.trim().toLowerCase();qa('#continueCards .course-search-item,#exploreCards .course-search-item').forEach(card=>card.hidden=!card.dataset.search.includes(term));let visible=0;qa('#learningList .learning-row').forEach(row=>{const tabMatch=activeTab==='all'||row.dataset.filterStatus===activeTab;const searchMatch=row.dataset.search.includes(term);row.hidden=!(tabMatch&&searchMatch);if(!row.hidden)visible++});q('#learningEmpty').style.display=visible?'none':'block';}
 searchInputs.forEach(input=>input.addEventListener('input',()=>{searchValue=input.value;searchInputs.forEach(other=>{if(other!==input)other.value=searchValue});filterAll()}));
 function setTab(tab){activeTab=tab;qa('.learning-tab').forEach(button=>{const selected=button.dataset.tab===tab;button.classList.toggle('active',selected);button.setAttribute('aria-selected',String(selected))});filterAll()}
 qa('.learning-tab').forEach(button=>button.addEventListener('click',()=>setTab(button.dataset.tab)));
 q('#viewAllLearning').addEventListener('click',()=>setTab('all'));
 const sidebarToggle=q('#sidebarToggle');sidebarToggle.addEventListener('click',()=>{if(matchMedia('(min-width: 1200px)').matches){const collapsed=document.body.classList.toggle('sidebar-collapsed');sidebarToggle.setAttribute('aria-expanded',String(!collapsed));sidebarToggle.querySelector('.side-label').textContent=collapsed?'Expand sidebar':'Collapse sidebar'}else notice('The tablet sidebar is already compact. Use the navigation icons to move between sections.')});
 // Native, accessible dropdowns; no Bootstrap JavaScript dependency needed.
 function toggleMenu(button,menu){const open=menu.hidden;menu.hidden=!open;button.setAttribute('aria-expanded',String(open))}
 q('#accountButton').addEventListener('click',()=>toggleMenu(q('#accountButton'),q('#accountMenu')));
 q('#mobileAccountToggle').addEventListener('click',()=>toggleMenu(q('#mobileAccountToggle'),q('#mobileAccountMenu')));
 function closeMenus(){['accountMenu','mobileAccountMenu'].forEach(id=>q('#'+id).hidden=true);['accountButton','mobileAccountToggle'].forEach(id=>q('#'+id).setAttribute('aria-expanded','false'))}
 document.addEventListener('click',event=>{if(!event.target.closest('#accountButton,#accountMenu,#mobileAccountToggle,#mobileAccountMenu'))closeMenus()});
 // Mobile navigation supports Escape, clicking the scrim, and keyboard focus return.
 const openButton=q('#menuOpen'),drawer=q('#studentDrawer'),mask=q('#drawerMask'),closeButton=q('#drawerClose');
 function setDrawer(open){drawer.hidden=!open;mask.hidden=!open;openButton.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':'';if(open)closeButton.focus();else openButton.focus()}
 openButton.addEventListener('click',()=>setDrawer(true));closeButton.addEventListener('click',()=>setDrawer(false));mask.addEventListener('click',()=>setDrawer(false));qa('a',drawer).forEach(a=>a.addEventListener('click',()=>{if(!a.hasAttribute('data-pending'))setDrawer(false)}));
 // Related course detail modal: no fictitious backend calls.
 let courseReturnFocus=null;const overlay=q('#courseOverlay'),courseDialog=q('.course-modal',overlay);
 function showCourse(id,action,trigger){const d=courses.find(x=>x.id===id);if(!d)return;courseReturnFocus=trigger;q('#courseModalTitle').textContent=d.name;q('#courseModalByline').textContent='Instructor: '+d.instructor;const detail=q('#courseModalDetail');detail.textContent=d.percent===undefined ? 'Course price: '+d.price+' · Rating: '+d.rating : 'Current course progress: '+d.percent+'%';q('#modalLearningLink').textContent=d.id==='csharp'?'View Course Details':(d.percent===undefined?'Explore more courses':'Back to My Learning');q('#modalLearningLink').href=d.id==='csharp'?'../states/course-details-already-enrolled.html':(d.percent===undefined?'../public/home.html#courses':'#my-learning');overlay.hidden=false;document.body.style.overflow='hidden';courseDialog.focus()}
 function hideCourse(){overlay.hidden=true;document.body.style.overflow='';if(courseReturnFocus)courseReturnFocus.focus()}
 // Keep mobile bottom navigation's active tab synchronized with in-page anchors.
 qa('.mobile-bottom-nav .bottom-nav-link').forEach(link=>link.addEventListener('click',()=>{qa('.mobile-bottom-nav .bottom-nav-link').forEach(other=>{other.classList.remove('active');other.removeAttribute('aria-current')});link.classList.add('active');link.setAttribute('aria-current','page')}));
 qa('.course-open').forEach(button=>button.addEventListener('click',()=>showCourse(button.dataset.course,button.dataset.action,button)));
 q('#courseModalClose').addEventListener('click',hideCourse);overlay.addEventListener('click',event=>{if(event.target===overlay)hideCourse()});q('#modalLearningLink').addEventListener('click',hideCourse);
 // Unfinished destinations communicate clearly rather than failing silently.
 document.addEventListener('click',event=>{const link=event.target.closest('[data-pending]');if(!link)return;event.preventDefault();notice(link.dataset.pending+' screen is not implemented yet. This dashboard is a frontend prototype.');if(!drawer.hidden)setDrawer(false)});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(!overlay.hidden)hideCourse();else if(!drawer.hidden)setDrawer(false);else closeMenus()} if(event.key==='Tab'&&!overlay.hidden){const buttons=qa('button,a[href]',overlay);const first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});
 filterAll();
})();
