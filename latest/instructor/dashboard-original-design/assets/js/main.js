
/* 08. Inline behaviors so this single HTML screen is independently runnable. */
(()=>{'use strict';
 const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
 const body=$('#workspace'), account=$('#accountToggle'),accMenu=$('#accountMenu'),note=$('#notificationToggle'),noteMenu=$('#notificationMenu');
 function closeMenus(){for (const [btn,panel] of [[account,accMenu],[note,noteMenu]]){panel.hidden=true;btn.setAttribute('aria-expanded','false')}}
 function toggleMenu(btn,panel){const isOpen=!panel.hidden;closeMenus();panel.hidden=isOpen;btn.setAttribute('aria-expanded',String(!isOpen));}
 account.addEventListener('click',e=>{e.stopPropagation();toggleMenu(account,accMenu)});note.addEventListener('click',e=>{e.stopPropagation();toggleMenu(note,noteMenu)});
 document.addEventListener('click',e=>{if(!e.target.closest('.account-actions'))closeMenus()});
 const collapse=$('#sidebarCollapse');collapse.addEventListener('click',()=>{const collapsed=body.classList.toggle('sidebar-collapsed');collapse.setAttribute('aria-pressed',String(collapsed));collapse.setAttribute('aria-label',collapsed?'Expand sidebar':'Collapse sidebar');collapse.title=collapsed?'Expand sidebar':'Collapse sidebar';});
 const drawer=$('#mobileDrawer'),backdrop=$('#mobileBackdrop'),open=$('#mobileMenuToggle'),x=$('#mobileMenuClose');let prior=null;
 function closeDrawer(){drawer.classList.remove('is-open');backdrop.hidden=true;open.setAttribute('aria-expanded','false');document.body.style.overflow='';if(prior)prior.focus();}
 function openDrawer(){prior=document.activeElement;drawer.classList.add('is-open');backdrop.hidden=false;open.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';x.focus();}
 open.addEventListener('click',e=>{e.preventDefault();openDrawer()});x.addEventListener('click',closeDrawer);backdrop.addEventListener('click',closeDrawer);
 drawer.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const list=$$('a,button').filter(el=>drawer.contains(el));const a=list[0],b=list[list.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();b.focus()}else if(!e.shiftKey&&document.activeElement===b){e.preventDefault();a.focus()}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenus();if(drawer.classList.contains('is-open'))closeDrawer()}});
 const form=$('#courseSearchForm'),input=$('#courseSearch'),cards=$$('.course-card'),count=$('#courseCount'),empty=$('#courseNoResults');
 function doSearch(){const value=input.value.trim().toLowerCase();let n=0;cards.forEach(c=>{const match=c.dataset.course.includes(value);c.hidden=!match;n+=Number(match)});count.textContent=value?`${n} of 8`:'4 of 8';empty.hidden=n>0;$('#resultStatus').textContent=n+' visible courses';}
 input.addEventListener('input',doSearch);form.addEventListener('submit',e=>{e.preventDefault();doSearch();$('#myCoursesHeading').scrollIntoView({behavior:'smooth',block:'start'})});
 const chartData={'90':{vals:[30,38,32,44,40,48,56,52,62,70,64,76],labels:['Aug 13','Sep 3','Sep 24','Oct 15','Oct 29'],text:'Sample weekly enrollments: 30, 38, 32, 44, 40, 48, 56, 52, 62, 70, 64, 76. Total: 612.'},'30':{vals:[62,70,64,76],labels:['Oct 8','Oct 15','Oct 22','Oct 29'],text:'Sample recent four weeks: 62, 70, 64, 76 enrollments.'},'7':{vals:[64,76],labels:['Last week','This week'],text:'Sample last two weekly data points: 64, 76.'}};
 function renderChart(){const period=$('#chartPeriod').value,o=chartData[period],sum=o.vals.reduce((a,b)=>a+b,0),n=o.vals.length;$('#chartTotal').textContent=sum.toLocaleString('en-US');const y=v=>72-(v/80)*72;$('#chartPath').setAttribute('d',o.vals.map((v,i)=>`${i?'L':'M'}${(i/(n-1)*670).toFixed(1)} ${y(v).toFixed(1)}`).join(' '));$('#chartTimes').innerHTML=o.labels.map(l=>'<span>'+l+'</span>').join('');$('#chartSource').textContent=o.text;$('.chart-container').setAttribute('aria-label',`Enrollment trend with ${n} points totaling ${sum} sample enrollments`);}
 $('#chartPeriod').addEventListener('change',renderChart);renderChart();
})();
