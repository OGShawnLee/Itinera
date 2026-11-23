/**
 * Generador en Google Apps Script para el Instrumento A (Encuesta Motociclistas B2C).
 *
 * INSTRUCCIONES PARA LAS CAPTURAS DEL PROTOTIPO:
 * Para que el formulario inserte automáticamente las imágenes del prototipo (tickets 005/006),
 * sube los archivos de `prototype/captures/captura-1.png` a `captura-5.png` a tu Google Drive,
 * obtén el enlace para compartir de cada uno y pega abajo el ID del archivo (la cadena que
 * aparece en el enlace entre `/d/` y `/view`). Si dejas un ID vacío (''), el script insertará
 * un encabezado marcador de posición para que subas la imagen manualmente en Google Forms.
 */
const CAPTURAS_A_DRIVE_IDS = { 1: '', 2: '', 3: '', 4: '', 5: '' };

function crearEncuestaMotociclistasItinera() {
  const form = FormApp.create('Cuidado y mantenimiento de motocicletas en Xalapa');
  form.setDescription(
    'Somos estudiantes de Ingeniería de Software de la Universidad Veracruzana. Estamos diseñando Itinera, una aplicación gratuita para celular que te avisa cuándo le toca servicio a tu moto (aceite, cadena o banda, frenos, bujía y llantas) sin que tengas que anotar nada todos los días. Con esta encuesta queremos saber cómo cuidas tu moto hoy y qué opinas de nuestro prototipo. Es anónima, con fines académicos, y toma de 7 a 8 minutos.'
  );
  form.setProgressBar(true);
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setPublishingSummary(false);
  form.setConfirmationMessage('Gracias. Tus respuestas nos ayudan a diseñar Itinera.');

  const piesCaptura = {
    1: 'La configuras en menos de 30 segundos, sin saber de mecánica ni contar kilómetros.',
    2: 'El semáforo te dice qué está bien, para qué ir juntando y qué ya toca.',
    3: 'Un toque por semana y un solo aviso cuando se acerca un servicio.',
    4: 'Tu historial queda guardado y puedes compartirlo gratis.',
    5: 'Más adelante: promociones de negocios cercanos cuando te toca servicio.'
  };

  function insertarCaptura(n) {
    const id = CAPTURAS_A_DRIVE_IDS[n];
    const pie = piesCaptura[n];
    if (id && String(id).trim() !== '') {
      form.addImageItem()
        .setImage(DriveApp.getFileById(String(id).trim()).getBlob())
        .setTitle(pie)
        .setAlignment(FormApp.Alignment.CENTER)
        .setWidth(300);
    } else {
      form.addSectionHeaderItem()
        .setTitle('[Insertar Captura ' + n + ' del prototipo aquí]')
        .setHelpText(pie + ' Archivo: prototype/captures/captura-' + n + '.png');
    }
  }

  // =========================================================================
  // PASADA 1: CREACIÓN DE PÁGINAS Y REACTIVOS EN ORDEN FINAL
  // =========================================================================

  // Página 1 (first page)
  // A0
  const itemA0 = form.addMultipleChoiceItem()
    .setTitle('¿Manejas motocicleta actualmente?')
    .setRequired(true);

  // Página 2: Tu zona y tu edad
  const pbZona = form.addPageBreakItem().setTitle('Tu zona y tu edad');

  // A1
  form.addMultipleChoiceItem()
    .setTitle('¿En qué zona usas tu moto la mayor parte del tiempo?')
    .setChoiceValues([
      'Xalapa',
      'Zona conurbada (Banderilla, Coatepec, Emiliano Zapata, Tlalnelhuayocan u otra cercana)',
      'Otra ciudad'
    ])
    .setRequired(true);

  // A2
  const itemA2 = form.addMultipleChoiceItem()
    .setTitle('¿Cuál es tu edad?')
    .setRequired(true);

  // Página 3: Sobre ti
  const pbSobreTi = form.addPageBreakItem().setTitle('Sobre ti');

  // A3
  form.addMultipleChoiceItem()
    .setTitle('¿Con qué género te identificas?')
    .setChoiceValues([
      'Mujer',
      'Hombre',
      'Prefiero no decirlo'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // A4
  form.addMultipleChoiceItem()
    .setTitle('¿Cuál es tu ingreso mensual personal aproximado?')
    .setChoiceValues([
      'Menos de $4,800 (menos de medio salario mínimo)',
      '$4,800 a $9,599 (hasta 1 salario mínimo)',
      '$9,600 a $19,199 (1 a 2 salarios mínimos)',
      '$19,200 a $28,799 (2 a 3 salarios mínimos)',
      '$28,800 o más (más de 3 salarios mínimos)',
      'Prefiero no decirlo'
    ])
    .setRequired(true);

  // A5
  form.addMultipleChoiceItem()
    .setTitle('¿Cuál es tu ocupación principal?')
    .setChoiceValues([
      'Estudiante',
      'Empleado(a)',
      'Repartidor(a) por aplicación',
      'Negocio propio o trabajo independiente'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // Página 4: Tu moto y cómo la usas
  const pbMoto = form.addPageBreakItem().setTitle('Tu moto y cómo la usas');

  // A6
  form.addMultipleChoiceItem()
    .setTitle('¿Qué tipo de moto usas principalmente?')
    .setChoiceValues([
      'Motoneta automática (scooter, sin cambios)',
      'De calle o de trabajo (con cambios)',
      'Doble propósito (calle y terracería)',
      'Deportiva o de alta cilindrada'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // A7
  form.addMultipleChoiceItem()
    .setTitle('¿De cuántos cc es tu moto?')
    .setChoiceValues([
      'Menos de 110 cc',
      'De 110 a 125 cc',
      'De 126 a 250 cc',
      'Más de 250 cc',
      'No sé'
    ])
    .setRequired(true);

  // A8
  form.addListItem()
    .setTitle('¿De qué marca es?')
    .setChoiceValues([
      'Italika',
      'Honda',
      'Yamaha',
      'Bajaj',
      'Vento',
      'Suzuki',
      'Otra'
    ])
    .setRequired(false);

  // A9
  form.addMultipleChoiceItem()
    .setTitle('¿Para qué usas principalmente tu moto?')
    .setChoiceValues([
      'Moverme en mi vida diaria (mandados, visitas)',
      'Ir a la escuela o al trabajo',
      'Reparto o mensajería por aplicación',
      'Trabajo para un negocio (entregas, cobranza, visitas)',
      'Paseo o recreación'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // A10
  form.addMultipleChoiceItem()
    .setTitle('¿De quién es la moto que manejas?')
    .setChoiceValues([
      'Mía',
      'De mi propio negocio',
      'De la persona o empresa para la que trabajo',
      'De un familiar'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // A11
  form.addMultipleChoiceItem()
    .setTitle('¿Cómo usas tu moto en un día normal?')
    .setChoiceValues([
      'Traslados cortos dentro de mi zona (1 o 2 viajes al día)',
      'Cruzo la ciudad de ida y vuelta (escuela o trabajo)',
      'Varios viajes en el día (trabajo, mandados o clientes)',
      'Reparto o uso continuo casi todo el día'
    ])
    .setRequired(true);

  // A12
  form.addMultipleChoiceItem()
    .setTitle('¿Cuántos días a la semana la usas?')
    .setChoiceValues([
      '1 o 2 días',
      '3 o 4 días',
      '5 o 6 días',
      'Todos los días'
    ])
    .setRequired(true);

  // A13
  form.addMultipleChoiceItem()
    .setTitle('¿Cuántas motos manejas o te toca cuidar, contando la tuya?')
    .setChoiceValues([
      '1',
      '2',
      '3 a 5',
      '6 o más'
    ])
    .setRequired(true);

  // Página 5: Cómo cuidas tu moto hoy
  const pbCuidado = form.addPageBreakItem().setTitle('Cómo cuidas tu moto hoy');

  const filasServicios = [
    'Cambio de aceite',
    'Cadena (ajuste o lubricación) o banda (revisión), según tu moto',
    'Frenos o balatas',
    'Bujía',
    'Llantas (revisión o cambio)'
  ];

  // A14
  form.addGridItem()
    .setTitle('¿Cada cuánto le haces cada uno de estos servicios a tu moto?')
    .setRows(filasServicios)
    .setColumns([
      'Cada mes o antes',
      'Cada 2 o 3 meses',
      'Cada 4 a 6 meses',
      'Más de 6 meses',
      'Solo cuando falla',
      'No sé'
    ])
    .setRequired(true);

  // A15
  form.addTextItem()
    .setTitle('¿Hay algún otro servicio que le hagas seguido?')
    .setRequired(false);

  // A16
  form.addGridItem()
    .setTitle('¿Quién suele hacer cada servicio?')
    .setRows(filasServicios)
    .setColumns([
      'Yo mismo(a)',
      'Un taller',
      'La agencia',
      'Un familiar o conocido',
      'No se le hace'
    ])
    .setRequired(true);

  // A17
  form.addCheckboxItem()
    .setTitle('Si tú haces algún servicio, ¿por qué lo haces tú?')
    .setHelpText('puedes marcar varias')
    .setChoiceValues([
      'Me sale más barato',
      'Me gusta y sé hacerlo',
      'No confío en los talleres',
      'No tengo tiempo de llevarla',
      'No hago ningún servicio yo'
    ])
    .setRequired(true);

  // A18
  form.addCheckboxItem()
    .setTitle('Si llevas tu moto a taller o agencia, ¿por qué la llevas?')
    .setHelpText('puedes marcar varias')
    .setChoiceValues([
      'No sé hacerlo',
      'No tengo herramienta o espacio',
      'Por la garantía',
      'Confío en mi mecánico',
      'No la llevo a taller'
    ])
    .setRequired(true);

  // A19
  form.addMultipleChoiceItem()
    .setTitle('En promedio, ¿cuánto gastas al mes en el mantenimiento de tu moto?')
    .setChoiceValues([
      'Menos de $200',
      '$200 a $499',
      '$500 a $999',
      '$1,000 a $1,999',
      '$2,000 o más',
      'No sé'
    ])
    .setRequired(true);

  // A20
  form.addMultipleChoiceItem()
    .setTitle('Hoy, ¿cómo sabes cuándo le toca servicio a tu moto?')
    .setChoiceValues([
      'No llevo control; la atiendo cuando falla o suena raro',
      'Me acuerdo de memoria (calculo por semanas o meses)',
      'Lo anoto en una libreta, ticket o etiqueta del taller',
      'Lo anoto en el celular o en un chat de WhatsApp',
      'Uso una aplicación',
      'El taller o la agencia me avisa',
      'Hay un encargado en la empresa o negocio que lo controla'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // Página 6: Conoce Itinera
  const pbS5 = form.addPageBreakItem()
    .setTitle('Conoce Itinera')
    .setHelpText(
      'Itinera es una aplicación gratuita para Android. La configuras en menos de 30 segundos eligiendo tu tipo de moto y cómo la usas en un día normal, sin saber de mecánica ni contar kilómetros. Con eso calcula cuándo le toca servicio a cada pieza y te lo muestra con un semáforo: verde si va bien, amarillo cuando conviene ir juntando para el servicio y rojo cuando ya toca.'
    );

  insertarCaptura(1);
  insertarCaptura(2);

  // A21
  const itemA21 = form.addMultipleChoiceItem()
    .setTitle('Con lo que viste, ¿usarías Itinera para tu moto?')
    .setRequired(true);

  // Página 7: Por qué no la usarías
  const pbS5b = form.addPageBreakItem().setTitle('Por qué no la usarías');

  // A21b
  form.addMultipleChoiceItem()
    .setTitle('¿Por qué no la usarías?')
    .setChoiceValues([
      'No me interesa llevar control',
      'Mi taller ya me avisa',
      'No me gusta instalar aplicaciones',
      'Me preocupa el espacio o los datos del celular'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // Página 8: Avisos y semáforo
  const pbS6 = form.addPageBreakItem()
    .setTitle('Avisos y semáforo')
    .setHelpText(
      'Una vez por semana te llega un aviso en la pantalla de bloqueo: "¿Usaste tu moto como siempre esta semana?". Respondes Sí, Menos o Más con un toque, sin abrir la app. Cuando una pieza entra en amarillo te llega un solo aviso para que tengas tiempo de juntar el dinero, y otro si llega a rojo. No hay recordatorios diarios.'
    );

  insertarCaptura(3);

  // A22
  form.addMultipleChoiceItem()
    .setTitle('¿Te parece adecuado actualizar la app con ese toque semanal?')
    .setChoiceValues(['Sí', 'No'])
    .setRequired(true);

  // A22b
  form.addMultipleChoiceItem()
    .setTitle('Si respondiste que no, ¿cómo lo preferirías?')
    .setChoiceValues([
      'Abrir la app solo cuando yo quiera',
      'Que solo me avise cuando toque un servicio',
      'Anotar de vez en cuando los kilómetros del tablero'
    ])
    .showOtherOption(true)
    .setRequired(false);

  // A23
  const itemA23 = form.addMultipleChoiceItem()
    .setTitle('¿Te parece útil el semáforo con estos avisos?')
    .setRequired(true);

  // Página 9: Anticipación del aviso
  const pbS6b = form.addPageBreakItem().setTitle('Anticipación del aviso');

  // A24
  form.addMultipleChoiceItem()
    .setTitle('¿Con cuánta anticipación te gustaría recibir el aviso amarillo?')
    .setChoiceValues([
      'Una semana antes',
      'Dos semanas antes',
      'Un mes antes',
      'Solo cuando ya toque'
    ])
    .setRequired(true);

  // Página 10: Otra forma de aviso
  const pbS6c = form.addPageBreakItem().setTitle('Otra forma de aviso');

  // A23b
  form.addTextItem()
    .setTitle('¿De qué otra forma te gustaría que te avisara?')
    .setRequired(true);

  // Página 11: Bitácora y resumen
  const pbS7 = form.addPageBreakItem()
    .setTitle('Bitácora y resumen')
    .setHelpText(
      'Cada servicio queda guardado en tu bitácora: si lo hiciste tú o en taller, cuánto costó y una foto si quieres. Puedes compartir gratis un resumen con tu mecánico o con quien te compre la moto.'
    );

  insertarCaptura(4);

  // A25
  form.addMultipleChoiceItem()
    .setTitle('¿Te parece útil poder guardar y compartir este resumen?')
    .setChoiceValues(['Sí', 'No'])
    .setRequired(true);

  // A25b
  form.addTextItem()
    .setTitle('¿Qué más te gustaría que incluyera?')
    .setRequired(false);

  // A26
  form.addParagraphTextItem()
    .setTitle('¿Qué le cambiarías o agregarías a Itinera?')
    .setRequired(false);

  // Página 12: Tu taller y promociones
  const pbS8 = form.addPageBreakItem().setTitle('Tu taller y promociones');

  // A27
  form.addMultipleChoiceItem()
    .setTitle('¿Te gustaría que tu taller de confianza pudiera recordarte por medio de la app cuando te toque servicio?')
    .setChoiceValues(['Sí', 'No', 'No tengo un taller fijo'])
    .setRequired(true);

  form.addSectionHeaderItem()
    .setTitle('')
    .setHelpText(
      'Más adelante, cuando te toque un servicio, la app podría mostrarte una promoción pagada de una refaccionaria o taller cerca de ti. Muestras un código en el mostrador y obtienes el descuento. Itinera no califica ni certifica a los negocios.'
    );

  insertarCaptura(5);

  // A28
  form.addMultipleChoiceItem()
    .setTitle('¿Usarías una promoción así cuando te toque servicio?')
    .setChoiceValues(['Sí', 'Depende del descuento o del lugar', 'No'])
    .setRequired(true);

  // Página 13: Pago
  const pbS9 = form.addPageBreakItem().setTitle('Pago');

  // A29
  const itemA29 = form.addMultipleChoiceItem()
    .setTitle('¿Estarías dispuesto(a) a pagar por usar una app como Itinera?')
    .setRequired(true);

  // Página 14: Cuánto pagarías
  const pbS9b = form.addPageBreakItem().setTitle('Cuánto pagarías');

  // A30
  form.addMultipleChoiceItem()
    .setTitle('¿Cuánto pagarías al mes como máximo?')
    .setChoiceValues([
      'Menos de $20',
      '$20 a $34',
      '$35 a $49',
      '$50 a $74',
      '$75 o más'
    ])
    .setRequired(true);

  // A30b
  form.addMultipleChoiceItem()
    .setTitle('¿Cómo preferirías pagar?')
    .setChoiceValues([
      'Cada mes',
      'Una vez al año',
      'Un solo pago'
    ])
    .setRequired(true);

  // Página 15: Si no pagarías
  const pbS9c = form.addPageBreakItem().setTitle('Si no pagarías');

  // A31a
  form.addMultipleChoiceItem()
    .setTitle('¿La usarías si fuera gratis?')
    .setChoiceValues(['Sí', 'No'])
    .setRequired(true);

  // A31b
  form.addMultipleChoiceItem()
    .setTitle('¿Pagarías solo por funciones extra, como llevar varias motos o guardar tu información en la nube?')
    .setChoiceValues(['Sí', 'No'])
    .setRequired(true);

  // Página 16: Promociones a cambio de usarla gratis
  const pbS9d = form.addPageBreakItem().setTitle('Promociones a cambio de usarla gratis');

  // A32
  form.addMultipleChoiceItem()
    .setTitle('¿Aceptarías ver promociones de negocios de tu zona a cambio de usar la app gratis?')
    .setChoiceValues(['Sí', 'No'])
    .setRequired(true);

  // Página 17: Cómo conocer la app y recibir ayuda
  const pbS10 = form.addPageBreakItem().setTitle('Cómo conocer la app y recibir ayuda');

  // A33
  form.addCheckboxItem()
    .setTitle('¿Cómo te enteras normalmente de aplicaciones nuevas?')
    .setHelpText('puedes marcar varias')
    .setChoiceValues([
      'Me la recomiendan conocidos o compañeros',
      'Grupos de motociclistas en Facebook o WhatsApp',
      'Redes sociales o videos cortos',
      'Buscando en la tienda de aplicaciones',
      'Un cartel o código QR en el taller o refaccionaria'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // A34
  form.addMultipleChoiceItem()
    .setTitle('Si tuvieras una duda o problema con la app, ¿por dónde te gustaría recibir ayuda?')
    .setChoiceValues([
      'Ayuda y preguntas frecuentes dentro de la app',
      'WhatsApp',
      'Videos cortos de cómo usarla',
      'Correo electrónico',
      'Redes sociales'
    ])
    .setRequired(true);

  // Página 18: Tu celular
  const pbS11 = form.addPageBreakItem().setTitle('Tu celular');

  // A35
  form.addMultipleChoiceItem()
    .setTitle('¿Qué celular usas?')
    .setChoiceValues([
      'Android (Samsung, Motorola, Xiaomi, Oppo u otro)',
      'Huawei',
      'iPhone',
      'No tengo celular inteligente'
    ])
    .setRequired(true);

  // A36
  form.addMultipleChoiceItem()
    .setTitle('¿Desde dónde descargas tus aplicaciones?')
    .setChoiceValues([
      'Google Play',
      'App Store (iPhone)',
      'Tienda de la marca del celular (AppGallery, Galaxy Store u otra)',
      'No descargo aplicaciones'
    ])
    .setRequired(true);

  // A37
  form.addTextItem()
    .setTitle('Si quieres probar Itinera gratis antes que nadie, déjanos tu WhatsApp o correo.')
    .setHelpText('Solo lo usaremos para invitarte a la prueba piloto.')
    .setRequired(false);

  // =========================================================================
  // PASADA 2: CONFIGURACIÓN DE SALTOS Y RAMIFICACIONES
  // =========================================================================

  // A0: Sí → CONTINUE, No → SUBMIT
  itemA0.setChoices([
    itemA0.createChoice('Sí', FormApp.PageNavigationType.CONTINUE),
    itemA0.createChoice('No', FormApp.PageNavigationType.SUBMIT)
  ]);

  // A2: Menor de 18 años → SUBMIT, resto → CONTINUE
  itemA2.setChoices([
    itemA2.createChoice('Menor de 18 años', FormApp.PageNavigationType.SUBMIT),
    itemA2.createChoice('18 a 24', FormApp.PageNavigationType.CONTINUE),
    itemA2.createChoice('25 a 34', FormApp.PageNavigationType.CONTINUE),
    itemA2.createChoice('35 a 44', FormApp.PageNavigationType.CONTINUE),
    itemA2.createChoice('45 a 59', FormApp.PageNavigationType.CONTINUE),
    itemA2.createChoice('60 o más', FormApp.PageNavigationType.CONTINUE)
  ]);

  // A21: Definitivamente sí, Probablemente sí, No estoy seguro(a) → pbS6; Probablemente no, Definitivamente no → pbS5b
  itemA21.setChoices([
    itemA21.createChoice('Definitivamente sí', pbS6),
    itemA21.createChoice('Probablemente sí', pbS6),
    itemA21.createChoice('No estoy seguro(a)', pbS6),
    itemA21.createChoice('Probablemente no', pbS5b),
    itemA21.createChoice('Definitivamente no', pbS5b)
  ]);

  // Al terminar pbS5b (Por qué no la usarías) salta a pbS11 (Tu celular)
  pbS6.setGoToPage(pbS11);

  // A23: Sí → pbS6b, No → pbS6c
  itemA23.setChoices([
    itemA23.createChoice('Sí', pbS6b),
    itemA23.createChoice('No', pbS6c)
  ]);

  // Al terminar pbS6b (Anticipación del aviso) salta a pbS7 (Bitácora y resumen)
  pbS6c.setGoToPage(pbS7);

  // A29: Sí, Depende del precio → pbS9b; No → pbS9c
  itemA29.setChoices([
    itemA29.createChoice('Sí', pbS9b),
    itemA29.createChoice('Depende del precio', pbS9b),
    itemA29.createChoice('No', pbS9c)
  ]);

  // Al terminar pbS9b (Cuánto pagarías) salta a pbS9d (Promociones a cambio de usarla gratis)
  pbS9c.setGoToPage(pbS9d);

  Logger.log('Editar Instrumento A: ' + form.getEditUrl());
  Logger.log('Responder Instrumento A: ' + form.getPublishedUrl());
}
