
    'use strict';

    /* BACKEND INTEGRATION:
     * Configure HTTPS URLs and API response contracts for your project.
     * Expected sign-in API: POST { email, password, rememberMe } and a server-managed
     * HttpOnly, Secure, SameSite session cookie; on success, redirect to a trusted path.
     * Never save passwords or access tokens to localStorage or URLs.
     * Google sign-in requires a real server-managed OAuth/OIDC authorization endpoint.
     */
    const AUTH_ENDPOINT = '';
    const GOOGLE_OAUTH_URL = '';
    const SUCCESS_REDIRECT = '../student/dashboard.html';

    const form = document.getElementById('signInForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberInput = document.getElementById('rememberMe');
    const toggle = document.getElementById('passwordToggle');
    const feedback = document.getElementById('formFeedback');
    const submitButton = document.getElementById('loginButton');

    function showFeedback(message, kind = 'info') {
      feedback.textContent = message;
      feedback.className = 'form-feedback is-visible' + (kind === 'error' ? ' is-error' : kind === 'success' ? ' is-success' : '');
    }
    function clearFeedback() {
      feedback.className = 'form-feedback';
      feedback.textContent = '';
    }
    function markField(field, error, show) {
      const invalid = Boolean(show && error);
      const target = document.getElementById(field.id + 'Error');
      field.classList.toggle('is-invalid', invalid);
      field.setAttribute('aria-invalid', invalid ? 'true' : 'false');
      target.textContent = invalid ? error : '';
      target.classList.toggle('is-visible', invalid);
      return !error;
    }
    function validateEmail(show = false) {
      const valid = emailInput.value.trim() !== '' && emailInput.validity.valid;
      return markField(emailInput, valid ? '' : 'Enter a valid email address.', show);
    }
    function validatePassword(show = false) {
      return markField(passwordInput, passwordInput.value ? '' : 'Enter your password.', show);
    }

    for (const field of [emailInput, passwordInput]) {
      field.addEventListener('blur', () => (field === emailInput ? validateEmail(true) : validatePassword(true)));
      field.addEventListener('input', () => {
        if (field.classList.contains('is-invalid')) {
          (field === emailInput ? validateEmail : validatePassword)(true);
        }
        clearFeedback();
      });
    }

    toggle.addEventListener('click', () => {
      const reveal = passwordInput.type === 'password';
      passwordInput.type = reveal ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', String(reveal));
      toggle.setAttribute('aria-label', reveal ? 'Hide password' : 'Show password');
      toggle.querySelector('i').className = reveal ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
      passwordInput.focus({ preventScroll: true });
    });

    document.getElementById('googleButton').addEventListener('click', () => {
      if (!GOOGLE_OAUTH_URL) {
        showFeedback('Google sign-in requires a connected OAuth provider. No sign-in was attempted.');
        return;
      }
      const destination = new URL(GOOGLE_OAUTH_URL, window.location.href);
      if (destination.protocol !== 'https:' && destination.hostname !== 'localhost') {
        showFeedback('Google sign-in must use a secure HTTPS connection.', 'error');
        return;
      }
      window.location.assign(destination.href);
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const validEmail = validateEmail(true);
      const validPassword = validatePassword(true);
      if (!validEmail || !validPassword) {
        (validEmail ? passwordInput : emailInput).focus();
        showFeedback('Please fix the highlighted fields to continue.', 'error');
        return;
      }
      if (!AUTH_ENDPOINT) {
        showFeedback('Demo form: no authentication service is configured. Your credentials have not been sent or stored.');
        return;
      }

      const endpoint = new URL(AUTH_ENDPOINT, window.location.href);
      if (endpoint.protocol !== 'https:' && endpoint.hostname !== 'localhost') {
        showFeedback('Please configure a secure HTTPS authentication endpoint.', 'error');
        return;
      }

      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
      const oldContent = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i><span>Signing In...</span>';
      clearFeedback();
      try {
        const response = await fetch(endpoint.href, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            email: emailInput.value.trim(),
            password: passwordInput.value,
            rememberMe: rememberInput.checked
          })
        });
        if (!response.ok) {
          showFeedback('Sign-in failed. Check your credentials and try again.', 'error');
          return;
        }
        passwordInput.value = '';
        const result = await response.json().catch(() => ({}));
        showFeedback('Signed in successfully. Redirecting...', 'success');
        const redirect = typeof result.redirect === 'string' ? result.redirect : SUCCESS_REDIRECT;
        const parsed = new URL(redirect, window.location.href);
        // Only allow same-origin destinations supplied by the authentication service.
        if (parsed.origin === window.location.origin && ['http:', 'https:', 'file:'].includes(parsed.protocol)) {
          window.location.assign(parsed.href);
        }
      } catch (_) {
        showFeedback('Unable to connect to the sign-in service. Please try again.', 'error');
      } finally {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
        submitButton.innerHTML = oldContent;
      }
    });

    // Match the Desktop Figma's focused email field, without opening a keyboard on mobile.
    if (window.matchMedia('(min-width: 1200px)').matches) {
      emailInput.focus({ preventScroll: true });
    }
  