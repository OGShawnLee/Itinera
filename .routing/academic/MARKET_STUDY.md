# Estudio de Mercado — Proyecto Itinera

> **Documento Operativo del Entregable Académico (`STUDY.md` — `TASK 1–5`)**  
> **Estado:** `[INSTRUMENTOS REESTRUCTURADOS TRAS RETROALIMENTACIÓN DOCENTE (AUD-1 a AUD-13, 36 puntos) — CAPTURAS DEL PROTOTIPO Y FASE DE CAMPO PENDIENTES]`  
> **Asignatura:** Economía para Toma de Decisiones — Licenciatura en Ingeniería de Software  
> **Proyecto:** Itinera (*"Donde cada kilómetro cuenta"*)  
> **Ciudad Piloto:** Xalapa, Veracruz, México  
> **Fecha:** Noviembre 2026  
> **Equipo de trabajo:** Gerardo Abraham Barrón Gómez, Edgar Vázquez García, Alberto Villalba Figueroa  
> **Fuentes canónicas:** [`DOMAIN.md`](../DOMAIN.md) (tabla de rutina `§5.1`, transmisión `cadena`/`CVT`, comercios `§3.1`, clasificación por propiedad `§3.2`), [`ROUTES.md`](../ROUTES.md) (pantallas para capturas, `§4.D` diferido), [`SPECIFICATION.md`](SPECIFICATION.md), [`deliverables/LOG_RETROALIMENTACION.md`](../../deliverables/LOG_RETROALIMENTACION.md).

---

## 1. Objetivo del Estudio de Mercado (`TASK 1`)

### 1.1 Objetivo General

Validar la viabilidad de mercado, conductual y comercial de **Itinera** en **Xalapa, Veracruz** —aplicación Android *Local-First* gratuita para el seguimiento preventivo de cinco consumibles críticos en motocicletas ligeras urbanas, de trabajo y motonetas (`110–250cc`, transmisión por cadena o CVT) en Fase 0, con un lado B2B de comercios locales que pagan por promociones etiquetadas y ventas comprobadas en Fase 1—, **presentando el prototipo a los encuestados antes de validar** y midiendo sin descartes prematuros a todos los motociclistas, para dimensionar la demanda real, la oferta sustituta, los canales de menor costo y la disposición a pagar en ambos lados de la plataforma.

### 1.2 Objetivos Específicos

1. **Demanda (B2C, todos los motociclistas de Xalapa):** Perfilar sociodemográficamente al motociclista (edad, género, ingreso); medir la proporción por cilindrada (`<110`, `110–125`, `126–250`, `>250`, *No sé*), tipo de moto y transmisión, uso principal, propiedad de la unidad, rutina diaria y días de uso (misma escala que `Tasa_dia`), frecuencia y responsable de cada mantenimiento, motivo de hacerlo en casa o en taller, gasto mensual y forma actual de control.
2. **Validación del producto:** Tras mostrar el prototipo, medir intención de uso (escala de 5 puntos calibrable), adecuación del check-in semanal sin kilómetros, utilidad del semáforo y anticipación preferida del aviso, utilidad del resumen exportable, interés en ligar la app con el taller de confianza y aceptación de promociones locales.
3. **Oferta y competencia:** Contrastar Itinera frente a Drivvo, Fuelio, MotoLog/MotoriLog y sustitutos analógicos (libreta, sticker, memoria, WhatsApp), y medir en talleres/refaccionarias si ya existe algún sistema de recordatorio y cuánto se retrasan sus clientes.
4. **Canales y soporte:** Medir cómo descubre apps el motociclista, su canal preferido de ayuda, y en comercios la aceptación del QR/enlace y otros medios de difusión.
5. **Precios:** Medir con flujos condicionales la disposición a pagar B2C (monto y periodicidad) y, en B2B, la preferencia entre cuota mensual y pago por venta comprobada, el monto máximo de cada uno, el descuento tolerable y el número de clientes gratuitos necesarios para decidir (prueba por volumen).

---

## 2. Metodología, Fuentes e Instrumentos de Recolección (`TASK 2`)

### 2.1 Estilo y Diseño Metodológico del Estudio

| Dimensión Metodológica | Segmento A — Lado A (B2C: Motociclistas de Xalapa) | Segmento B — Lado B (B2B Fase 1: Talleres y Refaccionarias) |
| :--- | :--- | :--- |
| **Estilo de estudio** | **Cuantitativo** (encuesta estructurada en Google Forms, muestreo no probabilístico por cuotas en puntos de afluencia, con declaración explícita de sus límites inferenciales). | **Cuantitativo-descriptivo con componente cualitativo** (formulario aplicado en mostrador por el encuestador; intento de censo del marco DENUE). |
| **Justificación** | Universo amplio (`~40,000` motos circulantes estimadas) donde se requiere estimar proporciones con intervalo de confianza para alimentar el embudo de demanda y el Estudio Económico-Financiero. | Marco reducido (`~35` talleres `SCIAN 811492` más refaccionarias `[PENDIENTE DE CONTEO EXACTO EN DENUE SCIAN 468311]`); con pocas decenas de comercios no se infiere estadísticamente: se describe con rangos y frecuencias. |
| **Instrumento** | **Instrumento A**: 45 reactivos totales en 11 secciones (`A0`–`A37` más 7 preguntas derivadas condicionales); cada persona responde entre 24 y 34. Tiempo: 7–8 min. Incluye capturas 1–5 del prototipo. | **Instrumento B**: 31 reactivos (`B1`–`B31`) en 8 secciones; por las ramas cada comercio responde entre 25 y 29. Tiempo: 8–10 min. Incluye capturas 2, 5 y 6 del prototipo. |

> **Regla de dos instrumentos:** Itinera es una plataforma de dos lados asimétrica; quien adopta gratis (motociclista) y quien paga en Fase 1 (comercio) tienen atributos y motivaciones distintos, por lo que se diseñan dos instrumentos independientes y no intercambiables.

### 2.2 Fuentes Secundarias Verificadas

#### A. Estadísticas Oficiales del Parque Vehicular, Talleres y Tecnología Móvil

| Indicador / Dato Verificado | Cifra Exacta | Ámbito Geográfico | Año / Corte | Fuente Oficial / Verificable |
| :--- | :--- | :--- | :--- | :--- |
| **Motocicletas registradas en circulación (Nacional)** | **`10,547,500`** unidades (`16.1%` del parque nacional; `+17.8%` vs. `8,953,446` en 2024) | México | 2025 | INEGI — *VMRC* ([inegi.org.mx](https://www.inegi.org.mx/programas/vehiculosmotor/)) |
| **Motocicletas registradas en circulación (Estatal)** | **`664,867`** unidades (5.º lugar nacional; `+29.0%` vs. `515,288` en 2024 y `383,839` en 2023) | Veracruz | 2025 | INEGI — *VMRC* |
| **Parque vehicular total en Xalapa** | **`232,680`** vehículos de motor registrados | Xalapa | Cierre 2024 | INEGI — *VMRC* |
| **Motocicletas registradas en Xalapa (cota censal)** | **`23,159`** unidades (`22,720` particulares y `439` oficiales) | Xalapa | 2021 | INEGI / CEIEG Veracruz — *Cuadernillos Municipales* ([ceieg.veracruz.gob.mx](https://www.ceieg.veracruz.gob.mx/cuadernillos-municipales/)) |
| **Motocicletas en circulación estimadas en Xalapa** | **`~40,000`** unidades (~50% sin placas locales o en regularización) | Xalapa | Oct–Nov 2026 | Departamento de Movilidad Urbana, Ayuntamiento de Xalapa (prensa estatal 2026) |
| **Siniestralidad vial con motocicletas** | **`273`** colisiones con moto de **`804`** siniestros (ene–oct 2026) | Xalapa | 2026 | Movilidad Urbana Xalapa / *Physis Ciclovida* |
| **Talleres de reparación de motocicletas (`SCIAN 811492`)** | **`~35`** establecimientos | Xalapa (`30087`) | DENUE `05/2026` | INEGI — *DENUE* ([inegi.org.mx/app/mapa/denue/](https://www.inegi.org.mx/app/mapa/denue/default.aspx)) |
| **Refaccionarias / comercio de motocicletas (`SCIAN 468311`)** | `[PENDIENTE DE CONTEO EXACTO EN DENUE SCIAN 468311]` *(oficialmente "Comercio al por menor de motocicletas"; incluye venta al por menor de partes y refacciones nuevas de moto, a diferencia de `468211` para autos y `811493` para bicicletas)* | Xalapa (`30087`) | DENUE `05/2026` | INEGI — *DENUE / SCIAN* |
| **Participación de Android en México** | **`74.11%`** Android vs. `25.89%` iOS (oct 2025–oct 2026); **`89.13%`** en 2024 | México | 2024–2026 | StatCounter Global Stats ([gs.statcounter.com](https://gs.statcounter.com/os-market-share/mobile/mexico)) |
| **Salario mínimo general 2026 (referencia `A4`)** | **`$315.04` MXN/día** (`~$9,582.47` MXN/mes a 30.4 días) | Resto del país (incluye Xalapa) | 2026 | CONASAMI |

> **Datos que NO se citan como hechos:** el `~70%` del parque en `51–125cc`, el `25%` en `126–250cc` y el `~80%` de motos de baja cilindrada adquiridas como herramienta de trabajo (*El Heraldo de México*, sin fuente exacta) provienen de material enviado por la docente y no están verificados. Por eso el Instrumento A mide directamente la cilindrada (`A7`), el uso (`A9`) y el tipo de celular (`A35`–`A36`), en lugar de suponerlos. Tampoco se cita el `>85%` de Android en el segmento motociclista: es un supuesto a medir.

#### B. Benchmark de Competidores Digitales y Sustitutos Analógicos

| Competidor / Sustituto | Tipo | Modelo de Precios | Enfoque Principal | Brecha frente a Itinera |
| :--- | :--- | :--- | :--- | :--- |
| **Drivvo** *(CTN Cardoso)* | App Android / iOS / Web | *Freemium* con anuncios (hasta 2 vehículos); suscripción `~$174.90–$499.90 MXN/año` | Contabilidad de gastos y cargas de gasolina | Cuenta obligatoria, anuncios a pantalla completa y captura por cada carga; no resuelve odómetro roto. |
| **Fuelio** *(Sygic)* | App Android / iOS | Gratuita sin anuncios en Android; Premium `$4.99–$15.99 USD/año` | Rendimiento de combustible | No permite registrar lecturas aisladas de odómetro sin asociarlas a una carga o gasto. |
| **MotoLog / MotoriLog** | App móvil | *Freemium* / compras in-app | Garaje digital por VIN, rutas GPS | Pensadas para gama media-alta; asumen tableros funcionales y captura detallada. |
| **Libreta, sticker de taller, WhatsApp o memoria** | Analógico | `$0` directo | Anotación manual | Se pierde o moja; no suma kilómetros ni avisa con anticipación (*Síndrome de la Guantera*). |

### 2.3 Prototipo de Validación y Capturas para Google Forms

Por indicación docente (`AUD-7` a `AUD-13`), ambos instrumentos **presentan el prototipo antes de cualquier pregunta de validación**. Las capturas se obtienen de una mini app en Vue 3 + Vue Router con datos simulados, en viewport `390×844`, una pantalla por imagen, recortada a la zona relevante, con un pie de una línea en lenguaje cotidiano. Ninguna captura muestra kilómetros estimados, identificadores técnicos ni nombres de negocios reales (se usa *"Refaccionaria Ejemplo"*).

| # | Momento | Ruta base (`ROUTES.md`) | Instrumento | Pie de imagen sugerido |
| :--- | :--- | :--- | :--- | :--- |
| **Captura 1** | Configuración inicial: tipo de moto y *"¿Cómo usas tu moto en un día normal?"* | `/onboarding` pasos 1–2 | A | *"La configuras en menos de 30 segundos, sin saber de mecánica ni contar kilómetros."* |
| **Captura 2** | Inicio *"Mi Moto"* con semáforo: aceite en amarillo, cadena en rojo, resto en verde | `/home` | A y B | *"El semáforo te dice qué está bien, para qué ir juntando y qué ya toca."* |
| **Captura 3** | Pantalla de bloqueo: check-in *"¿Usaste tu moto como siempre esta semana? [Sí] [Menos] [Más]"* y alerta amarilla de aceite | `§5` notificaciones | A | *"Un toque por semana y un solo aviso cuando se acerca un servicio."* |
| **Captura 4** | Bitácora (servicios hechos por mí o en taller) y vista previa del resumen gratuito | `/history` + `/export` | A | *"Tu historial queda guardado y puedes compartirlo gratis."* |
| **Captura 5** | Detalle de aceite en amarillo con tarjeta *"Promoción pagada — Refaccionaria Ejemplo — 10% en cambio de aceite"* y código | `§4.D.11` (Fase 1, marcado *Próximamente*) | A y B | *"Más adelante: promociones de negocios cercanos cuando te toca servicio."* |
| **Captura 6** | Vista del comercio: campo para comprobar código, contador *"Clientes comprobados gratis: 4 de N"*, reporte del mes y cartel QR | `§4.D.12` (Fase 1) | B | *"Desde su celular comprueba cada cliente y ve cuántos llegaron por la app."* |

### 2.4 Instrumento A: Encuesta para Motociclistas de Xalapa (Segmento B2C)

**Título del formulario:** *Cuidado y mantenimiento de motocicletas en Xalapa*  
**Texto de presentación (`AUD-5`):** *Somos estudiantes de Ingeniería de Software de la Universidad Veracruzana. Estamos diseñando Itinera, una aplicación gratuita para celular que te avisa cuándo le toca servicio a tu moto (aceite, cadena o banda, frenos, bujía y llantas) sin que tengas que anotar nada todos los días. Con esta encuesta queremos saber cómo cuidas tu moto hoy y qué opinas de nuestro prototipo. Es anónima, con fines académicos, y toma de 7 a 8 minutos.*

**Sección 1 — Para empezar** *(filtro único: solo termina quien no maneja moto, `AUD-4`/`AUD-8`)*

- **A0.** ¿Manejas motocicleta actualmente?  
  ☐ Sí ☐ No *(→ agradecer y enviar formulario)*
- **A1.** ¿En qué zona usas tu moto la mayor parte del tiempo?  
  ☐ Xalapa ☐ Zona conurbada (Banderilla, Coatepec, Emiliano Zapata, Tlalnelhuayocan u otra cercana) ☐ Otra ciudad *(continúa; se separa en el análisis)*

**Sección 2 — Sobre ti** *(`AUD-6`)*

- **A2.** ¿Cuál es tu edad?  
  ☐ Menor de 18 años *(→ agradecer y enviar)* ☐ 18 a 24 ☐ 25 a 34 ☐ 35 a 44 ☐ 45 a 59 ☐ 60 o más
- **A3.** ¿Con qué género te identificas?  
  ☐ Mujer ☐ Hombre ☐ Otro ☐ Prefiero no decirlo
- **A4.** ¿Cuál es tu ingreso mensual personal aproximado? *(anclado al salario mínimo general 2026 de CONASAMI: `$9,582.47 MXN/mes`)*  
  ☐ Menos de $4,800 (menos de medio salario mínimo) ☐ $4,800 a $9,599 (hasta 1 salario mínimo) ☐ $9,600 a $19,199 (1 a 2 salarios mínimos) ☐ $19,200 a $28,799 (2 a 3 salarios mínimos) ☐ $28,800 o más (más de 3 salarios mínimos) ☐ Prefiero no decirlo
- **A5.** ¿Cuál es tu ocupación principal?  
  ☐ Estudiante ☐ Empleado(a) ☐ Repartidor(a) por aplicación ☐ Negocio propio o trabajo independiente ☐ Otro

**Sección 3 — Tu moto y cómo la usas** *(una variable por pregunta: `AUD-2`, `AUD-5`)*

- **A6.** ¿Qué tipo de moto usas principalmente?  
  ☐ Motoneta automática (scooter, sin cambios) ☐ De calle o de trabajo (con cambios) ☐ Doble propósito (calle y terracería) ☐ Deportiva o de alta cilindrada ☐ Otro
- **A7.** ¿De cuántos cc es tu moto?  
  ☐ Menos de 110 cc ☐ De 110 a 125 cc ☐ De 126 a 250 cc ☐ Más de 250 cc ☐ No sé
- **A8.** ¿De qué marca es? *(lista desplegable, opcional)*  
  ☐ Italika ☐ Honda ☐ Yamaha ☐ Bajaj ☐ Vento ☐ Suzuki ☐ Otra
- **A9.** ¿Para qué usas principalmente tu moto?  
  ☐ Moverme en mi vida diaria (mandados, visitas) ☐ Ir a la escuela o al trabajo ☐ Reparto o mensajería por aplicación ☐ Trabajo para un negocio (entregas, cobranza, visitas) ☐ Paseo o recreación ☐ Otro
- **A10.** ¿De quién es la moto que manejas? *(después del uso, `AUD-3`)*  
  ☐ Mía ☐ De mi propio negocio ☐ De la persona o empresa para la que trabajo ☐ De un familiar ☐ Otro
- **A11.** ¿Cómo usas tu moto en un día normal? *(idéntico a la tabla canónica de `DOMAIN.md §5.1`, `AUD-5` punto 12)*  
  ☐ Traslados cortos dentro de mi zona (1 o 2 viajes al día) ☐ Cruzo la ciudad de ida y vuelta (escuela o trabajo) ☐ Varios viajes en el día (trabajo, mandados o clientes) ☐ Reparto o uso continuo casi todo el día
- **A12.** ¿Cuántos días a la semana la usas?  
  ☐ 1 o 2 días ☐ 3 o 4 días ☐ 5 o 6 días ☐ Todos los días
- **A13.** ¿Cuántas motos manejas o te toca cuidar, contando la tuya?  
  ☐ 1 ☐ 2 ☐ 3 a 5 ☐ 6 o más

**Sección 4 — Cómo cuidas tu moto hoy** *(`AUD-6` puntos 13–14, `AUD-7` punto 16, `AUD-8`)*

- **A14.** ¿Cada cuánto le haces cada uno de estos servicios a tu moto? *(cuadrícula de opción múltiple, una respuesta por fila)*  
  Filas: Cambio de aceite · Cadena (ajuste o lubricación) o banda (revisión), según tu moto · Frenos o balatas · Bujía · Llantas (revisión o cambio)  
  Columnas: Cada mes o antes · Cada 2 o 3 meses · Cada 4 a 6 meses · Más de 6 meses · Solo cuando falla · No sé
- **A15.** ¿Hay algún otro servicio que le hagas seguido? *(respuesta corta, opcional; sustituye la fila "Otros" que las cuadrículas de Forms no permiten)*
- **A16.** ¿Quién suele hacer cada servicio? *(cuadrícula, mismas filas; sustituye al antiguo 7a)*  
  Columnas: Yo mismo(a) · Un taller · La agencia · Un familiar o conocido · No se le hace
- **A17.** Si tú haces algún servicio, ¿por qué lo haces tú? *(casillas; motivo derivado del hábito, sustituye al antiguo 7b)*  
  ☐ Me sale más barato ☐ Me gusta y sé hacerlo ☐ No confío en los talleres ☐ No tengo tiempo de llevarla ☐ No hago ningún servicio yo
- **A18.** Si llevas tu moto a taller o agencia, ¿por qué la llevas? *(casillas)*  
  ☐ No sé hacerlo ☐ No tengo herramienta o espacio ☐ Por la garantía ☐ Confío en mi mecánico ☐ No la llevo a taller
- **A19.** En promedio, ¿cuánto gastas al mes en el mantenimiento de tu moto?  
  ☐ Menos de $200 ☐ $200 a $499 ☐ $500 a $999 ☐ $1,000 a $1,999 ☐ $2,000 o más ☐ No sé
- **A20.** Hoy, ¿cómo sabes cuándo le toca servicio a tu moto?  
  ☐ No llevo control; la atiendo cuando falla o suena raro ☐ Me acuerdo de memoria (calculo por semanas o meses) ☐ Lo anoto en una libreta, ticket o etiqueta del taller ☐ Lo anoto en el celular o en un chat de WhatsApp ☐ Uso una aplicación ☐ El taller o la agencia me avisa ☐ Hay un encargado en la empresa o negocio que lo controla ☐ Otro: ____

**Sección 5 — Conoce Itinera** *(presentación del prototipo justo después de A20, `AUD-7` punto 17, `AUD-11` punto 27)*

> Texto: *Itinera es una aplicación gratuita para Android. La configuras en menos de 30 segundos eligiendo tu tipo de moto y cómo la usas en un día normal, sin saber de mecánica ni contar kilómetros. Con eso calcula cuándo le toca servicio a cada pieza y te lo muestra con un semáforo: verde si va bien, amarillo cuando conviene ir juntando para el servicio y rojo cuando ya toca.*  
> `[Insertar Captura 1 del prototipo Vue aquí]`  
> `[Insertar Captura 2 del prototipo Vue aquí]`

- **A21.** Con lo que viste, ¿usarías Itinera para tu moto?  
  ☐ Definitivamente sí ☐ Probablemente sí ☐ No estoy seguro(a) ☐ Probablemente no *(→ Sección 5b)* ☐ Definitivamente no *(→ Sección 5b)*

**Sección 5b — Solo si no la usarías**

- **A21b.** ¿Por qué no la usarías?  
  ☐ No me interesa llevar control ☐ Mi taller ya me avisa ☐ No me gusta instalar aplicaciones ☐ Me preocupa el espacio o los datos del celular ☐ Otro: ____ *(→ Sección 11)*

**Sección 6 — Avisos y semáforo** *(`AUD-9` puntos 20–22)*

> Texto: *Una vez por semana te llega un aviso en la pantalla de bloqueo: "¿Usaste tu moto como siempre esta semana?". Respondes Sí, Menos o Más con un toque, sin abrir la app. Cuando una pieza entra en amarillo te llega un solo aviso para que tengas tiempo de juntar el dinero, y otro si llega a rojo. No hay recordatorios diarios.*  
> `[Insertar Captura 3 del prototipo Vue aquí]`

- **A22.** ¿Te parece adecuado actualizar la app con ese toque semanal?  
  ☐ Sí ☐ No
- **A22b.** Si respondiste que no, ¿cómo lo preferirías? *(opcional)*  
  ☐ Abrir la app solo cuando yo quiera ☐ Que solo me avise cuando toque un servicio ☐ Anotar de vez en cuando los kilómetros del tablero ☐ Otro: ____
- **A23.** ¿Te parece útil el semáforo con estos avisos?  
  ☐ Sí *(→ Sección 6b)* ☐ No *(→ Sección 6c)*

**Sección 6b — Solo si el semáforo te parece útil**

- **A24.** ¿Con cuánta anticipación te gustaría recibir el aviso amarillo?  
  ☐ Una semana antes ☐ Dos semanas antes ☐ Un mes antes ☐ Solo cuando ya toque *(→ Sección 7)*

**Sección 6c — Solo si el semáforo no te parece útil**

- **A23b.** ¿De qué otra forma te gustaría que te avisara? *(respuesta corta)* *(→ Sección 7)*

**Sección 7 — Bitácora y resumen** *(`AUD-10` punto 23)*

> Texto: *Cada servicio queda guardado en tu bitácora: si lo hiciste tú o en taller, cuánto costó y una foto si quieres. Puedes compartir gratis un resumen con tu mecánico o con quien te compre la moto.*  
> `[Insertar Captura 4 del prototipo Vue aquí]`

- **A25.** ¿Te parece útil poder guardar y compartir este resumen?  
  ☐ Sí ☐ No
- **A25b.** ¿Qué más te gustaría que incluyera? *(respuesta corta, opcional)*
- **A26.** ¿Qué le cambiarías o agregarías a Itinera? *(párrafo, opcional; `AUD-9` punto 20)*

**Sección 8 — Tu taller y promociones** *(`AUD-3` punto 7, `AUD-11` punto 26)*

- **A27.** ¿Te gustaría que tu taller de confianza pudiera recordarte por medio de la app cuando te toque servicio?  
  ☐ Sí ☐ No ☐ No tengo un taller fijo

> Texto: *Más adelante, cuando te toque un servicio, la app podría mostrarte una promoción pagada de una refaccionaria o taller cerca de ti. Muestras un código en el mostrador y obtienes el descuento. Itinera no califica ni certifica a los negocios.*  
> `[Insertar Captura 5 del prototipo Vue aquí]`

- **A28.** ¿Usarías una promoción así cuando te toque servicio?  
  ☐ Sí ☐ Depende del descuento o del lugar ☐ No

**Sección 9 — Pago** *(flujo condicional, `AUD-11` punto 25; sin la palabra "núcleo básico")*

- **A29.** ¿Estarías dispuesto(a) a pagar por usar una app como Itinera?  
  ☐ Sí *(→ Sección 9b)* ☐ Depende del precio *(→ Sección 9b)* ☐ No *(→ Sección 9c)*

**Sección 9b — Solo si pagarías**

- **A30.** ¿Cuánto pagarías al mes como máximo?  
  ☐ Menos de $20 ☐ $20 a $34 ☐ $35 a $49 ☐ $50 a $74 ☐ $75 o más
- **A30b.** ¿Cómo preferirías pagar?  
  ☐ Cada mes ☐ Una vez al año ☐ Un solo pago *(→ Sección 9d)*

**Sección 9c — Solo si no pagarías**

- **A31a.** ¿La usarías si fuera gratis?  
  ☐ Sí ☐ No
- **A31b.** ¿Pagarías solo por funciones extra, como llevar varias motos o guardar tu información en la nube?  
  ☐ Sí ☐ No *(→ Sección 9d)*

**Sección 9d — Para todos** *(las ramas se reúnen: valida el modelo real gratuito con promociones)*

- **A32.** ¿Aceptarías ver promociones de negocios de tu zona a cambio de usar la app gratis?  
  ☐ Sí ☐ No

**Sección 10 — Cómo conocer la app y recibir ayuda** *(`AUD-11` puntos 24a y 26)*

- **A33.** ¿Cómo te enteras normalmente de aplicaciones nuevas? *(casillas)*  
  ☐ Me la recomiendan conocidos o compañeros ☐ Grupos de motociclistas en Facebook o WhatsApp ☐ Redes sociales o videos cortos ☐ Buscando en la tienda de aplicaciones ☐ Un cartel o código QR en el taller o refaccionaria ☐ Otro
- **A34.** Si tuvieras una duda o problema con la app, ¿por dónde te gustaría recibir ayuda?  
  ☐ Ayuda y preguntas frecuentes dentro de la app ☐ WhatsApp ☐ Videos cortos de cómo usarla ☐ Correo electrónico ☐ Redes sociales

**Sección 11 — Tu celular** *(al final y en lenguaje cotidiano, `AUD-1`, `AUD-4`, `AUD-11` punto 24b)*

- **A35.** ¿Qué celular usas?  
  ☐ Android (Samsung, Motorola, Xiaomi, Oppo u otro) ☐ Huawei ☐ iPhone ☐ No tengo celular inteligente
- **A36.** ¿Desde dónde descargas tus aplicaciones?  
  ☐ Google Play ☐ App Store (iPhone) ☐ Tienda de la marca del celular (AppGallery, Galaxy Store u otra) ☐ No descargo aplicaciones
- **A37.** Si quieres probar Itinera gratis antes que nadie, déjanos tu WhatsApp o correo. *(opcional; solo se usará para invitar al piloto, con aviso de privacidad)*

#### Mapa de ramas en Google Forms (Instrumento A)

Google Forms solo ramifica desde preguntas de **opción múltiple o lista desplegable** ("Ir a la sección según la respuesta"); nunca desde cuadrículas ni casillas. Por eso cada pregunta derivada vive en su propia sección:

| Pregunta | Respuesta | Destino |
| :--- | :--- | :--- |
| `A0` | No | Enviar formulario |
| `A2` | Menor de 18 años | Enviar formulario |
| `A21` | Probablemente no / Definitivamente no | Sección 5b (`A21b`) $\to$ Sección 11 |
| `A21` | Resto | Sección 6 |
| `A23` | Sí / No | Sección 6b (`A24`) / Sección 6c (`A23b`) $\to$ Sección 7 |
| `A29` | Sí o Depende / No | Sección 9b (`A30`, `A30b`) / Sección 9c (`A31a`, `A31b`) $\to$ Sección 9d |

### 2.5 Instrumento B: Formulario para Talleres y Refaccionarias (Segmento B2B — Fase 1)

**Aplicación:** El encuestador lo llena en el mostrador con el dueño o encargado (Google Forms en celular), en corredores de Xalapa (Av. Lázaro Cárdenas, Blvd. Adolfo Ruiz Cortines, Av. 20 de Noviembre, zona Revolución/Rafael Lucio y Centro). Duración: 8–10 minutos.  
**Texto de presentación:** *Somos estudiantes de Ingeniería de Software de la Universidad Veracruzana. Diseñamos Itinera, una aplicación gratuita que avisa a los motociclistas cuándo le toca servicio a su moto. Queremos conocer cómo trabaja su negocio y qué opina de una forma de atraer clientes con la app. Sus respuestas son confidenciales y con fines académicos.*

**Sección 1 — Su negocio**

- **B1.** ¿Qué tipo de negocio es?  
  ☐ Taller de motos ☐ Refaccionaria ☐ Taller y refaccionaria
- **B2.** ¿Qué puesto tiene usted?  
  ☐ Dueño(a) ☐ Encargado(a) ☐ Empleado(a)
- **B3.** ¿Cuántas personas trabajan en el negocio?  
  ☐ 1 ☐ 2 o 3 ☐ 4 a 6 ☐ 7 o más
- **B4.** ¿En qué colonia o zona está el negocio? *(respuesta corta)*
- **B5.** En el mostrador, ¿usan celular o computadora para el negocio? *(define cómo se comprueban los canjes, `DOMAIN.md` `CouponRedemption`)*  
  ☐ Celular ☐ Computadora ☐ Ambos ☐ Ninguno

**Sección 2 — Clientes y servicios** *(`AUD-12/13` puntos 28–30)*

- **B6.** Aproximadamente, ¿cuántos clientes con moto atienden al mes?  
  ☐ Menos de 50 ☐ 50 a 100 ☐ 101 a 200 ☐ 201 a 400 ☐ Más de 400
- **B7.** ¿Sabe más o menos cuántos de sus clientes son repartidores y cuántos particulares?  
  ☐ Sí *(→ Sección 2b)* ☐ No *(→ Sección 2c)*
- **B8.** *(Sección 2b)* ¿Cómo se reparten?  
  ☐ La mayoría son repartidores ☐ Mitad y mitad ☐ La mayoría son particulares
- **B9.** *(Sección 2c, para todos)* ¿Cuáles son los tres servicios que más le piden en motos? *(casillas, máximo 3)*  
  ☐ Cambio de aceite ☐ Cadena o kit de arrastre ☐ Banda de motoneta ☐ Frenos o balatas ☐ Afinación o bujía ☐ Llantas ☐ Parte eléctrica ☐ Reparación de motor ☐ Otro
- **B10.** ¿Cuánto cobra normalmente por un cambio de aceite con mano de obra en una moto de trabajo? *(opcional)*  
  ☐ Menos de $150 ☐ $150 a $249 ☐ $250 a $349 ☐ $350 a $499 ☐ $500 o más
- **B11.** ¿En qué parte del mes llegan **más** clientes?  
  ☐ Primera semana ☐ Alrededor de la quincena ☐ Fin de mes ☐ Es igual todo el mes
- **B12.** ¿En qué parte del mes llegan **menos** clientes?  
  ☐ Primera semana ☐ Alrededor de la quincena ☐ Fin de mes ☐ Es igual todo el mes
- **B13.** ¿Qué meses del año son más flojos? *(casillas)*  
  ☐ Enero ☐ Febrero ☐ Marzo ☐ Abril ☐ Mayo ☐ Junio ☐ Julio ☐ Agosto ☐ Septiembre ☐ Octubre ☐ Noviembre ☐ Diciembre ☐ Es igual todo el año

**Sección 3 — Recordatorios a sus clientes** *(`AUD-12/13` punto 32)*

- **B14.** ¿Tiene alguna forma de recordar a sus clientes cuándo les toca servicio?  
  ☐ Sí *(→ Sección 3b)* ☐ No *(→ Sección 3c)*
- **B15.** *(Sección 3b)* ¿Cuál?  
  ☐ Etiqueta o sticker en la moto ☐ Mensaje de WhatsApp o llamada ☐ Libreta o registro ☐ Un programa o sistema ☐ Otro
- **B16.** *(Sección 3b)* Con ese recordatorio, ¿sus clientes regresan a tiempo?  
  ☐ Casi siempre ☐ A veces ☐ Casi nunca
- **B17.** *(Sección 3c, para todos)* Normalmente, ¿cuánto tiempo de más dejan pasar sus clientes antes de regresar por su servicio?  
  ☐ Llegan a tiempo ☐ Una o dos semanas de más ☐ Un mes o más ☐ Hasta que algo falla

**Sección 4 — Conozca Itinera** *(`AUD-12/13` punto 33)*

> Texto: *Itinera es gratis para el motociclista. Cuando a su moto le toca aceite, frenos o cadena, la app le avisa. Cuando la app tenga suficientes usuarios en Xalapa, en ese momento podrá mostrarle una promoción pagada de su negocio. El cliente enseña un código en su mostrador, usted lo comprueba desde su celular y a fin de mes ve cuántos clientes llegaron por la app. Itinera no califica ni certifica talleres.*  
> `[Insertar Captura 2 del prototipo Vue aquí]`  
> `[Insertar Captura 5 del prototipo Vue aquí]`  
> `[Insertar Captura 6 del prototipo Vue aquí]`

- **B18.** ¿Le parece adecuada esta forma de atraer clientes?  
  ☐ Sí ☐ No — *Comentarios (respuesta corta, opcional)*

**Sección 5 — Forma de pago** *(`AUD-12/13` puntos 31 y 34; sin "pauta", "redimido", "ticket promedio" ni "MAU")*

- **B19.** ¿Estaría dispuesto(a) a invertir en promocionar su negocio dentro de Itinera para atraer clientes nuevos?  
  ☐ Sí *(→ Sección 5c)* ☐ Tal vez *(→ Sección 5c)* ☐ No *(→ Sección 5b)*
- **B20.** *(Sección 5b)* ¿Por qué no? *(respuesta corta)* *(→ Sección 6)*

> *(Sección 5c)* Texto: *Los primeros clientes que lleguen a su negocio con código serían gratis, como prueba. Después usted elegiría una de dos formas de pago: una cuota fija al mes, o pagar solo por cada cliente que llegue con su código y compre.*

- **B21.** ¿Cuál le conviene más?  
  ☐ Cuota fija al mes *(→ Sección 5d)* ☐ Pagar por cada cliente que llegue y compre *(→ Sección 5e)* ☐ Ninguna *(→ Sección 5f)* ☐ No sé *(→ Sección 5f)*
- **B22.** *(Sección 5d)* ¿Cuánto pagaría al mes como máximo?  
  ☐ Menos de $150 ☐ $150 a $299 ☐ $300 a $499 ☐ $500 a $799 ☐ $800 o más *(→ Sección 5f)*
- **B23.** *(Sección 5e)* ¿Cuánto pagaría por cada cliente que llegue con su código y compre?  
  ☐ Menos de $10 ☐ $10 a $19 ☐ $20 a $39 ☐ $40 a $59 ☐ $60 o más *(→ Sección 5f)*
- **B24.** *(Sección 5f)* ¿Qué descuento o beneficio podría ofrecer a esos clientes sin perder?  
  ☐ 5% ☐ 10% ☐ 15% o más ☐ Revisión gratis ☐ Otro
- **B25.** ¿Cuántos clientes gratis necesitaría ver llegar para decidir si continúa? *(calibra la prueba por volumen `N`)*  
  ☐ 5 ☐ 10 ☐ 20 ☐ Más de 20

**Sección 6 — Dar a conocer la app** *(`AUD-12/13` punto 35)*

- **B26.** ¿Le parece adecuado poner un cartel con código QR o compartir un enlace para que sus clientes descarguen la app gratis?  
  ☐ Sí ☐ No
- **B27.** ¿Por qué otros medios la daría a conocer? *(casillas)*  
  ☐ WhatsApp de sus clientes ☐ Redes sociales del negocio ☐ En la nota o ticket ☐ Sticker en la moto del cliente ☐ De palabra ☐ Otro

**Sección 7 — Prueba de un mes** *(`AUD-12/13` punto 36)*

- **B28.** De estos beneficios, elija los tres más importantes para probar Itinera un mes. *(casillas con validación "Seleccionar exactamente 3")*  
  ☐ No instalar nada en caja ☐ Comprobante de cada cliente que llegó por la app ☐ Reporte mensual de clientes ☐ Promoción solo para motociclistas de su zona ☐ Poder cancelar cuando quiera ☐ Recordatorio a sus propios clientes de su próximo servicio
- **B29.** ¿Qué otra función le gustaría? *(respuesta corta)*
- **B30.** ¿Pagaría un poco más por esa función?  
  ☐ Sí ☐ No ☐ Depende

**Sección 8 — Cierre**

- **B31.** Si le interesa participar en la prueba piloto, ¿por qué medio prefiere que lo contactemos?  
  ☐ WhatsApp ☐ Llamada ☐ Visita ☐ Correo ☐ No me interesa participar

---

## 3. Universo de Estudio y Cálculo de Muestreo (`TASK 3`)

### 3.1 Embudo de Demanda (Xalapa, Veracruz)

El embudo ya **no supone proporciones**: cada filtro se multiplica por una proporción medida con su intervalo de confianza (Wilson, 95%) y se presenta en tres escenarios de universo.

| Nivel del Embudo | Definición Operativa | Cálculo | Fuente del Factor |
| :--- | :--- | :--- | :--- |
| **1. Mercado Potencial** | Motos circulantes en Xalapa | Pesimista `23,159` (censal 2021) · Base `40,000` (Movilidad Urbana 2026) | INEGI/CEIEG; Ayuntamiento |
| **2. Mercado en Rango** | Motos `110–250cc` (con *No sé* asignado por tipo `A6` y marca `A8`) | Nivel 1 × `p(A7 ∈ 110–250)` | Instrumento A |
| **3. Mercado Disponible** | En rango con Android y Google Play | Nivel 2 × `p(A35 = Android ∧ A36 = Google Play)` | Instrumento A (sustituye el `>85%` supuesto) |
| **4. Mercado Cualificado** | Disponibles con intención calibrada de uso | Nivel 3 × intención ajustada de `A21` (factores de Jamieson y Bass, 1989; Morwitz, Steckel y Gupta, 2007) | Instrumento A |
| **5. Mercado Meta B2C** | Cualificados en cohorte prioritaria (rutinas R3–R4 de `A11` y propietarios `A10 = Mía` o `Mi propio negocio`) más secundaria (R1–R2) | Nivel 4 desagregado por `A10`, `A11` | Instrumento A |
| **Segmentos aparte** | Operadores de unidad ajena (`A10 = De la persona o empresa para la que trabajo`); prospectos de flotilla (`A13 ≥ 2` y `A10` comercial o `A20 = encargado`); `<110cc` y `>250cc` | Se reportan por separado para dimensionar `PlusSubscription` y `MicroFleetAccount` | `DOMAIN.md §3.2` |
| **Mercado Meta B2B (Fase 1)** | Comercios dispuestos (`B19 = Sí/Tal vez`) | `p(B19)` × (`~35` talleres `811492` + `[PENDIENTE DE CONTEO EXACTO EN DENUE SCIAN 468311]`) | Instrumento B + DENUE |
| **Mercado Piloto** | Cohorte controlada de rutina intensiva que deja contacto en `A37` | Conteo directo | Instrumento A |

### 3.2 Cálculo Estadístico de Muestra para Segmento A (Universo Finito)

$$n = \frac{z^2 \cdot N \cdot p \cdot q}{e^2(N - 1) + z^2 \cdot p \cdot q}$$

Con $N = 40{,}000$, $z = 1.96$ (95%), $e = 0.05$ y $p = q = 0.50$: numerador $= 3.8416 \times 40{,}000 \times 0.25 = 38{,}416$; denominador $= 0.0025 \times 39{,}999 + 0.9604 = 100.9579$; $n = 380.52 \approx$ **381 encuestas válidas**.

| Escenario | $N$ | $e$ | $n$ exacto | Muestra |
| :--- | :---: | :---: | :---: | :---: |
| Base: parque circulante 2026 | `40,000` | `±5%` | `380.52` | **`381`** |
| Cota censal 2021 | `23,159` | `±5%` | `377.91` | `378` |
| Intermedio por restricción semestral | `40,000` | `±7%` | `195.05` | `196` |
| Exploratorio | `40,000` | `±10%` | `95.81` | `96` |

**Estrategia de campo:** muestreo no probabilístico por cuotas en puntos de afluencia (Av. Lázaro Cárdenas, Circuito Presidentes, Zona Universitaria, Av. 20 de Noviembre y bases de repartidores) más difusión del enlace con QR. Cuotas: al menos `50%` de rutinas R3–R4 (`A11`) y presencia suficiente de mujeres para el cruce de género (se procura que cada celda del cruce tenga frecuencia esperada `≥ 5`). Al no ser una muestra probabilística, los intervalos se reportan como indicativos y se declara el sesgo de autoselección de la difusión en línea.

### 3.3 Muestreo para Segmento B (B2B)

Se intenta **censar** los `~35` talleres `SCIAN 811492` y las refaccionarias de moto `[PENDIENTE DE CONTEO EXACTO EN DENUE SCIAN 468311]`, priorizando dueños o encargados con poder de decisión. Con pocas decenas de respuestas, los resultados se presentan como frecuencias y rangos (medianas de rango para precios), sin inferencia estadística, y se complementan con los comentarios abiertos (`B18`, `B20`, `B29`).

---

## 4. Análisis de Resultados (`TASK 4 — Plantilla de Vaciado`)

> **Estado de recolección en campo:** los Instrumentos A y B **no han sido aplicados**. Las capturas 1–6 del prototipo están pendientes de producción. No se reportan resultados ni estimaciones simuladas.

### 4.1 Variables por Eje de Análisis

| Eje | Reactivos | Indicador a tabular |
| :--- | :--- | :--- |
| Perfil | `A2`–`A5` | Distribución por edad, género, ingreso, ocupación |
| Elegibilidad y rango | `A6`–`A8`, `A35`–`A36` | `%` por cilindrada (incl. `<110` vs `110–125`), `%` CVT vs cadena, `%` Android con Google Play |
| Uso y propiedad | `A9`–`A13` | `%` por uso, propiedad, rutina × días (distribución empírica de `Tasa_dia`), número de motos |
| Mantenimiento actual | `A14`–`A20` | Frecuencia y responsable por servicio, motivos DIY/taller, gasto mensual, forma de control |
| Validación del prototipo | `A21`–`A28` | Intención (5 puntos), adecuación de check-in, semáforo y anticipación, resumen, vínculo con taller, aceptación de promociones |
| Precio B2C | `A29`–`A32` | `%` que pagaría, monto y periodicidad; `%` gratis, extras, promociones |
| Canales y soporte | `A33`–`A34` | Mezcla de canales de descubrimiento; canal de ayuda preferido |
| Oferta B2B | `B1`–`B17` | Volumen, servicios top, cobro de aceite, estacionalidad, recordatorios y retraso de clientes |
| Monetización B2B | `B18`–`B31` | Adecuación, disposición, esquema, montos, descuento, `N` de prueba, difusión, beneficios prioritarios |

### 4.2 Matriz de Cruces e Inferencias Estadísticas (`AUD-3` punto 7, `AUD-6` punto 15)

Métodos: tablas de contingencia con chi-cuadrada de independencia y V de Cramér (agrupando categorías cuando la frecuencia esperada sea menor que 5), regresión logística binaria sobre la intención de uso (`A21` en las dos categorías superiores) e intervalos de Wilson para proporciones. Cada cruce responde una pregunta de decisión, no una correlación decorativa.

| Cruce | Pregunta que responde | Decisión que habilita |
| :--- | :--- | :--- |
| `A4` ingreso × `A21` intención × `A29`/`A30` pago | ¿La disposición a pagar depende del nivel económico? | Precio de Plus o descarte del cobro B2C |
| `A16` taller/DIY × `A4` × `A27` vínculo con taller | ¿Qué proporción de clientes de taller quiere el vínculo? | Argumento comercial frente a talleres |
| `A3` género × `A16` × `A17`/`A18` motivos | ¿Las mujeres acuden más a taller y desconfían más? | Valida o descarta el factor 8 de `SPECIFICATION.md §2.3` |
| `A9` uso × `A10` propiedad × `A11`/`A12` rutina × `A21` | ¿Los propietarios de rutina intensiva tienen más intención? | Cohorte piloto de `SPECIFICATION.md §3.3` |
| `A20` control actual × `A21` | ¿Quien no lleva control quiere la app más que quien usa libreta? | Encaje problema–solución |
| `A6`/`A7` tipo y cilindrada × `A21` | ¿Interés similar en `<110` y `>250`? | Frontera definitiva del rango MVP |
| `A10` + `A13` + `A20` × `A21` | ¿Hay demanda de flotilla y de 2+ motos? | Dimensiona `PlusSubscription` y `MicroFleetAccount` |
| `A14` frecuencia × `A11`/`A12` rutina | ¿Los intervalos reales coinciden con las plantillas? | Calibración de `DOMAIN.md §5.5` |
| `A28`/`A32` (B2C) frente a `B19`/`B21` (B2B) | ¿Coinciden los dos lados del mercado? | Viabilidad de la plataforma de dos lados |
| `A33` canal × `A2` edad | ¿Qué canal funciona para cada edad? | Costo de adquisición por canal |
| `A35`/`A36` celular × `A4` ingreso | ¿Cuál es la proporción real de Android con Google Play? | Sustituye el supuesto `>85%` |
| `A34` soporte × `A2` edad | ¿WhatsApp domina el soporte? | Activa o no la política de `SPECIFICATION.md §6.2` |
| `B1` giro × `B21` esquema × `B22`/`B23` monto (descriptivo) | ¿Talleres y refaccionarias prefieren esquemas distintos? | Oferta comercial por tipo de comercio |

---

## 5. Conclusiones y Proyección hacia Estudios Posteriores (`TASK 5 — Plantilla de Cierre`)

### 5.1 Proyección hacia el Estudio Técnico (`C8`)

El reactivo de odómetro roto se eliminó (`AUD-6` punto 13) y ninguna decisión técnica depende de él: el modo relativo con respaldo por tiempo calendario se construye de todas formas. Tampoco se pregunta la versión de Android (el usuario no la conoce); el nivel mínimo de API se fijará con las estadísticas de distribución de Google Play Console y los requisitos vigentes de la tienda. La encuesta sí entrega al Estudio Técnico tres insumos: la proporción de motonetas CVT frente a motos de cadena (`A6`), que prioriza las plantillas y guías de inspección; la distribución empírica de rutina × días (`A11`–`A12`), que fija los valores iniciales de `Tasa_dia` de `DOMAIN.md §5.1`; y la frecuencia real de servicios (`A14`), que contrasta los intervalos de `DOMAIN.md §5.5`. El reactivo `B5` define si la validación de canjes se hace por enlace web, WhatsApp u hoja conciliada.

### 5.2 Métricas Obligatorias para el Estudio Económico-Financiero

| Métrica | Fuente | Uso financiero |
| :--- | :--- | :--- |
| Proporción en `110–250cc` y en `<110cc` | `A7` (+ `A6`, `A8` para *No sé*) | Mercado en rango por escenario de universo |
| Proporción Android con Google Play | `A35`, `A36` | Mercado disponible |
| Intención calibrada | `A21` con factores de la literatura | Conversión al mercado cualificado |
| Distribución de rutina y días | `A11`, `A12` | Km/mes por usuario y ritmo de ventanas amarillas |
| Eventos de servicio por usuario al mes, por responsable | `A14` × `A16` | Base de transacciones B2B (el que lo hace en casa también compra en refaccionaria) |
| Gasto mensual y cobro de aceite | `A19`, `B10` | Valor del mercado y tamaño razonable del descuento |
| Aceptación de promociones e intención de canje | `A28`, `A32` | Tasa de canje sobre usuarios en ventana amarilla |
| Disposición a pagar B2C y número de motos | `A29`, `A30`, `A30b`, `A31b`, `A13` | Ingreso de `PlusSubscription` (`2+` motos) |
| Comercios dispuestos × esquema × monto | `B19`, `B21`, `B22`, `B23` sobre el marco DENUE | Ingreso B2B por escenario |
| Descuento tolerable y `N` de prueba | `B24`, `B25` | Margen del comercio y meses sin ingreso B2B |
| Estacionalidad | `B11`–`B13` | Flujo de caja mensual B2B |
| Mezcla de canales | `A33`, `B26`, `B27` | Costo de adquisición B2C por canal |
| Tasa de cierre B2B | `B19` | Visitas por comercio cerrado × horas de prospección = costo de adquisición B2B |
| Canal de soporte | `A34`, `B31` | Horas de soporte si gana WhatsApp |

### 5.3 Sensibilidad de Tiempo para Alcanzar la Compuerta de Fase 1

El Estudio Económico-Financiero debe calcular, por escenario, cuántos meses tarda Xalapa en sostener `1,000–2,000` MAU:

$$MAU_{alcanzable} = N_{universo} \times p_{rango} \times p_{Android+Play} \times p_{intención\ calibrada} \times alcance \times retención$$

Los tres primeros factores salen del Instrumento A; el alcance (proporción del mercado expuesta a los canales de `A33`) y la retención a 30 y 90 días no se pueden medir con una encuesta y se tomarán del piloto (`A37`) y de referencias publicadas, declarándolos como supuestos. Si el escenario base no alcanza la compuerta en un horizonte razonable, el estudio debe mostrar qué palanca la mueve (adquisición en mostrador vía QR, ampliar a la zona conurbada o a una segunda ciudad) en lugar de dar la Fase 1 por hecha.

### 5.4 Adecuaciones al Business Model Canvas y al Estudio Organizacional

La evidencia determinará qué componente impulsa la retención (check-in semanal, semáforo o resumen), el peso real entre Google Play, recomendación y QR en mostrador, si los comercios prefieren cuota fija o pago por venta comprobada, y si la preferencia por WhatsApp (`A34`) obliga a presupuestar horas de soporte asíncrono. En lo organizacional se estimarán las horas semanales de prospección B2B a partir de la tasa de cierre (`B19`) y del número de clientes de prueba que exigen los comercios (`B25`).

---

## 6. Trazabilidad de la Retroalimentación Docente

| Punto(s) del log | Corrección aplicada en los instrumentos |
| :--- | :--- |
| 1, 9, 24 | Sistema operativo y tienda de descarga al final (`A35`–`A36`), en lenguaje cotidiano; descubrimiento separado (`A33`) |
| 2 | Secuencia por bloques: filtro → perfil → moto y uso → mantenimiento → prototipo → validación → taller y promociones → pago → canales → celular |
| 3, 11 | Una variable por pregunta: uso (`A9`), propiedad separada en 5 opciones (`A10`), rutina (`A11`), días (`A12`) |
| 4, 8 | Solo termina quien no maneja moto (`A0`); cilindrada en 5 opciones sin descarte (`A7`) |
| 5, 17, 20, 27, 33 | Presentación explícita en encabezados y prototipo con capturas antes de validar (Sección 5 de A, Sección 4 de B) |
| 6 | Bloque sociodemográfico al inicio (`A2`–`A5`) |
| 7, 15 | Matriz de cruces e inferencias (`§4.2`) |
| 10, 14, 18, 19 | Tablas de frecuencia y responsable por servicio (`A14`, `A16`), motivos derivados (`A17`–`A18`); fallas pasadas y 7a/7b eliminados |
| 12 | Rutina cotidiana en lugar de km/día (`A11`–`A12`), convertida por el equipo con `DOMAIN.md §5.1` |
| 13 | Reactivo de odómetro eliminado |
| 16 | Opciones "No llevo control", "Encargado en la empresa" y "Otro" en `A20` |
| 21 | Check-in sin gasolina ni kilómetros (`A22`) |
| 22 | Semáforo explicado primero (`A23`) y anticipación como derivada (`A24`) |
| 23 | Resumen presentado con captura y validado Sí/No (`A25`) |
| 25 | Pago condicional en lenguaje cotidiano (`A29`–`A32`) |
| 26 | Vínculo con taller (`A27`) y canal de ayuda (`A34`) |
| 28 | Volumen (`B6`) separado de proporción repartidores/particulares (`B7`–`B8`) |
| 29 | Servicios más pedidos (`B9`) y cobro de aceite por rangos opcional (`B10`) |
| 30 | Temporalidad mensual y anual en preguntas separadas (`B11`–`B13`) |
| 31 | Gasto en promoción eliminado; disposición a invertir tras el prototipo (`B19`) |
| 32 | Secuencia de recordatorios sin porcentajes (`B14`–`B17`) |
| 34 | Esquemas explicados en lenguaje cotidiano con montos separados (`B21`–`B23`) |
| 35 | QR/enlace y otros medios (`B26`–`B27`) |
| 36 | Tres beneficios existentes, función extra y pago (`B28`–`B30`) |

---

## 7. Referencias y Fuentes Consultadas

1. INEGI (2025). *Vehículos de motor registrados en circulación (VMRC) — 2023, 2024 y 2025*. https://www.inegi.org.mx/programas/vehiculosmotor/
2. INEGI (2026). *DENUE, Edición 05/2026 — SCIAN 811492 y 468311, Municipio 30087 Xalapa*. https://www.inegi.org.mx/app/mapa/denue/default.aspx
3. CEIEG / SEFIPLAN Veracruz (2022–2026). *Cuadernillos Municipales — Xalapa*. https://www.ceieg.veracruz.gob.mx/cuadernillos-municipales/
4. Departamento de Movilidad Urbana del Ayuntamiento de Xalapa y Physis Ciclovida (2026). *Estimación del parque circulante de motocicletas y siniestralidad vial enero–octubre 2026* (prensa estatal).
5. StatCounter Global Stats (2024–2026). *Mobile Operating System Market Share Mexico*. https://gs.statcounter.com/os-market-share/mobile/mexico
6. Drivvo — CTN Cardoso (2026). https://www.drivvo.com/es-MX/
7. Fuelio — Sygic (2026). https://fuel.io/
8. MotoLog / MotorApp (2026). https://www.motorapp.net/
9. Jamieson, L. F. y Bass, F. M. (1989). Adjusting stated intention measures to predict trial purchase of new products. *Journal of Marketing Research*, 26(3), 336–345.
10. Morwitz, V. G., Steckel, J. H. y Gupta, A. (2007). When do purchase intentions predict sales? *International Journal of Forecasting*, 23(3), 347–364.
11. Sánchez Morales, A. de J. (2022). *Estudio de Mercado* [Material de cátedra]. Universidad Veracruzana.
12. García Morales, D. (2022). *Estudio de mercado* [Material de cátedra]. Universidad Veracruzana.
