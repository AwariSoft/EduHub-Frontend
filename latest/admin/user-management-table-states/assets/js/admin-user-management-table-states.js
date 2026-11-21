/* EduHub User Management — supporting table states (frontend-only). */
(()=>{'use strict';
const users=[
{id:'USR-1204',name:'Warda Mahmoud',initials:'WM',email:'warda.mahmoud@example.com',role:'student',registered:'Oct 28, 2026',status:'active'},
{id:'USR-1203',name:'Sarah Ali',initials:'SA',email:'sarah.ali@example.com',role:'student',registered:'Oct 27, 2026',status:'active'},
{id:'USR-1202',name:'Omar Hassan',initials:'OH',email:'omar.hassan@example.com',role:'student',registered:'Oct 26, 2026',status:'inactive'},
{id:'USR-0311',name:'Ahmed Mohamed',initials:'AM',email:'ahmed.mohamed@example.com',role:'instructor',registered:'May 12, 2026',status:'active'},
{id:'USR-0312',name:'Mohamed Hassan',initials:'MH',email:'mohamed.hassan@example.com',role:'instructor',registered:'May 18, 2026',status:'active'},
{id:'USR-0001',name:'Nour Hassan',initials:'NH',email:'nour.hassan@example.com',role:'admin',registered:'May 01, 2026',status:'active'}
];
const el=id=>document.getElementById(id);const search=el('activeSearch'),role=el('activeRole'),status=el('activeStatus'),resultBody=el('matchingRows'),empty=el('notFoundBody'),summary=el('matchedSummary'),message=el('noResultsMessage');
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function getMatches(){const q=search.value.trim().toLowerCase();return users.filter(u=>(!q||(u.name+' '+u.email+' '+u.id).toLowerCase().includes(q))&&(role.value==='all'||u.role===role.value)&&(status.value==='all'||u.status===status.value));}
function render(){const matches=getMatches();if(!matches.length){resultBody.innerHTML='';resultBody.hidden=true;empty.hidden=false;summary.hidden=true;const q=search.value.trim();message.textContent=q?`No records match “${q}” with the selected filters. Try a different search or reset the filters.`:'No registered users match the selected filters. Try another role or account status, or reset the filters.';return;}
empty.hidden=true;resultBody.hidden=false;summary.hidden=false;resultBody.innerHTML=matches.map(u=>`<div class="sample-row" role="row"><span role="cell" class="sample-identity"><span class="sample-avatar" aria-hidden="true">${escapeHtml(u.initials)}</span>${escapeHtml(u.name)}</span><span role="cell" class="sample-email" data-label="Email">${escapeHtml(u.email)}</span><span role="cell" data-label="Role">${u.role[0].toUpperCase()+u.role.slice(1)}</span><span role="cell" data-label="Registration" class="sample-muted">${escapeHtml(u.registered)}</span><span role="cell" data-label="Account status"><span class="sample-status ${u.status}">${u.status[0].toUpperCase()+u.status.slice(1)}</span></span><span role="cell" data-label="Actions"><a class="sample-review" href="related/eduhub-admin-user-management.html" title="Open the User Management list">View User Details →</a></span></div>`).join('');summary.innerHTML=`<span>Showing ${matches.length} supplied sample account${matches.length===1?'':'s'}. Figma reports 1,284 platform users; only six accounts are available for filtering in this demo.</span><button id="resetAfterMatch" class="btn-outline-ed reset-after-match" type="button">Reset Filters</button>`;el('resetAfterMatch').addEventListener('click',()=>{search.value='';role.value='all';status.value='all';render();search.focus();});}
search.addEventListener('input',render);role.addEventListener('change',render);status.addEventListener('change',render);
el('clearSearch').addEventListener('click',()=>{search.value='';render();search.focus();});
el('resetFilters').addEventListener('click',()=>{search.value='';role.value='all';status.value='all';render();search.focus();});
el('activeFilters').addEventListener('submit',e=>e.preventDefault());
function updateEmpty(){const active=!!el('emptySearch').value.trim()||el('emptyRole').value!=='all'||el('emptyStatus').value!=='all';el('emptyDatasetNote').textContent=active?'No registered users exist in this workspace; filters cannot reveal records.':'No search or filters are applied.';}
for(const id of ['emptySearch','emptyRole','emptyStatus'])el(id).addEventListener(id==='emptySearch'?'input':'change',updateEmpty);
window.EduHubUserTableStates={getMatches,render,reset(){search.value='';role.value='all';status.value='all';render();},sampleCount:users.length};
})();
