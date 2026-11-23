# DOMAIN — Modelo Conceptual y Diccionario del Dominio (Itinera)

> **Estado:** `[LÍNEA BASE MVP — ALINEADO A SPECIFICATION.md Y ROUTES.md TRAS AUDITORÍA POST-RETROALIMENTACIÓN (C1–C8)]`  
> **Propósito:** Definir con claridad **qué es** cada entidad o concepto del dominio de Itinera, **en qué fase aplica**, **por qué se contempla** y **qué valor aporta**, sirviendo como referencia única para el equipo de trabajo y futuros tickets técnicos.

---

## 1. Visión General del Dominio

El dominio de **Itinera** modela la relación entre **el uso cotidiano de un vehículo ligero**, **el desgaste estimado de sus consumibles críticos** y **las acciones preventivas del propietario** (en taller o mediante auto-mantenimiento *DIY*).

Para evitar complejidad prematura (*scope creep*), cada concepto del dominio está clasificado por horizonte:
- **MVP (Fase 0):** Android-First, *Local-First* (SQLite), **1 motocicleta principal gratuita** por usuario: motos ligeras urbanas, de trabajo y motonetas (`110–250cc`, con transmisión por `cadena` o `CVT` y plantilla personalizada abierta a otras cilindradas), costo variable `$0`.
- **Fase 1 (Escalamiento Local):** Compuerta única: **`>1,000–2,000` MAU locales en una ciudad**. Solo al cruzarla se activan los comercios aliados (`MerchantPartner`), que entran con una **prueba por volumen** (los primeros `N` clientes comprobados sin costo, con `N` calibrado por el reactivo `B25` del Instrumento B) y después eligen **cuota mensual accesible** o **pago por venta comprobada con cupón**. No se ofrecen pruebas por tiempo calendario mientras la densidad sea baja, porque una prueba sin canjes produce una conclusión falsa de "no funciona". En esta fase también entra `PlusSubscription` (`2+` unidades personales/familiares).
- **Fase 2 (Escala Regional / B2B):** Expansión a automóviles, distribuidores regionales y micro-flotillas comerciales (`2–15` unidades).
- **Excluido:** Elementos descartados explícitamente por deuda operativa, desacople de incentivos o exceso regulatorio.

---

## 2. Entidades y Conceptos del Núcleo MVP (Fase 0)

| Concepto / Entidad | Qué es | Por qué se contempla | Qué valor aporta |
| :--- | :--- | :--- | :--- |
| **`Vehicle`** *(Unidad Vehicular)* | Representación digital del vehículo del usuario: tipo de moto (`motoneta automática`, `calle/trabajo`, `doble propósito`, `deportiva/alta cilindrada`), **`transmision` (`cadena` \| `CVT`)**, apodo/referencia, odómetro base, rutina diaria y días de uso por semana (de los que se deriva `Tasa_dia`, ver `§5.1`) y estado del odómetro físico. | Es la raíz del expediente. Aunque el MVP se enfoca en motos ligeras (`110–250cc`, personales o de trabajo), diseñarla conceptualmente polimórfica evita reescribir el dominio al abrir automóviles en Fase 2. | Centraliza en un solo lugar el estado mecánico y el historial de la unidad, sustituyendo notas dispersas o libretas perdidas (*Síndrome de la Guantera*). |
| **`Vehicle.transmision`** *(Atributo)* | Tipo de transmisión secundaria: `cadena` (kit de arrastre) o `CVT` (banda y rodillos). Se **deduce del tipo de moto** en el Paso 1 del onboarding (`motoneta automática` $\to$ `CVT`; el resto $\to$ `cadena`) y puede corregirse en Ajustes. | Una banda CVT no se lubrica ni se tensa como una cadena; aplicarle intervalos de cadena generaría alertas falsas cada `400–500 km` en motonetas. | Permite conservar **3 plantillas** y **5 consumibles** mientras cada moto recibe intervalos coherentes con su mecánica. |
| **`ServiceTemplate`** *(Plantilla Base de Mantenimiento)* | Conjunto precargado y editable de intervalos estándar (*Moto Urbana `110–250cc`*, *Moto Trabajo / Uso Rudo*, *Personalizada*). Cada plantilla trae **dos variantes del consumible de transmisión** (cadena y CVT) y se instancia según `Vehicle.transmision`. | Sustituye la fantasía de mantener un catálogo exacto de refacciones para cientos de modelos/años chinos e indios que cambian entre lotes, y resuelve el desconocimiento técnico del usuario novato. | Permite configurar la moto en `< 30 segundos` desde el onboarding sin conocimientos mecánicos avanzados y sin deuda editorial para el equipo. |
| **`ConsumableItem`** *(Consumible Crítico)* | Cada pieza o fluido sujeto a desgaste periódico dentro de una unidad. En el MVP se acota a los **5 críticos**: aceite de motor, **transmisión secundaria** (se muestra como *Cadena* si `transmision = cadena`, o *Banda CVT* si `transmision = CVT`), frenos (balatas), bujía y llantas. | Mantener listas de 30+ componentes abruma al usuario y diluye la atención. Estos 5 consumibles concentran la mayor parte de fallas previsibles y riesgos viales en motocicletas urbanas y de trabajo. | Enfoca al conductor en lo que realmente compromete su motor y su seguridad física. |
| **`WearTrafficLight`** *(Semáforo de Desgaste)* | Indicador visual calculado por consumible con 3 estados: **Verde** (en rango), **Amarillo** (ventana de previsibilidad), **Rojo** (umbral crítico alcanzado o vencido). | El conductor promedio cae en el *sesgo de falsa seguridad* ("si arranca, está bien") y sufre por falta de liquidez ante gastos sorpresa. | Traduce cálculos matemáticos en una señal visual inmediata y da margen anticipado (ventana amarilla) para ahorrar y agendar servicio. |
| **`OdometerProjection`** *(Proyección de Odómetro)* | Estimación diaria del kilometraje acumulado sin requerir hardware OBD-II/GPS ni captura diaria del usuario. | Si el usuario no guarda recibos en la guantera, menos abrirá una app en cada carga de gasolina. Además, muchas motos económicas circulan con el chicote del odómetro roto. | Mantiene actualizado el estimado de desgaste automáticamente en segundo plano, con respaldo por tiempo calendario cuando el tablero físico no funciona. |
| **`WeeklyCheckIn`** *(Confirmación Semanal en 1 Toque)* | Notificación semanal ligera **sin kilómetros**: *"¿Usaste tu moto como siempre esta semana? [Sí] [Menos] [Más]"*. Cada respuesta aplica un factor de intensidad a la semana (`§5.1`) y recalibra la pendiente de uso (*Rolling Average*). | Reemplaza la captura frecuente en gasolineras por una interacción de `< 5 segundos` una vez por semana desde la pantalla de bloqueo, y evita pedir al usuario que juzgue kilómetros que no conoce (`AUD-5`, punto 12). | Corrige la deriva del algoritmo de proyección sin exigir disciplina diaria al usuario. |
| **`MaintenanceLog`** *(Registro de Servicio)* | Evento histórico que documenta una intervención preventiva o correctiva: fecha, consumible(s) atendido(s), kilometraje, modalidad (`DIY` o `Taller` en texto libre), costo opcional y foto local opcional. | Los usuarios realizan auto-mantenimiento en casa (*DIY*) o acuden a talleres de barrio sin facturación digital; además existe desconfianza hacia cobros o piezas no cambiadas. | Reinicia los contadores del consumible atendido y construye un expediente personal auditable para consultar fechas, costos y respaldar cotizaciones. |
| **`SurgicalAlert`** *(Alerta Quirúrgica Dual)* | Notificación emitida únicamente al cruzar el umbral **Amarillo** (ventana económica) o **Rojo** (umbral crítico) según lo que ocurra primero: kilometraje o tiempo. | Las apps que envían recordatorios triviales a diario son silenciadas o desinstaladas (*fatiga de notificaciones*). | Asegura que cada aviso tenga utilidad real y accionable (planear presupuesto o actuar por seguridad). |
| **`ExportableSummary`** *(Resumen Exportable Gratuito)* | Documento legible generado localmente a partir del historial de `MaintenanceLog` para consulta o entrega al transferir la moto. | Se ofrece **gratuitamente** (y no como producto de pago de `$49 MXN` en el Año 1) porque un registro autodeclarado no certifica veracidad mecánica ante un comprador escéptico. | Funciona como herramienta de retención y canal de recomendación orgánica boca a boca al compartir el cuidado de la unidad. |
| **`HomeWorkshopTag`** *(Taller de Confianza Local)* | Etiqueta opcional que el usuario asigna a su taller habitual, escribiéndolo en texto libre o **escaneando el QR estático del taller** (que solo contiene nombre y contacto). Habilita en la alerta un botón *"Agendar con mi taller"* (enlace directo a WhatsApp/llamada del taller). | La docente pidió medir si el usuario quiere su seguimiento ligado al taller (`AUD-3`, punto 7; `AUD-11`, punto 26). En Fase 0 esto se resuelve **sin transferir datos**: el QR viaja del taller al teléfono, nunca al revés. | Primer paso de la vinculación ligera taller–cliente sin servidor, sin cuentas y sin tratamiento de datos personales por terceros (cumple *Local-First* y `LFPDPPP`). |

---

## 3. Entidades de Escalamiento (Fase 1 y Fase 2)

| Concepto / Entidad | Fase | Qué es | Por qué se contempla | Qué valor aporta |
| :--- | :--- | :--- | :--- | :--- |
| **`MerchantPartner`** *(Comercio Aliado)* | **Fase 1** (`>1,000–2,000` MAU locales) | Taller, refaccionaria o negocio mixto que contrata promociones dentro de la app. Registro mínimo: nombre comercial, giro, zona/colonia, contacto (WhatsApp) y esquema elegido (`cuota mensual` o `pago por venta comprobada`). Entra con **prueba por volumen** (primeros `N` clientes comprobados sin costo). | Es el lado que paga de la plataforma (*"el usuario particular no paga; el comercio local sí"*). Formalizarlo evita que la promoción derive en un directorio certificado. | Ingreso B2B local medible sin auditorías presenciales. |
| **`ContextualPromotion`** *(Promoción Local Trazable)* | **Fase 1** (`>1,000–2,000` MAU locales) | Oferta de un `MerchantPartner` mostrada solo cuando un consumible del usuario entra en `Amarillo` o `Rojo`, dentro de la zona declarada por el comercio. Cada promoción genera un **código corto único** por usuario. | Conecta la necesidad preventiva con un comercio cercano en el momento exacto en que el usuario va a gastar. | Ahorro real para el conductor y clientes medibles para el comercio. Se financia por **cuota mensual** o **pago por venta comprobada**. |
| **`CouponRedemption`** *(Canje Comprobado)* | **Fase 1** | Evento que registra que un cliente presentó su código en mostrador y compró. Validación **sin software ni computadora en caja**: el encargado envía el código por WhatsApp al número de validación, lo captura en un enlace web ligero desde su celular, o lo anota en una hoja de registro que el equipo concilia semanalmente. | Sin un canje verificable, ni la "venta comprobada" ni el reporte mensual tienen sustento ante el comercio (hallazgo `C2`). El canal de validación se elegirá con el reactivo `B5` (uso de celular/computadora en mostrador). | Base del cobro por venta comprobada y del **reporte mensual del comercio** (promociones mostradas, códigos canjeados). |
| **`WorkshopLink`** *(Vinculación Ligera Taller–Cliente)* | **Fase 1** (Opt-in) | Extensión de `HomeWorkshopTag` cuando el taller es `MerchantPartner`: el usuario, **por iniciativa propia y con consentimiento expreso revocable**, comparte únicamente la fecha estimada de su próximo servicio para que el taller le envíe un recordatorio. | Responde al interés de vincular taller y cliente medido en el Instrumento A (`A27`) sin convertir a Itinera en agencia de servicios. | Recurrencia para el taller y recordatorio humano para el usuario; requiere aviso de privacidad, servidor de Fase 1 y borrado a solicitud (derechos ARCO). |
| **`PlusSubscription`** *(Plan Multi-Vehículo / Cloud Sync)* | **Fase 1** (Opcional) | Suscripción accesible para gestionar **`2+` vehículos personales o familiares** y sincronizar respaldos en la nube entre dispositivos. | Mantiene el uso personal (1 unidad) 100% gratuito sin barreras y cubre el hueco de hogares con 2 motos, monetizando un caso de uso que sí consume almacenamiento cloud. | Ingreso complementario para cubrir costes de servidor y storage conforme escala la base. |
| **`SupplierSponsorship`** *(Patrocinio de Distribuidores/Marcas)* | **Fase 2** (`>10,000+` MAU) | Recomendación técnica contextual de especificación de consumible (ej. viscosidad de aceite compatible) patrocinada por distribuidores regionales o fabricantes, siempre etiquetada como patrocinio. | Solo es comercialmente viable cuando existe volumen multi-ciudad demostrable; sustituye anuncios genéricos intrusivos por información útil. | Escala la monetización B2B manteniendo la pertinencia técnica dentro de la app. |
| **`MicroFleetAccount`** *(Cuenta de Micro-Flotilla B2B)* | **Fase 2** (B2B) | Panel administrativo para negocios con **`2–15` unidades ligeras comerciales** (reparto de comercios locales, mensajería, taxis bajo contrato) para centralizar vencimientos y comprobantes de gasto. | En pequeñas empresas el cliente comprador es el dueño del activo. Se acota explícitamente a **recordatorios y control de gastos** (no auditoría de maltrato del chofer sin hardware). | Evita paros operativos por olvido de servicios en flotillas ligeras mediante suscripción mensual por unidad. |

### 3.1 Reglas de Comercios y Canjes (Fase 1)

1. **Etiqueta obligatoria:** toda `ContextualPromotion` se muestra con la leyenda visible **"Promoción pagada"** y el nombre del comercio. Itinera no la presenta como recomendación.
2. **Cero calificaciones ni certificación:** no existen estrellas, reseñas, insignias de "recomendado", rankings ni mapa público de comercios. Itinera no audita ni certifica calidad mecánica y lo declara en la promoción.
3. **Aparición acotada:** máximo una promoción por consumible en ventana `Amarillo`/`Rojo`; un ítem en Verde nunca muestra promociones; el usuario puede desactivarlas en Ajustes.
4. **Validación simple:** el canje nunca exige instalar software ni tener computadora en caja (`CouponRedemption`).
5. **Prueba por volumen, no por reloj:** los primeros `N` clientes comprobados son gratuitos; la prueba solo arranca tras cruzar la compuerta de `>1,000–2,000` MAU.
6. **Vinculación iniciada por el usuario:** en Fase 0 solo existe `HomeWorkshopTag` (QR estático, sin transferencia de datos). `WorkshopLink` (Fase 1) requiere consentimiento expreso, es revocable y comparte únicamente la fecha estimada del siguiente servicio.

### 3.2 Clasificación de Unidades por Propiedad y Número de Vehículos

| Caso del usuario | Clasificación en el dominio | Producto aplicable |
| :--- | :--- | :--- |
| Dueño de 1 moto personal (incluye repartidor independiente dueño de su unidad) | Usuario B2C de la cohorte MVP | Fase 0 gratuita (`1` unidad principal) |
| Hogar o persona con `2+` motos personales/familiares | Usuario B2C con necesidad multi-unidad | `PlusSubscription` (Fase 1) |
| Conductor de una moto que pertenece a su empleador, **sin** encargado de mantenimiento | Usuario B2C operador de unidad ajena: puede usar la app gratuita para la unidad que maneja, pero no es cohorte prioritaria (desacople patrón–empleado) | Fase 0 gratuita; se contabiliza aparte en el análisis de mercado |
| Negocio con `2–15` motos y **encargado de gestión** de mantenimiento, o dueño que administra las unidades | Prospecto B2B de flotilla; el comprador es el dueño/encargado, no el chofer | `MicroFleetAccount` (Fase 2); se mide en el Instrumento A (`A10`, `A13`, `A20`) para dimensionar demanda |

---

## 4. Conceptos Explícitamente Excluidos del Dominio

Para proteger el foco de ingeniería y la viabilidad del proyecto, los siguientes conceptos **NO** se modelan ni se implementan:

1. **`CertifiedWorkshopDirectory` (Directorio de Talleres "Certificados"):** Excluido porque validar calidad mecánica requiere auditorías presenciales continuas (deuda operativa de agencia de servicios) y traslada responsabilidad reputacional a Itinera si un taller falla o cobra de más. La lista interna de `MerchantPartner` **no** es un directorio: no es consultable, no se califica y solo se expresa como promociones pagadas etiquetadas (`§3.1`).
2. **`ExactModelPartsCatalog` (Catálogo Universal de Refacciones por Modelo/Año):** Excluido en el MVP por la alta fragmentación y cambios sin documentación en motocicletas económicas. Se reemplaza por `ServiceTemplate` editables.
3. **`HeavyDutyFleet` (Tráilers, Tractocamiones y Autobuses):** Excluido permanentemente. Implica telemetría satelital J1939, frenos neumáticos y regulación federal (SCT) atendida por plataformas enterprise especializadas.
4. **`FuelAccountingLedger` (Contabilidad Exhaustiva de Combustible y Viajes):** Excluido para evitar convertirse en un clon financiero complejo (como Drivvo) que genere fricción de captura y sobrecarga cognitiva.

---

## 5. Reglas de Negocio e Invariantes Matemáticas

### 5.1 Proyección de Odómetro y Calibración
El kilometraje acumulado en el instante $t$ se estima mediante:

$$Km_{proyectado}(t) = Km_{base} + (Tasa_{dia} \times \Delta t)$$

Donde:
- $Km_{base}$: Último kilometraje confirmado (al registrar la unidad, en un servicio o al capturar el tablero en `/calibrate`). Si el odómetro físico de la moto está averiado, opera en modo relativo desde `0` o por tiempo calendario.
- $Tasa_{dia}$: Promedio de kilómetros diarios asignado inicialmente con la **tabla canónica de rutina** (abajo), sin obligar al usuario a adivinar kilómetros, y ajustado mediante media móvil (*Rolling Average*) con los factores del `WeeklyCheckIn` o con lecturas reales de tablero.
- $\Delta t$: Días transcurridos desde la fecha de $Km_{base}$.

#### Tabla canónica `rutina cotidiana × días/semana → Tasa_dia`

Las **mismas cuatro rutinas y cuatro rangos de días** se usan, con idéntica redacción, en el Paso 2 de `/onboarding` (`ROUTES.md`) y en los reactivos `A11` y `A12` del Instrumento A (`academic/MARKET_STUDY.md`), de modo que la distribución observada en la encuesta funcione como supuesto inicial del algoritmo.

| Rutina (`A11` / onboarding) | Km por día de uso (supuesto inicial) |
| :--- | :---: |
| R1. *Traslados cortos dentro de mi zona (1 o 2 viajes al día)* | `15` |
| R2. *Cruzo la ciudad de ida y vuelta (escuela o trabajo)* | `30` |
| R3. *Varios viajes en el día (trabajo, mandados o clientes)* | `50` |
| R4. *Reparto o uso continuo casi todo el día* | `90` |

| Días de uso por semana (`A12` / onboarding) | Días efectivos ($D$) |
| :--- | :---: |
| *1 o 2 días* | `1.5` |
| *3 o 4 días* | `3.5` |
| *5 o 6 días* | `5.5` |
| *Todos los días* | `7` |

$$Tasa_{dia} = Km_{rutina} \times \frac{D}{7}$$

Ejemplos: R4 todos los días $\to$ `90 km/día`; R2 de 5 o 6 días $\to$ `30 × 5.5/7 ≈ 23.6 km/día`; R1 de 3 o 4 días $\to$ `≈ 7.5 km/día` (en este caso domina el vencimiento por tiempo). Los valores de `Km_rutina` son supuestos iniciales a recalibrar con el piloto; la app conserva además una opción *"Ingresar km/día manualmente"* para usuarios que sí conocen su recorrido.

#### Factores de intensidad semanal (`WeeklyCheckIn` y `/calibrate` sin odómetro)

| Respuesta del usuario | Factor aplicado a la semana |
| :--- | :---: |
| *No la usé* (solo en `/calibrate`) | `0.0` |
| *Menos* / *Menos que de costumbre* | `0.5` |
| *Sí* / *Como siempre* | `1.0` |
| *Más* / *Más que de costumbre* | `1.5` |

El kilometraje estimado de la semana ($Tasa_{dia} \times 7 \times factor$) alimenta la media móvil de cuatro semanas que recalcula $Tasa_{dia}$. Si el usuario no responde, se asume factor `1.0`.

### 5.2 Regla Dual de Vencimiento (*Lo que ocurra primero*)
Cada `ConsumableItem` tiene un intervalo máximo en kilómetros ($I_{km}$) y un intervalo máximo en días/meses ($I_{tiempo}$). El desgaste avanza por **ambas dimensiones** simultáneamente:

$$\text{Fecha de Alerta} = \min\left(t_{alcanza\_km},\; t_{alcanza\_meses}\right)$$

- **Valor de esta invariante:** Protege contra degradación química por inactividad (aceite oxidado o líquido de frenos con humedad) y garantiza que el sistema siga operando con normalidad cuando la motocicleta tenga el chicote de odómetro dañado.

### 5.3 Lógica del Semáforo (`WearTrafficLight`)
Sea $P_{uso} = \max\left(\frac{\Delta Km}{I_{km}},\; \frac{\Delta \text{Días}}{I_{tiempo}}\right)$ la fracción consumida del intervalo actual del consumible:
- **Verde (`OPTIMO`):** $P_{uso} < 0.80$ — Sin alertas activas.
- **Amarillo (`PREVENTIVO`):** $0.80 \le P_{uso} < 1.00$ — Ventana de previsibilidad económica (permite presupuestar compra/cita; momento habilitado para `ContextualPromotion` en Fase 1).
- **Rojo (`CRITICO`):** $P_{uso} \ge 1.00$ — Umbral vencido; requiere inspección o sustitución prioritaria.

### 5.4 Reinicio de Ciclo al Registrar un Servicio
- Al crear un `MaintenanceLog` preventivo asociado a uno o varios `ConsumableItem`, el contador de $\Delta Km$ y $\Delta \text{Días}$ de esos consumibles específicos se reinicia a `0` tomando como nueva referencia el odómetro y fecha del servicio registrado.
- Si el `MaintenanceLog` incluye actualización de odómetro real, se actualiza $Km_{base}$ de la unidad y se recalibra $Tasa_{dia}$.
- En el consumible de transmisión con dos tareas (lubricación/ajuste o inspección frente a reemplazo), registrar el **reemplazo** reinicia ambos contadores; registrar solo la **lubricación/ajuste o inspección** reinicia únicamente el contador corto.

### 5.5 Relación `ServiceTemplate` $\to$ `ConsumableItem` (Configuración de Tasas de Desgaste)
Cada `ServiceTemplate` funciona como un **perfil preconfigurado de intervalos máximos ($I_{km}$ e $I_{tiempo}$)** para los 5 `ConsumableItem` de una motocicleta urbana, motoneta o de trabajo (`110–250cc`). La **tasa de desgaste diaria** proviene del uso del vehículo ($Tasa_{dia}$), mientras que la **plantilla** define cada cuántos kilómetros o meses vence cada pieza, con valores editables por el usuario. La fila de transmisión se instancia según `Vehicle.transmision`:

| Consumible (`ConsumableItem`) | Plantilla *Moto Urbana (`110–250cc`)* | Plantilla *Moto Trabajo / Uso Rudo* | Plantilla *Personalizada* *(incl. `>250cc`)* |
| :--- | :--- | :--- | :--- |
| **Aceite de motor** | `2,500 km` o `3 meses` | `2,000 km` o `2 meses` | Editable desde cero |
| **Transmisión — Cadena / kit de arrastre** *(si `transmision = cadena`)* | Lubricación y ajuste: `500 km` o `15 días` / Cambio de kit: `15,000 km` | Lubricación y ajuste: `400 km` o `10 días` / Cambio de kit: `12,000 km` | Editable desde cero |
| **Transmisión — Banda CVT y rodillos** *(si `transmision = CVT`; sin lubricación)* | Inspección de banda y rodillos: `6,000 km` o `6 meses` / Reemplazo: `15,000 km` o `24 meses` | Inspección: `4,000 km` o `4 meses` / Reemplazo: `12,000 km` o `18 meses` | Editable desde cero |
| **Frenos (balatas)** | `6,000 km` o `6 meses` | `4,500 km` o `4 meses` | Editable desde cero |
| **Bujía** | `5,000 km` o `6 meses` | `4,000 km` o `4 meses` | Editable desde cero |
| **Llantas (inspección / desgaste)** | `15,000 km` o `18 meses` | `12,000 km` o `12 meses` | Editable desde cero |

> *Nota operativa:* Al elegir una plantilla en el onboarding, la app instancia los 5 `ConsumableItem` asociados a ese `Vehicle` (con la variante de transmisión que corresponda) usando esos valores iniciales. Si el usuario nota en su manual o en su taller otro intervalo (ej. aceite sintético cada `3,000 km`), edita únicamente ese consumible sin afectar a los demás. Los intervalos de CVT son valores de referencia editables y se contrastarán con los servicios más solicitados que reporten los talleres en el Instrumento B (`B9`).
