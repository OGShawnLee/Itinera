import type {
  Dias, Intervalos, ItemId, PlantillaId, Rutina, TareaId, TipoMoto, Transmision,
} from './types'

/** DOMAIN.md §5.1 — redacción idéntica a A11 y al Paso 2. */
export const RUTINAS: { id: Rutina; titulo: string; detalle: string; corta: string }[] = [
  { id: 'R1', titulo: 'Traslados cortos dentro de mi zona', detalle: '(1 o 2 viajes al día)', corta: 'Traslados cortos' },
  { id: 'R2', titulo: 'Cruzo la ciudad de ida y vuelta', detalle: '(escuela o trabajo)', corta: 'Cruzo la ciudad' },
  { id: 'R3', titulo: 'Varios viajes en el día', detalle: '(trabajo, mandados o clientes)', corta: 'Varios viajes al día' },
  { id: 'R4', titulo: 'Reparto o uso continuo casi todo el día', detalle: '', corta: 'Reparto casi todo el día' },
]

export const DIAS_OPCIONES: { id: Dias; titulo: string }[] = [
  { id: '1-2', titulo: '1 o 2 días' },
  { id: '3-4', titulo: '3 o 4 días' },
  { id: '5-6', titulo: '5 o 6 días' },
  { id: 'todos', titulo: 'Todos los días' },
]

export function rutinaEnPalabras(rutina: Rutina, dias: Dias): string {
  const r = RUTINAS.find((x) => x.id === rutina)!.corta
  const d = dias === 'todos' ? 'todos los días' : DIAS_OPCIONES.find((x) => x.id === dias)!.titulo
  return `${r}, ${d}`
}

export const TIPOS_MOTO: { id: TipoMoto; titulo: string; detalle: string; transmision: Transmision }[] = [
  { id: 'motoneta', titulo: 'Motoneta automática', detalle: 'Scooter, sin cambios', transmision: 'CVT' },
  { id: 'calle', titulo: 'De calle o de trabajo', detalle: 'Con cambios', transmision: 'cadena' },
  { id: 'doble', titulo: 'Doble propósito', detalle: 'Calle y terracería', transmision: 'cadena' },
  { id: 'deportiva', titulo: 'Deportiva o alta cilindrada', detalle: 'Más de 250 cc', transmision: 'cadena' },
]

export function tipoMotoTitulo(t: TipoMoto): string {
  return TIPOS_MOTO.find((x) => x.id === t)!.titulo
}

export const NOMBRE_TRANSMISION: Record<Transmision, string> = { cadena: 'Cadena', CVT: 'Banda CVT' }

/** DOMAIN.md §5.5. Un mes = 30 días. */
const URBANA: Intervalos = {
  aceite: { km: 2500, dias: 90 },
  'cadena-corta': { km: 500, dias: 15 },
  'cadena-cambio': { km: 15000, dias: null },
  'cvt-corta': { km: 6000, dias: 180 },
  'cvt-cambio': { km: 15000, dias: 720 },
  frenos: { km: 6000, dias: 180 },
  bujia: { km: 5000, dias: 180 },
  llantas: { km: 15000, dias: 540 },
}

const TRABAJO: Intervalos = {
  aceite: { km: 2000, dias: 60 },
  'cadena-corta': { km: 400, dias: 10 },
  'cadena-cambio': { km: 12000, dias: null },
  'cvt-corta': { km: 4000, dias: 120 },
  'cvt-cambio': { km: 12000, dias: 540 },
  frenos: { km: 4500, dias: 120 },
  bujia: { km: 4000, dias: 120 },
  llantas: { km: 12000, dias: 360 },
}

export const PLANTILLAS: { id: PlantillaId; titulo: string; resumen: string; intervalos: Intervalos }[] = [
  { id: 'urbana', titulo: 'Moto Urbana', resumen: 'Para 110 a 250 cc. Aceite cada 3 meses o antes si la usas mucho.', intervalos: URBANA },
  { id: 'trabajo', titulo: 'Moto Trabajo / Uso Rudo', resumen: 'Para reparto y uso diario intenso. Aceite cada 2 meses o antes.', intervalos: TRABAJO },
  // "Editable desde cero": arranca con los valores urbanos como punto de partida editable.
  { id: 'personalizada', titulo: 'Personalizada', resumen: 'Tú pones cada intervalo. Sirve también para más de 250 cc.', intervalos: URBANA },
]

export function intervalosDePlantilla(id: PlantillaId): Intervalos {
  const p = PLANTILLAS.find((x) => x.id === id)!
  return structuredClone(p.intervalos)
}

export function plantillaTitulo(id: PlantillaId): string {
  return PLANTILLAS.find((x) => x.id === id)!.titulo
}

export const ITEMS: ItemId[] = ['aceite', 'transmision', 'frenos', 'bujia', 'llantas']

export function tareasDeItem(item: ItemId, t: Transmision): TareaId[] {
  if (item === 'transmision') return t === 'cadena' ? ['cadena-corta', 'cadena-cambio'] : ['cvt-corta', 'cvt-cambio']
  return [item]
}

export function itemDeTarea(tarea: TareaId): ItemId {
  if (tarea.startsWith('cadena') || tarea.startsWith('cvt')) return 'transmision'
  return tarea as ItemId
}

export function nombreItem(item: ItemId, t: Transmision): string {
  switch (item) {
    case 'aceite': return 'Aceite de motor'
    case 'transmision': return NOMBRE_TRANSMISION[t]
    case 'frenos': return 'Frenos (balatas)'
    case 'bujia': return 'Bujía'
    case 'llantas': return 'Llantas'
  }
}

/** Nombre corto para chips y filtros. */
export function nombreCortoItem(item: ItemId, t: Transmision): string {
  switch (item) {
    case 'aceite': return 'Aceite'
    case 'transmision': return NOMBRE_TRANSMISION[t]
    case 'frenos': return 'Frenos'
    case 'bujia': return 'Bujía'
    case 'llantas': return 'Llantas'
  }
}

export const NOMBRE_TAREA: Record<TareaId, string> = {
  aceite: 'Cambio de aceite',
  'cadena-corta': 'Lubricación y ajuste',
  'cadena-cambio': 'Cambio de kit',
  'cvt-corta': 'Inspección',
  'cvt-cambio': 'Reemplazo de banda y rodillos',
  frenos: 'Cambio o revisión de balatas',
  bujia: 'Cambio de bujía',
  llantas: 'Revisión de llantas',
}

/** Etiqueta de servicio para bitácora y resumen. */
export function nombreServicio(tarea: TareaId): string {
  switch (tarea) {
    case 'aceite': return 'Aceite de motor'
    case 'cadena-corta': return 'Cadena: lubricación y ajuste'
    case 'cadena-cambio': return 'Cadena: cambio de kit'
    case 'cvt-corta': return 'Banda CVT: inspección'
    case 'cvt-cambio': return 'Banda CVT: reemplazo de banda y rodillos'
    case 'frenos': return 'Frenos (balatas)'
    case 'bujia': return 'Bujía'
    case 'llantas': return 'Llantas'
  }
}

/** ROUTES.md §4.C.6: 3–4 viñetas universales en lenguaje cotidiano. */
export function vinetas(item: ItemId, t: Transmision): string[] {
  switch (item) {
    case 'aceite':
      return [
        'Revisa el nivel con la moto derecha y el motor frío.',
        'Si el aceite se ve negro y espeso, ya está gastado.',
        'Aunque la uses poco, el aceite se echa a perder con el tiempo.',
      ]
    case 'transmision':
      return t === 'cadena'
        ? [
            'Presiónala con el dedo: si baja mucho, está floja.',
            'Óxido o eslabones secos piden lubricación.',
            'Si los dientes del sprocket se ven en punta, toca cambiar el kit.',
          ]
        : [
            'Jaloneo o patinazo al arrancar es señal de desgaste.',
            'Ruido o vibración en la tapa del variador.',
            'Si pierdes velocidad final, revisa banda y rodillos.',
            'La banda trabaja en seco: no lleva aceite ni grasa. Para verla hay que abrir la tapa, normalmente en taller.',
          ]
    case 'frenos':
      return [
        'Ruido metálico al frenar indica balatas gastadas.',
        'Si la palanca o el pedal llegan hasta el fondo, revísalos ya.',
        'Frenar en bajada con lluvia gasta más rápido las balatas.',
      ]
    case 'bujia':
      return [
        'Si le cuesta arrancar en frío, la bujía puede estar gastada.',
        'Tironeo al acelerar o más consumo de gasolina.',
        'Es de las piezas más baratas: cámbiala a tiempo.',
      ]
    case 'llantas':
      return [
        'Revisa la presión cada semana, con las llantas frías.',
        'Si el dibujo ya casi no se ve, cámbialas.',
        'Grietas a los lados indican llanta reseca.',
      ]
  }
}
