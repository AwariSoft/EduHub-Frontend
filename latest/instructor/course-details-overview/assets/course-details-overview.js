
(()=>{'use strict';
const $=(sel,root=document)=>root.querySelector(sel);
const menuA=$('#accountMenu'),menuN=$('#notificationMenu');
function closeMenus(){for(const [btn,menu] of [['#accountToggle',menuA],['#bellToggle',menuN]]){if(!menu)continue;menu.hidden=true;$(btn)?.setAttribute('aria-expanded','false')}}
for(const [btn,menu] of [['#accountToggle',menuA],['#bellToggle',menuN]]){const button=$(btn);if(!button||!menu)continue;button.addEventListener('click',e=>{e.stopPropagation();const show=menu.hidden;closeMenus();menu.hidden=!show;button.setAttribute('aria-expanded',String(show))})}
document.addEventListener('click',e=>{if(!e.target.closest('.floating-menu,.account-trigger,.bell-button'))closeMenus()});
const drawer=$('#drawer'),overlay=$('#drawerBackdrop'),drawerToggle=$('#drawerToggle');let prevFocus=null;
function setDrawer(open){if(!drawer||!overlay)return;if(open)prevFocus=document.activeElement;drawer.classList.toggle('is-open',open);drawer.setAttribute('aria-hidden',String(!open));overlay.hidden=!open;drawerToggle?.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':'';if(open)$('#drawerClose')?.focus();else (prevFocus||drawerToggle)?.focus()}
drawerToggle?.addEventListener('click',()=>setDrawer(true));$('#drawerClose')?.addEventListener('click',()=>setDrawer(false));overlay?.addEventListener('click',()=>setDrawer(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenus();if(drawer?.classList.contains('is-open'))setDrawer(false)}});
$('#collapseBtn')?.addEventListener('click',e=>{const open=$('#workspace').classList.toggle('sidebar-collapsed');e.currentTarget.setAttribute('aria-pressed',String(open));e.currentTarget.title=open?'Expand sidebar':'Collapse sidebar'});
const ctrl=$('#instructorControls');function sizeShell(){if(!ctrl)return;const mobile=matchMedia('(max-width:600px)').matches;const mob=$('.topbar-search-mobile');if(mob)mob.style.display=mobile?'block':'none';if(mobile){$('#mobileControls')?.appendChild(ctrl)}else{const top=$('.topbar');if(top)top.insertBefore(ctrl,$('#accountMenu'))}}window.addEventListener('resize',sizeShell);sizeShell();
for(const input of ['#globalSearch','#mobileGlobalSearch'])$(input)?.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.currentTarget.value.trim())location.href='eduhub-instructor-my-courses.html?q='+encodeURIComponent(e.currentTarget.value.trim())});
const toast=$('#courseToast');let toastTimer;
function notify(msg){toast.textContent=msg;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,4500)}
$('#viewPublicCourse')?.addEventListener('click',()=>notify('Public course preview requires the student-facing course details route. No external preview has been opened.'));
})();
