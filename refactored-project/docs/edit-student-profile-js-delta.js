/* ZIP #13 — Edit Student Profile; append once to assets/js/main.js */
(() => {
  const form = document.getElementById('eduStudentProfileForm');
  if (!form || form.dataset.eduProfileInitialized === 'true') return;
  form.dataset.eduProfileInitialized = 'true';
  const photo = document.getElementById('eduProfilePhoto');
  const change = document.getElementById('eduProfileChangePhoto');
  const remove = document.getElementById('eduProfileRemovePhoto');
  const preview = document.getElementById('eduProfileImage');
  const initials = document.getElementById('eduProfileInitials');
  const error = document.getElementById('eduProfilePhotoError');
  const bio = document.getElementById('eduProfileBiography');
  const count = document.getElementById('eduProfileBioCount');
  const status = document.getElementById('eduProfileStatus');
  const name = document.getElementById('eduProfileFullName');
  let photoUrl = null;
  let selectedPhoto = null;
  let photoRemoved = false;
  const updateCount = () => { count.textContent = `${bio.value.length} / 300`; };
  const showError = message => { error.textContent = message; error.hidden = !message; };
  const clearPreview = () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    photoUrl = null;
    preview.removeAttribute('src');
    preview.hidden = true;
    initials.hidden = false;
    photo.value = '';
    selectedPhoto = null;
  };
  change.addEventListener('click', () => photo.click());
  photo.addEventListener('change', () => {
    const file = photo.files && photo.files[0];
    if (!file) return;
    if (!['image/jpeg','image/png'].includes(file.type) || file.size > 2 * 1024 * 1024) {
      clearPreview();
      showError('Choose a JPG or PNG image no larger than 2 MB.');
      return;
    }
    clearPreview();
    selectedPhoto = file;
    photoRemoved = false;
    photoUrl = URL.createObjectURL(file);
    preview.src = photoUrl;
    preview.hidden = false;
    initials.hidden = true;
    showError('');
  });
  remove.addEventListener('click', () => {
    clearPreview();
    photoRemoved = true;
    showError('');
    status.textContent = 'Profile photo removal is ready to be saved.';
  });
  bio.addEventListener('input', updateCount);
  updateCount();
  name.addEventListener('input', () => {
    const parts = name.value.trim().split(/\s+/).filter(Boolean);
    initials.textContent = (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] || 'WM').slice(0, 2)).toUpperCase();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.classList.add('was-validated');
    if (!form.checkValidity()) { form.querySelector(':invalid')?.focus(); return; }
    const payload = {fullName:name.value.trim(),email:document.getElementById('eduProfileEmail').value.trim(),biography:bio.value,interests:document.getElementById('eduProfileInterests').value.split(',').map(x=>x.trim()).filter(Boolean),photo:selectedPhoto,removePhoto:photoRemoved};
    form.dispatchEvent(new CustomEvent('eduhub:student-profile-save-requested',{bubbles:true,detail:payload}));
    status.textContent = 'Profile validated; waiting for backend save integration.';
    if (window.bootstrap?.Modal) window.bootstrap.Modal.getOrCreateInstance(document.getElementById('eduProfileSavedModal')).show();
  });
  document.getElementById('eduStudentLogoutConfirm')?.addEventListener('click', () => document.dispatchEvent(new CustomEvent('eduhub:logout-requested',{detail:{role:'student'}})));
  window.addEventListener('pagehide', () => { if (photoUrl) URL.revokeObjectURL(photoUrl); }, {once:true});
})();
