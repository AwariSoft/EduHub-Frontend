
  'use strict';
  // ==============================================================
  // Filter model: one source of truth shared by desktop/mobile.
  // ==============================================================
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const grid = $('#courseGrid');
  const cards = $$('.course-item',grid);
  const selects = {category:$('#filterCategory'),level:$('#filterLevel'),price:$('#filterPrice'),rating:$('#filterRating'),sort:$('#filterSort')};
  const state = {query:'',category:'all',level:'all',price:'all',rating:'all',sort:'popularity'};
  const searchFields = [$('#globalSearch'),$('#mobileGlobalSearch'),$('#courseSearch')];
  const showToast = (message) => {
    const toast=$('#notificationToast'); toast.textContent=message; toast.hidden=false;
    // User closes naturally on next interaction or by clicking the notice.
  };
  $('#notificationToast').addEventListener('click', e=>e.currentTarget.hidden=true);
  function matches(card, next=state) {
    const d=card.dataset;
    const titleMatch=d.title.includes(next.query.trim().toLowerCase());
    const categoryMatch=next.category==='all'||d.category===next.category;
    // Beginner to Intermediate courses are included in either appropriate level.
    const levelMatch=next.level==='all'||d.level===next.level||d.level.split(' to ').includes(next.level);
    const priceMatch=next.price==='all'||(next.price==='free'&&Number(d.price)===0)||(next.price==='paid'&&Number(d.price)>0);
    const ratingMatch=next.rating==='all'||Number(d.rating)>=Number(next.rating);
    return titleMatch&&categoryMatch&&levelMatch&&priceMatch&&ratingMatch;
  }
  function getMatching(next=state) {return cards.filter(card=>matches(card,next));}
  function render() {
    const ordered=[...cards].sort((a,b)=>state.sort==='rating' ? Number(b.dataset.rating)-Number(a.dataset.rating)||Number(a.dataset.popular)-Number(b.dataset.popular) : state.sort==='newest'?Number(b.dataset.sortorder)-Number(a.dataset.sortorder):Number(a.dataset.popular)-Number(b.dataset.popular));
    ordered.forEach(card=>{card.hidden=!matches(card);grid.appendChild(card);});
    const count=ordered.filter(card=>!card.hidden).length;
    $('#courseCount').textContent=`${count} ${count===1?'course':'courses'} to explore`;
    $('#noResults').hidden=count!==0;
    $('#loadMore').disabled=count===0;
    $('#pageMessage').textContent=`Showing ${count} of 6 courses in this release`;
    $('#sortButtonLabel').textContent='Sort: '+selects.sort.options[selects.sort.selectedIndex].text;
    $('#applyMobileFilters').textContent=`Show ${count} ${count===1?'Course':'Courses'}`;
    return count;
  }
  function applyState(next) {
    Object.assign(state,next);
    Object.entries(selects).forEach(([key,select])=>select.value=state[key]);
    searchFields.forEach(input=>{if(input.value!==state.query)input.value=state.query;});
    render();
  }
  Object.entries(selects).forEach(([key,select])=>select.addEventListener('change',()=>applyState({[key]:select.value})));
  searchFields.forEach(input=>input.addEventListener('input',()=>applyState({query:input.value})));
  function resetAll() { applyState({query:'',category:'all',level:'all',price:'all',rating:'all',sort:'popularity'});syncMobileForm(); }
  $('#resetNoResults').addEventListener('click',resetAll);
  $('#loadMore').addEventListener('click',()=>{showToast('All six courses in this release are already displayed.');$('#pageMessage').textContent='All 6 courses in this release are displayed';});
  // ==============================================================
  // Course previews: no fake navigation or enrollment requests.
  // ==============================================================
  const info={
    csharp:{title:'Complete C# Programming',teacher:'Ahmed Mohamed',category:'Programming',level:'Beginner to Intermediate',price:'$49.00'},
    html:{title:'HTML & CSS Fundamentals',teacher:'Sara Ali',category:'Web Development',level:'Beginner',price:'$29.00'},
    sql:{title:'SQL Server Essentials',teacher:'Mohamed Hassan',category:'Databases',level:'Intermediate',price:'$39.00'},
    javascript:{title:'JavaScript for Beginners',teacher:'Omar Khaled',category:'Web Development',level:'Beginner',price:'$35.00'},
    aspnet:{title:'ASP.NET Core Web Development',teacher:'Ahmed Mohamed',category:'Web Development',level:'Intermediate',price:'$59.00'},
    database:{title:'Database Design Fundamentals',teacher:'Dina Mostafa',category:'Databases',level:'Beginner',price:'Free'}
  };
  grid.addEventListener('click',e=>{
    const btn=e.target.closest('.view-course');if(!btn)return;
    const item=info[btn.dataset.courseId];if(!item)return;
    $('#dialogTitle').textContent=item.title;
    $('#dialogInstructor').textContent='By '+item.teacher;
    $('#dialogMeta').textContent=`${item.category} · ${item.level} · ${item.price}`;
    $('#dialogImage').src=btn.closest('.course-card').querySelector('.course-photo').src;
    $('#courseDialog').showModal();
  });
  $('#previewLearnMore').addEventListener('click',()=>showToast('Course Details is the next screen to implement. No enrollment or payment was initiated.'));
  // ==============================================================
  // Mobile filter/sort UI - radios follow the same five filter keys.
  // ==============================================================
  const mobileKeys={mCategory:'category',mLevel:'level',mPrice:'price',mRating:'rating',mSort:'sort'};
  const mobileForm=$('#mobileFilterForm');
  function mobileValue(key){return mobileForm.elements[key].value;}
  function syncMobileForm(){Object.entries(mobileKeys).forEach(([name,key])=>{$$(`input[name="${name}"]`,mobileForm).forEach(input=>input.checked=input.value===state[key]);});updateFilterPreview();}
  function updateFilterPreview(){const next={...state};Object.entries(mobileKeys).forEach(([name,key])=>next[key]=mobileValue(name));const n=getMatching(next).length;$('#applyMobileFilters').textContent=`Show ${n} ${n===1?'Course':'Courses'}`;}
  mobileForm.addEventListener('change',updateFilterPreview);
  function openFilters(fromSort=false){syncMobileForm();$('#mobileFiltersDialog').showModal();if(fromSort){$$('.mobile-filter-group',mobileForm).at(-1)?.scrollIntoView({block:'nearest'});}}
  // Figma's dedicated mobile Filters Open frame is a separate page.
  // Pass active filters through the URL, so no browser storage is required.
  function fullPageFiltersUrl(scrollToSort=false) {
    const params=new URLSearchParams();
    for (const key of ['category','level','price','rating','sort']) {
      const defaultValue=key==='sort'?'popularity':'all';
      if(state[key]!==defaultValue) params.set(key,state[key]);
    }
    if(state.query.trim()) params.set('q',state.query.trim());
    const query=params.toString();
    return '../states/explore-courses-mobile-filters-open.html'+(query?'?'+query:'')+(scrollToSort?'#sort':'');
  }
  $('#openFilters').addEventListener('click',()=>{window.location.href=fullPageFiltersUrl();});
  $('#openSort').addEventListener('click',()=>{window.location.href=fullPageFiltersUrl(true);});
  mobileForm.addEventListener('submit',e=>{e.preventDefault();const next={};Object.entries(mobileKeys).forEach(([name,key])=>next[key]=mobileValue(name));applyState(next);$('#mobileFiltersDialog').close();$('#catalogRegion').scrollIntoView({behavior:'smooth',block:'start'});});
  $('#resetMobileFilters').addEventListener('click',()=>{resetAll();$('#mobileFiltersDialog').close();});
  $('#openMenu').addEventListener('click',()=>$('#navDialog').showModal());
  $$('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));
  $$('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();}));
  $$('[data-notice]').forEach(button=>button.addEventListener('click',()=>showToast(button.dataset.notice)));
  // Hydrate catalog filters from the dedicated full-page mobile filter state.
  const incoming=new URLSearchParams(window.location.search);
  const permitted={
    category:['all','Programming','Web Development','Databases'],
    level:['all','Beginner','Intermediate','Advanced'],
    price:['all','free','paid'], rating:['all','4.5','4.0','3.5'],
    sort:['popularity','newest','rating']
  };
  const selection={};
  Object.keys(permitted).forEach(key=>{
    if(permitted[key].includes(incoming.get(key))) selection[key]=incoming.get(key);
  });
  if(incoming.has('q')) selection.query=incoming.get('q').slice(0,150);
  if(Object.keys(selection).length) applyState(selection); else render();
  