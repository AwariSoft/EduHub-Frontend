/* EduHub admin course-approval queue — sample-record frontend implementation only. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const rows = [...document.querySelectorAll('.course-row')];
  const fields = {search:$('courseSearch'),global:$('workspaceSearch'),date:$('dateFilter'),status:$('statusFilter'),from:$('dateFrom'),to:$('dateTo')};
  const totals={pending:6,approved:38,rejected:3};
  const baselineDate=new Date('2026-10-30T12:00:00'); // Figma's sample-data reporting date, not today's date.
  let pageNum=1,activeRow=null,decision=null,returnFocus=null,sidebarReturnFocus=null;

  /* Topbar dropdowns, mobile navigation, keyboard support */
  const menus=[[$('notificationMenu'),$('notificationToggle')],[$('accountMenu'),$('accountToggle')]];
  function closeMenus(except=null){menus.forEach(([menu,btn])=>{if(menu!==except){menu.hidden=true;btn.setAttribute('aria-expanded','false')}})}
  function toggleMenu(menu,btn){const willOpen=menu.hidden;closeMenus();menu.hidden=!willOpen;btn.setAttribute('aria-expanded',String(willOpen));}
  menus.forEach(([menu,btn])=>btn.addEventListener('click',event=>{event.stopPropagation();toggleMenu(menu,btn)}));
  document.querySelectorAll('[data-close-menu]').forEach(btn=>btn.addEventListener('click',()=>closeMenus()));
  document.addEventListener('pointerdown',event=>{if(!event.target.closest('.menu-wrapper'))closeMenus()});
  const sidebar=$('adminSidebar'),sideBackdrop=$('sidebarBackdrop'),navButton=$('openMobileNav');
  function setSidebar(open){sidebar.classList.toggle('is-open',open);sideBackdrop.hidden=!open;navButton.setAttribute('aria-expanded',String(open));document.body.classList.toggle('drawer-open',open);if(open){sidebarReturnFocus=document.activeElement;sidebar.querySelector('.side-link.selected')?.focus();}else sidebarReturnFocus?.focus();}
  navButton.addEventListener('click',()=>setSidebar(!sidebar.classList.contains('is-open')));
  sideBackdrop.addEventListener('click',()=>setSidebar(false));
  const openMobileSearch=$('openMobileSearch'),topSearchContainer=$('searchContainer');
  openMobileSearch.addEventListener('click',()=>{const open=!topSearchContainer.classList.contains('is-open');topSearchContainer.classList.toggle('is-open',open);openMobileSearch.setAttribute('aria-expanded',String(open));if(open)fields.global.focus()});
  $('showPendingNotifications').addEventListener('click',()=>{fields.status.value='pending';fields.search.value='';fields.global.value='';closeMenus();applyFilters();fields.status.focus()});

  /* Search/date/status filtering over exactly the six Figma sample records */
  function dateMatches(dateText){
    const choice=fields.date.value;
    if(choice==='all')return true;
    const date=new Date(dateText+'T12:00:00');
    if(choice==='custom'){
      const start=fields.from.value?new Date(fields.from.value+'T00:00:00'):null;
      const end=fields.to.value?new Date(fields.to.value+'T23:59:59'):null;
      return (!start||date>=start)&&(!end||date<=end);
    }
    const days=Number(choice);
    const cutoff=new Date(baselineDate);cutoff.setDate(cutoff.getDate()-days+1);
    return date>=cutoff&&date<=baselineDate;
  }
  function filterLabel(){const status=fields.status.options[fields.status.selectedIndex].textContent;const date=fields.date.value==='all'?'Newest submission first':fields.date.options[fields.date.selectedIndex].textContent;return `${status} · ${date}`}
  function applyFilters(){
    pageNum=1;
    const query=fields.search.value.trim().toLocaleLowerCase(),global=fields.global.value.trim().toLocaleLowerCase(),status=fields.status.value;
    $('customDateRange').hidden=fields.date.value!=='custom';
    let visible=0;
    rows.forEach(row=>{const searchable=row.dataset.search.toLocaleLowerCase();const pass=(!query||searchable.includes(query))&&(!global||searchable.includes(global))&&(status==='all'||row.dataset.status===status)&&dateMatches(row.dataset.date);row.hidden=!pass;if(pass)visible++;});
    $('courseList').hidden=false;$('unavailablePage').hidden=true;$('noRecords').hidden=visible!==0;
    $('tableContext').textContent=filterLabel();
    const unfiltered=!query&&!global&&status==='all'&&fields.date.value==='all';
    $('resultSummary').textContent=unfiltered?'Showing 1–6 of 47 submissions':visible?`Showing 1–${visible} of ${visible} matching sample records`:'Showing 0 of 6 sample records';
    $('currentPage').textContent='1';$('previousPage').disabled=true;$('nextPage').disabled=!unfiltered;
    return visible;
  }
  [fields.search,fields.global,fields.from,fields.to].forEach(field=>field.addEventListener('input',applyFilters));
  [fields.date,fields.status].forEach(field=>field.addEventListener('change',applyFilters));
  $('filterForm').addEventListener('submit',event=>event.preventDefault());
  $('clearFilters').addEventListener('click',()=>{fields.search.value='';fields.global.value='';fields.status.value='all';fields.date.value='all';fields.from.value='2026-10-22';fields.to.value='2026-10-30';applyFilters();fields.search.focus()});
  function gotoPage(next){
    if(next===1){applyFilters();return}
    pageNum=next;$('courseList').hidden=true;$('noRecords').hidden=true;$('unavailablePage').hidden=false;$('resultSummary').textContent='Page 2 requires additional records from the live API';$('currentPage').textContent=String(next);$('previousPage').disabled=false;$('nextPage').disabled=true;
  }
  $('nextPage').addEventListener('click',()=>gotoPage(2));$('previousPage').addEventListener('click',()=>gotoPage(1));$('returnPageOne').addEventListener('click',()=>gotoPage(1));

  /* Accessible review panel — local demonstration, not a real admin decision API */
  const backdrop=$('reviewBackdrop'),dialog=backdrop.querySelector('.review-dialog');
  function rowDetails(row){return [['Course',row.querySelector('.course-identity strong').textContent],['Course ID',row.dataset.id],['Instructor',row.querySelector('.course-instructor').textContent],['Category',row.querySelector('.course-category').textContent],['Submission date',row.querySelector('.course-date').textContent],['Price',row.querySelector('.course-price').textContent]]}
  function updateDialog(){
    const facts=$('reviewFacts');facts.replaceChildren();rowDetails(activeRow).forEach(([label,val])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=val;facts.append(dt,dd)});
    const value=activeRow.dataset.status,chip=$('dialogStatus');chip.textContent=value.charAt(0).toUpperCase()+value.slice(1);chip.className=`status status-${value}`;
    $('approveCourse').hidden=value!=='pending';$('rejectCourse').hidden=value!=='pending';
    $('reviewConfirm').hidden=true;$('decisionActions').hidden=false;$('decisionReason').hidden=true;$('reasonError').hidden=true;
  }
  function showReview(id){activeRow=rows.find(row=>row.dataset.id===id);if(!activeRow)return;returnFocus=document.activeElement;updateDialog();backdrop.hidden=false;document.body.style.overflow='hidden';$('closeReview').focus();}
  function hideReview(){backdrop.hidden=true;document.body.style.overflow='';decision=null;if(returnFocus&&returnFocus.isConnected)returnFocus.focus()}
  document.querySelectorAll('[data-review]').forEach(btn=>btn.addEventListener('click',()=>showReview(btn.dataset.review)));
  $('closeReview').addEventListener('click',hideReview);$('dismissReview').addEventListener('click',hideReview);
  backdrop.addEventListener('pointerdown',event=>{if(event.target===backdrop)hideReview()});
  function requestDecision(chosen){if(!activeRow||activeRow.dataset.status!=='pending')return;decision=chosen;$('decisionActions').hidden=true;$('reviewConfirm').hidden=false;$('reasonError').hidden=true;$('decisionReason').value='';const reject=chosen==='rejected';$('decisionReason').hidden=!reject;$('decisionLabel').textContent=reject?'Reject this submission?':'Approve this submission?';$('decisionPrompt').textContent=reject?'A reason is required. This decision will only update the local demo, not the live EduHub platform.':'The course will be marked as approved in this local demo. Approval does not automatically publish the course.';$('confirmDecision').textContent=reject?'Confirm rejection':'Confirm approval';if(reject)$('decisionReason').focus();else $('confirmDecision').focus();}
  $('approveCourse').addEventListener('click',()=>requestDecision('approved'));$('rejectCourse').addEventListener('click',()=>requestDecision('rejected'));
  $('cancelDecision').addEventListener('click',()=>{$('reviewConfirm').hidden=true;$('decisionActions').hidden=false;$('approveCourse').focus()});
  let toastTimeout;
  function toast(message){const node=$('feedbackToast');node.textContent=message;node.hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>node.hidden=true,4200)}
  function refreshTotals(){for(const key of ['pending','approved','rejected'])$(key+'Count').textContent=totals[key].toLocaleString();$('notificationPendingCount').textContent=totals.pending.toLocaleString()}
  $('confirmDecision').addEventListener('click',()=>{
    if(!activeRow||!decision)return;
    if(decision==='rejected'&&$('decisionReason').value.trim().length<10){$('reasonError').hidden=false;$('decisionReason').focus();return}
    if(activeRow.dataset.status===decision){hideReview();return}
    const old=activeRow.dataset.status;totals[old]--;totals[decision]++;activeRow.dataset.status=decision;
    const chip=activeRow.querySelector('.course-status .status');chip.className=`status status-${decision}`;chip.textContent=decision.charAt(0).toUpperCase()+decision.slice(1);
    refreshTotals();const name=activeRow.querySelector('.course-identity strong').textContent;hideReview();applyFilters();toast(`${name} marked ${decision} in this local preview. No backend changes were made.`);
  });
  backdrop.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const controls=[...dialog.querySelectorAll('button:not([disabled]):not([hidden]),textarea:not([hidden])')].filter(el=>getComputedStyle(el).display!=='none'&&!el.closest('[hidden]'));
    const first=controls[0],last=controls[controls.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  });
  document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;if(!backdrop.hidden){hideReview();return}if(sidebar.classList.contains('is-open')){setSidebar(false);return}closeMenus();if(topSearchContainer.classList.contains('is-open')){topSearchContainer.classList.remove('is-open');openMobileSearch.setAttribute('aria-expanded','false');openMobileSearch.focus()}});
  refreshTotals();applyFilters();
})();
