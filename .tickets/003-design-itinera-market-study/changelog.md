# Change Log — Ticket 003: Design Itinera Market Study (`STUDY.md` TASK 1–5)

- **Ticket:** `003-design-itinera-market-study`
- **Status:** Completed
- **Date:** 2026-11-17

---

## 1. Files Created or Modified (Strict Scope Confirmation)

- **Created:** [`.routing/academic/MARKET_STUDY.md`](file:///C:/Users/OGSha/OneDrive/Escritorio/Developer/App%20Development/Itinera/.routing/academic/MARKET_STUDY.md) — Actionable academic Market Study deliverable written in Spanish (`TASK 1–5` + Section 6 references).
- **Created:** [`.tickets/003-design-itinera-market-study/changelog.md`](file:///C:/Users/OGSha/OneDrive/Escritorio/Developer/App%20Development/Itinera/.tickets/003-design-itinera-market-study/changelog.md) — This change log.
- **Out-of-scope files:** Zero out-of-scope files were created or modified (`STUDY.md`, PDFs, `.routing/CONTEXT.md`, `.routing/PROGRESS.md`, `.routing/DOMAIN.md`, `.routing/academic/SPECIFICATION.md`, `.routing/reference/*`, other tickets, `README.md`, and source/config files were left untouched).

---

## 2. Deliverable Metrics

| Metric | Value |
| :--- | :--- |
| **File** | `.routing/academic/MARKET_STUDY.md` |
| **Line count** | `385` lines |
| **Word count** | `7,033` words |
| **Byte size** | `50,237` bytes |
| **Language** | Spanish |
| **Instrument A (B2C `125–250cc` riders)** | `14` structured closed/scale questions (Google Forms ready; target range: 12–15) |
| **Instrument B (B2B Fase 1 refaccionarias/talleres)** | `9` structured field interview questions (target range: 8–10) |

---

## 3. Sample Size & Funnel Calculations Verified (Section 3)

- **5-Tier Demand Funnel (Xalapa, Veracruz):**
  1. *Mercado Potencial:* `40,000` motorcycles in circulation in Xalapa (Movilidad Urbana Ayuntamiento de Xalapa, 2026; official INEGI/CEIEG municipal census floor in 2021: `23,159` total / `22,720` private).
  2. *Mercado Disponible:* `29,644` Android-equipped riders (`40,000 × 74.11%` StatCounter Mexico Android share Oct 2025–Oct 2026; upper bound `89.13%` from 2024).
  3. *Mercado Cualificado Disponible:* Owner-operators of `125–250cc` motorcycles with Android (proportion measured via Instrument A P1–P2).
  4. *Mercado Meta (Target):* B2C intensive `50–100+ km/día` + moderate `15–49 km/día` cohorts; B2B Fase 1 (`~35` SCIAN `811492` workshops + SCIAN `468311` parts stores per DENUE `05/2026`).
  5. *Mercado Actual / Piloto Semestral:* `[PENDIENTE DE EJECUCIÓN PILOTO]`.
- **Finite-Universe Sample Formula (`Z = 1.96` [95%], `p = 0.50`, `q = 0.50`):**
  - **Primary (`N = 40,000`, `e = ±5%`):** `n = 38,416.0000 / 100.9579 = 380.5150` → **`381` surveys**.
  - **Android Available (`N = 29,644`, `e = ±5%`):** `n = 28,470.0976 / 75.0679 = 379.2579` → **`380` surveys**.
  - **INEGI 2021 Municipal Floor (`N = 23,159`, `e = ±5%`):** `n = 22,241.9036 / 58.8554 = 377.9076` → **`378` surveys**.
  - **Academic Sensitivity (`N = 40,000`):** `e = ±7%` → **`196` surveys** (`195.0491`); `e = ±10%` → **`96` surveys** (`95.8123`).
- **Segment B (B2B):** Non-probabilistic judgment/quota sampling justified (`~35` SCIAN `811492` shops in DENUE `05/2026`; target `10–15` owner/manager interviews across Xalapa commercial corridors).

---

## 4. Verified External Secondary Sources & URLs

1. **INEGI — Vehículos de motor registrados en circulación (VMRC) (2023–2025):** `10,547,500` national motorcycles (2025), `664,867` in Veracruz (2025), `232,680` total vehicles in Xalapa (2024) — https://www.inegi.org.mx/programas/vehiculosmotor/
2. **INEGI — DENUE Edición `05/2026` (SCIAN `811492` y `468311`, Xalapa `CLEE 30087`):** `~35` specialized motorcycle repair shops — https://www.inegi.org.mx/app/mapa/denue/default.aspx and https://www.talleresdemotos.com/
3. **CEIEG Veracruz / INEGI — Cuadernillos Municipales:** `23,159` registered motorcycles in Xalapa (`22,720` private / `439` official, 2021) — https://www.ceieg.veracruz.gob.mx/cuadernillos-municipales/
4. **Departamento de Movilidad Urbana, Ayuntamiento de Xalapa / Physis Ciclovida (2026):** `~40,000` circulating motorcycles in Xalapa; `273` motorcycle collisions out of `804` crashes (Jan–Oct 2026), reported in Veracruz state press (*OEM / Diario de Xalapa*, *Libertad Bajo Palabra*, *e-veracruz*).
5. **StatCounter Global Stats — Mobile OS Market Share Mexico (2024–2026):** `74.11%` Android (Oct 2025–Oct 2026) and `89.13%` Android (full-year 2024) — https://gs.statcounter.com/os-market-share/mobile/mexico
6. **Drivvo (CTN Cardoso, 2026):** Freemium/subscription pricing and user friction — https://www.drivvo.com/es-MX/ and https://play.google.com/store/apps/details?id=br.com.ctncardoso.ctncar
7. **Fuelio (Sygic, 2026):** Free Android / Premium pricing and user friction — https://fuel.io/ and https://play.google.com/store/apps/details?id=com.kajda.fuelio
8. **MotoLog / MotorApp (2026):** Specialized motorcycle logbooks on Google Play — https://www.motorapp.net/

---

## 5. Verification Against `spec.md` Checks

- [x] **Check 1:** Prerequisite `.routing/reference/MARKET_STUDY.md` verified; `.routing/academic/MARKET_STUDY.md` created in Spanish and non-empty.
- [x] **Check 2:** Includes all 5 `TASK` sections (`Objetivo`, `Metodología/Fuentes/Instrumentos`, `Universo y Muestreo`, `Análisis de Resultados` + FODA, `Conclusiones`) plus Section 6 (`Referencias y Fuentes Consultadas`).
- [x] **Check 3:** Section 2 cites verified secondary sources with exact years and clickable URLs (INEGI VMRC, INEGI DENUE, CEIEG, StatCounter, Drivvo, Fuelio, MotoLog/MotorApp).
- [x] **Check 4:** Two distinct ready-to-apply instruments per `STUDY.md` line 43: Instrument A (`14` questions) and Instrument B (`9` questions) covering all required variables.
- [x] **Check 5:** 5-tier demand funnel + mathematically verified finite-universe calculation (`N = 40,000` → `n = 381` at 95% / ±5%) + sensitivity analysis + non-probabilistic justification for Segment B.
- [x] **Check 6:** Zero fabricated survey results; Sections 4 and 5 explicitly marked `[PENDIENTE DE RECOLECCIÓN EN CAMPO]` and `[PENDIENTE DE RESULTADOS]`.
- [x] **Check 7:** Zero pruned scope violations (`$49 MXN` Year-1 cryptographic PDF, `CertifiedWorkshopDirectory`, `ExactModelPartsCatalog`, `HeavyDutyFleet`, or iOS MVP) and zero completed `## Estudio Técnico` content.
- [x] **Check 8:** Strict scope respected — only `.routing/academic/MARKET_STUDY.md` and `.tickets/003-design-itinera-market-study/changelog.md` created/modified.
- [x] **Check 9:** Complete change log written here.
