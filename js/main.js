/* sono · main.js
   Handles: scroll reveal, capability tabs
   No legal/modal logic lives here. */

(function () {
  'use strict';

  // ── Scroll reveal ──────────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  }

  // ── Capability tabs ────────────────────────────────────────────
  const tabs = document.querySelectorAll('.cap-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = tab.dataset.tab;
      document.querySelectorAll('.cap-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.cap-panel').forEach(p => {
        p.classList.remove('active');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      document.querySelector(`.cap-panel[data-panel="${idx}"]`).classList.add('active');
    });
  });

  // ── Footer year ────────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();