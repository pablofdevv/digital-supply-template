/**
 * ============================================================
 * MODO DEMOSTRACIÓN — demo-mode.js
 * ============================================================
 * Este archivo intercepta todas las llamadas a /api/* y devuelve
 * respuestas ficticias para que la plantilla funcione de forma
 * completamente autónoma, sin backend ni servicios reales.
 *
 * ✅ Ningún dato se envía a servidores externos.
 * ✅ Los pagos son simulados — no se procesa ningún cargo.
 * ✅ Las cuentas son de demostración — no hay contraseñas reales.
 * ✅ Los pedidos son ficticios — no existe entrega real.
 *
 * Para conectar tu propio backend:
 *   1. Elimina o no cargues este script.
 *   2. Implementa los endpoints documentados en cada sección.
 *   3. Configura tu proveedor de autenticación en firebase-config.js.
 *   4. Integra tu pasarela de pago (Stripe, PayPal, etc.) en el servidor.
 * ============================================================
 */

(function installDemoMode() {
  'use strict';

  // ── Datos de demostración ────────────────────────────────────────────────────

  const DEMO_USER = {
    uid: 'demo-uid-0001',
    email: 'demo@ejemplo.com',
    displayName: 'Usuario Demo',
    balance: 24.50,
    currency: 'EUR',
    totalOrders: 7,
    totalSpent: 63.80,
    memberSince: '2025-01-01T00:00:00Z',
    tier: 'Estándar',
  };

  const DEMO_ORDERS = [
    {
      id: 'ORD-20250601-0001',
      productName: 'Producto Premium — Plan Mensual',
      variant: 'Individual · 1 mes',
      price: 9.99,
      currency: 'EUR',
      status: 'entregado',
      createdAt: '2025-06-01T10:22:00Z',
      deliveryData: '[DEMO] Este es el contenido que recibirías al comprar.',
    },
    {
      id: 'ORD-20250515-0002',
      productName: 'Servicio Digital — Acceso Anual',
      variant: 'Familiar · 12 meses',
      price: 29.99,
      currency: 'EUR',
      status: 'entregado',
      createdAt: '2025-05-15T14:05:00Z',
      deliveryData: '[DEMO] Credenciales de ejemplo: usuario@demo.com / contraseña_demo',
    },
    {
      id: 'ORD-20250430-0003',
      productName: 'Licencia Software — Lifetime',
      variant: 'Individual · Lifetime',
      price: 19.99,
      currency: 'EUR',
      status: 'entregado',
      createdAt: '2025-04-30T09:11:00Z',
      deliveryData: '[DEMO] Clave de activación: XXXX-XXXX-XXXX-DEMO',
    },
  ];

  const DEMO_REPLACEMENTS = [
    {
      id: 'REP-20250605-0001',
      orderId: 'ORD-20250601-0001',
      reason: 'Producto no funciona',
      status: 'resuelto',
      createdAt: '2025-06-05T12:00:00Z',
      resolvedAt: '2025-06-06T09:00:00Z',
    },
  ];

  const DEMO_WALLET_TOPUPS = [
    { id: 'TOP-001', amount: 20, currency: 'EUR', status: 'completado', createdAt: '2025-06-01T08:00:00Z' },
    { id: 'TOP-002', amount: 10, currency: 'EUR', status: 'completado', createdAt: '2025-05-20T17:30:00Z' },
  ];

  // ── Estado de sesión demo (en memoria) ──────────────────────────────────────

  let _isLoggedIn = false;
  let _demoEmail = '';

  // Restaurar sesión previa de demo (localStorage)
  try {
    const saved = localStorage.getItem('demo_session');
    if (saved) { _isLoggedIn = true; _demoEmail = saved; }
  } catch (_) {}

  function saveSession(email) {
    _isLoggedIn = true;
    _demoEmail = email || DEMO_USER.email;
    try { localStorage.setItem('demo_session', _demoEmail); } catch (_) {}
  }

  function clearSession() {
    _isLoggedIn = false;
    _demoEmail = '';
    try { localStorage.removeItem('demo_session'); } catch (_) {}
  }

  // ── Fábrica de respuestas mock ───────────────────────────────────────────────

  function ok(data) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  function err(msg, status) {
    return new Response(JSON.stringify({ error: msg }), {
      status: status || 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ── Router de endpoints ──────────────────────────────────────────────────────

  const handlers = {

    // ── Auth ──────────────────────────────────────────────────────────────────
    'POST /api/auth/login': async (body) => {
      const { email } = body || {};
      if (!email) return err('Email requerido');
      saveSession(email);
      return ok({ ok: true, user: { ...DEMO_USER, email } });
    },

    'POST /api/auth/register': async (body) => {
      const { email, username } = body || {};
      if (!email) return err('Email requerido');
      saveSession(email);
      return ok({ ok: true, user: { ...DEMO_USER, email, displayName: username || 'Usuario Demo' } });
    },

    'POST /api/auth/firebase-session': async (body) => {
      const { email, displayName } = body || {};
      saveSession(email);
      return ok({ ok: true, user: { ...DEMO_USER, email, displayName: displayName || DEMO_USER.displayName } });
    },

    'POST /api/auth/request-code': async (body) => {
      // En modo demo el código siempre es 123456
      console.info('[DEMO] Código de verificación simulado: 123456');
      return ok({ ok: true, message: '[DEMO] Código enviado. En modo demo usa: 123456' });
    },

    'POST /api/auth/verify-code': async (body) => {
      const { code } = body || {};
      // En demo aceptar cualquier código de 6 dígitos
      if (!code || code.length < 6) return err('Código inválido');
      saveSession(body.email);
      return ok({ ok: true, user: DEMO_USER });
    },

    'POST /api/auth/logout': async () => {
      clearSession();
      return ok({ ok: true });
    },

    // ── Cuenta ────────────────────────────────────────────────────────────────
    'GET /api/account': async () => {
      if (!_isLoggedIn) return err('No autenticado', 401);
      return ok({ ...DEMO_USER, email: _demoEmail || DEMO_USER.email });
    },

    // ── Dashboard cliente ─────────────────────────────────────────────────────
    'GET /api/customer/dashboard': async () => {
      if (!_isLoggedIn) return err('No autenticado', 401);
      return ok({
        user: { ...DEMO_USER, email: _demoEmail || DEMO_USER.email },
        recentOrders: DEMO_ORDERS.slice(0, 2),
        stats: {
          totalOrders: DEMO_ORDERS.length,
          totalSpent: DEMO_ORDERS.reduce((s, o) => s + o.price, 0).toFixed(2),
          balance: DEMO_USER.balance,
        },
      });
    },

    // ── Pedidos ───────────────────────────────────────────────────────────────
    'GET /api/customer/orders': async () => {
      if (!_isLoggedIn) return err('No autenticado', 401);
      return ok({ orders: DEMO_ORDERS, total: DEMO_ORDERS.length });
    },

    // ── Reemplazos ────────────────────────────────────────────────────────────
    'GET /api/customer/replacements': async () => {
      if (!_isLoggedIn) return err('No autenticado', 401);
      return ok({ replacements: DEMO_REPLACEMENTS });
    },

    'POST /api/customer/replacements': async () => {
      if (!_isLoggedIn) return err('No autenticado', 401);
      return ok({ ok: true, message: '[DEMO] Solicitud de reemplazo registrada. En producción se procesaría aquí.' });
    },

    // ── Ruleta / recompensas ──────────────────────────────────────────────────
    'GET /api/customer/roulette/status': async () => {
      return ok({ canSpin: true, nextSpin: null, spinsLeft: 1 });
    },

    'POST /api/customer/roulette/spin': async () => {
      if (!_isLoggedIn) return err('No autenticado', 401);
      const prizes = ['0.50 €', '1.00 €', '0.00 € (suerte la próxima)', '2.00 €', '0.25 €'];
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      return ok({ ok: true, prize, message: `[DEMO] ¡Has ganado ${prize}! (simulado)` });
    },

    // ── Cartera ───────────────────────────────────────────────────────────────
    'GET /api/wallet': async () => {
      if (!_isLoggedIn) return err('No autenticado', 401);
      return ok({ balance: DEMO_USER.balance, currency: DEMO_USER.currency });
    },

    'GET /api/wallet/topups': async () => {
      if (!_isLoggedIn) return err('No autenticado', 401);
      return ok({ topups: DEMO_WALLET_TOPUPS });
    },

    // ── Catálogo ──────────────────────────────────────────────────────────────
        'GET /api/catalog': async () => {
      return ok({
        currency: 'EUR',
        products: [1, 2, 3, 4, 5].map(n => ({
          id: `test-producto-${n}`,
          slug: `test-producto-${n}`,
          name: `TEST ${n} — Nombre del Producto`,
          category: ['ia', 'streaming', 'gaming', 'vpn', 'software'][n - 1],
          description: `Descripción del producto ${n}. Edita este texto en products_metadata.json.`,
          sell_price: (n * 5 + 4.99),
          fulfillment_available: true,
          stock: 99,
          cover: null,
          cardIncludes: ['[Característica 1]', '[Característica 2]', '[Característica 3]'],
        })),
      });
    },
          {
            id: 'demo-ia-anual',
            slug: 'demo-ia-anual',
            name: 'Suite IA Premium — Anual',
            category: 'ia',
            description: 'Acceso anual a las mejores herramientas de inteligencia artificial del mercado.',
            sell_price: 79.99,
            fulfillment_available: true,
            stock: 50,
            cardIncludes: ['Todos los modelos incluidos', 'Sin restricciones', 'Soporte prioritario'],
          },
          {
            id: 'demo-streaming-basico',
            slug: 'demo-streaming-basico',
            name: 'Streaming Premium — 1 Mes',
            category: 'streaming',
            description: 'Cuenta premium con acceso a catálogo completo en HD y 4K. Perfil personal garantizado.',
            sell_price: 4.99,
            fulfillment_available: true,
            stock: 120,
            cardIncludes: ['4K Ultra HD', 'Sin anuncios', 'Perfil exclusivo'],
          },
          {
            id: 'demo-streaming-anual',
            slug: 'demo-streaming-anual',
            name: 'Streaming + Música — Pack Anual',
            category: 'streaming',
            description: 'El pack todo-en-uno: plataforma de vídeo y música premium durante 12 meses.',
            sell_price: 39.99,
            fulfillment_available: true,
            stock: 30,
            cardIncludes: ['Vídeo + Música incluidos', 'Ahorra un 40%', 'Garantía anual'],
          },
          {
            id: 'demo-gaming-cuenta',
            slug: 'demo-gaming-cuenta',
            name: 'Cuenta Gaming — Acceso Completo',
            category: 'gaming',
            description: 'Cuenta verificada con acceso a biblioteca de juegos premium. Entrega en segundos.',
            sell_price: 14.99,
            fulfillment_available: true,
            stock: 45,
            cardIncludes: ['Biblioteca completa', 'Cuenta verificada', 'Sin baneo garantizado'],
          },
          {
            id: 'demo-vpn-lifetime',
            slug: 'demo-vpn-lifetime',
            name: 'VPN Profesional — Lifetime',
            category: 'vpn',
            description: 'Acceso vitalicio a VPN de alta velocidad con servidores en más de 90 países.',
            sell_price: 29.99,
            fulfillment_available: true,
            stock: 25,
            cardIncludes: ['90+ países', 'Sin logs', 'Pago único, sin renovación'],
          },
          {
            id: 'demo-software-diseno',
            slug: 'demo-software-diseno',
            name: 'Suite Diseño — Plan Pro',
            category: 'software',
            description: 'Acceso a las mejores herramientas de diseño gráfico y edición de vídeo del mercado.',
            sell_price: 12.99,
            fulfillment_available: true,
            stock: 60,
            cardIncludes: ['Diseño + Vídeo', 'Almacenamiento en la nube', 'Colaboración en equipo'],
          },
          {
            id: 'demo-software-productividad',
            slug: 'demo-software-productividad',
            name: 'Pack Productividad — Lifetime',
            category: 'software',
            description: 'Suite ofimática completa con licencia de por vida. Instala en hasta 5 dispositivos.',
            sell_price: 19.99,
            fulfillment_available: true,
            stock: 80,
            cardIncludes: ['Word + Excel + PowerPoint', '5 dispositivos', 'Actualizaciones incluidas'],
          },
        ],
      });
    },

    // ── Checkout ──────────────────────────────────────────────────────────────
    'POST /api/checkout/quote': async (body) => {
      const price = (body && body.price) ? parseFloat(body.price) : 9.99;
      return ok({
        subtotal: price,
        fees: 0,
        total: price,
        currency: 'EUR',
        paymentMethods: ['balance', 'stripe_demo'],
      });
    },

    'POST /api/checkout/create-session': async (body) => {
      // ─ IMPORTANTE: En producción conecta aquí tu pasarela de pago ─
      // Stripe: https://stripe.com/docs/payments/checkout
      // PayPal: https://developer.paypal.com/docs/checkout/
      console.info('[DEMO] Pago simulado — no se ha procesado ningún cargo real.');
      return ok({
        ok: true,
        demo: true,
        orderId: 'ORD-DEMO-' + Date.now(),
        message: '[DEMO] Pedido simulado creado. En producción aquí irías a la pasarela de pago.',
        redirectUrl: null,
      });
    },
  };

  // ── Interceptor de fetch ─────────────────────────────────────────────────────

  const _originalFetch = window.fetch.bind(window);

  window.fetch = async function demoFetch(input, init) {
    const url = typeof input === 'string' ? input : (input instanceof URL ? input.pathname : input.url);
    const path = url.split('?')[0].replace(/\/$/, '');

    if (!path.startsWith('/api/')) {
      return _originalFetch(input, init);
    }

    const method = (init && init.method ? init.method : 'GET').toUpperCase();
    const key = `${method} ${path}`;

    let body = null;
    if (init && init.body) {
      try { body = JSON.parse(init.body); } catch (_) {}
    }

    const handler = handlers[key];
    if (handler) {
      try {
        return await handler(body);
      } catch (e) {
        console.error('[DEMO] Error en handler mock:', key, e);
        return err('Error interno del demo', 500);
      }
    }

    // Endpoint no mapeado — devolver respuesta de demostración genérica
    console.warn('[DEMO] Endpoint no mapeado:', key, '— devolviendo respuesta demo genérica.');
    return ok({ ok: true, demo: true, endpoint: key, message: '[DEMO] Respuesta de demostración genérica.' });
  };

  // ── Banner de aviso demo ─────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.createElement('div');
    banner.id = 'demo-mode-banner';
    banner.setAttribute('role', 'status');
    banner.innerHTML = `
      <span>⚠️ <strong>Modo demostración activo</strong> — Los pagos, cuentas y pedidos son ficticios. Ningún dato real se procesa.</span>
      <button onclick="document.getElementById('demo-mode-banner').remove()" aria-label="Cerrar aviso">✕</button>
    `;
    Object.assign(banner.style, {
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: '99999',
      background: '#1a1200',
      color: '#ffd54f',
      borderTop: '2px solid #ffd54f',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '13px',
      lineHeight: '1.4',
      gap: '12px',
    });
    const btn = banner.querySelector('button');
    Object.assign(btn.style, {
      background: 'transparent',
      border: 'none',
      color: '#ffd54f',
      cursor: 'pointer',
      fontSize: '16px',
      lineHeight: '1',
      flexShrink: '0',
    });
    document.body.appendChild(banner);
  });

  // Suprime imágenes de portada en modo demo
  window.KrystalProductCovers = { cover: () => null, apply: () => {}, family: () => 'default' };

  console.info(
    '%c[DEMO MODE ACTIVO]%c Todos los /api/* son simulados. ' +
    'Para producción, elimina demo-mode.js y conecta tu backend.',
    'color:#ffd54f;font-weight:bold',
    'color:#aaa',
  );

})();
