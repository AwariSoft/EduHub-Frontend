
    'use strict';

    /* BACKEND INTEGRATION
     * Set this to your HTTPS endpoint for reset-token validation and password updates.
     * Expected POST JSON: { token: string, password: string }.
     * Return 2xx ONLY after the password has actually been changed.
     * The backend must check token validity, expiry, single-use status, strong
     * password policy, CSRF protections as appropriate, and rate limits.
     * In this static preview no passwords are stored or changed.
     */
    const RESET_PASSWORD_ENDPOINT = '';

    const form = document.getElementById('resetForm');
    const password = document.getElementById('newPassword');
    const confirmation = document.getElementById('confirmPassword');
    const submitButton = document.getElementById('resetButton');
    const feedback = document.getElementById('formFeedback');
    const resetState = document.getElementById('resetState');
    const successState = document.getElementById('successState');
    let submitted = false;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,128}$/;

    function setError(field, message) {
      const error = document.getElementById(field.id + 'Error');
      error.textContent = message;
      error.classList.toggle('is-visible', Boolean(message));
      field.classList.toggle('is-invalid', Boolean(message));
      field.setAttribute('aria-invalid', String(Boolean(message)));
    }

    function validateNewPassword() {
      const value = password.value;
      const message = !value ? 'Please enter a new password.' :
        !passwordPattern.test(value) ? 'Use 8–128 characters with an uppercase letter, a lowercase letter and a number.' : '';
      setError(password, message);
      return !message;
    }

    function validateConfirmation() {
      const value = confirmation.value;
      const message = !value ? 'Please confirm your new password.' :
        value !== password.value ? 'Passwords do not match.' : '';
      setError(confirmation, message);
      return !message;
    }

    function showFeedback(message, isError = false) {
      feedback.textContent = message;
      feedback.className = 'form-feedback is-visible' + (isError ? ' is-error' : '');
    }

    // Visibility toggles never store or transmit password text.
    document.querySelectorAll('[data-toggle-password]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const field = document.getElementById(toggle.dataset.togglePassword);
        const revealing = field.type === 'password';
        field.type = revealing ? 'text' : 'password';
        toggle.setAttribute('aria-pressed', String(revealing));
        toggle.setAttribute('aria-label', (revealing ? 'Hide ' : 'Show ') + (field === password ? 'new' : 'confirmation') + ' password');
        toggle.querySelector('i').className = revealing ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
        field.focus({ preventScroll: true });
      });
    });

    password.addEventListener('blur', () => { if (password.value || submitted) validateNewPassword(); });
    confirmation.addEventListener('blur', () => { if (confirmation.value || submitted) validateConfirmation(); });
    password.addEventListener('input', () => {
      if (submitted || password.classList.contains('is-invalid')) validateNewPassword();
      if (confirmation.value && (submitted || confirmation.classList.contains('is-invalid'))) validateConfirmation();
      feedback.className = 'form-feedback';
    });
    confirmation.addEventListener('input', () => {
      if (submitted || confirmation.classList.contains('is-invalid')) validateConfirmation();
      feedback.className = 'form-feedback';
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      submitted = true;
      const validPassword = validateNewPassword();
      const validConfirmation = validateConfirmation();
      if (!validPassword || !validConfirmation) {
        (validPassword ? confirmation : password).focus();
        return;
      }

      if (!RESET_PASSWORD_ENDPOINT) {
        showFeedback('Frontend preview only. Your password has not been changed. Connect a password-reset API to enable this action.');
        return;
      }

      // Reset token is included in the server-issued reset link, not guessed.
      const token = new URLSearchParams(window.location.search).get('token');
      if (!token) {
        showFeedback('Your reset link is missing or invalid. Please request a new password reset link.', true);
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = 'Resetting Password…';
      feedback.className = 'form-feedback';

      try {
        const response = await fetch(RESET_PASSWORD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          credentials: 'same-origin',
          cache: 'no-store',
          body: JSON.stringify({ token, password: password.value })
        });
        if (!response.ok) throw new Error('Unable to reset the password. The link may have expired. Please request a new one.');

        password.value = '';
        confirmation.value = '';
        resetState.hidden = true;
        successState.hidden = false;
        document.getElementById('successTitle').focus();
        // Remove the token from the address bar after successful redemption.
        window.history.replaceState({}, '', window.location.pathname + window.location.hash);
      } catch (error) {
        showFeedback(error.message || 'Unable to reset your password. Please try again.', true);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Reset Password';
      }
    });
  