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
// Figma's six months of demo data. Monthly series sum to the displayed All Time totals.
const months=['May','Jun','Jul','Aug','Sep','Oct'];const enroll=[75,130,185,220,285,350];const revenue=[300,500,650,750,1050,1600];
const fmt=n=>Math.round(n).toLocaleString('en-US');
const periods={all:{start:0,tag:'All Time · May–Oct 2026'},90:{start:3,tag:'Last 3 Months · Aug–Oct 2026'},30:{start:5,tag:'Last Month · Oct 2026'}};
function chartMarkup(vals,kind){const max=kind==='revenue'?2000:400;const top=0,bottom=160,left=44,right=560;const width=right-left;
const xs=vals.map((v,i)=>left+(vals.length===1?width/2:i*width/(vals.length-1)));
const ys=vals.map(v=>Math.max(0,Math.min(160,160-v/max*160)));
const path=xs.map((x,i)=>(i?'L':'M')+x.toFixed(2)+','+ys[i].toFixed(2)).join(' ');
const label=(n)=>kind==='revenue'?'$'+n:n;
const nodes=[0,1,2].map((r)=>{const value=max-r*max/2, y=r*80;return '<text x="0" y="'+(y===0?'10':y===80?'85':'158')+'">'+label(value)+'</text><line x1="44" x2="560" y1="'+y+'" y2="'+y+'" class="grid-line"/>'}).join('');
const dots=xs.map((x,i)=>'<circle class="point" cx="'+x.toFixed(2)+'" cy="'+ys[i].toFixed(2)+'" r="4"><title>'+fmt(vals[i])+(kind==='revenue'?' USD':' enrollments')+'</title></circle>').join('');
return '<svg viewBox="0 0 560 160" preserveAspectRatio="none" aria-hidden="true">'+nodes+'<path class="trend-path" d="'+path+'"/>'+dots+'</svg>'}
function updatePeriod(){const value=$('#analyticsPeriod').value;const p=periods[value]||periods.all;const en=enroll.slice(p.start), rev=revenue.slice(p.start), ms=months.slice(p.start), eSum=en.reduce((a,b)=>a+b,0),rSum=rev.reduce((a,b)=>a+b,0);
$('#periodDescription').textContent=p.tag;$('#totalEnrollments').textContent=fmt(eSum);$('#totalRevenue').textContent='$'+fmt(rSum);$('#enrollSub').textContent=fmt(eSum)+' total enrollments';$('#revenueSub').textContent='$'+fmt(rSum)+' total revenue';
$('#enrollContext').textContent='Monthly enrollments · '+ms[0]+'–'+ms[ms.length-1]+' 2026';$('#revenueContext').textContent='Monthly instructor revenue · USD · '+ms[0]+'–'+ms[ms.length-1]+' 2026';
$('#enrollChart').innerHTML=chartMarkup(en,'enroll');$('#revenueChart').innerHTML=chartMarkup(rev,'revenue');
for(const id of ['enrollMonths','revenueMonths'])$( '#'+id).innerHTML=ms.map(m=>'<span>'+m+'</span>').join('');
$('#enrollChart').setAttribute('aria-label','Monthly course enrollments: '+ms.map((m,i)=>m+' '+fmt(en[i])).join(', '));
$('#revenueChart').setAttribute('aria-label','Monthly instructor revenue in US dollars: '+ms.map((m,i)=>m+' $'+fmt(rev[i])).join(', '));
$('#summaryNote').textContent=value==='all'?'All Time totals match the dashboard: 1,245 historical course enrollments, not distinct people. Completion is the unweighted average across 5 published courses.':
'The selected period shows illustrative monthly enrollment and revenue totals. Published courses, completion rate, comparison, and completion breakdown remain all-time sample data.';
}
$('#analyticsPeriod')?.addEventListener('change',updatePeriod);updatePeriod();
})();