# 005 — Build Itinera Interactive Mobile Prototype (Bun + Vite 8 + Vue + TS + UnoCSS + Reka UI)

| Field | Value |
| :--- | :--- |
| **ID** | 005 |
| **Status** | ready |
| **Model** | Claude Opus 5.5 (High) |
| **Role** | Senior Frontend & Prototype Engineer |
| **Spec** | [spec.md](spec.md) |

---

## Context & Purpose

Itinera needs an interactive, navigable mobile web prototype (browser-only, simulated Xalapa data, no backend) grounded in [DOMAIN.md](../../.routing/DOMAIN.md), [ROUTES.md](../../.routing/ROUTES.md), [SPECIFICATION.md](../../.routing/academic/SPECIFICATION.md) and [MARKET_STUDY.md §2.3](../../.routing/academic/MARKET_STUDY.md).

Two goals, in priority order:
1. **Produce 6 clean `390×844` PNG captures** (`Capturas 1–6`, `MARKET_STUDY.md §2.3`) that will be embedded in Google Forms and viewed by respondents **on their phones**. Every capture must be readable at that size, uncluttered, and free of technical jargon and estimated kilometers. The survey goes out imminently, so the 6 capture screens are the critical path: build and polish them first, then complete the rest of the routes.
2. Give the team and professor a clickable prototype of the low-touch flow (onboarding by daily routine, 5-item traffic light, `cadena` vs `CVT`, 1-tap weekly check-in without km, `<15 s` service log, free summary, Phase 1 merchant concept).

---

## Scope

### May create or edit
- `prototype/**` (new standalone project, including `prototype/.gitignore`, `prototype/bun.lock`, `prototype/scripts/**`, `prototype/captures/*.png`).
- `.tickets/005-build-itinera-vue-prototype/changelog.md`.

### Must not touch
- Anything else: repo root files, `.routing/**`, `deliverables/**`, `.agents/**`, `.claude/**`, other `.tickets/**`.
- Do NOT run `git commit` or `git push`.
- If you find a contradiction in the canonical docs, do not edit them: follow the **Prototype Display Rules** below and list the contradiction in the changelog under "Doc follow-ups".

---

## Technical Stack Requirements

Use current stable versions, installed with `bun add` (no hand-pinned guesses):

| Concern | Requirement |
| :--- | :--- |
| Package manager | `bun` only (`bun install`, `bun add`, `bun run`, `bun test`). Commit the text lockfile `prototype/bun.lock`. Never use `--force`. |
| Build | `vite@^8` and a `@vitejs/plugin-vue` release whose peer range includes Vite 8. `bunx vite --version` must print `vite/8.x`. |
| Framework | `vue@^3` with `<script setup lang="ts">`, `vue-router@^4` with `createWebHistory()`. |
| Types | `typescript` + `vue-tsc`, `strict: true`. Use a **single** `prototype/tsconfig.json` (no project references) so `bunx vue-tsc --noEmit` checks everything. Include `"types": ["vite/client"]` and a `src/env.d.ts` declaring `*.vue` modules. |
| Styling | `unocss` with `import UnoCSS from 'unocss/vite'` in `vite.config.ts`, `import 'virtual:uno.css'` in `main.ts`, and `prototype/uno.config.ts` using `presetWind3()` (do **not** use the deprecated `presetUno`) plus `@unocss/reset/tailwind.css` imported before `virtual:uno.css`. |
| Primitives | `reka-ui` (v2). Use it for Dialog (the `/calibrate` sheet and confirmations), RadioGroup (routine, days, moto type, template, intensity), Switch (odometer, promotions demo, include costs), Accordion (optional fields in `/log-service`), and Tabs or ToggleGroup (history filters, export scope). |
| QR | No QR library. Draw a decorative inline SVG labeled "Código QR de ejemplo"; it must not encode any URL. |

### Compatibility notes (read before installing)
- **Peer dependencies:** `bun install` auto-installs peers and only *warns* on a range mismatch. If `unocss` or `@vitejs/plugin-vue` warns about Vite 8, keep Vite 8 as long as `bun run build` and `bun run dev` work, and copy the exact warning into the changelog. Only if the build genuinely fails because of Vite 8: stop, record the error, and pin `vite@^7`, `@vitejs/plugin-vue` and `unocss` to mutually compatible versions, flagging it as a deviation in the changelog.
- **Native binaries:** Vite 8 bundles with Rolldown through platform `optionalDependencies`. If a binary does not load on Windows, add the package to `trustedDependencies` in `package.json` and reinstall; never disable the bundler.
- **Satoshi from Fontshare:** Load it in exactly one way: a `<link rel="preconnect" href="https://api.fontshare.com" crossorigin>` plus `<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap">` in `index.html`, and `theme.fontFamily.sans = 'Satoshi, ui-sans-serif, system-ui, sans-serif'` in `uno.config.ts`. Do **not** also enable `@unocss/preset-web-fonts`, so the font is not loaded twice and builds do not depend on network access. The capture and verify scripts must `await document.fonts.ready` and confirm `document.fonts.check('500 16px Satoshi')` before measuring or shooting.
- **Reka Dialog inside the phone frame:** The desktop phone frame must be a containing block for overlays (`position: relative; overflow: hidden; transform: translateZ(0)`). Mount a `<div id="sheet-root">` inside it and use `<DialogPortal to="#sheet-root">`, so the sheet and overlay stay inside the 390×844 frame and never cover the simulator toolbar. Every `DialogContent` includes a `DialogTitle` and a `DialogDescription` (visually hidden if needed) so Reka emits no accessibility warnings.

---

## Inputs

Read before writing code (paths relative to this folder):
1. [DOMAIN.md](../../.routing/DOMAIN.md): `Vehicle` (incl. `transmision`), `ServiceTemplate`, `ConsumableItem`, `WearTrafficLight`, `WeeklyCheckIn`, `MaintenanceLog`, `ExportableSummary`, `HomeWorkshopTag`, Phase 1 `MerchantPartner`, `ContextualPromotion`, `CouponRedemption`; `§3.1` merchant rules; `§5.1` routine table and intensity factors; `§5.2` dual rule; `§5.3` thresholds; `§5.4` partial reset; `§5.5` presets.
2. [ROUTES.md](../../.routing/ROUTES.md): route table, widgets, `§4.D` deferred Phase 1 views, `§5` notifications, `§6` exclusions.
3. [MARKET_STUDY.md §2.3](../../.routing/academic/MARKET_STUDY.md): the 6 captures.
4. [SPECIFICATION.md](../../.routing/academic/SPECIFICATION.md): plain-Spanish tone for novice, older and female riders.
5. [frontend-design](../../.agents/skills/frontend-design/SKILL.md): do its plan → review → build → critique passes and write the 4–6 hex palette, type scale and layout principle into the changelog **before** coding.

---

## Prototype Display Rules (override display details in ROUTES.md where they conflict)

These rules come from the survey requirements (`MARKET_STUDY.md §2.3`, teacher feedback AUD-5) and take precedence over display details in `ROUTES.md`:

1. **No estimated kilometers on any capture screen.** Remaining runway on `/home` cards and banners is expressed in time only. Use this label rule for `d` = days until the item reaches its limit: `d ≤ 0` → "Ya toca" (and "venció hace ~X días" when overdue); `1–6` → "en ~X días"; `7–29` → "en ~round(d/7) semanas"; `≥ 30` → "en ~round(d/30) meses". The `/home` header shows the routine in words (for example "Varios viajes al día, 5 o 6 días") instead of an estimated odometer. `/consumable/:id` shows the dual reading as two percentage bars, "Por recorrido" and "Por tiempo", plus "Vence primero por recorrido" or "por tiempo". Kilometers may appear only where the user types or reads a real tablero value (`/calibrate` working-odometer mode, the odometer field in `/log-service`) and in `/settings/intervals` (plan values). Record this as a Doc follow-up for `ROUTES.md §4.B.2` and `§4.C.6`.
2. **Plain status labels** matching the survey text: Green "Bien", Yellow "Ve juntando", Red "Ya toca". Status is never conveyed by color alone: each badge has a text label and a distinct shape or icon.
3. **No technical or internal words in visible UI** (see the forbidden list in the spec), including "Fase 1": Phase 1 views are labeled "Próximamente".
4. **Fictional names only:** workshop "Taller Ejemplo", merchant "Refaccionaria Ejemplo", code `ITN-482`. No real business names, phone numbers, URLs, brand logos or app-store badges. Actions such as "Agendar con mi taller", "Escribir por WhatsApp" or "Compartir / Guardar PDF" show a toast ("En la app real aquí se abre WhatsApp" or "…el menú para compartir") instead of opening anything.
5. **Avoid the frontend-design skill's generated-UI tells:** no ALL-CAPS eyebrow labels, no "A · B · C" middle-dot meta strings (use two separate badges for "Promoción pagada" and "Próximamente"), no "→" appended to buttons, no cream-and-terracotta or near-black-with-acid-accent palettes, no identical cards with one radius and one grey shadow everywhere.
6. **Legibility floor on capture screens:** body text ≥ 16px, secondary text ≥ 14px, nothing visible below 13px; text contrast ≥ 4.5:1 (yellow status uses dark amber text on a light amber surface); tappable controls ≥ 44px tall.

---

## Task

### 1. Scaffold `prototype/`
- Create `package.json` with scripts: `dev` (`vite`), `build` (`vite build`), `preview` (`vite preview --port 4173 --strictPort`), `typecheck` (`vue-tsc --noEmit`), `test` (`bun test`), `verify` and `capture` (see step 7).
- Create `vite.config.ts`, `tsconfig.json`, `index.html` (`lang="es-MX"`, viewport meta, Fontshare links), `uno.config.ts`, `src/main.ts`, `src/App.vue`, `src/router.ts`, `src/env.d.ts`, `.gitignore` (`node_modules`, `dist`).

### 2. Design tokens in `uno.config.ts`
- `theme.colors` with semantic names only, for example `canvas`, `surface`, `ink`, `ink-muted`, `line`, `brand`, `brand-ink`, and three traffic-light groups `ok`, `warn`, `crit`, each with `surface`, `text` and `border`. Components never use raw hex values or default palette names such as `red-500`.
- At least 8 `shortcuts`, used across components, for example `card`, `badge-ok`, `badge-warn`, `badge-crit`, `btn-primary`, `btn-secondary`, `field`, `chip`, `tab-item`, `section-title`.

### 3. Domain logic as pure, tested functions (`src/domain/`)
Implement the rules from `DOMAIN.md §5`. Treat a month as 30 days.
- `tasaDia(rutina, dias)`: `km_rutina` R1 = 15, R2 = 30, R3 = 50, R4 = 90; days 1–2 = 1.5, 3–4 = 3.5, 5–6 = 5.5, todos = 7; `km_rutina × D / 7`.
- `fraccionUso(deltaKm, deltaDias, iKm, iDias) = max(deltaKm / iKm, deltaDias / iDias)`; `estado(p)`: `< 0.80` ok, `< 1.00` warn, otherwise crit.
- `diasRestantes`: days until `p` reaches 1.00 by whichever dimension comes first.
- Templates from `DOMAIN.md §5.5` for Moto Urbana, Moto Trabajo / Uso Rudo and Personalizada, each with a `cadena` and a `CVT` variant of the transmission item. The transmission item has two tasks (short task: lubrication and adjustment, or inspection; replacement). Its card status is the worse of the two.
- Partial reset (`§5.4`): logging the short task resets only that counter; logging replacement resets both.
- Weekly check-in intensity factors: Sí 1.0, Menos 0.5, Más 1.5, plus "No la usé" 0.0 in `/calibrate`. They feed a 4-week rolling average of `tasaDia`. Never display the resulting km.
- `prototype/src/domain/*.test.ts` run with `bun test`, covering every case listed in spec Check 6.

### 4. Seed state (`src/data/seed.ts`), deterministic and computed
All dates are **offsets from a single `DEMO_TODAY`** (default: the current date), so statuses are identical whenever captures are taken. Statuses must be **computed** by the domain functions, never hardcoded.
- Vehicle: nickname "Mi FT150", type "De calle o de trabajo", `transmision: 'cadena'`, template **Moto Urbana**, routine **R3** (Varios viajes en el día), days **5 o 6** (so `tasaDia ≈ 39.29`), working odometer with a confirmed tablero reading of 12,400 km 7 days ago, `HomeWorkshopTag` "Taller Ejemplo".
- Last service offsets, which must produce these results:

| Item | Last service | Expected computed result |
| :--- | :--- | :--- |
| Aceite (2,500 km / 90 d) | 52 days ago | `p ≈ 0.82` → Yellow, about 11–12 days left → "en ~2 semanas" |
| Cadena, lubricación y ajuste (500 km / 15 d) | 16 days ago | Red, "Ya toca" (overdue) |
| Cadena, cambio de kit (15,000 km, no time limit) | 160 days ago | Green (does not override the Red short task) |
| Frenos (6,000 km / 180 d) | 40 days ago | Green |
| Bujía (5,000 km / 180 d) | 60 days ago | Green |
| Llantas (15,000 km / 540 d) | 120 days ago | Green |
| Banda CVT inspección (6,000 km / 180 d), used only if switched to CVT | 30 days ago | Green |
| Banda CVT y rodillos, reemplazo (15,000 km / 720 d), used only if switched to CVT | 200 days ago | Green |

- An interval without a time limit (kit change) is evaluated by distance only; `fraccionUso` must accept a missing `iDias`.
- The odometer value stored for each past service is back-projected from the 12,400 km reading with the same `tasaDia` (`12,400 − tasaDia × (days_ago − 7)`), so `deltaKm` stays consistent with the projection.
- Exactly 4 seed `MaintenanceLog` entries matching those offsets: Aceite at Taller Ejemplo, $320, 52 days ago; Cadena lubricación y ajuste, hecho por mí, $60, 16 days ago; Frenos (balatas) at Taller Ejemplo, $280, 40 days ago; Bujía, hecho por mí, $95, 60 days ago.
- Phase 1 demo: `mostrarPromociones: true`; trial constant `PRUEBA_CLIENTES_GRATIS = 10` defined once (it is the example value of `N`, which survey item `B25` will calibrate); merchant demo numbers: 4 customers verified, 18 people saw the promotion, 7 arrived with a code.
- Reactive store (composable or `reactive` module). Optional `localStorage` persistence wrapped in try/catch. Any URL with `?seed=1` (all capture URLs include it) and the "Restablecer datos de prueba" button restore the seed. The simulator also offers "Empezar desde cero" (empty state, no vehicle) to exercise the onboarding guard.

### 5. App shell, phone frame and capture mode
- Desktop (`≥ 480px` wide, `clean` off): centered `390×844` frame plus a simulator toolbar **outside** the frame with: 6 links "Captura 1" to "Captura 6" (the exact URLs from the table below), "Restablecer datos de prueba", "Empezar desde cero", "Modo captura limpio", and a "Transmisión: Cadena / Banda CVT" switch.
- `?clean=1` or a viewport `< 480px`: no toolbar, no frame decoration, app fills the viewport, body background equals the app canvas. Once read, `clean` persists for the session (sessionStorage), so in-app navigation keeps it.
- Bottom navigation with exactly 3 tabs (`Inicio`, `Bitácora`, `Ajustes`), visible only on `/home`, `/history` and `/settings`. Every other route shows a top bar with a back button.
- Guards per `ROUTES.md §3`, with one documented prototype exception: `/onboarding` is always reachable (finishing it replaces the current vehicle). `/home`, `/history` and `/settings` redirect to `/onboarding` when there is no vehicle.

### 6. Routes and views
Driver app routes (`ROUTES.md`): `/onboarding`, `/home`, `/history`, `/history/:logId`, `/settings`, `/settings/intervals`, `/calibrate`, `/consumable/:id`, `/log-service`, `/export`. Prototype-only demo routes: `/notificaciones` (lockscreen) and `/comercio` (merchant view). Consumable ids: `aceite`, `transmision`, `frenos`, `bujia`, `llantas`.

- `/onboarding` (3 steps; `?paso=1|2|3` opens a step directly):
  - **Paso 1:** moto type (4 options, which deduce `transmision`, editable line "Transmisión: Cadena / Banda CVT"), optional nickname, and the 3 template cards.
  - **Paso 2:** in this order: a compact recap of the chosen moto type, "¿Cómo usas tu moto en un día normal?" (R1–R4, exact wording from `DOMAIN.md §5.1`), "¿Cuántos días a la semana la usas?" (4 options), the helper line "No necesitas saber de mecánica ni contar kilómetros.", then "¿Funciona tu odómetro?" (working: numeric field; broken: relative mode), and a secondary link "Ingresar km/día manualmente". The routine-first order is intentional for Captura 1; note it in the changelog.
  - **Paso 3:** last oil change in 1 tap (the 4 `ROUTES.md` options, worded without percentages). "Empezar seguimiento" saves and replaces the history entry with `/home`.
- `/home`: header (nickname, template, transmission badge, routine in words, "Ajustar uso" button opening `/calibrate`), priority banner in plain language, 5 cards (name, status badge, time-only runway, "Registrar" shortcut on Yellow and Red), and a persistent "Registrar servicio" button.
- `/calibrate`: a real route rendered as a Reka Dialog sheet on top of `/home`; closing navigates to `/home`. Working-odometer mode: numeric tablero input, then "Confirmar". Broken-odometer mode: "¿Cómo usaste tu moto esta semana?" with No la usé, Menos que de costumbre, Como siempre, Más que de costumbre, no numbers, plus the link "Cambié mi rutina".
- `/consumable/:id`: status, two percentage bars, which limit comes first, 3–4 plain bullets (cadena bullets vs CVT bullets as in `ROUTES.md §4.C.6`; CVT text says the belt is **not** lubricated), quick interval edit, recent logs for the item, "Agendar con mi taller" (toast), and the Phase 1 promotion card when the item is Yellow or Red and `mostrarPromociones` is on. The promotion card has separate badges "Promoción pagada" and "Próximamente", "Refaccionaria Ejemplo", "10% en cambio de aceite", code `ITN-482`, the line "Itinera no califica ni certifica talleres.", and a "Cómo llegar o escribir por WhatsApp" button (toast). No stars or ratings.
- `/log-service`: multi-select item chips (the transmission chip shows sub-options Lubricación y ajuste / Cambio de kit, or Inspección / Reemplazo de banda y rodillos), Preventivo vs Correctivo, "Hecho por mí" vs "Taller" (free-text workshop with suggestions from previous logs only), date and odometer (prefilled, editable), and a Reka Accordion "Más detalles (opcional)" with cost, note and simulated photo. "Guardar servicio" applies the reset rules, adds the log, shows the toast "Servicio guardado" and returns to the origin.
- `/history` and `/history/:logId`: count and total MXN, filters (Todos, Hecho por mí, Taller, and per item), "Exportar resumen gratis" button, chronological list. The detail view supports edit and delete with confirmation (Reka Dialog).
- `/export`: scope (Últimos 6 meses / Historial completo), "Incluir montos" switch, and a live preview: moto data, current status of the 5 items, and the service table (Fecha, Servicio, Quién lo hizo, Costo when enabled; no km column). "Compartir o guardar PDF" shows a toast. Free, no paywall.
- `/settings` and `/settings/intervals`: profile (nickname, type, transmission, template, routine, days), broken-odometer switch, "Mi taller de confianza" (text plus "Escanear QR del taller" demo), weekly check-in day and time, alerts (Yellow and Red or only Red), "Mostrar promociones de negocios cercanos" switch, local backup ("Guardar copia de respaldo" previewing the data as a file), "Restablecer datos de prueba". The intervals editor lists the 5 items (transmission with its two tasks) plus "Restablecer desde plantilla".
- `/notificaciones`: Android-style lockscreen (dark wallpaper, clock, date in Spanish) with two notifications from "Itinera":
  1. "¿Usaste tu moto como siempre esta semana?" with buttons Sí, Menos, Más. Tapping one applies the factor and shows the toast "Listo, lo tomamos en cuenta".
  2. "Tu aceite: te toca cambio en ~2 semanas. Ve juntando para el servicio." Tapping it opens `/consumable/aceite`.
- `/comercio`: a mobile web page for the shop owner (no browser URL bar): title "Comprobar clientes" with a "Próximamente" badge, field "Escribe el código del cliente" prefilled with `ITN-482`, "Comprobar código" button with result states Código válido / Ya usado / No encontrado, "Clientes comprobados gratis: 4 de 10", "Este mes: 18 personas vieron su promoción y 7 llegaron con código", the line "Al terminar la prueba eliges: cuota fija al mes o pago por cada cliente comprobado.", and a small card with the decorative QR labeled "Código QR de ejemplo" plus "Imprimir cartel" (toast).

### 7. Capture targets (critical path)
Each capture is the full `390×844` viewport at device scale factor 2 (PNG of 780×1688 px), after `document.fonts.ready`. Everything listed must be fully inside the first 844 px, without scrolling:

| File | URL | Must be fully visible |
| :--- | :--- | :--- |
| `captures/captura-1.png` | `/onboarding?paso=2&seed=1&clean=1` | "Paso 2 de 3", moto type recap, the routine question with its 4 options (R3 selected), the days question with its 4 options (5 o 6 selected), helper line, primary button |
| `captures/captura-2.png` | `/home?seed=1&clean=1` | Header, banner, all 5 cards (Aceite "Ve juntando, en ~2 semanas"; Cadena "Ya toca"; Frenos, Bujía, Llantas "Bien"), "Registrar servicio", bottom nav |
| `captures/captura-3.png` | `/notificaciones?seed=1&clean=1` | Clock and both notifications with the Sí, Menos and Más buttons |
| `captures/captura-4.png` | `/export?seed=1&clean=1` | Scope options, "Incluir montos" switch, preview header, all 4 service rows |
| `captures/captura-5.png` | `/consumable/aceite?seed=1&clean=1` | Status "Ve juntando", both percentage bars, the complete promotion card including code `ITN-482` and the disclaimer |
| `captures/captura-6.png` | `/comercio?seed=1&clean=1` | Code field, "Código válido" result, "4 de 10" counter, monthly report line, QR card |

- `scripts/verify.mjs` and `scripts/capture.mjs`: plain ESM JavaScript using `playwright` (dev dependency; install Chromium with `bunx playwright install chromium`), runnable with `bun` or, if bun cannot drive Playwright on this machine, with `node`. Both start from `bun run build` output served by `bun run preview`. `verify` runs every runtime check of spec Checks 7–8 and prints a JSON report; `capture` writes the 6 PNGs.

### 8. Verify and report
Run `bun install`, `bunx vue-tsc --noEmit`, `bun test`, `bun run build`, `bun run verify` and `bun run capture`, and fix everything until all pass. Look at the 6 PNGs yourself and fix crowding or tiny text before finishing. Write `.tickets/005-build-itinera-vue-prototype/changelog.md` with: the design plan (palette hex values, type scale, layout principle); installed versions of vite, @vitejs/plugin-vue, vue, vue-router, reka-ui, unocss, typescript, vue-tsc and playwright; any peer-dependency warnings verbatim; files created; routes implemented; verbatim outputs of every verification command, including the JSON report; the list of deviations (routine-first order in Paso 2, `/onboarding` guard exception, no-km display rules); "Doc follow-ups"; and a scope confirmation (`git status --short` output).

---

## Verification

Follow the objective criteria in [spec.md](spec.md).
