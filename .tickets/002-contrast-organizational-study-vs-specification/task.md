# 002 — Contrast organizational study against specification and Design Thinking foundations

| Field | Value |
| :--- | :--- |
| **ID** | 002 |
| **Status** | draft |
| **Model** | inherit |
| **Role** | Auditor / Systems Analyst |
| **Spec** | [spec.md](spec.md) |

---

## Context & Critical Objective

The raw organizational study (`DRAFT_ORGANIZATIONAL_STUDY.md`) was produced rapidly under academic deadlines using AI generation. Consequently, it contains accelerated assumptions, potential corporate hallucinations, and premature complexities that may clash with the grounded reality of Itinera.

The purpose of this ticket is **NOT** to validate the organizational study uncritically, but to **audit and contrast** it against:
1. The human-centered foundations established in `.routing/reference/DESIGN_THINKING.md`.
2. The refined problem definition, user segmentation, and MVP boundaries in `.routing/academic/SPECIFICATION.md`.

The worker must produce an actionable gap analysis and audit report that separates **viable strategic decisions** from **AI hallucinations or ungrounded corporate fluff**.

---

## Scope

### May create or edit:
- `.routing/reference/GAP_ANALYSIS_ORGANIZATIONAL_STUDY.md` (the primary audit and contrast report).
- `.tickets/002-contrast-organizational-study-vs-specification/changelog.md` (the worker change log).

### Must not touch:
- `.routing/CONTEXT.md`
- `.routing/PROGRESS.md`
- `.routing/academic/SPECIFICATION.md`
- `.routing/academic/DRAFT_NOTES.md`
- `.routing/academic/DRAFT_ORGANIZATIONAL_STUDY.md`
- `.routing/reference/DESIGN_THINKING.md`
- `.routing/reference/BUSINESS_MODEL_CANVAS.md`
- `README.md`
- Any source code, tests, or other tickets.

---

## Inputs

The worker must read and contrast these exact files:
1. `.routing/academic/DRAFT_ORGANIZATIONAL_STUDY.md` (the raw organizational, legal, and Canvas document to be audited).
2. `.routing/academic/SPECIFICATION.md` (the canonical ground truth of the problem, MVP scope, and CCU).
3. `.routing/reference/DESIGN_THINKING.md` (the methodological framework, Double Diamond, human factors, and anti-fatigue UX principles).
4. `.routing/reference/BUSINESS_MODEL_CANVAS.md` (the canonical reference monograph on the 9 building blocks produced in Ticket 003).

---

## Task Steps

1. **Perform a systematic contrast across 5 analytical dimensions:**
   - **Dimensión 1: Coherencia de Propuesta de Valor y Alcance (Anti-Scope Creep):**  
     Confront *La Empresa (Misión, Visión, Oferta de Valor)* vs. *MVP de Motocicletas 125–250cc*. Detect if the PDF promises bloated telematics, enterprise fleets, or car databases not supported in MVP.
   - **Dimensión 2: Fricción Legal y Regulatoria vs. Principios UX:**  
     Confront *Protección de Datos (LFPDPPP) y Políticas de Tiendas Oficiales* vs. *Low-Touch Logging y Notificaciones Quirúrgicas*. Detect if permission requirements or data collection create excessive user friction or fear.
   - **Dimensión 3: Factibilidad del Organigrama vs. Realidad Operativa del Proyecto:**  
     Confront the organizational structure and job descriptions against a realistic student/indie MVP development team. Highlight corporate bloat vs. essential technical roles.
   - **Dimensión 4: Modelo de Negocio Canvas (Preliminar vs. Detallado):**  
     Confront the 9 blocks. Analyze revenue viability (Freemium, export fees, workshop alliances), cost structures (SAT, developer fees), and verify if workshop and delivery driver relationships are coherent.
   - **Dimensión 5: Auditoría de Generación por IA (Detección de Alucinaciones / Fluff):**  
     Explicitly identify boilerplate text, disconnected generic corporate buzzwords, and evaluate the real reason why each decision was written and whether it is technically and economically viable.

2. **Generate the output report at `.routing/reference/GAP_ANALYSIS_ORGANIZATIONAL_STUDY.md` containing:**
   - Executive Summary of the contrast.
   - **Bidirectional Alignment Matrix:** Table covering every section with status flags (`ALINEADO`, `DISCREPANCIA / RIESGO`, `ALUCINACIÓN / FLUFF`, `EVOLUCIÓN POSITIVA`).
   - Detailed breakdown of each discrepancy with explicit quotes/references to both documents.
   - **Veredicto y Directivas de Software:** Directives for what stays, what is pruned, and what directly informs `.routing/DOMAIN.md` and `.routing/INFRASTRUCTURE.md`.

3. **Follow verification criteria in `spec.md`.**
4. **Record the change log at `.tickets/002-contrast-organizational-study-vs-specification/changelog.md`.**

---

## Verification

Follow the objective checks in [spec.md](spec.md).
