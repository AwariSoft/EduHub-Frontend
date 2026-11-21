/* EduHub course approvals supporting states: data-safe frontend demonstrations. */
(()=>{'use strict';
const records=[
{id:'CRS-028',title:'SQL Server Essentials',instructor:'Mohamed Hassan',category:'Database',date:'2026-10-28',displayDate:'Oct 28, 2026',price:'$39',status:'pending'},
{id:'CRS-041',title:'JavaScript for Beginners',instructor:'Omar Khaled',category:'Programming',date:'2026-10-27',displayDate:'Oct 27, 2026',price:'$35',status:'pending'},
{id:'CRS-036',title:'Git & GitHub Essentials',instructor:'Nour Ahmed',category:'Programming',date:'2026-10-26',displayDate:'Oct 26, 2026',price:'$19',status:'pending'},
{id:'CRS-012',title:'Complete C# Programming',instructor:'Ahmed Mohamed',category:'Programming',date:'2026-10-24',displayDate:'Oct 24, 2026',price:'$49',status:'approved'},
{id:'CRS-033',title:'HTML & CSS Fundamentals',instructor:'Sara Ali',category:'Web Development',date:'2026-10-23',displayDate:'Oct 23, 2026',price:'$29',status:'approved'},
{id:'CRS-039',title:'REST APIs with .NET',instructor:'Ahmed Mohamed',category:'Web Development',date:'2026-10-22',displayDate:'Oct 22, 2026',price:'$45',status:'rejected'}];
const byId=id=>document.getElementById(id);
const search=byId('activeSearch'),status=byId('activeStatus'),date=byId('activeDate');const resultBody=byId('matchingRows'),notFound=byId('notFoundBody'),summary=byId('matchedSummary'),message=byId('noResultsMessage');
function getMatches(){const q=search.value.trim().toLocaleLowerCase();return records.filter(r=>{if(q&&!(r.title+' '+r.instructor+' '+r.id).toLocaleLowerCase().includes(q))return false;if(status.value!=='all'&&r.status!==status.value)return false;if(date.value==='oct01-15' && !(r.date>='2026-10-01'&&r.date<='2026-10-15'))return false;if(date.value==='oct22-30'&&!(r.date>='2026-10-22'&&r.date<='2026-10-30'))return false;if(date.value==='oct01-30'&&!(r.date>='2026-10-01'&&r.date<='2026-10-30'))return false;return true});}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){const matches=getMatches();if(matches.length){notFound.hidden=true;resultBody.hidden=false;summary.hidden=false;resultBody.innerHTML=matches.map(r=>`<div class="sample-row" role="row"><span role="cell" class="sample-title">${esc(r.title)} <small class="sample-id">${esc(r.id)}</small></span><span role="cell" data-label="Instructor">${esc(r.instructor)}</span><span role="cell" data-label="Category" class="sample-muted">${esc(r.category)}</span><span role="cell" data-label="Date" class="sample-muted">${esc(r.displayDate)}</span><span role="cell" data-label="Price">${esc(r.price)}</span><span role="cell" data-label="Approval status"><span class="sample-status ${esc(r.status)}">${r.status[0].toUpperCase()+r.status.slice(1)}</span></span><span role="cell" data-label="Actions"><a class="sample-review" href="related/eduhub-admin-course-approvals.html" title="Open Course Approvals review list">Review →</a></span></div>`).join('');summary.textContent=`Showing ${matches.length} available sample submission${matches.length===1?'':'s'}. The original Figma queue reports 47 total submissions; only six records are included in this demo.`;}
else{resultBody.hidden=true;resultBody.innerHTML='';notFound.hidden=false;summary.hidden=true;const q=search.value.trim();message.textContent=q?`No records match “${q}” with the selected filters. Try a different search or reset the filters.`:'No course submissions match the selected filters. Try another status or date range, or reset the filters.';}}
const debounce=fn=>{let handle;return()=>{clearTimeout(handle);handle=setTimeout(fn,100)}};
search.addEventListener('input',debounce(render));status.addEventListener('change',render);date.addEventListener('change',render);
byId('clearSearch').addEventListener('click',()=>{search.value='';render();search.focus()});
byId('resetFilters').addEventListener('click',()=>{search.value='';status.value='all';date.value='all';render();search.focus()});
byId('activeFilters').addEventListener('submit',e=>e.preventDefault());
// The empty-dataset state has no sample data, unlike the no-search-results state.
for(const id of ['emptySearch','emptyDate','emptyStatus']){
  const c=byId(id);c.addEventListener(c.tagName==='INPUT'?'input':'change',()=>{
    const active=!!byId('emptySearch').value.trim()||byId('emptyDate').value!=='all'||byId('emptyStatus').value!=='all';
    byId('emptyDatasetNote').textContent=active?'No submitted courses exist in this workspace; filters cannot reveal records.':'No search or filters are applied.';
  });
}
// Shared integration helpers, no timers, network fetches or backend mutations.
window.EduHubApprovalTableStates={getMatches,render,reset(){search.value='';status.value='all';date.value='all';render();},sampleCount:records.length};
})();
