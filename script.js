/* ==========================================================================
   PLANTILLA WEB MINIMALISTA — SCRIPT INTERACTIVO
   - Cambio de Modo Claro / Oscuro con persistencia en localStorage
   - Selector de Idioma EN / ES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Selector de Modo Claro / Oscuro
  const themeBtn = document.getElementById('theme-toggle-btn');
  const htmlEl = document.documentElement;

  // Cargar preferencia guardada o respetar la de por defecto
  const savedTheme = localStorage.getItem('ks_template_theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', nextTheme);
      localStorage.setItem('ks_template_theme', nextTheme);
    });
  }

  // 2. Selector de Idioma (EN / ES)
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 3. Navegación en Píldora Activa
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
});
