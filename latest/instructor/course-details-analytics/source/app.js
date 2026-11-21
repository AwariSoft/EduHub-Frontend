
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


(()=>{'use strict';
const months=['May','Jun','Jul','Aug','Sep','Oct'];
// Monthly figures are illustrative, since only Figma's aggregate totals are supplied.
const enrollments=[30,35,40,45,70,100]; // 320
const revenue=[100,180,250,300,420,550]; // $1,800
const period=document.getElementById('ca-period');
const fmt=new Intl.NumberFormat('en-US');
const rows={all:{start:0,label:'All time · May–Oct 2026'},three:{start:3,label:'Last 3 months · Aug–Oct 2026'},month:{start:5,label:'Last month · Oct 2026'}};
function drawLine(id,values,max){
 const points=values.map((v,i)=>[values.length===1?236:i*472/(values.length-1),159-v/max*154]);
 const d=points.map((xy,i)=>`${i?'L':'M'}${xy[0].toFixed(2)} ${xy[1].toFixed(2)}`).join(' ');
 document.getElementById(id).setAttribute('d',d);
}
function showPeriod(){
 const state=rows[period.value]||rows.all;
 const e=enrollments.slice(state.start),r=revenue.slice(state.start),labels=months.slice(state.start);
 const eTotal=e.reduce((a,b)=>a+b,0),rTotal=r.reduce((a,b)=>a+b,0);
 const eMax=Math.max(100,Math.ceil(Math.max(...e)/50)*50),rMax=Math.max(600,Math.ceil(Math.max(...r)/200)*200);
 drawLine('ca-enrollment-line',e,eMax);drawLine('ca-revenue-line',r,rMax);
 document.getElementById('ca-total-enrollments').textContent=fmt.format(eTotal);
 document.getElementById('ca-total-revenue').textContent='$'+fmt.format(rTotal);
 document.getElementById('ca-enroll-total').textContent=fmt.format(eTotal)+' total enrollments';
 document.getElementById('ca-revenue-total').textContent='$'+fmt.format(rTotal)+' total revenue';
 document.getElementById('ca-context-period').textContent=state.label;
 const range=labels.length===1?'Oct 2026':labels[0]+'–'+labels.at(-1)+' 2026';
 document.getElementById('ca-enroll-sub').textContent='Monthly enrollments · '+range;
 document.getElementById('ca-revenue-sub').textContent='Monthly instructor revenue · USD · '+range;
 document.getElementById('ca-e-max').textContent=fmt.format(eMax);
 document.getElementById('ca-e-mid').textContent=fmt.format(eMax/2);
 document.getElementById('ca-r-max').textContent='$'+fmt.format(rMax);
 document.getElementById('ca-r-mid').textContent='$'+fmt.format(rMax/2);
 for (const id of ['ca-enrollment-axis','ca-revenue-axis']){document.getElementById(id).replaceChildren(...labels.map(m=>{const x=document.createElement('span');x.textContent=m;return x;}));}
 const explanation=document.getElementById('ca-data-note');
 explanation.textContent=period.value==='all'?'320 historical enrollments in this course. Completion is rounded from 230 of 320 learners.':'Period totals are illustrative frontend sample data. Completion (72%) and section distribution remain all-time measures.';
 for (const id of ['ca-enrollment-chart','ca-revenue-chart']){document.getElementById(id).closest('[role="img"]').setAttribute('aria-label',`${id.includes('enrollment')?'Enrollment':'Revenue'} trend for ${range}`)}
}
period?.addEventListener('change',showPeriod);showPeriod();
})();