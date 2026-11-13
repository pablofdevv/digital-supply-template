/**
 * ==============================================================================
 * ⚙️ GUÍA DE EDICIÓN: ARCHIVO DE CONFIGURACIÓN DE LA PLANTILLA
 * ==============================================================================
 * Aquí puedes cambiar cada texto, enlace, botón, marca Y CATÁLOGO de tu web.
 * Solo cambia los textos que están entre comillas "" y guarda el archivo.
 * ==============================================================================
 */

window.TEMPLATE_CONFIG = {
  // ----------------------------------------------------------------------------
  // 1. MARCA Y CABECERA SUPERIOR
  // (Aparece en la esquina superior izquierda de la barra de navegación)
  // ----------------------------------------------------------------------------
  brand: {
    // 👉 Nombre de tu tienda, estudio, empresa o marca personal
    name: "TU MARCA AQUÍ",

    // 👉 Pequeño lema o etiqueta que acompaña al logo
    subtag: "TIENDA OFICIAL · 2026",

    // 👉 Mensaje de confianza o estadística de clientes
    trustBadge: "<strong>+1,500</strong> ventas verificadas &middot; <strong>+1,200</strong> clientes felices"
  },

  // ----------------------------------------------------------------------------
  // 2. ENLACES DE LA NAVEGACIÓN SUPERIOR
  // (Pestañas centrales del menú de cabecera)
  // ----------------------------------------------------------------------------
  navigation: [
    { label: "INICIO", link: "/", active: true },
    { label: "CATÁLOGO", link: "/catalogo", active: false },
    { label: "DUDAS", link: "/dudas", active: false },
    { label: "NOVEDADES", link: "/novedades", active: false }
  ],

  // ----------------------------------------------------------------------------
  // 3. SECCIÓN HERO (ZONA CENTRAL PRINCIPAL)
  // ----------------------------------------------------------------------------
  hero: {
    // 👉 Título gigante centrado (usa el nombre de tu marca o producto estrella)
    title: "TU MARCA AQUÍ",

    // 👉 Subtítulo: usa <strong>palabra</strong> para poner palabras en negrita
    subtitle: "<strong>DESCRIPCIÓN DE TU TIENDA</strong> | Especialistas en <strong>[CATEGORÍA 1]</strong>, <strong>[CATEGORÍA 2]</strong>, <strong>[CATEGORÍA 3]</strong> y <strong>[CATEGORÍA 4]</strong>.",

    // 👉 Descripción o párrafo explicativo de tu negocio
    description: "Accede a [describe tus productos] al mejor precio, con entrega automática al instante, soporte dedicado y garantía oficial del 100%."
  },

  // ----------------------------------------------------------------------------
  // 4. BOTONES DE LLAMADA A LA ACCIÓN
  // ----------------------------------------------------------------------------
  buttons: {
    // 👉 Botón principal blanco con elevación (tu acción más importante)
    primary: {
      text: "Ver catálogo",
      link: "/catalogo" // Cambia por tu enlace: "/catalogo", "https://wa.me/tu-numero", etc.
    },

    // 👉 Botón secundario oscuro
    secondary: {
      text: "Novedades",
      link: "/novedades" // Cambia por tu enlace: "/dudas", "/contacto", etc.
    }
  },

  // ----------------------------------------------------------------------------
  // 5. CATÁLOGO DE PRODUCTOS Y FILTROS
  // ----------------------------------------------------------------------------
  catalog: {
    // 👉 Título principal de la sección del catálogo
    title: "Elige tu próximo acceso o producto.",

    // 👉 Texto de marcador de posición del buscador de productos
    searchPlaceholder: "Buscar en el catálogo (ej: ChatGPT, Spotify, VPN)...",

    // 👉 Título del panel de filtros
    filtersTitle: "Filtros",

    // 👉 Categorías del catálogo (nombre visible de cada filtro)
    categories: [
      { id: "ia", label: "Inteligencia Artificial" },
      { id: "gaming", label: "Gaming & Cuentas" },
      { id: "streaming", label: "Streaming & Música" },
      { id: "vpn", label: "VPN & Privacidad" },
      { id: "software", label: "Software & Diseño" }
    ],

    // 👉 Productos destacados / de ejemplo para rellenar
    itemsNotice: "Los productos detallados y variantes se gestionan en 'products_metadata.json' o se sincronizan desde tu panel de proveedor."
  },

  // ----------------------------------------------------------------------------
  // 6. PIE DE PÁGINA (FOOTER) Y ENLACES LEGALES
  // ----------------------------------------------------------------------------
  footer: {
    // 👉 Enlaces del pie de página
    links: [
      { label: "Catálogo", link: "/catalogo" },
      { label: "Dudas frecuentes", link: "/dudas" },
      { label: "Reemplazos y Garantía", link: "/replace" },
      { label: "Política de Privacidad", link: "#privacidad" },
      { label: "Términos y Condiciones", link: "#terminos" }
    ],

    // 👉 Canales de contacto y redes sociales (iconos del footer)
    social: {
      discord: "https://discord.com",      // Tu enlace a Discord o comunidad
      email: "mailto:tu-email@tudominio.com", // Tu correo de soporte
      account: "/my-account"               // Enlace al panel de cliente o perfil
    },

    // 👉 Texto de Copyright al final de la página
    copyright: "© 2026 Tu Marca Aquí. Todos los derechos reservados."
  }
};
