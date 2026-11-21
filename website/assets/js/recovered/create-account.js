
    'use strict';

    /* Integration points: replace these only after the API and OAuth flow exist.
     * NEVER trust a role sent by the browser. Admin permissions MUST be authorized
     * server-side; public registration must not grant admin privileges automatically.
     * Do not persist passwords to localStorage, URLs, logs, or client-side analytics.
     */
    const REGISTER_ENDPOINT = '';
    const GOOGLE_OAUTH_URL = '';

    const form = document.getElementById('registerForm');
    const feedback = document.getElementById('formFeedback');
    const submitButton = document.getElementById('registerButton');
    const fields = ['fullName', 'email', 'password', 'confirmPassword'].map(id => document.getElementById(id));
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    function showFeedback(message, kind = 'info') {
      feedback.textContent = message;
      feedback.className = 'feedback-message is-visible' + (kind === 'error' ? ' is-error' : kind === 'success' ? ' is-success' : '');
    }

    function validateField(field, displayError) {
      const value = field.value.trim();
      let error = '';
      if (field.id === 'fullName' && value.length < 2) error = 'Please enter your full name (at least 2 characters).';
      else if (field.id === 'email' && !field.validity.valid) error = 'Enter a valid email address.';
      else if (field.id === 'password' && field.value.length < 8) error = 'Use at least 8 characters for your password.';
      else if (field.id === 'confirmPassword' && field.value !== passwordInput.value) error = 'Passwords must match.';
      else if (field.id === 'confirmPassword' && !field.value) error = 'Confirm your password.';

      const errorLabel = document.getElementById(field.id + 'Error');
      if (errorLabel) errorLabel.textContent = error;
      field.classList.toggle('is-invalid', displayError && !!error);
      field.setAttribute('aria-invalid', displayError && !!error ? 'true' : 'false');
      return !error;
    }

    for (const field of fields) {
      field.addEventListener('blur', () => validateField(field, true));
      field.addEventListener('input', () => {
        if (field.classList.contains('is-invalid')) validateField(field, true);
        if (field === passwordInput && confirmPasswordInput.value) validateField(confirmPasswordInput, true);
        feedback.classList.remove('is-visible');
      });
    }

    document.querySelectorAll('[data-toggle-password]').forEach(button => {
      button.addEventListener('click', () => {
        const input = document.getElementById(button.dataset.togglePassword);
        const revealing = input.type === 'password';
        input.type = revealing ? 'text' : 'password';
        button.setAttribute('aria-pressed', String(revealing));
        button.setAttribute('aria-label', (revealing ? 'Hide' : 'Show') + (input === confirmPasswordInput ? ' confirmed password' : ' password'));
        button.querySelector('i').className = revealing ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
        input.focus({ preventScroll: true });
      });
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      let valid = true;
      fields.forEach(field => { if (!validateField(field, true)) valid = false; });
      if (!valid) {
        showFeedback('Please correct the highlighted fields before continuing.', 'error');
        fields.find(field => field.classList.contains('is-invalid'))?.focus();
        return;
      }

      const payload = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: passwordInput.value,
        role: form.elements.role.value
      };

      if (!REGISTER_ENDPOINT) {
        showFeedback('Form validated. Account creation will be available once the EduHub registration API is connected.');
        return;
      }

      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      try {
        const response = await fetch(REGISTER_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify(payload)
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(typeof data.message === 'string' ? data.message : 'Registration could not be completed.');
        showFeedback('Your account was created successfully. You may now log in.', 'success');
        passwordInput.value = '';
        confirmPasswordInput.value = '';
      } catch (error) {
        showFeedback(error instanceof Error ? error.message : 'A network error occurred. Please try again.', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
      }
    });

    document.getElementById('googleButton').addEventListener('click', () => {
      if (GOOGLE_OAUTH_URL) {
        window.location.assign(GOOGLE_OAUTH_URL);
      } else {
        showFeedback('Google sign-in is not connected yet. Configure the Google OAuth authorization URL to enable this option.');
      }
    });
  