'use strict';
    (() => {
      const $ = selector => document.querySelector(selector);
      const certificate = $('#certificateDialog');
      const mobileMenu = $('#mobileMenu');
      function closeDialog(dialog){ if(dialog.open) dialog.close(); }
      function announce(text){ $('#announcement').textContent = text; }
      $('#viewCertificate').addEventListener('click', () => certificate.showModal());
      $('#closeCertificateDialog').addEventListener('click', () => closeDialog(certificate));
      $('#dismissCertificateDialog').addEventListener('click', () => closeDialog(certificate));
      $('#menuToggle').addEventListener('click', () => {mobileMenu.showModal(); $('#menuToggle').setAttribute('aria-expanded','true');});
      $('#closeMobileMenu').addEventListener('click', () => closeDialog(mobileMenu));
      mobileMenu.addEventListener('close',()=>$('#menuToggle').setAttribute('aria-expanded','false'));
      for(const dialog of [certificate,mobileMenu]) dialog.addEventListener('click',event => {if(event.target === dialog) closeDialog(dialog);});
      $('#accountToggle').addEventListener('click', () => {
        const menu = $('#accountMenu'); menu.hidden = !menu.hidden;
        $('#accountToggle').setAttribute('aria-expanded', String(!menu.hidden));
      });
      document.addEventListener('click', event => {
        if(!event.target.closest('.account-area')){
          $('#accountMenu').hidden = true;
          $('#accountToggle').setAttribute('aria-expanded','false');
        }
      });
      document.addEventListener('keydown',event => {
        if(event.key === 'Escape'){
          $('#accountMenu').hidden = true;
          $('#accountToggle').setAttribute('aria-expanded','false');
        }
      });
      ['desktopSearch','mobileSearch'].forEach(id => {
        $('#'+id).addEventListener('submit',event => {
          event.preventDefault();
          const query = new FormData(event.currentTarget).get('search')?.toString().trim() || '';
          if(query) window.location.href = '../public/explore-courses.html?search=' + encodeURIComponent(query);
          else announce('Enter a course name to search.');
        });
      });
      $('#notificationButton').addEventListener('click', () => {
        window.location.href = '../student/notifications.html';
      });
    })();
