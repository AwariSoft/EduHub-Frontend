/* EduHub Admin · Payment Details · Local demonstration only; no real refund. */
(()=>{'use strict';
 const $=id=>document.getElementById(id);
 const menus=[[$('notificationMenu'),$('notificationToggle')],[$('accountMenu'),$('accountToggle')]];
 function closeMenus(except){menus.forEach(([menu,button])=>{if(menu!==except){menu.hidden=true;button.setAttribute('aria-expanded','false')}})}
 menus.forEach(([menu,button])=>button.addEventListener('click',event=>{event.stopPropagation();const open=menu.hidden;closeMenus();menu.hidden=!open;button.setAttribute('aria-expanded',String(open))}));
 document.querySelectorAll('[data-close-menu]').forEach(x=>x.addEventListener('click',()=>closeMenus()));document.addEventListener('pointerdown',event=>{if(!event.target.closest('.menu-wrapper'))closeMenus()});
 const sidebar=$('adminSidebar'),drawer=$('sidebarBackdrop'),toggle=$('openMobileNav');let drawerFocus=null;
 function setSidebar(open){sidebar.classList.toggle('is-open',open);drawer.hidden=!open;toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('drawer-open',open);if(open){drawerFocus=document.activeElement;sidebar.querySelector('.side-link.selected')?.focus()}else if(drawerFocus?.isConnected){drawerFocus.focus()}}
 toggle.addEventListener('click',()=>setSidebar(!sidebar.classList.contains('is-open')));drawer.addEventListener('click',()=>setSidebar(false));
 $('openMobileSearch').addEventListener('click',()=>{const c=$('searchContainer'),opening=!c.classList.contains('is-open');c.classList.toggle('is-open',opening);$('openMobileSearch').setAttribute('aria-expanded',String(opening));if(opening)$('workspaceSearch').focus()});
 const validTerms=['pay-2026-1048','warda mahmoud','warda','complete c# programming','usr-1204','49'];
 $('workspaceSearch').addEventListener('keydown',e=>{if(e.key!=='Enter')return;e.preventDefault();const q=$('workspaceSearch').value.trim().toLowerCase();if(!q)return; if(validTerms.some(t=>t.includes(q))){$('originalPaymentHeading').scrollIntoView({behavior:'smooth',block:'start'});toast('PAY-2026-1048 is the current sample payment record.')}else toast('This page contains only the sample PAY-2026-1048 payment. Use Payments for the full list.');});
 $('showRefundNotifications').addEventListener('click',()=>{closeMenus();$('refundHeading').scrollIntoView({behavior:'smooth',block:'center'});$('refundPayment')?.focus()});
 let refunded=false,priorFocus=null;
 const backdrop=$('refundBackdrop'),dialog=backdrop.querySelector('.refund-dialog');
 function openRefund(){if(refunded)return;priorFocus=document.activeElement;backdrop.hidden=false;document.body.style.overflow='hidden';$('closeRefundDialog').focus()}
 function closeRefund(){backdrop.hidden=true;document.body.style.overflow='';if(priorFocus?.isConnected)priorFocus.focus()}
 $('refundPayment').addEventListener('click',openRefund);$('closeRefundDialog').addEventListener('click',closeRefund);$('cancelRefund').addEventListener('click',closeRefund);backdrop.addEventListener('mousedown',e=>{if(e.target===backdrop)closeRefund()});
 function toast(msg){const t=$('feedbackToast');t.textContent=msg;t.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.hidden=true,4300)}
 $('confirmRefund').addEventListener('click',()=>{if(refunded)return;refunded=true;
   document.querySelectorAll('[data-payment-status]').forEach(x=>{x.className='payment-status badge-refunded';x.textContent='Refunded'});
   $('paymentStatusText').textContent='Refunded';$('enrollmentBadge').textContent='Canceled';$('enrollmentBadge').className='payment-status badge-refunded';
   $('enrollmentDescription').textContent='The related enrollment is canceled. Course access from this payment is no longer available.';
   $('pendingRefundState').hidden=true;$('refundedState').hidden=false;closeRefund();toast('Simulated refund recorded: PAY-2026-1048 is now Refunded. Related enrollment Canceled. No money moved.');
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!backdrop.hidden){closeRefund();return}if(!drawer.hidden){setSidebar(false);return}closeMenus();return}if(e.key==='Tab'&&!backdrop.hidden){const focusables=[...dialog.querySelectorAll('button:not([hidden]):not(:disabled)')].filter(x=>x.getClientRects().length);const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
})();