
    'use strict';
    // ---------------------------------------------------------------
    // 1. Course search – acts only on currently displayed recommendations
    // ---------------------------------------------------------------
    const courses = {
      js: { title: 'JavaScript for Beginners', instructor: 'Omar Khaled', price: '$24.99' },
      asp: { title: 'ASP.NET Core Web Development', instructor: 'Ahmed Mohamed', price: '$39.99' },
      database: { title: 'Database Design Fundamentals', instructor: 'Dina Mostafa', price: '$29.99' }
    };
    const searchInputs = [...document.querySelectorAll('.search-box input')];
    const cards = [...document.querySelectorAll('.discovery-card')];
    const searchEmpty = document.getElementById('searchEmpty');
    function filterCourses(searchText) {
      const query = searchText.trim().toLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const matches = card.dataset.search.includes(query);
        card.hidden = !matches;
        visible += Number(matches);
      });
      searchEmpty.hidden = visible > 0;
      searchInputs.forEach(input => { if (input.value !== searchText) input.value = searchText; input.closest('.search-box').querySelector('.clear-search').style.display = query ? 'block' : 'none'; });
    }
    searchInputs.forEach(input => {
      input.addEventListener('input', () => filterCourses(input.value));
      input.closest('form').addEventListener('submit', event => { event.preventDefault(); document.getElementById('explore-courses').scrollIntoView({behavior:'smooth'}); });
      input.closest('.search-box').querySelector('.clear-search').addEventListener('click', () => { filterCourses(''); input.focus(); });
    });
    // ---------------------------------------------------------------
    // 2. Empty learning tabs (no fake enrollments)
    // ---------------------------------------------------------------
    const tabCopy = {
      all: ['No courses yet', 'Your enrolled courses will appear here. Find something you love and start learning.'],
      'in-progress': ['No courses in progress', 'Your in-progress courses will appear here once you begin learning.'],
      completed: ['No completed courses yet', 'Finish a course to see it in your completed learning list.']
    };
    const learningTabs = [...document.querySelectorAll('.learning-tab')];
    function selectTab(tab) {
      learningTabs.forEach(item => { const active = item.dataset.tab === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
      document.getElementById('emptyTitle').textContent = tabCopy[tab][0];
      document.getElementById('emptyDescription').textContent = tabCopy[tab][1];
      document.getElementById('learningPanel').setAttribute('aria-labelledby', learningTabs.find(item => item.dataset.tab===tab).id);
    }
    learningTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectTab(tab.dataset.tab));
      tab.addEventListener('keydown', e => {
        if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
        e.preventDefault();
        let next = e.key === 'Home' ? 0 : e.key === 'End' ? learningTabs.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + learningTabs.length) % learningTabs.length;
        selectTab(learningTabs[next].dataset.tab); learningTabs[next].focus();
      });
    });
    selectTab('all');
    // ---------------------------------------------------------------
    // 3. Course preview modal – no enrollment is changed
    // ---------------------------------------------------------------
    const dialog = document.getElementById('courseDialog');
    const closeDialog = document.getElementById('closeDialog');
    document.querySelectorAll('.open-course').forEach(button => button.addEventListener('click', () => {
      const course = courses[button.dataset.course];
      document.getElementById('dialogTitle').textContent = course.title;
      document.getElementById('dialogInstructor').textContent = 'Instructor: ' + course.instructor;
      document.getElementById('dialogCost').textContent = 'Price: ' + course.price;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else showToast(course.title + ' · See the Homepage for course discovery.');
    }));
    closeDialog.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
    // ---------------------------------------------------------------
    // 4. Sidebar toggle, account popup, mobile menu and route notices
    // ---------------------------------------------------------------
    const collapse = document.getElementById('collapseSidebar');
    collapse.addEventListener('click', () => {
      document.body.classList.toggle('is-collapsed');
      const isCollapsed = document.body.classList.contains('is-collapsed');
      collapse.setAttribute('aria-pressed', String(isCollapsed));
      collapse.setAttribute('aria-label', isCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
      collapse.querySelector('.side-label').textContent = isCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
    });
    const accountToggle = document.getElementById('accountToggle');
    const accountDropdown = document.getElementById('accountDropdown');
    accountToggle.addEventListener('click', e => { e.stopPropagation(); accountDropdown.hidden = !accountDropdown.hidden; accountToggle.setAttribute('aria-expanded', String(!accountDropdown.hidden)); });
    document.addEventListener('click', e => { if (!accountDropdown.contains(e.target) && !accountToggle.contains(e.target)) { accountDropdown.hidden = true; accountToggle.setAttribute('aria-expanded','false'); } });
    const menu = document.getElementById('mobileMenu');
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const overlay = document.getElementById('menuOverlay');
    function setMenu(open) {
      document.body.classList.toggle('menu-open', open);
      openMenu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      if (open) closeMenu.focus(); else openMenu.focus();
    }
    openMenu.addEventListener('click', () => setMenu(true));
    closeMenu.addEventListener('click', () => setMenu(false));
    overlay.addEventListener('click', () => setMenu(false));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { if (link.classList.contains('upcoming')) return; setMenu(false); }));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (document.body.classList.contains('menu-open')) setMenu(false); accountDropdown.hidden = true; accountToggle.setAttribute('aria-expanded','false'); } });
    let toastTimeout;
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.hidden = false;
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => toast.hidden = true, 4800);
    }
    document.querySelectorAll('.upcoming').forEach(el => el.addEventListener('click', e => {
      e.preventDefault();
      const name = el.dataset.route;
      showToast(name === 'Log Out' ? 'This is a frontend demo. Sign-out requires an authentication service.' : name + ' will be available when its EduHub page is implemented.');
      accountDropdown.hidden = true;
      if (document.body.classList.contains('menu-open')) setMenu(false);
    }));
    document.getElementById('viewAllCourses').addEventListener('click', () => selectTab('all'));
  