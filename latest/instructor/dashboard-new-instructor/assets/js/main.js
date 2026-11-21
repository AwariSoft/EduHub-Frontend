(()=>{'use strict';
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const workspace=$('#workspace'),account=$('#accountToggle'),accMenu=$('#accountMenu'),note=$('#notificationToggle'),noteMenu=$('#notificationMenu');
function closeMenus(){[[account,accMenu],[note,noteMenu]].forEach(([btn,p])=>{if(btn&&p){p.hidden=true;btn.setAttribute('aria-expanded','false')}})}
function toggleMenu(btn,p){let open=p.hidden;closeMenus();p.hidden=!open;btn.setAttribute('aria-expanded',String(open))}
account?.addEventListener('click',e=>{e.stopPropagation();toggleMenu(account,accMenu)});
note?.addEventListener('click',e=>{e.stopPropagation();toggleMenu(note,noteMenu)});
document.addEventListener('click',e=>{if(!e.target.closest('.account-actions'))closeMenus()});
const collapse=$('#sidebarCollapse');
collapse?.addEventListener('click',()=>{const state=workspace.classList.toggle('sidebar-collapsed');collapse.setAttribute('aria-pressed',String(state));collapse.setAttribute('aria-label',state?'Expand sidebar':'Collapse sidebar');collapse.title=state?'Expand sidebar':'Collapse sidebar'});
const drawer=$('#mobileDrawer'),backdrop=$('#mobileBackdrop'),menuButton=$('#mobileMenuToggle'),closeButton=$('#mobileMenuClose');let focusBefore=null;
function closeDrawer(){if(!drawer)return;drawer.classList.remove('is-open');backdrop.hidden=true;menuButton.setAttribute('aria-expanded','false');document.body.style.overflow='';focusBefore?.focus?.()}
function openDrawer(){focusBefore=document.activeElement;drawer.classList.add('is-open');backdrop.hidden=false;menuButton.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';closeButton.focus()}
menuButton?.addEventListener('click',openDrawer);closeButton?.addEventListener('click',closeDrawer);backdrop?.addEventListener('click',closeDrawer);
drawer?.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const list=Array.from(drawer.querySelectorAll('a,button')).filter(e=>e.getClientRects().length>0);if(!list.length)return;const first=list[0],last=list.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenus();if(drawer?.classList.contains('is-open'))closeDrawer()}});
const form=$('#courseSearchForm'),input=$('#courseSearch'),status=$('#resultStatus');
function announceSearch(){const q=input.value.trim();status.textContent=q?`No courses yet. Create your first course before searching for “${q}”.`:'Your course library is empty. Create your first course to get started.'}
form?.addEventListener('submit',e=>{e.preventDefault();announceSearch();$('#myCoursesHeading')?.scrollIntoView({block:'start',behavior:'smooth'})});
input?.addEventListener('input',announceSearch);
})();