import { ITEMS, nombreItem, tareasDeItem } from './catalogo'
import { diferenciaDias } from './fechas'
import {
  diasRestantes, estado, fraccionUso, PESO_ESTADO, primeroPor, tasaDia, tasaPromedio,
} from './reglas'
import type {
  Estado, ItemId, Referencia, Referencias, Registro, TareaId, Vehiculo,
} from './types'

export function tasaBase(v: Vehiculo): number {
  return v.tasaManual ?? tasaDia(v.rutina, v.dias)
}

/** Tasa diaria efectiva (media móvil de 4 semanas con los factores de check-in). */
export function tasaEfectiva(v: Vehiculo): number {
  return tasaPromedio(tasaBase(v), v.checkins)
}

/** Km_proyectado(t) = Km_base + Tasa_dia × Δt. Uso interno: nunca se muestra como estimado. */
export function kmProyectado(v: Vehiculo, hoy: string): number {
  const dt = Math.max(0, diferenciaDias(v.kmBaseFecha, hoy))
  return v.kmBase + tasaEfectiva(v) * dt
}

/** Las referencias vigentes: la inicial o el registro preventivo más reciente (DOMAIN.md §5.4). */
export function referenciasVigentes(v: Vehiculo, registros: readonly Registro[]): Referencias {
  // Copia plana (funciona también con objetos reactivos de Vue).
  const refs = Object.fromEntries(
    Object.entries(v.referencias).map(([k, r]) => [k, { fecha: r.fecha, odo: r.odo }]),
  ) as Referencias
  const ordenados = [...registros].sort((a, b) => a.fecha.localeCompare(b.fecha))
  for (const r of ordenados) {
    if (r.tipo !== 'preventivo') continue
    for (const t of tareasQueReinicia(r.tareas)) {
      if (r.fecha >= refs[t].fecha) refs[t] = { fecha: r.fecha, odo: r.odo }
    }
  }
  return refs
}

/** Reinicio parcial: la tarea corta reinicia solo su contador; el reemplazo reinicia ambos. */
export function tareasQueReinicia(tareas: readonly TareaId[]): TareaId[] {
  const out = new Set<TareaId>(tareas)
  if (out.has('cadena-cambio')) out.add('cadena-corta')
  if (out.has('cvt-cambio')) out.add('cvt-corta')
  return [...out]
}

export interface EvalTarea {
  tarea: TareaId
  pKm: number
  pTiempo: number | null
  p: number
  estado: Estado
  dias: number
  primero: 'recorrido' | 'tiempo'
}

export function evaluarTarea(v: Vehiculo, tarea: TareaId, ref: Referencia, hoy: string): EvalTarea {
  const intervalo = v.intervalos[tarea]
  const tasa = tasaEfectiva(v)
  const deltaKm = Math.max(0, kmProyectado(v, hoy) - ref.odo)
  const deltaDias = Math.max(0, diferenciaDias(ref.fecha, hoy))
  const p = fraccionUso(deltaKm, deltaDias, intervalo.km, intervalo.dias)
  return {
    tarea,
    pKm: deltaKm / intervalo.km,
    pTiempo: intervalo.dias ? deltaDias / intervalo.dias : null,
    p,
    estado: estado(p),
    dias: diasRestantes(deltaKm, deltaDias, intervalo.km, intervalo.dias, tasa),
    primero: primeroPor(deltaKm, deltaDias, intervalo.km, intervalo.dias, tasa),
  }
}

export interface EvalItem {
  id: ItemId
  nombre: string
  estado: Estado
  /** Tarea que define la tarjeta: la peor; si empatan, la que vence antes. */
  principal: EvalTarea
  tareas: EvalTarea[]
}

export function evaluarItem(
  v: Vehiculo, item: ItemId, registros: readonly Registro[], hoy: string,
): EvalItem {
  const refs = referenciasVigentes(v, registros)
  const tareas = tareasDeItem(item, v.transmision).map((t) => evaluarTarea(v, t, refs[t], hoy))
  const principal = [...tareas].sort(
    (a, b) => PESO_ESTADO[b.estado] - PESO_ESTADO[a.estado] || a.dias - b.dias,
  )[0]!
  return { id: item, nombre: nombreItem(item, v.transmision), estado: principal.estado, principal, tareas }
}

export function evaluarTodo(v: Vehiculo, registros: readonly Registro[], hoy: string): EvalItem[] {
  return ITEMS.map((i) => evaluarItem(v, i, registros, hoy))
}
