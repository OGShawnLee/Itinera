function crearFormulariosItinera() {
  // =========================================================================
  // INSTRUMENTO A: ENCUESTA MOTOCICLISTAS 125-250 CC (XALAPA)
  // =========================================================================
  const formA = FormApp.create('Itinera - Estudio de Mercado (Motociclistas 125-250 cc)');
  formA.setDescription(
    'Cuestionario anónimo con fines exclusivamente académicos (Facultad de Estadística e Informática, UV). ' +
    'Tiempo estimado: 3 a 5 minutos. Objetivo: validar hábitos de mantenimiento preventivo en motocicletas de 125 a 250 cc en Xalapa, Veracruz.'
  );
  formA.setProgressBar(true);

  // --- SECCIÓN 1: FILTRO MUESTRAL ---
  const q1 = formA.addMultipleChoiceItem()
    .setTitle('1. ¿Conduces actualmente una motocicleta de entre 125 cc y 250 cc en Xalapa o zona conurbada, y de quién es la unidad?')
    .setRequired(true);

  const secFiltroSO = formA.addPageBreakItem().setTitle('Perfil Tecnológico');
  const q2 = formA.addMultipleChoiceItem()
    .setTitle('2. ¿Qué sistema operativo utiliza tu teléfono celular principal con el que descargas aplicaciones?')
    .setRequired(true);

  const secPrincipal = formA.addPageBreakItem().setTitle('Hábitos de Uso y Mantenimiento');

  // Configurar saltos de filtro (Q1 y Q2)
  q1.setChoices([
    q1.createChoice('Sí, 125-250 cc de mi propiedad', secFiltroSO),
    q1.createChoice('Sí, 125-250 cc propiedad de mi empresa o patrón', FormApp.PageNavigationType.SUBMIT),
    q1.createChoice('Conduzco otra cilindrada menor a 125 cc o mayor a 250 cc', FormApp.PageNavigationType.SUBMIT),
    q1.createChoice('No conduzco motocicleta', FormApp.PageNavigationType.SUBMIT)
  ]);

  q2.setChoices([
    q2.createChoice('Android (Google Play Store)', secPrincipal),
    q2.createChoice('iOS (iPhone / App Store)', FormApp.PageNavigationType.SUBMIT),
    q2.createChoice('Otro o no utilizo teléfono inteligente para aplicaciones', FormApp.PageNavigationType.SUBMIT)
  ]);

  // --- SECCIÓN PRINCIPAL (REACTIVOS 3 AL 14) ---
  formA.addMultipleChoiceItem()
    .setTitle('3. ¿Cuál es tu actividad principal con la moto y cuántos kilómetros recorres aproximadamente al día?')
    .setChoiceValues([
      'Uso intensivo o trabajo propio (reparto en plataformas, mensajería independiente o trayectos largos): 50 a 100+ km/día',
      'Traslado cotidiano moderado (trabajo o universidad): 20 a 49 km/día',
      'Uso ligero u ocasional: menos de 20 km/día'
    ])
    .setRequired(true);

  formA.addMultipleChoiceItem()
    .setTitle('4. ¿Cómo funciona actualmente el odómetro o velocímetro (chicote) de tu motocicleta?')
    .setChoiceValues([
      'Funciona correctamente y marca el kilometraje real',
      'Está descompuesto (chicote roto, tablero apagado o marca de forma intermitente)',
      'No me fijo en el odómetro; calculo el servicio al tanteo o por semanas'
    ])
    .setRequired(true);

  formA.addCheckboxItem()
    .setTitle('5. En los últimos 12 meses, ¿con cuál de estos cinco consumibles has sufrido una falla imprevista, desgaste acelerado o gasto sorpresa por no haberlo revisado a tiempo? (Selección múltiple)')
    .setChoiceValues([
      'Aceite de motor (bajo nivel, degradación o daño al motor)',
      'Kit de arrastre o cadena (destensada, seca, rotura o desgaste de sprockets)',
      'Frenos o balatas (ruido, pérdida de frenado o daño al disco o tambor)',
      'Bujía (fallas de encendido o pérdida de potencia)',
      'Llantas (desgaste liso, grietas o derrapes por baja adherencia)',
      'Ninguno; siempre cambio todo a tiempo'
    ])
    .setRequired(true);

  formA.addMultipleChoiceItem()
    .setTitle('6. ¿Cómo controlas actualmente cuándo te toca realizar el siguiente servicio o cambio de refacciones?')
    .setChoiceValues([
      'De memoria (cuando siento que suena raro o falla)',
      'Anotado en una libreta, ticket de papel o etiqueta del taller',
      'En notas del celular o chat propio de WhatsApp',
      'Con una aplicación móvil (por ejemplo, Drivvo, Fuelio, MotoLog u otra)',
      'El taller o la agencia me avisa'
    ])
    .setRequired(true);

  // Pregunta 7 dividida en 7a (lugar) y 7b (escala de desconfianza) para compatibilidad en Google Forms
  formA.addMultipleChoiceItem()
    .setTitle('7a. Cuando realizas mantenimiento preventivo a tu moto, ¿dónde lo atiendes con mayor frecuencia?')
    .setChoiceValues([
      'Yo mismo realizo los cambios básicos en casa (aceite, cadena, bujía, etc.)',
      'Acudo siempre a un taller mecánico independiente o refaccionaria con servicio',
      'Combinado (hago lo básico en casa y lo complejo en taller)'
    ])
    .setRequired(true);

  formA.addScaleItem()
    .setTitle('7b. ¿Qué tan seguido sientes desconfianza ante posibles sobreprecios o diagnósticos poco claros al pedir presupuesto en un taller?')
    .setBounds(1, 5)
    .setLabels('1 = Nunca', '5 = Muy frecuente')
    .setRequired(true);

  formA.addMultipleChoiceItem()
    .setTitle('8. Si una aplicación te enviara una sola notificación ligera a la semana en tu pantalla de bloque ("¿Esta semana rodaste ~X km? [Sí, igual] [Ajustar]") que toma menos de 5 segundos, ¿qué tan probable sería que la uses de forma constante frente a una aplicación que te pida registrar datos cada vez que cargas gasolina?')
    .setChoiceValues([
      'Muy probable; prefiero un toque por semana (< 5 s) que anotar cada carga de gasolina',
      'Algo probable; la probaría si no requiere abrir formularios largos',
      'Poco probable; prefiero registrar cada carga de gasolina o gasto manualmente',
      'Nada probable; no usaría ninguna aplicación'
    ])
    .setRequired(true);

  formA.addMultipleChoiceItem()
    .setTitle('9. ¿Con qué frecuencia aceptarías recibir avisos de mantenimiento de la aplicación sin llegar a silenciarla o desinstalarla?')
    .setChoiceValues([
      'Únicamente alertas clave cuando falte poco para un servicio (Amarillo) o cuando ya sea urgente (Rojo)',
      'Recordatorios diarios o varios avisos por semana',
      'Prefiero no recibir notificaciones y entrar solo cuando me acuerde'
    ])
    .setRequired(true);

  formA.addScaleItem()
    .setTitle('10. ¿Qué tan útil consideras ver un semáforo simple (Verde, Amarillo y Rojo) que te avise en Amarillo (alrededor de 2 semanas o 300 km antes) para poder juntar el dinero del aceite o las balatas sin gastos sorpresa?')
    .setBounds(1, 5)
    .setLabels('1 = Nada útil', '5 = Muy útil')
    .setRequired(true);

  formA.addMultipleChoiceItem()
    .setTitle('11. ¿Para qué utilizarías principalmente un resumen exportable gratuito del historial de servicios de tu moto (con fechas, piezas cambiadas y costos)?')
    .setChoiceValues([
      'Para consultar rápidamente qué se le cambió la última vez y evitar que me vendan piezas repetidas en el taller',
      'Para respaldar el historial de cuidados al momento de vender o transferir la motocicleta',
      'Para llevar mi control personal de cuánto gasto al año en mi moto',
      'No le veo utilidad práctica'
    ])
    .setRequired(true);

  formA.addMultipleChoiceItem()
    .setTitle('12. Para usar una aplicación móvil en tu motocicleta personal (1 unidad) con bitácora, semáforo de desgaste, alertas y resumen exportable, ¿cuál esquema estarías dispuesto a utilizar?')
    .setChoiceValues([
      'Únicamente si el núcleo básico es 100% gratuito ($0 MXN)',
      'Pagaría una suscripción mensual baja ($30-$49 MXN/mes) incluso teniendo 1 sola moto',
      'Pagaría solo si tuviera 3 o más vehículos y necesitara respaldo en la nube'
    ])
    .setRequired(true);

  formA.addMultipleChoiceItem()
    .setTitle('13. Cuando el semáforo te avise que tu moto está próxima a requerir cambio de aceite, balatas o kit de arrastre (Amarillo o Rojo), ¿canjearías un cupón de descuento (por ejemplo 10-15% o revisión gratuita) de una refaccionaria o taller cercano en Xalapa mostrando un código en mostrador?')
    .setChoiceValues([
      'Sí, definitivamente lo usaría si el comercio queda cerca de mi ruta y el descuento es real',
      'Tal vez, dependiendo del precio final y la reputación del lugar',
      'No, prefiero ir siempre con mi mecánico habitual, aunque no haya descuento'
    ])
    .setRequired(true);

  formA.addMultipleChoiceItem()
    .setTitle('14. ¿Por cuál medio sueles descubrir y descargar aplicaciones o herramientas nuevas para tu motocicleta?')
    .setChoiceValues([
      'Buscando directamente en Google Play Store (por ejemplo "mantenimiento moto", "cambio de aceite")',
      'Recomendación boca a boca de otros motociclistas, compañeros de reparto o grupos y clubes locales',
      'Código QR o anuncio físico en el mostrador de la refaccionaria o taller donde compro mis piezas',
      'Redes sociales o videos cortos'
    ])
    .setRequired(true);

  // =========================================================================
  // INSTRUMENTO B: CAPTURA DE ENTREVISTA PARA REFACCIONARIAS Y TALLERES
  // =========================================================================
  const formB = FormApp.create('Itinera - Guía de Entrevista B2B (Talleres y Refaccionarias Xalapa)');
  formB.setDescription(
    'Instrumento de captura en campo (10 a 12 min) en corredores viales de Xalapa ' +
    '(Av. Lázaro Cárdenas, Blvd. Adolfo Ruiz Cortines, Av. 20 de Noviembre y zona Revolución/Rafael Lucio).'
  );

  // Ficha de identificación
  formB.addDateItem().setTitle('Fecha de la entrevista').setRequired(true);
  formB.addTextItem().setTitle('Nombre del negocio').setRequired(true);
  formB.addMultipleChoiceItem()
    .setTitle('Giro del establecimiento')
    .setChoiceValues(['Refaccionaria', 'Taller independiente', 'Mixto (Refaccionaria y taller)'])
    .setRequired(true);
  formB.addTextItem().setTitle('Colonia / Corredor vial').setRequired(true);
  formB.addMultipleChoiceItem()
    .setTitle('Cargo del entrevistado')
    .setChoiceValues(['Dueño', 'Encargado', 'Otro'])
    .setRequired(true);

  // 9 preguntas de entrevista
  formB.addParagraphTextItem()
    .setTitle('1. Aproximadamente, ¿cuántos clientes propietarios de motocicletas de trabajo o urbanas (125-250 cc, como Italika, Bajaj, Honda o Vento) atienden al mes en su mostrador o bahía de servicio, y qué proporción son repartidores frente a particulares?')
    .setRequired(true);

  formB.addParagraphTextItem()
    .setTitle('2. ¿Cuál es el ticket promedio en pesos mexicanos (refacción y/o mano de obra) que suele dejar un cliente 125-250 cc en: cambio de aceite, frenos/balatas, kit de arrastre/cadena, bujía/afinación menor y llantas?')
    .setRequired(true);

  formB.addParagraphTextItem()
    .setTitle('3. ¿En qué días de la semana o épocas del mes nota una baja en la afluencia de clientes donde más le convendría atraer motociclistas adicionales?')
    .setRequired(true);

  formB.addParagraphTextItem()
    .setTitle('4. Actualmente, ¿cómo atrae nuevos clientes motociclistas a su negocio (ubicación a pie de calle, recomendación, Google Maps, volantes, Facebook) y cuánto invierte al mes en promoción?')
    .setRequired(true);

  formB.addParagraphTextItem()
    .setTitle('5. Desde su experiencia en taller o mostrador, ¿qué porcentaje aproximado de sus clientes ocasionales deja pasar demasiado tiempo antes de regresar por cambio de aceite o cadena, llegando cuando la pieza ya falló o comprando de emergencia en otro sitio?')
    .setRequired(true);

  formB.addScaleItem()
    .setTitle('6a. Imagine una aplicación gratuita usada por motociclistas de Xalapa que les avisa unos 300 km antes de requerir aceite, frenos o cadena. Si mostrara un cupón promocional de su negocio solo a usuarios cercanos en ese momento para canjearlo en caja (sin que la plataforma audite ni certifique su taller en campo), ¿qué tan útil le parecería para comprobar si la publicidad realmente le llevó ventas?')
    .setBounds(1, 5)
    .setLabels('1 = Nada útil', '5 = Muy útil')
    .setRequired(true);

  formB.addParagraphTextItem()
    .setTitle('6b. Comentarios u observaciones sobre el cupón contextual sin auditoría presencial:');

  formB.addMultipleChoiceItem()
    .setTitle('7a. Si participara cuando la aplicación supere los 1,000 a 2,000 usuarios activos en Xalapa, ¿qué esquema comercial le daría mayor confianza?')
    .setChoiceValues([
      'Pauta mensual local accesible ($299-$499 MXN/mes)',
      'Pago exclusivo por cupón efectivamente redimido en caja ($20-$40 MXN por venta comprobada)',
      'Ninguno'
    ])
    .setRequired(true);

  formB.addParagraphTextItem()
    .setTitle('7b. ¿Qué descuento o incentivo máximo en mostrador le resultaría rentable ofrecer sin sacrificar margen?')
    .setRequired(true);

  formB.addMultipleChoiceItem()
    .setTitle('8. Para que sus clientes actuales recuerden regresar a tiempo a su negocio, ¿estaría dispuesto a colocar un pequeño letrero con código QR en su mostrador para que descarguen gratis la aplicación de recordatorios?')
    .setChoiceValues(['Sí, sin problema', 'Tal vez / Lo pensaría', 'No'])
    .setRequired(true);

  formB.addParagraphTextItem()
    .setTitle('9. ¿Qué requisito indispensable —como comprobante de canje, simplicidad sin instalar software en caja, exclusividad de zona o reportes mensuales— necesitaría ver para probar un piloto durante un mes?')
    .setRequired(true);

  Logger.log('=== ENLACES INSTRUMENTO A (MOTOCICLISTAS) ===');
  Logger.log('Editar: ' + formA.getEditUrl());
  Logger.log('Compartir (Público): ' + formA.getPublishedUrl());
  Logger.log('');
  Logger.log('=== ENLACES INSTRUMENTO B (TALLERES Y REFACCIONARIAS) ===');
  Logger.log('Editar: ' + formB.getEditUrl());
  Logger.log('Compartir (Público): ' + formB.getPublishedUrl());
}
