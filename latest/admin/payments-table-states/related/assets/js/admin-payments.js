/* EduHub Admin Payments — exact six Figma sample rows. No network or payment provider actions. */
(()=>{'use strict';
 const $=id=>document.getElementById(id),rows=[...document.querySelectorAll('.payment-item')];
 const field=$('paymentSearch'),globalSearch=$('workspaceSearch'),date=$('dateFilter'),status=$('statusFilter');
 let currentPage=1,customRange=null,activeRow=null,dialogMode='',lastFocus=null,drawerFocus=null,dateFocus=null;
 const menus=[[$('notificationMenu'),$('notificationToggle')],[$('accountMenu'),$('accountToggle')]];
 const closeMenus=(except=null)=>menus.forEach(([p,b])=>{if(p!==except){p.hidden=true;b.setAttribute('aria-expanded','false')}});
 menus.forEach(([p,b])=>b.addEventListener('click',e=>{e.stopPropagation();const opening=p.hidden;closeMenus();p.hidden=!opening;b.setAttribute('aria-expanded',String(opening))}));
 document.querySelectorAll('[data-close-menu]').forEach(x=>x.addEventListener('click',()=>closeMenus()));
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('.menu-wrapper'))closeMenus()});
 const sidebar=$('adminSidebar'),drawer=$('sidebarBackdrop'),toggle=$('openMobileNav');
 function setSidebar(open){sidebar.classList.toggle('is-open',open);drawer.hidden=!open;toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('drawer-open',open);if(open){drawerFocus=document.activeElement;sidebar.querySelector('.side-link.selected')?.focus()}else if(drawerFocus?.isConnected)drawerFocus.focus()}
 toggle.addEventListener('click',()=>setSidebar(!sidebar.classList.contains('is-open')));drawer.addEventListener('click',()=>setSidebar(false));
 $('openMobileSearch').addEventListener('click',()=>{const c=$('searchContainer'),opening=!c.classList.contains('is-open');c.classList.toggle('is-open',opening);$('openMobileSearch').setAttribute('aria-expanded',String(opening));if(opening)globalSearch.focus()});
 $('showRefundNotifications').addEventListener('click',()=>{field.value='Warda';globalSearch.value='';date.value='all';customRange=null;status.value='all';closeMenus();renderFilters();field.focus()});
 $('paymentFilterForm').addEventListener('submit',e=>e.preventDefault());
 function isMatching(row){const q=field.value.trim().toLowerCase(),g=globalSearch.value.trim().toLowerCase(),searchText=`${row.dataset.id} ${row.dataset.student} ${row.dataset.course}`.toLowerCase();if(q&&!searchText.includes(q))return false;if(g&&!searchText.includes(g))return false;if(status.value!=='all'&&row.dataset.status.toLowerCase()!==status.value)return false;
  if(date.value==='custom'&&customRange){return row.dataset.iso>=customRange.from&&row.dataset.iso<=customRange.to}return date.value==='all'||date.value==='custom'||date.value===row.dataset.iso;
 }
 function setContext(){const a=status.value==='all'?'All statuses':status.options[status.selectedIndex].textContent;const b=date.value==='all'?'All dates':date.value==='custom'&&customRange?`${customRange.from} to ${customRange.to}`:date.options[date.selectedIndex].textContent;$('filterContext').textContent=`${a} · ${b} · Sample records only`;}
 function renderFilters(){currentPage=1;let count=0;rows.forEach(row=>{const matching=isMatching(row);row.hidden=!matching;if(matching)count++});$('paymentsList').hidden=false;$('noResults').hidden=count>0;$('unavailablePage').hidden=true;$('pageIndicator').textContent='1';$('prevPage').disabled=true;
  const def=!field.value.trim()&&!globalSearch.value.trim()&&status.value==='all'&&date.value==='all';$('nextPage').disabled=!def;$('resultSummary').textContent=def?'Showing 1–6 of 1,048 payment records':count?`Showing ${count} matching sample ${count===1?'payment':'payments'} (of 6 records)`:'Showing 0 of 6 sample records';$('filterContext').hidden=def;setContext();return count;
 }
 for(const x of [field,globalSearch])x.addEventListener('input',renderFilters);status.addEventListener('change',renderFilters);
 date.addEventListener('change',()=>{if(date.value==='custom'){openDateDialog();return}customRange=null;renderFilters()});
 function resetFilters(){field.value='';globalSearch.value='';date.value='all';status.value='all';customRange=null;renderFilters()}
 $('resetFilters').addEventListener('click',()=>{resetFilters();field.focus()});
 function setPage(n){currentPage=n;if(n===1){renderFilters();return}$('paymentsList').hidden=true;$('noResults').hidden=true;$('unavailablePage').hidden=false;$('resultSummary').textContent='Page 2 requires data from the payment backend';$('pageIndicator').textContent='2';$('prevPage').disabled=false;$('nextPage').disabled=true;}
 $('nextPage').addEventListener('click',()=>setPage(2));$('prevPage').addEventListener('click',()=>setPage(1));$('returnFirstPage').addEventListener('click',()=>setPage(1));
 const backdrop=$('paymentBackdrop'),dialog=backdrop.querySelector('.payment-dialog');
 function facts(entries){const dl=$('paymentFacts');dl.replaceChildren();for(const [k,v] of entries){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=k;dd.textContent=v;dl.append(dt,dd)}}
 function openPayment(row,mode){activeRow=row;dialogMode=mode;lastFocus=document.activeElement;const d=row.dataset,refunding=mode==='refund';$('dialogTitle').textContent=refunding?'Refund this payment?':'Payment Details · '+d.id;
 $('dialogMessage').textContent=refunding?'Review the student request before confirming the simulated refund. The original transaction ID will remain unchanged.':'Original payment record · This is representative Figma sample data; no payment provider is connected.';
 let details=[['Payment ID',d.id],['Student',d.student],['Course',d.course],['Original amount',d.amount+' USD'],['Payment date',d.date],['Payment method',d.method],['Payment status',d.status]];
 if(refunding){details=[['Original payment ID',d.id],['Student',d.student],['Course',d.course],['Original amount',d.amount+' USD'],['Refund amount',d.amount+' USD'],['Original payment date','Oct 29, 2026 · 10:42 AM UTC']];}
 if(d.status==='refunded'){details.push(['Related enrollment','Canceled'],['Refund eligibility','Already refunded'])}else if(d.status==='failed'){details.push(['Amount charged','$0.00'],['Related enrollment','Not created'],['Refund eligibility','Not eligible — no successful charge'])}else if(d.status==='pending'){details.push(['Related enrollment','Not created'],['Refund eligibility','Not eligible until payment is completed'])}else if(d.id==='PAY-2026-1048'){details.push(['Related enrollment','Active'],['Student refund request','Oct 30, 2026 · 09:10 AM UTC'])}else{details.push(['Refund eligibility','No refund request recorded'])}
 facts(details);$('refundExtra').hidden=!refunding;$('confirmRefund').hidden=!refunding;$('cancelPaymentDialog').textContent=refunding?'Cancel':'Close';$('dialogError').hidden=true;$('dialogIcon').classList.toggle('refund-icon',refunding);backdrop.hidden=false;document.body.style.overflow='hidden';$('closePaymentDialog').focus();
 }
 function closePayment(){backdrop.hidden=true;document.body.style.overflow='';activeRow=null;dialogMode='';lastFocus?.isConnected&&lastFocus.focus()}
 document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>openPayment(btn.closest('.payment-item'),'view')));
 document.querySelectorAll('[data-refund]').forEach(btn=>btn.addEventListener('click',()=>openPayment(btn.closest('.payment-item'),'refund')));
 $('closePaymentDialog').addEventListener('click',closePayment);$('cancelPaymentDialog').addEventListener('click',closePayment);backdrop.addEventListener('mousedown',e=>{if(e.target===backdrop)closePayment()});
 function toast(msg){const t=$('feedbackToast');t.textContent=msg;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>{t.hidden=true},4200)}
 $('confirmRefund').addEventListener('click',()=>{if(!activeRow||dialogMode!=='refund'||activeRow.dataset.id!=='PAY-2026-1048'||activeRow.dataset.status!=='Completed')return;
   activeRow.dataset.status='Refunded';activeRow.dataset.eligible='False';activeRow.setAttribute('aria-label','PAY-2026-1048 Refunded');const cell=activeRow.querySelector('.cell-status');cell.querySelector('.payment-badge').textContent='Refunded';cell.querySelector('.payment-badge').className='payment-badge badge-refunded';activeRow.querySelector('.refund-action')?.replaceWith(Object.assign(document.createElement('span'),{className:'eligibility-note',textContent:'Already refunded'}));$('totalCompleted').textContent='981';$('totalRefunded').textContent='13';closePayment();renderFilters();toast('Simulated refund recorded: PAY-2026-1048 is now Refunded; related enrollment canceled. No money moved.');
 });
 const dateBackdrop=$('dateBackdrop');function closeDate(revert=false){dateBackdrop.hidden=true;document.body.style.overflow='';if(revert&&date.value==='custom'&&!customRange)date.value='all';dateFocus?.isConnected&&dateFocus.focus();}
 function openDateDialog(){dateFocus=document.activeElement;dateBackdrop.hidden=false;document.body.style.overflow='hidden';$('dateError').hidden=true;$('dateFrom').focus()}
 $('closeDateDialog').addEventListener('click',()=>closeDate(true));dateBackdrop.addEventListener('mousedown',e=>{if(e.target===dateBackdrop)closeDate(true)});
 $('resetDateDialog').addEventListener('click',()=>{customRange=null;date.value='all';closeDate();renderFilters()});
 $('applyDateDialog').addEventListener('click',()=>{const a=$('dateFrom').value,b=$('dateTo').value;if(!a||!b||a>b){$('dateError').textContent='Select a valid date range (From must not be after To).';$('dateError').hidden=false;return}customRange={from:a,to:b};date.value='custom';closeDate();renderFilters()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!dateBackdrop.hidden){closeDate(true);return}if(!backdrop.hidden){closePayment();return}if(!drawer.hidden){setSidebar(false);return}closeMenus();return}if(e.key!=='Tab')return;const showing=!backdrop.hidden?dialog:(!dateBackdrop.hidden?dateBackdrop.querySelector('.date-dialog'):null);if(!showing)return;const focusables=[...showing.querySelectorAll('button:not(:disabled):not([hidden]),input:not(:disabled)')].filter(x=>x.getClientRects().length);if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
 renderFilters();
})();
