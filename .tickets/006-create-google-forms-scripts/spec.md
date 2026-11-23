# Specification for Ticket 006 — Create Google Forms Generator Scripts

Checks 1–8 are verified locally and objectively: by file existence, `grep`, `node --check` via stdin, or `node scripts/forms/verify_forms.mjs`, which runs both `.gs` files against a mock `FormApp` and exits non-zero on any failure. Check 9 is a manual checklist for the user in Google Forms Preview; the worker only has to write it into the README. All commands run from the repository root. The changelog must contain the verbatim output of every command.

## Objective Checks

- [ ] Check 1 — Files: these files exist and nothing else is created or modified:
  - `scripts/forms/create_instrument_a_b2c.gs`
  - `scripts/forms/create_instrument_b_b2b.gs`
  - `scripts/forms/verify_forms.mjs`
  - `scripts/forms/README.md`
  - `.tickets/006-create-google-forms-scripts/changelog.md`
  - `reference.gs` is byte-identical to its pre-ticket version: its SHA-256, recorded in the changelog before starting and after finishing (`node -e "console.log(require('crypto').createHash('sha256').update(require('fs').readFileSync('.tickets/006-create-google-forms-scripts/reference.gs')).digest('hex'))"`), is the same.

- [ ] Check 2 — Syntax and globals:
  - `node --check - < scripts/forms/create_instrument_a_b2c.gs` exits 0.
  - `node --check - < scripts/forms/create_instrument_b_b2b.gs` exits 0.
  - Neither file contains `import `, `export `, `require(` or `setRequireLogin`.
  - Top-level declarations: file A declares only `CAPTURAS_A_DRIVE_IDS` and `crearEncuestaMotociclistasItinera`; file B declares only `CAPTURAS_B_DRIVE_IDS` and `crearFormularioTalleresItinera`. The verifier checks this by loading both files into one shared `vm` context without a redeclaration error.

- [ ] Check 3 — Instrument A structure (`verify_forms.mjs`):
  - Form title `Cuidado y mantenimiento de motocicletas en Xalapa`.
  - Exactly 17 `PageBreakItem`s, with titles in this order: Tu zona y tu edad, Sobre ti, Tu moto y cómo la usas, Cómo cuidas tu moto hoy, Conoce Itinera, Por qué no la usarías, Avisos y semáforo, Anticipación del aviso, Otra forma de aviso, Bitácora y resumen, Tu taller y promociones, Pago, Cuánto pagarías, Si no pagarías, Promociones a cambio de usarla gratis, Cómo conocer la app y recibir ayuda, Tu celular.
  - Exactly 44 question items: 33 MultipleChoice, 1 List, 2 Grid, 3 Checkbox, 4 Text, 1 ParagraphText.
  - Each question item sits on the page assigned to it in the `task.md` table, in the listed order.
  - Non-required items are exactly A8, A15, A22b, A25b, A26 and A37; all other question items are required.
  - `showOtherOption(true)` is set on exactly A3, A5, A6, A9, A10, A20, A21b, A22b and A33, and none of those items has a literal `Otro` choice. A8 contains the literal choice `Otra`.
  - Grids A14 and A16 have the exact rows and columns listed in `task.md`.
  - A4 choices equal the six CONASAMI 2026 brackets of `ESTUDIO_DE_MERCADO.md`, character for character.

- [ ] Check 4 — Instrument A navigation (`verify_forms.mjs`):
  - Choice navigation:

    | Item | Choice | Target |
    | :--- | :--- | :--- |
    | A0 | Sí / No | CONTINUE / SUBMIT |
    | A2 | Menor de 18 años | SUBMIT |
    | A2 | every other choice | CONTINUE |
    | A21 | Definitivamente sí, Probablemente sí, No estoy seguro(a) | Avisos y semáforo |
    | A21 | Probablemente no, Definitivamente no | Por qué no la usarías |
    | A23 | Sí / No | Anticipación del aviso / Otra forma de aviso |
    | A29 | Sí, Depende del precio | Cuánto pagarías |
    | A29 | No | Si no pagarías |

  - No other item has choice navigation.
  - Page-break `goToPage`: the break titled "Avisos y semáforo" → "Tu celular"; the break titled "Otra forma de aviso" → "Bitácora y resumen"; the break titled "Si no pagarías" → "Promociones a cambio de usarla gratis". Every other break has no `goToPage` or CONTINUE.
  - A simulated walk through the recorded structure, applying Forms semantics (choice navigation on page submit, otherwise the next break's `goToPage`, otherwise linear), produces these page sequences:
    - Non-rider: 1 → submit.
    - Minor: 1, 2 → submit.
    - Rejecter (A21 = Definitivamente no): …, Conoce Itinera, Por qué no la usarías, Tu celular → submit.
    - Adopter with A23 = Sí and A29 = Sí: …, Avisos y semáforo, Anticipación del aviso, Bitácora y resumen, …, Pago, Cuánto pagarías, Promociones a cambio de usarla gratis, …, Tu celular.
    - Adopter with A23 = No and A29 = No: …, Avisos y semáforo, Otra forma de aviso, Bitácora y resumen, …, Pago, Si no pagarías, Promociones a cambio de usarla gratis, …, Tu celular.

- [ ] Check 5 — Instrument B structure and navigation (`verify_forms.mjs`):
  - Form title `Itinera: formulario para talleres y refaccionarias de Xalapa`.
  - Exactly 16 `PageBreakItem`s with the titles of the `task.md` table, in order.
  - Exactly 32 question items: 24 MultipleChoice, 4 Checkbox, 4 Text.
  - Non-required items are exactly B10 and `Comentarios`.
  - `showOtherOption(true)` is set on exactly B9, B15, B24 and B27.
  - Validations: B9 has `requireSelectAtMost(3)`; B28 has `requireSelectExactly(3)`; no other item has a validation.
  - Choice navigation is exactly:
    - B7: Sí → Cómo se reparten sus clientes; No → Servicios y temporadas.
    - B14: Sí → Su forma de recordar; No → Regreso de clientes.
    - B19: Sí, Tal vez → Formas de pago; No → Por qué no.
    - B21: Cuota fija al mes → Cuota fija al mes; Pagar por cada cliente que llegue y compre → Pago por cliente; Ninguna, No sé → Descuento y prueba.
  - Page-break `goToPage`: the break titled "Formas de pago" → "Dar a conocer la app"; the break titled "Pago por cliente" → "Descuento y prueba".
  - Simulated walks:
    - B19 = No: …, Forma de pago, Por qué no, Dar a conocer la app, …
    - B21 = Cuota fija al mes: …, Formas de pago, Cuota fija al mes, Descuento y prueba, …
    - B21 = No sé: …, Formas de pago, Descuento y prueba, …

- [ ] Check 6 — Text parity (`verify_forms.mjs`), comparing against the normalization rules of `task.md` applied to `deliverables/ESTUDIO_DE_MERCADO.md`:
  - For every MultipleChoice, List and Checkbox item of both instruments, the recorded title and the ordered choice list (excluding the `showOtherOption` "Otro") equal the expected ones exactly; mismatch count = 0.
  - Each "Texto:" paragraph appears verbatim as the help text of its page, or of the A8 promotion `SectionHeaderItem`.
  - No title, choice, help text or description contains: `A0.`–`A37.`, `B1.`–`B31.`, a section id (`/\b\d{1,2}[a-f]\b/`), `pauta`, `redimid`, `ticket promedio`, `núcleo básico`, `MAU`, `125–250`, `125-250`, `km/día`, `(pasa`, `(termina`, `(después`.

- [ ] Check 7 — Captures and settings (`verify_forms.mjs`):
  - Run with empty IDs: A contains exactly 5 placeholders `[Insertar Captura n del prototipo aquí]` for n = 1, 2, 3, 4, 5, and B exactly 3 for n = 2, 5, 6. Each is at the position given in `task.md` and has help text containing the caption and `prototype/captures/captura-n.png`.
  - Run with fake IDs: the same positions hold `ImageItem`s with width 300, CENTER alignment, and the caption as title; `DriveApp.getFileById` is called exactly with the fake IDs; no placeholders remain.
  - Captions match `MARKET_STUDY.md §2.3` verbatim.
  - Settings recorded on both forms: progress bar on, collect email off, limit one response off, response edits off, publishing summary off, the confirmation message from `task.md`; B also has show-link-to-respond-again on.
  - Both entry functions call `Logger.log` with `getEditUrl()` and `getPublishedUrl()`.
  - The JSON summary printed by the verifier is pasted into the changelog.

- [ ] Check 8 — Scope and VCS:
  - `git status --short` before and after the ticket (both recorded in the changelog) differ only by entries under `scripts/forms/` and `.tickets/006-create-google-forms-scripts/changelog.md`.
  - `git log -1 --format=%H` is unchanged (no commit).

- [ ] Check 9 — README and manual branch checklist:
  - `scripts/forms/README.md` (Spanish) contains the 5 steps of `task.md`, the warning that re-running creates a new form, and a table of manual Preview paths for the user to tick in Google Forms:
    - A0 = No ends the form.
    - A2 = Menor de 18 años ends the form after page 2.
    - A21 = Definitivamente no jumps to "Por qué no la usarías" and then "Tu celular".
    - A23 = Sí / No each reach "Bitácora y resumen".
    - A29 = Sí / No each reach "Promociones a cambio de usarla gratis".
    - B7, B14, B19 and B21 follow every route of Check 5.
    - B9 rejects a fourth selection; B28 requires exactly three.
  - The worker does not run Google Forms; the user ticks this table before sharing the forms.

- [ ] Check 10 — Changelog: `.tickets/006-create-google-forms-scripts/changelog.md` includes:
  - the files created;
  - verbatim outputs of the Check 2 commands and of `node scripts/forms/verify_forms.mjs` (including its JSON summary);
  - the `git status` and `HEAD` recorded before and after the ticket;
  - "Deviations" (A0 alone on page 1 and A1–A2 on page 2; B18 comments split into a separate item; A8 literal `Otra`);
  - "Doc follow-ups" (at least: reflect the A0/A2 page split in `MARKET_STUDY.md §2.4` and in the deliverable);
  - an explicit statement that the scripts were not executed in Google Apps Script.
