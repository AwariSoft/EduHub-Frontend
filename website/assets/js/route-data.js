(() => {
  'use strict';

  const search = document.getElementById('edu-explore-search');
  if (search) {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || params.get('q');
    if (query) {
      search.value = query;
      search.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  const courseKey = new URLSearchParams(location.search).get('course');
  const preview = document.querySelector('[data-course-preview]');
  if (!preview || !courseKey) return;

  const catalogue = {
    'html-css-fundamentals': ['HTML & CSS Fundamentals', 'Web Development', 'Sara Ali', 'Beginner', '$29.00'],
    'sql-server-essentials': ['SQL Server Essentials', 'Databases', 'Mohamed Hassan', 'Intermediate', '$39.00'],
    'javascript-for-beginners': ['JavaScript for Beginners', 'Programming', '', 'Beginner', ''],
    'asp-net-core-web-development': ['ASP.NET Core Web Development', 'Web Development', '', 'Intermediate', ''],
  };
  const course = Object.hasOwn(catalogue, courseKey) ? catalogue[courseKey] : null;
  if (!course) return;

  const [title, category, instructor, level, price] = course;
  document.title = `${title} | EduHub`;
  preview.querySelector('h1').textContent = title;
  const summary = document.createElement('section');
  summary.className = 'card border p-4';
  const subject = document.createElement('p');
  subject.className = 'text-primary fw-semibold mb-2';
  subject.textContent = category;
  const details = document.createElement('p');
  details.className = 'text-secondary mb-2';
  details.textContent = [instructor, level].filter(Boolean).join(' · ');
  const notes = document.createElement('p');
  notes.className = 'mb-0';
  notes.textContent = [price, 'Full course details are unavailable in this preview.'].filter(Boolean).join(' · ');
  summary.append(subject, details, notes);
  while (preview.children.length > 1) preview.lastElementChild.remove();
  preview.append(summary);
})();
