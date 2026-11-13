/**
 * Service Worker — Digital Supply Template
 * Estrategia: cache-first para assets estáticos, network-first para /api/*
 */

const CACHE_NAME = 'dst-v1';

const PRECACHE = [
  '/',
  '/catalogo.html',
  '/dudas.html',
  '/novedades.html',
  '/login.html',
  '/favicon.webp',
  '/manifest.json',
  '/template-config.js',
  '/demo-mode.js',
  '/products_metadata.json',
  'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@100..900&display=swap',
];

// ── Install: pre-cachea recursos esenciales ─────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// ── Activate: limpia caches antiguas ───────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: cache-first para estáticos, network-first para /api/* ───────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // /api/* siempre va a red (o al interceptor demo-mode.js en el cliente)
  if (url.pathname.startsWith('/api/')) return;

  // Assets _astro/*: cache-first
  if (url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/covers/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Resto: network-first con fallback a cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
