/**
 * Generador en Google Apps Script para el Instrumento B (Formulario para Talleres y Refaccionarias B2B).
 *
 * INSTRUCCIONES PARA LAS CAPTURAS DEL PROTOTIPO:
 * Para que el formulario inserte automáticamente las imágenes del prototipo (tickets 005/006),
 * sube los archivos `prototype/captures/captura-2.png`, `captura-5.png` y `captura-6.png` a tu
 * Google Drive, obtén el enlace para compartir de cada uno y pega abajo el ID del archivo
 * (la cadena que aparece en el enlace entre `/d/` y `/view`). Si dejas un ID vacío (''), el
 * script insertará un encabezado marcador de posición para que subas la imagen manualmente en
 * Google Forms.
 */
const CAPTURAS_B_DRIVE_IDS = { 2: '', 5: '', 6: '' };

function crearFormularioTalleresItinera() {
  const form = FormApp.create('Itinera: formulario para talleres y refaccionarias de Xalapa');
  form.setDescription(
    'Somos estudiantes de Ingeniería de Software de la Universidad Veracruzana. Diseñamos Itinera, una aplicación gratuita que avisa a los motociclistas cuándo le toca servicio a su moto. Queremos conocer cómo trabaja su negocio y qué opina de una forma de atraer clientes con la app. Sus respuestas son confidenciales y con fines académicos.\nLo llena el encuestador en el mostrador con el dueño o encargado.'
  );
  form.setProgressBar(true);
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(false);
  form.setPublishingSummary(false);
  form.setShowLinkToRespondAgain(true);
  form.setConfirmationMessage('Gracias. Sus respuestas nos ayudan a diseñar Itinera.');

  const piesCaptura = {
    2: 'El semáforo te dice qué está bien, para qué ir juntando y qué ya toca.',
    5: 'Más adelante: promociones de negocios cercanos cuando te toca servicio.',
    6: 'Desde su celular comprueba cada cliente y ve cuántos llegaron por la app.'
  };

  function insertarCaptura(n) {
    const id = CAPTURAS_B_DRIVE_IDS[n];
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

  // Página 1 (first page): Su negocio
  // B1
  form.addMultipleChoiceItem()
    .setTitle('¿Qué tipo de negocio es?')
    .setChoiceValues([
      'Taller de motos',
      'Refaccionaria',
      'Taller y refaccionaria'
    ])
    .setRequired(true);

  // B2
  form.addMultipleChoiceItem()
    .setTitle('¿Qué puesto tiene usted?')
    .setChoiceValues([
      'Dueño(a)',
      'Encargado(a)',
      'Empleado(a)'
    ])
    .setRequired(true);

  // B3
  form.addMultipleChoiceItem()
    .setTitle('¿Cuántas personas trabajan en el negocio?')
    .setChoiceValues([
      '1',
      '2 o 3',
      '4 a 6',
      '7 o más'
    ])
    .setRequired(true);

  // B4
  form.addTextItem()
    .setTitle('¿En qué colonia o zona está el negocio?')
    .setRequired(true);

  // B5
  form.addMultipleChoiceItem()
    .setTitle('En el mostrador, ¿usan celular o computadora para el negocio?')
    .setChoiceValues([
      'Celular',
      'Computadora',
      'Ambos',
      'Ninguno'
    ])
    .setRequired(true);

  // Página 2: Clientes y servicios
  const pbS2 = form.addPageBreakItem().setTitle('Clientes y servicios');

  // B6
  form.addMultipleChoiceItem()
    .setTitle('Aproximadamente, ¿cuántos clientes con moto atienden al mes?')
    .setChoiceValues([
      'Menos de 50',
      '50 a 100',
      '101 a 200',
      '201 a 400',
      'Más de 400'
    ])
    .setRequired(true);

  // B7
  const itemB7 = form.addMultipleChoiceItem()
    .setTitle('¿Sabe más o menos cuántos de sus clientes son repartidores y cuántos particulares?')
    .setRequired(true);

  // Página 3: Cómo se reparten sus clientes
  const pbS2b = form.addPageBreakItem().setTitle('Cómo se reparten sus clientes');

  // B8
  form.addMultipleChoiceItem()
    .setTitle('¿Cómo se reparten?')
    .setChoiceValues([
      'La mayoría son repartidores',
      'Mitad y mitad',
      'La mayoría son particulares'
    ])
    .setRequired(true);

  // Página 4: Servicios y temporadas
  const pbS2c = form.addPageBreakItem().setTitle('Servicios y temporadas');

  // B9
  const valMax3 = FormApp.createCheckboxValidation()
    .setHelpText('Elija máximo tres.')
    .requireSelectAtMost(3)
    .build();

  form.addCheckboxItem()
    .setTitle('¿Cuáles son los tres servicios que más le piden en motos?')
    .setHelpText('máximo tres')
    .setChoiceValues([
      'Cambio de aceite',
      'Cadena o kit de arrastre',
      'Banda de motoneta',
      'Frenos o balatas',
      'Afinación o bujía',
      'Llantas',
      'Parte eléctrica',
      'Reparación de motor'
    ])
    .showOtherOption(true)
    .setValidation(valMax3)
    .setRequired(true);

  // B10
  form.addMultipleChoiceItem()
    .setTitle('¿Cuánto cobra normalmente por un cambio de aceite con mano de obra en una moto de trabajo?')
    .setChoiceValues([
      'Menos de $150',
      '$150 a $249',
      '$250 a $349',
      '$350 a $499',
      '$500 o más'
    ])
    .setRequired(false);

  // B11
  form.addMultipleChoiceItem()
    .setTitle('¿En qué parte del mes llegan más clientes?')
    .setChoiceValues([
      'Primera semana',
      'Alrededor de la quincena',
      'Fin de mes',
      'Es igual todo el mes'
    ])
    .setRequired(true);

  // B12
  form.addMultipleChoiceItem()
    .setTitle('¿En qué parte del mes llegan menos clientes?')
    .setChoiceValues([
      'Primera semana',
      'Alrededor de la quincena',
      'Fin de mes',
      'Es igual todo el mes'
    ])
    .setRequired(true);

  // B13
  form.addCheckboxItem()
    .setTitle('¿Qué meses del año son más flojos?')
    .setHelpText('puede marcar varios')
    .setChoiceValues([
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
      'Es igual todo el año'
    ])
    .setRequired(true);

  // Página 5: Recordatorios a sus clientes
  const pbS3 = form.addPageBreakItem().setTitle('Recordatorios a sus clientes');

  // B14
  const itemB14 = form.addMultipleChoiceItem()
    .setTitle('¿Tiene alguna forma de recordar a sus clientes cuándo les toca servicio?')
    .setRequired(true);

  // Página 6: Su forma de recordar
  const pbS3b = form.addPageBreakItem().setTitle('Su forma de recordar');

  // B15
  form.addMultipleChoiceItem()
    .setTitle('¿Cuál?')
    .setChoiceValues([
      'Etiqueta o sticker en la moto',
      'Mensaje de WhatsApp o llamada',
      'Libreta o registro',
      'Un programa o sistema'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // B16
  form.addMultipleChoiceItem()
    .setTitle('Con ese recordatorio, ¿sus clientes regresan a tiempo?')
    .setChoiceValues([
      'Casi siempre',
      'A veces',
      'Casi nunca'
    ])
    .setRequired(true);

  // Página 7: Regreso de clientes
  const pbS3c = form.addPageBreakItem().setTitle('Regreso de clientes');

  // B17
  form.addMultipleChoiceItem()
    .setTitle('Normalmente, ¿cuánto tiempo de más dejan pasar sus clientes antes de regresar por su servicio?')
    .setChoiceValues([
      'Llegan a tiempo',
      'Una o dos semanas de más',
      'Un mes o más',
      'Hasta que algo falla'
    ])
    .setRequired(true);

  // Página 8: Conozca Itinera
  const pbS4 = form.addPageBreakItem()
    .setTitle('Conozca Itinera')
    .setHelpText(
      'Itinera es gratis para el motociclista. Cuando a su moto le toca aceite, frenos o cadena, la app le avisa. Cuando la app tenga suficientes usuarios en Xalapa, en ese momento podrá mostrarle una promoción pagada de su negocio. El cliente enseña un código en su mostrador, usted lo comprueba desde su celular y a fin de mes ve cuántos clientes llegaron por la app. Itinera no califica ni certifica talleres.'
    );

  insertarCaptura(2);
  insertarCaptura(5);
  insertarCaptura(6);

  // B18
  form.addMultipleChoiceItem()
    .setTitle('¿Le parece adecuada esta forma de atraer clientes?')
    .setChoiceValues(['Sí', 'No'])
    .setRequired(true);

  // Comentarios
  form.addTextItem()
    .setTitle('Comentarios')
    .setRequired(false);

  // Página 9: Forma de pago
  const pbS5 = form.addPageBreakItem().setTitle('Forma de pago');

  // B19
  const itemB19 = form.addMultipleChoiceItem()
    .setTitle('¿Estaría dispuesto(a) a invertir en promocionar su negocio dentro de Itinera para atraer clientes nuevos?')
    .setRequired(true);

  // Página 10: Por qué no
  const pbS5b = form.addPageBreakItem().setTitle('Por qué no');

  // B20
  form.addTextItem()
    .setTitle('¿Por qué no?')
    .setRequired(true);

  // Página 11: Formas de pago
  const pbS5c = form.addPageBreakItem()
    .setTitle('Formas de pago')
    .setHelpText(
      'Los primeros clientes que lleguen a su negocio con código serían gratis, como prueba. Después usted elegiría una de dos formas de pago: una cuota fija al mes, o pagar solo por cada cliente que llegue con su código y compre.'
    );

  // B21
  const itemB21 = form.addMultipleChoiceItem()
    .setTitle('¿Cuál le conviene más?')
    .setRequired(true);

  // Página 12: Cuota fija al mes
  const pbS5d = form.addPageBreakItem().setTitle('Cuota fija al mes');

  // B22
  form.addMultipleChoiceItem()
    .setTitle('¿Cuánto pagaría al mes como máximo?')
    .setChoiceValues([
      'Menos de $150',
      '$150 a $299',
      '$300 a $499',
      '$500 a $799',
      '$800 o más'
    ])
    .setRequired(true);

  // Página 13: Pago por cliente
  const pbS5e = form.addPageBreakItem().setTitle('Pago por cliente');

  // B23
  form.addMultipleChoiceItem()
    .setTitle('¿Cuánto pagaría por cada cliente que llegue con su código y compre?')
    .setChoiceValues([
      'Menos de $10',
      '$10 a $19',
      '$20 a $39',
      '$40 a $59',
      '$60 o más'
    ])
    .setRequired(true);

  // Página 14: Descuento y prueba
  const pbS5f = form.addPageBreakItem().setTitle('Descuento y prueba');

  // B24
  form.addMultipleChoiceItem()
    .setTitle('¿Qué descuento o beneficio podría ofrecer a esos clientes sin perder?')
    .setChoiceValues([
      '5%',
      '10%',
      '15% o más',
      'Revisión gratis'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // B25
  form.addMultipleChoiceItem()
    .setTitle('¿Cuántos clientes gratis necesitaría ver llegar para decidir si continúa?')
    .setChoiceValues([
      '5',
      '10',
      '20',
      'Más de 20'
    ])
    .setRequired(true);

  // Página 15: Dar a conocer la app
  const pbS6 = form.addPageBreakItem().setTitle('Dar a conocer la app');

  // B26
  form.addMultipleChoiceItem()
    .setTitle('¿Le parece adecuado poner un cartel con código QR o compartir un enlace para que sus clientes descarguen la app gratis?')
    .setChoiceValues(['Sí', 'No'])
    .setRequired(true);

  // B27
  form.addCheckboxItem()
    .setTitle('¿Por qué otros medios la daría a conocer?')
    .setHelpText('puede marcar varios')
    .setChoiceValues([
      'WhatsApp de sus clientes',
      'Redes sociales del negocio',
      'En la nota o ticket',
      'Sticker en la moto del cliente',
      'De palabra'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // Página 16: Prueba de un mes
  const pbS7 = form.addPageBreakItem().setTitle('Prueba de un mes');

  // B28
  const valExact3 = FormApp.createCheckboxValidation()
    .setHelpText('Elija exactamente tres.')
    .requireSelectExactly(3)
    .build();

  form.addCheckboxItem()
    .setTitle('De estos beneficios, elija los tres más importantes para probar Itinera un mes.')
    .setChoiceValues([
      'No instalar nada en caja',
      'Comprobante de cada cliente que llegó por la app',
      'Reporte mensual de clientes',
      'Promoción solo para motociclistas de su zona',
      'Poder cancelar cuando quiera',
      'Recordatorio a sus propios clientes de su próximo servicio'
    ])
    .setValidation(valExact3)
    .setRequired(true);

  // B29
  form.addTextItem()
    .setTitle('¿Qué otra función le gustaría?')
    .setRequired(true);

  // B30
  form.addMultipleChoiceItem()
    .setTitle('¿Pagaría un poco más por esa función?')
    .setChoiceValues(['Sí', 'No', 'Depende'])
    .setRequired(true);

  // Página 17: Cierre
  const pbS8 = form.addPageBreakItem().setTitle('Cierre');

  // B31
  form.addMultipleChoiceItem()
    .setTitle('Si le interesa participar en la prueba piloto, ¿por qué medio prefiere que lo contactemos?')
    .setChoiceValues([
      'WhatsApp',
      'Llamada',
      'Visita',
      'Correo',
      'No me interesa participar'
    ])
    .setRequired(true);

  // =========================================================================
  // PASADA 2: CONFIGURACIÓN DE SALTOS Y RAMIFICACIONES
  // =========================================================================

  // B7: Sí → pbS2b, No → pbS2c
  itemB7.setChoices([
    itemB7.createChoice('Sí', pbS2b),
    itemB7.createChoice('No', pbS2c)
  ]);

  // B14: Sí → pbS3b, No → pbS3c
  itemB14.setChoices([
    itemB14.createChoice('Sí', pbS3b),
    itemB14.createChoice('No', pbS3c)
  ]);

  // B19: Sí, Tal vez → pbS5c; No → pbS5b
  itemB19.setChoices([
    itemB19.createChoice('Sí', pbS5c),
    itemB19.createChoice('Tal vez', pbS5c),
    itemB19.createChoice('No', pbS5b)
  ]);

  // Al terminar pbS5b (Por qué no) salta a pbS6 (Dar a conocer la app)
  pbS5c.setGoToPage(pbS6);

  // B21: Cuota fija al mes → pbS5d; Pagar por cada cliente que llegue y compre → pbS5e; Ninguna, No sé → pbS5f
  itemB21.setChoices([
    itemB21.createChoice('Cuota fija al mes', pbS5d),
    itemB21.createChoice('Pagar por cada cliente que llegue y compre', pbS5e),
    itemB21.createChoice('Ninguna', pbS5f),
    itemB21.createChoice('No sé', pbS5f)
  ]);

  // Al terminar pbS5d (Cuota fija al mes) salta a pbS5f (Descuento y prueba)
  pbS5e.setGoToPage(pbS5f);

  Logger.log('Editar Instrumento B: ' + form.getEditUrl());
  Logger.log('Responder Instrumento B: ' + form.getPublishedUrl());
}
