const MS_DIA = 86_400_000

/** Fecha local como 'YYYY-MM-DD'. */
export function isoLocal(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function aUTC(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y!, (m ?? 1) - 1, d ?? 1)
}

export function sumarDias(iso: string, n: number): string {
  const t = new Date(aUTC(iso) + Math.round(n) * MS_DIA)
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, '0')}-${String(t.getUTCDate()).padStart(2, '0')}`
}

/** Días enteros de `desde` a `hasta` (positivo si `hasta` es posterior). */
export function diferenciaDias(desde: string, hasta: string): number {
  return Math.round((aUTC(hasta) - aUTC(desde)) / MS_DIA)
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const MESES_LARGOS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]
const DIAS_SEMANA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

export function fechaCorta(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MESES[(m ?? 1) - 1]} ${y}`
}

export function fechaLarga(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} de ${MESES_LARGOS[(m ?? 1) - 1]} de ${y}`
}

export function diaSemanaYFecha(iso: string): string {
  const [, m, d] = iso.split('-').map(Number)
  const dia = new Date(aUTC(iso)).getUTCDay()
  return `${DIAS_SEMANA[dia]}, ${d} de ${MESES_LARGOS[(m ?? 1) - 1]}`
}
