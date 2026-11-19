# 003 — Design and structure Itinera Market Study deliverable (STUDY.md TASK 1–5)

| Field | Value |
| :--- | :--- |
| **ID** | 003 |
| **Status** | completed |
| **Model** | Gemini 4 Hydrogen (low thinking) |
| **Role** | Business Systems Analyst / Researcher |
| **Spec** | [spec.md](spec.md) |
| **Depends on** | Ticket `002-create-market-study-reference` (`.routing/reference/MARKET_STUDY.md`) |

---

## Context & Purpose

With the theoretical framework established in `.routing/reference/MARKET_STUDY.md`, the team needs the actionable academic Market Study document for Itinera at `.routing/academic/MARKET_STUDY.md` aligned to `STUDY.md` (`## Estudio de Mercado`, `TASK` 1–5) and reconciled with [SPECIFICATION.md](../../.routing/academic/SPECIFICATION.md) and [DOMAIN.md](../../.routing/DOMAIN.md).

Because real primary fieldwork (surveys and interviews) has NOT been collected yet, this ticket completes `TASK 1`, `TASK 2` (with verified secondary research + complete ready-to-apply survey/interview instruments for both customer/partner segments), and `TASK 3` (verified study universe and statistical sample-size calculation), while providing clean, structured templates marked `[PENDIENTE DE RECOLECCIÓN EN CAMPO]` for `TASK 4` (results analysis) and `TASK 5` (conclusions feeding Technical, Economic-Financial, Business Model, and Organizational studies).

---

## Scope

### May create or edit:
- `.routing/academic/MARKET_STUDY.md` (the project Market Study document in Spanish).
- `.tickets/003-design-itinera-market-study/changelog.md` (the worker change log).

### Must not touch:
- `STUDY.md` or any `.pdf` file in the repository root.
- `.routing/CONTEXT.md`
- `.routing/PROGRESS.md`
- `.routing/DOMAIN.md`
- `.routing/academic/SPECIFICATION.md`
- `.routing/academic/DRAFT_NOTES.md`
- `.routing/reference/MARKET_STUDY.md`
- `.routing/reference/BUSINESS_MODEL_CANVAS.md`
- `.routing/reference/DESIGN_THINKING.md`
- `.tickets/001-create-canvas-monograph/*`
- `.tickets/002-create-market-study-reference/*`
- `.tickets/draft-plan-technical-routing-tickets/*`
- `README.md`
- Any source code or project configuration files.

---

## Inputs

Read these files before writing (paths relative to this ticket folder):
1. Consigna académica de Estudio de Mercado (incorporada en [spec.md](spec.md)) — Lineamientos de `## Estudio de Mercado`: pasos generales, 4 estudios de detalle y `TASK 1–5`.
2. [MARKET_STUDY.md](../../.routing/reference/MARKET_STUDY.md) — Theoretical definitions, sampling tree, `Z` table, and parenthesized finite/infinite sample formulas created in Ticket `002`.
3. [SPECIFICATION.md](../../.routing/academic/SPECIFICATION.md) — Geographic focus (Xalapa, Veracruz / Mexico), MVP target (`125–250cc` motorcycles, `50–100+ km/día` semestral cohort + moderate urban riders), Low-Touch mechanics, 3-phase monetization, and excluded items.
4. [DOMAIN.md](../../.routing/DOMAIN.md) — Canonical entity names (`Vehicle`, `ServiceTemplate`, `ConsumableItem`, `WearTrafficLight`, `OdometerProjection`, `WeeklyCheckIn`, `MaintenanceLog`, `SurgicalAlert`, `ExportableSummary`, `ContextualPromotion`, `PlusSubscription`).
5. [BUSINESS_MODEL_CANVAS.md](../../.routing/reference/BUSINESS_MODEL_CANVAS.md) — Customer segments, channels, and revenue gates.

---

## Task

1. Verify that `.routing/reference/MARKET_STUDY.md` (from Ticket `002`) already exists before proceeding. If it is missing, STOP and record the blocker in `changelog.md`.
2. Use `search_web` concisely (3–5 targeted queries max) to gather real, verifiable **secondary sources** for Xalapa / Veracruz / Mexico (do NOT invent official statistics). **IMPORTANT:** Do NOT call `read_url_content` in parallel or loop over heavy JS/SPA portals (`inegi.org.mx`, `datamexico`, `oem.com.mx`); extract exact figures, years, and canonical domain/source names directly from `search_web` results (or at most 1–2 lightweight static reads) so execution stays fast and reliable:
   - Registered motorcycle fleet (*parque vehicular de motocicletas en circulación*) in Mexico, Veracruz state, and Xalapa municipality (e.g., INEGI *Vehículos de motor registrados en circulación* / CEIEG Veracruz, citing exact year and source URL/portal).
   - Reference counts or context on motorcycle repair workshops / parts stores (*refaccionarias y talleres mecánicos*) in Xalapa or Veracruz (e.g., INEGI DENUE or verifiable commercial directories).
   - Direct/indirect digital competitors on Google Play / Mexico (e.g., **Drivvo**, **Fuelio**, **MotoLog / Mis Autos**, plus paper glovebox notebooks and WhatsApp/notes), recording their pricing/monetization model and primary user friction (fuel/expense accounting vs. Low-Touch maintenance).
3. Create `.routing/academic/MARKET_STUDY.md` written in **Spanish** with the 5 `TASK` sections matching `STUDY.md` plus a final Section 6 for complete references:
   - **1. Objetivo del Estudio de Mercado (`TASK 1`)**
     - **Objetivo General** (validate market viability for Itinera's reconciled MVP + Fase 1 attribution loop in Xalapa, Veracruz).
     - **Objetivos Específicos** separated cleanly into Demand, Supply/Competition, Commercialization Channels, and Price/Monetization Willingness (`$0 MXN` B2C MVP vs. Fase 1 `ContextualPromotion` B2B redemption value).
   - **2. Metodología, Fuentes e Instrumentos de Recolección (`TASK 2`)**
     - **Estilo de estudio:** Mixed design — Quantitative probabilistic/quota survey for Segment A (B2C riders) + Qualitative/Exploratory structured interviews for Segment B (B2B shops), explicitly justifying why per `Estudio-Mercado-2.pdf`.
     - **Fuentes Secundarias:** Table of verified data retrieved in Step 2 (with exact figure, geographic scope, year, and verifiable source link/citation) + competitor benchmark table (Drivvo, Fuelio, analog notebooks/spreadsheets).
     - **Fuentes Primarias — Dos Instrumentos Específicos (cumpliendo regla `STUDY.md` línea 43):**
       - **Instrumento A: Encuesta Estructurada para Motociclistas `125–250cc` (Segmento B2C).** Ready to copy into Google Forms (12–15 closed/scale questions with explicit answer choices). Must measure:
         1. Filter question: motorcycle displacement (`125–250cc` vs. other) & Android OS usage.
         2. Daily riding intensity (`<20`, `20–49`, `50–100+ km/día`) and role (delivery/work vs. commute).
         3. Physical odometer status (working vs. broken *chicote* / unreliable dashboard).
         4. Top failure/unplanned expense pain across the 5 `ConsumableItem`s (oil, chain/sprocket, brakes, spark plug, tires).
         5. Current tracking method (memory, paper, Drivvo/app, mechanic's sticker).
         6. Acceptance of Low-Touch UX: 1-tap `WeeklyCheckIn` notification (`<5 s/week`) and surgical-only `SurgicalAlert` vs. notification fatigue.
         7. Perceived value of `WearTrafficLight` (Yellow budget window) and free `ExportableSummary` (as retention/resale reference, NOT `$49 MXN` paid certificate).
         8. Willingness to redeem a local discount coupon shown inside Yellow/Red alerts (`ContextualPromotion`).
       - **Instrumento B: Guion de Entrevista / Sondeo para Dueños de Refaccionarias y Talleres Locales (Segmento B2B — Fase 1).** Ready for field visits in Xalapa (8–10 structured questions). Must measure:
         1. Type of business (refaccionaria, taller independiente, ambos) and monthly volume of `125–250cc` customers.
         2. Current customer acquisition channels and seasonal valleys.
         3. Average ticket in oil/brakes/chain kit/tires.
         4. Willingness to offer a traceable counter discount coupon (`ContextualPromotion`) vs. paying fixed ad fees, and acceptable CPA/margin per verified counter redemption (without requiring Itinera "field certification").
   - **3. Universo de Estudio y Cálculo de Muestreo (`TASK 3`)**
     - Funnel breakdown (*Mercado Potencial $\to$ Disponible $\to$ Cualificado Disponible $\to$ Meta/Target $\to$ Piloto Semestral*) anchored to the verified INEGI motorcycle count in Xalapa/Veracruz (`N`) and local Android penetration.
     - Explicit step-by-step finite-universe sample calculation ($n = \frac{z^2 N p q}{e^2(N - 1) + z^2 p q}$) for **Segmento A (B2C)** showing chosen `Z` (`95% = 1.96`), `e` (`±5% = 0.05`, plus sensitivity note for `±7%` or `±10%` if academic field time is constrained), `p = 0.5`, `q = 0.5`, and exact arithmetic result `n`.
     - Explicit non-probabilistic sampling justification (convenience / judgment / quota by Xalapa commercial zones and `50–100+ km/día` vs. `20–49 km/día` cohorts) for **Segmento B (B2B shops)** and practical semestral pilot quota.
   - **4. Análisis de Resultados (`TASK 4 — Plantilla de Vaciado`)**
     - Structured subsections mapped to the 4 detailed analyses in `STUDY.md` (*4.1 Análisis de la Demanda*, *4.2 Análisis de la Oferta*, *4.3 Análisis de Canales de Comercialización*, *4.4 Análisis de Precios y Disposición a Pagar*), plus a **FODA** synthesis table.
     - Mark every metric/chart slot clearly as `[PENDIENTE DE RECOLECCIÓN EN CAMPO]` with zero fabricated survey percentages.
   - **5. Conclusiones y Proyección hacia Estudios Posteriores (`TASK 5 — Plantilla de Cierre`)**
     - Structured placeholders `[PENDIENTE DE RESULTADOS]` showing exact decision hypotheses to feed: (a) Estudio Técnico, (b) Estudio Económico-Financiero, (c) Adecuaciones al Business Model Canvas, and (d) Estudio Organizacional.
   - **6. Referencias y Fuentes Consultadas**
     - Formal numbered bibliography listing: (a) every external secondary source/URL/statistic consulted on the internet during Step 2 (INEGI, CEIEG Veracruz, DENUE, Drivvo, Fuelio, etc. with exact title, institution/author, year, and URL), and (b) internal project documents (`STUDY.md`, `reference/MARKET_STUDY.md`, `SPECIFICATION.md`, `DOMAIN.md`, `BUSINESS_MODEL_CANVAS.md`).
4. Double-check that NO invented survey results, NO `$49 MXN` Year-1 cryptographic PDF, NO `CertifiedWorkshopDirectory`, and NO `## Estudio Técnico` sections appear as completed content.
5. Verify every check in [spec.md](spec.md).
6. Write `.tickets/003-design-itinera-market-study/changelog.md` recording files touched, search queries/sources verified, sample-size math check, question counts per instrument, and scope compliance.

---

## Verification

Follow the objective criteria in [spec.md](spec.md).

---

## Change Log

Record in `.tickets/003-design-itinera-market-study/changelog.md`:
- Files created or modified.
- Total line count, word count, exact question counts for Instrument A and Instrument B, and exact `N` / `n` numbers calculated in Section 3.
- List of verified external secondary source URLs used in Section 2.
- Confirmation that no survey results were fabricated and no out-of-scope files were edited.
