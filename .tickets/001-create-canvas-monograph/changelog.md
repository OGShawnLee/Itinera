# Changelog — Ticket 001: Business Model Canvas Monograph

- **Date:** 2026-11-16
- **Ticket:** `001-create-canvas-monograph`
- **Deliverable:** `.routing/reference/BUSINESS_MODEL_CANVAS.md`
- **Language:** Spanish (matching `SPECIFICATION.md`, `DOMAIN.md`, and `DESIGN_THINKING.md`)

---

## Metrics

| Metric | Value |
| :--- | :--- |
| **Total Lines** | `360` |
| **Word Count** | `5,604` |
| **File Size** | `42,676` bytes |
| **Mermaid Diagrams** | `3` (Canvas Hemispheres/Anatomy, Reconciled 3-Horizon Canvas, Monetization Gates Protecting Roadmap) |
| **Domain Entities Mapped** | `13` (`Vehicle`, `ServiceTemplate`, `ConsumableItem`, `WearTrafficLight`, `OdometerProjection`, `WeeklyCheckIn`, `MaintenanceLog`, `SurgicalAlert`, `ExportableSummary`, `ContextualPromotion`, `PlusSubscription`, `SupplierSponsorship`, `MicroFleetAccount`) |
| **Domain Exclusions Mapped** | `4` (`CertifiedWorkshopDirectory`, `ExactModelPartsCatalog`, `HeavyDutyFleet`, `FuelAccountingLedger`) |

---

## Summary of Sections Created

1. **Fundamentos Teóricos y Epistemológicos del Business Model Canvas**
   - Formal definition and historical origin (Alexander Osterwalder & Yves Pigneur, *The Business Model Ontology* / *Business Model Generation* / Strategyzer).
   - Canvas anatomy and left/right hemisphere balance (Infrastructure/Efficiency vs. Value/Customers, bridged by Value Proposition, grounded in Financial Viability).
   - Integration with Agile / *Lean Startup* and Design Thinking (`DESIGN_THINKING.md`), detailing how empathy, TPNSc, CCU, and *Low-Touch* principles feed into the Canvas.
2. **Arquitectura General del Business Model Canvas de Itinera (3 Horizontes)**
   - Overview of the asymmetric two-sided platform model across Fase 0 (MVP), Fase 1 (Local Attribution), and Fase 2 (Regional / B2B Scale), accompanied by a Mermaid diagram.
3. **Desglose Exhaustivo de los 9 Módulos Aplicados a Itinera**
   - **Bloque 1 (Propuesta de Valor):** Unified core (`WearTrafficLight`, `OdometerProjection`, `WeeklyCheckIn`, `SurgicalAlert`, `MaintenanceLog`, free `ExportableSummary`) + `PlusSubscription` (Fase 1), `ContextualPromotion` (Fase 1), and `MicroFleetAccount` (Fase 2).
   - **Bloque 2 (Segmentos de Clientes):** Distinction of semestral MVP cohort (`50–100+ km/día` 125–250cc owner-operators, including independent delivery riders owning their bike), moderate urban riders (`15–30 km/día`), transversal B2C niches, Fase 1 paying shops, Fase 2 segments (cars, Plus users, 3–15 unit micro-fleets, regional distributors), and permanent exclusions (`HeavyDutyFleet`, hardwareless driver auditing).
   - **Bloque 3 (Canales):** Google Play organic ASO, word-of-mouth/local clubs boosted by free `ExportableSummary`, Fase 1 counter QR traction, and zero social-media support debt.
   - **Bloque 4 (Relación con Clientes):** Strict *in-app* self-service (`< 30 s` onboarding, `< 15 s` logging), `WeeklyCheckIn` (`< 5 s`), `SurgicalAlert` anti-spam policy, zero SMS/WhatsApp costs, and passive `Crashlytics` telemetry.
   - **Bloque 5 (Fuentes de Ingresos):** 3-phase monetization (`$0 MXN` Fase 0; `ContextualPromotion` + optional `PlusSubscription` in Fase 1 at `>1,000–2,000` MAU; `SupplierSponsorship` + `MicroFleetAccount` in Fase 2 at `>10,000+` MAU) and explicit rationale for eliminating the `$49 MXN` Year-1 cryptographic PDF thesis.
   - **Bloque 6 (Recursos Clave):** 3 editable `ServiceTemplate` presets for 125–250cc, Local-First SQLite engine + projection/dual-metric math, 3-person engineering team, and Fase 1–2 local MAU density.
   - **Bloque 7 (Actividades Clave):** Android-First / Local-First development, Low-Touch UX & wear estimation refinement, semestral cohort retention validation, and conditional Fase 1–2 commercial/cloud activation.
   - **Bloque 8 (Socios Clave):** Zero external operational dependencies in Fase 0, local auto-parts shops/workshops via traceable coupons in Fase 1, regional distributors in Fase 2, and explicit exclusion of field-certified workshop audits (`CertifiedWorkshopDirectory`).
   - **Bloque 9 (Estructura de Costes):** Lean MVP baseline (`$25 USD` one-time Google Play fee + `$0 MXN` cloud/SMS/gateway) vs. conditional Fase 1–2 scaling costs (cloud sync/storage, `$99 USD/año` Apple Developer Program only when justified, payment gateway fees).
4. **Interconexión con el Modelo de Dominio y el Roadmap de Ingeniería**
   - Full traceability matrix mapping all 9 Canvas blocks to entities, mathematical invariants, and exclusions in `.routing/DOMAIN.md`.
   - Analysis and Mermaid diagram showing how Fase 0 / Fase 1 / Fase 2 gates isolate the engineering roadmap (`ROUTES.md`, `DESIGN.md`, `INFRASTRUCTURE.md`) from premature cloud, payment, multi-platform, and field-operations debt.
5. **Conclusión Estratégica**
   - Synthesis of how the reconciled Canvas prevents unviable B2C monetization assumptions, unvalidatable cohorts, and premature technical debt.

---

## Verification Checklist (`spec.md`)

- [x] **Check 1:** `.routing/reference/BUSINESS_MODEL_CANVAS.md` exists and is non-empty (`360` lines, `5,604` words).
- [x] **Check 2:** Complete theoretical framework of Osterwalder's Business Model Canvas included (origin, anatomy, left/right hemisphere balance, Design Thinking connection).
- [x] **Check 3:** All 9 building blocks thoroughly analyzed and grounded in `SPECIFICATION.md`.
- [x] **Check 4:** Explicit mapping section to `.routing/DOMAIN.md` entities and exclusions included; zero references to deleted `DRAFT_ORGANIZATIONAL_STUDY.md` or old Ticket 002.
- [x] **Check 5:** Strict scope respected (no modifications to `CONTEXT.md`, `PROGRESS.md`, `DOMAIN.md`, `SPECIFICATION.md`, `DRAFT_NOTES.md`, `DESIGN_THINKING.md`, `draft-plan-technical-routing-tickets/*`, `README.md`, or source/config files).
- [x] **Check 6:** Change log created at `.tickets/001-create-canvas-monograph/changelog.md` with complete metrics and section summary.
