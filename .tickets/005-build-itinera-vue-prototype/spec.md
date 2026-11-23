# Specification for Ticket 005 — Build Itinera Interactive Vue Prototype

Every check is objective: it is satisfied by a command exit code, a file or grep result, or a value measured by `prototype/scripts/verify.mjs` in Chromium at a `390×844` viewport. "Capture URLs" means the 6 URLs in `task.md §7`. All commands run inside `prototype/` unless stated otherwise. The changelog must include the verbatim output of each command.

## Objective Checks

- [ ] Check 1 — Project structure: `prototype/` contains `package.json`, `bun.lock`, `.gitignore`, `vite.config.ts`, `tsconfig.json` (single file, `"strict": true`, no `references`), `uno.config.ts`, `index.html` (`lang="es-MX"`), `src/main.ts`, `src/App.vue`, `src/router.ts`, `src/env.d.ts`, `src/domain/`, `src/data/seed.ts`, `scripts/verify.mjs`, `scripts/capture.mjs`. `package.json` defines scripts `dev`, `build`, `preview`, `typecheck`, `test`, `verify`, `capture` and lists `vite`, `@vitejs/plugin-vue`, `vue`, `vue-router`, `reka-ui`, `unocss`, `@unocss/reset`, `typescript`, `vue-tsc` and `playwright`. It does **not** list `@unocss/preset-web-fonts` or any QR library.

- [ ] Check 2 — Toolchain:
  - `bun install` exits 0 (peer warnings allowed only if copied verbatim into the changelog).
  - `bunx vite --version` prints a version starting with `vite/8.` (or the changelog documents the Vite 7 fallback with the failing build error, per `task.md`).
  - `bunx vue-tsc --noEmit` exits 0.
  - `bun test` exits 0.
  - `bun run build` exits 0.

- [ ] Check 3 — UnoCSS, palette and font:
  - `uno.config.ts` uses `presetWind3()` and does not contain `presetUno`.
  - `theme.colors` defines semantic groups `ok`, `warn` and `crit`, each with `surface`, `text` and `border`, plus neutral and brand tokens.
  - `theme.fontFamily.sans` starts with `Satoshi`.
  - At least 8 `shortcuts` are defined, and each one is used in at least one file under `src/` (grep count ≥ 1 per shortcut name).
  - `grep -rEn "#[0-9a-fA-F]{3,8}\b" src --include=*.vue` returns no matches.
  - `grep -rEn "(text|bg|border)-(red|yellow|green|amber|emerald|rose|gray|slate)-[0-9]" src` returns no matches.
  - `index.html` contains the Fontshare preconnect and the stylesheet link with `f[]=satoshi@400,500,700&display=swap`.
  - At runtime on every capture URL, after `document.fonts.ready`, `document.fonts.check('500 16px Satoshi') === true`.

- [ ] Check 4 — Reka UI usage:
  - `grep -rE "from 'reka-ui'" src` shows imports of `DialogRoot`, `DialogPortal`, `DialogContent`, `DialogTitle`, `DialogDescription`, `RadioGroupRoot`, `RadioGroupItem`, `SwitchRoot`, `SwitchThumb`, `AccordionRoot` and `AccordionItem` (each at least once).
  - Every file that uses `DialogContent` also uses `DialogTitle`.
  - Dialog portals target `#sheet-root` (`grep -rn 'to="#sheet-root"' src` ≥ 1).
  - At runtime on `/calibrate?seed=1` (desktop width, `clean` off), the dialog content's bounding box lies entirely inside the phone frame's bounding box.

- [ ] Check 5 — Routes: the router registers exactly these paths: `/onboarding`, `/home`, `/history`, `/history/:logId`, `/settings`, `/settings/intervals`, `/calibrate`, `/consumable/:id`, `/log-service`, `/export`, `/notificaciones`, `/comercio` (plus `/` redirecting to `/home` and a catch-all redirect). `verify.mjs` opens each one with `?seed=1&clean=1` (using a seed log id for `/history/:logId` and each of `aceite`, `transmision`, `frenos`, `bujia`, `llantas` for `/consumable/:id`) and records zero `console.error`, zero `pageerror` and zero Vue warnings (`[Vue warn]`) for every route.

- [ ] Check 6 — Domain logic, covered by `bun test` in `src/domain/*.test.ts`:
  - `tasaDia('R3', '5-6')` ≈ 39.29 (±0.01), `tasaDia('R4', 'todos')` = 90, `tasaDia('R1', '3-4')` = 7.5.
  - `estado(0.79) === 'ok'`, `estado(0.80) === 'warn'`, `estado(0.99) === 'warn'`, `estado(1.00) === 'crit'`.
  - Seed with `DEMO_TODAY`: aceite is `warn` with remaining days in [11, 12.5] and label `en ~2 semanas`; transmission (cadena) is `crit`; frenos, bujía and llantas are `ok`.
  - Logging a preventive `aceite` service today makes aceite `ok`.
  - Logging "Lubricación y ajuste" resets only the short chain counter; logging "Cambio de kit" resets both.
  - Switching `transmision` to `CVT` yields the item label `Banda CVT`, the tasks Inspección and Reemplazo de banda y rodillos, `ok` status from the CVT seed offsets, and no task or bullet containing `lubric`.
  - Check-in factors: `Más` increases and `Menos` decreases the 4-week average rate relative to `Sí`.
  - A missing time interval is evaluated by distance only.

- [ ] Check 7 — Capture screens, measured by `verify.mjs` at viewport `390×844` on each capture URL:
  - `document.documentElement.scrollWidth <= 390`.
  - Every visible text node has computed `font-size >= 13px`.
  - Every visible `button`, `a`, `[role=radio]`, `[role=switch]` and `[role=tab]` element has a bounding box height `>= 44px`, or its clickable wrapper does.
  - `document.body.innerText` matches none of `/\d[\d,.]*\s?km\b/i` (no kilometers).
  - Each element listed under "Must be fully visible" in `task.md §7` (located by text) has `getBoundingClientRect().bottom <= 844`.
  - Required strings per capture:
    - Captura 1: `Paso 2 de 3`, `¿Cómo usas tu moto en un día normal?`, `Varios viajes en el día`, `¿Cuántos días a la semana la usas?`, `5 o 6 días`.
    - Captura 2: `Ve juntando`, `en ~2 semanas`, `Ya toca`, `Bien`, `Registrar servicio`, `Inicio`, `Bitácora`, `Ajustes`.
    - Captura 3: `¿Usaste tu moto como siempre esta semana?`, `Sí`, `Menos`, `Más`, `te toca cambio en ~2 semanas`.
    - Captura 4: `Incluir montos` and the 4 seed services.
    - Captura 5: `Promoción pagada`, `Próximamente`, `Refaccionaria Ejemplo`, `10% en cambio de aceite`, `ITN-482`, `Itinera no califica ni certifica talleres.`, `Por recorrido`, `Por tiempo`.
    - Captura 6: `Próximamente`, `Escribe el código del cliente`, `Código válido`, `Clientes comprobados gratis: 4 de 10`, `18 personas`, `7 llegaron con código`, `Código QR de ejemplo`.
  - With `clean=1`, the simulator toolbar is absent from the DOM and no element lies outside `0..390` horizontally.

- [ ] Check 8 — Interactions, scripted in `verify.mjs`:
  - On `/notificaciones`, clicking `Más` shows `Listo, lo tomamos en cuenta`; clicking the oil notification navigates to `/consumable/aceite`.
  - From `/home`, "Ajustar uso" opens the `/calibrate` dialog. With the broken-odometer switch on, the dialog shows the 4 options `No la usé`, `Menos que de costumbre`, `Como siempre`, `Más que de costumbre` and contains no `input[type=number]`.
  - In `/log-service`, saving a preventive Aceite service shows `Servicio guardado`; afterwards `/home` shows Aceite as `Bien` and `/history` lists 5 entries.
  - Toggling "Incluir montos" in `/export` hides and shows the `$` amounts in the preview.
  - Switching the transmission to Banda CVT (in `/settings`) makes `/home` show `Banda CVT` instead of `Cadena`.
  - "Empezar desde cero" followed by visiting `/home` redirects to `/onboarding`.

- [ ] Check 9 — Forbidden copy and excluded features:
  - Case-insensitive search of `document.body.innerText` on every route of Check 5 finds none of: `Km_proyectado`, `Km_base`, `Tasa_dia`, `Rolling Average`, `MAU`, `SQLite`, `Local-First`, `WearTrafficLight`, `ServiceTemplate`, `ConsumableItem`, `HomeWorkshopTag`, `MerchantPartner`, `ContextualPromotion`, `CouponRedemption`, `transmision`, `núcleo básico`, `ticket promedio`, `redimido`, `pauta`, `Fase 1`, `ventana preventiva`, `Óptimo`, `Crítico`.
  - The router has no path containing `login`, `registro`, `gasolina`, `combustible`, `talleres`, `directorio`, `flotilla` or `vehiculos`.
  - No route renders a star rating (no `★` and no `aria-label` containing `estrellas`).
  - No price or paywall appears on `/export`.
  - No vehicle selector or "Agregar moto" control exists.
  - No `href` points to `http`, `https`, `tel:` or `wa.me` except the Fontshare links in `index.html`.

- [ ] Check 10 — Captures delivered: `prototype/captures/captura-1.png` through `captura-6.png` exist, each exactly 780×1688 px (verified by reading the PNG IHDR width and height in `capture.mjs` and printing them), taken after `document.fonts.ready` with `clean=1` and `seed=1`.

- [ ] Check 11 — Scope:
  - Record `git status --short` and `git log -1 --format=%H` at the repo root **before** starting and again **after** finishing, both in the changelog.
  - The only differences between the two status listings are entries under `prototype/` and `.tickets/005-build-itinera-vue-prototype/changelog.md`.
  - The `HEAD` hash is unchanged (no commit or push).

- [ ] Check 12 — Changelog: `.tickets/005-build-itinera-vue-prototype/changelog.md` contains these sections:
  - the design plan (4–6 hex values, type scale, layout principle);
  - installed versions of the Check 1 dependencies;
  - verbatim peer-dependency warnings, or the line "none";
  - files created and routes implemented;
  - verbatim outputs of Checks 2, 7, 8 and 10, including the JSON report;
  - deviations (routine-first order in Paso 2, `/onboarding` guard exception, no-km display rules, any Vite fallback);
  - "Doc follow-ups" (at least `ROUTES.md §4.B.2` and `§4.C.6` regarding the display of estimated km);
  - the scope confirmation.
