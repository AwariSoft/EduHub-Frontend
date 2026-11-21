
    'use strict';
    // --------------------------------------------------------------
    // Filter state is sourced only from the six catalog demo courses.
    // No backend queries or persistence are performed.
    // --------------------------------------------------------------
    const courses = [
      {category:'Programming', level:'Beginner to Intermediate', price:49, rating:4.8},
      {category:'Web Development', level:'Beginner', price:29, rating:4.7},
      {category:'Databases', level:'Intermediate', price:39, rating:4.8},
      {category:'Web Development', level:'Beginner', price:35, rating:4.8},
      {category:'Web Development', level:'Intermediate', price:59, rating:4.9},
      {category:'Databases', level:'Beginner', price:0, rating:4.7}
    ];
    const defaults = Object.freeze({category:'all', level:'all', price:'all', rating:'all', sort:'popularity'});
    const allowed = Object.freeze({
      category:['all','Programming','Web Development','Databases'],
      level:['all','Beginner','Intermediate','Advanced'],
      price:['all','free','paid'], rating:['all','4.5','4.0','3.5'],
      sort:['popularity','newest','rating']
    });
    const form = document.getElementById('filtersForm');
    const search = document.getElementById('headerSearch');
    const params = new URLSearchParams(window.location.search);
    const keys = Object.keys(defaults);
    const initial = {};
    for (const key of keys) initial[key] = allowed[key].includes(params.get(key)) ? params.get(key) : defaults[key];
    for (const [key,value] of Object.entries(initial)) form.querySelector(`input[name="${key}"][value="${CSS.escape(value)}"]`).checked=true;
    search.value = params.get('q') || '';
    function readFilters() {
      const result = {};
      for (const key of keys) result[key] = form.elements[key].value;
      return result;
    }
    function countMatching(filters) {
      return courses.filter(course => {
        const q=(search.value||'').trim().toLowerCase();
        // The catalog performs title matching, not general full-text search.
        const titles=['complete c# programming','html & css fundamentals','sql server essentials','javascript for beginners','asp.net core web development','database design fundamentals'];
        const title=titles[courses.indexOf(course)];
        return title.includes(q) && (filters.category==='all'||course.category===filters.category)
          && (filters.level==='all'||course.level===filters.level||course.level.split(' to ').includes(filters.level))
          && (filters.price==='all'||(filters.price==='free'&&course.price===0)||(filters.price==='paid'&&course.price>0))
          && (filters.rating==='all'||course.rating>=Number(filters.rating));
      }).length;
    }
    function refreshCount() {
      const n=countMatching(readFilters());
      document.getElementById('showCourses').textContent=`Show ${n} ${n===1?'Course':'Courses'}`;
    }
    form.addEventListener('change',refreshCount);
    search.addEventListener('input',refreshCount);
    function catalogUrl(current=false) {
      const finalParams = current ? new URLSearchParams(window.location.search) : new URLSearchParams();
      if (!current) {
        const picked=readFilters();
        for (const key of keys) if(picked[key]!==defaults[key]) finalParams.set(key,picked[key]);
        if(search.value.trim()) finalParams.set('q',search.value.trim());
      }
      const suffix=finalParams.toString();
      return '../public/explore-courses.html'+(suffix?'?'+suffix:'')+(current?'':'#catalogRegion');
    }
    document.getElementById('closeFilters').addEventListener('click',()=>{window.location.href=catalogUrl(true)});
    form.addEventListener('submit',e=>{e.preventDefault();window.location.href=catalogUrl(false)});
    document.getElementById('resetFilters').addEventListener('click',()=>{
      for(const key of keys) form.querySelector(`input[name="${key}"][value="${CSS.escape(defaults[key])}"]`).checked=true;
      search.value=''; refreshCount();
    });
    const notice=document.getElementById('notice');
    document.getElementById('notificationButton').addEventListener('click',()=>{ notice.textContent='The Notifications screen is not connected yet.';notice.hidden=false; });
    notice.addEventListener('click',()=>notice.hidden=true);
    const navigationDialog=document.getElementById('navigationDialog');
    document.getElementById('menuButton').addEventListener('click',()=>navigationDialog.showModal());
    document.getElementById('closeNav').addEventListener('click',()=>navigationDialog.close());
    navigationDialog.addEventListener('click',e=>{if(e.target===navigationDialog)navigationDialog.close();});
    if(window.location.hash==='#sort') document.getElementById('group-sort').scrollIntoView({block:'start'});
    refreshCount();
  