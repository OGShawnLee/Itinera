import { describe, expect, test } from 'bun:test'
import {
  diasRestantes, estado, etiquetaTiempo, FACTOR, fraccionUso, promedioFactores, tasaDia, tasaPromedio,
} from './reglas'

describe('tasaDia (DOMAIN.md §5.1)', () => {
  test('R3 de 5 o 6 días ≈ 39.29', () => {
    expect(Math.abs(tasaDia('R3', '5-6') - 39.29)).toBeLessThanOrEqual(0.01)
  })
  test('R4 todos los días = 90', () => {
    expect(tasaDia('R4', 'todos')).toBe(90)
  })
  test('R1 de 3 o 4 días = 7.5', () => {
    expect(tasaDia('R1', '3-4')).toBe(7.5)
  })
})

describe('estado (DOMAIN.md §5.3)', () => {
  test('umbrales 0.80 y 1.00', () => {
    expect(estado(0.79)).toBe('ok')
    expect(estado(0.8)).toBe('warn')
    expect(estado(0.99)).toBe('warn')
    expect(estado(1.0)).toBe('crit')
  })
})

describe('fraccionUso (regla dual)', () => {
  test('toma la dimensión que va más avanzada', () => {
    expect(fraccionUso(1000, 80, 2500, 90)).toBeCloseTo(80 / 90, 6)
    expect(fraccionUso(2000, 10, 2500, 90)).toBeCloseTo(0.8, 6)
  })
  test('sin intervalo de tiempo se evalúa solo por recorrido', () => {
    expect(fraccionUso(6000, 5000, 15000, null)).toBeCloseTo(0.4, 6)
    expect(fraccionUso(6000, 5000, 15000)).toBeCloseTo(0.4, 6)
    expect(diasRestantes(6000, 5000, 15000, null, 50)).toBeCloseTo(180, 6)
  })
})

describe('etiquetaTiempo (sin kilómetros)', () => {
  test('rangos de días, semanas y meses', () => {
    expect(etiquetaTiempo(0)).toBe('Ya toca')
    expect(etiquetaTiempo(-3)).toBe('Ya toca')
    expect(etiquetaTiempo(1)).toBe('en ~1 día')
    expect(etiquetaTiempo(6)).toBe('en ~6 días')
    expect(etiquetaTiempo(11.6)).toBe('en ~2 semanas')
    expect(etiquetaTiempo(29)).toBe('en ~4 semanas')
    expect(etiquetaTiempo(67)).toBe('en ~2 meses')
  })
})

describe('check-in semanal y media móvil de 4 semanas', () => {
  const base = tasaDia('R3', '5-6')
  test('sin respuestas se asume factor 1.0', () => {
    expect(promedioFactores([])).toBe(1)
    expect(tasaPromedio(base, [])).toBeCloseTo(base, 9)
  })
  test('Más sube y Menos baja la tasa promedio respecto a Sí', () => {
    const si = tasaPromedio(base, [FACTOR.si])
    const mas = tasaPromedio(base, [FACTOR.mas])
    const menos = tasaPromedio(base, [FACTOR.menos])
    expect(mas).toBeGreaterThan(si)
    expect(menos).toBeLessThan(si)
  })
  test('solo cuentan las últimas 4 semanas', () => {
    expect(promedioFactores([0, 0, 1.5, 1.5, 1.5, 1.5])).toBe(1.5)
  })
})
