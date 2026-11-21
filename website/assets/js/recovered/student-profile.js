
    'use strict';
    // =========================================================
    // Client-only demo navigation. Existing auth/home pages work.
    // Future pages are clearly marked instead of opening a 404.
    // Remove data-pending from links after creating their HTML files.
    // =========================================================
    const toastNode = document.getElementById('feedbackToast');
    const messageNode = document.getElementById('feedbackMessage');
    function notify(message) {
      messageNode.textContent = message;
      if (window.bootstrap && bootstrap.Toast) {
        bootstrap.Toast.getOrCreateInstance(toastNode).show();
      } else {
        window.alert(message); // works even if the CDN is temporarily unavailable
      }
    }
    document.addEventListener('click', (event) => {
      const pendingLink = event.target.closest('a[data-pending]');
      if (pendingLink) {
        event.preventDefault();
        notify(pendingLink.dataset.pending + ' will open here when its EduHub screen is implemented.');
        return;
      }
      const demoLink = event.target.closest('[data-demo-action="logout"]');
      if (demoLink) {
        event.preventDefault();
        notify('This is a static profile preview. Connect authentication before enabling Log Out.');
      }
    });
    document.getElementById('courseSearchForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const query = document.getElementById('courseSearch').value.trim();
      if (!query) {
        document.getElementById('courseSearch').focus();
        return;
      }
      window.location.href = '../public/explore-courses.html?q=' + encodeURIComponent(query);
    });
  