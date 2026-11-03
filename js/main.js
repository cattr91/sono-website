/* sono · main.js
   Shared by index.html, portfolio-management.html and portfolio-expansion.html.
   Handles: scroll reveal, footer year, mobile menu, contact form preselect.
   No legal/modal logic lives here (see legal.js). */

(function () {
  'use strict';

  // ── Scroll reveal ──────────────────────────────────────────────
  function revealAll() {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => io.observe(el));
      // Opening the files straight from disk: make sure nothing stays hidden
      if (window.location.protocol === 'file:') setTimeout(revealAll, 300);
    } else {
      revealAll();
    }
  }

  // ── Footer year ────────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Mobile menu ────────────────────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  // ── Contact form: preselect interest from ?interest=alarms|sites|both|other
  const interest = document.getElementById('interest');
  if (interest) {
    const wanted = new URLSearchParams(window.location.search).get('interest');
    if (wanted && interest.querySelector('option[value="' + wanted + '"]')) interest.value = wanted;
  }

})();
