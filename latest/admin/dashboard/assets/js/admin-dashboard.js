/* EduHub Admin Dashboard — client-only interactions; no backend writes */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const notification = $('notificationMenu'); const account = $('accountMenu');
  const notificationBtn = $('notificationToggle'); const accountBtn = $('accountToggle');
  const sidebar = $('adminSidebar');const sidebarBackdrop=$('sidebarBackdrop');const openSidebar=$('openMobileNav');
  const dialog=$('courseDialogBackdrop'); const facts=$('dialogFacts'); let previousFocus = null;
  function hideMenus(except){for(const [menu,button] of [[notification,notificationBtn],[account,accountBtn]]){if(menu!==except){menu.hidden=true;button.setAttribute('aria-expanded','false');}}}
  function toggleMenu(menu,button){const opening=menu.hidden;hideMenus();menu.hidden=!opening;button.setAttribute('aria-expanded',String(opening));}
  notificationBtn.addEventListener('click',(ev)=>{ev.stopPropagation();toggleMenu(notification,notificationBtn);});
  accountBtn.addEventListener('click',(ev)=>{ev.stopPropagation();toggleMenu(account,accountBtn);});
  document.querySelectorAll('[data-close-menu]').forEach(b=>b.addEventListener('click',hideMenus.bind(null,null)));
  document.addEventListener('pointerdown',(ev)=>{if(!ev.target.closest('.menu-wrapper'))hideMenus();});
  function setSidebar(open){sidebar.classList.toggle('is-open',open);sidebarBackdrop.hidden=!open;openSidebar.setAttribute('aria-expanded',String(open));if(open)sidebar.querySelector('.side-link')?.focus();else openSidebar.focus();}
  openSidebar.addEventListener('click',()=>setSidebar(!sidebar.classList.contains('is-open')));
  sidebarBackdrop.addEventListener('click',()=>setSidebar(false));
  const openSearch=$('openMobileSearch'),searchContainer=$('searchContainer'),search=$('dashboardSearch');
  openSearch.addEventListener('click',()=>{const nowOpen=!searchContainer.classList.contains('is-open');searchContainer.classList.toggle('is-open',nowOpen);openSearch.setAttribute('aria-expanded',String(nowOpen));if(nowOpen)search.focus();});
  search.addEventListener('input',()=>{
    const query=search.value.trim().toLocaleLowerCase();
    for(const [listId,emptyId] of [['approvalList','approvalEmpty'],['usersList','usersEmpty'],['paymentsList','paymentsEmpty']]){
      const list=$(listId),items=[...list.querySelectorAll('.searchable')];let found=0;
      items.forEach(node=>{const match=!query||node.dataset.searchable.toLocaleLowerCase().includes(query);node.hidden=!match;if(match)found++;});$(emptyId).hidden=found!==0;
    }
  });
  function showDialog(button){
    previousFocus=document.activeElement;
    const details=[['Course',button.dataset.course],['Instructor',button.dataset.instructor],['Category',button.dataset.category],['Price',button.dataset.price],['Submitted',button.dataset.submitted],['Status','Pending approval']];
    facts.replaceChildren();
    details.forEach(([label,value])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;facts.append(dt,dd);});
    dialog.hidden=false;document.body.style.overflow='hidden';$('closeCourseDialog').focus();
  }
  function hideDialog(){dialog.hidden=true;document.body.style.overflow='';previousFocus?.focus();}
  document.querySelectorAll('.review-course').forEach(b=>b.addEventListener('click',()=>showDialog(b)));
  $('closeCourseDialog').addEventListener('click',hideDialog);$('dismissDialog').addEventListener('click',hideDialog);
  dialog.addEventListener('pointerdown',(ev)=>{if(ev.target===dialog)hideDialog();});
  dialog.addEventListener('keydown',ev=>{
    if(ev.key!=='Tab')return;
    const enabled=[...dialog.querySelectorAll('button,a[href]')].filter(node=>!node.disabled);
    const first=enabled[0],last=enabled[enabled.length-1];
    if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}
    else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}
  });
  document.addEventListener('keydown',(ev)=>{
    if(ev.key!=='Escape')return;
    if(!dialog.hidden){hideDialog();return;}
    if(sidebar.classList.contains('is-open')){setSidebar(false);return;}
    hideMenus();
    if(searchContainer.classList.contains('is-open')){searchContainer.classList.remove('is-open');openSearch.setAttribute('aria-expanded','false');openSearch.focus();}
  });
})();
