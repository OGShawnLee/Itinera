# Estudio Técnico — Proyecto Itinera

Universidad Veracruzana, Licenciatura en Ingeniería de Software
Economía para la Toma de Decisiones — Proyecto Itinera
Xalapa, Veracruz, noviembre de 2026
Integrantes: Gerardo Abraham Barrón Gómez, Edgar Vázquez García y Alberto Villalba Figueroa

## Marco conceptual y preguntas directrices

El estudio técnico determina si es física y tecnológicamente posible ejecutar el proyecto y define la composición de recursos, procesos y estructura operativa necesaria para prestar el servicio sin sobredimensionar los costos fijos. Dado que Itinera es una aplicación móvil para Android con almacenamiento local en SQLite y no una planta manufacturera, los criterios clásicos de ingeniería de proyectos se traducen al desarrollo y operación de software esbelto.

En respuesta a las cinco preguntas directrices del estudio, Itinera opera desde Xalapa, Veracruz bajo un esquema remoto sin arrendamiento de oficinas ($0 MXN en renta). Su despliegue sigue compuertas de validación: la Fase 0 (Producto Mínimo Viable) abarca seis meses de prueba en campo; la Fase 1 inicia al superar entre 1,000 y 2,000 usuarios activos mensuales (MAU) en Xalapa; y la Fase 2 se activa al rebasar los 10,000 MAU en múltiples ciudades. La capacidad por usuario en Fase 0 es virtualmente ilimitada porque cada teléfono ejecuta su propia base SQLite, mientras que la capacidad de ingeniería se acota a tres cofundadores y a una cohorte piloto de motociclistas de 110 a 250 cc con rutina de reparto o de varios viajes al día. El servicio se distribuye como Android App Bundle (.aab) en Google Play Store con un flujo de baja fricción operativa y se respalda en recursos existentes: tres computadoras portátiles, teléfonos Android personales, conectividad doméstica igual o superior a 50 Mbps, telemetría pasiva gratuita y una única licencia de Google Play Console ($25 USD), manteniendo en $0 MXN los servidores en la nube, la mensajería SMS y las licencias de iOS.

## Macro y microlocalización

### Macrolocalización

El método cuantitativo de Vogel no aplica a este proyecto porque un producto digital distribuido por Google Play Store tiene un costo marginal de transporte físico igual a cero. Para elegir la sede operativa y ciudad piloto se aplicó el Método Cualitativo por Puntos sobre una escala de 1 a 10, ponderando cinco criterios: proximidad a la cohorte piloto y al equipo en la Universidad Veracruzana (0.30), costo operativo de vida y arranque esbelto (0.25), acceso a refaccionarias y talleres locales (0.20), conectividad de banda ancha y cobertura móvil (0.15) y eficiencia de traslados en pruebas de campo (0.10).

| Criterio | Peso | Xalapa (Calif.) | Xalapa (Pond.) | Puerto de Veracruz (Calif.) | Puerto de Veracruz (Pond.) | CDMX (Calif.) | CDMX (Pond.) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Proximidad a cohorte piloto y equipo UV | 0.30 | 10 | 3.00 | 6 | 1.80 | 4 | 1.20 |
| Costo operativo de vida y arranque esbelto | 0.25 | 9 | 2.25 | 8 | 2.00 | 4 | 1.00 |
| Acceso a refaccionarias y talleres locales | 0.20 | 9 | 1.80 | 8 | 1.60 | 9 | 1.80 |
| Conectividad banda ancha y cobertura móvil | 0.15 | 8 | 1.20 | 8 | 1.20 | 10 | 1.50 |
| Eficiencia de traslados en pruebas de campo | 0.10 | 8 | 0.80 | 7 | 0.70 | 5 | 0.50 |
| Total ponderado | 1.00 | — | 9.05 | — | 7.30 | — | 6.00 |

Xalapa obtiene el puntaje más alto (9.05) frente al Puerto de Veracruz (7.30) y la Ciudad de México (6.00). Además de concentrar al equipo desarrollador y ofrecer un costo de vida acorde con un arranque autofinanciado, su topografía con pendientes pronunciadas, tráfico denso y alta circulación de motocicletas y motonetas de 110 a 250 cc acelera el desgaste real de consumibles y facilita validar el sistema en condiciones exigentes.

### Microlocalización remota en Xalapa

La empresa fija su domicilio administrativo en Xalapa bajo un modelo de trabajo remoto con $0 MXN en renta de oficinas durante la Fase 0. La operación diaria se apoya en tres estaciones domésticas de ingeniería con internet residencial de al menos 50 Mbps y regulación eléctrica básica, complementadas con espacios académicos de la Universidad Veracruzana para revisiones de ciclo y corredores urbanos de alta afluencia motociclista para entrevistas de campo y futura prospección de refaccionarias.

## Capacidad operativa y organización del espacio

En Fase 0, la persistencia local en SQLite otorga capacidad de cómputo y almacenamiento ilimitada por dispositivo sin cuellos de botella en servidor. La capacidad humana se concentra en los tres cofundadores, quienes aportan entre 30 y 45 horas semanales combinadas para desarrollar, probar en equipos Android reales y dar seguimiento a una cohorte piloto de 30 a 100 motocicletas de uso intensivo (reparto o varios viajes al día, del orden de 50 a 90 km diarios estimados), lo que permite cerrar un ciclo completo de desgaste y calibración en tres a seis semanas bajo un esquema estricto de autoservicio dentro de la aplicación.

El entorno de trabajo remoto prescinde por completo de obra civil, drenaje industrial, bodegas o andenes, y se organiza en cuatro zonas lógicas: desarrollo de software en estación ergonómica con Git, banco de pruebas físicas por USB en teléfonos Android bajo condiciones sin conexión, infraestructura doméstica de energía y conectividad (>= 50 Mbps) para compilar y publicar paquetes .aab en Google Play Console, y nodos externos en la Universidad Veracruzana y vía pública para retroalimentación directa con usuarios.

El escalamiento de capacidad está protegido por compuertas objetivas. Al superar la compuerta de Fase 1 (1,000 a 2,000 MAU en Xalapa), se habilita un servidor ligero para mostrar promociones pagadas de comercios aliados, validar cada canje desde el celular del encargado o por WhatsApp sin instalar software en caja, y ofrecer respaldo en la nube opcional mediante una suscripción para dos o más motos personales o familiares. Al cruzar la compuerta de Fase 2 (>10,000 MAU en múltiples ciudades), la arquitectura evoluciona hacia una base relacional PostgreSQL y almacenamiento de objetos en la nube para habilitar sincronización multidispositivo, cuentas de micro-flotilla de 2 a 15 unidades comerciales y expansión a automóviles.

## Tecnología, flujo de servicio y recursos por fase

### Arquitectura móvil y flujo de servicio

La arquitectura prioriza Android porque concentra entre 74.11% y 89.13% del mercado móvil en México según StatCounter, evitando duplicar esfuerzos hacia iOS desde el primer día. La proporción en el segmento utilitario de motocicletas, que el equipo estima por encima del 85%, se tratará como supuesto hasta medirla con la encuesta de campo, que además detecta teléfonos Android sin Google Play. Toda la lógica del dominio reside en SQLite local: el perfil de la unidad, tres plantillas base de mantenimiento con variante de cadena o de banda CVT según el tipo de moto, cinco consumibles críticos, el historial con fotografía local opcional y el resumen exportable gratuito. El motor matemático ejecuta localmente dos invariantes centrales: la proyección adaptativa de odómetro, dada por Km proyectado(t) = Km base + (Tasa diaria × Δt), y la regla dual por lo que ocurra primero, expresada como Fecha de alerta = mín(t km, t meses). La tasa diaria inicial sale de una tabla que combina la rutina cotidiana del usuario con los días de uso por semana, y se recalibra por media móvil con una confirmación semanal que solo pregunta si la moto se usó como siempre, menos o más, sin pedir kilómetros. El desgaste acumulado determina el estado del semáforo: Verde cuando el porcentaje de uso es menor a 80%, Amarillo entre 80% y 99%, y Rojo a partir de 100%.

Bajo simbología estándar ASME adaptada, el flujo de servicio reduce la fricción manual frente al método tradicional de libretas o recibos en guantera. Tras una configuración inicial en menos de 30 segundos (Operación) y su guardado en SQLite (Almacenamiento), la aplicación proyecta el kilometraje en segundo plano y solicita una confirmación semanal en un toque de menos de 5 segundos (Operación combinada). Luego evalúa el semáforo (Inspección) y, al llegar a Amarillo o Rojo, emite una alerta preventiva puntual (Operación) que abre una ventana de planeación y ahorro (Demora controlada) antes de capturar el cambio de pieza con costo y foto en menos de 15 segundos (Operación y Almacenamiento), con salida instantánea de un resumen exportable gratuito en menos de 5 segundos (Transporte). En conjunto, la carga operativa baja de 45 a 90 minutos acumulados por ciclo en el método manual a menos de 1.5 minutos en Itinera, sustituyendo fallas correctivas imprevistas por mantenimiento planeado.

### Presupuesto técnico por fase

Para no inflar la inversión inicial en el estudio financiero, el presupuesto distingue entre la operación local de arranque y los rubros que solo se encienden al cruzar las compuertas de crecimiento.

| Categoría | Recurso técnico | Fase 0 (Almacenamiento local) | Fases 1 y 2 (Escalamiento condicional) |
| :--- | :--- | :--- | :--- |
| Distribución Android | Cuenta Google Play Console (.aab) | $25 USD (pago único) | Misma cuenta activa |
| Distribución iOS | Apple Developer Program y número D-U-N-S | $0 MXN (pospuesto) | $99 USD/año (solo en Fase 2) |
| Hardware de pruebas | 3 laptops y teléfonos Android del equipo | $0 MXN adicional (activos propios) | Reposición financiada por ingresos |
| Infraestructura | SQLite local vs. nube selectiva | $0 MXN (100% en dispositivo) | Instancia PostgreSQL y almacenamiento de objetos |
| Comunicaciones y telemetría | Notificaciones nativas y reporte de fallos | $0 MXN (sin SMS ni WhatsApp) | Capas gratuitas y ampliación según volumen |
| Pasarela de pagos | Procesamiento de cobros electrónicos | $0 MXN (sin cobros en app) | Comisión ~3.5% + $3 MXN por transacción |
| Legal, fiscal e intelectual | S.A.S., IMPI, INDAUTOR y contabilidad | $0 MXN notariales en S.A.S. | Tasas IMPI/INDAUTOR y honorarios RESICO-PM / CFDI 4.0 |
| Talento humano | Cofundadores y nómina progresiva | $0 MXN nómina (3 cofundadores) | Nómina gradual hasta 7 plazas |

## Marco legal, fiscal, propiedad intelectual y tiendas

La sociedad se constituye como Sociedad por Acciones Simplificada (S.A.S.) ante la Secretaría de Economía mediante trámite electrónico con $0 MXN de costo notarial, protegiendo el patrimonio personal de los socios desde el arranque y reservando la transformación a S.A.P.I. de C.V. para una eventual ronda de inversión externa en Fase 2. En materia tributaria, el proyecto gestionará RFC corporativo, e.firma y alta en el Régimen Simplificado de Confianza para Personas Morales (RESICO-PM, aplicable a ingresos menores a 35 millones de pesos anuales) para emitir facturas CFDI 4.0 y cumplir declaraciones mensuales en cuanto inicie la facturación comercial de Fase 1.

La protección de activos intangibles comprende el registro de la marca mixta Itinera ante el IMPI en las Clases 9 (software descargable) y 42 (servicios tecnológicos), el depósito del código fuente y manuales ante el INDAUTOR como obra de programa de computación, y la firma de convenios de confidencialidad y cesión de derechos patrimoniales entre socios y futuros colaboradores, verificando además las licencias de librerías de código abierto.

En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), la aplicación integra un Aviso de Privacidad claro con medios para ejercer los derechos ARCO (Acceso, Rectificación, Cancelación y Oposición). Guardar toda la bitácora y fotografías únicamente en el SQLite local durante la Fase 0 otorga una ventaja jurídica directa: al no exigir cuentas ni transmitir datos personales a servidores propios, se minimiza el riesgo de brechas y se simplifica la declaración de Seguridad de Datos en Google Play. Cuando un usuario active respaldo opcional en la nube o cuentas de micro-flotilla en Fases 1 y 2, se aplicará consentimiento expreso, cifrado en tránsito TLS/HTTPS, cifrado en reposo AES-256 y borrado irreversible de cuenta. Respecto a las tiendas digitales, la Fase 0 opera exclusivamente en Google Play Store ($25 USD, formato .aab, nivel de API objetivo vigente y Seguridad de Datos), dejando la publicación en Apple App Store ($99 USD/año y número D-U-N-S) pospuesta hasta la Fase 2.

## Alineación organizacional y resiliencia operativa

### Estructura y reconciliación organizacional

En Fase 0 la estructura funciona con tres cofundadores en roles duales y $0 MXN en nómina fija: Edgar Vázquez García en Dirección General, Cumplimiento Legal-Fiscal y Plataforma (CEO); Gerardo Abraham Barrón Gómez en Dirección de Tecnología y Arquitectura Android/SQLite (CTO); y Alberto Villalba Figueroa en Dirección de Operaciones, Producto y Validación en campo (COO). Al superarse las compuertas de Fase 1 y Fase 2, el organigrama crecerá de forma escalonada hasta siete plazas remotas: Dirección General, Dirección de Tecnología con dos ingenieros de software (móvil y servidores), Dirección de Operaciones con un especialista de soporte técnico y atención ARCO, y una Dirección de Administración, Finanzas y Cumplimiento.

Este diseño reconcilia explícitamente la versión preliminar del estudio organizacional con la línea base validada del proyecto. La infraestructura en la nube desde el día uno se reemplaza por almacenamiento local en SQLite hasta las Fases 1 y 2; el lanzamiento simultáneo con iOS se pospone a Fase 2; la nómina inicial de siete vacantes se difiere mediante compuertas; el directorio de talleres certificados se elimina para sustituirse en Fase 1 por promociones pagadas y etiquetadas, sin calificaciones, con canje comprobable en mostrador; el reporte PDF de pago ($49 MXN) pasa a ser un resumen exportable gratuito en Fase 0 para impulsar retención y recomendación boca a boca; y el alcance inicial se enfoca en una moto principal de 110 a 250 cc, personal o de trabajo, antes de abrir el plan para dos o más motos personales en Fase 1 y los automóviles y micro-flotillas comerciales en Fase 2.

### Resiliencia operativa

El sistema incorpora cuatro salvaguardas técnicas para responder a las condiciones reales del motociclista urbano mexicano. Primero, garantiza operación 100% sin conexión mediante SQLite local para registrar servicios, consultar el semáforo y responder confirmaciones semanales sin consumo de datos móviles. Segundo, resuelve la falla frecuente del odómetro físico o chicote roto mediante un modo de kilometraje relativo combinado con la regla dual por tiempo calendario, asegurando que la alerta preventiva se emita aun sin lectura del tablero. Tercero, protege la portabilidad de la información permitiendo exportar gratis un resumen legible del historial sin muros de pago. Cuarto, utiliza telemetría pasiva y anónima de cierres inesperados para mantener la estabilidad en hardware Android heterogéneo sin recabar datos personales ni requerir mesas de ayuda humanas en Fase 0.

## Referencias

Dorantes Hernández, M. E. (s. f.). Estudio Técnico [Material de cátedra]. Basado en Colón, L. (2011), Estudio técnico (Universidad del Atlántico), y UNAM (2017), El estudio técnico en un proyecto de inversión.

Ruiz Cuervo, V. A. (2022). Estudio Técnico y Organizacional — Economía para la Toma de Decisiones [Material de cátedra]. Universidad Veracruzana. Basado en Baca Urbina, G. (2010), Evaluación de Proyectos (6.ª ed.), McGraw-Hill, y Martínez, C. et al. (2015), Estudio técnico del proyecto Tomato-Mix, Revista Mexicana de Agronegocios, 36.

Caso ilustrativo Hotel Paradís. (s. f.). Capítulo 5: Estudio Técnico y Organizacional (pp. 44–57). Marco de distribución en planta de la Universidad de Castilla-La Mancha y norma NMX-TT-006-1996-IMNC.

Congreso de la Unión. Ley General de Sociedades Mercantiles (disposiciones sobre Sociedad por Acciones Simplificada, S.A.S.).

Congreso de la Unión. Ley del Impuesto Sobre la Renta (RESICO-PM) y Código Fiscal de la Federación (CFDI 4.0).

Congreso de la Unión. Ley Federal de Protección a la Propiedad Industrial (IMPI, Clasificación de Niza Clases 9 y 42) y Ley Federal del Derecho de Autor (INDAUTOR).

Congreso de la Unión. Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP y derechos ARCO).
