# Estudio de Mercado — Proyecto Itinera

Universidad Veracruzana — Licenciatura en Ingeniería de Software
Experiencia Educativa: Economía para la Toma de Decisiones
Proyecto: Itinera | Ciudad piloto: Xalapa, Veracruz | Fecha: noviembre de 2026
Integrantes: Gerardo Abraham Barrón Gómez, Edgar Vázquez García, Alberto Villalba Figueroa

## Objetivo del estudio

Validar la viabilidad de mercado, conductual y comercial de Itinera en Xalapa, Veracruz. Itinera es una aplicación gratuita para Android que guarda la información en el propio teléfono y avisa cuándo le toca servicio a cinco piezas críticas de la moto: aceite, cadena o banda de motoneta, frenos, bujía y llantas. El producto mínimo viable se dirige a motocicletas ligeras urbanas, de trabajo y motonetas de 110 a 250 cc, con una plantilla personalizada para otras cilindradas. En una segunda fase, refaccionarias y talleres locales podrán pagar por promociones etiquetadas como pagadas y por ventas comprobadas en mostrador, sin que Itinera califique ni certifique su trabajo.

Del lado de los conductores, el estudio perfila a todos los motociclistas de Xalapa sin descartarlos por cilindrada, mide cómo usan y cuidan hoy su moto, y después de mostrarles el prototipo valida su intención de uso, cada función principal y su disposición a pagar. Del lado de los comercios, mide su volumen de clientes, servicios más solicitados, temporadas bajas y forma de recordar servicios, y tras presentar el prototipo valida su interés en promocionarse, el esquema de cobro que prefieren y las condiciones para probar la aplicación un mes.

## Metodología y fuentes secundarias

Itinera funciona como una plataforma de dos lados, por lo que el estudio usa dos instrumentos independientes en Google Forms. Para los motociclistas se aplica una encuesta cuantitativa de 45 reactivos en 11 secciones (38 numerados de A0 a A37 más 7 preguntas derivadas) con ramas condicionales, de modo que cada persona responde entre 24 y 34 preguntas en siete u ocho minutos. Para talleres y refaccionarias se aplica un formulario de 31 reactivos en 8 secciones que llena el encuestador en el mostrador con el dueño o encargado, en ocho a diez minutos. Ambos instrumentos presentan el prototipo con capturas de pantalla antes de cualquier pregunta de validación, siguiendo la retroalimentación docente.

### Fuentes oficiales e indicadores de contexto

Según la estadística de Vehículos de Motor Registrados en Circulación del INEGI, en 2025 se registraron 10,547,500 motocicletas en México (16.1% del parque nacional y 17.8% más que en 2024) y 664,867 en Veracruz (quinto lugar nacional, 29.0% más que en 2024). En Xalapa el INEGI reporta 232,680 vehículos totales al cierre de 2024, y el último desglose municipal abierto de CEIEG/INEGI contabilizó 23,159 motocicletas en 2021. Para reflejar la operación de 2026, incluidas las unidades sin placas locales, se toma la estimación del Departamento de Movilidad Urbana del Ayuntamiento de Xalapa de alrededor de 40,000 motocicletas en circulación, que además registra 273 colisiones con motocicleta de 804 siniestros viales entre enero y octubre de 2026.

En el lado comercial, el DENUE del INEGI (edición 05/2026, municipio 30087) registra cerca de 35 talleres de reparación de motocicletas (SCIAN 811492). La clase SCIAN 468311 corresponde oficialmente al comercio al por menor de motocicletas y agrupa la venta al por menor de partes y refacciones nuevas para motocicleta (a diferencia de automóviles en 468211 o bicicletas en 811493); el número exacto de establecimientos en Xalapa queda [PENDIENTE DE CONTEO EXACTO EN DENUE SCIAN 468311]. En tecnología móvil, StatCounter ubica la participación de Android en México en 74.11% entre octubre de 2025 y octubre de 2026, después de 89.13% en 2024. Para los rangos de ingreso mensual en pesos se toma como referencia el salario mínimo general vigente en 2026 publicado por la CONASAMI ($315.04 MXN diarios, equivalentes a unos $9,582.47 MXN al mes).

Algunos datos que circulan sobre el sector no se usan como hechos porque no tienen fuente verificable: la proporción del parque por cilindrada (cerca de 70% entre 51 y 125 cc), el 80% de motos de baja cilindrada compradas como herramienta de trabajo y una participación de Android superior a 85% en el segmento motociclista. La encuesta mide directamente la cilindrada, el uso de la moto y el tipo de celular para sustituir esos supuestos por proporciones observadas.

### Contraste con competidores digitales y sustitutos analógicos

En Google Play México existen alternativas centradas en finanzas vehiculares que generan fricción para el motociclista utilitario. Drivvo ofrece un plan gratuito con anuncios a pantalla completa limitado a dos vehículos, exige crear cuenta y cobra suscripciones anuales de alrededor de $174.90 a $499.90 MXN; su enfoque contable obliga a capturar cada carga de gasolina. Fuelio es gratuita en Android y sin anuncios, pero gira en torno al combustible y no permite registrar lecturas aisladas de odómetro sin asociarlas a una recarga o gasto. MotoLog y MotoriLog apuntan a motociclistas de gama media y alta con bitácoras por número de serie y rutas GPS, y asumen tableros en buen estado.

Frente a ellas, la mayoría de conductores recurre a libretas, etiquetas de taller, notas en WhatsApp o la memoria. Estos medios se pierden, no suman kilómetros de forma automática y no avisan antes de que llegue la falla. Itinera cubre ese vacío con una configuración basada en la rutina diaria, un aviso semanal de un toque que no pide kilómetros y un cálculo por tiempo que funciona aunque el odómetro esté descompuesto.

## Prototipo presentado a los encuestados

Las capturas provienen de una versión navegable del prototipo construida con datos de ejemplo. Cada imagen muestra una sola pantalla con un pie de una línea en lenguaje cotidiano, sin cifras técnicas ni nombres de negocios reales.

| Captura | Qué muestra | Instrumento |
| :--- | :--- | :--- |
| 1 | Configuración inicial: tipo de moto y cómo la usa en un día normal | Motociclistas |
| 2 | Pantalla principal con el semáforo de las cinco piezas | Ambos |
| 3 | Aviso semanal de un toque y alerta amarilla en la pantalla de bloqueo | Motociclistas |
| 4 | Bitácora de servicios y resumen gratuito para compartir | Motociclistas |
| 5 | Promoción pagada de una refaccionaria de ejemplo con código para mostrador | Ambos |
| 6 | Vista del comercio para comprobar códigos, reporte del mes y cartel QR | Comercios |

## Instrumentos de recolección primaria

### Instrumento A: encuesta para motociclistas de Xalapa

Título del formulario: Cuidado y mantenimiento de motocicletas en Xalapa.

Texto de presentación: Somos estudiantes de Ingeniería de Software de la Universidad Veracruzana. Estamos diseñando Itinera, una aplicación gratuita para celular que te avisa cuándo le toca servicio a tu moto (aceite, cadena o banda, frenos, bujía y llantas) sin que tengas que anotar nada todos los días. Con esta encuesta queremos saber cómo cuidas tu moto hoy y qué opinas de nuestro prototipo. Es anónima, con fines académicos, y toma de 7 a 8 minutos.

Google Forms solo permite saltos condicionales desde preguntas de opción única, por lo que cada pregunta derivada se coloca en su propia sección. La única pregunta que termina la encuesta es no manejar motocicleta (además de ser menor de edad); quienes manejan motos de menos de 110 cc o de más de 250 cc, o motos de una empresa, continúan.

Sección 1. Para empezar.

A0. ¿Manejas motocicleta actualmente? ☐ Sí ☐ No (con No termina la encuesta)

A1. ¿En qué zona usas tu moto la mayor parte del tiempo? ☐ Xalapa ☐ Zona conurbada (Banderilla, Coatepec, Emiliano Zapata, Tlalnelhuayocan u otra cercana) ☐ Otra ciudad

Sección 2. Sobre ti.

A2. ¿Cuál es tu edad? ☐ Menor de 18 años (termina la encuesta) ☐ 18 a 24 ☐ 25 a 34 ☐ 35 a 44 ☐ 45 a 59 ☐ 60 o más

A3. ¿Con qué género te identificas? ☐ Mujer ☐ Hombre ☐ Otro ☐ Prefiero no decirlo

A4. ¿Cuál es tu ingreso mensual personal aproximado? ☐ Menos de $4,800 (menos de medio salario mínimo) ☐ $4,800 a $9,599 (hasta 1 salario mínimo) ☐ $9,600 a $19,199 (1 a 2 salarios mínimos) ☐ $19,200 a $28,799 (2 a 3 salarios mínimos) ☐ $28,800 o más (más de 3 salarios mínimos) ☐ Prefiero no decirlo

A5. ¿Cuál es tu ocupación principal? ☐ Estudiante ☐ Empleado(a) ☐ Repartidor(a) por aplicación ☐ Negocio propio o trabajo independiente ☐ Otro

Sección 3. Tu moto y cómo la usas.

A6. ¿Qué tipo de moto usas principalmente? ☐ Motoneta automática (scooter, sin cambios) ☐ De calle o de trabajo (con cambios) ☐ Doble propósito (calle y terracería) ☐ Deportiva o de alta cilindrada ☐ Otro

A7. ¿De cuántos cc es tu moto? ☐ Menos de 110 cc ☐ De 110 a 125 cc ☐ De 126 a 250 cc ☐ Más de 250 cc ☐ No sé

A8. ¿De qué marca es? (opcional) ☐ Italika ☐ Honda ☐ Yamaha ☐ Bajaj ☐ Vento ☐ Suzuki ☐ Otra

A9. ¿Para qué usas principalmente tu moto? ☐ Moverme en mi vida diaria (mandados, visitas) ☐ Ir a la escuela o al trabajo ☐ Reparto o mensajería por aplicación ☐ Trabajo para un negocio (entregas, cobranza, visitas) ☐ Paseo o recreación ☐ Otro

A10. ¿De quién es la moto que manejas? ☐ Mía ☐ De mi propio negocio ☐ De la persona o empresa para la que trabajo ☐ De un familiar ☐ Otro

A11. ¿Cómo usas tu moto en un día normal? ☐ Traslados cortos dentro de mi zona (1 o 2 viajes al día) ☐ Cruzo la ciudad de ida y vuelta (escuela o trabajo) ☐ Varios viajes en el día (trabajo, mandados o clientes) ☐ Reparto o uso continuo casi todo el día

A12. ¿Cuántos días a la semana la usas? ☐ 1 o 2 días ☐ 3 o 4 días ☐ 5 o 6 días ☐ Todos los días

A13. ¿Cuántas motos manejas o te toca cuidar, contando la tuya? ☐ 1 ☐ 2 ☐ 3 a 5 ☐ 6 o más

Sección 4. Cómo cuidas tu moto hoy.

A14. ¿Cada cuánto le haces cada uno de estos servicios a tu moto? Cuadrícula con una respuesta por fila. Filas: cambio de aceite; cadena (ajuste o lubricación) o banda (revisión), según tu moto; frenos o balatas; bujía; llantas (revisión o cambio). Columnas: cada mes o antes; cada 2 o 3 meses; cada 4 a 6 meses; más de 6 meses; solo cuando falla; no sé.

A15. ¿Hay algún otro servicio que le hagas seguido? (respuesta corta, opcional)

A16. ¿Quién suele hacer cada servicio? Cuadrícula con las mismas filas. Columnas: yo mismo(a); un taller; la agencia; un familiar o conocido; no se le hace.

A17. Si tú haces algún servicio, ¿por qué lo haces tú? (puedes marcar varias) ☐ Me sale más barato ☐ Me gusta y sé hacerlo ☐ No confío en los talleres ☐ No tengo tiempo de llevarla ☐ No hago ningún servicio yo

A18. Si llevas tu moto a taller o agencia, ¿por qué la llevas? (puedes marcar varias) ☐ No sé hacerlo ☐ No tengo herramienta o espacio ☐ Por la garantía ☐ Confío en mi mecánico ☐ No la llevo a taller

A19. En promedio, ¿cuánto gastas al mes en el mantenimiento de tu moto? ☐ Menos de $200 ☐ $200 a $499 ☐ $500 a $999 ☐ $1,000 a $1,999 ☐ $2,000 o más ☐ No sé

A20. Hoy, ¿cómo sabes cuándo le toca servicio a tu moto? ☐ No llevo control; la atiendo cuando falla o suena raro ☐ Me acuerdo de memoria (calculo por semanas o meses) ☐ Lo anoto en una libreta, ticket o etiqueta del taller ☐ Lo anoto en el celular o en un chat de WhatsApp ☐ Uso una aplicación ☐ El taller o la agencia me avisa ☐ Hay un encargado en la empresa o negocio que lo controla ☐ Otro

Sección 5. Conoce Itinera.

Texto: Itinera es una aplicación gratuita para Android. La configuras en menos de 30 segundos eligiendo tu tipo de moto y cómo la usas en un día normal, sin saber de mecánica ni contar kilómetros. Con eso calcula cuándo le toca servicio a cada pieza y te lo muestra con un semáforo: verde si va bien, amarillo cuando conviene ir juntando para el servicio y rojo cuando ya toca.

[Insertar Captura 1 del prototipo Vue aquí]

[Insertar Captura 2 del prototipo Vue aquí]

A21. Con lo que viste, ¿usarías Itinera para tu moto? ☐ Definitivamente sí ☐ Probablemente sí ☐ No estoy seguro(a) ☐ Probablemente no ☐ Definitivamente no (las dos últimas pasan a la sección 5b)

Sección 5b. Solo para quien no la usaría.

A21b. ¿Por qué no la usarías? ☐ No me interesa llevar control ☐ Mi taller ya me avisa ☐ No me gusta instalar aplicaciones ☐ Me preocupa el espacio o los datos del celular ☐ Otro (después pasa a la sección 11)

Sección 6. Avisos y semáforo.

Texto: Una vez por semana te llega un aviso en la pantalla de bloqueo: "¿Usaste tu moto como siempre esta semana?". Respondes Sí, Menos o Más con un toque, sin abrir la app. Cuando una pieza entra en amarillo te llega un solo aviso para que tengas tiempo de juntar el dinero, y otro si llega a rojo. No hay recordatorios diarios.

[Insertar Captura 3 del prototipo Vue aquí]

A22. ¿Te parece adecuado actualizar la app con ese toque semanal? ☐ Sí ☐ No

A22b. Si respondiste que no, ¿cómo lo preferirías? (opcional) ☐ Abrir la app solo cuando yo quiera ☐ Que solo me avise cuando toque un servicio ☐ Anotar de vez en cuando los kilómetros del tablero ☐ Otro

A23. ¿Te parece útil el semáforo con estos avisos? ☐ Sí (pasa a la sección 6b) ☐ No (pasa a la sección 6c)

Sección 6b. Solo si el semáforo te parece útil.

A24. ¿Con cuánta anticipación te gustaría recibir el aviso amarillo? ☐ Una semana antes ☐ Dos semanas antes ☐ Un mes antes ☐ Solo cuando ya toque

Sección 6c. Solo si el semáforo no te parece útil.

A23b. ¿De qué otra forma te gustaría que te avisara? (respuesta corta)

Sección 7. Bitácora y resumen.

Texto: Cada servicio queda guardado en tu bitácora: si lo hiciste tú o en taller, cuánto costó y una foto si quieres. Puedes compartir gratis un resumen con tu mecánico o con quien te compre la moto.

[Insertar Captura 4 del prototipo Vue aquí]

A25. ¿Te parece útil poder guardar y compartir este resumen? ☐ Sí ☐ No

A25b. ¿Qué más te gustaría que incluyera? (respuesta corta, opcional)

A26. ¿Qué le cambiarías o agregarías a Itinera? (párrafo, opcional)

Sección 8. Tu taller y promociones.

A27. ¿Te gustaría que tu taller de confianza pudiera recordarte por medio de la app cuando te toque servicio? ☐ Sí ☐ No ☐ No tengo un taller fijo

Texto: Más adelante, cuando te toque un servicio, la app podría mostrarte una promoción pagada de una refaccionaria o taller cerca de ti. Muestras un código en el mostrador y obtienes el descuento. Itinera no califica ni certifica a los negocios.

[Insertar Captura 5 del prototipo Vue aquí]

A28. ¿Usarías una promoción así cuando te toque servicio? ☐ Sí ☐ Depende del descuento o del lugar ☐ No

Sección 9. Pago.

A29. ¿Estarías dispuesto(a) a pagar por usar una app como Itinera? ☐ Sí (pasa a la sección 9b) ☐ Depende del precio (pasa a la sección 9b) ☐ No (pasa a la sección 9c)

Sección 9b. Solo si pagarías.

A30. ¿Cuánto pagarías al mes como máximo? ☐ Menos de $20 ☐ $20 a $34 ☐ $35 a $49 ☐ $50 a $74 ☐ $75 o más

A30b. ¿Cómo preferirías pagar? ☐ Cada mes ☐ Una vez al año ☐ Un solo pago (después pasa a la sección 9d)

Sección 9c. Solo si no pagarías.

A31a. ¿La usarías si fuera gratis? ☐ Sí ☐ No

A31b. ¿Pagarías solo por funciones extra, como llevar varias motos o guardar tu información en la nube? ☐ Sí ☐ No (después pasa a la sección 9d)

Sección 9d. Para todos.

A32. ¿Aceptarías ver promociones de negocios de tu zona a cambio de usar la app gratis? ☐ Sí ☐ No

Sección 10. Cómo conocer la app y recibir ayuda.

A33. ¿Cómo te enteras normalmente de aplicaciones nuevas? (puedes marcar varias) ☐ Me la recomiendan conocidos o compañeros ☐ Grupos de motociclistas en Facebook o WhatsApp ☐ Redes sociales o videos cortos ☐ Buscando en la tienda de aplicaciones ☐ Un cartel o código QR en el taller o refaccionaria ☐ Otro

A34. Si tuvieras una duda o problema con la app, ¿por dónde te gustaría recibir ayuda? ☐ Ayuda y preguntas frecuentes dentro de la app ☐ WhatsApp ☐ Videos cortos de cómo usarla ☐ Correo electrónico ☐ Redes sociales

Sección 11. Tu celular.

A35. ¿Qué celular usas? ☐ Android (Samsung, Motorola, Xiaomi, Oppo u otro) ☐ Huawei ☐ iPhone ☐ No tengo celular inteligente

A36. ¿Desde dónde descargas tus aplicaciones? ☐ Google Play ☐ App Store (iPhone) ☐ Tienda de la marca del celular (AppGallery, Galaxy Store u otra) ☐ No descargo aplicaciones

A37. Si quieres probar Itinera gratis antes que nadie, déjanos tu WhatsApp o correo. Solo lo usaremos para invitarte a la prueba piloto. (opcional)

### Instrumento B: formulario para talleres y refaccionarias

El encuestador aplica el formulario en el celular durante visitas a corredores de Xalapa (Av. Lázaro Cárdenas, Blvd. Adolfo Ruiz Cortines, Av. 20 de Noviembre, zona Revolución y Rafael Lucio, y Centro), con el dueño o encargado del negocio.

Texto de presentación: Somos estudiantes de Ingeniería de Software de la Universidad Veracruzana. Diseñamos Itinera, una aplicación gratuita que avisa a los motociclistas cuándo le toca servicio a su moto. Queremos conocer cómo trabaja su negocio y qué opina de una forma de atraer clientes con la app. Sus respuestas son confidenciales y con fines académicos.

Sección 1. Su negocio.

B1. ¿Qué tipo de negocio es? ☐ Taller de motos ☐ Refaccionaria ☐ Taller y refaccionaria

B2. ¿Qué puesto tiene usted? ☐ Dueño(a) ☐ Encargado(a) ☐ Empleado(a)

B3. ¿Cuántas personas trabajan en el negocio? ☐ 1 ☐ 2 o 3 ☐ 4 a 6 ☐ 7 o más

B4. ¿En qué colonia o zona está el negocio? (respuesta corta)

B5. En el mostrador, ¿usan celular o computadora para el negocio? ☐ Celular ☐ Computadora ☐ Ambos ☐ Ninguno

Sección 2. Clientes y servicios.

B6. Aproximadamente, ¿cuántos clientes con moto atienden al mes? ☐ Menos de 50 ☐ 50 a 100 ☐ 101 a 200 ☐ 201 a 400 ☐ Más de 400

B7. ¿Sabe más o menos cuántos de sus clientes son repartidores y cuántos particulares? ☐ Sí (pasa a B8) ☐ No (pasa a B9)

B8. ¿Cómo se reparten? ☐ La mayoría son repartidores ☐ Mitad y mitad ☐ La mayoría son particulares

B9. ¿Cuáles son los tres servicios que más le piden en motos? (máximo tres) ☐ Cambio de aceite ☐ Cadena o kit de arrastre ☐ Banda de motoneta ☐ Frenos o balatas ☐ Afinación o bujía ☐ Llantas ☐ Parte eléctrica ☐ Reparación de motor ☐ Otro

B10. ¿Cuánto cobra normalmente por un cambio de aceite con mano de obra en una moto de trabajo? (opcional) ☐ Menos de $150 ☐ $150 a $249 ☐ $250 a $349 ☐ $350 a $499 ☐ $500 o más

B11. ¿En qué parte del mes llegan más clientes? ☐ Primera semana ☐ Alrededor de la quincena ☐ Fin de mes ☐ Es igual todo el mes

B12. ¿En qué parte del mes llegan menos clientes? ☐ Primera semana ☐ Alrededor de la quincena ☐ Fin de mes ☐ Es igual todo el mes

B13. ¿Qué meses del año son más flojos? (puede marcar varios) ☐ Enero ☐ Febrero ☐ Marzo ☐ Abril ☐ Mayo ☐ Junio ☐ Julio ☐ Agosto ☐ Septiembre ☐ Octubre ☐ Noviembre ☐ Diciembre ☐ Es igual todo el año

Sección 3. Recordatorios a sus clientes.

B14. ¿Tiene alguna forma de recordar a sus clientes cuándo les toca servicio? ☐ Sí (pasa a B15) ☐ No (pasa a B17)

B15. ¿Cuál? ☐ Etiqueta o sticker en la moto ☐ Mensaje de WhatsApp o llamada ☐ Libreta o registro ☐ Un programa o sistema ☐ Otro

B16. Con ese recordatorio, ¿sus clientes regresan a tiempo? ☐ Casi siempre ☐ A veces ☐ Casi nunca

B17. Normalmente, ¿cuánto tiempo de más dejan pasar sus clientes antes de regresar por su servicio? ☐ Llegan a tiempo ☐ Una o dos semanas de más ☐ Un mes o más ☐ Hasta que algo falla

Sección 4. Conozca Itinera.

Texto: Itinera es gratis para el motociclista. Cuando a su moto le toca aceite, frenos o cadena, la app le avisa. Cuando la app tenga suficientes usuarios en Xalapa, en ese momento podrá mostrarle una promoción pagada de su negocio. El cliente enseña un código en su mostrador, usted lo comprueba desde su celular y a fin de mes ve cuántos clientes llegaron por la app. Itinera no califica ni certifica talleres.

[Insertar Captura 2 del prototipo Vue aquí]

[Insertar Captura 5 del prototipo Vue aquí]

[Insertar Captura 6 del prototipo Vue aquí]

B18. ¿Le parece adecuada esta forma de atraer clientes? ☐ Sí ☐ No. Comentarios (respuesta corta, opcional).

Sección 5. Forma de pago.

B19. ¿Estaría dispuesto(a) a invertir en promocionar su negocio dentro de Itinera para atraer clientes nuevos? ☐ Sí ☐ Tal vez ☐ No (pasa a B20)

B20. ¿Por qué no? (respuesta corta; después pasa a la sección 6)

Texto: Los primeros clientes que lleguen a su negocio con código serían gratis, como prueba. Después usted elegiría una de dos formas de pago: una cuota fija al mes, o pagar solo por cada cliente que llegue con su código y compre.

B21. ¿Cuál le conviene más? ☐ Cuota fija al mes (pasa a B22) ☐ Pagar por cada cliente que llegue y compre (pasa a B23) ☐ Ninguna ☐ No sé (pasan a B24)

B22. ¿Cuánto pagaría al mes como máximo? ☐ Menos de $150 ☐ $150 a $299 ☐ $300 a $499 ☐ $500 a $799 ☐ $800 o más

B23. ¿Cuánto pagaría por cada cliente que llegue con su código y compre? ☐ Menos de $10 ☐ $10 a $19 ☐ $20 a $39 ☐ $40 a $59 ☐ $60 o más

B24. ¿Qué descuento o beneficio podría ofrecer a esos clientes sin perder? ☐ 5% ☐ 10% ☐ 15% o más ☐ Revisión gratis ☐ Otro

B25. ¿Cuántos clientes gratis necesitaría ver llegar para decidir si continúa? ☐ 5 ☐ 10 ☐ 20 ☐ Más de 20

Sección 6. Dar a conocer la app.

B26. ¿Le parece adecuado poner un cartel con código QR o compartir un enlace para que sus clientes descarguen la app gratis? ☐ Sí ☐ No

B27. ¿Por qué otros medios la daría a conocer? (puede marcar varios) ☐ WhatsApp de sus clientes ☐ Redes sociales del negocio ☐ En la nota o ticket ☐ Sticker en la moto del cliente ☐ De palabra ☐ Otro

Sección 7. Prueba de un mes.

B28. De estos beneficios, elija los tres más importantes para probar Itinera un mes. ☐ No instalar nada en caja ☐ Comprobante de cada cliente que llegó por la app ☐ Reporte mensual de clientes ☐ Promoción solo para motociclistas de su zona ☐ Poder cancelar cuando quiera ☐ Recordatorio a sus propios clientes de su próximo servicio

B29. ¿Qué otra función le gustaría? (respuesta corta)

B30. ¿Pagaría un poco más por esa función? ☐ Sí ☐ No ☐ Depende

Sección 8. Cierre.

B31. Si le interesa participar en la prueba piloto, ¿por qué medio prefiere que lo contactemos? ☐ WhatsApp ☐ Llamada ☐ Visita ☐ Correo ☐ No me interesa participar

## Universo y muestreo

### Embudo de demanda en Xalapa

El mercado potencial parte de las cerca de 40,000 motocicletas en circulación estimadas para 2026, con un escenario pesimista en la cota censal de 23,159 unidades de 2021. A diferencia de la versión anterior del estudio, ningún filtro del embudo se supone: cada uno se calcula con una proporción medida en la encuesta y su intervalo de confianza. El mercado en rango resulta de aplicar la proporción de motos entre 110 y 250 cc (reactivo A7, asignando las respuestas "No sé" con el tipo y la marca); el mercado disponible, de aplicar la proporción con Android y Google Play (A35 y A36); y el mercado cualificado, de aplicar la intención de uso ajustada con los factores de corrección de la literatura de intención de compra.

Dentro del mercado cualificado, el mercado meta prioriza a quienes son dueños de su moto y tienen rutina de varios viajes al día o de reparto continuo, y conserva como segmento secundario a quienes hacen traslados cortos o cruzan la ciudad. Los conductores de motos de su empleador, los hogares con dos o más motos y los negocios con encargado de mantenimiento se reportan por separado, porque corresponden al plan para varias motos y a la futura cuenta de flotillas. En el lado comercial, el mercado meta son los comercios que declaren disposición a promocionarse, sobre el universo de cerca de 35 talleres más las refaccionarias pendientes de conteo. El mercado piloto lo integrarán los motociclistas de rutina intensiva que dejen su contacto en la encuesta.

### Cálculo de muestra y estrategia de campo

Para la encuesta a motociclistas se usa la fórmula de muestreo para universo finito:

n = (z^2 * N * p * q) / [e^2 * (N - 1) + z^2 * p * q]

Con N = 40,000, confianza de 95% (z = 1.96), margen de error de ±5% (e = 0.05) y p = q = 0.50, el numerador resulta en 3.8416 * 40,000 * 0.25 = 38,416 y el denominador en 0.0025 * 39,999 + 0.9604 = 100.9579. El cociente es 380.52, por lo que se requieren 381 encuestas válidas. Con la cota censal de 23,159 la muestra baja a 378; si el calendario lo obliga, un margen de ±7% exige 196 encuestas y uno exploratorio de ±10%, 96.

Como no existe un padrón público para un sorteo aleatorio, el levantamiento sigue un muestreo por cuotas en puntos de alta afluencia (Av. Lázaro Cárdenas, Circuito Presidentes, Zona Universitaria, Av. 20 de Noviembre y bases de repartidores), complementado con un código QR al formulario. Se busca que al menos la mitad de los encuestados tenga rutina de varios viajes al día o de reparto, y que haya suficientes mujeres para analizar diferencias por género. Al tratarse de una muestra no probabilística, los intervalos de confianza se reportan como indicativos y se declara el posible sesgo de quienes responden en línea. En el lado comercial se intentará entrevistar a todos los talleres y refaccionarias del marco DENUE; con pocas decenas de respuestas los resultados se presentan como frecuencias y rangos, sin inferencia estadística.

## Cruces e inferencias estadísticas

Cada pregunta de la encuesta a motociclistas se diseñó para cruzarse con otras y responder una decisión concreta. Las relaciones entre variables categóricas se probarán con chi-cuadrada de independencia y la V de Cramér, agrupando categorías cuando una celda tenga frecuencia esperada menor que cinco. La intención de uso se modelará con regresión logística a partir del perfil, el uso de la moto y la forma actual de control, y las proporciones se reportarán con intervalos de Wilson.

| Cruce | Pregunta que responde |
| :--- | :--- |
| Ingreso (A4) con intención de uso (A21) y disposición a pagar (A29, A30) | Si la disposición a pagar depende del nivel económico |
| Quién hace el servicio (A16) con ingreso (A4) e interés en ligar la app al taller (A27) | Qué proporción de clientes de taller quiere ese vínculo, como argumento ante talleres |
| Género (A3) con quién hace el servicio (A16) y sus motivos (A17, A18) | Si las mujeres acuden más al taller y desconfían más |
| Uso (A9), propiedad (A10) y rutina (A11, A12) con intención (A21) | Si los dueños de rutina intensiva son el grupo con más interés |
| Forma actual de control (A20) con intención (A21) | Si quien no lleva control quiere la app más que quien usa libreta |
| Tipo y cilindrada (A6, A7) con intención (A21) | Si el interés en motos de menos de 110 cc o de más de 250 cc justifica ampliar el rango |
| Propiedad (A10), número de motos (A13) y control (A20) con intención (A21) | Cuánta demanda existe para el plan de varias motos y para flotillas |
| Frecuencia de servicios (A14) con rutina (A11, A12) | Si los intervalos reales coinciden con las plantillas de la app |
| Aceptación de promociones (A28, A32) frente a disposición de comercios (B19, B21) | Si los dos lados de la plataforma coinciden |
| Medio de descubrimiento (A33) con edad (A2) | Qué canal de adquisición conviene para cada edad |
| Tipo de celular y tienda (A35, A36) con ingreso (A4) | La proporción real de Android con Google Play en el segmento |
| Canal de ayuda (A34) con edad (A2) | Si conviene habilitar soporte básico por WhatsApp |

## Resultados esperados, matriz FODA y proyecciones

El levantamiento de ambos instrumentos y la producción de las capturas del prototipo están pendientes, por lo que no se reportan resultados empíricos ni estimaciones simuladas. Una vez tabulados los datos se presentará el perfil del motociclista, la distribución por cilindrada, tipo de moto y rutina, la frecuencia y el responsable de cada servicio, la aceptación de cada función del prototipo y la disposición a pagar; en los comercios, su volumen, servicios principales, temporadas bajas, recordatorios actuales, esquema de cobro preferido y condiciones para una prueba.

| Origen | Factores positivos | Factores negativos |
| :--- | :--- | :--- |
| Interno (producto y equipo) | Fortalezas: aplicación Android sin costo de servidores en la primera fase, configuración por rutina sin contar kilómetros, aviso semanal de un toque y cálculo por tiempo que opera aun con odómetro descompuesto. | Debilidades: sin versión para iPhone en las primeras fases y cobertura con tres plantillas editables en lugar de un catálogo por modelo y año. |
| Externo (mercado de Xalapa) | Oportunidades: parque en rápido crecimiento (cerca de 40,000 motos locales; 29.0% de crecimiento anual en Veracruz en 2025) y brecha frente a aplicaciones centradas en gasolina. | Amenazas: hábito de no llevar registro hasta la falla, competencia con muchas descargas, posible fatiga ante notificaciones y riesgo de no reunir suficientes usuarios para interesar a los comercios. |

### Proyecciones hacia los estudios posteriores

En el Estudio Técnico, la proporción de motonetas automáticas frente a motos de cadena definirá la prioridad de cada variante de plantilla y de sus guías de revisión; la combinación de rutina y días de uso fijará los valores iniciales con los que la app estima el kilometraje diario; y la frecuencia real de servicios permitirá contrastar los intervalos precargados. La forma en que los comercios usan celular o computadora en el mostrador decidirá cómo se comprueban los códigos de promoción. Ya no se pregunta por el estado del odómetro, porque la app incluye de todos modos el cálculo por tiempo, ni por la versión de Android, que el usuario no conoce y que se fijará con las estadísticas de la tienda.

En el Estudio Económico-Financiero, la encuesta debe entregar las proporciones del embudo (cilindrada, celular y tienda, intención ajustada), el número de servicios al mes por usuario y quién los realiza, el gasto mensual en mantenimiento, la aceptación de promociones, la disposición a pagar por la app y por varias motos, y en los comercios la proporción dispuesta a promocionarse, el esquema y monto preferidos, el descuento tolerable, el número de clientes de prueba que exigen y sus temporadas bajas. Con ello se modelarán los ingresos de ambos lados, el costo de adquisición por canal y el costo de soporte si los usuarios prefieren WhatsApp.

El mismo estudio calculará cuántos meses tardaría Xalapa en reunir entre 1,000 y 2,000 usuarios activos al mes, condición para activar el cobro a comercios. El cálculo será usuarios alcanzables = N * p(rango) * p(Android con Google Play) * p(intención ajustada) * alcance * retención, en un escenario pesimista con 23,159 motos y uno base con 40,000. Los tres primeros factores salen de la encuesta; el alcance de los canales y la retención a 30 y 90 días no se pueden medir con una encuesta y se tomarán de la prueba piloto y de referencias publicadas, declarándolos como supuestos. Si el escenario base no alcanza la meta en un plazo razonable, el estudio deberá mostrar qué acción la acerca, como la captación en mostrador con QR o la ampliación a la zona conurbada, en lugar de dar por hecha la segunda fase.

## Referencias

### Fuentes secundarias e institucionales

1. Instituto Nacional de Estadística y Geografía (INEGI) (2025). Vehículos de motor registrados en circulación (VMRC) — Estadística anual 2023, 2024 y 2025 (Nacional y Veracruz). https://www.inegi.org.mx/programas/vehiculosmotor/
2. Instituto Nacional de Estadística y Geografía (INEGI) (2026). Directorio Estadístico Nacional de Unidades Económicas (DENUE), Edición 05/2026 — Claves SCIAN 811492 y 468311, Municipio 30087 Xalapa, Veracruz. https://www.inegi.org.mx/app/mapa/denue/default.aspx
3. Comité Estatal de Información Estadística y Geográfica de Veracruz (CEIEG / SEFIPLAN) (2022–2026). Cuadernillos Municipales e Información Estadística — Municipio de Xalapa. https://www.ceieg.veracruz.gob.mx/cuadernillos-municipales/
4. Departamento de Movilidad Urbana del Ayuntamiento de Xalapa y Organización Physis Ciclovida (octubre–noviembre de 2026). Estimación del parque circulante de motocicletas en Xalapa y conteo de siniestralidad vial enero–octubre 2026 (prensa estatal: Diario de Xalapa / OEM, Libertad Bajo Palabra, e-veracruz).
5. Directorio DENUE Sectorial — Talleres de Motos México (2026). Establecimientos de reparación y mantenimiento de motocicletas en Xalapa, Veracruz (SCIAN 811492). https://www.talleresdemotos.com/
6. StatCounter Global Stats (2024–2026). Mobile Operating System Market Share Mexico. https://gs.statcounter.com/os-market-share/mobile/mexico
7. Drivvo — CTN Cardoso (2026). Drivvo – Control de gastos de vehículos. https://www.drivvo.com/es-MX/
8. Fuelio — Sygic (2026). Fuelio: control de combustible y gastos. https://fuel.io/
9. MotoLog / MotorApp (2026). Aplicaciones de bitácora para motocicletas. https://www.motorapp.net/
10. Jamieson, L. F. y Bass, F. M. (1989). Adjusting stated intention measures to predict trial purchase of new products. Journal of Marketing Research, 26(3), 336–345.
11. Morwitz, V. G., Steckel, J. H. y Gupta, A. (2007). When do purchase intentions predict sales? International Journal of Forecasting, 23(3), 347–364.

### Material académico de la asignatura

12. Sánchez Morales, A. de J. (2022). Estudio de Mercado — Economía para la Toma de Decisiones [Material didáctico de cátedra]. Facultad de Estadística e Informática, Universidad Veracruzana.
13. García Morales, D. (2022). Estudio de mercado [Material didáctico de cátedra]. Universidad Veracruzana.
