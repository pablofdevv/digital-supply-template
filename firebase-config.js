// ==========================================================================
// CONFIGURACIÓN DE AUTENTICACIÓN (OPCIONAL)
// ==========================================================================
// Si deseas habilitar inicio de sesión con Google o correo, coloca aquí
// tus credenciales públicas de Firebase:
// 1. Ve a https://console.firebase.google.com/
// 2. Crea tu proyecto y añade una aplicación Web
// 3. Pega tus datos de configuración abajo
// ==========================================================================

window.FIREBASE_CONFIG = window.FIREBASE_CONFIG || {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:abcdef000000"
};

window.isFirebaseConfigured = function() {
  const cfg = window.FIREBASE_CONFIG;
  return cfg && cfg.apiKey && !cfg.apiKey.includes('TU_API_KEY');
};
