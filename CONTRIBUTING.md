# Contribuir a Digital Supply Template

¡Gracias por tu interés! Las contribuciones son bienvenidas.

## Cómo contribuir

### Reportar un bug

1. Abre un [Issue](https://github.com/PablooFf-tech/digital-supply-template/issues) describiendo:
   - Qué esperabas que pasara
   - Qué pasó realmente
   - Pasos para reproducirlo
   - Navegador y sistema operativo

### Proponer una mejora

Abre un Issue con el prefijo `[Feature]` antes de enviar un PR. Así podemos discutir si encaja con los objetivos del proyecto.

### Enviar un Pull Request

1. Haz un fork del repo
2. Crea una rama desde `main`:
   ```bash
   git checkout -b feat/mi-mejora
   ```
3. Haz tus cambios respetando el estilo existente
4. Verifica que la demo sigue funcionando en local (`npm start`)
5. Abre el PR con una descripción clara de qué cambias y por qué

## Estilo de código

- Vanilla JS — sin frameworks adicionales en el frontend compilado
- CSS custom properties con oklch para colores
- Commits en inglés siguiendo [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `chore:`

## Qué **no** aceptamos

- Dependencias de npm en el bundle del cliente (el output es HTML estático)
- Cambios que rompan el modo demo sin backend
- Claves reales, tokens o secrets en ningún archivo

---

*Este proyecto sigue el [Contributor Covenant](https://www.contributor-covenant.org/es/) como código de conducta.*
