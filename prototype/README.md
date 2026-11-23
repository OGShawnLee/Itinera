# Itinera — Prototipo interactivo (Vue 3 + Vite)

Prototipo estático del seguimiento preventivo de mantenimiento de motocicletas (**Itinera**), listo para desplegar en **Vercel**.

## Despliegue en Vercel

1. Importa este repositorio en Vercel y configura **Root Directory** en `prototype`.
2. Vercel tomará automáticamente la configuración de [vercel.json](vercel.json):
   - **Framework Preset:** `Vite`
   - **Install Command:** `bun install --frozen-lockfile`
   - **Build Command:** `bun run build`
   - **Output Directory:** `dist`
   - **Rewrites SPA:** todas las rutas (`/(.*)`) redirigen a `/index.html` para soportar navegación directa y recargas en Vue Router.

## Rutas útiles para pruebas en línea

- `/` o `/home`: pantalla principal con datos de ejemplo (`Mi FT150`).
- `/onboarding`: flujo inicial de 3 pasos para probar la configuración desde cero en celular.
- `/comercio`: vista demostrativa de validación de código para negocios.
- En pantallas de escritorio (`>= 480px`), aparece a la izquierda la barra **Simulador del prototipo** para restablecer datos, empezar desde cero o alternar entre cadena y banda CVT.
