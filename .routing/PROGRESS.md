# PROGRESS

Seguimiento de avance del proyecto Itinera. Registra las tareas completadas, tickets en progreso y decisiones pendientes.

## Completado (Done)
- [x] Inicialización del repositorio y archivo `README.md` del proyecto.
- [x] Estructuración base del directorio `.routing/` y sus roles de orquestación.
- [x] Separación de flujo académico: [DRAFT_NOTES.md](academic/DRAFT_NOTES.md) (borrador y bitácora de retroalimentación) y [SPECIFICATION.md](academic/SPECIFICATION.md) (documento purgado y refinado con el nuevo enfoque sistémico del problema y factores socioculturales).
- [x] Refinamiento de especificación académica: integración de preguntas de descubrimiento de Design Thinking, delimitación de alcance MVP (motos 125-250cc), justificación de impacto con externalidades secundarias, métricas duales de desgaste (km/tiempo) e inclusión demográfica sensible.
- [x] Depuración de segmentación CCU y perfiles de cliente: separación de dinámicas B2C particulares vs. B2B corporativo de transporte, delimitación de clusters de edad y nichos catalizadores.
- [x] Creación de monografía teórico-práctica sobre Design Thinking en `.routing/reference/DESIGN_THINKING.md`, vinculando el modelo d.school Stanford / Doble Diamante con el caso de estudio y decisiones de producto en Itinera.

## Tickets en borrador (Draft tickets)
- [ ] [001-process-raw-organizational-study](../.tickets/001-process-raw-organizational-study/task.md): Procesamiento y estructuración en Markdown del estudio organizacional en `.routing/academic/DRAFT_ORGANIZATIONAL_STUDY.md`.
- [ ] [002-contrast-organizational-study-vs-specification](../.tickets/002-contrast-organizational-study-vs-specification/task.md): Auditoría de contraste, detección de alucinaciones y análisis de brechas del estudio organizacional frente a `SPECIFICATION.md`, `DESIGN_THINKING.md` y `BUSINESS_MODEL_CANVAS.md`.
- [ ] [003-create-canvas-monograph](../.tickets/003-create-canvas-monograph/task.md): Creación de monografía de referencia exhaustiva sobre el Business Model Canvas aterrizado al dominio de Itinera en `.routing/reference/BUSINESS_MODEL_CANVAS.md`.
- [ ] [draft-plan-technical-routing-tickets](../.tickets/draft-plan-technical-routing-tickets/task.md): Planificación abstracta de futuros tickets técnicos de enrutamiento (dominio, flujos, diseño e infraestructura) sin asunciones prematuras ni numeración rígida.

## Próximos pasos (Next steps)
- [ ] Incorporar la documentación restante para alimentar los archivos de dominio, diseño e infraestructura.
- [ ] Definir el stack tecnológico oficial para la aplicación móvil y persistencia.
- [ ] Contextualizar las skills de router y ticket en `.claude/skills/`.

## Flujo de trabajo con agentes
- **Estructura de tickets:** Cada tarea o funcionalidad se define en una carpeta bajo `.tickets/<id>-<slug>/`, conteniendo:
  - `task.md`: Descripción detallada de la tarea, entradas, alcance y limitaciones.
  - `spec.md`: Criterios de verificación objetivos (checks ejecutables o confirmables).
- **Estados de ticket:** `draft`, `in-progress`, `completed`.
- **Ejecución:** Atómica y secuencial, garantizando validación antes de avanzar al siguiente módulo.

## Brechas de diseño y dominio pendientes
- [ ] Definir el sistema de diseño base (paleta de colores, tipografía, componentes visuales móviles).
- [ ] Definir modelos de datos iniciales (vehículos, bitácora de mantenimiento, estimaciones de desgaste).
- [ ] Diseñar el flujo de recordatorios y notificaciones de servicio.
