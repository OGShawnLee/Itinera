# 006 — Create Google Apps Script Generators for Market Study Forms

| Field | Value |
| :--- | :--- |
| **ID** | 006 |
| **Status** | ready |
| **Model** | inherit |
| **Role** | Automation & Survey Tooling Engineer |
| **Spec** | [spec.md](spec.md) |

---

## Context & Purpose

Manually clicking through 45 questions (with 6 conditional branches and grids) in Instrument A and 31 questions (with 4 branches and checkbox validations) in Instrument B inside Google Forms is error-prone and slow.

Using **Google Apps Script (`FormApp`)**, a single `.gs` script pasted into `script.google.com` creates the entire Google Form automatically—complete with sections, conditional navigation (`PageBreakItem`), multiple-choice grids, checkbox validations (`requireSelectAtMost(3)`, `requireSelectExactly(3)`), and clear placeholders where the user drops in the 6 prototype PNG screenshots from Ticket `005`.

---

## Scope

### May create or edit:
- `scripts/forms/create_instrument_a_b2c.gs`
- `scripts/forms/create_instrument_b_b2b.gs`
- `scripts/forms/README.md` (short Spanish instructions for running in `script.google.com`, inserting `Capturas 1–6`, and verifying branch flow before publishing).
- `.tickets/006-create-google-forms-scripts/changelog.md`

### Must not touch:
- `.routing/**`, `deliverables/**`, `prototype/**`, `README.md`, `.agents/**`, or `.tickets/001-*`..`005-*`.

---

## Inputs

1. [MARKET_STUDY.md §2.3–2.5](../../.routing/academic/MARKET_STUDY.md) — Exact wording, options, branching map, checkbox constraints, and prototype capture placements for Instrumento A (`A0`–`A37`) and Instrumento B (`B1`–`B31`).
2. [ESTUDIO_DE_MERCADO.md](../../deliverables/ESTUDIO_DE_MERCADO.md) — Clean Spanish text and CONASAMI 2026 `A4` income brackets.
3. Optional teammate reference script if provided at `.tickets/006-create-google-forms-scripts/reference.gs` (use its Apps Script style/conventions if present; otherwise write standard ES5/V8 Google Apps Script `FormApp` code).

---

## Task

1. Read both inputs completely (and `reference.gs` if present).
2. Write `scripts/forms/create_instrument_a_b2c.gs` defining a single entry-point function `crearEncuestaMotociclistasItinera()`:
   - Creates the form (`FormApp.create('Cuidado y mantenimiento de motocicletas en Xalapa')`) with the exact introduction description and anonymous notice (`setCollectEmail(false)`, `setProgressBar(true)`).
   - Implements all 11 main sections plus conditional sub-sections (`Sección 5b`, `6b`, `6c`, `9b`, `9c`, `9d`) and every question `A0`–`A37` + derived items, matching every option and `showOtherOption(true)` where `Otro` appears.
   - Implements the **two-pass `PageBreakItem` creation pattern** so every `createChoice(label, targetPage)` and `page.setGoToPage(nextPage)` references already-created `PageBreakItem` objects (avoiding forward-reference runtime failures in Google Apps Script).
   - Places clear header blocks (`addSectionHeaderItem`) where **Capturas 1–5** must be inserted via Google Forms UI (plus an optional helper/comment showing how to auto-attach images if uploaded to Google Drive).
   - Logs `form.getEditUrl()` and `form.getPublishedUrl()`.
3. Write `scripts/forms/create_instrument_b_b2b.gs` defining `crearFormularioTalleresItinera()`:
   - Implements all 8 sections plus conditional sub-sections (`2b`, `2c`, `3b`, `3c`, `5b`, `5c`, `5d`, `5e`, `5f`) and `B1`–`B31`, enforcing `requireSelectAtMost(3)` on `B9` and `requireSelectExactly(3)` on `B28`, and all branching (`B7`, `B14`, `B19`, `B21`).
   - Places clear header blocks where **Capturas 2, 5, 6** must be inserted.
   - Logs `form.getEditUrl()` and `form.getPublishedUrl()`.
4. Write `scripts/forms/README.md` in Spanish with clear 4-step instructions (paste into `script.google.com`, run function, upload Capturas `1–6` from `prototype/` in the marked slots, test Preview branches before sharing).
5. Run a JS syntax check on both `.gs` files (e.g., `node --check` or `bun` parser check if compatible with `.gs` syntax) and verify 100% question/branch parity against `MARKET_STUDY.md`.
6. Record results in `.tickets/006-create-google-forms-scripts/changelog.md`.

---

## Verification

Follow the objective criteria in [spec.md](spec.md).
