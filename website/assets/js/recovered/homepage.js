
    'use strict';
    // UI-only data and behaviors. Replace these records with API responses when backend routes are ready.
    const previewCourses = {
      csharp: { category: 'Programming', title: 'Complete C# Programming', instructor: 'Ahmed Mohamed', level: 'Beginner to Intermediate', price: '$49.00' },
      htmlcss: { category: 'Web Development', title: 'HTML & CSS Fundamentals', instructor: 'Sara Ali', level: 'Beginner', price: '$29.00' },
      sql: { category: 'Databases', title: 'SQL Server Essentials', instructor: 'Mohamed Hassan', level: 'Intermediate', price: '$39.00' },
      dbdesign: { category: 'Databases', title: 'Database Design Fundamentals', instructor: 'Dina Mostafa', level: 'Beginner', price: 'Free' }
    };

    const courseItems = Array.from(document.querySelectorAll('.course-item'));
    const categoryButtons = Array.from(document.querySelectorAll('.category-card'));
    const searchInput = document.getElementById('courseSearchInput');
    const emptyState = document.getElementById('noCourses');
    const featuredHeading = document.getElementById('featuredHeading');

    function filterCourses(query = '', category = '') {
      const term = query.trim().toLowerCase();
      let visible = 0;
      courseItems.forEach(item => {
        const matchesText = !term || (item.dataset.keywords + ' ' + item.dataset.category).toLowerCase().includes(term);
        const matchesCategory = !category || item.dataset.category === category;
        const show = matchesText && matchesCategory;
        item.classList.toggle('d-none', !show);
        if (show) visible++;
      });
      categoryButtons.forEach(button => {
        const selected = button.dataset.filter === category;
        button.classList.toggle('is-selected', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      featuredHeading.textContent = category ? category + ' courses' : term ? 'Courses matching your search' : 'Your next skill starts here';
      emptyState.classList.toggle('d-none', visible !== 0);
      document.getElementById('courseGrid').classList.toggle('d-none', visible === 0);
    }

    function showAll() {
      searchInput.value = '';
      filterCourses();
    }

    document.getElementById('courseSearchForm').addEventListener('submit', event => {
      event.preventDefault();
      filterCourses(searchInput.value);
      document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    categoryButtons.forEach(button => button.addEventListener('click', () => {
      const selectedCategory = button.getAttribute('aria-pressed') === 'true' ? '' : button.dataset.filter;
      searchInput.value = '';
      filterCourses('', selectedCategory);
      document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
    document.getElementById('showAllCourses').addEventListener('click', showAll);
    document.getElementById('resetSearch').addEventListener('click', showAll);

    document.querySelectorAll('[data-course-filter]').forEach(link => {
      link.addEventListener('click', () => {
        const course = previewCourses[link.dataset.courseFilter];
        if (course) { searchInput.value = course.title; filterCourses(course.title); }
      });
    });

    const previewModal = document.getElementById('coursePreviewModal');
    previewModal.addEventListener('show.bs.modal', event => {
      const details = previewCourses[event.relatedTarget?.dataset.course];
      if (!details) return;
      document.getElementById('coursePreviewCategory').textContent = details.category;
      document.getElementById('coursePreviewTitle').textContent = details.title;
      document.getElementById('coursePreviewInstructor').textContent = 'Instructor: ' + details.instructor;
      document.getElementById('coursePreviewLevel').textContent = details.level;
      document.getElementById('coursePreviewPrice').textContent = details.price;
    });

    // Close the collapsible mobile menu after choosing a same-page destination.
    document.querySelectorAll('#mobileMenu a').forEach(link => link.addEventListener('click', () => {
      const menu = document.getElementById('mobileMenu');
      if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }));
  