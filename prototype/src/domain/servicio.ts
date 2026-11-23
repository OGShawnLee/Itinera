import { intervalosDePlantilla, TIPOS_MOTO } from './catalogo'
import { diferenciaDias, sumarDias } from './fechas'
import { tasaDia } from './reglas'
import type {
  Dias, PlantillaId, Referencias, Registro, Rutina, TareaId, TipoMoto, Transmision, Vehiculo,
} from './types'
import { kmProyectado, tasaBase } from './vehiculo'

const TODAS: TareaId[] = [
  'aceite', 'cadena-corta', 'cadena-cambio', 'cvt-corta', 'cvt-cambio', 'frenos', 'bujia', 'llantas',
]

/** Agrega un registro. Si el odómetro funciona y la lectura vino del tablero, actualiza Km_base. */
export function agregarRegistro(
  v: Vehiculo, registros: readonly Registro[], r: Registro, odoDelTablero: boolean,
): { vehiculo: Vehiculo; registros: Registro[] } {
  let vehiculo = v
  if (odoDelTablero && v.odometroFunciona && r.fecha >= v.kmBaseFecha) {
    vehiculo = confirmarTablero(v, r.odo, r.fecha)
  }
  return { vehiculo, registros: [...registros, r] }
}

/** Lectura real del tablero: recalibra la tasa suavemente con la media móvil y fija Km_base. */
export function confirmarTablero(v: Vehiculo, lectura: number, hoy: string): Vehiculo {
  const dt = diferenciaDias(v.kmBaseFecha, hoy)
  const checkins = [...v.checkins]
  if (dt >= 3 && lectura >= v.kmBase) {
    const observada = (lectura - v.kmBase) / dt
    const factor = Math.min(2, Math.max(0, observada / tasaBase(v)))
    checkins.push(Number(factor.toFixed(3)))
  }
  return { ...v, kmBase: lectura, kmBaseFecha: hoy, checkins }
}

/** Check-in semanal: la semana entra a la media móvil con su factor (0, 0.5, 1 o 1.5). */
export function aplicarCheckin(v: Vehiculo, factor: number, hoy: string): Vehiculo {
  // La proyección se "cierra" hoy para que el factor afecte solo lo que sigue.
  const base = kmProyectado(v, hoy)
  return {
    ...v,
    kmBase: v.odometroFunciona ? v.kmBase : base,
    kmBaseFecha: v.odometroFunciona ? v.kmBaseFecha : hoy,
    checkins: [...v.checkins, factor],
  }
}

export type UltimoAceite = 'reciente' | 'mitad' | 'pronto' | 'no-recuerdo'

export const FRACCION_ACEITE: Record<UltimoAceite, number> = {
  reciente: 0,
  mitad: 0.5,
  pronto: 0.85,
  'no-recuerdo': 0,
}

export interface DatosOnboarding {
  apodo: string
  tipo: TipoMoto
  transmision: Transmision
  plantilla: PlantillaId
  rutina: Rutina
  dias: Dias
  tasaManual: number | null
  odometroFunciona: boolean
  lectura: number | null
  ultimoAceite: UltimoAceite
}

export function crearVehiculo(d: DatosOnboarding, hoy: string): Vehiculo {
  const intervalos = intervalosDePlantilla(d.plantilla)
  const tasa = d.tasaManual ?? tasaDia(d.rutina, d.dias)
  const kmBase = d.odometroFunciona && d.lectura != null ? d.lectura : 0
  const refs = Object.fromEntries(TODAS.map((t) => [t, { fecha: hoy, odo: kmBase }])) as Referencias
  // Paso 3: el aceite arranca a la fracción elegida, sin quedar falsamente al 0 % el día 1.
  const f = FRACCION_ACEITE[d.ultimoAceite]
  if (f > 0) {
    const iv = intervalos.aceite
    const diasHastaLimite = Math.min(iv.km / tasa, iv.dias ?? Number.POSITIVE_INFINITY)
    const hace = Math.round(f * diasHastaLimite)
    refs.aceite = { fecha: sumarDias(hoy, -hace), odo: Math.round(kmBase - tasa * hace) }
  }
  return {
    apodo: d.apodo.trim() || 'Mi moto',
    tipo: d.tipo,
    transmision: d.transmision,
    plantilla: d.plantilla,
    rutina: d.rutina,
    dias: d.dias,
    tasaManual: d.tasaManual,
    odometroFunciona: d.odometroFunciona,
    kmBase,
    kmBaseFecha: hoy,
    checkins: [],
    intervalos,
    referencias: refs,
    taller: '',
  }
}

export function transmisionDeTipo(t: TipoMoto): Transmision {
  return TIPOS_MOTO.find((x) => x.id === t)!.transmision
}
