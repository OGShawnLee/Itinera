# Specification for Ticket 003 — Design Itinera Market Study deliverable

## Objective Checks

- [x] Check 1: Prerequisite `.routing/reference/MARKET_STUDY.md` exists; output file `.routing/academic/MARKET_STUDY.md` exists, is written in Spanish, and is non-empty.
- [x] Check 2: Document includes all 5 `TASK` sections from the course guidelines plus a complete Section 6 for references:
  1. `Objetivo del Estudio de Mercado` (`TASK 1`)
  2. `Metodología, Fuentes e Instrumentos de Recolección` (`TASK 2`)
  3. `Universo de Estudio y Cálculo de Muestreo` (`TASK 3`)
  4. `Análisis de Resultados` (`TASK 4`) aligned with the 4 detailed analyses (*Demanda, Oferta, Canales, Precios*) + FODA
  5. `Conclusiones y Proyección hacia Estudios Posteriores` (`TASK 5`)
  6. `Referencias y Fuentes Consultadas` (listing all external web sources/URLs consulted + internal project docs)
- [x] Check 3: Section 2 cites real, verified secondary sources with explicit year and clickable URLs (including INEGI motorcycle fleet data and at least 2 real competitors such as Drivvo/Fuelio).
- [x] Check 4: Section 2 contains TWO separate, ready-to-apply instruments per the multi-segment rule:
  - Instrument A (B2C 125–250cc riders): 12–15 structured questions covering displacement/Android filter, `50–100+ km/día` vs. moderate usage, broken physical odometer, 5 `ConsumableItem`s, `WeeklyCheckIn` acceptance, `WearTrafficLight`, free `ExportableSummary`, and local coupon interest.
  - Instrument B (B2B Fase 1 refaccionarias/talleres): 8–10 structured questions covering `125–250cc` volume, average service/parts ticket, customer acquisition, and `ContextualPromotion` counter-coupon willingness without field certification.
- [x] Check 5: Section 3 defines the 5-tier demand funnel and performs a mathematically verified finite-universe sample calculation ($n = \frac{z^2 N p q}{e^2(N - 1) + z^2 p q}$) anchored to `N` from Section 2, plus non-probabilistic justification for Segment B.
- [x] Check 6: Sections 4 and 5 contain zero fabricated primary survey percentages; all fieldwork slots are explicitly marked `[PENDIENTE DE RECOLECCIÓN EN CAMPO]` or `[PENDIENTE DE RESULTADOS]`.
- [x] Check 7: Zero pruned scope violations (`$49 MXN` Year-1 cryptographic PDF, `CertifiedWorkshopDirectory`, `ExactModelPartsCatalog`, `HeavyDutyFleet`, or iOS MVP) and zero content from `Estudio Técnico`.
- [x] Check 8: Strict scope respected — only `.routing/academic/MARKET_STUDY.md` and `.tickets/003-design-itinera-market-study/changelog.md` were created/modified.
- [x] Check 9: Change log exists at `.tickets/003-design-itinera-market-study/changelog.md` with complete metrics, verified URLs, calculated `N`/`n` values, and scope confirmation.

## Consigna Académica Incorporada (Estudio de Mercado)

> *Consigna original de la asignatura incorporada tras el retiro de `STUDY.md`:*

- **Finalidad:** Probar que existe un número suficiente de individuos, empresas u otras entidades económicas que, dadas ciertas condiciones, presentan una demanda que justifica la puesta en marcha de un determinado proyecto en un cierto período, o el arranque de un emprendimiento empresarial.
- **Pasos generales:** (1) Definir los aspectos del estudio general del mercado de interés para el proyecto; (2) recopilar antecedentes (usos, series estadísticas, hábitos de consumo, distribución geográfica, comercialización y cambios demográficos); (3) fijar la cuantía de la demanda total actual, real y aparente; (4) conclusiones y previsiones respecto a la comercialización; (5) conclusiones y previsiones respecto a la incidencia de la política económica en el mercado; (6) proyección de la demanda.
- **Estudios de detalle:** Análisis de la demanda, análisis de la oferta, análisis de los canales de comercialización y análisis de precios.
- **Entregables exigidos (`TASK 1–5`):** (1) Objetivo del estudio; (2) metodología (fuentes primarias y secundarias, estilo estadístico o no estadístico e instrumento de captación); (3) universo de estudio y proporción de muestreo; (4) análisis de resultados; (5) conclusión que permita proyectar el Estudio Técnico y Económico-Financiero, adecuaciones al Modelo de Negocio y al Estudio Organizacional. Cuando existan diferentes segmentos de clientes o usuarios donde deban medirse características específicas, elaborar secciones o instrumentos específicos por segmento.
