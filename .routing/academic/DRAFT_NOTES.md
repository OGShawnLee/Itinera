# Notas de Borrador y Retroalimentación — Proyecto Itinera

> **Propósito:** Registro histórico del borrador inicial de la actividad académica y bitácora de retroalimentación recibida por la profesora para su refinamiento progresivo.  
> **Estado:** `[HISTÓRICO / EN PURGA]`  
> **Asignatura:** Economía para Toma de Decisiones — Licenciatura en Ingeniería de Software.  
> **Ubicación y fecha:** Xalapa, Veracruz — Octubre/Noviembre 2026.  
> **Equipo de trabajo:**
> - Gerardo Abraham Barrón Gómez
> - Edgar Vázquez García
> - Alberto Villalba Figueroa

---

## Bitácora de Retroalimentación de la Profesora
1. **Sobre el Planteamiento del Problema:**
   - *Comentario:* *"El problema no es carencia de herramienta. Es un tener un sistema eficiente."*
   - *Impacto:* Redefinir el problema de la ausencia de una app hacia la ineficiencia sistémica, la alta fricción de los métodos tradicionales y la reactividad del mantenimiento.
2. **Sobre los Factores Socioculturales y Económicos:**
   - *Comentario recibido en lugar de la respuesta de tecnología/smartphones:*
     - "No hay costumbre de anotar fechas." (Hábito/Cultura)
     - "No hay recursos para agendar un mantenimiento en tiempo y forma." (Economía/Liquidez)
     - "Exceso de confianza del dueño que piensa que todo 'está bajo control'." (Sesgo cognitivo/Psicológico)
     - "El usuario no desea estar obligado a ir a un taller y gastar tiempo/dinero." (Resistencia/Costo de oportunidad)
     - "Desconfianza del taller." (Factor social/Opacidad)
   - *Impacto:* Incorporar estos factores humanos como las causas fundamentales que explican el abandono del mantenimiento preventivo.
3. **Sobre ¿Qué sabemos sobre el TPNSc?:**
   - *Comentario:* *"Muchos usuarios desconocen qué componentes se desgastan, el ratio en el que lo hacen y cada cuánto deben sustituirse o darles mantenimiento."*
   - *Impacto:* Reconocer la asimetría y el analfabetismo mecánico del usuario. La solución no puede ser una bitácora en blanco; debe ser un sistema experto guiado con catálogo predefinido de piezas, ratios de desgaste e intervalos estándar.
4. **Sobre ¿Qué NO sabemos sobre el TPNSc?:**
   - *Comentario:*
     1. *"El alcance mínimo más viable y que genere beneficio de modo que tengamos la posibilidad de expandir alcance."*
     2. *"¿Cómo funcionan agencias de motos? ¿Qué vehículos contemplar? ¿Hasta dónde abarcamos?"*
     3. *"No centrarse en la solución sino en el problema en sí. Se debe entender lo que los usuarios necesitan y el dominio del problema. ¿Las agencias realizan recordatorios? ¿Se involucran en el mantenimiento de los vehículos de sus clientes?"*
   - *Impacto:* Delimitar estrictamente el MVP a motocicletas utilitarias/urbanas de 125cc-250cc (Italika, Bajaj, Honda, etc.). Modelar la desconexión real de las agencias (que abandonan el seguimiento post-garantía y no realizan recordatorios proactivos) y centrarse en la raíz del problema antes de idear interfaces.
5. **Sobre Disposición a Capturar Datos y Tolerancia a Notificaciones:**
   - *Comentario / Preguntas:*
     - *"¿Los usuarios están dispuestos a introducir los datos relevantes y tener un seguimiento?"*
     - *"¿Están dispuestos a recibir muchas notificaciones?"*
   - *Impacto:* Asumir el principio de fatiga de usuario: los conductores **no** toleran capturas manuales diarias ni bombardeo de notificaciones invasivas. Requiere:
     1. Modelo de proyección de odómetro por hábitos de uso semanal y confirmaciones rápidas en un toque (*One-tap Check-in*).
     2. Política de notificaciones de alto valor por umbral (anticipación para planificar gastos y alerta crítica por seguridad), eliminando recordatorios triviales o spam.
6. **Sobre ¿Por qué vale la pena solucionar este TPNSc?:**
   - *Comentario / Preguntas:*
     - *"Agencia tiene más trabajo, clientes seguros. Se evitan accidentes y seguros no tienen que pagar. ¿Es relevante contemplar estos afectados secundarios?"*
     - *"Saber cuándo reservar tiempo, ahorrar dinero para cuando se necesite mantenimiento y evitar el problema secundario de coche descompuesto, llegar tarde o faltar a actividades como escuela o trabajo."*
   - *Impacto:* Separar la justificación en dos niveles claros:
     1. **Impacto Primario (Conductor):** Previsibilidad de tiempo y dinero; eliminación del efecto dominó de la avería (pérdida de jornadas escolares/laborales, sanciones o merma de ingresos de reparto).
     2. **Impacto Secundario / Externalidades Positivas:** Menor siniestralidad vial e indemnizaciones para aseguradoras, mayor demanda programada y recurrente para talleres mecánicos, y mayor disponibilidad operativa para plataformas y empleadores.
7. **Sobre Preguntas Guía para Descubrir Soluciones (Empatía 2):**
   - *Corrección de la profesora:* Reemplazar las preguntas autorreferenciales del equipo por auténticas preguntas de descubrimiento del ecosistema:
     1. *"¿Cómo ayudar a las personas a llevar el seguimiento de tiempos?"* (Métricas duales: km y tiempo calendario).
     2. *"¿Cómo gestionan las agencias los recordatorios del mantenimiento?"* (Investigar el abandono post-garantía y la falta de CRM activo).
     3. *"¿Cómo ayudar a los talleres y facilitar agendar mantenimientos?"* (Generación de órdenes y facilitación de citas).
     4. *"¿Hay más interesados que puedan beneficiarse y quieran participar?"* (Aseguradoras, refaccionarias, clubes de motos).
     5. *"¿Qué segmentos de la población se consideran (personas mayores, mujeres, personas muy ocupadas)?"* (Inclusión, accesibilidad y combate a la asimetría en talleres).
     6. *"¿Conviene considerar la gestión del mantenimiento de vehículos empresariales? ¿Necesitan funcionalidades que no puedan ser abarcadas en nuestra primera solución y sería viable incluirles más adelante?"* (Delimitación: B2C individual en MVP vs. B2B / microflotillas en fases posteriores).

---

## 1. Resumen Ejecutivo y Visión

- **Nombre del proyecto:** Itinera
- **Lema:** *"Donde cada kilómetro cuenta"*
- **Propósito central:** Proporcionar a los propietarios de vehículos particulares (con énfasis prioritario en motocicletas y vehículos de dos ruedas) un expediente digital y bitácora interactiva accesible desde dispositivos móviles, que permita dar seguimiento a los mantenimientos preventivos y correctivos mediante recordatorios oportunos, estimaciones de desgaste por uso y un lenguaje comprensible sin tecnicismos mecánicos abrumadores.

---

## 2. Planteamiento del Problema (TPNSc)

### 2.1 Definición Canónica
> *"Las personas propietarias de autos y motocicletas particulares en México necesitan un expediente digital simple, confiable y accesible desde el teléfono celular para registrar, comprender y dar seguimiento al mantenimiento de sus vehículos, debido a que la información técnica y de servicios se encuentra dispersa, se olvida o no se documenta adecuadamente; esto dificulta prevenir fallas costosas, planificar gastos, certificar el cuidado del vehículo ante terceros y tomar decisiones seguras en el camino."*

### 2.2 Diagnóstico del Entorno Actual
1. **Cultura reactiva vs. preventiva:** La mayoría de los usuarios no realiza revisiones periódicas programadas; esperan a que el vehículo presente una falla o avería crítica para acudir al taller.
2. **Brecha de conocimiento técnico:** Gran parte de los conductores desconoce la periodicidad adecuada para cambios de consumibles críticos (aceite de motor, kit de arrastre/cadena, balatas/frenos, bujías, neumáticos, suspensión). Los manuales de fabricante suelen ser voluminosos, poco consultados o se extravían.
3. **Desconfianza y opacidad en talleres:** Existe un recelo generalizado hacia talleres mecánicos informales respecto a diagnósticos dudosos, cobros injustificados o piezas no reemplazadas. La falta de un historial estructurado deja al usuario sin respaldo.
4. **Herramientas actuales inadecuadas:**
   - **Agencias automotrices:** Utilizan sistemas internos y hojas de cálculo (Excel) enfocadas en su facturación interna, no en empoderar al conductor con acceso en tiempo real.
   - **Talleres locales:** Carecen de digitalización o trazabilidad para sus clientes.
   - **Aplicaciones de mercado (ej. Drivvo):** Enfocadas prioritariamente en administración de combustible, registros de viajes y control financiero detallado, lo que genera sobrecarga cognitiva e interfaces saturadas para el usuario común que únicamente busca mantener su vehículo en óptimas condiciones operativas.

---

## 3. Segmentación de Usuarios (Consumidores, Clientes y Usuarios - CCU)

| Segmento | Rango de Edad | Perfil y Contexto de Uso | Puntos de Dolor Principales | Valor Esperado de Itinera |
| :--- | :--- | :--- | :--- | :--- |
| **Propietarios de motocicletas particulares** *(Foco principal de entrada)* | 18 – 35 años | Estudiantes y profesionistas de nivel socioeconómico medio y medio-bajo que usan la moto como transporte diario o trabajo secundario. | El desgaste de componentes en moto es acelerado; ignorar un servicio impacta directamente en su seguridad física. Horarios ajustados para acudir a talleres. | Avisos de mantenimiento según kilometraje, registro rápido en pocos pasos y recomendaciones claras de inspección. |
| **Conductores y repartidores de plataformas** | 18 – 45 años | Repartidores de DiDi, Rappi, Uber Eats y mensajería urbana que dependen de su vehículo para generar sus ingresos diarios. | Uso intensivo (alto kilometraje diario), presupuestos ajustados y riesgo de perder días de trabajo por averías mecánicas imprevistas. | Notificaciones preventivas oportunas, cálculo estimado de desgaste diario y control del historial de reparaciones. |
| **Propietarios de vehículos particulares generales** | 18 – 65 años | Dueños de automóviles familiares o utilitarios con diferentes grados de experiencia técnica (desde novatos hasta aficionados). | Pérdida de bitácoras físicas de agencia, desinformación sobre intervalos de servicio y dificultad para justificar el valor de reventa. | Historial centralizado transferible, alertas de servicio y resumen comprensible de gastos por mantenimiento. |

---

## 4. Filosofía y Diferenciadores de Itinera

1. **Salud mecánica sobre finanzas complejas:** Mientras que la competencia se concentra en balances de gasolina y presupuestos, Itinera prioriza el **estado de salud de los componentes** y la **prevención de averías**.
2. **Diseñado para el teléfono móvil (Mobile-First):** Interfaz optimizada para registrar datos en segundos desde la gasolinera, taller o estacionamiento, accesible para usuarios de todos los niveles de alfabetización digital.
3. **Cero tecnicismos innecesarios:** Explicación amigable del "por qué" y "cuándo" de cada servicio (ej. por qué revisar el nivel y estado del aceite, qué revisar en la tensión de cadena).
4. **Enfoque inicial en motocicletas:** Mercado con alto crecimiento en México y Latinoamérica, con mayor frecuencia de mantenimiento preventivo y menor oferta de software especializado accesible.

---

## 5. Objetivos del Proyecto

### 5.1 Objetivo General
Desarrollar una aplicación móvil multiplataforma que funcione como bitácora y asistente de mantenimiento vehicular, facilitando a los conductores el registro, seguimiento y planificación preventiva del estado mecánico de sus unidades para prolongar su vida útil y elevar la seguridad vial.

### 5.2 Objetivos Específicos
1. **Gestión de unidades:** Permitir el registro de uno o múltiples vehículos con sus datos base (marca, modelo, año, kilometraje inicial).
2. **Bitácora digital de servicios:** Registrar mantenimientos preventivos y correctivos (fecha, odómetro, componentes atendidos, notas, costos y taller/auto-servicio).
3. **Sistema de alertas inteligentes:** Notificar al usuario sobre servicios próximos con base en umbrales de kilometraje y/o tiempo transcurrido.
4. **Monitoreo de desgaste:** Proveer un tablero visual que indique el estado estimado de salud de consumibles críticos (aceite, frenos, neumáticos, bujías, cadena/transmisión).
5. **Generación de historial transferible:** Permitir la consulta organizada del historial de mantenimiento como respaldo técnico y valor agregado para una eventual venta.

---

## 6. Boceto del Modelo de Negocio (Canvas Preliminar)

```mermaid
flowchart TD
    subgraph Negocio["Modelo de Negocio Canvas (Preliminar)"]
        direction LR
        Socios["<b>Socios Clave</b><br/>• Talleres mecánicos locales<br/>• Refaccionarias<br/>• Clubes/comunidades de motociclistas"]
        Actividades["<b>Actividades Clave</b><br/>• Desarrollo y soporte móvil<br/>• Curación de intervalos de servicio<br/>• Algoritmos de estimación de desgaste"]
        Recursos["<b>Recursos Clave</b><br/>• Base de datos de modelos y servicios<br/>• Infraestructura cloud/local<br/>• Equipo de desarrollo de software"]
        Propuesta["<b>Propuesta de Valor</b><br/>• Expediente digital accesible y confiable<br/>• Prevención proactiva de fallas costosas<br/>• Enfoque en salud mecánica sin fricción técnica"]
        Relacion["<b>Relación con Clientes</b><br/>• Autoservicio móvil automatizado<br/>• Alertas oportunas no invasivas<br/>• Soporte comunitario"]
        Canales["<b>Canales</b><br/>• Tiendas de apps (Google Play / App Store)<br/>• Recomendación comunitaria / talleres"]
        Segmentos["<b>Segmentos de Clientes</b><br/>• Motociclistas particulares<br/>• Repartidores de última milla<br/>• Conductores particulares en general"]
        Costos["<b>Estructura de Costes</b><br/>• Licencias de publicación de apps<br/>• Hosting / backend<br/>• Mantenimiento y pruebas de software"]
        Ingresos["<b>Fuentes de Ingresos (Potenciales)</b><br/>• Modelo Freemium (funciones avanzadas)<br/>• Historiales exportables certificados<br/>• Alianzas de servicios/promociones con talleres"]
    end
```

---

## 7. Brechas Técnicas y Aspectos por Definir

A partir del análisis crítico del documento original, se identifican las siguientes decisiones de ingeniería que deben resolverse en el proceso de arquitectura y modelado de dominio:

1. **Estimación de kilometraje sin hardware telemático:** Al no contar inicialmente con dispositivos OBD-II o GPS continuo por consumo de batería, el sistema requiere un modelo matemático de estimación basado en hábitos (ej. promedio de km recorridos por día/semana ingresado por el usuario o inferido por actualizaciones periódicas).
2. **Catálogo de vehículos:** Determinar si se implementará un catálogo precargado cerrado o un esquema mixto (marcas/modelos comunes precargados con opción de entrada libre para modelos atípicos o modificaciones).
3. **Persistencia y modo Offline:** Vital para repartidores y zonas de baja conectividad; la base de datos debe operar en local (Local-First) con capacidades de sincronización posterior.
4. **Definición del Stack Tecnológico:** Selección fundamentada de framework móvil (ej. Flutter, React Native / Expo) y backend/persistencia (ej. SQLite / Supabase / Firebase / Postgres).
