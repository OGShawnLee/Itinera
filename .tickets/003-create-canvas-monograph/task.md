# 003 — Create exhaustive Business Model Canvas monograph grounded in Itinera specification

| Field | Value |
| :--- | :--- |
| **ID** | 003 |
| **Status** | draft |
| **Model** | inherit |
| **Role** | Business Systems Analyst / Researcher |
| **Spec** | [spec.md](spec.md) |

---

## Context & Purpose

The Business Model Canvas (Osterwalder & Pigneur) is a central strategic tool used across the academic lifecycle and commercial formulation of Itinera. While `.routing/academic/SPECIFICATION.md` contains a preliminary 1-page canvas, the team requires an exhaustive, rigorous reference monograph that:
1. Explains the epistemological and operational mechanics of the Canvas framework (9 interrelated building blocks).
2. Establishes the canonical criteria for what each module must contain specifically for Itinera's domain.
3. Incorporates the real-world findings from `SPECIFICATION.md` (MVP of 125-250cc motorcycles, B2C vs B2B micro-fleets, anti-fatigue low-touch interaction, and workshop/mechanic relationships).
4. Serves as the objective benchmark against which the 4-page detailed Canvas in `DRAFT_ORGANIZATIONAL_STUDY.md` will be audited in Ticket 002.

---

## Scope

### May create or edit:
- `.routing/reference/BUSINESS_MODEL_CANVAS.md` (the comprehensive reference monograph).
- `.tickets/003-create-canvas-monograph/changelog.md` (the worker change log).

### Must not touch:
- `.routing/CONTEXT.md`
- `.routing/PROGRESS.md`
- `.routing/academic/SPECIFICATION.md`
- `.routing/academic/DRAFT_NOTES.md`
- `.routing/academic/DRAFT_ORGANIZATIONAL_STUDY.md`
- `.routing/reference/DESIGN_THINKING.md`
- `.tickets/001-process-raw-organizational-study/*`
- `.tickets/002-contrast-organizational-study-vs-specification/*`
- `README.md`
- Any source code or project configuration files.

---

## Inputs

The worker must consult:
1. `.routing/academic/SPECIFICATION.md` (the primary domain ground truth: problem definition, CCU segmentation, principles, and preliminary canvas).
2. `.routing/reference/DESIGN_THINKING.md` (methodological companion showing how empathy and definition feed into the value proposition).

---

## Task Steps

1. **Theoretical Foundations of the Business Model Canvas:**
   - Formal definition, historical context (Alexander Osterwalder & Yves Pigneur, Strategyzer).
   - The anatomy of the canvas: Left side (Efficiency/Infrastructure), Right side (Value/Customers), Center (Value Proposition), and Bottom (Financial Viability).
   - Relationship with agile methodologies and Design Thinking (how user empathy maps directly to Value Proposition and Customer Segments).

2. **Exhaustive Breakdown of the 9 Building Blocks Applied to Itinera:**
   - **1. Propuesta de Valor (Value Proposition):** Explain core vs. secondary value. Detail how Itinera delivers health visibility, predictability, and low-touch logging without cognitive overload.
   - **2. Segmentos de Clientes (Customer Segments):** Apply the refined CCU (B2C urban motorcyclists 125-250cc with age concentration 20-35, automotive users, and B2B delivery companies as an expansion roadmap).
   - **3. Canales (Channels):** Distribution through app stores (Google Play, App Store), organic community referral, and physical repair shop touchpoints.
   - **4. Relación con Clientes (Customer Relationships):** Automated, low-friction self-service combined with transparent, non-intrusive alerts.
   - **5. Fuentes de Ingresos (Revenue Streams):** Freemium model mechanics, exportable verified vehicle health certificates, and potential affiliate/partnership commissions with workshops.
   - **6. Recursos Clave (Key Resources):** Maintenance interval knowledge base, algorithmic estimation logic, mobile tech stack, and developer team.
   - **7. Actividades Clave (Key Activities):** Continuous app maintenance, curation of motorcycle service intervals, UX optimization for rapid check-ins, and user feedback processing.
   - **8. Socios Clave (Key Partnerships):** Local motorcycle repair shops, spare parts distributors, rider clubs/associations, and insurance companies.
   - **9. Estructura de Costes (Cost Structure):** Developer store accounts, server/cloud infrastructure, continuous testing/QA, and administrative/tax overhead.

3. **Interconnection with Other Tickets and Value for Project Architecture:**
   - Explain how this monograph arms the auditor in Ticket 002 to distinguish viable business logic from AI-generated fluff in the organizational study.
   - Explain how the Canvas translates into data requirements for `.routing/DOMAIN.md` (e.g., entity models for Vehicles, Services, Workshops, Subscriptions).

4. **Verify all checks in `spec.md`.**
5. **Record metrics and summary in `changelog.md`.**

---

## Verification

Follow the objective criteria in [spec.md](spec.md).
