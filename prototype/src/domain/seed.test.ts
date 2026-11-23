import { describe, expect, test } from 'bun:test'
import { crearSeed, DEMO_TODAY } from '../data/seed'
import { nombreItem, NOMBRE_TAREA, tareasDeItem, vinetas } from './catalogo'
import { agregarRegistro, aplicarCheckin } from './servicio'
import { etiquetaTiempo, FACTOR } from './reglas'
import type { Registro, TareaId } from './types'
import { evaluarItem, evaluarTodo, tasaEfectiva } from './vehiculo'

function registroHoy(tareas: TareaId[], id = 'nuevo'): Registro {
  return {
    id, fecha: DEMO_TODAY, tareas, otro: false, tipo: 'preventivo', modalidad: 'yo',
    taller: '', odo: 12_675, costo: null, nota: '', foto: false,
  }
}

describe('seed con DEMO_TODAY', () => {
  const { vehiculo, registros } = crearSeed(DEMO_TODAY)
  const v = vehiculo!
  const items = Object.fromEntries(evaluarTodo(v, registros, DEMO_TODAY).map((i) => [i.id, i]))

  test('aceite en amarillo, 11–12.5 días, "en ~2 semanas"', () => {
    expect(items.aceite!.estado).toBe('warn')
    expect(items.aceite!.principal.p).toBeCloseTo(0.82, 2)
    expect(items.aceite!.principal.dias).toBeGreaterThanOrEqual(11)
    expect(items.aceite!.principal.dias).toBeLessThanOrEqual(12.5)
    expect(etiquetaTiempo(items.aceite!.principal.dias)).toBe('en ~2 semanas')
  })
  test('cadena en rojo por la tarea corta; el kit sigue en verde', () => {
    expect(items.transmision!.estado).toBe('crit')
    expect(items.transmision!.principal.tarea).toBe('cadena-corta')
    const kit = items.transmision!.tareas.find((t) => t.tarea === 'cadena-cambio')!
    expect(kit.estado).toBe('ok')
    expect(kit.pTiempo).toBeNull()
  })
  test('frenos, bujía y llantas en verde', () => {
    expect(items.frenos!.estado).toBe('ok')
    expect(items.bujia!.estado).toBe('ok')
    expect(items.llantas!.estado).toBe('ok')
  })
  test('exactamente 4 registros de prueba', () => {
    expect(registros).toHaveLength(4)
  })
})

describe('reinicio de ciclo (DOMAIN.md §5.4)', () => {
  test('un cambio de aceite preventivo hoy deja el aceite en verde', () => {
    const s = crearSeed(DEMO_TODAY)
    const r = agregarRegistro(s.vehiculo!, s.registros, registroHoy(['aceite']), false)
    expect(evaluarItem(r.vehiculo, 'aceite', r.registros, DEMO_TODAY).estado).toBe('ok')
  })
  test('lubricación y ajuste reinicia solo el contador corto', () => {
    const s = crearSeed(DEMO_TODAY)
    const antes = evaluarItem(s.vehiculo!, 'transmision', s.registros, DEMO_TODAY)
    const r = agregarRegistro(s.vehiculo!, s.registros, registroHoy(['cadena-corta']), false)
    const despues = evaluarItem(r.vehiculo, 'transmision', r.registros, DEMO_TODAY)
    const corta = despues.tareas.find((t) => t.tarea === 'cadena-corta')!
    const kitAntes = antes.tareas.find((t) => t.tarea === 'cadena-cambio')!
    const kitDespues = despues.tareas.find((t) => t.tarea === 'cadena-cambio')!
    expect(corta.p).toBe(0)
    expect(kitDespues.p).toBeCloseTo(kitAntes.p, 9)
    expect(kitDespues.p).toBeGreaterThan(0)
  })
  test('cambio de kit reinicia ambos contadores', () => {
    const s = crearSeed(DEMO_TODAY)
    const r = agregarRegistro(s.vehiculo!, s.registros, registroHoy(['cadena-cambio']), false)
    const d = evaluarItem(r.vehiculo, 'transmision', r.registros, DEMO_TODAY)
    for (const t of d.tareas) expect(t.p).toBe(0)
  })
  test('un registro correctivo no reinicia contadores', () => {
    const s = crearSeed(DEMO_TODAY)
    const reg = { ...registroHoy(['aceite']), tipo: 'correctivo' as const }
    const r = agregarRegistro(s.vehiculo!, s.registros, reg, false)
    expect(evaluarItem(r.vehiculo, 'aceite', r.registros, DEMO_TODAY).estado).toBe('warn')
  })
})

describe('transmisión CVT', () => {
  test('rótulo, tareas, estado y sin lubricación', () => {
    const s = crearSeed(DEMO_TODAY)
    const v = { ...s.vehiculo!, transmision: 'CVT' as const }
    expect(nombreItem('transmision', v.transmision)).toBe('Banda CVT')
    const tareas = tareasDeItem('transmision', 'CVT')
    expect(tareas.map((t) => NOMBRE_TAREA[t])).toEqual(['Inspección', 'Reemplazo de banda y rodillos'])
    const item = evaluarItem(v, 'transmision', s.registros, DEMO_TODAY)
    expect(item.nombre).toBe('Banda CVT')
    expect(item.estado).toBe('ok')
    const textos = [...tareas.map((t) => NOMBRE_TAREA[t]), ...vinetas('transmision', 'CVT')]
    for (const t of textos) expect(t.toLowerCase()).not.toContain('lubric')
  })
})

describe('check-in sobre el vehículo', () => {
  test('Más sube y Menos baja la tasa efectiva respecto a Sí', () => {
    const v = crearSeed(DEMO_TODAY).vehiculo!
    const si = tasaEfectiva(aplicarCheckin(v, FACTOR.si, DEMO_TODAY))
    const mas = tasaEfectiva(aplicarCheckin(v, FACTOR.mas, DEMO_TODAY))
    const menos = tasaEfectiva(aplicarCheckin(v, FACTOR.menos, DEMO_TODAY))
    expect(mas).toBeGreaterThan(si)
    expect(menos).toBeLessThan(si)
  })
})
