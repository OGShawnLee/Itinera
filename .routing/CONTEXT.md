# CONTEXT

Directorio central de enrutamiento y contexto para los agentes y colaboradores. Leer este archivo primero.

## Archivos de referencia
- [DESIGN.md](DESIGN.md): Directrices de diseño de interfaz (colores, tipografía, componentes y espaciados).
- [PROGRESS.md](PROGRESS.md): Estado actual del proyecto, tareas pendientes, próximos pasos y tickets en curso.
- [DOMAIN.md](DOMAIN.md): Reglas de negocio del dominio vehicular, modelos de datos y servicios.
- [INFRASTRUCTURE.md](INFRASTRUCTURE.md): Configuración del entorno de desarrollo, servicios, base de datos y despliegue.
- [ROUTES.md](ROUTES.md): Mapa de navegación, pantallas de la aplicación móvil y reglas de acceso.

## Proyecto
- **Itinera:** Plataforma móvil orientada a la gestión y seguimiento del mantenimiento preventivo y correctivo de vehículos (motocicletas inicialmente) mediante recordatorios y estimaciones de desgaste por uso.
- **Enfoque actual:** Definición de arquitectura, requerimientos del sistema y estructuración inicial del proyecto.
- **Alcance posterior:** Funcionalidades avanzadas, telemetría y sincronización en la nube.

## Stack tecnológico
- **Plataforma móvil:** *Por definir* (tecnologías y frameworks para el cliente móvil).
- **Backend y persistencia:** *Por definir* (servicios, base de datos local y/o remota).
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
