import { nombreCortoItem } from './catalogo'
import { etiquetaTiempo, etiquetaVencido } from './reglas'
import type { TareaId, Transmision } from './types'
import type { EvalItem } from './vehiculo'

/** Qué hacer, en una frase corta, cuando una tarea llega a su límite. */
export const ACCION: Record<TareaId, string> = {
  aceite: 'cambia el aceite',
  'cadena-corta': 'lubrícala y ajústala',
  'cadena-cambio': 'cambia el kit de arrastre',
  'cvt-corta': 'lleva a revisar banda y rodillos',
  'cvt-cambio': 'cambia banda y rodillos',
  frenos: 'revisa las balatas',
  bujia: 'cambia la bujía',
  llantas: 'revisa tus llantas',
}

/** Margen en tiempo para tarjetas: nunca en kilómetros. */
export function margenTexto(i: EvalItem): string {
  const d = i.principal.dias
  if (d <= 0) {
    const v = etiquetaVencido(d)
    return i.tareas.length > 1 ? `${tareaCorta(i.principal.tarea)}: ${v}` : capitalizar(v)
  }
  return `Toca ${etiquetaTiempo(d)}`
}

function tareaCorta(t: TareaId): string {
  switch (t) {
    case 'cadena-corta': return 'Lubricar y ajustar'
    case 'cadena-cambio': return 'Cambio de kit'
    case 'cvt-corta': return 'Inspección'
    case 'cvt-cambio': return 'Reemplazo'
    default: return ''
  }
}

export function capitalizar(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export interface Banner {
  tono: 'ok' | 'warn' | 'crit'
  titulo: string
  cuerpo: string
}

export function bannerPrioridad(items: EvalItem[], t: Transmision): Banner {
  const rojos = items.filter((i) => i.estado === 'crit')
  const amarillos = items.filter((i) => i.estado === 'warn')
  const frasesAmarillo = amarillos.map(
    (i) => `${nombreCortoItem(i.id, t)}: ve juntando, toca ${etiquetaTiempo(i.principal.dias)}.`,
  )
  if (rojos.length) {
    const titulo = rojos.length === 1
      ? `Ya toca: ${nombreCortoItem(rojos[0]!.id, t)}`
      : `${rojos.length} servicios ya tocan`
    const accion = rojos.length === 1 ? `${capitalizar(ACCION[rojos[0]!.principal.tarea])} pronto.` : 'Atiéndelos pronto.'
    return { tono: 'crit', titulo, cuerpo: [accion, ...frasesAmarillo].join(' ') }
  }
  if (amarillos.length) {
    return {
      tono: 'warn',
      titulo: amarillos.length === 1
        ? `Ve juntando para: ${nombreCortoItem(amarillos[0]!.id, t)}`
        : `Ve juntando para ${amarillos.length} servicios`,
      cuerpo: amarillos
        .map((i) => `${nombreCortoItem(i.id, t)} toca ${etiquetaTiempo(i.principal.dias)}.`)
        .join(' '),
    }
  }
  return { tono: 'ok', titulo: 'Todo bien por ahora', cuerpo: 'Te avisamos cuando se acerque un servicio.' }
}
