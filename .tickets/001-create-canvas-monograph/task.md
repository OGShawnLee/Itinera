# 001 — Create exhaustive Business Model Canvas monograph grounded in Itinera specification

| Field | Value |
| :--- | :--- |
| **ID** | 001 |
| **Status** | completed |
| **Model** | Gemini 4 Hydrogen (medium thinking) |
| **Role** | Business Systems Analyst / Researcher |
| **Spec** | [spec.md](spec.md) |

---

## Context & Purpose

The Business Model Canvas (Osterwalder & Pigneur) is a central strategic tool used across the academic lifecycle and commercial formulation of Itinera. While `.routing/academic/SPECIFICATION.md` contains the reconciled horizon-based Canvas (Section 6) and `.routing/DOMAIN.md` defines the conceptual domain entities, the team requires an exhaustive, rigorous reference monograph that:
1. Explains the epistemological and operational mechanics of the Canvas framework (9 interrelated building blocks).
2. Establishes the canonical criteria for what each module contains specifically for Itinera's reconciled domain (MVP Android-First / Local-First for 125–250cc motorcycles, semestral high-usage validation cohort, zero-cost Fase 0, attribution-based local promotions in Fase 1, and B2B micro-fleets / distributors in Fase 2).
3. Prevents scope creep and ungrounded assumptions (e.g., paid cryptographic PDFs in Year 1, field-certified workshop directories, or active social-media support debt).
4. Maps every business-model mechanism directly to concrete entities in `.routing/DOMAIN.md`.

---

## Scope

### May create or edit:
- `.routing/reference/BUSINESS_MODEL_CANVAS.md` (the comprehensive reference monograph).
- `.tickets/001-create-canvas-monograph/changelog.md` (the worker change log).

### Must not touch:
- `.routing/CONTEXT.md`
- `.routing/PROGRESS.md`
- `.routing/DOMAIN.md`
- `.routing/academic/SPECIFICATION.md`
- `.routing/academic/DRAFT_NOTES.md`
- `.routing/reference/DESIGN_THINKING.md`
- `.tickets/draft-plan-technical-routing-tickets/*`
- `README.md`
- Any source code or project configuration files.

---

## Inputs

The worker must consult:
1. `.routing/academic/SPECIFICATION.md` (the canonical reconciled ground truth: problem definition, boundaries table, CCU segmentation, Low-Touch principles, 3-phase monetary model, and scope-cut log).
2. `.routing/DOMAIN.md` (entity dictionary and mathematical invariants showing how Canvas value maps to `Vehicle`, `ServiceTemplate`, `ConsumableItem`, `ExportableSummary`, `ContextualPromotion`, `PlusSubscription`, `SupplierSponsorship`, and `MicroFleetAccount`).
3. `.routing/reference/DESIGN_THINKING.md` (methodological companion showing how empathy and definition feed into the value proposition).

---

## Task Steps

1. **Theoretical Foundations of the Business Model Canvas:**
   - Formal definition, historical context (Alexander Osterwalder & Yves Pigneur, Strategyzer).
   - The anatomy of the canvas: Left side (Efficiency/Infrastructure), Right side (Value/Customers), Center (Value Proposition), and Bottom (Financial Viability).
   - Relationship with agile methodologies and Design Thinking (how user empathy maps directly to Value Proposition and Customer Segments).

2. **Exhaustive Breakdown of the 9 Building Blocks Applied to Itinera (Reconciled 3-Phase Horizon):**
   - **1. Propuesta de Valor (Value Proposition):** Unified core value (`WearTrafficLight` of 5 consumables, `WeeklyCheckIn`, free `ExportableSummary`) for B2C drivers + measurable counter-attribution (`ContextualPromotion`) for local shops in Fase 1.
   - **2. Segmentos de Clientes (Customer Segments):** Distinguish the semestral MVP validation cohort (125–250cc owner-operators at `50–100+ km/day`), moderate urban riders, Fase 1 local auto-parts shops/workshops (the paying side), and Fase 2 segments (cars, multi-vehicle Plus power users, B2B micro-fleets 3–15 units).
   - **3. Canales (Channels):** Google Play Store organic ASO, word-of-mouth/local rider clubs, and Fase 1 physical QR traction at partner counters (no active social-media management debt).
   - **4. Relación con Clientes (Customer Relationships):** Strict in-app self-service, non-intrusive surgical alerts + weekly 1-tap check-in, and passive automated crash reporting (`Crashlytics`).
   - **5. Fuentes de Ingresos (Revenue Streams):** Honest 3-phase model: Fase 0 (`$0 MXN` retention validation, free exportable summary), Fase 1 (`ContextualPromotion` via traceable counter coupons + optional `PlusSubscription` for 3+ vehicles/cloud sync), and Fase 2 (`SupplierSponsorship` + `MicroFleetAccount`).
   - **6. Recursos Clave (Key Resources):** 3 curated editable `ServiceTemplate` presets for 125–250cc, Local-First SQLite engine + projection math, and engineering team.
   - **7. Actividades Clave (Key Activities):** Android-First / Local-First development, wear-estimation & Low-Touch UX refinement, and semestral cohort retention validation.
   - **8. Socios Clave (Key Partnerships):** Local auto-parts stores & workshops via traceable coupons (Fase 1), regional supply distributors (Fase 2), excluding field-certified workshop audits.
   - **9. Estructura de Costes (Cost Structure):** MVP lean baseline (`$25 USD` one-time Google Play fee, `$0` cloud/SMS/gateway costs) vs. conditional scaling costs (backend sync/storage, Apple `$99 USD/year` only when justified, payment gateway fees).

3. **Interconnection with Domain & Engineering Roadmap:**
   - Map each Canvas building block to its corresponding entity or explicit exclusion in `.routing/DOMAIN.md`.
   - Explain how the 3-phase monetization gates protect the engineering roadmap from premature cloud, payment, or field-operations debt.

4. **Language & Format:** Write `.routing/reference/BUSINESS_MODEL_CANVAS.md` in **Spanish** (matching `SPECIFICATION.md`, `DOMAIN.md`, and `DESIGN_THINKING.md`). Keep `changelog.md` concise in English or Spanish.
5. **Verify all checks in `spec.md`.**
6. **Record metrics and summary in `changelog.md`.**

---

## Verification

Follow the objective criteria in [spec.md](spec.md).
