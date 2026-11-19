# Estudio de Mercado — Proyecto Itinera

Universidad Veracruzana — Licenciatura en Ingeniería de Software
Experiencia Educativa: Economía para la Toma de Decisiones
Proyecto: Itinera | Ciudad piloto: Xalapa, Veracruz | Fecha: noviembre de 2026
Integrantes: Gerardo Abraham Barrón Gómez, Edgar Vázquez García, Alberto Villalba Figueroa

## Objetivo del estudio

Validar la viabilidad de mercado, conductual y comercial de Itinera en Xalapa, Veracruz. Itinera es una aplicación Android de almacenamiento local en el dispositivo (local-first) y baja fricción enfocada en el seguimiento preventivo de cinco consumibles críticos en motocicletas de 125 a 250 cc: aceite de motor, kit de arrastre o cadena, frenos o balatas, bujía y llantas. En su Fase 0 el producto mínimo viable opera de manera gratuita ($0 MXN) e incluye un resumen exportable sin costo; en Fase 1 incorpora un modelo B2B de promociones locales trazables en mostrador para refaccionarias y talleres independientes, sin exigir certificación mecánica presencial en campo.

En el segmento de conductores (B2C), el estudio busca cuantificar la proporción de propietarios-operadores de motos 125–250 cc que usan Android en Xalapa, distinguir entre quienes recorren de 50 a más de 100 km al día y quienes hacen traslados urbanos moderados de 15 a 49 km diarios, y medir la incidencia de odómetros o chicotes rotos, abandono de libretas, auto-mantenimiento y gastos imprevistos. También evalúa la aceptación de la confirmación semanal en un toque (menos de cinco segundos), las alertas limitadas a umbrales Amarillo y Rojo, el semáforo de desgaste y la disposición a canjear cupones locales cuando el modelo gratuito se mantiene en $0 MXN.

En el frente de oferta, canales y precios, el estudio contrasta a Itinera frente a aplicaciones como Drivvo, Fuelio y MotoLog, así como frente a libretas, etiquetas de taller y notas en el teléfono, verificando si tres plantillas editables y un registro rápido menor a 15 segundos evitan el abandono. Además, identifica canales de adquisición de bajo costo —búsqueda orgánica en Google Play Store, boca a boca y códigos QR en mostrador— y explora en refaccionarias y talleres locales su ticket promedio, sus valles de demanda y la aceptación de pautas locales de $299 a $499 MXN al mes o pagos por cupón canjeado en caja de $20 a $40 MXN.

## Metodología y fuentes secundarias

El proyecto opera como una plataforma asimétrica de dos lados, por lo que adopta un diseño metodológico mixto con dos instrumentos independientes. Para los motociclistas de 125 a 250 cc se aplica un enfoque cuantitativo mediante una encuesta cerrada de 14 reactivos en Google Forms, orientada a estimar proporciones con rigor estadístico sobre el parque circulante de Xalapa. Para las refaccionarias y talleres locales se emplea un enfoque cualitativo-exploratorio mediante una entrevista presencial estructurada de 9 preguntas en mostrador, dado que el número de establecimientos es acotado y el objetivo de Fase 1 es comprender márgenes, estacionalidad y objeciones comerciales con quienes toman decisiones de precio.

### Fuentes oficiales e indicadores de contexto

Las cifras oficiales del parque vehicular muestran una expansión sostenida del motociclismo utilitario. Según la estadística de Vehículos de Motor Registrados en Circulación (VMRC) del INEGI, en 2025 se registraron 10,547,500 motocicletas en México (16.1% del parque nacional y 17.8% más que las 8,953,446 unidades de 2024) y 664,867 en el estado de Veracruz (quinto lugar nacional, 29.0% arriba de las 515,288 de 2024). A escala municipal, el VMRC reporta 232,680 vehículos totales en Xalapa al cierre de 2024, mientras que el último desglose municipal abierto indexado por CEIEG/INEGI contabilizó 23,159 motocicletas en 2021 (22,720 particulares y 439 oficiales).

Para reflejar la operación real de 2026 —incluyendo el crecimiento reciente y unidades que circulan sin emplacamiento local—, este estudio toma la estimación del Departamento de Movilidad Urbana del Ayuntamiento de Xalapa (octubre-noviembre de 2026), que sitúa el parque circulante en alrededor de 40,000 motocicletas y reporta 273 colisiones con motocicleta de 804 siniestros viales totales entre enero y octubre de 2026 junto con el conteo ciudadano Physis Ciclovida. En el lado comercial, el directorio DENUE del INEGI (edición 05/2026, municipio 30087) registra cerca de 35 talleres especializados en reparación y mantenimiento de motocicletas (SCIAN 811492), complementados por refaccionarias y comercios minoristas (SCIAN 468311). En tecnología móvil, StatCounter Global Stats ubica la participación de Android en México en 74.11% frente a 25.89% de iOS entre octubre de 2025 y octubre de 2026, tras haber alcanzado 89.13% en el año completo 2024.

### Contraste con competidores digitales y sustitutos analógicos

En Google Play México existen alternativas centradas en finanzas vehiculares o conducción recreativa que generan fricción para el usuario utilitario de 125 a 250 cc. Drivvo ofrece un plan gratuito con anuncios a pantalla completa limitado a dos vehículos, exige crear cuenta y cobra suscripciones anuales cercanas a $174.90–$499.90 MXN; su enfoque contable obliga a capturar cada carga de gasolina y gasto, lo que provoca abandono cuando el conductor solo busca no olvidar el aceite o la cadena. Fuelio es gratuita en Android y sin anuncios (con suscripción Premium opcional de $4.99 a $15.99 USD al año), pero gira en torno al consumo de combustible y no permite registrar lecturas aisladas de odómetro sin asociarlas a una recarga o gasto.

Por su parte, aplicaciones como MotoLog y MotoriLog apuntan a motociclistas de gama media-alta mediante bitácoras por número de serie (VIN), rutas GPS o diagnósticos complejos, asumiendo tableros en buen estado. Frente a ellas, la mayoría de conductores recurre a libretas en guantera, etiquetas de taller, notas sueltas en WhatsApp o la memoria; estos medios analógicos se pierden o mojan, no suman kilómetros de forma automática y no emiten alertas anticipadas antes de que ocurra la falla mecánica. Itinera cubre ese vacío con captura semanal en un toque, proyección temporal cuando el odómetro está averiado y cero dependencia de servidores en Fase 0.

## Instrumentos de recolección primaria

### Instrumento A: encuesta para motociclistas 125–250 cc

El cuestionario está diseñado para aplicarse en dos a tres minutos mediante Google Forms, de forma anónima y con fines exclusivamente académicos. Los dos primeros reactivos funcionan como filtro muestral para asegurar la validez del perfil en Xalapa.

1. ¿Conduces actualmente una motocicleta de entre 125 cc y 250 cc en Xalapa o zona conurbada, y de quién es la unidad?
   ☐ Sí, 125–250 cc de mi propiedad (continúa a la pregunta 2)
   ☐ Sí, 125–250 cc propiedad de mi empresa o patrón (termina encuesta MVP B2C)
   ☐ Conduzco otra cilindrada menor a 125 cc o mayor a 250 cc (termina encuesta)
   ☐ No conduzco motocicleta (termina encuesta)

2. ¿Qué sistema operativo utiliza tu teléfono celular principal con el que descargas aplicaciones?
   ☐ Android (Google Play Store)
   ☐ iOS (iPhone / App Store)
   ☐ Otro o no utilizo teléfono inteligente para aplicaciones

3. ¿Cuál es tu actividad principal con la moto y cuántos kilómetros recorres aproximadamente al día?
   ☐ Uso intensivo o trabajo propio (reparto en plataformas, mensajería independiente o trayectos largos): 50 a 100+ km/día
   ☐ Traslado cotidiano moderado (trabajo o universidad): 20 a 49 km/día
   ☐ Uso ligero u ocasional: menos de 20 km/día

4. ¿Cómo funciona actualmente el odómetro o velocímetro (chicote) de tu motocicleta?
   ☐ Funciona correctamente y marca el kilometraje real
   ☐ Está descompuesto (chicote roto, tablero apagado o marca de forma intermitente)
   ☐ No me fijo en el odómetro; calculo el servicio al tanteo o por semanas

5. En los últimos 12 meses, ¿con cuál de estos cinco consumibles has sufrido una falla imprevista, desgaste acelerado o gasto sorpresa por no haberlo revisado a tiempo? (Selección múltiple)
   ☐ Aceite de motor (bajo nivel, degradación o daño al motor)
   ☐ Kit de arrastre o cadena (destensada, seca, rotura o desgaste de sprockets)
   ☐ Frenos o balatas (ruido, pérdida de frenado o daño al disco o tambor)
   ☐ Bujía (fallas de encendido o pérdida de potencia)
   ☐ Llantas (desgaste liso, grietas o derrapes por baja adherencia)
   ☐ Ninguno; siempre cambio todo a tiempo

6. ¿Cómo controlas actualmente cuándo te toca realizar el siguiente servicio o cambio de refacciones?
   ☐ De memoria (cuando siento que suena raro o falla)
   ☐ Anotado en una libreta, ticket de papel o etiqueta del taller
   ☐ En notas del celular o chat propio de WhatsApp
   ☐ Con una aplicación móvil (por ejemplo Drivvo, Fuelio, MotoLog u otra)
   ☐ El taller o la agencia me avisa

7. Cuando realizas mantenimiento preventivo a tu moto, ¿dónde lo atiendes con mayor frecuencia? Adicionalmente, en escala de 1 (nunca) a 5 (muy frecuente), ¿qué tan seguido sientes desconfianza ante posibles sobreprecios o diagnósticos poco claros al pedir presupuesto en un taller?
   ☐ Yo mismo realizo los cambios básicos en casa (aceite, cadena, bujía, etc.)
   ☐ Acudo siempre a un taller mecánico independiente o refaccionaria con servicio
   ☐ Combinado (hago lo básico en casa y lo complejo en taller)

8. Si una aplicación te enviara una sola notificación ligera a la semana en tu pantalla de bloqueo ("¿Esta semana rodaste ~X km? [Sí, igual] [Ajustar]") que toma menos de 5 segundos, ¿qué tan probable sería que la uses de forma constante frente a una aplicación que te pida registrar datos cada vez que cargas gasolina?
   ☐ Muy probable; prefiero un toque por semana (< 5 s) que anotar cada carga de gasolina
   ☐ Algo probable; la probaría si no requiere abrir formularios largos
   ☐ Poco probable; prefiero registrar cada carga de gasolina o gasto manualmente
   ☐ Nada probable; no usaría ninguna aplicación

9. ¿Con qué frecuencia aceptarías recibir avisos de mantenimiento de la aplicación sin llegar a silenciarla o desinstalarla?
   ☐ Únicamente alertas clave cuando falte poco para un servicio (Amarillo) o cuando ya sea urgente (Rojo)
   ☐ Recordatorios diarios o varios avisos por semana
   ☐ Prefiero no recibir notificaciones y entrar solo cuando me acuerde

10. ¿Qué tan útil consideras ver un semáforo simple (Verde, Amarillo y Rojo) que te avise en Amarillo (alrededor de 2 semanas o 300 km antes) para poder juntar el dinero del aceite o las balatas sin gastos sorpresa? (Escala de 1 = nada útil a 5 = muy útil)

11. ¿Para qué utilizarías principalmente un resumen exportable gratuito del historial de servicios de tu moto (con fechas, piezas cambiadas y costos)?
    ☐ Para consultar rápidamente qué se le cambió la última vez y evitar que me vendan piezas repetidas en el taller
    ☐ Para respaldar el historial de cuidados al momento de vender o transferir la motocicleta
    ☐ Para llevar mi control personal de cuánto gasto al año en mi moto
    ☐ No le veo utilidad práctica

12. Para usar una aplicación móvil en tu motocicleta personal (1 unidad) con bitácora, semáforo de desgaste, alertas y resumen exportable, ¿cuál esquema estarías dispuesto a utilizar?
    ☐ Únicamente si el núcleo básico es 100% gratuito ($0 MXN)
    ☐ Pagaría una suscripción mensual baja ($30–$49 MXN/mes) incluso teniendo 1 sola moto
    ☐ Pagaría solo si tuviera 3 o más vehículos y necesitara respaldo en la nube

13. Cuando el semáforo te avise que tu moto está próxima a requerir cambio de aceite, balatas o kit de arrastre (Amarillo o Rojo), ¿canjearías un cupón de descuento (por ejemplo 10–15% o revisión gratuita) de una refaccionaria o taller cercano en Xalapa mostrando un código en mostrador?
    ☐ Sí, definitivamente lo usaría si el comercio queda cerca de mi ruta y el descuento es real
    ☐ Tal vez, dependiendo del precio final y la reputación del lugar
    ☐ No, prefiero ir siempre con mi mecánico habitual aunque no haya descuento

14. ¿Por cuál medio sueles descubrir y descargar aplicaciones o herramientas nuevas para tu motocicleta?
    ☐ Buscando directamente en Google Play Store (por ejemplo "mantenimiento moto", "cambio de aceite")
    ☐ Recomendación boca a boca de otros motociclistas, compañeros de reparto o grupos y clubes locales
    ☐ Código QR o anuncio físico en el mostrador de la refaccionaria o taller donde compro mis piezas
    ☐ Redes sociales o videos cortos

### Instrumento B: entrevista para refaccionarias y talleres locales

El guion está previsto para visitas presenciales de 10 a 12 minutos en corredores viales de Xalapa (Av. Lázaro Cárdenas, Blvd. Adolfo Ruiz Cortines, Av. 20 de Noviembre y zona Revolución/Rafael Lucio), registrando fecha, nombre del negocio, giro (refaccionaria, taller independiente o mixto), colonia y cargo del entrevistado (dueño o encargado).

1. Aproximadamente, ¿cuántos clientes propietarios de motocicletas de trabajo o urbanas (125–250 cc, como Italika, Bajaj, Honda o Vento) atienden al mes en su mostrador o bahía de servicio, y qué proporción son repartidores frente a particulares?
2. ¿Cuál es el ticket promedio en pesos mexicanos (refacción y/o mano de obra) que suele dejar un cliente 125–250 cc en cambio de aceite, frenos o balatas, kit de arrastre o cadena, bujía o afinación menor, y llantas?
3. ¿En qué días de la semana o épocas del mes nota una baja en la afluencia de clientes donde más le convendría atraer motociclistas adicionales?
4. Actualmente, ¿cómo atrae nuevos clientes motociclistas a su negocio (ubicación a pie de calle, recomendación, Google Maps, volantes, Facebook) y cuánto invierte al mes en promoción?
5. Desde su experiencia en taller o mostrador, ¿qué porcentaje aproximado de sus clientes ocasionales deja pasar demasiado tiempo antes de regresar por cambio de aceite o cadena, llegando cuando la pieza ya falló o comprando de emergencia en otro sitio?
6. Imagine una aplicación gratuita usada por motociclistas de Xalapa que les avisa unos 300 km antes de requerir aceite, frenos o cadena. Si mostrara un cupón promocional de su negocio solo a usuarios cercanos en ese momento para canjearlo en caja (sin que la plataforma audite ni certifique su taller en campo), ¿qué tan útil le parecería para comprobar si la publicidad realmente le llevó ventas? (Escala 1 a 5 y comentarios)
7. Si participara cuando la aplicación supere los 1,000 a 2,000 usuarios activos en Xalapa, ¿qué esquema comercial le daría mayor confianza: una pauta mensual local accesible ($299–$499 MXN/mes), pago exclusivo por cupón efectivamente redimido en caja ($20–$40 MXN por venta comprobada) o ninguno? ¿Qué descuento o incentivo máximo en mostrador le resultaría rentable ofrecer sin sacrificar margen?
8. Para que sus clientes actuales recuerden regresar a tiempo a su negocio, ¿estaría dispuesto a colocar un pequeño letrero con código QR en su mostrador para que descarguen gratis la aplicación de recordatorios?
9. ¿Qué requisito indispensable —como comprobante de canje, simplicidad sin instalar software en caja, exclusividad de zona o reportes mensuales— necesitaría ver para probar un piloto durante un mes?

## Universo y muestreo

### Embudo de demanda en Xalapa

El mercado potencial parte de las aproximadamente 40,000 motocicletas en circulación estimadas en Xalapa en 2026 (con cota mínima censal oficial de 23,159 unidades en 2021 y 664,867 motocicletas registradas en Veracruz en 2025). Al aplicar la participación conservadora de Android en México (74.11% en StatCounter 2025–2026), el mercado disponible asciende a cerca de 29,644 conductores compatibles con el producto mínimo viable, con un techo cercano a 35,652 unidades si se toma el 89.13% observado en 2024.

El tercer nivel, mercado cualificado disponible, filtra a propietarios-operadores dueños de su propia motocicleta 125–250 cc con teléfono Android, excluyendo flotillas patronales y otras cilindradas; su proporción exacta se medirá con los dos primeros reactivos de la encuesta. Sobre ese conjunto se define el mercado meta: en el lado B2C, una cohorte prioritaria de uso intensivo (50 a 100+ km/día) junto con un segmento secundario de traslado urbano moderado (15 a 49 km/día); en el lado B2B de Fase 1 —activado tras superar de 1,000 a 2,000 usuarios activos mensuales—, los cerca de 35 talleres especializados (SCIAN 811492) más las refaccionarias locales (SCIAN 468311). Finalmente, el mercado actual o piloto semestral consistirá en una cohorte controlada de conductores intensivos para validar la retención de la confirmación semanal en un toque y el cierre de al menos un ciclo de servicio (2,500 km en 3 a 6 semanas).

### Cálculo de muestra y estrategia de campo

Para dimensionar la encuesta B2C sobre el parque circulante de Xalapa se utiliza la fórmula de muestreo para universo finito:

n = (z^2 * N * p * q) / [e^2 * (N - 1) + z^2 * p * q]

Con un universo N = 40,000 motocicletas, nivel de confianza de 95% (z = 1.96), margen de error de ±5% (e = 0.05) y varianza máxima conservadora (p = q = 0.50), el numerador resulta en 3.8416 * 40,000 * 0.25 = 38,416 y el denominador en 0.0025 * 39,999 + 0.9604 = 100.9579. El cociente arroja 380.52, por lo que se requieren 381 encuestas válidas. Si se toma como base el mercado disponible Android (29,644) la muestra cambia apenas a 380 encuestas, y con la cota censal oficial de 2021 (23,159) a 378 encuestas. En caso de restricción de tiempo en el calendario semestral, un margen de error de ±7% reduce el requerimiento a 196 encuestas y uno exploratorio de ±10% a 96 encuestas.

Dado que no existe un padrón nominal público para sorteo aleatorio simple, la aplicación del Instrumento A seguirá un muestreo estratificado por cuotas en puntos de alta afluencia de Xalapa (Av. Lázaro Cárdenas, Circuito Presidentes, Av. Xalapa / Zona Universitaria, Av. 20 de Noviembre y bases de repartidores independientes), buscando al menos 50% de encuestados de uso intensivo (50–100+ km/día) y hasta 50% de uso moderado o ligero (< 50 km/día). Para el segmento B2B se aplicará muestreo por juicio con 10 a 15 entrevistas presenciales a dueños o encargados en cuatro zonas comerciales clave, ya que una fórmula probabilística sobre 35 talleres exigiría casi un censo sin aportar mayor valor decisorio antes de alcanzar la masa crítica de Fase 1.

## Resultados esperados, matriz FODA y proyecciones

Al cierre de esta etapa metodológica, el levantamiento en campo de ambos instrumentos permanece pendiente, por lo que no se reportan resultados empíricos ni estimaciones simuladas. Una vez recolectados y tabulados los datos, la sección de resultados medirá en el lado B2C la tasa real de elegibilidad (propiedad 125–250 cc y Android), la distribución por kilometraje diario, el porcentaje de odómetros o chicotes dañados, la frecuencia de fallas imprevistas en los cinco consumibles, el grado de desconfianza hacia talleres, la preferencia por la confirmación semanal en un toque y el semáforo de desgaste, el uso esperado del resumen exportable gratuito, la sensibilidad a $0 MXN frente a suscripciones, la intención de canje de cupones en mostrador y los canales de descubrimiento. En el lado B2B se documentará el volumen mensual atendido, el ticket promedio por consumible, los valles estacionales, la pérdida de recurrencia, la aceptación del cupón contextual sin auditoría física, el esquema preferido de cobro, la disposición a exhibir códigos QR y las condiciones mínimas para probar un piloto.

| Origen | Factores positivos | Factores negativos |
| :--- | :--- | :--- |
| Interno (producto y equipo) | Fortalezas: arquitectura Android local-first sin costo de servidores en Fase 0, confirmación semanal en un toque (< 5 s) y regla dual tiempo/kilometraje que opera incluso con odómetro averiado. | Debilidades: ausencia inicial de versión iOS (prevista para Fase 2) y cobertura basada en tres plantillas editables en lugar de un catálogo exhaustivo por modelo y año. |
| Externo (mercado de Xalapa) | Oportunidades: parque en rápido crecimiento (~40,000 motos locales; +29.0% anual en Veracruz en 2025) y brecha clara frente a aplicaciones centradas en gasto de gasolina. | Amenazas: hábito arraigado de operar sin registro hasta que ocurre la falla, competencia consolidada en descargas globales y posible fatiga ante notificaciones. |

### Proyecciones hacia los estudios posteriores

En el Estudio Técnico, los resultados de campo confirmarán si las tres plantillas base (urbana, trabajo/uso rudo y personalizada) y sus intervalos de referencia (2,000–2,500 km para aceite y 400–500 km para cadena) cubren a la mayoría de motocicletas encuestadas, si una prevalencia de odómetro averiado superior al 25%–30% obliga a priorizar el flujo de odómetro relativo con proyección temporal, y qué versión mínima de Android predomina en el segmento para fijar la compatibilidad de la base de datos SQLite local.

En el Estudio Económico-Financiero, la respuesta de disposición a pagar verificará que el ingreso B2C de Fase 0 debe mantenerse en $0 MXN (con costos acotados a la licencia única de Google Play de $25 USD), mientras que el ticket promedio, el margen de descuento tolerable y la tarifa aceptada en mostrador ($299–$499 MXN/mes o CPA por cupón canjeado) permitirán modelar sin supuestos arbitrarios el punto de equilibrio de Fase 1 una vez superados de 1,000 a 2,000 usuarios activos mensuales.

En el Modelo de Negocio (Business Model Canvas) y el Estudio Organizacional, la evidencia de campo determinará qué componente explica mejor la retención —la confirmación semanal en un toque, las alertas Amarillo y Rojo o el resumen exportable gratuito—, ponderará el peso entre Google Play, recomendación boca a boca y códigos QR en mostrador, y confirmará la viabilidad de afiliar comercios mediante cupones trazables sin auditoría presencial. Con ello se verificará si el equipo de tres ingenieros puede sostener la Fase 0 en autoservicio estricto sin mesa de ayuda ni gestión diaria de redes sociales, y cuántas horas semanales demandará la prospección comercial de Fase 1 sin comprometer el desarrollo del producto.

## Referencias

### Fuentes secundarias e institucionales

1. Instituto Nacional de Estadística y Geografía (INEGI) (2025). Vehículos de motor registrados en circulación (VMRC) — Estadística anual 2023, 2024 y 2025 (Nacional y Veracruz). https://www.inegi.org.mx/programas/vehiculosmotor/
2. Instituto Nacional de Estadística y Geografía (INEGI) (2026). Directorio Estadístico Nacional de Unidades Económicas (DENUE), Edición 05/2026 — Claves SCIAN 811492 y 468311, Municipio 30087 Xalapa, Veracruz. https://www.inegi.org.mx/app/mapa/denue/default.aspx
3. Comité Estatal de Información Estadística y Geográfica de Veracruz (CEIEG / SEFIPLAN) (2022–2026). Cuadernillos Municipales e Información Estadística — Municipio de Xalapa (desglose municipal de motocicletas 2021). https://www.ceieg.veracruz.gob.mx/cuadernillos-municipales/
4. Departamento de Movilidad Urbana del Ayuntamiento de Xalapa y Organización Physis Ciclovida (octubre–noviembre de 2026). Estimación del parque circulante de motocicletas en Xalapa (~40,000 unidades) y conteo de siniestralidad vial enero–octubre 2026 (prensa estatal: Diario de Xalapa / OEM, Libertad Bajo Palabra, e-veracruz).
5. Directorio DENUE Sectorial — Talleres de Motos México (2026). Establecimientos de reparación y mantenimiento de motocicletas en Xalapa, Veracruz (SCIAN 811492). https://www.talleresdemotos.com/
6. StatCounter Global Stats (2024–2026). Mobile Operating System Market Share Mexico (año completo 2024 y octubre 2025 – octubre 2026). https://gs.statcounter.com/os-market-share/mobile/mexico
7. Drivvo — CTN Cardoso (2026). Drivvo – Control de gastos de vehículos: planes, tarifas México y reseñas en Google Play. https://www.drivvo.com/es-MX/ y https://play.google.com/store/apps/details?id=br.com.ctncardoso.ctncar
8. Fuelio — Sygic (2026). Fuelio: precios del combustible y control de gastos/mantenimiento en Google Play. https://fuel.io/ y https://play.google.com/store/apps/details?id=com.kajda.fuelio
9. MotoLog / MotorApp (2026). Aplicaciones de bitácora y registro de kilometraje para motocicletas en Google Play. https://www.motorapp.net/

### Material académico de la asignatura

10. Sánchez Morales, A. de J. (2022). Estudio de Mercado — Economía para la Toma de Decisiones [Material didáctico de cátedra]. Facultad de Estadística e Informática, Universidad Veracruzana. (Basado en Espinoza, 2022; IONOS Startupguide, 2022; Vagary, s. f.).
11. García Morales, D. (2022). Estudio de mercado [Material didáctico de cátedra]. Universidad Veracruzana. (Basado en Editorial Grudemi, 2022; Luminos, s. f.; QuestionPro, s. f.; Molero, s. f.).
