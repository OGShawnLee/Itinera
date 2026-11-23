# Changelog — Ticket 005 (Itinera Vue prototype)

## Initial repository state (Check 11, before any edit)

```
$ git status --short
(empty: clean worktree)

$ git log -1 --format=%H
8c2c1c62daa4a5361ffb2fa9a654f2a7cae27d7a
```

## Design plan (frontend-design pass 1: plan)

Subject: a phone app that tells motorcycle riders in Xalapa (novice, older and female riders included) which of five parts is fine, which needs saving up for, and which is due. Audience sees it first as a 390×844 screenshot inside a Google Form on their own phone, so the job is legibility at a glance.

Palette (named hex values, all exposed as semantic UnoCSS tokens):

| Token | Hex | Role |
| :--- | :--- | :--- |
| `canvas` | `#EDF1EE` | App background: Xalapa fog with a faint cloud-forest green tint |
| `surface` | `#FFFFFF` | Cards, sheets, fields |
| `ink` | `#1B2A27` | Main text, a deep moss charcoal (not a tinted near-black) |
| `ink-muted` | `#4B5A56` | Secondary text (7.0:1 on white) |
| `line` | `#CBD5D0` | Borders and dividers |
| `brand` | `#1D4E9E` | Road-sign blue: header panel, primary buttons |
| `brand-ink` | `#FFFFFF` | Text on brand |

Traffic-light groups (surface / text / border): `ok` `#E2F3E7` / `#1A6136` / `#8FCB9F`; `warn` `#FFF0C7` / `#6E4500` / `#E2AE3A`; `crit` `#FDE4E1` / `#9E1E19` / `#EC978F`. Each text value clears 4.5:1 on its own surface and on white.

Type: Satoshi (Fontshare) as the single family, weights 400/500/700. Scale in px: 13 (smallest caption, rare), 14 (secondary), 16 (body), 18 (card titles), 22 (screen titles), 28 (the motorcycle nickname). Body line-height 1.4; titles 1.2 with slight negative tracking. Sentence case everywhere, no all-caps labels.

Layout principle: one left-aligned column with a 16px gutter; the screen answers its question in the top half and the one primary action sits in a sticky thumb-zone footer. Status is always shape + word + color. Cards use borders instead of shadows; radius follows hierarchy (header panel 24, cards 16, controls 12, badges pill).

```
/home                        /consumable/aceite
┌──────────────────────┐     ┌──────────────────────┐
│ [blue panel]         │     │ ‹  Aceite de motor   │
│ Mi FT150   Ajustar uso│     │ ▲ Ve juntando        │
│ Urbana · Cadena badges│     │ Por recorrido ████░  │
│ Varios viajes, 5 o 6 │     │ Por tiempo    ███░░  │
├──────────────────────┤     │ ┌ promo card ──────┐ │
│ banner: what is due  │     │ │ badges, code     │ │
│ ● Aceite  ▲ Ve junt. │     │ └──────────────────┘ │
│ ■ Cadena  ⬣ Ya toca  │     │ bullets…             │
│ ● Frenos  ● Bien  …  │     ├──────────────────────┤
├──────────────────────┤     │ [Registrar servicio] │
│ [Registrar servicio] │     └──────────────────────┘
│ Inicio Bitácora Ajust│
└──────────────────────┘
```

Principles: borrow the riders' own visual vernacular, Mexican road signage, instead of app-kit chrome. The one bold move is the status shapes: a circle for "Bien", a warning triangle for "Ve juntando" and a stop-sign octagon for "Ya toca", paired with the word and the color, so status never depends on color alone. Everything else stays quiet: white surfaces, thin borders, plain verbs.

### Review against the brief (pass 2)

- First draft used a navy-and-slate "blue SaaS" palette with grey shadows under every card. That is the generic default for any utility app, so the neutrals were moved to fog/moss tones taken from Xalapa's climate and shadows were dropped in favour of borders, keeping shadow only on the sticky footer that actually floats.
- First draft put an eyebrow label ("TU MOTO") above the header. Removed: the nickname is already the label.
- First draft joined template, transmission and routine with middle dots. Replaced by separate badges plus a sentence for the routine (Display Rule 5).
- Kept the road-sign blue for the brand because it is subject-specific (the blue of Mexican information signs) and it stays distinct from the three traffic-light hues.

## Critique pass (frontend-design pass 4)

I took screenshots of every capture and of the non-capture screens and fixed what read as crowded or broken:

- Capture 4: the date ran into the service name and "Aceite de motor" was truncated in the status grid. Dates now read "6 nov" (year only when it differs from the current one), the status grid uses short names, and the columns were rebalanced so "Hecho por mí" and "Quién lo hizo" stay on one line.
- Capture 5: `ITN-482` wrapped onto two lines and the WhatsApp button wrapped. The code is now `nowrap` and the button lost its icon so the full label fits.
- Capture 1: half-cut text peeked above the sticky footer. Every sticky footer now has a 40px fade from the canvas color, which replaces the footer shadow from the plan. Shadows now remain only on toasts and the selected segment of the export period control.
- `/calibrate`: Reka auto-focused the close button, which drew a heavy focus ring. The sheet now focuses its first field or option instead.
- Simulator toolbar: widened so "Restablecer datos de prueba" stays on one line.

The one deliberate bold move stayed: road-sign shapes for status (circle "Bien", warning triangle "Ve juntando", stop octagon "Ya toca"), always paired with the word and the color.

## Installed versions (Check 1 dependencies)

| Package | Version |
| :--- | :--- |
| vite | 8.3.8 |
| @vitejs/plugin-vue | 6.0.11 (peer range `^5 \|\| ^6 \|\| ^7 \|\| ^8`) |
| vue | 3.5.46 |
| vue-router | 4.6.5 |
| reka-ui | 2.11.0 |
| unocss | 66.13.0 (`@unocss/vite` peer range includes `^8.0.0-0`) |
| @unocss/reset | 66.13.0 |
| typescript | 6.0.3 |
| vue-tsc | 3.3.14 |
| playwright | 1.65.1 (Chromium installed with `bunx playwright install chromium`) |
| @types/bun | 1.4.5 (types for `bun:test` in the single tsconfig) |

Two install notes. `bun add vue-router` resolved to 5.5.1, which is outside the required `^4`, so it was re-added as `vue-router@^4` (4.6.5). `bun add -d typescript` resolved to 7.0.2, the native Go compiler, which ships no `lib/typescript.js` JavaScript API; `vue-tsc` needs that API, so TypeScript was pinned to `^6` (6.0.3, the latest release with the JS API). Neither `@unocss/preset-web-fonts` nor any QR library is installed.

## Peer-dependency warnings

none

`bun install` printed no peer warnings. The declared peer ranges of `@vitejs/plugin-vue` and `@unocss/vite` both include Vite 8, so no Vite 7 fallback was needed.

## Files created

All under `prototype/` (plus this changelog):

```
.gitignore, bun.lock, package.json, index.html, tsconfig.json, uno.config.ts, vite.config.ts
captures/captura-1.png … captura-6.png
scripts/lib.mjs, scripts/verify.mjs, scripts/capture.mjs
src/main.ts, src/App.vue, src/router.ts, src/env.d.ts, src/store.ts
src/data/seed.ts
src/domain/types.ts, fechas.ts, reglas.ts, catalogo.ts, vehiculo.ts, servicio.ts, textos.ts
src/domain/reglas.test.ts, src/domain/seed.test.ts
src/components/AppScreen.vue, BottomNav.vue, ConfirmDialog.vue, Icon.vue, OptionItem.vue, PromoCard.vue,
  QrDemo.vue, SimToolbar.vue, StatusBadge.vue, StatusShape.vue, SwitchRow.vue, ToastHost.vue, TopBar.vue, UsageBar.vue
src/views/OnboardingView.vue, HomeView.vue, CalibrateView.vue, ConsumableView.vue, LogServiceView.vue,
  HistoryView.vue, LogDetailView.vue, ExportView.vue, SettingsView.vue, IntervalsView.vue,
  NotificacionesView.vue, ComercioView.vue
```

`package.json` scripts: `dev`, `build`, `preview` (`vite preview --port 4173 --strictPort`), `typecheck`, `test`, `verify` (`bun scripts/verify.mjs`) and `capture` (`bun scripts/capture.mjs`). Bun drives Playwright on this machine, so the node fallback was not needed; both scripts also run under `node`.

## Routes implemented

`/onboarding` (with `?paso=1|2|3`), `/home`, `/history`, `/history/:logId`, `/settings`, `/settings/intervals`, `/calibrate` (Reka Dialog sheet over `/home`), `/consumable/:id` (`aceite`, `transmision`, `frenos`, `bujia`, `llantas`), `/log-service` (optional `?consumableId=`), `/export`, plus the prototype-only `/notificaciones` (lockscreen) and `/comercio` (merchant view). `/` redirects to `/home` and a catch-all redirects to `/home`. Guards: every driver route requires a vehicle and redirects to `/onboarding`; invalid consumable ids go to `/home` and missing log ids to `/history`.

Design tokens: `theme.colors` defines `canvas`, `surface`, `ink` (+`muted`), `line` (+`strong`), `brand` (+`ink`, `soft`, `tint`), `ok`/`warn`/`crit` (each `surface`, `text`, `border`, plus `solid` for the status shapes) and `lock` for the lockscreen. 22 shortcuts are defined and each is used under `src/` (`focus-ring`, `card`, `section-title`, `screen-title`, `label-text`, `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-danger`, `badge`, `badge-ok`, `badge-warn`, `badge-crit`, `badge-neutral`, `field`, `chip`, `tab-item`, `option-card`, `radio-dot`, `switch-root`, `switch-thumb`, `row-tap`). `theme.fontSize.xs` is redefined as 13px so nothing can render smaller.

Domain notes: one month is 30 days. The 4-week rolling average pads unanswered weeks with factor 1.0. A tablero reading in `/calibrate` adds the observed rate ratio (clamped 0–2) to that average and resets `Km_base`. Current cycle references are derived from the onboarding/seed references overlaid by preventive logs, so editing or deleting a log recalculates the traffic light; correctivo logs do not reset counters. The "Personalizada" template starts from the Moto Urbana values as its editable baseline.

## Static checks (Checks 1, 3 and 4)

```
$ grep -c "presetWind3()" uno.config.ts        -> 1
$ grep -c "presetUno" uno.config.ts            -> 0
$ grep -n "fontFamily" uno.config.ts           -> 20:    fontFamily: { sans: 'Satoshi, ui-sans-serif, system-ui, sans-serif' },
$ grep -rEn "#[0-9a-fA-F]{3,8}\b" src --include=*.vue                                  -> (no matches, exit 1)
$ grep -rEn "(text|bg|border)-(red|yellow|green|amber|emerald|rose|gray|slate)-[0-9]" src -> (no matches, exit 1)
shortcut usage (files under src/ containing the name):
focus-ring=6 card=9 section-title=9 screen-title=5 label-text=4 btn-primary=11 btn-secondary=11 btn-ghost=3 btn-danger=3 badge=6 badge-ok=1 badge-warn=1 badge-crit=1 badge-neutral=3 field=8 chip=3 tab-item=1 option-card=1 radio-dot=1 switch-root=2 switch-thumb=2 row-tap=5
reka-ui imports (files importing each name from 'reka-ui'):
DialogRoot=3 DialogPortal=3 DialogContent=3 DialogTitle=3 DialogDescription=3 RadioGroupRoot=5 RadioGroupItem=1 SwitchRoot=2 SwitchThumb=2 AccordionRoot=2 AccordionItem=2 ToggleGroupRoot=2 ToggleGroupItem=2
files using DialogContent without DialogTitle: (none)
$ grep -rn 'to="#sheet-root"' src | wc -l      -> 3
$ grep -n "fontshare" index.html
8:    <link rel="preconnect" href="https://api.fontshare.com" crossorigin />
9:    <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
$ grep -n "preset-web-fonts\|qrcode\|\"qr" package.json -> (no matches, exit 1)
```

## Verification outputs (Checks 2, 6, 7, 8 and 10)

Run inside `prototype/` in this order. ANSI color codes were stripped from the build output; nothing else was edited.

### `bun install`

```
$ bun install
bun install v1.4.4 (38afee6c8)

Checked 142 installs across 192 packages (no changes) [852.00ms]
[exit 0]
```

### `bunx vite --version`

```
$ bunx vite --version
vite/8.3.8 win32-x64 node-v24.13.0
[exit 0]
```

### `bunx vue-tsc --noEmit`

```
$ bunx vue-tsc --noEmit
[exit 0]
```

### `bun test`

```
$ bun test
bun test v1.4.4 (38afee6c8)

 20 pass
 0 fail
 56 expect() calls
Ran 20 tests across 2 files. [332.00ms]
[exit 0]
```

### `bun run build`

```
$ bun run build
$ vite build
vite v8.3.8 building client environment for production...
transforming...
✓ 718 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                        0.81 kB │ gzip:  0.42 kB
dist/assets/index-BXuq0bcv.css                        29.40 kB │ gzip:  5.71 kB
dist/assets/handleAndDispatchCustomEvent-Bng2rRDf.js   0.17 kB │ gzip:  0.15 kB
dist/assets/getActiveElement-DWEoD8ZB.js               0.18 kB │ gzip:  0.13 kB
dist/assets/useId-DRixX9U5.js                          0.24 kB │ gzip:  0.20 kB
dist/assets/SwitchRow-Bj7MGCzn.js                      0.84 kB │ gzip:  0.52 kB
dist/assets/useSingleOrMultipleValue-Bx1w2Or3.js       0.98 kB │ gzip:  0.48 kB
dist/assets/StatusShape-4bgKawj3.js                    1.17 kB │ gzip:  0.56 kB
dist/assets/ConfirmDialog-D_X15vYU.js                  1.27 kB │ gzip:  0.71 kB
dist/assets/textos-DDJN81Jm.js                         1.41 kB │ gzip:  0.70 kB
dist/assets/servicio-Jicb0Jgg.js                       1.41 kB │ gzip:  0.73 kB
dist/assets/AppScreen-lO9s2w3J.js                      2.35 kB │ gzip:  1.20 kB
dist/assets/IntervalsView-D-hmfUcZ.js                  2.56 kB │ gzip:  1.30 kB
dist/assets/Icon-OSZr-ul_.js                           2.87 kB │ gzip:  1.08 kB
dist/assets/Presence-DFKKWqak.js                       3.32 kB │ gzip:  1.49 kB
dist/assets/useDirection-CQZMYPkz.js                   3.32 kB │ gzip:  1.46 kB
dist/assets/NotificacionesView-BibCmChX.js             3.39 kB │ gzip:  1.60 kB
dist/assets/HistoryView-Cxy_gqRW.js                    3.53 kB │ gzip:  1.69 kB
dist/assets/ToggleGroupItem-D374Wrfq.js                3.63 kB │ gzip:  1.35 kB
dist/assets/HomeView-DPvjsquB.js                       3.94 kB │ gzip:  1.79 kB
dist/assets/ExportView-36Dc8Vic.js                     4.46 kB │ gzip:  2.15 kB
dist/assets/CalibrateView-J3_5-sJh.js                  4.80 kB │ gzip:  2.13 kB
dist/assets/LogDetailView-Dp-ZCAiH.js                  4.83 kB │ gzip:  1.97 kB
dist/assets/Primitive-BkwIS1iC.js                      4.86 kB │ gzip:  2.27 kB
dist/assets/ComercioView-BuBvV3XZ.js                   5.02 kB │ gzip:  2.36 kB
dist/assets/RovingFocusItem-Bd9NDyKb.js                5.85 kB │ gzip:  2.32 kB
dist/assets/OptionItem-BjFAyHrL.js                     5.92 kB │ gzip:  2.16 kB
dist/assets/LogServiceView-CnpZfCWY.js                 6.79 kB │ gzip:  2.65 kB
dist/assets/OnboardingView-CtdWr_Ke.js                 8.08 kB │ gzip:  3.00 kB
dist/assets/ConsumableView-hMoGYbVn.js                 8.34 kB │ gzip:  3.38 kB
dist/assets/AccordionTrigger-jy9yHaQm.js               9.05 kB │ gzip:  2.92 kB
dist/assets/SettingsView-sOihBZbe.js                   9.08 kB │ gzip:  3.22 kB
dist/assets/DialogTitle-DGcEfABW.js                   21.56 kB │ gzip:  6.65 kB
dist/assets/index-Dc_tcb6F.js                         55.92 kB │ gzip: 21.42 kB
dist/assets/store-V9ysPZa4.js                         77.58 kB │ gzip: 30.49 kB

✓ built in 2.89s
[exit 0]
```


### `bun run verify` (Checks 3–5 and 7–9, full JSON report)

The report shows `"ok": true` with an empty `fallas` list. Each capture entry lists the Satoshi check, `scrollWidth`, the smallest rendered font size, controls under 44px, any kilometer match, missing required strings, elements not fully inside the first 844px, horizontal overflow and whether the simulator toolbar is in the DOM. I also ran `bun scripts/verify.mjs --dev` against the Vite dev server, where Vue emits `[Vue warn]` messages; it also passed with zero errors and zero warnings on every route.

```
$ bun run verify
$ bun scripts/verify.mjs
$ vite build
vite v8.3.8 building client environment for production...
transforming...
✓ 718 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                        0.81 kB │ gzip:  0.42 kB
dist/assets/index-BXuq0bcv.css                        29.40 kB │ gzip:  5.71 kB
dist/assets/handleAndDispatchCustomEvent-Bng2rRDf.js   0.17 kB │ gzip:  0.15 kB
dist/assets/getActiveElement-DWEoD8ZB.js               0.18 kB │ gzip:  0.13 kB
dist/assets/useId-DRixX9U5.js                          0.24 kB │ gzip:  0.20 kB
dist/assets/SwitchRow-Bj7MGCzn.js                      0.84 kB │ gzip:  0.52 kB
dist/assets/useSingleOrMultipleValue-Bx1w2Or3.js       0.98 kB │ gzip:  0.48 kB
dist/assets/StatusShape-4bgKawj3.js                    1.17 kB │ gzip:  0.56 kB
dist/assets/ConfirmDialog-D_X15vYU.js                  1.27 kB │ gzip:  0.71 kB
dist/assets/textos-DDJN81Jm.js                         1.41 kB │ gzip:  0.70 kB
dist/assets/servicio-Jicb0Jgg.js                       1.41 kB │ gzip:  0.73 kB
dist/assets/AppScreen-lO9s2w3J.js                      2.35 kB │ gzip:  1.20 kB
dist/assets/IntervalsView-D-hmfUcZ.js                  2.56 kB │ gzip:  1.30 kB
dist/assets/Icon-OSZr-ul_.js                           2.87 kB │ gzip:  1.08 kB
dist/assets/Presence-DFKKWqak.js                       3.32 kB │ gzip:  1.49 kB
dist/assets/useDirection-CQZMYPkz.js                   3.32 kB │ gzip:  1.46 kB
dist/assets/NotificacionesView-BibCmChX.js             3.39 kB │ gzip:  1.60 kB
dist/assets/HistoryView-Cxy_gqRW.js                    3.53 kB │ gzip:  1.69 kB
dist/assets/ToggleGroupItem-D374Wrfq.js                3.63 kB │ gzip:  1.35 kB
dist/assets/HomeView-DPvjsquB.js                       3.94 kB │ gzip:  1.79 kB
dist/assets/ExportView-36Dc8Vic.js                     4.46 kB │ gzip:  2.15 kB
dist/assets/CalibrateView-J3_5-sJh.js                  4.80 kB │ gzip:  2.13 kB
dist/assets/LogDetailView-Dp-ZCAiH.js                  4.83 kB │ gzip:  1.97 kB
dist/assets/Primitive-BkwIS1iC.js                      4.86 kB │ gzip:  2.27 kB
dist/assets/ComercioView-BuBvV3XZ.js                   5.02 kB │ gzip:  2.36 kB
dist/assets/RovingFocusItem-Bd9NDyKb.js                5.85 kB │ gzip:  2.32 kB
dist/assets/OptionItem-BjFAyHrL.js                     5.92 kB │ gzip:  2.16 kB
dist/assets/LogServiceView-CnpZfCWY.js                 6.79 kB │ gzip:  2.65 kB
dist/assets/OnboardingView-CtdWr_Ke.js                 8.08 kB │ gzip:  3.00 kB
dist/assets/ConsumableView-hMoGYbVn.js                 8.34 kB │ gzip:  3.38 kB
dist/assets/AccordionTrigger-jy9yHaQm.js               9.05 kB │ gzip:  2.92 kB
dist/assets/SettingsView-sOihBZbe.js                   9.08 kB │ gzip:  3.22 kB
dist/assets/DialogTitle-DGcEfABW.js                   21.56 kB │ gzip:  6.65 kB
dist/assets/index-Dc_tcb6F.js                         55.92 kB │ gzip: 21.42 kB
dist/assets/store-V9ysPZa4.js                         77.58 kB │ gzip: 30.49 kB

✓ built in 10.15s
[PLUGIN_TIMINGS] JavaScript callbacks ran for 7.2s of this 10.1s build (71%).
The slowest callbacks, timed inside each callback (the wait before a callback starts is excluded, the time it awaits is included):
  - plugin vite:build-import-analysis generateBundle (36%, 3.7s, 1 call)
Additional callback time came from the callbacks below and from callbacks under 1s.
1 callback is listed without a time. Its calls overlapped, so the time inside one call includes work from other calls. To find its cost, profile the build with `node --cpu-prof`:
  - plugin vite:css transform (2 calls)
See https://rolldown.rs/reference/InputOptions.checks#bundlertimings for more details.

{
  "modo": "preview",
  "checks": {
    "rutasRegistradas": {
      "rutas": [
        "/",
        "/onboarding",
        "/home",
        "/history",
        "/history/:logId",
        "/settings",
        "/settings/intervals",
        "/calibrate",
        "/consumable/:id",
        "/log-service",
        "/export",
        "/notificaciones",
        "/comercio",
        "/:pathMatch(.*)*"
      ],
      "faltan": [],
      "sobran": [],
      "prohibidas": []
    },
    "rutas": {
      "/onboarding": {
        "path": "/onboarding",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/onboarding?paso=2": {
        "path": "/onboarding",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/onboarding?paso=3": {
        "path": "/onboarding",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/home": {
        "path": "/home",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/history": {
        "path": "/history",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/history/r-aceite": {
        "path": "/history/r-aceite",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/settings": {
        "path": "/settings",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/settings/intervals": {
        "path": "/settings/intervals",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/calibrate": {
        "path": "/calibrate",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/consumable/aceite": {
        "path": "/consumable/aceite",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/consumable/transmision": {
        "path": "/consumable/transmision",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/consumable/frenos": {
        "path": "/consumable/frenos",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/consumable/bujia": {
        "path": "/consumable/bujia",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/consumable/llantas": {
        "path": "/consumable/llantas",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/log-service": {
        "path": "/log-service",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/export": {
        "path": "/export",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/notificaciones": {
        "path": "/notificaciones",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      },
      "/comercio": {
        "path": "/comercio",
        "errores": 0,
        "prohibidas": [],
        "externos": [],
        "estrellas": false
      }
    },
    "linksIndexHtml": [
      "https://api.fontshare.com",
      "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
    ],
    "capturas": {
      "captura-1.png": {
        "url": "/onboarding?paso=2&seed=1&clean=1",
        "satoshi": true,
        "scrollWidth": 390,
        "fuenteMinimaPx": 14,
        "textosMenoresA13": [],
        "controlesMenoresA44": [],
        "kilometros": null,
        "requeridosFaltantes": [],
        "noVisibles": [],
        "elementosVerificados": 16,
        "fueraHorizontal": [],
        "toolbarEnDom": false,
        "errores": [],
        "ok": true
      },
      "captura-2.png": {
        "url": "/home?seed=1&clean=1",
        "satoshi": true,
        "scrollWidth": 390,
        "fuenteMinimaPx": 14,
        "textosMenoresA13": [],
        "controlesMenoresA44": [],
        "kilometros": null,
        "requeridosFaltantes": [],
        "noVisibles": [],
        "elementosVerificados": 12,
        "fueraHorizontal": [],
        "toolbarEnDom": false,
        "errores": [],
        "ok": true
      },
      "captura-3.png": {
        "url": "/notificaciones?seed=1&clean=1",
        "satoshi": true,
        "scrollWidth": 390,
        "fuenteMinimaPx": 13,
        "textosMenoresA13": [],
        "controlesMenoresA44": [],
        "kilometros": null,
        "requeridosFaltantes": [],
        "noVisibles": [],
        "elementosVerificados": 6,
        "fueraHorizontal": [],
        "toolbarEnDom": false,
        "errores": [],
        "ok": true
      },
      "captura-4.png": {
        "url": "/export?seed=1&clean=1",
        "satoshi": true,
        "scrollWidth": 390,
        "fuenteMinimaPx": 14,
        "textosMenoresA13": [],
        "controlesMenoresA44": [],
        "kilometros": null,
        "requeridosFaltantes": [],
        "noVisibles": [],
        "elementosVerificados": 9,
        "fueraHorizontal": [],
        "toolbarEnDom": false,
        "errores": [],
        "ok": true
      },
      "captura-5.png": {
        "url": "/consumable/aceite?seed=1&clean=1",
        "satoshi": true,
        "scrollWidth": 390,
        "fuenteMinimaPx": 14,
        "textosMenoresA13": [],
        "controlesMenoresA44": [],
        "kilometros": null,
        "requeridosFaltantes": [],
        "noVisibles": [],
        "elementosVerificados": 2,
        "fueraHorizontal": [],
        "toolbarEnDom": false,
        "errores": [],
        "ok": true
      },
      "captura-6.png": {
        "url": "/comercio?seed=1&clean=1",
        "satoshi": true,
        "scrollWidth": 390,
        "fuenteMinimaPx": 14,
        "textosMenoresA13": [],
        "controlesMenoresA44": [],
        "kilometros": null,
        "requeridosFaltantes": [],
        "noVisibles": [],
        "elementosVerificados": 7,
        "fueraHorizontal": [],
        "toolbarEnDom": false,
        "errores": [],
        "ok": true
      }
    },
    "hojaDentroDelMarco": {
      "marco": {
        "left": 625,
        "top": 58,
        "right": 1015,
        "bottom": 902
      },
      "hoja": {
        "left": 625,
        "top": 616,
        "right": 1015,
        "bottom": 902
      },
      "toolbar": true,
      "dentro": true
    },
    "interacciones": {
      "notificaciones": {
        "toast": true,
        "navegaA": "/consumable/aceite"
      },
      "calibrar": {
        "url": "/calibrate",
        "camposNumericosConOdometro": 1,
        "switchSinOdometro": "true",
        "opciones": [
          "No la usé",
          "Menos que de costumbre",
          "Como siempre",
          "Más que de costumbre"
        ],
        "camposNumericosSinOdometro": 0
      },
      "registrarAceite": {
        "preventivo": "true",
        "toast": true,
        "tarjetaAceite": "Aceite de motor Bien Toca en ~2 meses",
        "filasBitacora": 5
      },
      "incluirMontos": {
        "conMontos": true,
        "alApagar": "sin $",
        "alEncender": true
      },
      "bandaCVT": {
        "tarjeta": "Banda CVT Bien Toca en ~4 meses",
        "muestraBandaCVT": true,
        "muestraCadena": false
      },
      "desdeCero": {
        "url": "/onboarding"
      }
    }
  },
  "fallas": [],
  "ok": true
}
[exit 0]
```

### `bun run capture` (Check 10)

PNG sizes are read from each file's IHDR chunk.

```
$ bun run capture
$ bun scripts/capture.mjs
$ vite build
vite v8.3.8 building client environment for production...
transforming...
✓ 718 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                        0.81 kB │ gzip:  0.42 kB
dist/assets/index-BXuq0bcv.css                        29.40 kB │ gzip:  5.71 kB
dist/assets/handleAndDispatchCustomEvent-Bng2rRDf.js   0.17 kB │ gzip:  0.15 kB
dist/assets/getActiveElement-DWEoD8ZB.js               0.18 kB │ gzip:  0.13 kB
dist/assets/useId-DRixX9U5.js                          0.24 kB │ gzip:  0.20 kB
dist/assets/SwitchRow-Bj7MGCzn.js                      0.84 kB │ gzip:  0.52 kB
dist/assets/useSingleOrMultipleValue-Bx1w2Or3.js       0.98 kB │ gzip:  0.48 kB
dist/assets/StatusShape-4bgKawj3.js                    1.17 kB │ gzip:  0.56 kB
dist/assets/ConfirmDialog-D_X15vYU.js                  1.27 kB │ gzip:  0.71 kB
dist/assets/textos-DDJN81Jm.js                         1.41 kB │ gzip:  0.70 kB
dist/assets/servicio-Jicb0Jgg.js                       1.41 kB │ gzip:  0.73 kB
dist/assets/AppScreen-lO9s2w3J.js                      2.35 kB │ gzip:  1.20 kB
dist/assets/IntervalsView-D-hmfUcZ.js                  2.56 kB │ gzip:  1.30 kB
dist/assets/Icon-OSZr-ul_.js                           2.87 kB │ gzip:  1.08 kB
dist/assets/Presence-DFKKWqak.js                       3.32 kB │ gzip:  1.49 kB
dist/assets/useDirection-CQZMYPkz.js                   3.32 kB │ gzip:  1.46 kB
dist/assets/NotificacionesView-BibCmChX.js             3.39 kB │ gzip:  1.60 kB
dist/assets/HistoryView-Cxy_gqRW.js                    3.53 kB │ gzip:  1.69 kB
dist/assets/ToggleGroupItem-D374Wrfq.js                3.63 kB │ gzip:  1.35 kB
dist/assets/HomeView-DPvjsquB.js                       3.94 kB │ gzip:  1.79 kB
dist/assets/ExportView-36Dc8Vic.js                     4.46 kB │ gzip:  2.15 kB
dist/assets/CalibrateView-J3_5-sJh.js                  4.80 kB │ gzip:  2.13 kB
dist/assets/LogDetailView-Dp-ZCAiH.js                  4.83 kB │ gzip:  1.97 kB
dist/assets/Primitive-BkwIS1iC.js                      4.86 kB │ gzip:  2.27 kB
dist/assets/ComercioView-BuBvV3XZ.js                   5.02 kB │ gzip:  2.36 kB
dist/assets/RovingFocusItem-Bd9NDyKb.js                5.85 kB │ gzip:  2.32 kB
dist/assets/OptionItem-BjFAyHrL.js                     5.92 kB │ gzip:  2.16 kB
dist/assets/LogServiceView-CnpZfCWY.js                 6.79 kB │ gzip:  2.65 kB
dist/assets/OnboardingView-CtdWr_Ke.js                 8.08 kB │ gzip:  3.00 kB
dist/assets/ConsumableView-hMoGYbVn.js                 8.34 kB │ gzip:  3.38 kB
dist/assets/AccordionTrigger-jy9yHaQm.js               9.05 kB │ gzip:  2.92 kB
dist/assets/SettingsView-sOihBZbe.js                   9.08 kB │ gzip:  3.22 kB
dist/assets/DialogTitle-DGcEfABW.js                   21.56 kB │ gzip:  6.65 kB
dist/assets/index-Dc_tcb6F.js                         55.92 kB │ gzip: 21.42 kB
dist/assets/store-V9ysPZa4.js                         77.58 kB │ gzip: 30.49 kB

✓ built in 2.88s
captura-1.png  780x1688  satoshi=true  url=/onboarding?paso=2&seed=1&clean=1  OK
captura-2.png  780x1688  satoshi=true  url=/home?seed=1&clean=1  OK
captura-3.png  780x1688  satoshi=true  url=/notificaciones?seed=1&clean=1  OK
captura-4.png  780x1688  satoshi=true  url=/export?seed=1&clean=1  OK
captura-5.png  780x1688  satoshi=true  url=/consumable/aceite?seed=1&clean=1  OK
captura-6.png  780x1688  satoshi=true  url=/comercio?seed=1&clean=1  OK
[exit 0]
```

I inspected all six PNGs. Every one is readable at phone size, has no overlapping elements, shows no kilometers and keeps everything required above the fold.

## Deviations

- Paso 2 asks the routine first, then days per week, then the odometer question. This is the reverse of `ROUTES.md §4.A.1` (odometer first), done on purpose so Captura 1 shows the routine and days questions above the fold.
- `/onboarding` is always reachable, even with a vehicle, instead of only when `COUNT(Vehicle) == 0`. Finishing it replaces the current vehicle and clears its logs, so the team can rerun the flow during demos.
- No estimated kilometers in the display. Runway on `/home`, banners and notifications is time only ("en ~2 semanas", "venció hace ~3 días"). `/home` shows the routine in words instead of `Km_proyectado`. `/consumable/:id` shows "Por recorrido" and "Por tiempo" as percentages. Kilometers appear only in `/calibrate` (working-odometer mode, the real tablero reading), the odometer field of `/log-service`, `/settings/intervals` and the collapsed "Cambiar cada cuánto toca" editor on `/consumable/:id`, which holds plan values. The `/export` table has no km column and `/history` rows omit the odometer.
- No Vite fallback: Vite 8.3.8 builds, previews and runs dev without errors or warnings.
- TypeScript is 6.0.3 rather than the `latest` tag (7.0.2), because `vue-tsc` cannot run on the native TypeScript 7 compiler.
- `/notificaciones` and `/comercio` have no app top bar. They imitate a lockscreen and a separate web page for the shop owner, so app chrome would be wrong there. The lockscreen offers "Abrir Itinera" to go to `/home`.
- `/calibrate` renders `/home` under the sheet with a "Mi moto" top bar instead of the bottom nav, so the bottom nav stays limited to `/home`, `/history` and `/settings`.
- `/comercio` opens already showing the result of checking the prefilled `ITN-482` ("Código válido"), so Captura 6 shows a result without scripted clicks. Checking it again returns "Ya usado"; unknown codes return "No encontrado"; `ITN-517` and `ITN-903` are additional valid demo codes.
- The CVT bullet says "La banda trabaja en seco: no lleva aceite ni grasa" rather than "no se lubrica", because Check 6 forbids the substring `lubric` in CVT bullets while the task asks the text to say the belt is not lubricated.

## Doc follow-ups

These are contradictions between the canonical docs and the survey display rules. I did not edit the docs.

- `ROUTES.md §4.B.2` (`/home`) asks for the `Km_proyectado(t)` reading in the header, state labels `Óptimo / Preventivo / Crítico` and runway as "Faltan ~X km o Y días". Survey rule AUD-5 and `MARKET_STUDY.md §2.3` forbid estimated kilometers and want the labels "Bien / Ve juntando / Ya toca". The banner example "(~280 km o 4 días)" has the same problem. Suggest updating §4.B.2 to time-only runway, the routine in words and the plain labels.
- `ROUTES.md §4.C.6` (`/consumable/:id`) describes the dual reading as `ΔKm / I_km` and "Vence primero por kilometraje". Suggest percentages labeled "Por recorrido" and "Por tiempo" and the wording "Vence primero por recorrido".
- `ROUTES.md §4.C.5` shows the projected odometer (`~12,970 km`) in working-odometer mode. The prototype shows only the last real tablero reading, which the user did read, and never the projection.
- `ROUTES.md §4.C.9` lists a `km` column in the export table. The prototype omits it per the no-km rule.
- `ROUTES.md §4.A.1` orders Paso 2 as odometer, then routine, then days. The prototype asks routine first for Captura 1 (see Deviations).
- `ROUTES.md §3` limits `/onboarding` to `COUNT(Vehicle) == 0`. The prototype keeps it always reachable (see Deviations).
- `ROUTES.md §4.D.12` lists the merchant result states as "Válido / Ya usado / Vencido". The ticket asks for "Código válido / Ya usado / No encontrado", which is what the prototype implements.
- `DOMAIN.md §5.5` lists the Personalizada template as "Editable desde cero" without starting values. The prototype starts it from the Moto Urbana values; the docs could state that.

## Scope confirmation (Check 11)

```
$ git status --short        (after finishing, at the repo root)
 M .tickets/006-create-google-forms-scripts/task.md
?? .tickets/005-build-itinera-vue-prototype/changelog.md
?? .tickets/006-create-google-forms-scripts/reference.gs
?? prototype/

$ git log -1 --format=%H
8c2c1c62daa4a5361ffb2fa9a654f2a7cae27d7a
```

The `HEAD` hash is unchanged from the initial state (`8c2c1c62daa4a5361ffb2fa9a654f2a7cae27d7a`); nothing was committed or pushed. The initial status was empty. My changes are limited to `prototype/` and this changelog.

The listing also shows `M .tickets/006-create-google-forms-scripts/task.md` and `?? .tickets/006-create-google-forms-scripts/reference.gs`. I did not create or edit either file: their timestamps (22:14:38 and 22:20:01 local time) fall inside this session, but none of my commands touched `.tickets/006`, which this ticket marks out of scope. They appear to come from parallel work on ticket 006, so I left them as they are.
