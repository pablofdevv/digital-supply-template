# Digital Supply Template

<div align="center">

**Una plantilla web completa para tiendas de suministro digital.**  
Catálogo en vivo, checkout integrado, panel de cliente, auth, modo demo sin backend y PWA.

[![Demo en vivo](https://img.shields.io/badge/Demo-pablooff--tech.github.io-0a0a0c?style=flat&logo=github&logoColor=white)](https://pablooff-tech.github.io/digital-supply-template/)
[![CI](https://github.com/PablooFf-tech/digital-supply-template/actions/workflows/ci.yml/badge.svg)](https://github.com/PablooFf-tech/digital-supply-template/actions/workflows/ci.yml)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## ¿Qué es esto?

Una tienda digital lista para producción, construida con **Astro** (compilada a HTML estático + vanilla JS), con un modo demo que intercepta todas las llamadas al backend vía `fetch` para que funcione de forma autónoma sin ningún servidor.

El objetivo: demostrar que una web de e-commerce profesional puede desplegarse en segundos y conectarse a cualquier backend real más tarde.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                   CLIENTE (browser)                  │
│                                                      │
│  template-config.js    →   DOM overrides             │
│  demo-mode.js          →   fetch() interceptor       │
│  i18n (compiled)       →   EN / ES runtime switch    │
│  Service Worker        →   offline / cache-first     │
│                                                      │
│  _astro/*.js           →   compiled Astro modules    │
│  products_metadata.json→   product catalog source    │
└───────────────┬─────────────────────────────────────┘
                │ /api/* (interceptado en demo)
                │ /api/* (real en producción)
                ▼
┌──────────────────────────┐   ┌─────────────────────┐
│   Backend (tu servidor)  │   │  Firebase Auth       │
│   Node / Workers / etc.  │   │  Google / Email/OTP  │
│   Stripe / PayPal        │   └─────────────────────┘
└──────────────────────────┘
```

---

## Funcionalidades

| Área | Detalle |
|---|---|
| **Inicio** | Hero editable, ticker, stats en tiempo real, testimonios |
| **Catálogo** | Búsqueda en vivo, filtros por categoría, grid responsive |
| **Producto** | Variantes, precio, stock, acordeón de detalles, carrito |
| **Checkout** | Carrito lateral (drawer), promo codes, pago simulado |
| **Auth** | Email+password, Google OAuth, código OTP sin contraseña |
| **Panel cliente** | Dashboard, historial de pedidos, saldo, reemplazos, tickets |
| **i18n** | Cambio EN/ES en tiempo real sin recarga de página |
| **Dark/Light mode** | Persistido en localStorage |
| **PWA** | Instalable como app, offline via Service Worker |
| **Demo mode** | `fetch()` interceptado — cero backend necesario |

---

## Pila técnica

| Capa | Tecnología |
|---|---|
| Framework | [Astro](https://astro.build) (compilado a HTML estático) |
| Auth | [Firebase Authentication](https://firebase.google.com/products/auth) |
| Estilos | CSS custom properties + oklch, Hanken Grotesk |
| i18n | Módulo vanilla JS compilado (EN / ES) |
| PWA | Web App Manifest + Service Worker (cache-first) |
| Deploy | Vercel / Netlify / GitHub Pages / cualquier CDN estático |
| Demo | `demo-mode.js` — interceptor de `fetch()` IIFE |

---

## Demo en vivo

**[→ pablooff-tech.github.io/digital-supply-template](https://pablooff-tech.github.io/digital-supply-template/)**

Prueba el modo demo sin instalar nada: catálogo, producto, carrito, checkout y panel de cliente completamente funcionales.

---

## Inicio rápido

```bash
git clone https://github.com/PablooFf-tech/digital-supply-template.git
cd digital-supply-template
npm start
# → http://localhost:4322
```

> **Sin Node.js:** sirve la carpeta con VS Code Live Server o `python3 -m http.server 4322`.

### Personalizar en 3 pasos

**1. Edita `template-config.js`** — nombre, textos, links, categorías, footer.

**2. Edita `products_metadata.json`** — añade tus productos reales.

**3. Elimina `demo-mode.js`** de los HTML cuando conectes tu backend.

---

## Estructura

```
plantilla-web/
├── index.html                  # Inicio
├── catalogo.html               # Catálogo con filtros
├── product/                    # Una página por producto
│   ├── _shell.html             # Plantilla base
│   └── *.html
├── customer/                   # Área de cliente
├── _astro/                     # Assets compilados (no editar)
├── template-config.js          # ⚙️  Configuración principal
├── demo-mode.js                # 🎭  Mock de API (modo demo)
├── i18n-patch.js               # 🌐  Parche i18n para template-config
├── sw.js                       # 📶  Service Worker (PWA)
├── manifest.json               # 📱  Web App Manifest (PWA)
├── products_metadata.json      # 📦  Datos de productos
└── firebase-config.js          # 🔒  Firebase (rellena con tus datos)
```

---

## Conectar servicios reales

### Auth — Firebase

```js
// firebase-config.js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
};
```

Activa Authentication → Email/Password + Google en la consola de Firebase.

### Pagos — Stripe

```
POST /api/checkout/create-session
  → crea Stripe Checkout Session en el servidor
  → devuelve { url } para redirigir al cliente
```

> ⚠️ La clave secreta `sk_...` **nunca** va en el frontend.

### Backend mínimo

Implementa estos endpoints para reemplazar demo-mode.js:

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/catalog` | GET | Lista de productos con stock |
| `/api/checkout/create-session` | POST | Crear sesión de pago |
| `/api/customer/profile` | GET | Perfil del cliente autenticado |
| `/api/customer/orders` | GET | Historial de pedidos |
| `/api/auth/request-code` | POST | Enviar OTP por email |
| `/api/auth/verify-code` | POST | Verificar OTP |

---

## Deploy

```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir .

# GitHub Pages
# → Sube la carpeta a un repo público → Settings → Pages
```

---

## Checklist antes de publicar

- [ ] `template-config.js` — tu marca, textos y links
- [ ] `products_metadata.json` — tus productos reales
- [ ] `firebase-config.js` — tu proyecto Firebase
- [ ] Eliminar `demo-mode.js` de todos los HTML
- [ ] Textos legales (privacidad, términos) — adaptados a tu negocio
- [ ] Sin secretos (`.env`, `sk_...`) en archivos versionados
- [ ] Prueba en móvil, tablet y escritorio
- [ ] Lighthouse ≥ 90 en Performance, Accessibility y SEO

---

## Terceros y licencias

| Recurso | Licencia |
|---|---|
| Hanken Grotesk | [SIL OFL 1.1](https://fonts.google.com/specimen/Hanken+Grotesk) |
| Firebase SDK | [Apache 2.0](https://github.com/firebase/firebase-js-sdk/blob/master/LICENSE) |
| Astro | [MIT](https://github.com/withastro/astro/blob/main/LICENSE) |
| Imágenes / logos de ejemplo | ⚠️ Solo para demo — sustitúyelos antes de publicar |

> **Licencia de distribución:** No incluida por defecto. Elige la tuya en [choosealicense.com](https://choosealicense.com).

---

*Construido a partir de un proyecto real de e-commerce. Contenido de ejemplo — adáptalo a tu negocio.*
