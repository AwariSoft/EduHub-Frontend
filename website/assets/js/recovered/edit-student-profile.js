
    'use strict';
    /* ==========================================================
       06. EDIT FORM INTERACTIVITY
       - Local file preview only; validates JPG/PNG <= 2 MB
       - Client-side validation with accessible field errors
       - Supports optional API adapter: EduHubProfileAPI.update(payload)
       - With no adapter, clearly reports demo-only behavior
       ========================================================== */
    const form = document.getElementById('editProfileForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const biography = document.getElementById('biography');
    const interests = document.getElementById('learningInterests');
    const avatar = document.getElementById('profileAvatar');
    const photoInput = document.getElementById('photoInput');
    const saveButton = document.getElementById('saveButton');
    const feedback = document.getElementById('formFeedback');
    const initialValues = {fullName: fullName.value, email: email.value, biography: biography.value, interests: interests.value};
    let selectedPhoto = null;
    let photoPreviewUrl = null;
    let photoRemoved = false;
    let savedPhotoFile = null;

    function notify(message) {
      document.getElementById('toastMessage').textContent = message;
      const el = document.getElementById('feedbackToast');
      if (window.bootstrap && bootstrap.Toast) bootstrap.Toast.getOrCreateInstance(el).show();
      else window.alert(message);
    }
    function announce(message, type) {
      feedback.textContent = message;
      feedback.className = 'ed-feedback alert ' + (type === 'success' ? 'alert-success' : type === 'error' ? 'alert-danger' : 'alert-info');
      feedback.hidden = false;
    }
    function clearFeedback() { feedback.hidden = true; feedback.textContent = ''; }
    function setError(field, message) {
      const target = document.getElementById(field.id + 'Error');
      field.classList.toggle('is-invalid', !!message);
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (target) { target.textContent = message; target.hidden = !message; }
      return !message;
    }
    function validateField(field) {
      if (field === fullName) {
        const value = field.value.trim();
        return setError(field, !value ? 'Full Name is required.' : value.length < 2 ? 'Please enter at least 2 characters.' : '');
      }
      if (field === email) {
        const value = field.value.trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        return setError(field, !value ? 'Email Address is required.' : !valid ? 'Please enter a valid email address.' : '');
      }
      if (field === biography) return setError(field, field.value.length > 300 ? 'Biography must be 300 characters or fewer.' : '');
      return true;
    }
    function isDirty() {
      return fullName.value !== initialValues.fullName || email.value !== initialValues.email || biography.value !== initialValues.biography || interests.value !== initialValues.interests || !!selectedPhoto || photoRemoved;
    }
    [fullName, email, biography].forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => { if (field.classList.contains('is-invalid')) validateField(field); clearFeedback(); });
    });
    interests.addEventListener('input', clearFeedback);

    function initialsFor(name) {
      const words = name.trim().split(/\s+/).filter(Boolean);
      return words.length ? words.slice(0,2).map(word => word[0].toUpperCase()).join('') : 'WM';
    }
    function resetPhotoPreview() {
      if (photoPreviewUrl) { URL.revokeObjectURL(photoPreviewUrl); photoPreviewUrl = null; }
      avatar.replaceChildren(document.createTextNode(initialsFor(fullName.value)));
      selectedPhoto = null;
    }
    fullName.addEventListener('input', () => { if (!selectedPhoto && !savedPhotoFile) avatar.textContent = initialsFor(fullName.value); });
    document.getElementById('changePhoto').addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', () => {
      const file = photoInput.files && photoInput.files[0];
      if (!file) return;
      if (!['image/jpeg','image/png'].includes(file.type)) { notify('Please select a JPG or PNG image.'); photoInput.value = ''; return; }
      if (file.size > 2 * 1024 * 1024) { notify('The profile picture must be 2 MB or smaller.'); photoInput.value = ''; return; }
      if (!file.size) { notify('The selected image file is empty.'); photoInput.value = ''; return; }
      resetPhotoPreview();
      selectedPhoto = file;
      photoRemoved = false;
      photoPreviewUrl = URL.createObjectURL(file);
      const img = document.createElement('img');
      img.src = photoPreviewUrl;
      img.alt = 'New profile photo preview';
      img.addEventListener('error', () => { resetPhotoPreview(); notify('This image could not be opened. Please choose another JPG or PNG.'); });
      avatar.replaceChildren(img);
      clearFeedback();
    });
    document.getElementById('removePhoto').addEventListener('click', () => {
      const hadPhoto = !!selectedPhoto || !!savedPhotoFile;
      resetPhotoPreview();
      photoInput.value = '';
      photoRemoved = hadPhoto;
      clearFeedback();
      if (!hadPhoto) notify('No profile photo is set; your initials are displayed instead.');
      else notify('Photo removed from the preview. Use Save Changes to submit the update.');
    });

    // Optional integration contract: return a Promise from update({fullName,email,biography,interests,photo,removePhoto}).
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearFeedback();
      const valid = [fullName, email, biography].map(validateField).every(Boolean);
      if (!valid) {
        announce('Please correct the highlighted fields before saving.', 'error');
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      const payload = {
        fullName: fullName.value.trim(),
        email: email.value.trim(),
        biography: biography.value.trim(),
        interests: interests.value.split(',').map(item => item.trim()).filter(Boolean),
        photo: selectedPhoto,
        removePhoto: photoRemoved
      };
      if (!window.EduHubProfileAPI || typeof window.EduHubProfileAPI.update !== 'function') {
        announce('Your changes have been validated. This is a frontend demo: no profile changes or photos were saved to a server.', 'info');
        return;
      }
      saveButton.disabled = true;
      saveButton.textContent = 'Saving…';
      try {
        await window.EduHubProfileAPI.update(payload);
        Object.assign(initialValues, {fullName: fullName.value, email: email.value, biography: biography.value, interests: interests.value});
        savedPhotoFile = selectedPhoto;
        photoRemoved = false;
        selectedPhoto = null;
        announce('Profile updated successfully.', 'success');
      } catch (error) {
        announce('We could not save your changes. Please try again.', 'error');
      } finally {
        saveButton.disabled = false;
        saveButton.textContent = 'Save Changes';
      }
    });

    // Cancel: navigate to the existing Student Profile, confirming if fields are dirty.
    const profileUrl = 'student-profile.html';
    function openCancelConfirmation() {
      if (!isDirty()) { window.location.href = profileUrl; return; }
      if (window.bootstrap && bootstrap.Modal) bootstrap.Modal.getOrCreateInstance(document.getElementById('discardModal')).show();
      else if (window.confirm('Discard your changes?')) window.location.href = profileUrl;
    }
    document.getElementById('cancelButton').addEventListener('click', openCancelConfirmation);
    document.getElementById('confirmDiscard').addEventListener('click', () => { window.location.href = profileUrl; });

    // Client-only placeholders for unfinished routes; real completed routes navigate normally.
    document.addEventListener('click', event => {
      const pendingLink = event.target.closest('a[data-pending]');
      if (pendingLink) { event.preventDefault(); notify(pendingLink.dataset.pending + ' will be available when its screen is implemented.'); return; }
      const demo = event.target.closest('[data-demo-action="logout"]');
      if (demo) { event.preventDefault(); notify('Connect the authentication backend to enable Log Out.'); }
    });
    document.getElementById('courseSearchForm').addEventListener('submit', event => {
      event.preventDefault();
      const query = document.getElementById('courseSearch').value.trim();
      if (!query) { document.getElementById('courseSearch').focus(); return; }
      window.location.href = '../public/explore-courses.html?q=' + encodeURIComponent(query);
    });
    window.addEventListener('pagehide', () => { if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl); });
  