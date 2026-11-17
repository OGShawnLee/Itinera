# 001 — Process organizational and business study raw document into draft notes

| Field | Value |
| :--- | :--- |
| **ID** | 001 |
| **Status** | draft |
| **Model** | inherit |
| **Role** | Documentation Worker |
| **Spec** | [spec.md](spec.md) |

---

## Scope

### May create or edit:
- `.routing/academic/DRAFT_ORGANIZATIONAL_STUDY.md` (the primary target file containing the raw extracted text structured in markdown).
- `.tickets/001-process-raw-organizational-study/changelog.md` (the worker change log).

### Must not touch:
- `.routing/CONTEXT.md`
- `.routing/PROGRESS.md`
- `.routing/academic/SPECIFICATION.md`
- `.routing/academic/DRAFT_NOTES.md`
- `.routing/reference/*`
- `README.md`
- Any future source code or tests outside this ticket's scope.

---

## Inputs

- `Planteamiento_Idea_Negocio_Itinera-REVISADO.pdf` (source PDF in project root).
- `.routing/academic/DRAFT_NOTES.md#31-mapas-de-empatía-detallados` (transcribed visual empathy maps for Carlos, Bryan, and Miguel, including teacher annotations).
- `.routing/academic/SPECIFICATION.md` (for domain reference and terminology consistency).

---

## Task

1. Extract the native text from `Planteamiento_Idea_Negocio_Itinera-REVISADO.pdf` (pages 1 to 9 and 13 to 17).
2. For pages 10 to 12 (visual empathy maps), consume the faithful transcription provided in `DRAFT_NOTES.md#31-mapas-de-empatía-detallados`.
3. Create the target file `.routing/academic/DRAFT_ORGANIZATIONAL_STUDY.md`.
4. Format and organize the content cleanly in Markdown, preserving every section from the original document:
   - *La Empresa* (Base del Negocio, Oferta de Valor Inicial, Ubicación, Misión, Visión, Filosofía y Valores).
   - *Políticas Organizacionales*.
   - *Estructura Organizacional y Organigrama* (Perfiles y Descripción de Puestos Principales).
   - *Estructura Legal, Fiscal y Regulatoria* (Figura Societaria, Régimen Fiscal SAT, Propiedad Intelectual, Protección de Datos LFPDPPP).
   - *Requisitos y Cumplimiento Normativo en Tiendas de Distribución Oficiales*.
   - *Modelo de Negocio Canvas* (Matriz Resumen y Análisis Detallado del Modelo de Negocio).
4. Verify that no sections, figures or legal details are lost or hallucinated.
5. Record the detailed change log in `.tickets/001-process-raw-organizational-study/changelog.md`.

---

## Verification

Follow the objective criteria in [spec.md](spec.md).

---

## Change Log

Record in `changelog.md`:
- Files created or modified.
- Total word/line count of the extracted draft.
- Summary of sections processed and any structural anomalies found in the raw source.
