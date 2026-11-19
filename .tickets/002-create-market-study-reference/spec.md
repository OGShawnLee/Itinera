# Specification for Ticket 002 — Create Market Study reference monograph

## Objective Checks

- [x] Check 1: File `.routing/reference/MARKET_STUDY.md` exists, is written in Spanish, and is non-empty.
- [x] Check 2: Document contains all 6 exact top-level sections required by `task.md`:
  1. `Fundamentos Económicos y Alcance del Estudio de Mercado`
  2. `Teoría de Oferta, Demanda, Elasticidad y Clasificación de Mercados`
  3. `Metodología de Investigación y Técnicas de Muestreo`
  4. `Cálculo Estadístico del Tamaño de Muestra`
  5. `Aplicación Canónica al Dominio Reconciliado de Itinera`
  6. `Referencias Bibliográficas y Documentales`
- [x] Check 3: Section 1 covers Marketing Information Systems (4 components), Internal vs. External variables (6 each), the 6 general steps + 4 detailed sub-studies from the assignment rubric, and uses the corrected acronym `FODA` (never `FDOA` as the canonical term).
- [x] Check 4: Section 2 covers Supply analysis, Demand & price elasticity, Market Equilibrium (3 states: *exceso de necesidad*, *exceso de oferta*, *equilibrio*), and all 5 market classification criteria including the 5 demand tiers (*potencial*, *disponible*, *cualificado disponible*, *meta/target*, *actual/real/penetrado*).
- [x] Check 5: Section 3 includes at least 1 valid Mermaid diagram (`flowchart`) showing the Probabilistic vs. Non-Probabilistic sampling tree with all subtypes from `Estudio-Mercado-2.pdf` slide 18.
- [x] Check 6: Section 4 includes the full `Z` table (`90%` to `99%`, `1.645` to `2.575`), the infinite sample formula, the properly parenthesized finite sample formula ($n = \frac{z^2 N p q}{e^2(N - 1) + z^2 p q}$), and the INEGI worked example yielding `1,036` surveys.
- [x] Check 7: Section 5 maps theory directly to Itinera's reconciled `SPECIFICATION.md` and `DOMAIN.md` (B2C `125–250cc` + Fase 1 B2B `ContextualPromotion`, 2-instrument requirement, zero-price friction elasticity) and explicitly avoids pruned scope items (`$49 MXN` Year-1 cryptographic PDF, `CertifiedWorkshopDirectory`, `ExactModelPartsCatalog`, `HeavyDutyFleet`).
- [x] Check 8: No content from `Estudio Técnico` is included.
- [x] Check 9: Strict scope respected — only `.routing/reference/MARKET_STUDY.md` and `.tickets/002-create-market-study-reference/changelog.md` were created/modified.
- [x] Check 10: Change log exists at `.tickets/002-create-market-study-reference/changelog.md` with line count, word count, diagram count, and scope verification.
