# 002 — Create theoretical-practical Market Study reference monograph for Itinera

| Field | Value |
| :--- | :--- |
| **ID** | 002 |
| **Status** | completed |
| **Model** | Gemini 4 Hydrogen (high thinking) |
| **Role** | Business Systems Analyst / Researcher |
| **Spec** | [spec.md](spec.md) |

---

## Context & Purpose

The team received the assignment guidelines in [STUDY.md](../../STUDY.md) (lines 1–44, `## Estudio de Mercado`) along with two course slide decks in the repository root:
- `Act.-6---Estudio-de-Mercado_0303.pdf` (37 slides, Angel de Jesús Sánchez Morales, *Economía para la Toma de Decisiones*).
- `Estudio-Mercado-2.pdf` (28 slides, Daniel García Morales, *Estudio de mercado*).

Following the pattern of [DESIGN_THINKING.md](../../.routing/reference/DESIGN_THINKING.md) and [BUSINESS_MODEL_CANVAS.md](../../.routing/reference/BUSINESS_MODEL_CANVAS.md), the project needs an authoritative reference monograph at `.routing/reference/MARKET_STUDY.md` that unifies both economic theory and statistical sampling methodology, corrects source errata in the slides, and maps every concept explicitly to Itinera's reconciled MVP/Fase 1/Fase 2 reality.

---

## Scope

### May create or edit:
- `.routing/reference/MARKET_STUDY.md` (the comprehensive Market Study reference monograph in Spanish).
- `.tickets/002-create-market-study-reference/changelog.md` (the worker change log).

### Must not touch:
- `STUDY.md` or any `.pdf` file in the repository root.
- `.routing/CONTEXT.md`
- `.routing/PROGRESS.md`
- `.routing/DOMAIN.md`
- `.routing/academic/SPECIFICATION.md`
- `.routing/academic/DRAFT_NOTES.md`
- `.routing/reference/DESIGN_THINKING.md`
- `.routing/reference/BUSINESS_MODEL_CANVAS.md`
- `.tickets/001-create-canvas-monograph/*`
- `.tickets/003-design-itinera-market-study/*`
- `.tickets/draft-plan-technical-routing-tickets/*`
- `README.md`
- Any source code or project configuration files.

---

## Inputs

Read these files before writing (paths relative to this ticket folder):
1. [STUDY.md](../../STUDY.md) — Read lines 1–44 ONLY (`## Estudio de Mercado`). Do NOT include `## Estudio Técnico` (lines 45–68).
2. [Act.-6---Estudio-de-Mercado_0303.pdf](../../Act.-6---Estudio-de-Mercado_0303.pdf) — All 37 slides (economic theory, internal/external variables, supply, demand, price elasticity, market equilibrium, 5 market classifications, 5 demand funnel levels).
3. [Estudio-Mercado-2.pdf](../../Estudio-Mercado-2.pdf) — All 28 slides (6-step execution workflow, SWOT/FODA tool, sampling taxonomy tree, 4 key sample-size factors, confidence level `Z` table, finite and infinite sample formulas, INEGI worked example).
4. [SPECIFICATION.md](../../.routing/academic/SPECIFICATION.md) — Canonical MVP boundaries (125–250cc motorcycles, Android-First, Local-First SQLite), semestral validation cohort (`50–100+ km/día`), Low-Touch check-ins, 3-phase monetary model, and Section 7 scope-cut log.
5. [DOMAIN.md](../../.routing/DOMAIN.md) — Canonical entities (`Vehicle`, `ServiceTemplate`, `ConsumableItem`, `WearTrafficLight`, `OdometerProjection`, `WeeklyCheckIn`, `MaintenanceLog`, `SurgicalAlert`, `ExportableSummary`, `ContextualPromotion`, `PlusSubscription`, `SupplierSponsorship`, `MicroFleetAccount`) and explicit exclusions.
6. [BUSINESS_MODEL_CANVAS.md](../../.routing/reference/BUSINESS_MODEL_CANVAS.md) — Reference formatting style (Mermaid flowcharts, structured tables, 3-horizon alignment).

---

## Task

1. Create `.routing/reference/MARKET_STUDY.md` written in **Spanish** matching the analytical tone and markdown structure of `BUSINESS_MODEL_CANVAS.md`.
2. Structure `.routing/reference/MARKET_STUDY.md` into these 6 exact sections:
   - **1. Fundamentos Económicos y Alcance del Estudio de Mercado**
     - Formal definition, purpose, and role of Marketing Information Systems (*Personas, Equipos, Procesos, Procedimientos*).
     - Internal variables (*Clientes, Demanda, Oferta, Comercialización, Consumo, Precio*) vs. External variables (*Competencia, Gustos, Preferencias, Tendencia del consumidor, Condiciones políticas y legales, Tecnología*).
     - The 6 general steps and 4 detailed sub-studies from `STUDY.md` (*Demanda, Oferta, Canales de comercialización, Precio*), plus the complementary **FODA** matrix (explicitly correct the `FDOA` typo from slide 11 of `Estudio-Mercado-2.pdf`).
   - **2. Teoría de Oferta, Demanda, Elasticidad y Clasificación de Mercados**
     - Supply analysis criteria (production capacity, product characteristics, advantages, added value, portfolio) and Demand analysis (price elasticity of demand).
     - Market Equilibrium mechanics (*Exceso de Necesidad*, *Exceso de Oferta*, *Equilibrio de Mercado*) with a conceptual diagram or table.
     - All 5 market classifications from `Act.-6---Estudio-de-Mercado_0303.pdf`: Buyer type, Product type, Number of competitors (monopoly to perfect competition), Supply/Demand intensity (*mercado de vendedores* vs. *mercado de compradores*), and Demand type funnel (5 tiers: *Mercado Potencial $\to$ Disponible $\to$ Cualificado Disponible $\to$ Meta/Objetivo $\to$ Actual/Real/Penetrado*).
   - **3. Metodología de Investigación y Técnicas de Muestreo**
     - Include a Mermaid `flowchart TD` illustrating the sampling decision tree from slide 18 of `Estudio-Mercado-2.pdf` (Probabilistic vs. Non-Probabilistic branches and subtypes).
     - Contrast Primary vs. Secondary sources and Quantitative (probabilistic) vs. Qualitative/Exploratory (non-probabilistic) approaches, including study cost trade-offs (time vs. online tools/agencies).
   - **4. Cálculo Estadístico del Tamaño de Muestra**
     - Document the 4 key factors: Null & Alternative Hypothesis ($H_0, H_1$) with $p$/$q$ variability, Finite vs. Infinite universe, Confidence level ($Z$), and Margin of error ($e$).
     - Include the complete Confidence Level `Z` reference table (`90% = 1.645` through `99% = 2.575`, highlighting the industry minimum `95% = 1.96` and `e <= ±5%`).
     - Write the exact KaTeX formulas for both **Finite Universe** (explicitly fixing the missing denominator parentheses from slide 25 of `Estudio-Mercado-2.pdf`: $n = \frac{z^2 N p q}{e^2(N - 1) + z^2 p q}$) and **Infinite Universe** ($n = \frac{z^2 p q}{e^2}$), and summarize the INEGI worked example (`N = 58,300,000`, `99%`, `±4%` $\to$ `1,036` surveys) to verify formula accuracy.
   - **5. Aplicación Canónica al Dominio Reconciliado de Itinera**
     - Map the 4 detailed sub-studies (*Demanda, Oferta, Canales, Precio*) and the 5 demand funnel tiers directly to Itinera's reconciled MVP (`125–250cc`, Android-First, Local-First SQLite) and 3-phase monetary model (`Fase 0: $0 MXN` free app + free `ExportableSummary`; `Fase 1: ContextualPromotion` via traceable counter coupons + optional `PlusSubscription`; `Fase 2: SupplierSponsorship` + `MicroFleetAccount`).
     - Explain how price elasticity operates in a 2-sided / freemium-to-B2B model (zero monetary price in MVP means elasticity shifts to *adoption friction cost*—weekly 1-tap `WeeklyCheckIn`, broken odometer tolerance—while B2B willingness to pay depends on verifiable counter redemption).
     - Explain why `STUDY.md` line 43 mandates two distinct instruments/sections for Itinera: **Segmento A (B2C Conductores 125–250cc: uso intensivo `50–100+ km/día` vs. moderado)** and **Segmento B (B2B Fase 1: Refaccionarias y talleres locales)**.
     - Explicitly note what does NOT belong in Itinera's Market Study (no `$49 MXN` cryptographic PDF in Year 1, no `CertifiedWorkshopDirectory` field audits, no `ExactModelPartsCatalog`, no `HeavyDutyFleet`, no iOS MVP).
   - **6. Referencias Bibliográficas y Documentales**
     - Cite the internal repository docs (`STUDY.md`, `SPECIFICATION.md`, `DOMAIN.md`, `BUSINESS_MODEL_CANVAS.md`) and the academic sources listed in both PDFs.
3. Do NOT invent field survey results or execute the Itinera survey itself (that belongs to Ticket `003`).
4. Verify every check in [spec.md](spec.md).
5. Write `.tickets/002-create-market-study-reference/changelog.md` recording files touched, line/word counts, Mermaid diagram count, and confirmation of scope compliance.

---

## Verification

Follow the objective criteria in [spec.md](spec.md).

---

## Change Log

Record in `.tickets/002-create-market-study-reference/changelog.md`:
- Files created or modified.
- Total line count, word count, and Mermaid diagram count of `.routing/reference/MARKET_STUDY.md`.
- Confirmation that errata from source PDFs (`FDOA` $\to$ `FODA` and finite-sample denominator parentheses) were corrected and no out-of-scope files were edited.
