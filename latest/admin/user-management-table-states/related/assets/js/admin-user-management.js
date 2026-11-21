/* EduHub Admin — User Management — sample Figma records, frontend only. */
(() => {
 'use strict';
 const $=id=>document.getElementById(id);
 const userRows=[...document.querySelectorAll('.user-row')];
 const search=$('userSearch'),globalSearch=$('workspaceSearch'),role=$('roleFilter'),status=$('statusFilter');
 let currentPage=1,activeRow=null,dialogMode='',returnFocus=null,lastMobileFocus=null;
 const menus=[[$('notificationMenu'),$('notificationToggle')],[$('accountMenu'),$('accountToggle')]];
 function closeMenus(except=null){menus.forEach(([menu,button])=>{if(menu!==except){menu.hidden=true;button.setAttribute('aria-expanded','false')}})}
 menus.forEach(([menu,button])=>button.addEventListener('click',ev=>{ev.stopPropagation();const opening=menu.hidden;closeMenus();menu.hidden=!opening;button.setAttribute('aria-expanded',String(opening));}));
 document.querySelectorAll('[data-close-menu]').forEach(button=>button.addEventListener('click',()=>closeMenus()));
 document.addEventListener('pointerdown',e=>{if(!e.target.closest('.menu-wrapper'))closeMenus()});
 const side=$('adminSidebar'),mobileMenu=$('openMobileNav'),sideBackdrop=$('sidebarBackdrop');
 function setSidebar(open){side.classList.toggle('is-open',open);sideBackdrop.hidden=!open;mobileMenu.setAttribute('aria-expanded',String(open));document.body.classList.toggle('drawer-open',open);if(open){lastMobileFocus=document.activeElement;side.querySelector('.side-link.selected')?.focus();}else if(lastMobileFocus?.isConnected)lastMobileFocus.focus()}
 mobileMenu.addEventListener('click',()=>setSidebar(!side.classList.contains('is-open')));
 sideBackdrop.addEventListener('click',()=>setSidebar(false));
 $('openMobileSearch').addEventListener('click',()=>{const cont=$('searchContainer');const open=!cont.classList.contains('is-open');cont.classList.toggle('is-open',open);$('openMobileSearch').setAttribute('aria-expanded',String(open));if(open)globalSearch.focus()});
 $('showInactiveNotifications').addEventListener('click',()=>{status.value='inactive';search.value='';globalSearch.value='';closeMenus();renderFilters();status.focus()});
 $('usersFilterForm').addEventListener('submit',e=>e.preventDefault());
 function renderFilters(){currentPage=1;const q=search.value.trim().toLowerCase(),g=globalSearch.value.trim().toLowerCase();let count=0;
  userRows.forEach(row=>{const full=row.dataset.name+' '+row.dataset.email;const match=(!q||full.includes(q))&&(!g||full.includes(g))&&(role.value==='all'||role.value===row.dataset.role)&&(status.value==='all'||status.value===row.dataset.status);row.hidden=!match;if(match)count++;});
  $('userList').hidden=false;$('unavailablePage').hidden=true;$('noRecords').hidden=count!==0;
  $('pageNumber').textContent='1';$('previousPage').disabled=true;
  const isDefault=!q&&!g&&role.value==='all'&&status.value==='all';$('nextPage').disabled=!isDefault;
  $('resultSummary').textContent=isDefault?'Showing 6 of 1,284 users · Sample selection':count?`Showing ${count} matching sample ${count===1?'account':'accounts'} (out of 6)`:'Showing 0 of 6 sample records';
  let summary='All accounts';if(role.value!=='all')summary=role.options[role.selectedIndex].textContent;if(status.value!=='all')summary+=(role.value==='all'?'': ' · ') + status.options[status.selectedIndex].textContent;
  $('filterContext').textContent=(isDefault?'All accounts · Recent registrations first; representative instructors and admin included':summary+' · Filtered sample records');
  return count;
 }
 [search,globalSearch].forEach(f=>f.addEventListener('input',renderFilters));[role,status].forEach(f=>f.addEventListener('change',renderFilters));
 $('clearFilters').addEventListener('click',()=>{search.value='';globalSearch.value='';role.value='all';status.value='all';renderFilters();search.focus()});
 function goPage(n){currentPage=n;if(n===1){renderFilters();return} $('userList').hidden=true;$('noRecords').hidden=true;$('unavailablePage').hidden=false;$('resultSummary').textContent='Page 2 requires additional records from the live API';$('pageNumber').textContent=String(n);$('previousPage').disabled=false;$('nextPage').disabled=true}
 $('previousPage').addEventListener('click',()=>goPage(1));$('nextPage').addEventListener('click',()=>goPage(2));$('returnPageOne').addEventListener('click',()=>goPage(1));
 const backdrop=$('userBackdrop'),dialog=backdrop.querySelector('.user-dialog');
 function info(){return {name:activeRow.querySelector('.user-name-block strong').textContent,email:activeRow.querySelector('.user-email').textContent,role:activeRow.querySelector('.user-role').textContent,date:activeRow.querySelector('.user-date').textContent,status:activeRow.dataset.status,id:activeRow.dataset.id,initials:activeRow.dataset.initials}}
 function facts(obj){const box=$('dialogFacts');box.replaceChildren();for(const [k,v] of Object.entries(obj)){if(!v)continue;const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=k;dd.textContent=v;box.append(dt,dd)}}
 function openDialog(row,mode){activeRow=row;dialogMode=mode;returnFocus=document.activeElement;const u=info();const changing=mode==='change';const willActivate=u.status==='inactive';
  $('dialogName').textContent=u.name;$('dialogEmail').textContent=u.email;$('dialogAvatar').textContent=u.initials;$('dialogRole').textContent=u.role+(u.id?' · '+u.id:'');
  const icon=$('dialogIcon');icon.classList.toggle('is-danger',changing&&!willActivate);const name=changing?(willActivate?'user-check':'user-lock'):'user';if(window.EduHubFA){window.EduHubFA.replaceIcon(icon.firstElementChild,name)}else{icon.firstElementChild.className='fa-solid fa-'+name;}
  $('dialogStatusFlow').hidden=!changing;$('dialogFacts').hidden=changing;$('confirmAccount').hidden=!changing;
  if(changing){$('oldStatus').textContent=willActivate?'Inactive':'Active';$('newStatus').textContent=willActivate?'Active':'Inactive';$('dialogTitle').textContent=(willActivate?'Activate ':'Deactivate ')+u.name.split(' ')[0]+"'s account?";$('dialogMessage').textContent=willActivate?`${u.name} will be able to sign in to EduHub again. The account record and ${u.role} role will remain unchanged.`:`${u.name} will no longer be able to sign in to EduHub. The account record will be retained. You can activate the account again later.`;$('confirmAccount').textContent=willActivate?'Activate Account':'Deactivate Account';$('confirmAccount').className='ed-button '+(willActivate?'ed-primary':'ed-danger');$('cancelDialog').textContent='Cancel';
  }else{$('dialogTitle').textContent=u.name;$('dialogMessage').textContent='Account details shown from the six provided Figma sample records. The complete user profile belongs to the separate User Details screen.';facts({'Email':u.email,'Role':u.role,'Registration date':u.date,'Account status':u.status,'User ID':u.id,'Current admin':u.role==='Admin'?'Yes — changes to own account disabled':''});$('cancelDialog').textContent='Close';}
  backdrop.hidden=false;document.body.style.overflow='hidden';$('closeUserDialog').focus();
 }
 function closeDialog(){backdrop.hidden=true;document.body.style.overflow='';activeRow=null;dialogMode='';if(returnFocus&&returnFocus.isConnected)returnFocus.focus();}
 document.querySelectorAll('[data-user-view]').forEach(btn=>btn.addEventListener('click',()=>openDialog(btn.closest('.user-row'),'view')));
 document.querySelectorAll('[data-toggle-user]').forEach(btn=>btn.addEventListener('click',()=>openDialog(btn.closest('.user-row'),'change')));
 ['closeUserDialog','cancelDialog'].forEach(id=>$(id).addEventListener('click',closeDialog));
 backdrop.addEventListener('mousedown',e=>{if(e.target===backdrop)closeDialog()});
 $('confirmAccount').addEventListener('click',()=>{if(!activeRow||dialogMode!=='change')return;const u=info();if(u.role==='Admin'){closeDialog();return;}const newStatus=u.status==='active'?'inactive':'active';activeRow.dataset.status=newStatus;const chip=activeRow.querySelector('.status');chip.textContent=newStatus==='active'?'Active':'Inactive';chip.className='status status-'+newStatus;activeRow.querySelector('[data-toggle-user]').textContent=newStatus==='active'?'Deactivate Account':'Activate Account';closeDialog();renderFilters();showToast(`${u.name}'s account is now ${newStatus}. Frontend preview only.`);});
 function showToast(message){const t=$('feedbackToast');t.textContent=message;t.hidden=false;t.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>{t.classList.remove('show');t.hidden=true},4300)}
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!backdrop.hidden){closeDialog();return;}if(!sideBackdrop.hidden){setSidebar(false);return;}closeMenus();}if(e.key==='Tab'&&!backdrop.hidden){const focusable=[...dialog.querySelectorAll('button:not([hidden]):not(:disabled)')].filter(x=>x.getClientRects().length);if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 renderFilters();
})();
