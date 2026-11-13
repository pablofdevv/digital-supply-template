/**
 * ==============================================================================
 * 🛠️ MOTOR DEL EDITOR VISUAL EN VIVO & GUÍA DE PERSONALIZACIÓN
 * Incluye personalización de Landing, Marca, Botones, Footer Y CATÁLOGO COMPLETO
 * ==============================================================================
 */

(function () {
  let config = window.TEMPLATE_CONFIG || {};
  try {
    const saved = localStorage.getItem('tpl_custom_config');
    if (saved) {
      config = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error cargando configuración guardada:', e);
  }

  // Elementos DOM objetivo
  function getElements() {
    return {
      heroTitle: document.querySelector('.ks-landing-title'),
      heroSubtitle: document.querySelector('.ks-landing-subtitle'),
      heroDesc: document.querySelector('.ks-landing-desc'),
      btnPrimary: document.querySelector('.ks-landing-btn--primary'),
      btnPrimarySpan: document.querySelector('.ks-landing-btn--primary span'),
      btnSecondary: document.querySelector('.ks-landing-btn--secondary'),
      btnSecondarySpan: document.querySelector('.ks-landing-btn--secondary span'),
      logoTitle: document.querySelector('.logo-title'),
      logoSubtag: document.querySelector('.logo-subtag'),
      trustBadge: document.querySelector('.trust-text'),
      footerCopy: document.querySelector('.ks-min-footer-copy'),
      // Catálogo
      catalogTitle: document.querySelector('.catalog-header-text h2'),
      catalogSearch: document.querySelector('#product-search'),
      filterLabels: document.querySelectorAll('#ks-filter-cats .ks-check-label')
    };
  }

  // Aplicar configuración a los elementos de la web
  function applyConfig() {
    const els = getElements();
    if (els.heroTitle && config.hero?.title) els.heroTitle.textContent = config.hero.title;
    if (els.heroSubtitle && config.hero?.subtitle) els.heroSubtitle.innerHTML = config.hero.subtitle;
    if (els.heroDesc && config.hero?.description) els.heroDesc.textContent = config.hero.description;

    if (els.btnPrimary && config.buttons?.primary) {
      if (els.btnPrimarySpan) els.btnPrimarySpan.textContent = config.buttons.primary.text;
      els.btnPrimary.setAttribute('href', config.buttons.primary.link || '#');
    }

    if (els.btnSecondary && config.buttons?.secondary) {
      if (els.btnSecondarySpan) els.btnSecondarySpan.textContent = config.buttons.secondary.text;
      els.btnSecondary.setAttribute('href', config.buttons.secondary.link || '#');
    }

    if (els.logoTitle && config.brand?.name) els.logoTitle.textContent = config.brand.name;
    if (els.logoSubtag && config.brand?.subtag) els.logoSubtag.textContent = config.brand.subtag;
    if (els.trustBadge && config.brand?.trustBadge) els.trustBadge.innerHTML = config.brand.trustBadge;
    if (els.footerCopy && config.footer?.copyright) els.footerCopy.textContent = config.footer.copyright;

    // Catálogo
    if (els.catalogTitle && config.catalog?.title) els.catalogTitle.textContent = config.catalog.title;
    if (els.catalogSearch && config.catalog?.searchPlaceholder) els.catalogSearch.placeholder = config.catalog.searchPlaceholder;

    if (els.filterLabels && config.catalog?.categories) {
      els.filterLabels.forEach((label, idx) => {
        if (config.catalog.categories[idx]?.label) {
          label.textContent = config.catalog.categories[idx].label;
        }
      });
    }

    // Etiquetar para edición in situ
    if (els.heroTitle) els.heroTitle.setAttribute('data-editable', 'hero.title');
    if (els.heroSubtitle) els.heroSubtitle.setAttribute('data-editable', 'hero.subtitle');
    if (els.heroDesc) els.heroDesc.setAttribute('data-editable', 'hero.description');
    if (els.logoTitle) els.logoTitle.setAttribute('data-editable', 'brand.name');
    if (els.footerCopy) els.footerCopy.setAttribute('data-editable', 'footer.copyright');
    if (els.catalogTitle) els.catalogTitle.setAttribute('data-editable', 'catalog.title');
    if (els.filterLabels) {
      els.filterLabels.forEach((label, idx) => {
        label.setAttribute('data-editable', `catalog.category.${idx}`);
      });
    }
  }

  // Inyectar Drawer y UI del Editor
  function buildEditorUI() {
    if (document.querySelector('.tpl-edit-trigger')) return;

    // 1. Botón Flotante
    const trigger = document.createElement('button');
    trigger.className = 'tpl-edit-trigger';
    trigger.type = 'button';
    trigger.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
      <span>⚙️ Dónde y Cómo Editar Cada Cosa</span>
    `;
    document.body.appendChild(trigger);

    // 2. Overlay
    const overlay = document.createElement('div');
    overlay.className = 'tpl-drawer-overlay';
    document.body.appendChild(overlay);

    // 3. Drawer
    const drawer = document.createElement('aside');
    drawer.className = 'tpl-drawer';
    drawer.innerHTML = `
      <div class="tpl-drawer-header">
        <div class="tpl-drawer-title">
          <span>⚙️</span>
          <span>Guía de Edición de la Plantilla</span>
        </div>
        <button type="button" class="tpl-close-btn" aria-label="Cerrar">&times;</button>
      </div>

      <div class="tpl-drawer-body">
        
        <!-- Banner de Ayuda Rápida -->
        <div style="background: rgba(0, 102, 204, 0.08); border: 1px solid rgba(0, 102, 204, 0.2); padding: 12px 14px; border-radius: 10px; font-size: 12px; line-height: 1.5;">
          <strong>💡 ¿Dónde cambiar cada cosa?</strong><br>
          Puedes editar los campos de abajo y ver los cambios en directo, activar el modo en pantalla para escribir directamente, o abrir el archivo <code>template-config.js</code>.
        </div>

        <!-- Modo Edición en Pantalla -->
        <div class="tpl-switch-box">
          <div>
            <div style="font-weight:700; font-size:13px;">✏️ Edición Directa en Pantalla</div>
            <div style="font-size:11px; opacity:0.75;">Haz clic sobre cualquier texto o categoría para escribir en él</div>
          </div>
          <input type="checkbox" id="tpl-toggle-inline" style="width:18px; height:18px; cursor:pointer;">
        </div>

        <!-- Sección 1: Marca -->
        <div class="tpl-section">
          <div class="tpl-section-title">1. Marca y Logotipo (Cabecera)</div>
          <div style="font-size:11px; color:#71717a; margin-bottom:4px;">📍 En <code>template-config.js</code> (línea 14): <code>brand.name</code></div>
          <div class="tpl-field">
            <label class="tpl-label">Nombre de tu Marca o Tienda</label>
            <input type="text" class="tpl-input" id="inp-brand-name" value="${config.brand?.name || 'TU MARCA AQUÍ'}">
          </div>
          <div class="tpl-field">
            <label class="tpl-label">Subtag de la Marca (ej. 2026)</label>
            <input type="text" class="tpl-input" id="inp-brand-subtag" value="${config.brand?.subtag || 'TIENDA OFICIAL · 2026'}">
          </div>
        </div>

        <!-- Sección 2: Hero Central -->
        <div class="tpl-section">
          <div class="tpl-section-title">2. Zona Central (Landing)</div>
          <div style="font-size:11px; color:#71717a; margin-bottom:4px;">📍 En <code>template-config.js</code> (línea 38): <code>hero.title</code></div>
          <div class="tpl-field">
            <label class="tpl-label">Título Principal (Centrado)</label>
            <input type="text" class="tpl-input" id="inp-hero-title" value="${config.hero?.title || 'TU MARCA AQUÍ'}">
          </div>
          <div class="tpl-field">
            <label class="tpl-label">Subtítulo y Especialidad</label>
            <textarea class="tpl-textarea" id="inp-hero-subtitle">${config.hero?.subtitle || ''}</textarea>
          </div>
          <div class="tpl-field">
            <label class="tpl-label">Descripción / Propuesta de Valor</label>
            <textarea class="tpl-textarea" id="inp-hero-desc">${config.hero?.description || ''}</textarea>
          </div>
        </div>

        <!-- Sección 3: Botones de Acción -->
        <div class="tpl-section">
          <div class="tpl-section-title">3. Botones de Acción</div>
          <div style="font-size:11px; color:#71717a; margin-bottom:4px;">📍 En <code>template-config.js</code> (línea 52): <code>buttons.primary</code> y <code>buttons.secondary</code></div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <div class="tpl-field">
              <label class="tpl-label">Texto Botón 1 (Blanco)</label>
              <input type="text" class="tpl-input" id="inp-btn1-text" value="${config.buttons?.primary?.text || 'Ver catálogo'}">
            </div>
            <div class="tpl-field">
              <label class="tpl-label">Enlace Botón 1</label>
              <input type="text" class="tpl-input" id="inp-btn1-link" value="${config.buttons?.primary?.link || '/catalogo'}">
            </div>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <div class="tpl-field">
              <label class="tpl-label">Texto Botón 2 (Oscuro)</label>
              <input type="text" class="tpl-input" id="inp-btn2-text" value="${config.buttons?.secondary?.text || 'Novedades'}">
            </div>
            <div class="tpl-field">
              <label class="tpl-label">Enlace Botón 2</label>
              <input type="text" class="tpl-input" id="inp-btn2-link" value="${config.buttons?.secondary?.link || '/novedades'}">
            </div>
          </div>
        </div>

        <!-- Sección 4: Catálogo y Productos -->
        <div class="tpl-section">
          <div class="tpl-section-title">4. Catálogo, Buscador & Filtros</div>
          <div style="font-size:11px; color:#71717a; margin-bottom:4px;">📍 En <code>template-config.js</code> (línea 66): <code>catalog.title</code></div>
          <div class="tpl-field">
            <label class="tpl-label">Título del Catálogo</label>
            <input type="text" class="tpl-input" id="inp-catalog-title" value="${config.catalog?.title || 'Elige tu próximo acceso o producto.'}">
          </div>
          <div class="tpl-field">
            <label class="tpl-label">Placeholder del Buscador</label>
            <input type="text" class="tpl-input" id="inp-catalog-search" value="${config.catalog?.searchPlaceholder || 'Buscar en el catálogo...'}">
          </div>
          
          <label class="tpl-label" style="margin-top:6px;">Categorías de Filtros:</label>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <input type="text" class="tpl-input inp-cat" data-cat-idx="0" value="${config.catalog?.categories?.[0]?.label || 'Inteligencia Artificial'}">
            <input type="text" class="tpl-input inp-cat" data-cat-idx="1" value="${config.catalog?.categories?.[1]?.label || 'Gaming & Cuentas'}">
            <input type="text" class="tpl-input inp-cat" data-cat-idx="2" value="${config.catalog?.categories?.[2]?.label || 'Streaming & Música'}">
            <input type="text" class="tpl-input inp-cat" data-cat-idx="3" value="${config.catalog?.categories?.[3]?.label || 'VPN & Privacidad'}">
            <input type="text" class="tpl-input inp-cat" data-cat-idx="4" value="${config.catalog?.categories?.[4]?.label || 'Software & Diseño'}">
          </div>
          <div style="font-size:11px; color:#a1a1aa; line-height:1.4; margin-top:4px;">
            📦 <em>Para añadir, eliminar o cambiar productos con sus precios e imágenes, edita el archivo <code>products_metadata.json</code>.</em>
          </div>
        </div>

        <!-- Sección 5: Footer -->
        <div class="tpl-section">
          <div class="tpl-section-title">5. Pie de Página & Derechos</div>
          <div style="font-size:11px; color:#71717a; margin-bottom:4px;">📍 En <code>template-config.js</code> (línea 102): <code>footer.copyright</code></div>
          <div class="tpl-field">
            <label class="tpl-label">Texto de Copyright</label>
            <input type="text" class="tpl-input" id="inp-footer-copy" value="${config.footer?.copyright || '© 2026 Tu Marca Aquí. Todos los derechos reservados.'}">
          </div>
        </div>

      </div>

      <div class="tpl-drawer-footer">
        <button type="button" class="tpl-btn-action tpl-btn-primary" id="tpl-btn-save">
          <span>💾 Guardar Cambios en este Navegador</span>
        </button>
        <button type="button" class="tpl-btn-action tpl-btn-secondary" id="tpl-btn-download">
          <span>📥 Descargar mi template-config.js Editado</span>
        </button>
        <button type="button" class="tpl-btn-action tpl-btn-secondary" id="tpl-btn-reset" style="color:#ef4444; border-color:rgba(239,68,68,0.3);">
          <span>↺ Restaurar Textos por Defecto</span>
        </button>
      </div>
    `;
    document.body.appendChild(drawer);

    // Eventos del Drawer
    function openDrawer() {
      drawer.classList.add('active');
      overlay.classList.add('active');
    }
    function closeDrawer() {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
    }

    trigger.addEventListener('click', openDrawer);
    overlay.addEventListener('click', closeDrawer);
    drawer.querySelector('.tpl-close-btn').addEventListener('click', closeDrawer);

    // Actualizaciones en tiempo real al escribir en los inputs
    function syncLive() {
      config.brand = config.brand || {};
      config.hero = config.hero || {};
      config.buttons = config.buttons || { primary: {}, secondary: {} };
      config.catalog = config.catalog || { categories: [] };
      config.footer = config.footer || {};

      config.brand.name = document.getElementById('inp-brand-name').value;
      config.brand.subtag = document.getElementById('inp-brand-subtag').value;
      config.hero.title = document.getElementById('inp-hero-title').value;
      config.hero.subtitle = document.getElementById('inp-hero-subtitle').value;
      config.hero.description = document.getElementById('inp-hero-desc').value;
      config.buttons.primary.text = document.getElementById('inp-btn1-text').value;
      config.buttons.primary.link = document.getElementById('inp-btn1-link').value;
      config.buttons.secondary.text = document.getElementById('inp-btn2-text').value;
      config.buttons.secondary.link = document.getElementById('inp-btn2-link').value;
      
      // Catálogo
      config.catalog.title = document.getElementById('inp-catalog-title').value;
      config.catalog.searchPlaceholder = document.getElementById('inp-catalog-search').value;
      
      const catInputs = drawer.querySelectorAll('.inp-cat');
      config.catalog.categories = config.catalog.categories || [];
      catInputs.forEach((catInp, idx) => {
        config.catalog.categories[idx] = config.catalog.categories[idx] || {};
        config.catalog.categories[idx].label = catInp.value;
      });

      config.footer.copyright = document.getElementById('inp-footer-copy').value;

      applyConfig();
    }

    const inputs = drawer.querySelectorAll('.tpl-input, .tpl-textarea');
    inputs.forEach(inp => inp.addEventListener('input', syncLive));

    // Guardar cambios
    document.getElementById('tpl-btn-save').addEventListener('click', () => {
      syncLive();
      localStorage.setItem('tpl_custom_config', JSON.stringify(config, null, 2));
      const btn = document.getElementById('tpl-btn-save');
      const old = btn.innerHTML;
      btn.innerHTML = '✓ ¡Cambios Guardados con Éxito!';
      setTimeout(() => btn.innerHTML = old, 2000);
    });

    // Descargar template-config.js
    document.getElementById('tpl-btn-download').addEventListener('click', () => {
      syncLive();
      const code = `/**\n * ⚙️ CONFIGURACIÓN GENERADA DESDE EL EDITOR VISUAL\n * Coloca este archivo en tu carpeta para que la plantilla cargue tus datos automáticamente.\n */\nwindow.TEMPLATE_CONFIG = ${JSON.stringify(config, null, 2)};\n`;
      const blob = new Blob([code], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template-config.js';
      a.click();
      URL.revokeObjectURL(url);
    });

    // Restaurar originales
    document.getElementById('tpl-btn-reset').addEventListener('click', () => {
      if (confirm('¿Deseas restaurar la configuración inicial de la plantilla?')) {
        localStorage.removeItem('tpl_custom_config');
        location.reload();
      }
    });

    // Modo Edición In-Situ (Click to edit)
    const toggleInline = document.getElementById('tpl-toggle-inline');
    toggleInline.addEventListener('change', () => {
      const active = toggleInline.checked;
      document.body.classList.toggle('tpl-editing-active', active);

      const editableEls = document.querySelectorAll('[data-editable]');
      editableEls.forEach(el => {
        el.contentEditable = active ? 'true' : 'false';
        if (active) {
          el.onblur = () => {
            const field = el.getAttribute('data-editable');
            if (field === 'hero.title') {
              config.hero.title = el.textContent;
              document.getElementById('inp-hero-title').value = el.textContent;
            } else if (field === 'hero.subtitle') {
              config.hero.subtitle = el.innerHTML;
              document.getElementById('inp-hero-subtitle').value = el.innerHTML;
            } else if (field === 'hero.description') {
              config.hero.description = el.textContent;
              document.getElementById('inp-hero-desc').value = el.textContent;
            } else if (field === 'brand.name') {
              config.brand.name = el.textContent;
              document.getElementById('inp-brand-name').value = el.textContent;
            } else if (field === 'footer.copyright') {
              config.footer.copyright = el.textContent;
              document.getElementById('inp-footer-copy').value = el.textContent;
            } else if (field === 'catalog.title') {
              config.catalog.title = el.textContent;
              document.getElementById('inp-catalog-title').value = el.textContent;
            } else if (field.startsWith('catalog.category.')) {
              const idx = parseInt(field.split('.')[2], 10);
              config.catalog.categories[idx] = config.catalog.categories[idx] || {};
              config.catalog.categories[idx].label = el.textContent;
              const catInp = drawer.querySelector(`.inp-cat[data-cat-idx="${idx}"]`);
              if (catInp) catInp.value = el.textContent;
            }
            localStorage.setItem('tpl_custom_config', JSON.stringify(config, null, 2));
          };
        } else {
          el.onblur = null;
        }
      });
    });
  }

  // Ejecutar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyConfig();
      buildEditorUI();
    });
  } else {
    applyConfig();
    buildEditorUI();
  }
})();
