import { intervalosDePlantilla } from '../domain/catalogo'
import { isoLocal, sumarDias } from '../domain/fechas'
import { tasaDia } from '../domain/reglas'
import type { Referencias, Registro, TareaId, Vehiculo } from '../domain/types'

/** Única fecha de referencia del prototipo: todos los datos de prueba son desfases desde aquí. */
export const DEMO_TODAY: string = isoLocal(new Date())

/** Ejemplo del valor `N` de la prueba por volumen (lo calibrará el reactivo B25). */
export const PRUEBA_CLIENTES_GRATIS = 10

export const CODIGO_DEMO = 'ITN-482'

export interface Preferencias {
  mostrarPromociones: boolean
  alertas: 'ambas' | 'rojo'
  checkinDia: string
  checkinHora: string
}

export interface DemoComercio {
  comprobados: number
  vieron: number
  llegaron: number
  usados: string[]
}

export interface EstadoApp {
  vehiculo: Vehiculo | null
  registros: Registro[]
  prefs: Preferencias
  comercio: DemoComercio
}

const LECTURA_TABLERO = 12_400
const LECTURA_HACE_DIAS = 7

/** Días desde el último servicio de cada tarea (ticket 005, tabla de seed). */
export const DESFASES: Record<TareaId, number> = {
  aceite: 52,
  'cadena-corta': 16,
  'cadena-cambio': 160,
  frenos: 40,
  bujia: 60,
  llantas: 120,
  'cvt-corta': 30,
  'cvt-cambio': 200,
}

export function prefsIniciales(): Preferencias {
  return { mostrarPromociones: true, alertas: 'ambas', checkinDia: 'domingo', checkinHora: '19:00' }
}

export function comercioInicial(): DemoComercio {
  return { comprobados: 4, vieron: 18, llegaron: 7, usados: [] }
}

export function crearSeed(hoy: string = DEMO_TODAY): EstadoApp {
  const tasa = tasaDia('R3', '5-6')
  // Odómetro de cada servicio pasado, proyectado hacia atrás desde la lectura de tablero.
  const odoHace = (dias: number) => Math.round(LECTURA_TABLERO - tasa * (dias - LECTURA_HACE_DIAS))
  const referencias = Object.fromEntries(
    (Object.keys(DESFASES) as TareaId[]).map((t) => [
      t,
      { fecha: sumarDias(hoy, -DESFASES[t]), odo: odoHace(DESFASES[t]) },
    ]),
  ) as Referencias

  const vehiculo: Vehiculo = {
    apodo: 'Mi FT150',
    tipo: 'calle',
    transmision: 'cadena',
    plantilla: 'urbana',
    rutina: 'R3',
    dias: '5-6',
    tasaManual: null,
    odometroFunciona: true,
    kmBase: LECTURA_TABLERO,
    kmBaseFecha: sumarDias(hoy, -LECTURA_HACE_DIAS),
    checkins: [],
    intervalos: intervalosDePlantilla('urbana'),
    referencias,
    taller: 'Taller Ejemplo',
  }

  const registro = (
    id: string, tarea: TareaId, modalidad: 'yo' | 'taller', costo: number, nota: string, foto = false,
  ): Registro => ({
    id,
    fecha: referencias[tarea].fecha,
    tareas: [tarea],
    otro: false,
    tipo: 'preventivo',
    modalidad,
    taller: modalidad === 'taller' ? 'Taller Ejemplo' : '',
    odo: referencias[tarea].odo,
    costo,
    nota,
    foto,
  })

  const registros: Registro[] = [
    registro('r-aceite', 'aceite', 'taller', 320, 'Aceite 20W-50 mineral', true),
    registro('r-cadena', 'cadena-corta', 'yo', 60, 'Lubricante en aerosol y ajuste de tensión'),
    registro('r-frenos', 'frenos', 'taller', 280, 'Balatas delanteras'),
    registro('r-bujia', 'bujia', 'yo', 95, ''),
  ]

  return { vehiculo, registros, prefs: prefsIniciales(), comercio: comercioInicial() }
}
