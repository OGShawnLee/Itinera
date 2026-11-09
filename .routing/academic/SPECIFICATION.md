# Especificación Académica y de Dominio — Proyecto Itinera

> **Documento Purgado y Refinado**  
> **Estado:** `[REFINED / EN EVOLUCIÓN PROGRESIVA]`  
> **Asignatura:** Economía para Toma de Decisiones — Licenciatura en Ingeniería de Software.  
> **Ubicación y fecha:** Xalapa, Veracruz — Octubre/Noviembre 2026.  
> **Equipo de trabajo:**
> - Gerardo Abraham Barrón Gómez
> - Edgar Vázquez García
> - Alberto Villalba Figueroa

---

## 1. Resumen Ejecutivo y Visión

- **Nombre del proyecto:** Itinera
- **Lema:** *"Donde cada kilómetro cuenta"*
- **Propósito central:** Optimizar y hacer eficiente la gestión del ciclo de mantenimiento preventivo y correctivo de vehículos particulares (con énfasis prioritario en motocicletas), proveyendo una bitácora digital ágil y de baja fricción que conecte el uso cotidiano de la unidad con alertas oportunas, estimación visual de desgaste de consumibles y fomento del auto-mantenimiento seguro.

---

## 2. Planteamiento del Problema (TPNSc)

### 2.1 Definición Canónica del Problema
> *"El proceso actual de gestión y seguimiento del mantenimiento de vehículos particulares en México opera bajo un esquema ineficiente, reactivo y desarticulado. A pesar de existir métodos convencionales de registro (notas físicas, stickers, hojas de cálculo o bitácoras en papel), estos demandan una alta carga de captura manual y carecen de dinamismo, lo que provoca el abandono del seguimiento preventivo. Como consecuencia, los propietarios enfrentan asimetría de información técnica, toman decisiones a destiempo y dependen de mantenimientos correctivos imprevistos, los cuales elevan los costos operativos, reducen la vida útil del vehículo y comprometen la seguridad vial de los conductores."*

### 2.2 Ineficiencias Críticas del Sistema Actual
1. **Fricción y discontinuidad en el registro:** Los métodos existentes no se integran de forma natural al día a día del conductor. El registro manual disperso no aporta valor inmediato ni proyecciones útiles, lo que conduce a su abandono.
2. **Incapacidad de anticipación (Reactividad sistémica):** No existe un vínculo directo y comprensible entre el uso del vehículo (kilometraje/tiempo) y el desgaste de consumibles críticos, llevando al usuario a actuar únicamente tras la falla evidente.
3. **Opacidad y desinformación:** La dispersión histórica de servicios dificulta evaluar la salud mecánica de la unidad, auditar intervenciones mecánicas y respaldar el valor del vehículo en el mercado.
4. **Desconocimiento técnico de componentes, ratios e intervalos:** El usuario común desconoce qué piezas específicas sufren desgaste por el uso diario, el ratio o tasa a la que se degradan según el kilometraje/tiempo acumulado, y la frecuencia oportuna para inspeccionar, lubricar, ajustar o sustituir cada consumible.

### 2.3 Factores Socioculturales, Conductuales y Económicos
El problema se sostiene sobre cinco factores humanos y de comportamiento que deben ser abordados por la solución:

1. **Ausencia de hábitos de registro (Fricción cultural):** El usuario promedio no tiene la costumbre ni la disciplina de anotar fechas, kilometrajes o piezas sustituidas.  
   *Respuesta en diseño:* Registro ágil en un toque, recordatorios proactivos y estimación automatizada de odómetro.
2. **Restricción de liquidez y falta de previsibilidad (Factor económico):** Ante presupuestos limitados o ingresos fluctuantes, el mantenimiento programado se posterga si el gasto llega por sorpresa y sin tiempo para presupuestar.  
   *Respuesta en diseño:* Proyecciones anticipadas de servicios futuros para permitir planeación de gastos y priorización de consumibles esenciales.
3. **Sesgo de optimismo y falsa seguridad (Factor psicológico):** Existe la creencia arraigada de que "todo está bajo control" mientras el vehículo arranque y ruede, obviando el deterioro paulatino e invisible de piezas mecánicas.  
   *Respuesta en diseño:* Indicadores visuales directos (semáforo de desgaste / salud de componentes) que visibilicen el estado real del vehículo.
4. **Resistencia al costo de oportunidad en talleres (Factor operativo):** Llevar la unidad a un taller implica perder horas productivas, quedarse sin medio de transporte y pagar costos de mano de obra.  
   *Respuesta en diseño:* Integración de guías de inspección preventiva y auto-mantenimiento básico (DIY: Do It Yourself) para tareas que el usuario puede realizar por cuenta propia.
5. **Desconfianza hacia los talleres mecánicos (Factor social/institucional):** La asimetría técnica entre el mecánico y el cliente genera temor a sobreprecios, diagnósticos dudosos o refacciones no cambiadas.  
   *Respuesta en diseño:* Expediente digital transparente y trazable con registro de notas, piezas y evidencias fotográficas de servicios realizados.

### 2.4 Delimitación de Alcance y Diagnóstico del Ecosistema de Agencias
Para evitar dispersión de esfuerzo y garantizar un impacto real medible, el alcance del proyecto se delimita a partir de las realidades observadas en el entorno:

1. **Delimitación del Alcance Mínimo Viable (MVP):**
   - **Segmento vehicular inicial:** Motocicletas urbanas y utilitarias de baja y media cilindrada (125cc a 250cc) en México (marcas de volumen: Italika, Bajaj, Honda, Vento, Yamaha).
   - **Justificación de alcance:** Cuentan con consumibles estándar homogéneos (motores monocilíndricos de ~1L de aceite, cadenas de transmisión que demandan lubricación frecuente, bujías y frenos expuestos), intervalos de servicio cortos (cada 2,500 – 3,000 km) y representan a la población más vulnerable ante costos imprevistos y riesgos de seguridad vial. Una vez consolidado y validado este núcleo, el alcance podrá expandirse hacia automóviles particulares.
2. **Realidad de las Agencias de Motocicletas:**
   - **Desconexión post-garantía:** Las agencias oficiales de motocicletas en México se limitan a sellar pólizas de servicio obligatorio durante el periodo de garantía inicial (generalmente los primeros 2 o 3 servicios). Una vez concluido este periodo, los usuarios abandonan las agencias debido a altos costos de mano de obra y trámites engorrosos.
   - **Ausencia de recordatorios y acompañamiento activo:** Las agencias no dan seguimiento proactivo al kilometraje ni al desgaste de las unidades de sus clientes; su enfoque es puramente transaccional de mostrador y venta de unidades nuevas o refacciones.
   - **Desatención en talleres locales:** Los talleres mecánicos de barrio o independientes no cuentan con infraestructura ni incentivos para emitir recordatorios o bitácoras a los propietarios.
   - **Conclusión del ecosistema:** El conductor queda en una situación de total abandono y desatención técnica tras la compra o fin de garantía, dependiendo enteramente de su memoria y criterio empírico.

### 2.5 Justificación de Impacto: Efectos Primarios y Externalidades del Ecosistema
¿Por qué vale la pena resolver el problema y qué actores se benefician?

1. **Impactos Primarios (Nivel Conductor / Usuario Final):**
   - **Previsibilidad de agenda y flujo de efectivo:** Facilita reservar tiempo con anticipación y planificar el ahorro de dinero específico para el mantenimiento antes del vencimiento del umbral, suprimiendo la excusa de falta de liquidez inmediata.
   - **Eliminación del efecto dominó cotidiano:** La rotura o avería intempestiva del vehículo acarrea consecuencias secundarias severas: quedarse varado en zonas de riesgo, llegar tarde o faltar a la escuela/trabajo, pérdidas económicas directas por jornadas no trabajadas (en repartidores y mensajeros) y sanciones laborales.
2. **Impactos Secundarios y Externalidades Positivas (Ecosistema Ampliado):**
   - **Talleres mecánicos y centros de servicio:** Se benefician de una clientela con demanda preventiva programada y predecible, con menor rotación caótica de emergencias y mayor lealtad.
   - **Seguridad vial y aseguradoras:** La disminución de averías mecánicas críticas en circulación (frenos desgastados, reventón de neumáticos, rotura de cadena de transmisión) previene siniestros viales graves, reduciendo gastos médicos, pérdidas materiales y costos de indemnización para aseguradoras.
   - **Delimitación estratégica:** Aunque estos actores secundarios reciben externalidades favorables, Itinera diseña su arquitectura y experiencia enfocada 100% en empoderar al conductor.

---

## 3. Segmentación de Usuarios (Consumidores, Clientes y Usuarios - CCU)

A partir de la retroalimentación docente, la segmentación se depura para evitar mezclar al conductor de reparto como usuario individual con las dinámicas corporativas. Se establecen los **conjuntos reales del mercado**, sus **concentraciones de edad** y sus **segmentos catalizadores de adopción**:

### 3.1 Segmentación Canónica de Clientes y Usuarios

| Segmento | Clasificación | Rango Ampliado (Concentración Clave) | Perfil y Contexto Operativo | Puntos de Dolor Críticos | Propuesta de Valor de Itinera |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Propietarios de motocicletas particulares** *(Núcleo del MVP)* | B2C (Usuario y Consumidor) | 18 a 60 años<br>*(Concentración: 20 – 35 años)* | Jóvenes estudiantes, profesionistas y trabajadores urbanos que utilizan motocicletas (125cc–250cc) como transporte personal primario. Nivel socioeconómico medio y medio-bajo. | Desgaste veloz de consumibles (aceite, cadena, frenos). El fallo de una pieza arriesga la integridad física. Olvido de servicios e ingresos variables que dificultan pagos imprevistos. | Estimación automatizada de kilometraje, semáforo visual de vida útil de piezas y recordatorios con margen para planificar gastos. |
| **Propietarios de automóviles particulares** | B2C (Usuario y Consumidor) | 18 a 75 años<br>*(Concentración: 28 – 50 años)* | Dueños de autos particulares compactos o familiares para traslados diarios o laborales. | Desconocimiento del plan de servicio, extravío de pólizas/bitácoras en papel y desconfianza en talleres mecánicos. | Expediente digital consolidado, auditoría de piezas sustituidas e historial transferible para conservar el valor de reventa. |
| **Empresas con personal de transporte y reparto (Micro-flotillas)** *(Segmento Sustituto / Fase B2B)* | B2B (Cliente comprador; repartidores como usuarios) | N/A (Organizaciones / PYMEs / Farmacias / Mensajería) | Compañías y negocios que cuentan con flotillas propias o esquemas donde exigen a sus transportistas mantener sus unidades en condiciones operativas óptimas. | Falta de visibilidad sobre el estado real de los vehículos, costos elevados por reparaciones imprevistas y riesgo de paralización de entregas. | Panel administrativo centralizado, registro auditable del estado mecánico y supervisión del cumplimiento preventivo por unidad. |

### 3.2 Segmentos Menores y Nichos Estratégicos para Expandir el Uso
Como señala la observación docente (*"puede que haya segmentos menores pero que puedan ayudarnos a expandir el uso"*), existen grupos específicos con alta disposición a adoptar la solución desde el inicio:

1. **Conductores novatos y recién compradores (Primer vehículo / Primera moto):**
   - Altamente receptivos a herramientas que los orienten desde cero. Al carecer de experiencia previa, valoran el catálogo precargado y las explicaciones sin tecnicismos.
2. **Entusiastas y practicantes del auto-mantenimiento (Comunidad DIY):**
   - Propietarios que prefieren realizar sus propios cambios de aceite, lubricación de cadena o ajustes de frenos. Buscan una bitácora digital para registrar sus propios procedimientos sin depender de firmas de talleres.
3. **Mujeres conductoras (Romper la asimetría en talleres):**
   - Segmento históricamente desatendido por la cultura automotriz tradicional, frecuentemente expuesto a tratos condescendientes o sobreprecios. Itinera les proporciona diagnósticos objetivos y argumentos técnicos respaldados para acudir al taller con seguridad.
4. **Adultos mayores:**
   - Concentración en rangos superiores (55+ años). Requieren interfaces de alta legibilidad, cero sobrecarga cognitiva y claridad en próximas intervenciones sin menús rebuscados.

### 3.3 Delimitación de Roadmap: Desacoplamiento del Repartidor Individual
- **Corrección de enfoque:** Anteriormente se trataba al "conductor de reparto" como un perfil homogéneo. En la realidad:
  - Si el repartidor usa su propia unidad sin vinculación laboral estricta, encaja naturalmente en el perfil **B2C de Propietario de Motocicleta** (uso intensivo).
  - Si el repartidor trabaja bajo contrato o supervisión de una empresa, el cliente que toma la decisión y paga por el servicio es la **Compañía**, no el chofer.
- **Estrategia:** El MVP se concentra en el usuario B2C (dueño de su vehículo). Las funcionalidades multi-vehículo y de supervisión corporativa se derivan a la fase B2B para mantener ágil el lanzamiento inicial.

---

## 4. Filosofía y Principios Diferenciadores

1. **Eficiencia y salud vehicular antes que contabilidad exhaustiva:** A diferencia de plataformas financieras que saturan al usuario con registros de combustible y balances contables (ej. Drivvo), Itinera se enfoca en la **operatividad y prevención mecánica** de la unidad.
2. **Diseño Mobile-First sin fricción:** Interfaces optimizadas para captura rápida y comprensión intuitiva sin requerir alfabetización mecánica avanzada.
3. **Cero tecnicismos innecesarios:** Comunicación en lenguaje cotidiano, explicando el "por qué" y "cuándo" de cada servicio.
4. **Fomento del auto-mantenimiento informado (DIY):** Reconocimiento de que muchos usuarios realizan o desean realizar sus propios ajustes menores para ahorrar costos y tiempo.
5. **Mitigación de la fatiga de captura (Low-Touch Logging):** El sistema parte de la premisa de que los conductores **no están dispuestos** a introducir datos diarios ni llenar formularios tediosos. Por ello, Itinera opera mediante proyección algorítmica de odómetro basada en hábitos declarados y confirmaciones de kilometraje en un solo toque (*One-Tap Check-in*), reduciendo drásticamente la carga de interacción.
6. **Política de notificaciones quirúrgicas de alto valor (Anti-spam de alertas):** Los usuarios rechazan y silencian las apps invasivas. Itinera descarta recordatorios triviales y concentra sus avisos en dos momentos estratégicos indispensables:
   - *Ventana de previsibilidad económica:* Alerta anticipada (ej. faltan ~300 km o 2 semanas) para planificar el presupuesto o adquisición del consumible.
   - *Alerta de umbral crítico:* Notificación de vencimiento inminente de un servicio que compromete la seguridad física del conductor o la integridad del motor (aceite, frenos, kit de arrastre).
7. **Métricas duales de seguimiento (Kilometraje y Tiempo Calendario):** Para dar respuesta al seguimiento efectivo de tiempos, el desgaste se evalúa en dos dimensiones: uso dinámico (odómetro acumulado) y degradación temporal (meses transcurridos). Ciertos componentes sufren descomposición química o resequedad aunque la unidad ruede poco (ej. oxidación de aceite de motor, humedad hidroscópica en líquido de frenos, resequedad de llantas y retenes). El sistema monitorea ambas variables y alerta por *lo que ocurra primero* (ej. 3,000 km o 3 meses).

---

## 5. Objetivos del Proyecto

### 5.1 Objetivo General
Desarrollar un sistema móvil de bitácora y monitoreo preventivo que optimice el seguimiento del mantenimiento vehicular, reduciendo la fricción de captura, visibilizando el desgaste de componentes clave y proporcionando alertas tempranas para extender la vida útil de las unidades y mejorar la seguridad de los conductores.

### 5.2 Objetivos Específicos
1. **Gestión ágil de vehículos:** Registrar unidades con datos esenciales (marca, modelo, año, kilometraje base).
2. **Expediente digital de servicios:** Registrar intervenciones preventivas y correctivas en pocos pasos, con soporte para talleres o auto-mantenimiento.
3. **Alertas de mantenimiento:** Notificar proactivamente sobre servicios programados en función de umbrales de kilometraje estimado y tiempo transcurrido.
4. **Visualización de desgaste:** Presentar un tablero intuitivo de salud mecánica que contrarreste el sesgo de falsa seguridad del conductor.
5. **Historial exportable y transferible:** Disponer de un resumen auditable del historial de la unidad para fines de consulta o acreditación de cuidado ante terceros.

---

## 6. Modelo de Negocio Canvas (Boceto Preliminar)

```mermaid
flowchart TD
    subgraph Negocio["Modelo de Negocio Canvas (Itinera)"]
        direction LR
        Socios["<b>Socios Clave</b><br/>• Talleres mecánicos locales de confianza<br/>• Refaccionarias y distribuidores de consumibles<br/>• Comunidades y clubes de motociclistas"]
        Actividades["<b>Actividades Clave</b><br/>• Desarrollo móvil multiplataforma<br/>• Curación de tablas de servicio preventivo<br/>• Modelado de desgaste por kilometraje estimado"]
        Recursos["<b>Recursos Clave</b><br/>• Base de conocimientos de consumibles e intervalos<br/>• Infraestructura tecnológica (local-first/cloud)<br/>• Equipo de desarrollo de software"]
        Propuesta["<b>Propuesta de Valor</b><br/>• Sistema eficiente y sin fricción de mantenimiento<br/>• Visibilidad clara de desgaste mecánico<br/>• Anticipación de gastos para mejor planificación<br/>• Soporte para talleres y auto-mantenimiento"]
        Relacion["<b>Relación con Clientes</b><br/>• Autoservicio móvil guiado<br/>• Alertas oportunas no invasivas<br/>• Soporte y transparencia"]
        Canales["<b>Canales</b><br/>• Tiendas de aplicaciones (Google Play / App Store)<br/>• Recomendación comunitaria y talleres aliados"]
        Segmentos["<b>Segmentos de Clientes</b><br/>• Motociclistas particulares (foco inicial)<br/>• Repartidores de plataformas de última milla<br/>• Propietarios de autos particulares"]
        Costos["<b>Estructura de Costes</b><br/>• Cuentas de desarrollador en tiendas de apps<br/>• Servicios de sincronización y hosting<br/>• Soporte, testing y mantenimiento continuo"]
        Ingresos["<b>Fuentes de Ingresos (Potenciales)</b><br/>• Modelo Freemium (registro de múltiples unidades o funciones avanzadas)<br/>• Exportación de expedientes certificados<br/>• Afiliación con proveedores de refacciones/talleres"]
    end
```

---

## 7. Próximas Secciones por Purgar y Refinar
- [ ] Detalle de módulos del Canvas con la retroalimentación de la profesora.
- [ ] Validación de la solución y propuesta de valor técnica.
- [ ] Definición del modelo de datos inicial en `DOMAIN.md`.
