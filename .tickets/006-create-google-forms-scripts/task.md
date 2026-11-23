# 006 — Create Google Apps Script Generators for Market Study Forms

| Field | Value |
| :--- | :--- |
| **ID** | 006 |
| **Status** | ready |
| **Model** | Gemini 4 Argon (Medium) |
| **Role** | Automation & Survey Tooling Engineer |
| **Spec** | [spec.md](spec.md) |

---

## Context & Purpose

Building Instrument A (44 question items, 18 pages, 3 branching questions plus 2 early-exit filters, 2 grids) and Instrument B (32 question items, 17 pages, 4 branching questions, 2 checkbox limits) by hand in Google Forms is slow and error-prone. Two Google Apps Script files (`FormApp`, V8 runtime), pasted into `script.google.com` and run once each, must build both forms exactly as specified in the Market Study. They must insert the prototype screenshots from ticket `005` automatically when Drive file IDs are provided, or leave labeled placeholders otherwise.

The scripts cannot be executed locally (`FormApp` only exists in Google's runtime). Correctness is therefore proven with a local Node verifier that runs each `.gs` file against a mock `FormApp` and checks the resulting structure against the expectations in [spec.md](spec.md).

---

## Scope

### May create or edit
- `scripts/forms/create_instrument_a_b2c.gs`
- `scripts/forms/create_instrument_b_b2b.gs`
- `scripts/forms/verify_forms.mjs` (local Node verifier with a mock `FormApp`; no npm dependencies)
- `scripts/forms/README.md` (Spanish instructions)
- `.tickets/006-create-google-forms-scripts/changelog.md`

### Must not touch
- `.routing/**`, `deliverables/**`, `prototype/**` (read the PNGs only), `README.md`, `.agents/**`, `.claude/**`, `.tickets/001-*` to `005-*`, and `.tickets/006-create-google-forms-scripts/reference.gs` (read-only).
- Do NOT run `git commit` or `git push`.
- If you find a contradiction between the inputs, do not edit them: follow this task and list it in the changelog under "Doc follow-ups".

---

## Inputs and Source of Truth

1. [MARKET_STUDY.md §2.3–2.5](../../.routing/academic/MARKET_STUDY.md): structure, sections, branch map, validations, capture placement and captions (§2.3 "Pie de imagen sugerido").
2. [ESTUDIO_DE_MERCADO.md](../../deliverables/ESTUDIO_DE_MERCADO.md), sections "Instrumento A" and "Instrumento B": the respondent-facing wording of every title and option. When wording differs between the two files, **ESTUDIO_DE_MERCADO.md wins for visible text** and MARKET_STUDY.md wins for structure. A4 must use the CONASAMI 2026 brackets exactly as written there, including their parenthetical text.
3. [reference.gs](reference.gs): a teammate's script built on the **old, obsolete questionnaire** (125–250 cc filter, km per day, odometer question, "pauta", "redimido", "ticket promedio"). Use it **only for FormApp patterns**, never for content.

| Adopt from `reference.gs` | Do NOT copy from `reference.gs` |
| :--- | :--- |
| Create the branching item first, create the `PageBreakItem`s, then call `item.setChoices([item.createChoice(label, page), ...])` once the target pages exist | Any question, option, title or description text (all obsolete) |
| `FormApp.PageNavigationType.SUBMIT` for early exits | One function creating both forms (here: one entry function per file) |
| `setChoiceValues([...])` for non-branching items; chained `setTitle().setRequired()` | Numbered titles like `'1. ...'` or codes like `'A21b.'` in visible text |
| `Logger.log` of `getEditUrl()` and `getPublishedUrl()` | `addScaleItem`, `addDateItem`, business-name fields, `setRequired(true)` on optional items |

### Text normalization rules (ESTUDIO → Forms)
- Title: the text before the first `☐`, without the item code (`A0.`, `B21.`), trimmed.
- Remove routing notes from titles and options: any parenthetical containing `pasa`, `pasan`, `termina`, `después` or `con No` (for example `(pasa a la sección 9b)`, `(con No termina la encuesta)`, `(después pasa a la sección 11)`). Navigation is implemented in code, not in labels.
- Respondent hints `(puedes marcar varias)`, `(puede marcar varios)` and `(máximo tres)` become `setHelpText(...)` with the same words, without parentheses. The hints `(opcional)`, `(respuesta corta…)` and `(párrafo…)` are dropped; they are expressed by `setRequired(false)` and the item type.
- A14 and A16: the title is the first sentence; rows and columns come from the "Filas:" and "Columnas:" lists, with the first letter capitalized.
- A37: the title is the first sentence; "Solo lo usaremos para invitarte a la prueba piloto." becomes help text.
- B18: options `Sí` and `No`; "Comentarios" becomes a separate optional short-text item titled `Comentarios`.
- A literal `Otro` or `Otro: ____` option is **not** added as a choice: call `showOtherOption(true)` instead. Exception: A8 is a dropdown (`ListItem` has no "other" option), so it keeps the literal choice `Otra`.
- No visible text may contain section ids (`5b`, `9d`), item codes, emoji, or the words `pauta`, `redimido`, `ticket promedio`, `núcleo básico`, `MAU`, `125–250`. Codes go in code comments only (`// A21b`).

---

## Critical FormApp Rules

1. **Two-pass branching.** First create every item and every `PageBreakItem` in final order and keep references to them. Then, in a second block at the end of the entry function, call `setChoices` with navigation on the branching items and `setGoToPage` on the page breaks. Every choice of a branching item gets an explicit target: a `PageBreakItem` or `FormApp.PageNavigationType.CONTINUE` or `SUBMIT`. Never mix `setChoiceValues` with navigation on the same item.
2. **`setGoToPage` semantics.** `pageBreak.setGoToPage(target)` controls where the form goes after the respondent finishes **the page before that break**, when arriving at the break linearly. To make section X jump to Y, call `setGoToPage(Y)` on the `PageBreakItem` that **starts the section right after X**. Example: S5b → S11 is `pbS6.setGoToPage(pbS11)`. The exact calls are listed in the page tables below.
3. **Choice navigation runs when the page is submitted.** A branching question must not share its page with required questions that the exiting respondent should not answer. This is why A0 sits alone on page 1 and A2 sits on page 2 before A3–A5 (see "Deviation" below).
4. **Shared global scope.** If both files end up in the same Apps Script project, every top-level name is shared. Each file declares only its entry function and one config constant at top level (`CAPTURAS_A_DRIVE_IDS` or `CAPTURAS_B_DRIVE_IDS`). All helpers live **inside** the entry function. No `let` or `const` names are duplicated across the two files.
5. **Form settings:** `setDescription(<texto de presentación>)`, `setProgressBar(true)`, `setCollectEmail(false)`, `setLimitOneResponsePerUser(false)` (true would force sign-in and break anonymity), `setAllowResponseEdits(false)`, `setPublishingSummary(false)`, and `setConfirmationMessage('Gracias. Tus respuestas nos ayudan a diseñar Itinera.')` (usted form in B: `Gracias. Sus respuestas nos ayudan a diseñar Itinera.`). Instrument B also sets `setShowLinkToRespondAgain(true)`, because one interviewer fills many forms. Do **not** call `setRequireLogin` (Workspace-only; it throws on personal Gmail accounts).
6. **Required:** every item is `setRequired(true)` except the ones listed as optional in the page tables.
7. **Images:** helper `insertarCaptura(n)` (defined inside each entry function):
   - if the config has a non-empty Drive file ID for `n`, it adds `addImageItem().setImage(DriveApp.getFileById(id).getBlob()).setTitle(<caption n>).setAlignment(FormApp.Alignment.CENTER).setWidth(300)`;
   - otherwise it adds `addSectionHeaderItem().setTitle('[Insertar Captura n del prototipo aquí]').setHelpText(<caption n> + ' Archivo: prototype/captures/captura-n.png')`.
   - Images are inserted in their final position during the first pass (no `moveItem`).
   - Captions (§2.3), verbatim:
     1. La configuras en menos de 30 segundos, sin saber de mecánica ni contar kilómetros.
     2. El semáforo te dice qué está bien, para qué ir juntando y qué ya toca.
     3. Un toque por semana y un solo aviso cuando se acerca un servicio.
     4. Tu historial queda guardado y puedes compartirlo gratis.
     5. Más adelante: promociones de negocios cercanos cuando te toca servicio.
     6. Desde su celular comprueba cada cliente y ve cuántos llegaron por la app.
8. **Section texts:** the "Texto:" paragraphs of the Market Study go into the page's `setHelpText` (the section description). The only exception is the A8-page text that appears mid-page between A27 and A28, which is a `SectionHeaderItem` with an empty title and the text as help text.

### Deviation (record in changelog as a Doc follow-up)
The Market Study places A0 and A1 on Section 1 and A2–A5 on Section 2. Because choice navigation only runs on page submit, a non-rider would be forced to answer A1, and a minor would be forced to answer gender and income (A3–A5) before being sent out. The forms therefore use: page 1 = A0 alone; page 2 = A1 and A2; page 3 = A3–A5. Item order is unchanged.

---

## Instrument A — `crearEncuestaMotociclistasItinera()`

`FormApp.create('Cuidado y mantenimiento de motocicletas en Xalapa')`, description = the "Texto de presentación" of Instrument A. First page plus 17 `PageBreakItem`s = **18 pages**. Page titles are the plain names below (no section numbers).

| Page | Var | Title | Items in order (optional items marked *opt*) | Navigation |
| :--- | :--- | :--- | :--- | :--- |
| 1 | (first page) | (none) | A0 MC | A0: Sí → CONTINUE, No → SUBMIT |
| 2 | `pbZona` | Tu zona y tu edad | A1 MC; A2 MC | A2: Menor de 18 años → SUBMIT, rest → CONTINUE |
| 3 | `pbSobreTi` | Sobre ti | A3 MC (+Otro); A4 MC; A5 MC (+Otro) | |
| 4 | `pbMoto` | Tu moto y cómo la usas | A6 MC (+Otro); A7 MC; A8 List *opt* (incl. `Otra`); A9 MC (+Otro); A10 MC (+Otro); A11 MC; A12 MC; A13 MC | |
| 5 | `pbCuidado` | Cómo cuidas tu moto hoy | A14 Grid; A15 Text *opt*; A16 Grid; A17 Checkbox; A18 Checkbox; A19 MC; A20 MC (+Otro) | |
| 6 | `pbS5` | Conoce Itinera | help text; Captura 1; Captura 2; A21 MC | A21: Definitivamente sí, Probablemente sí, No estoy seguro(a) → `pbS6`; Probablemente no, Definitivamente no → `pbS5b` |
| 7 | `pbS5b` | Por qué no la usarías | A21b MC (+Otro) | finishing this page → `pbS11` (set via `pbS6.setGoToPage(pbS11)`) |
| 8 | `pbS6` | Avisos y semáforo | help text; Captura 3; A22 MC; A22b MC *opt* (+Otro); A23 MC | A23: Sí → `pbS6b`, No → `pbS6c` |
| 9 | `pbS6b` | Anticipación del aviso | A24 MC | finishing → `pbS7` (set via `pbS6c.setGoToPage(pbS7)`) |
| 10 | `pbS6c` | Otra forma de aviso | A23b Text | linear to `pbS7` |
| 11 | `pbS7` | Bitácora y resumen | help text; Captura 4; A25 MC; A25b Text *opt*; A26 Paragraph *opt* | |
| 12 | `pbS8` | Tu taller y promociones | A27 MC; SectionHeader (promotion text); Captura 5; A28 MC | |
| 13 | `pbS9` | Pago | A29 MC | A29: Sí, Depende del precio → `pbS9b`; No → `pbS9c` |
| 14 | `pbS9b` | Cuánto pagarías | A30 MC; A30b MC | finishing → `pbS9d` (set via `pbS9c.setGoToPage(pbS9d)`) |
| 15 | `pbS9c` | Si no pagarías | A31a MC; A31b MC | linear to `pbS9d` |
| 16 | `pbS9d` | Promociones a cambio de usarla gratis | A32 MC | |
| 17 | `pbS10` | Cómo conocer la app y recibir ayuda | A33 Checkbox (+Otro); A34 MC | |
| 18 | `pbS11` | Tu celular | A35 MC; A36 MC; A37 Text *opt* | end → submit |

- Totals: 44 question items (33 MultipleChoice, 1 List, 2 Grid, 3 Checkbox, 4 Text, 1 ParagraphText); 6 optional (A8, A15, A22b, A25b, A26, A37); 9 items with `showOtherOption(true)` (A3, A5, A6, A9, A10, A20, A21b, A22b, A33); no validations.
- Captures in order: 1, 2 (page 6), 3 (page 8), 4 (page 11), 5 (page 12, after the promotion text and before A28).
- Grids (`addGridItem`, one answer per row, required): A14 rows Cambio de aceite / Cadena (ajuste o lubricación) o banda (revisión), según tu moto / Frenos o balatas / Bujía / Llantas (revisión o cambio); columns Cada mes o antes / Cada 2 o 3 meses / Cada 4 a 6 meses / Más de 6 meses / Solo cuando falla / No sé. A16 has the same rows; columns Yo mismo(a) / Un taller / La agencia / Un familiar o conocido / No se le hace.

## Instrument B — `crearFormularioTalleresItinera()`

`FormApp.create('Itinera: formulario para talleres y refaccionarias de Xalapa')`, description = the "Texto de presentación" of Instrument B plus one line for the interviewer: `Lo llena el encuestador en el mostrador con el dueño o encargado.` First page plus 16 `PageBreakItem`s = **17 pages**.

| Page | Var | Title | Items in order (optional items marked *opt*) | Navigation |
| :--- | :--- | :--- | :--- | :--- |
| 1 | (first page) | (none) | B1 MC; B2 MC; B3 MC; B4 Text; B5 MC | |
| 2 | `pbS2` | Clientes y servicios | B6 MC; B7 MC | B7: Sí → `pbS2b`, No → `pbS2c` |
| 3 | `pbS2b` | Cómo se reparten sus clientes | B8 MC | linear to `pbS2c` |
| 4 | `pbS2c` | Servicios y temporadas | B9 Checkbox (+Otro, max 3); B10 MC *opt*; B11 MC; B12 MC; B13 Checkbox | |
| 5 | `pbS3` | Recordatorios a sus clientes | B14 MC | B14: Sí → `pbS3b`, No → `pbS3c` |
| 6 | `pbS3b` | Su forma de recordar | B15 MC (+Otro); B16 MC | linear to `pbS3c` |
| 7 | `pbS3c` | Regreso de clientes | B17 MC | |
| 8 | `pbS4` | Conozca Itinera | help text; Captura 2; Captura 5; Captura 6; B18 MC; Comentarios Text *opt* | |
| 9 | `pbS5` | Forma de pago | B19 MC | B19: Sí, Tal vez → `pbS5c`; No → `pbS5b` |
| 10 | `pbS5b` | Por qué no | B20 Text | finishing → `pbS6` (set via `pbS5c.setGoToPage(pbS6)`) |
| 11 | `pbS5c` | Formas de pago | help text (the "Los primeros clientes…" paragraph); B21 MC | B21: Cuota fija al mes → `pbS5d`; Pagar por cada cliente que llegue y compre → `pbS5e`; Ninguna, No sé → `pbS5f` |
| 12 | `pbS5d` | Cuota fija al mes | B22 MC | finishing → `pbS5f` (set via `pbS5e.setGoToPage(pbS5f)`) |
| 13 | `pbS5e` | Pago por cliente | B23 MC | linear to `pbS5f` |
| 14 | `pbS5f` | Descuento y prueba | B24 MC (+Otro); B25 MC | |
| 15 | `pbS6` | Dar a conocer la app | B26 MC; B27 Checkbox (+Otro) | |
| 16 | `pbS7` | Prueba de un mes | B28 Checkbox (exactly 3); B29 Text; B30 MC | |
| 17 | `pbS8` | Cierre | B31 MC | end → submit |

- Totals: 32 question items (24 MultipleChoice, 4 Checkbox, 4 Text); 2 optional (B10, Comentarios); 4 items with `showOtherOption(true)` (B9, B15, B24, B27).
- Validations: B9 `FormApp.createCheckboxValidation().setHelpText('Elija máximo tres.').requireSelectAtMost(3).build()`; B28 `FormApp.createCheckboxValidation().setHelpText('Elija exactamente tres.').requireSelectExactly(3).build()`.
- Captures in order: 2, 5, 6 (page 8, before B18).

---

## Task

1. Read the three inputs completely and the PNG list in `prototype/captures/`.
2. Write `scripts/forms/create_instrument_a_b2c.gs` and `scripts/forms/create_instrument_b_b2b.gs`:
   - plain V8 Apps Script, no `import`/`export`/`require`;
   - top-level config `CAPTURAS_A_DRIVE_IDS = { 1: '', 2: '', 3: '', 4: '', 5: '' }` and `CAPTURAS_B_DRIVE_IDS = { 2: '', 5: '', 6: '' }` with a Spanish comment explaining how to fill them;
   - implement the page tables, the normalization rules and the FormApp rules above;
   - end with `Logger.log` of the edit URL and the responder URL.
3. Write `scripts/forms/verify_forms.mjs` (Node ≥ 18, built-ins only):
   - load each `.gs` with `vm.Script` into a context that provides a mock `FormApp`, `Logger` and `DriveApp`;
   - the mock implements every method the scripts call (chainable builders, `createChoice` with navigation, `PageNavigationType`, `Alignment`, `createCheckboxValidation`) and records the full form structure;
   - run each entry function twice: once with empty capture IDs (placeholders) and once with fake IDs injected into the config (images);
   - parse `deliverables/ESTUDIO_DE_MERCADO.md` with the normalization rules to build the expected titles and options for every choice item, and compare them with the recorded structure;
   - assert every expectation in spec Checks 3–7, print a JSON summary (page titles, item counts by type, required and optional lists, navigation table, `goToPage` table, validations, capture positions, text mismatches), and exit non-zero on any failure.
4. Write `scripts/forms/README.md` in Spanish, with 5 steps:
   1. Optionally upload the 6 PNGs from `prototype/captures/` to Drive and paste their file IDs into the config (the ID is the part of the sharing link between `/d/` and `/view`).
   2. Create a project at script.google.com, paste one `.gs` file, save, select the entry function and run it, accepting the FormApp (and Drive) permissions.
   3. Open the edit URL from the execution log.
   4. Replace any `[Insertar Captura n…]` placeholder with the image if IDs were not used.
   5. Use Preview to test every path in the manual branch checklist of spec Check 9 before sharing. Mention that running the script again creates a new form instead of updating the old one.
5. Run the checks in spec.md and fix everything until they pass. Note that `node --check archivo.gs` fails on any `.gs` file because of the extension; use stdin instead: `node --check - < archivo.gs`.
6. Write `.tickets/006-create-google-forms-scripts/changelog.md` (see spec Check 10).

---

## Verification

Follow the objective criteria in [spec.md](spec.md).
