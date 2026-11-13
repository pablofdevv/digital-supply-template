/**
 * i18n-patch.js
 * Sincroniza los textos del hero y la marca con template-config.js,
 * y registra el Service Worker para habilitar el modo PWA.
 *
 * Carga después de i18n (compilado en _astro/) y de template-config.js.
 */
(function () {
  'use strict';

  // ── Registro del Service Worker (PWA) ──────────────────────────────────────
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

  // ── Parche de textos dinámicos con template-config ─────────────────────────
  function applyConfigTexts() {
    const cfg = window.TEMPLATE_CONFIG;
    if (!cfg) return;

    // Marca en header/logo
    document.querySelectorAll('[data-editable="brand-name"]').forEach((el) => {
      el.textContent = cfg.brand?.name ?? el.textContent;
    });

    // Hero
    const heroTitle = document.querySelector('[data-editable="hero-title"]');
    if (heroTitle) heroTitle.textContent = cfg.hero?.title ?? heroTitle.textContent;

    const heroSub = document.querySelector('[data-editable="hero-subtitle"]');
    if (heroSub) heroSub.innerHTML = cfg.hero?.subtitle ?? heroSub.innerHTML;

    const heroDesc = document.querySelector('[data-editable="hero-description"]');
    if (heroDesc) heroDesc.textContent = cfg.hero?.description ?? heroDesc.textContent;

    // Catálogo
    const catTitle = document.querySelector('[data-editable="catalog-title"]');
    if (catTitle) catTitle.textContent = cfg.catalog?.title ?? catTitle.textContent;

    const catSearch = document.querySelector('[data-editable="catalog-search-placeholder"]');
    if (catSearch) catSearch.placeholder = cfg.catalog?.searchPlaceholder ?? catSearch.placeholder;

    // Footer
    const footerCopy = document.querySelector('[data-editable="footer-copyright"]');
    if (footerCopy) footerCopy.textContent = cfg.footer?.copyright ?? footerCopy.textContent;

    // Trust badge
    const trust = document.querySelector('[data-editable="trust-badge"]');
    if (trust) trust.innerHTML = cfg.brand?.trustBadge ?? trust.innerHTML;

    // Subtag
    document.querySelectorAll('[data-editable="brand-subtag"]').forEach((el) => {
      el.textContent = cfg.brand?.subtag ?? el.textContent;
    });
  }

  // Aplica al cargar y de nuevo cuando cambia el idioma
  document.addEventListener('DOMContentLoaded', applyConfigTexts);
  document.addEventListener('krystal:lang', applyConfigTexts);
})();
