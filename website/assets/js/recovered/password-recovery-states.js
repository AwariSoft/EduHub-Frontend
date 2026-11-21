
    'use strict';
    // The board is a frontend showcase only. Never send requests or store email values.
    (() => {
      const input = document.getElementById('validation-email');
      const error = document.getElementById('validation-error');
      const retryEmail = document.getElementById('retry-email');
      const loadingEmail = document.getElementById('submitting-email');
      const confirmationEmail = document.getElementById('received-email');
      const announcer = document.getElementById('demo-announcement');
      const sections = ['email-validation','submitting-request','request-received','temporary-error'].map(id=>document.getElementById(id));
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let pendingDemo = null;
      function validEmail(value) { return value.length <= 254 && emailPattern.test(value); }
      function showValidation(invalid) {
        input.setAttribute('aria-invalid', String(invalid));
        error.hidden = !invalid;
      }
      function announce(text) { announcer.textContent = text; }
      function reveal(section) {
        sections.forEach(s => s.classList.remove('demo-highlight'));
        section.classList.add('demo-highlight');
        section.scrollIntoView({behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start'});
      }
      function stopPreview() {
        if (pendingDemo !== null) { window.clearTimeout(pendingDemo); pendingDemo = null; }
      }
      input.addEventListener('input', () => {
        showValidation(!validEmail(input.value.trim()));
      });
      document.getElementById('validation-form').addEventListener('submit', e => {
        e.preventDefault();
        stopPreview();
        const email = input.value.trim();
        if (!validEmail(email)) {
          showValidation(true); input.focus();
          announce('Enter a valid email address. No email has been sent.');
          return;
        }
        showValidation(false);
        loadingEmail.value = email;
        retryEmail.value = email;
        confirmationEmail.textContent = email;
        reveal(sections[1]);
        announce('Showing the submitting visual state. This is a demo. No request or email is sent.');
        pendingDemo = window.setTimeout(() => {
          pendingDemo = null;
          reveal(sections[2]);
          announce('Showing the privacy-safe confirmation visual state. Demo only: no request was sent.');
        }, 1100);
      });
      document.getElementById('different-email').addEventListener('click', () => {
        stopPreview(); input.value = '';
        showValidation(false);
        reveal(sections[0]);
        input.focus({ preventScroll: true });
        announce('Try a different email. No request was sent.');
      });
      document.getElementById('try-again').addEventListener('click', () => {
        stopPreview();
        input.value = retryEmail.value.trim();
        showValidation(!validEmail(input.value));
        reveal(sections[0]);
        input.focus({preventScroll:true});
        announce('Your email has been preserved for another attempt. Demo only.');
      });
      retryEmail.addEventListener('input', () => {
        // The failed-request example is editable; values persist in-page only.
        const next = retryEmail.value.trim();
        if (validEmail(next)) loadingEmail.value = next;
      });
      // Use inline SVG when external icon fonts are inaccessible (offline browser).
      window.addEventListener('load', () => {
        const primaryIcon = document.querySelector('.outcome-icon i');
        const beforeContent = getComputedStyle(primaryIcon, '::before').content;
        if (beforeContent === 'none' || beforeContent === 'normal' || beforeContent === '') {
          document.documentElement.classList.add('no-fa');
        }
      });
    })();
  