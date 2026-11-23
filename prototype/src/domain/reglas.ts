import type { Dias, Estado, Rutina } from './types'

/** DOMAIN.md §5.1: km por día de uso según rutina. */
export const KM_RUTINA: Record<Rutina, number> = { R1: 15, R2: 30, R3: 50, R4: 90 }
/** DOMAIN.md §5.1: días efectivos por semana. */
export const DIAS_EFECTIVOS: Record<Dias, number> = { '1-2': 1.5, '3-4': 3.5, '5-6': 5.5, todos: 7 }

/** Factores de intensidad semanal (WeeklyCheckIn y /calibrate sin odómetro). */
export const FACTOR = { noLaUse: 0, menos: 0.5, si: 1, mas: 1.5 } as const

export const UMBRAL_AMARILLO = 0.8
export const UMBRAL_ROJO = 1

export function tasaDia(rutina: Rutina, dias: Dias): number {
  return (KM_RUTINA[rutina] * DIAS_EFECTIVOS[dias]) / 7
}

/** Promedio móvil de 4 semanas: las semanas sin respuesta cuentan con factor 1.0. */
export function promedioFactores(checkins: readonly number[]): number {
  const ultimas = checkins.slice(-4)
  const relleno = Array.from({ length: 4 - ultimas.length }, () => 1)
  const todas = [...relleno, ...ultimas]
  return todas.reduce((a, b) => a + b, 0) / todas.length
}

/** Tasa diaria recalibrada con la media móvil de cuatro semanas. */
export function tasaPromedio(tasaBase: number, checkins: readonly number[]): number {
  return tasaBase * promedioFactores(checkins)
}

/** DOMAIN.md §5.3: fracción consumida del intervalo; sin límite de tiempo se evalúa solo por recorrido. */
export function fraccionUso(
  deltaKm: number,
  deltaDias: number,
  iKm: number,
  iDias?: number | null,
): number {
  const porKm = iKm > 0 ? deltaKm / iKm : 0
  const porTiempo = iDias ? deltaDias / iDias : 0
  return Math.max(porKm, porTiempo)
}

export function estado(p: number): Estado {
  if (p < UMBRAL_AMARILLO) return 'ok'
  if (p < UMBRAL_ROJO) return 'warn'
  return 'crit'
}

/** Días hasta que `p` llega a 1.00 por la dimensión que ocurra primero (negativo si ya venció). */
export function diasRestantes(
  deltaKm: number,
  deltaDias: number,
  iKm: number,
  iDias: number | null | undefined,
  tasa: number,
): number {
  const porKm = tasa > 0 ? (iKm - deltaKm) / tasa : Number.POSITIVE_INFINITY
  const porTiempo = iDias ? iDias - deltaDias : Number.POSITIVE_INFINITY
  return Math.min(porKm, porTiempo)
}

/** Qué límite llega primero. */
export function primeroPor(
  deltaKm: number,
  deltaDias: number,
  iKm: number,
  iDias: number | null | undefined,
  tasa: number,
): 'recorrido' | 'tiempo' {
  const porKm = tasa > 0 ? (iKm - deltaKm) / tasa : Number.POSITIVE_INFINITY
  const porTiempo = iDias ? iDias - deltaDias : Number.POSITIVE_INFINITY
  return porKm <= porTiempo ? 'recorrido' : 'tiempo'
}

/** Regla de visualización: el margen se muestra solo en tiempo, nunca en km. */
export function etiquetaTiempo(d: number): string {
  if (d <= 0) return 'Ya toca'
  if (d < 7) {
    const n = Math.max(1, Math.round(d))
    return `en ~${n} ${n === 1 ? 'día' : 'días'}`
  }
  if (d < 30) {
    const n = Math.max(1, Math.round(d / 7))
    return `en ~${n} ${n === 1 ? 'semana' : 'semanas'}`
  }
  const n = Math.max(1, Math.round(d / 30))
  return `en ~${n} ${n === 1 ? 'mes' : 'meses'}`
}

/** Texto para vencidos: "venció hace ~X días" (o "vence hoy"). */
export function etiquetaVencido(d: number): string {
  const atraso = Math.round(-d)
  if (atraso < 1) return 'vence hoy'
  if (atraso < 7) return `venció hace ~${atraso} ${atraso === 1 ? 'día' : 'días'}`
  if (atraso < 30) {
    const s = Math.max(1, Math.round(atraso / 7))
    return `venció hace ~${s} ${s === 1 ? 'semana' : 'semanas'}`
  }
  const m = Math.max(1, Math.round(atraso / 30))
  return `venció hace ~${m} ${m === 1 ? 'mes' : 'meses'}`
}

export const ETIQUETA_ESTADO: Record<Estado, string> = {
  ok: 'Bien',
  warn: 'Ve juntando',
  crit: 'Ya toca',
}

export const PESO_ESTADO: Record<Estado, number> = { ok: 0, warn: 1, crit: 2 }
