# CONTEXT

Directorio central de enrutamiento y contexto para los agentes y colaboradores. Leer este archivo primero.

## Archivos de referencia
- [DESIGN.md](DESIGN.md): Directrices de diseño de interfaz (colores, tipografía, componentes y espaciados).
- [PROGRESS.md](PROGRESS.md): Estado actual del proyecto, tareas pendientes, próximos pasos y tickets en curso.
- [DOMAIN.md](DOMAIN.md): Diccionario canónico del dominio: qué es cada entidad/regla, en qué fase entra (MVP/Fase 1/Fase 2/Excluido), por qué se contempla y qué valor aporta.
- [INFRASTRUCTURE.md](INFRASTRUCTURE.md): Configuración del entorno de desarrollo, servicios, base de datos y despliegue.
- [ROUTES.md](ROUTES.md): Mapa de navegación, pantallas de la aplicación móvil y reglas de acceso.
- [academic/SPECIFICATION.md](academic/SPECIFICATION.md): Especificación académica refinada, reconciliada y auditada del problema, alcance MVP y modelo monetario.
- [academic/DRAFT_NOTES.md](academic/DRAFT_NOTES.md): Borrador histórico de la actividad inicial y bitácora de retroalimentación docente y del equipo.
- [academic/MARKET_STUDY.md](academic/MARKET_STUDY.md): Estudio de Mercado operativo de Itinera (`TASK 1–5` incorporados en el ticket `003`, fuentes secundarias verificadas, dos instrumentos de campo B2C/B2B, cálculo muestral y bibliografía).
- [academic/TECHNICAL_STUDY.md](academic/TECHNICAL_STUDY.md): Estudio Técnico de Itinera (macro/microlocalización en Xalapa, procesos SDLC/ASME, cursograma analítico, marco legal y reconciliación con el Estudio Organizacional).
- [reference/DESIGN_THINKING.md](reference/DESIGN_THINKING.md): Monografía teórico-práctica sobre Design Thinking y su aplicación crítica en Itinera.
- [reference/BUSINESS_MODEL_CANVAS.md](reference/BUSINESS_MODEL_CANVAS.md): Monografía del Business Model Canvas en 3 horizontes alineada a `SPECIFICATION.md` y `DOMAIN.md`.
- [reference/MARKET_STUDY.md](reference/MARKET_STUDY.md): Monografía teórico-práctica sobre Estudio de Mercado, muestreo estadístico y aplicación al dominio de Itinera.

## Proyecto
- **Itinera:** Plataforma móvil orientada a la gestión y seguimiento del mantenimiento preventivo y correctivo de vehículos. **MVP acotado a motocicletas ligeras urbanas, de trabajo y motonetas (`110–250cc`, extensible vía plantilla personalizada)** mediante bitácora de baja fricción, proyección algorítmica y semáforo de 5 consumibles.
- **Enfoque actual:** Consolidación de dominio, reconciliación documental tras auditoría *Venture-Killer* y definición de arquitectura inicial.
- **Alcance posterior:** Escalamiento local con promociones trazables (Fase 1), expansión a automóviles, sincronización cloud y micro-flotillas B2B (Fase 2).

## Stack tecnológico
- **Plataforma móvil:** *Por definir* (decisión estratégica de MVP: **Android-First**).
- **Backend y persistencia:** *Por definir* (decisión estratégica de MVP: **Local-First / SQLite** en dispositivo, sin costes cloud iniciales).
- **Herramientas de diseño y UI:** *Por definir* (fuentes, iconos y sistema de diseño).

## Reglas generales (Ground Rules)
- La documentación del repositorio y especificaciones técnicas se redactan en español para fácil colaboración del equipo.
- Los mensajes de commit se redactan en inglés siguiendo Conventional Commits, con descripciones claras de los cambios.
- Diseño enfocado en dispositivos móviles (mobile-first).
- Alcance progresivo y validado por etapas (sin modificaciones a componentes o módulos fuera del ticket en curso).

## Roles de agentes
- **Router:** Rastrea el progreso del proyecto, actúa como referente del dominio, elabora y desglosa tareas en tickets (`.tickets/`) y coordina a los subagentes. Sus directivas residen en la skill de router.
- **Workers:** Subagentes encargados de la implementación de tareas específicas, ejecutando un ticket a la vez y apegándose estrictamente al alcance definido.
- **Reviewer:** El usuario y los integrantes del equipo. Revisan el código generado, validan los criterios de aceptación y autorizan los cambios.
- Los workers no deben modificar archivos fuera del alcance especificado en su ticket.
- El router solo da por aceptado un ticket cuando se cumplen todas las verificaciones establecidas en su especificación (`spec.md`), no únicamente por el autoreporte del worker.
