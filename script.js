(() => {
  'use strict';

  /* ===== Theme toggle ===== */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ===== Mobile nav ===== */
  const nav = document.querySelector('.nav');
  const navToggle = document.getElementById('nav-toggle');
  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    })
  );

  /* ===== Reveal on scroll ===== */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ===== Year ===== */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ===== Copy email ===== */
  const copyBtn = document.getElementById('copy-email');
  const note = document.getElementById('copy-note');
  copyBtn?.addEventListener('click', async () => {
    const email = copyBtn.dataset.email || '';
    try {
      await navigator.clipboard.writeText(email);
      if (note) note.textContent = 'Email copied to clipboard.';
    } catch {
      if (note) note.textContent = 'Could not copy — please copy manually: ' + email;
    }
    setTimeout(() => { if (note) note.textContent = ''; }, 2400);
  });

  /* ===== Matrix rain background (respect reduced motion) ===== */
  const canvas = document.getElementById('bg-canvas');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let w, h, dpr, cols, drops, dirs, raf;
    const CHARS = '01アイウエオカキクケコサシスセソ$#@%&*<>[]{}';
    const FONT = 14;
    let fontSize;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = FONT;
      cols = Math.floor(w / fontSize);
      dirs = Array.from({ length: cols }, () => (Math.random() > 0.35 ? 1 : -1));
      drops = Array.from({ length: cols }, (_, i) =>
        dirs[i] === 1 ? Math.random() * -40 : (h / fontSize) + Math.random() * 40);
    }
    function tick() {
      ctx.fillStyle = 'rgba(5, 10, 8, 0.12)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = fontSize + 'px "JetBrains Mono", monospace';
      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const bright = Math.random() > 0.92;
        ctx.fillStyle = bright ? 'rgba(214,255,233,0.9)' : 'rgba(0,255,136,0.55)';
        ctx.fillText(ch, x, y);
        if (dirs[i] === 1) {
          if (y > h && Math.random() > 0.975) drops[i] = Math.random() * -40;
        } else {
          if (y < 0 && Math.random() > 0.975) drops[i] = (h / fontSize) + Math.random() * 40;
        }
        drops[i] += dirs[i];
      }
      raf = requestAnimationFrame(tick);
    }
    resize(); tick();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else tick();
    });
  }
})();
