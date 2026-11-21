// Search and category controls filter the four featured courses in this page.
    const searchForm = document.querySelector('#search-form');
    const courseQuery = document.querySelector('#course-query');
    const courses = document.querySelector('#courses');
    const courseTiles = [...courses.querySelectorAll('[data-course-tile]')];
    const categoryButtons = [...document.querySelectorAll('[data-category]')];
    const results = document.querySelector('#course-results');
    const emptyState = document.querySelector('#course-empty');
    const compactView = window.matchMedia('(max-width: 767.98px)');

    function updateSearchPlaceholder() {
      courseQuery.placeholder = compactView.matches
        ? 'Search courses...'
        : 'Search by course title or subject';
    }

    function filterCourses(query, category = '', moveFocus = true) {
      const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
      let count = 0;

      for (const tile of courseTiles) {
        const title = tile.querySelector('.course-title').textContent.trim().toLowerCase();
        const subject = tile.querySelector('.status-badge').textContent.trim();
        const matches = (!category || category === subject)
          && terms.every(term => title.includes(term) || subject.toLowerCase().includes(term));

        tile.hidden = !matches;
        if (matches) count++;
      }

      for (const button of categoryButtons) {
        button.setAttribute('aria-pressed', String(button.dataset.category === category));
      }

      emptyState.classList.toggle('d-none', count > 0);
      results.textContent = count === 1 ? '1 featured course found.' : `${count} featured courses found.`;

      if (moveFocus) courses.focus();
    }

    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      filterCourses(courseQuery.value);
    });

    courseQuery.addEventListener('input', () => {
      if (!courseQuery.value && !categoryButtons.some(button => button.getAttribute('aria-pressed') === 'true')) {
        filterCourses('', '', false);
      }
    });

    for (const button of categoryButtons) {
      button.addEventListener('click', () => {
        const category = button.getAttribute('aria-pressed') === 'true' ? '' : button.dataset.category;
        courseQuery.value = '';
        filterCourses('', category);
      });
    }

    compactView.addEventListener('change', updateSearchPlaceholder);
    updateSearchPlaceholder();
