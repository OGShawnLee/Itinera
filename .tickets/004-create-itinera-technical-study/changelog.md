# Changelog — Ticket 004: Create Itinera Technical Study

- **Ticket:** `004-create-itinera-technical-study`
- **Date:** 2026-11-17
- **Status:** Completed

---

## 1. Files Created / Modified

| File | Action | Purpose |
| :--- | :--- | :--- |
| [`.routing/academic/TECHNICAL_STUDY.md`](../../.routing/academic/TECHNICAL_STUDY.md) | Created | Complete **Estudio Técnico** deliverable in Spanish aligned with `STUDY.md` (lines 45–68), the 3 course reference PDFs, `Emprendimiento Tecnologico - Estudio Organizacional - ITINERA.pdf`, `SPECIFICATION.md`, `DOMAIN.md`, `BUSINESS_MODEL_CANVAS.md`, and `reference/MARKET_STUDY.md`. |
| [`.tickets/004-create-itinera-technical-study/changelog.md`](changelog.md) | Created | Execution metrics, reconciliation summary, and scope compliance log. |

---

## 2. Deliverable Metrics (`.routing/academic/TECHNICAL_STUDY.md`)

- **Total lines:** `372`
- **Total words:** `6,714`
- **Mermaid diagrams:** `4`
  1. *Plano Lógico Operativo Remote-First — Itinera (Fase 0 MVP, Xalapa)* (Section 3.2)
  2. *Diagrama de Bloques — Proceso de Producción y Despliegue de Software (SDLC Fase 0)* (Section 4.2)
  3. *Diagrama de Flujo de Proceso del Servicio en App (Simbología ASME Adaptada)* (Section 4.2)
  4. *Organigramas Reconciliados por Fase (Fase 0 Lean vs. Fase 1–2 Estructura Expandida)* (Section 6.1)

---

## 3. Reconciliation Summary (`Estudio Organizacional` vs. `SPECIFICATION.md` & `DOMAIN.md`)

Preserved the valid legal, fiscal, IP, privacy, and remote-first operational framework from `Emprendimiento Tecnologico - Estudio Organizacional - ITINERA.pdf` (`S.A.S.`, `SAT`/`RESICO-PM`/`CFDI 4.0`, `IMPI` Niza Classes 9 & 42, `INDAUTOR`, `LFPDPPP`/ARCO, Google Play Console `.aab` + `Data Safety`), while explicitly reconciling pre-audit assumptions onto the 3-phase MVP gates:

1. **Cloud Infrastructure vs. Local-First:** Deferred Day-1 AWS/GCP cloud servers and PostgreSQL to Fase 1–2 (`PlusSubscription` / `MicroFleetAccount`); Fase 0 runs 100% **Local-First on SQLite** (`$0 MXN` backend/storage).
2. **Multiplatform iOS vs. Android-First:** Prioritized **Android-First** (`$25 USD` one-time Google Play Console) for Fase 0 (`>85%` of Mexican `125–250cc` riders); deferred Apple App Store (`$99 USD/yr` + `D-U-N-S`) to Fase 2.
3. **7-Role Paid Org Chart vs. 3-Founder Lean Phase 0:** Kept the 7-position org chart from the Organizational Study as the **Fase 1–2 target structure**, bridged from a **Fase 0 Lean structure** of the 3 co-founders in dual roles (**Gerardo Abraham Barrón Gómez**, **Edgar Vázquez García**, **Alberto Villalba Figueroa**) with `$0 MXN` fixed payroll.
4. **Certified Workshops & Paid PDF Certificates:** Excluded `CertifiedWorkshopDirectory` (replaced by traceable `ContextualPromotion` coupons in Fase 1) and relocated the paid `$49 MXN` cryptographic certificate to a free local `ExportableSummary` in Fase 0.
5. **Target Scope & Growth Gates:** Anchored Fase 0 validation to `125–250cc` owner-operated motorcycles (`50–100+ km/día` semestral cohort in Xalapa), deferring cars and `MicroFleetAccount` (`3–15` light units) to Fase 2 and permanently excluding `HeavyDutyFleet` and driver behavior audits without hardware.

---

## 4. Verification & Scope Check

- [x] Check 1: `.routing/academic/TECHNICAL_STUDY.md` exists, is written in Spanish, and is non-empty (`372` lines).
- [x] Check 2: All 8 required sections are present and map cleanly to `STUDY.md` lines 45–68 and course methodology.
- [x] Check 3: Section 2 includes weighted **Método Cualitativo por Puntos** (`Xalapa = 9.05` vs. `Puerto de Veracruz = 7.30` and `CDMX = 6.00`) + remote-first microlocalization.
- [x] Check 4: Section 3 includes Mermaid operational layout diagram + space specification table with explicit note excluding industrial civil works/drainage.
- [x] Check 5: Section 4 includes SDLC block diagram, ASME service flow diagram, comparative **Cursograma Analítico**, and phase-separated resource/cost table.
- [x] Check 6: Section 5 aligns with Organizational Study legal/fiscal/IP/privacy/Play Store requirements while deferring iOS to Fase 2.
- [x] Check 7: Section 6 includes Fase 0 lean + Fase 1–2 expanded org charts and explicit **Tabla de Reconciliación Técnico–Organizacional**.
- [x] Check 8: Section 8 cites all 3 Technical Study PDFs (with internal citations: Colón 2011, UNAM 2017, Baca 2010, Martínez et al. 2015 / Tomato-Mix, Universidad de Castilla-La Mancha, NMX-TT-006-1996-IMNC), Organizational Study PDF, `STUDY.md`, and internal `.routing/` canonical files.
- [x] Check 9: Strict scope respected — verified via `git status --short` that no out-of-scope files (`STUDY.md`, PDFs, `.routing/CONTEXT.md`, `.routing/PROGRESS.md`, `.routing/DOMAIN.md`, `.routing/academic/SPECIFICATION.md`, `.routing/reference/*`, other tickets, or source code) were modified.
- [x] Check 10: This `changelog.md` created with complete metrics and scope confirmation.
