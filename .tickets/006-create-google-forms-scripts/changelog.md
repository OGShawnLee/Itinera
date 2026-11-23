# Changelog — Ticket 006: Create Google Apps Script Generators for Market Study Forms

## Files Created

- `scripts/forms/create_instrument_a_b2c.gs` — Google Apps Script (V8, `FormApp`) generator for Instrument A (*Cuidado y mantenimiento de motocicletas en Xalapa*, 44 question items across 18 pages, two-pass branching and `setGoToPage` navigation, optional Drive capture insertion with placeholder fallback).
- `scripts/forms/create_instrument_b_b2b.gs` — Google Apps Script (V8, `FormApp`) generator for Instrument B (*Itinera: formulario para talleres y refaccionarias de Xalapa*, 32 question items across 17 pages, checkbox validations, two-pass branching and `setGoToPage` navigation, optional Drive capture insertion with placeholder fallback).
- `scripts/forms/verify_forms.mjs` — Local Node.js verifier (built-in modules only) that loads both `.gs` scripts into a shared `vm` context with a mock `FormApp`, `DriveApp`, and `Logger`, parses `deliverables/ESTUDIO_DE_MERCADO.md`, and verifies Checks 2–7.
- `scripts/forms/README.md` — Spanish step-by-step instructions (5 steps) including Drive capture ID setup, re-run warning, and the manual Google Forms Preview branch checklist (Check 9).
- `.tickets/006-create-google-forms-scripts/changelog.md` — This changelog.

> **Execution Statement:** The `.gs` scripts were **not** executed in Google Apps Script (`script.google.com`). All verification was performed locally via `node --check` (stdin) and `node scripts/forms/verify_forms.mjs` against the mock `FormApp` environment.

---

## Pre-Ticket VCS State and `reference.gs` Hash

```text
$ git status --short
(empty output)

$ git log -1 --format=%H
1e990e1d93e26268c9bc0e63e88ec727886425fe

$ node -e "console.log(require('crypto').createHash('sha256').update(require('fs').readFileSync('.tickets/006-create-google-forms-scripts/reference.gs')).digest('hex'))"
158c07fda59bc2886fae9233da2a9cfe23197e4e4be703d5b8de9cad1513bad9
```

---

## Post-Ticket Verification Outputs

### Check 1 — `reference.gs` SHA-256 (Unchanged)

```text
$ node -e "console.log(require('crypto').createHash('sha256').update(require('fs').readFileSync('.tickets/006-create-google-forms-scripts/reference.gs')).digest('hex'))"
158c07fda59bc2886fae9233da2a9cfe23197e4e4be703d5b8de9cad1513bad9
```

### Check 2 — Syntax Check via Stdin (`node --check - < ...`)

```text
$ node --check - < scripts/forms/create_instrument_a_b2c.gs
(exited with code 0, empty output)

$ node --check - < scripts/forms/create_instrument_b_b2b.gs
(exited with code 0, empty output)
```

### Checks 2–7 — Verbatim Output of `node scripts/forms/verify_forms.mjs`

```json
{
  "status": "PASS",
  "instrumentA": {
    "title": "Cuidado y mantenimiento de motocicletas en Xalapa",
    "pageCount": 18,
    "pageBreakTitles": [
      "Tu zona y tu edad",
      "Sobre ti",
      "Tu moto y cómo la usas",
      "Cómo cuidas tu moto hoy",
      "Conoce Itinera",
      "Por qué no la usarías",
      "Avisos y semáforo",
      "Anticipación del aviso",
      "Otra forma de aviso",
      "Bitácora y resumen",
      "Tu taller y promociones",
      "Pago",
      "Cuánto pagarías",
      "Si no pagarías",
      "Promociones a cambio de usarla gratis",
      "Cómo conocer la app y recibir ayuda",
      "Tu celular"
    ],
    "questionCount": 44,
    "itemCountsByType": {
      "MultipleChoice": 33,
      "List": 1,
      "Grid": 2,
      "Text": 4,
      "Checkbox": 3,
      "ParagraphText": 1
    },
    "requiredItems": [
      "A0",
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A9",
      "A10",
      "A11",
      "A12",
      "A13",
      "A14",
      "A16",
      "A17",
      "A18",
      "A19",
      "A20",
      "A21",
      "A21b",
      "A22",
      "A23",
      "A24",
      "A23b",
      "A25",
      "A27",
      "A28",
      "A29",
      "A30",
      "A30b",
      "A31a",
      "A31b",
      "A32",
      "A33",
      "A34",
      "A35",
      "A36"
    ],
    "optionalItems": [
      "A8",
      "A15",
      "A22b",
      "A25b",
      "A26",
      "A37"
    ],
    "showOtherOptionItems": [
      "A3",
      "A5",
      "A6",
      "A9",
      "A10",
      "A20",
      "A21b",
      "A22b",
      "A33"
    ],
    "navigationTable": [
      {
        "item": "A0",
        "choice": "Sí",
        "target": "CONTINUE"
      },
      {
        "item": "A0",
        "choice": "No",
        "target": "SUBMIT"
      },
      {
        "item": "A2",
        "choice": "Menor de 18 años",
        "target": "SUBMIT"
      },
      {
        "item": "A2",
        "choice": "18 a 24",
        "target": "CONTINUE"
      },
      {
        "item": "A2",
        "choice": "25 a 34",
        "target": "CONTINUE"
      },
      {
        "item": "A2",
        "choice": "35 a 44",
        "target": "CONTINUE"
      },
      {
        "item": "A2",
        "choice": "45 a 59",
        "target": "CONTINUE"
      },
      {
        "item": "A2",
        "choice": "60 o más",
        "target": "CONTINUE"
      },
      {
        "item": "A21",
        "choice": "Definitivamente sí",
        "target": "Avisos y semáforo"
      },
      {
        "item": "A21",
        "choice": "Probablemente sí",
        "target": "Avisos y semáforo"
      },
      {
        "item": "A21",
        "choice": "No estoy seguro(a)",
        "target": "Avisos y semáforo"
      },
      {
        "item": "A21",
        "choice": "Probablemente no",
        "target": "Por qué no la usarías"
      },
      {
        "item": "A21",
        "choice": "Definitivamente no",
        "target": "Por qué no la usarías"
      },
      {
        "item": "A23",
        "choice": "Sí",
        "target": "Anticipación del aviso"
      },
      {
        "item": "A23",
        "choice": "No",
        "target": "Otra forma de aviso"
      },
      {
        "item": "A29",
        "choice": "Sí",
        "target": "Cuánto pagarías"
      },
      {
        "item": "A29",
        "choice": "Depende del precio",
        "target": "Cuánto pagarías"
      },
      {
        "item": "A29",
        "choice": "No",
        "target": "Si no pagarías"
      }
    ],
    "goToPageTable": [
      {
        "pageBreak": "Avisos y semáforo",
        "target": "Tu celular"
      },
      {
        "pageBreak": "Otra forma de aviso",
        "target": "Bitácora y resumen"
      },
      {
        "pageBreak": "Si no pagarías",
        "target": "Promociones a cambio de usarla gratis"
      }
    ],
    "validations": [],
    "capturePositions": [
      {
        "n": 1,
        "pageNumber": 6,
        "pageTitle": "Conoce Itinera",
        "indexOnPage": 0
      },
      {
        "n": 2,
        "pageNumber": 6,
        "pageTitle": "Conoce Itinera",
        "indexOnPage": 1
      },
      {
        "n": 3,
        "pageNumber": 8,
        "pageTitle": "Avisos y semáforo",
        "indexOnPage": 0
      },
      {
        "n": 4,
        "pageNumber": 11,
        "pageTitle": "Bitácora y resumen",
        "indexOnPage": 0
      },
      {
        "n": 5,
        "pageNumber": 12,
        "pageTitle": "Tu taller y promociones",
        "indexOnPage": 2
      }
    ]
  },
  "instrumentB": {
    "title": "Itinera: formulario para talleres y refaccionarias de Xalapa",
    "pageCount": 17,
    "pageBreakTitles": [
      "Clientes y servicios",
      "Cómo se reparten sus clientes",
      "Servicios y temporadas",
      "Recordatorios a sus clientes",
      "Su forma de recordar",
      "Regreso de clientes",
      "Conozca Itinera",
      "Forma de pago",
      "Por qué no",
      "Formas de pago",
      "Cuota fija al mes",
      "Pago por cliente",
      "Descuento y prueba",
      "Dar a conocer la app",
      "Prueba de un mes",
      "Cierre"
    ],
    "questionCount": 32,
    "itemCountsByType": {
      "MultipleChoice": 24,
      "Text": 4,
      "Checkbox": 4
    },
    "requiredItems": [
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "B11",
      "B12",
      "B13",
      "B14",
      "B15",
      "B16",
      "B17",
      "B18",
      "B19",
      "B20",
      "B21",
      "B22",
      "B23",
      "B24",
      "B25",
      "B26",
      "B27",
      "B28",
      "B29",
      "B30",
      "B31"
    ],
    "optionalItems": [
      "B10",
      "Comentarios"
    ],
    "showOtherOptionItems": [
      "B9",
      "B15",
      "B24",
      "B27"
    ],
    "navigationTable": [
      {
        "item": "B7",
        "choice": "Sí",
        "target": "Cómo se reparten sus clientes"
      },
      {
        "item": "B7",
        "choice": "No",
        "target": "Servicios y temporadas"
      },
      {
        "item": "B14",
        "choice": "Sí",
        "target": "Su forma de recordar"
      },
      {
        "item": "B14",
        "choice": "No",
        "target": "Regreso de clientes"
      },
      {
        "item": "B19",
        "choice": "Sí",
        "target": "Formas de pago"
      },
      {
        "item": "B19",
        "choice": "Tal vez",
        "target": "Formas de pago"
      },
      {
        "item": "B19",
        "choice": "No",
        "target": "Por qué no"
      },
      {
        "item": "B21",
        "choice": "Cuota fija al mes",
        "target": "Cuota fija al mes"
      },
      {
        "item": "B21",
        "choice": "Pagar por cada cliente que llegue y compre",
        "target": "Pago por cliente"
      },
      {
        "item": "B21",
        "choice": "Ninguna",
        "target": "Descuento y prueba"
      },
      {
        "item": "B21",
        "choice": "No sé",
        "target": "Descuento y prueba"
      }
    ],
    "goToPageTable": [
      {
        "pageBreak": "Formas de pago",
        "target": "Dar a conocer la app"
      },
      {
        "pageBreak": "Pago por cliente",
        "target": "Descuento y prueba"
      }
    ],
    "validations": [
      {
        "item": "B9",
        "type": "CheckboxValidation",
        "rule": "AT_MOST",
        "count": 3,
        "helpText": "Elija máximo tres."
      },
      {
        "item": "B28",
        "type": "CheckboxValidation",
        "rule": "EXACTLY",
        "count": 3,
        "helpText": "Elija exactamente tres."
      }
    ],
    "capturePositions": [
      {
        "n": 2,
        "pageNumber": 8,
        "pageTitle": "Conozca Itinera",
        "indexOnPage": 0
      },
      {
        "n": 5,
        "pageNumber": 8,
        "pageTitle": "Conozca Itinera",
        "indexOnPage": 1
      },
      {
        "n": 6,
        "pageNumber": 8,
        "pageTitle": "Conozca Itinera",
        "indexOnPage": 2
      }
    ]
  },
  "textMismatches": []
}
```

### Check 8 — Post-Ticket VCS State

```text
$ git status --short
?? .tickets/006-create-google-forms-scripts/changelog.md
?? scripts/

$ git log -1 --format=%H
1e990e1d93e26268c9bc0e63e88ec727886425fe
```

---

## Deviations

1. **Page split for early-exit filters (`A0` alone on page 1; `A1` and `A2` on page 2; `A3`–`A5` on page 3):** In Google Forms, choice navigation (`FormApp.PageNavigationType.SUBMIT`) only triggers when the respondent submits the current page. If `A0` shared page 1 with `A1` (required), a non-rider answering `A0 = No` would still be forced to answer `A1` before exiting. Likewise, if `A2` shared a page with `A3`–`A5` (required), a minor answering `A2 = Menor de 18 años` would be forced to answer gender, income, and occupation before exiting. Therefore, page 1 contains `A0` alone, page 2 (*Tu zona y tu edad*) contains `A1` and `A2`, and page 3 (*Sobre ti*) contains `A3`–`A5`. Question order is unchanged.
2. **`B18` comments split into a separate optional short-text item (`Comentarios`):** Google Forms `MultipleChoiceItem` does not support an attached free-text comment field alongside `Sí` / `No`. In accordance with `task.md`, `B18` has choices `['Sí', 'No']` (`required: true`) followed immediately on the same page by a separate optional `TextItem` titled `Comentarios` (`required: false`), bringing Instrument B from 31 numbered questions to 32 Google Forms question items.
3. **`A8` literal choice `Otra`:** Because `A8` is a dropdown (`ListItem`), and Google Forms `ListItem` does not support `showOtherOption(true)`, `A8` keeps the literal choice `'Otra'` in `setChoiceValues([...])`. All other items with an "other" option use `.showOtherOption(true)` without a literal `Otro` choice.

---

## Doc Follow-Ups

- Reflect the `A0` / `A1`–`A2` / `A3`–`A5` page split in `.routing/academic/MARKET_STUDY.md §2.4` and `deliverables/ESTUDIO_DE_MERCADO.md` ("Instrumento A") so the prose section boundaries match the 18-page Google Forms structure required for early-exit branching.
- Note in `.routing/academic/MARKET_STUDY.md §2.1 / §2.4` that `A14` and `A16` (each 1 grid with 5 rows) result in 44 total Google Forms question items in Instrument A (38 base items `A0`–`A37` + 6 derived items `A21b`, `A22b`, `A23b`, `A25b`, `A30b`, and `A31a`/`A31b` splitting `A31`), and that splitting `B18`'s optional comment field in Instrument B yields 32 Google Forms question items (`B1`–`B31` + `Comentarios`).
