# DOMAIN — Modelo Conceptual y Diccionario del Dominio (Itinera)

> **Estado:** `[LÍNEA BASE MVP — ALINEADO A SPECIFICATION.md]`  
> **Propósito:** Definir con claridad **qué es** cada entidad o concepto del dominio de Itinera, **en qué fase aplica**, **por qué se contempla** y **qué valor aporta**, sirviendo como referencia única para el equipo de trabajo y futuros tickets técnicos.

---

## 1. Visión General del Dominio

El dominio de **Itinera** modela la relación entre **el uso cotidiano de un vehículo ligero**, **el desgaste estimado de sus consumibles críticos** y **las acciones preventivas del propietario** (en taller o mediante auto-mantenimiento *DIY*).

Para evitar complejidad prematura (*scope creep*), cada concepto del dominio está clasificado por horizonte:
- **MVP (Fase 0):** Android-First, *Local-First* (SQLite), motocicletas de `125–250cc`, costo variable `$0`.
- **Fase 1 (Escalamiento Local):** Activado tras densidad local comprobada (`>1,000–2,000` MAU en una ciudad).
- **Fase 2 (Escala Regional / B2B):** Expansión a automóviles, distribuidores regionales y micro-flotillas.
- **Excluido:** Elementos descartados explícitamente por deuda operativa, desacople de incentivos o exceso regulatorio.

---

## 2. Entidades y Conceptos del Núcleo MVP (Fase 0)

| Concepto / Entidad | Qué es | Por qué se contempla | Qué valor aporta |
| :--- | :--- | :--- | :--- |
| **`Vehicle`** *(Unidad Vehicular)* | Representación digital del vehículo del usuario (tipo, apodo/referencia, odómetro base, tasa diaria estimada, estado del odómetro físico). | Es la raíz del expediente. Aunque en el MVP solo se expone la interfaz para motos `125–250cc`, diseñarla conceptualmente polimórfica evita reescribir el dominio al abrir automóviles en Fase 2. | Centraliza en un solo lugar el estado mecánico y el historial de la unidad, sustituyendo notas dispersas o libretas perdidas (*Síndrome de la Guantera*). |
| **`ServiceTemplate`** *(Plantilla Base de Mantenimiento)* | Conjunto precargado y editable de consumibles e intervalos estándar (ej. *Moto Trabajo/Reparto*, *Moto Urbana 125–250cc*, *Personalizada*). | Sustituye la fantasía de mantener un catálogo exacto de refacciones para cientos de modelos/años chinos e indios que cambian entre lotes, y resuelve el desconocimiento técnico del usuario novato. | Permite configurar la moto en `< 30 segundos` desde el onboarding sin conocimientos mecánicos avanzados y sin deuda editorial para el equipo. |
| **`ConsumableItem`** *(Consumible Crítico)* | Cada pieza o fluido sujeto a desgaste periódico dentro de una unidad. En el MVP se acota a los **5 críticos**: aceite de motor, kit de arrastre/cadena, frenos (balatas), bujía y llantas. | Mantener listas de 30+ componentes abruma al usuario y diluye la atención. Estos 5 consumibles concentran la mayor parte de fallas previsibles y riesgos viales en motos `125–250cc`. | Enfoca al conductor en lo que realmente compromete su motor y su seguridad física. |
| **`WearTrafficLight`** *(Semáforo de Desgaste)* | Indicador visual calculado por consumible con 3 estados: **Verde** (en rango), **Amarillo** (ventana de previsibilidad), **Rojo** (umbral crítico alcanzado o vencido). | El conductor promedio cae en el *sesgo de falsa seguridad* ("si arranca, está bien") y sufre por falta de liquidez ante gastos sorpresa. | Traduce cálculos matemáticos en una señal visual inmediata y da margen anticipado (ventana amarilla) para ahorrar y agendar servicio. |
| **`OdometerProjection`** *(Proyección de Odómetro)* | Estimación diaria del kilometraje acumulado sin requerir hardware OBD-II/GPS ni captura diaria del usuario. | Si el usuario no guarda recibos en la guantera, menos abrirá una app en cada carga de gasolina. Además, muchas motos económicas circulan con el chicote del odómetro roto. | Mantiene actualizado el estimado de desgaste automáticamente en segundo plano, con respaldo por tiempo calendario cuando el tablero físico no funciona. |
| **`WeeklyCheckIn`** *(Confirmación Semanal en 1 Toque)* | Notificación semanal ligera con dos acciones rápidas (*"¿Rodaste ~X km esta semana? [Sí, igual] [Ajustar]"*) que recalibra la pendiente de uso (*Rolling Average*). | Reemplaza la captura frecuente en gasolineras por una interacción de `< 5 segundos` una vez por semana desde la pantalla de bloqueo. | Corrige la deriva del algoritmo de proyección sin exigir disciplina diaria al usuario. |
| **`MaintenanceLog`** *(Registro de Servicio)* | Evento histórico que documenta una intervención preventiva o correctiva: fecha, consumible(s) atendido(s), kilometraje, modalidad (`DIY` o `Taller` en texto libre), costo opcional y foto local opcional. | Los usuarios realizan auto-mantenimiento en casa (*DIY*) o acuden a talleres de barrio sin facturación digital; además existe desconfianza hacia cobros o piezas no cambiadas. | Reinicia los contadores del consumible atendido y construye un expediente personal auditable para consultar fechas, costos y respaldar cotizaciones. |
| **`SurgicalAlert`** *(Alerta Quirúrgica Dual)* | Notificación emitida únicamente al cruzar el umbral **Amarillo** (ventana económica) o **Rojo** (umbral crítico) según lo que ocurra primero: kilometraje o tiempo. | Las apps que envían recordatorios triviales a diario son silenciadas o desinstaladas (*fatiga de notificaciones*). | Asegura que cada aviso tenga utilidad real y accionable (planear presupuesto o actuar por seguridad). |
| **`ExportableSummary`** *(Resumen Exportable Gratuito)* | Documento legible generado localmente a partir del historial de `MaintenanceLog` para consulta o entrega al transferir la moto. | Se ofrece **gratuitamente** (y no como producto de pago de `$49 MXN` en el Año 1) porque un registro autodeclarado no certifica veracidad mecánica ante un comprador escéptico. | Funciona como herramienta de retención y canal de recomendación orgánica boca a boca al compartir el cuidado de la unidad. |

---

## 3. Entidades de Escalamiento (Fase 1 y Fase 2)

| Concepto / Entidad | Fase | Qué es | Por qué se contempla | Qué valor aporta |
| :--- | :--- | :--- | :--- | :--- |
| **`ContextualPromotion`** *(Cupón / Promoción Local Trazable)* | **Fase 1** (`>1,000–2,000` MAU locales) | Oferta o descuento de una refaccionaria o taller local mostrada solo cuando un consumible del usuario cercano entra en estado `Amarillo` o `Rojo`. | Responde a la premisa económica clave (*"el usuario particular no paga; el comercio local sí"*). Usar códigos canjeables en mostrador demuestra retorno directo sin que Itinera tenga que "certificar" talleres en campo. | Financia la plataforma mediante pauta/atribución B2B local y ofrece ahorro real en insumos al conductor en el momento exacto en que los necesita. |
| **`PlusSubscription`** *(Plan Multi-Vehículo / Cloud Sync)* | **Fase 1** (Opcional) | Suscripción accesible para gestionar `3+` vehículos y sincronizar respaldos en la nube entre dispositivos. | Mantiene el uso personal (1 unidad) 100% gratuito sin barreras, mientras monetiza un caso de uso legítimo (*power users*) que sí consume almacenamiento cloud. | Ingreso complementario para cubrir costes de servidor y storage conforme escala la base. |
| **`SupplierSponsorship`** *(Pauta de Distribuidores/Marcas)* | **Fase 2** (`>10,000+` MAU) | Recomendación técnica contextual de especificación de consumible (ej. viscosidad de aceite compatible) patrocinada por distribuidores regionales o fabricantes. | Solo es comercialmente viable cuando existe volumen multi-ciudad demostrable; sustituye anuncios genéricos intrusivos por información útil. | Escala la monetización B2B manteniendo la pertinencia técnica dentro de la app. |
| **`MicroFleetAccount`** *(Cuenta de Micro-Flotilla B2B)* | **Fase 2** (B2B) | Panel administrativo para dueños de `3–15` unidades ligeras (taxis bajo contrato, reparto de comercios locales) para centralizar vencimientos y comprobantes de gasto. | En pequeñas empresas el cliente comprador es el dueño del activo. Se acota explícitamente a **recordatorios y control de gastos** (no auditoría de maltrato del chofer sin hardware). | Evita paros operativos por olvido de servicios en flotillas ligeras mediante suscripción mensual por unidad. |

---

## 4. Conceptos Explícitamente Excluidos del Dominio

Para proteger el foco de ingeniería y la viabilidad del proyecto, los siguientes conceptos **NO** se modelan ni se implementan:

1. **`CertifiedWorkshopDirectory` (Directorio de Talleres "Certificados"):** Excluido porque validar calidad mecánica requiere auditorías presenciales continuas (deuda operativa de agencia de servicios) y traslada responsabilidad reputacional a Itinera si un taller falla o cobra de más.
2. **`ExactModelPartsCatalog` (Catálogo Universal de Refacciones por Modelo/Año):** Excluido en el MVP por la alta fragmentación y cambios sin documentación en motocicletas económicas. Se reemplaza por `ServiceTemplate` editables.
3. **`HeavyDutyFleet` (Tráilers, Tractocamiones y Autobuses):** Excluido permanentemente. Implica telemetría satelital J1939, frenos neumáticos y regulación federal (SCT) atendida por plataformas enterprise especializadas.
4. **`FuelAccountingLedger` (Contabilidad Exhaustiva de Combustible y Viajes):** Excluido para evitar convertirse en un clon financiero complejo (como Drivvo) que genere fricción de captura y sobrecarga cognitiva.

---

## 5. Reglas de Negocio e Invariantes Matemáticas

### 5.1 Proyección de Odómetro y Calibración
El kilometraje acumulado en el instante $t$ se estima mediante:

$$Km_{proyectado}(t) = Km_{base} + (Tasa_{dia} \times \Delta t)$$

Donde:
- $Km_{base}$: Último kilometraje confirmado (al registrar la unidad, en un servicio o en un `WeeklyCheckIn`). Si el odómetro físico de la moto está averiado, opera en modo relativo desde `0` o por tiempo calendario.
- $Tasa_{dia}$: Promedio de kilómetros diarios asignado inicialmente según el perfil de uso (ej. `25 km/día` moderado o `75 km/día` intensivo) y ajustado mediante media móvil (*Rolling Average*) cuando el usuario corrige manualmente el valor.
- $\Delta t$: Días transcurridos desde la fecha de $Km_{base}$.

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

### 5.5 Relación `ServiceTemplate` $\to$ `ConsumableItem` (Configuración de Tasas de Desgaste)
Cada `ServiceTemplate` funciona como un **perfil preconfigurado de intervalos máximos ($I_{km}$ e $I_{tiempo}$)** para los 5 `ConsumableItem` de una motocicleta `125–250cc`. La **tasa de desgaste diaria** proviene del uso del vehículo ($Tasa_{dia}$), mientras que la **plantilla** define cada cuántos kilómetros o meses vence cada pieza, con valores editables por el usuario:

| Consumible (`ConsumableItem`) | Plantilla *Moto Urbana 125–250cc* (Ejemplo base) | Plantilla *Moto Trabajo / Uso Rudo* (Ejemplo base) | Plantilla *Personalizada* |
| :--- | :--- | :--- | :--- |
| **Aceite de motor** | `2,500 km` o `3 meses` | `2,000 km` o `2 meses` | Editable desde cero |
| **Kit de arrastre / Cadena** *(lubricación y ajuste)* | `500 km` o `15 días` *(ajuste/lubricación)* / `15,000 km` *(cambio)* | `400 km` o `10 días` *(ajuste/lubricación)* / `12,000 km` *(cambio)* | Editable desde cero |
| **Frenos (balatas)** | `6,000 km` o `6 meses` | `4,500 km` o `4 meses` | Editable desde cero |
| **Bujía** | `5,000 km` o `6 meses` | `4,000 km` o `4 meses` | Editable desde cero |
| **Llantas (inspección / desgaste)** | `15,000 km` o `18 meses` | `12,000 km` o `12 meses` | Editable desde cero |

> *Nota operativa:* Al elegir una plantilla en el onboarding, la app instancia los 5 `ConsumableItem` asociados a ese `Vehicle` con esos valores iniciales. Si el usuario nota en su manual o en su taller otro intervalo (ej. aceite sintético cada `3,000 km`), edita únicamente ese consumible sin afectar a los demás.
