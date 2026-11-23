import { computed, reactive, ref, watch } from 'vue'
import {
  comercioInicial, crearSeed, DEMO_TODAY, prefsIniciales, type EstadoApp,
} from './data/seed'
import { evaluarTodo, type EvalItem } from './domain/vehiculo'
import type { ItemId } from './domain/types'

const CLAVE = 'itinera-prototipo-v1'
const CLAVE_LIMPIO = 'itinera-captura-limpia'

export const hoy = DEMO_TODAY

function cargar(): EstadoApp {
  try {
    const raw = localStorage.getItem(CLAVE)
    if (raw) {
      const data = JSON.parse(raw) as EstadoApp
      if (data && 'registros' in data && 'prefs' in data && 'comercio' in data) return data
    }
  } catch {
    // Sin almacenamiento disponible: se usan los datos de prueba.
  }
  return crearSeed()
}

export const app = reactive<EstadoApp>(cargar())

watch(
  app,
  (v) => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(v))
    } catch {
      // Almacenamiento bloqueado: el prototipo sigue funcionando en memoria.
    }
  },
  { deep: true },
)

export function restablecerDatosDePrueba(): void {
  const s = crearSeed()
  app.vehiculo = s.vehiculo
  app.registros = s.registros
  app.prefs = s.prefs
  app.comercio = s.comercio
}

export function empezarDesdeCero(): void {
  app.vehiculo = null
  app.registros = []
  app.prefs = prefsIniciales()
  app.comercio = comercioInicial()
}

export const evaluacion = computed<EvalItem[]>(() =>
  app.vehiculo ? evaluarTodo(app.vehiculo, app.registros, hoy) : [],
)

export function itemEval(id: ItemId): EvalItem | undefined {
  return evaluacion.value.find((i) => i.id === id)
}

/* Toasts */
export interface Toast {
  id: number
  texto: string
}
export const toasts = ref<Toast[]>([])
let siguiente = 1
export function avisar(texto: string): void {
  const id = siguiente++
  toasts.value = [...toasts.value, { id, texto }].slice(-2)
  window.setTimeout(() => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }, 3200)
}

/* Modo captura limpio (persistente en la sesión) */
function leerLimpio(): boolean {
  try {
    return sessionStorage.getItem(CLAVE_LIMPIO) === '1'
  } catch {
    return false
  }
}
export const ui = reactive({ limpio: leerLimpio() })
export function fijarLimpio(v: boolean): void {
  ui.limpio = v
  try {
    if (v) sessionStorage.setItem(CLAVE_LIMPIO, '1')
    else sessionStorage.removeItem(CLAVE_LIMPIO)
  } catch {
    // Sin sessionStorage: el modo vive solo en memoria.
  }
}

export function nuevoId(): string {
  return `r-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}
