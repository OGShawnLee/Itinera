# Change Log — Ticket 002

| Field | Value |
| :--- | :--- |
| **Ticket** | `002-create-market-study-reference` |
| **Date** | 2026-11-17 |
| **Status** | Completed |

## Files Created or Modified

- **Created:** [`.routing/reference/MARKET_STUDY.md`](../../.routing/reference/MARKET_STUDY.md) — Theoretical-practical Market Study reference monograph in Spanish aligned with Itinera's reconciled MVP/Fase 1/Fase 2 baseline.
- **Created:** [`.tickets/002-create-market-study-reference/changelog.md`](changelog.md) — This change log.

No other files in the repository were created or modified.

## Quantitative Metrics of `.routing/reference/MARKET_STUDY.md`

- **Total line count:** `421` lines
- **Total word count:** `6,209` words
- **Mermaid diagram count:** `5` diagrams (`flowchart LR` / `flowchart TD`)
  1. Practical 6-step execution cycle (Section 1.4)
  2. Market Equilibrium dynamics across the 3 states (Section 2.3)
  3. 5-level Demand Funnel taxonomy (Section 2.4)
  4. Sampling taxonomy decision tree from `Estudio-Mercado-2.pdf` slide 18 (Section 3.3)
  5. 5-level Demand Funnel mapped to Itinera's reconciled domain (Section 5.1)

## Errata & Scope Compliance Verification

1. **Source PDF Errata Corrected:**
   - **Acronym typo (`FDOA` -> `FODA`):** Corrected the transposed acronym on slide 11 of `Estudio-Mercado-2.pdf` to the canonical Spanish term **FODA** (*Fortalezas, Oportunidades, Debilidades y Amenazas*) throughout the monograph, with an explicit note documenting the correction.
   - **Finite-sample formula denominator grouping:** Fixed the unparenthesized denominator in `Estudio-Mercado-2.pdf` slide 25 (`n = z²Npq/e² (N-1)+z²pq`) using exact KaTeX fraction formatting ($n = \frac{z^2 N p q}{e^2(N - 1) + z^2 p q}$) and explicit linear grouping `(e^2 * (N - 1) + z^2 * p * q)`.
2. **Inputs Consulted:**
   - `STUDY.md` (lines 1–44 ONLY — no content from `## Estudio Técnico` lines 45–68 was read or included)
   - `Act.-6---Estudio-de-Mercado_0303.pdf` (all 37 slides)
   - `Estudio-Mercado-2.pdf` (all 28 slides)
   - `.routing/academic/SPECIFICATION.md`
   - `.routing/DOMAIN.md`
   - `.routing/reference/BUSINESS_MODEL_CANVAS.md`
3. **Spec Checklist Verification (`spec.md`):**
   - Check 1–10 verified: all 6 exact sections present in Spanish; SIM (4 components), internal/external variables (6 each), 6 general steps + 4 detailed sub-studies, FODA matrix; Supply, Demand, Price Elasticity, 3 Equilibrium states, all 5 market classifications & 5 demand tiers; Sampling tree Mermaid flowchart; `Z` table (`90%`–`99%`), both formulas, INEGI worked example (`1,036` surveys); canonical mapping to Itinera (`125–250cc`, Android-First, Local-First SQLite, `50–100+ km/día` cohort, 3-phase monetization, zero-price friction elasticity, 2-instrument requirement from `STUDY.md` line 43, and explicit exclusions); zero `Estudio Técnico` content; strict file scope respected.
