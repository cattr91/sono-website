/* sono · legal.js
   Handles: fetching legal/modals.html, injecting it into the DOM,
   wiring up open/close for all legal modals, intercepting footer links.
   Falls back gracefully to full-page navigation if fetch fails or JS is off. */

(function () {
  'use strict';

  const MODALS_PATH = 'legal/modals.html';

  // Map footer link IDs → modal IDs
  const LINK_MAP = {
    'link-impressum':    'modal-impressum',
    'link-datenschutz':  'modal-datenschutz',
    'link-terms':        'modal-terms',
  };

  // ── Inject modal markup ────────────────────────────────────────
  function injectModals(html) {
    const container = document.getElementById('legal-modals');
    if (!container) return;
    container.innerHTML = html;
    wireModals();
  }

  // ── Open / close helpers ───────────────────────────────────────
  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus the close button for accessibility
    const closeBtn = el.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }

  // ── Wire everything once modals are in the DOM ─────────────────
  function wireModals() {

    // Close buttons inside modals
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) closeModal(modal.id);
      });
    });

    // Backdrop click
    document.querySelectorAll('.modal-overlay').forEach(m => {
      m.addEventListener('click', e => {
        if (e.target === m) closeModal(m.id);
      });
    });

    // Keyboard: Escape closes, Tab traps focus inside modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeAllModals();
        return;
      }
      // Focus trap
      const openModal = document.querySelector('.modal-overlay.open');
      if (!openModal || e.key !== 'Tab') return;
      const focusable = openModal.querySelectorAll(
        'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // In-modal anchor links (table of contents)
    document.querySelectorAll('.legal-content a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Intercept footer links → open modal instead of navigating
    Object.entries(LINK_MAP).forEach(([linkId, modalId]) => {
      const link = document.getElementById(linkId);
      if (!link) return;
      link.addEventListener('click', e => {
        e.preventDefault();
        openModal(modalId);
      });
    });
  }

  // ── Boot: fetch modals.html and inject ─────────────────────────
  fetch(MODALS_PATH)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch ${MODALS_PATH}: ${res.status}`);
      return res.text();
    })
    .then(html => injectModals(html))
    .catch(err => {
      // Fail silently — footer links remain as plain <a> tags pointing
      // to the standalone legal pages, so everything still works.
      console.warn('sono legal.js: could not load modal markup.', err.message);
    });

})();