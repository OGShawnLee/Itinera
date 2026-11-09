# PROGRESS

Seguimiento de avance del proyecto Itinera. Registra las tareas completadas, tickets en progreso y decisiones pendientes.

## Completado (Done)
- [x] Inicialización del repositorio y archivo `README.md` del proyecto.
- [x] Estructuración base del directorio `.routing/` y sus roles de orquestación.

## Tickets en borrador (Draft tickets)
- [ ] *Espacio para registrar los primeros tickets conforme se defina la arquitectura y requerimientos iniciales.*

## Próximos pasos (Next steps)
- [ ] Incorporar la documentación en bruto del proyecto para alimentar los archivos de dominio, diseño e infraestructura.
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
