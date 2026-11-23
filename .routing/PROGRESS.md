# PROGRESS

Seguimiento de avance del proyecto Itinera. Registra las tareas completadas, tickets en progreso y decisiones pendientes.

## Completado (Done)
- [x] Inicialización del repositorio y archivo `README.md` del proyecto.
- [x] Estructuración base del directorio `.routing/` y sus roles de orquestación.
- [x] Separación de flujo académico: [DRAFT_NOTES.md](academic/DRAFT_NOTES.md) (borrador y bitácora de retroalimentación) y [SPECIFICATION.md](academic/SPECIFICATION.md) (documento purgado y refinado con el nuevo enfoque sistémico del problema y factores socioculturales).
- [x] Refinamiento de especificación académica: integración de preguntas de descubrimiento de Design Thinking, delimitación de alcance MVP (motos 125-250cc), justificación de impacto con externalidades secundarias, métricas duales de desgaste (km/tiempo) e inclusión demográfica sensible.
- [x] Depuración de segmentación CCU y perfiles de cliente: separación de dinámicas B2C particulares vs. B2B corporativo de transporte, delimitación de clusters de edad y nichos catalizadores.
- [x] Creación de monografía teórico-práctica sobre Design Thinking en `.routing/reference/DESIGN_THINKING.md`, vinculando el modelo d.school Stanford / Doble Diamante con el caso de estudio y decisiones de producto en Itinera.
- [x] Auditoría fría con `venture-killer` y reconciliación integral de [SPECIFICATION.md](academic/SPECIFICATION.md): tabla de fronteras MVP vs. fases posteriores, cohorte de validación semestral (`50–100+ km/día`), check-in semanal en 1 toque, modelo monetario en 3 fases y bitácora de recortes de alcance para el equipo.
- [x] Creación del diccionario canónico de dominio en [DOMAIN.md](DOMAIN.md) (entidades MVP, Fase 1–2, exclusiones e invariantes matemáticas).
- [x] Inspección de `Planteamiento_Idea_Negocio_Itinera-REVISADO.pdf`: confirmado que corresponde a la práctica anotada de Empatía 1–3 + guía en blanco de Empatía 4/Define/Idea/Canvas; eliminados los tickets obsoletos de estudio organizacional (`001` y `002`) y renumerado el ticket de monografía Canvas como `001-create-canvas-monograph`.
- [x] Completado [001-create-canvas-monograph](../.tickets/001-create-canvas-monograph/task.md): creación de la monografía reconciliada del Business Model Canvas en [BUSINESS_MODEL_CANVAS.md](reference/BUSINESS_MODEL_CANVAS.md) (3 horizontes, trazabilidad completa a `DOMAIN.md` y compuertas de monetización).
- [x] Completado [002-create-market-study-reference](../.tickets/002-create-market-study-reference/task.md): creación de la monografía teórico-práctica de Estudio de Mercado en [MARKET_STUDY.md](reference/MARKET_STUDY.md) integrando `Act.-6---Estudio-de-Mercado_0303.pdf`, `Estudio-Mercado-2.pdf` y la consigna académica (con correcciones de `FODA` y fórmula muestral finita, y mapeo al dominio reconciliado).
- [x] Completado [003-design-itinera-market-study](../.tickets/003-design-itinera-market-study/task.md): diseño del entregable académico [MARKET_STUDY.md](academic/MARKET_STUDY.md) (`TASK 1–5` + consigna incorporada en `spec.md`, fuentes INEGI VMRC/DENUE, StatCounter, Drivvo/Fuelio, 2 instrumentos listos para campo y cálculo finito `N=40,000 -> n=381`).
- [x] Completado [004-create-itinera-technical-study](../.tickets/004-create-itinera-technical-study/task.md): elaboración del Estudio Técnico en [TECHNICAL_STUDY.md](academic/TECHNICAL_STUDY.md) (consigna incorporada en `spec.md`, Macrolocalización por puntos Xalapa `9.05`, Cursograma analítico, marco legal `S.A.S.`/`IMPI`/`LFPDPPP`, organigrama dual y tabla de reconciliación con `Estudio Organizacional`).
- [x] Creación de la skill editorial `human-prose` en [SKILL.md](../.claude/skills/human-prose/SKILL.md) y generación de entregables externos limpios para Word/Google Docs/PDF en [ESTUDIO_DE_MERCADO.md](../deliverables/ESTUDIO_DE_MERCADO.md) y [ESTUDIO_TECNICO.md](../deliverables/ESTUDIO_TECNICO.md), retirando el archivo temporal `STUDY.md`.
- [x] Definición del mapa de navegación, flujo de pantallas, widgets funcionales, entradas por notificación y exclusiones MVP en [ROUTES.md](ROUTES.md).
- [x] Registro de retroalimentación docente (`AUD-1` a `AUD-13`) en [LOG_RETROALIMENTACION.md](../deliverables/LOG_RETROALIMENTACION.md) y alineación del núcleo a motocicletas `110–250cc`, unidades de trabajo y estimación por rutina diaria en [DOMAIN.md](DOMAIN.md), [SPECIFICATION.md](academic/SPECIFICATION.md) y [ROUTES.md](ROUTES.md).

- [x] Auditoría post-retroalimentación (`C1`–`C8`) aplicada al núcleo: compuerta única de Fase 1 (`>1,000–2,000` MAU) con prueba B2B por volumen; entidades `MerchantPartner`, `CouponRedemption`, `HomeWorkshopTag` y `WorkshopLink` con reglas contra el directorio pagado; atributo `Vehicle.transmision` (`cadena` | `CVT`) con intervalos separados; tabla canónica `rutina × días/semana → Tasa_dia`; `PlusSubscription` `2+` motos personales y `MicroFleetAccount` `2–15` comerciales ([DOMAIN.md](DOMAIN.md)). Check-in semanal y `/calibrate` sin kilómetros, transmisión en todas las pantallas y espacio diferido de Fase 1 (`§4.D`) en [ROUTES.md](ROUTES.md). Limpieza de `125–250cc`, jerga "pauta" y `>85%` sin matiz en [SPECIFICATION.md](academic/SPECIFICATION.md), [TECHNICAL_STUDY.md](academic/TECHNICAL_STUDY.md), [BUSINESS_MODEL_CANVAS.md](reference/BUSINESS_MODEL_CANVAS.md) y [ESTUDIO_TECNICO.md](../deliverables/ESTUDIO_TECNICO.md).
- [x] Reestructuración completa de los Instrumentos A (`A0`–`A37`) y B (`B1`–`B31`) atendiendo los 36 señalamientos docentes, con prototipo antes de validar, ramas condicionales, matriz de cruces, métricas para el Estudio Económico-Financiero y sensibilidad de la compuerta, en [MARKET_STUDY.md](academic/MARKET_STUDY.md) y [ESTUDIO_DE_MERCADO.md](../deliverables/ESTUDIO_DE_MERCADO.md); estados actualizados en [LOG_RETROALIMENTACION.md](../deliverables/LOG_RETROALIMENTACION.md) (31 atendidos, 5 en proceso por capturas).

## Tickets en borrador (Draft tickets)
- [ ] [draft-plan-technical-routing-tickets](../.tickets/draft-plan-technical-routing-tickets/task.md): Planificación abstracta de futuros tickets técnicos de enrutamiento (`ROUTES.md`, `DESIGN.md`, `INFRASTRUCTURE.md` y refinamiento de `DOMAIN.md`).

## Próximos pasos (Next steps)
- [ ] Construir la mini app prototipo en Vue 3 + Vue Router con datos simulados y producir las capturas 1–6 (`390×844`) definidas en [MARKET_STUDY.md §2.3](academic/MARKET_STUDY.md); insertarlas en Google Forms y cerrar los 5 señalamientos "En proceso" del log.
- [ ] Obtener del DENUE el conteo exacto de refaccionarias `SCIAN 468311` en Xalapa (y confirmar que la clase captura refaccionarias de moto).
- [ ] Capturar ambos instrumentos en Google Forms con el mapa de ramas documentado y aplicar el levantamiento de campo.
- [ ] Definir el sistema visual y componentes base en `DESIGN.md` (paleta semáforo, tipografía legible en exteriores/taller y estados visuales).
- [ ] Definir el stack tecnológico oficial en `INFRASTRUCTURE.md` (bajo la directriz MVP Android-First + SQLite Local-First).
- [ ] Contextualizar las skills de `.agents/` (incluyendo `figma-prompt-craft`) y `.claude/skills/` al dominio de Itinera.

## Flujo de trabajo con agentes
- **Estructura de tickets:** Cada tarea o funcionalidad se define en una carpeta bajo `.tickets/<id>-<slug>/`, conteniendo:
  - `task.md`: Descripción detallada de la tarea, entradas, alcance y limitaciones.
  - `spec.md`: Criterios de verificación objetivos (checks ejecutables o confirmables).
- **Estados de ticket:** `draft`, `in-progress`, `completed`.
- **Ejecución:** Atómica y secuencial, garantizando validación antes de avanzar al siguiente módulo.

## Brechas de diseño y dominio pendientes
- [ ] Definir el sistema de diseño base en `DESIGN.md` (paleta de colores, tipografía, componentes visuales móviles).
- [x] Definir el mapa de navegación y pantallas MVP en [ROUTES.md](ROUTES.md).
- [ ] Detallar los 3 `ServiceTemplate` base con sus valores por defecto y las viñetas de inspección de los 5 consumibles para implementación/prototipo.
