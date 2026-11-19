# 004 — Create Itinera Technical Study grounded in course references and reconciled specification

| Field | Value |
| :--- | :--- |
| **ID** | 004 |
| **Status** | completed |
| **Model** | Gemini 4 Hydrogen (low thinking) |
| **Role** | Business Systems Analyst / Technical Architect |
| **Spec** | [spec.md](spec.md) |

---

## Context & Purpose

The team must deliver the **Estudio Técnico** required by the course guidelines (incorporated in [spec.md](spec.md), *Economía para Toma de Decisiones*), grounded in the 3 reference PDFs in the repository root and explicitly aligned with the team's Organizational Study PDF (`Emprendimiento Tecnologico - Estudio Organizacional - ITINERA.pdf`) AND the reconciled MVP baseline in [SPECIFICATION.md](../../.routing/academic/SPECIFICATION.md), [DOMAIN.md](../../.routing/DOMAIN.md), and [BUSINESS_MODEL_CANVAS.md](../../.routing/reference/BUSINESS_MODEL_CANVAS.md).

Because Itinera is an **Android-First, Local-First (SQLite) software platform** rather than a physical manufacturing plant, this document translates classical industrial Engineering/Technical Study tools (macro/micro localization, qualitative point scoring, plant capacity, floor plan/space layout, process flow/ASME diagrams, analytical *cursograma*, equipment/resources, legal/regulatory compliance, and organizational alignment) accurately to a lean software startup in Xalapa, Veracruz—while explicitly reconciling pre-audit Organizational Study items (e.g., iOS, mandatory Day-1 cloud servers, 7 paid staff, physical workshop certification) onto the verified 3-phase scaling gates.

---

## Scope

### May create or edit:
- `.routing/academic/TECHNICAL_STUDY.md` (the complete Technical Study deliverable in Spanish, including concise methodological grounding + full Itinera application + bibliography).
- `.tickets/004-create-itinera-technical-study/changelog.md` (the worker change log).

### Must not touch:
- Any `.pdf` file in the repository root.
- `.routing/CONTEXT.md`
- `.routing/PROGRESS.md`
- `.routing/DOMAIN.md`
- `.routing/academic/SPECIFICATION.md`
- `.routing/academic/DRAFT_NOTES.md`
- `.routing/academic/MARKET_STUDY.md`
- `.routing/reference/*`
- `.tickets/001-create-canvas-monograph/*`
- `.tickets/002-create-market-study-reference/*`
- `.tickets/003-design-itinera-market-study/*`
- `.tickets/draft-plan-technical-routing-tickets/*`
- `README.md`
- Any source code or project configuration files.

---

## Inputs

Read these files before writing (paths relative to this ticket folder):
1. Consigna académica de Estudio Técnico (incorporada en [spec.md](spec.md)) — Purpose, mandatory points 1–6, and organizational alignment rule.
2. [Estudio-Técnico---Localización_1.pdf](../../Estudio-Técnico---Localización_1.pdf) — All 11 slides (5 questions, 5 components, Macro/Micro localization, Qualitative Points, Vogel, Brown & Gibson).
3. [EstudioTecnico_Proceso-Organizacion_2.pdf](../../EstudioTecnico_Proceso-Organizacion_2.pdf) — All 34 slides (Production process, Block diagram, ANSI/ASME Process Flow diagram, *Cursograma analítico*, Travel/String diagram, Iconogram, Human/Legal organization, Tomato-Mix case study).
4. [Estudio-Técnico-y-organizacional_Ejemplo.pdf](../../Estudio-Técnico-y-organizacional_Ejemplo.pdf) — All 14 pages (Capítulo 5 example template: 5.1 Localización, 5.2 Capacidad de planta, 5.3 Procesos de operación, 5.4 Distribución de planta, 5.5 Adecuaciones a infraestructura, 5.6 Proyecto arquitectónico, 5.7 Equipamiento y mobiliario, 5.8 Estructura organizacional).
5. [Emprendimiento Tecnologico - Estudio Organizacional - ITINERA.pdf](../../Emprendimiento%20Tecnologico%20-%20Estudio%20Organizacional%20-%20ITINERA.pdf) — Team's Organizational Study (remote-first, `S.A.S.`, `RESICO-PM`, `IMPI` Clases 9/42, `INDAUTOR`, `LFPDPPP`/ARCO, 7-role target org chart). **CRITICAL:** Preserve its valid legal/remote framework, while explicitly reconciling pre-audit assumptions (Day-1 cloud, iOS `$99 USD/yr`, 7 salaried staff, certified workshops) to the 3-phase MVP baseline.
6. [SPECIFICATION.md](../../.routing/academic/SPECIFICATION.md) — Reconciled MVP boundaries (125–250cc motorcycles, Android-First, Local-First SQLite, `$25 USD` one-time Play Console, semestral cohort in Xalapa, 3-phase monetization, scope-cut log).
7. [DOMAIN.md](../../.routing/DOMAIN.md) — Canonical entities (`Vehicle`, `ServiceTemplate`, `ConsumableItem`, `WearTrafficLight`, `OdometerProjection`, `WeeklyCheckIn`, `MaintenanceLog`, `SurgicalAlert`, `ExportableSummary`, `ContextualPromotion`, `PlusSubscription`) and mathematical invariants.
8. [BUSINESS_MODEL_CANVAS.md](../../.routing/reference/BUSINESS_MODEL_CANVAS.md) — Cost structure and 3-phase scaling gates.

---

## Task

1. Create `.routing/academic/TECHNICAL_STUDY.md` written in **Spanish** organized cleanly into these 8 numbered sections covering the theoretical framework, all 6 mandatory requirements of `STUDY.md`, organizational alignment, and complete references:
   - **1. Marco Conceptual y Preguntas Directrices del Estudio Técnico**
     - Concise synthesis of the 3 course PDFs (`Estudio-Técnico---Localización_1.pdf`, `EstudioTecnico_Proceso-Organizacion_2.pdf`, `Estudio-Técnico-y-organizacional_Ejemplo.pdf`), answering the 5 fundamental questions (*¿Dónde? ¿Cuándo? ¿Cuánto? ¿Cómo? ¿Con qué?*) and mapping the 5 technical components for a digital mobile software product.
   - **2. Descripción y Justificación Geográfica: Macro y Microlocalización (`STUDY.md` Punto 1)**
     - **Macrolocalización:** Apply the **Método Cualitativo por Puntos** (weighted scoring table comparing at least 3 candidate Mexican cities: **Xalapa, Veracruz**, **Puerto de Veracruz**, and **Ciudad de México**) using relevant software/MVP criteria (proximity to the semestral 125–250cc pilot cohort and UV engineering team, broadband/5G connectivity, operational cost of living, local shop access). Conclude objectively on **Xalapa, Veracruz**.
     - **Microlocalización:** Justify the **remote-first** operational model in Xalapa (aligned with `Emprendimiento Tecnologico - Estudio Organizacional - ITINERA.pdf` p. 5) explaining why no physical retail shop or industrial plant is leased in Fase 0 (`$0` rent), utilizing home-office engineering stations + university/coworking coordination points for field validation.
   - **3. Especificaciones del Establecimiento, Capacidad Operativa y Distribución de Espacios (`STUDY.md` Punto 2)**
     - **Capacidad de Sistema y Operación (Equivalente a Capacidad de Planta):** Contrast Fase 0 *Local-First* SQLite architecture (unlimited per-device capacity with `$0` backend bottleneck, bounded only by the 3-founder engineering velocity and semestral cohort target) vs. Fase 1–2 conditional cloud capacity (`PlusSubscription` sync, `ContextualPromotion` attribution).
     - **Especificaciones de Espacio Físico y Plano Lógico de Distribución:** Include a Mermaid diagram (and spatial specification table) representing the home-office engineering & QA setup (Development Workstation Zone, Physical Android Testing Zone, Coordination/Validation Zone, Minimal Infrastructure: broadband internet $\ge 50\text{ Mbps}$, surge protection/UPS, ergonomic desk), explicitly clarifying why industrial manufacturing parameters (heavy drainage, warehouse docks) do not apply.
   - **4. Proceso de Producción/Servicio, Tecnología y Listado de Recursos (`STUDY.md` Punto 3)**
     - **Tecnología y Arquitectura Técnica:** Android-First mobile app + Local-First SQLite engine + passive Crashlytics (keeping specific UI/code framework as strategic Android-First choice without inventing unapproved stack details, noting Fase 0 = `$0` cloud/SMS/iOS).
     - **Diagrama de Bloques y Diagrama de Flujo de Proceso (Mermaid):**
       1. *Flujo de Desarrollo y Despliegue (SDLC)* (`Diseño/Especificación` $\to$ `Implementación Local-First` $\to$ `Pruebas en Dispositivos` $\to$ `Compilación .aab` $\to$ `Publicación Google Play`).
       2. *Flujo Operativo del Servicio en App (con simbología ASME adaptada)*: Onboarding `< 30 s` (`Vehicle` + `ServiceTemplate`) $\to$ `OdometerProjection` $\to$ `WeeklyCheckIn` (`< 5 s`) $\to$ `WearTrafficLight` / `SurgicalAlert` $\to$ `MaintenanceLog` (`< 15 s`) $\to$ `ExportableSummary` gratuito.
     - **Cursograma Analítico Comparativo:** Table comparing *Método Actual* (gloves/notebook/manual estimation) vs. *Método Propuesto (Itinera)* measuring steps and time reduction (`< 30 s` setup, `< 5 s/week` check-in, `< 15 s` service log).
     - **Listado de Recursos, Equipamiento y Presupuesto Técnico por Fase:** Clear table separating **Fase 0 MVP** (`$25 USD` one-time Google Play Console, existing 3 laptops + personal Android test phones, `$0` cloud/SaaS paid licenses) vs. **Fase 1–2 Escalamiento Condicional** (`IMPI`, cloud sync storage, Apple `$99 USD/yr` only when validated).
   - **5. Especificaciones Legales, Fiscales y Regulatorias (`STUDY.md` Punto 4)**
     - Grounded directly in `Emprendimiento Tecnologico - Estudio Organizacional - ITINERA.pdf` (pp. 10–13) and Mexico's applicable digital framework:
       - **Constitución Mercantil:** `S.A.S.` (100% online via Secretaría de Economía, `$0` notary cost) with future scaling path to `S.A.P.I. de C.V.`.
       - **Fiscal (SAT):** `RFC`, `e.firma`, `RESICO-PM`, `CFDI 4.0` (activated when invoicing Fase 1 B2B shops / Fase 2 fleets).
       - **Propiedad Intelectual:** `IMPI` (Clases 9 y 42 de Niza for `"ITINERA"`), `INDAUTOR` (source code & docs), NDA / IP assignment agreements.
       - **Protección de Datos (`LFPDPPP`):** Aviso de Privacidad, derechos ARCO, consentimiento expreso; explain how Local-First SQLite in Fase 0 minimizes PII exposure and simplifies `Google Play Data Safety`.
       - **Distribución Digital:** Google Play Console (`$25 USD`, `.aab`, target API level, Data Safety, account/data deletion policy); Apple App Store (`$99 USD/yr` + `D-U-N-S`) explicitly deferred to Fase 2.
   - **6. Alineación Organizacional y Otros Requisitos Administrativos/Financieros (`STUDY.md` Punto 5 y Línea 67)**
     - **Organigrama y Roles Reconciliados (Mermaid + tabla):** Present **Fase 0 Lean (3 cofundadores con roles duales: Gerardo Abraham Barrón Gómez, Edgar Vázquez García, Alberto Villalba Figueroa — `$0` nómina fija)** and **Fase 1–2 Estructura Expandida (las 7 plazas de `Estudio Organizacional`)**, bridged explicitly by a **Tabla de Reconciliación Técnico–Organizacional** explaining how `SPECIFICATION.md` deferred Day-1 cloud, iOS, 7-person payroll, certified workshop audits, and paid `$49 MXN` certificates to keep Fase 0 viable.
     - **Vínculo con el Estudio de Mercado y Estudio Económico-Financiero:** Note explicitly how demand validation targets (`50–100+ km/día` cohort in `.routing/academic/MARKET_STUDY.md`) calibrate technical testing and Fase 1 triggers.
   - **7. Otros Requisitos Técnicos Operativos (`STUDY.md` Punto 6)**
     - Offline resilience (SQLite *Local-First* without mobile data), physical odometer-failure fallback (`OdometerProjection` calendar backup $\min(t_{km}, t_{meses})$), local backup & free `ExportableSummary` portability, and passive error telemetry (`Crashlytics`).
   - **8. Referencias Bibliográficas y Documentales**
     - Cite all 3 Technical Study PDFs + their internal sources (`Colón 2011`, `UNAM 2017`, `Baca 2010`, `Martínez et al. 2015 / Tomato-Mix`, `Universidad de Castilla-La Mancha`), `Emprendimiento Tecnologico - Estudio Organizacional - ITINERA.pdf`, `STUDY.md`, and internal canonical docs (`SPECIFICATION.md`, `DOMAIN.md`, `BUSINESS_MODEL_CANVAS.md`, `reference/MARKET_STUDY.md`).
2. Keep strictly aligned to the reconciled MVP (`125–250cc`, Android-First, Local-First SQLite, `$0` cloud in Fase 0, free `ExportableSummary`, NO `CertifiedWorkshopDirectory`, NO `ExactModelPartsCatalog`, NO `HeavyDutyFleet`).
3. Do NOT run slow external web searches unless needed for a quick verification; all facts come from the local PDFs and canonical `.routing/` docs.
4. Verify every check in [spec.md](spec.md).
5. Write `.tickets/004-create-itinera-technical-study/changelog.md` recording files touched, line/word/diagram counts, reconciliation notes, and scope verification.

---

## Verification

Follow the objective criteria in [spec.md](spec.md).

---

## Change Log

Record in `.tickets/004-create-itinera-technical-study/changelog.md`:
- Files created or modified.
- Total line count, word count, and Mermaid diagram count of `.routing/academic/TECHNICAL_STUDY.md`.
- Summary of how `Emprendimiento Tecnologico - Estudio Organizacional - ITINERA.pdf` was aligned and reconciled with `SPECIFICATION.md`.
- Confirmation that no out-of-scope files were edited.
