export type Rutina = 'R1' | 'R2' | 'R3' | 'R4'
export type Dias = '1-2' | '3-4' | '5-6' | 'todos'
export type Transmision = 'cadena' | 'CVT'
export type Estado = 'ok' | 'warn' | 'crit'
export type TipoMoto = 'motoneta' | 'calle' | 'doble' | 'deportiva'
export type PlantillaId = 'urbana' | 'trabajo' | 'personalizada'
export type ItemId = 'aceite' | 'transmision' | 'frenos' | 'bujia' | 'llantas'
export type TareaId =
  | 'aceite'
  | 'cadena-corta'
  | 'cadena-cambio'
  | 'cvt-corta'
  | 'cvt-cambio'
  | 'frenos'
  | 'bujia'
  | 'llantas'

/** Intervalo máximo de una tarea. `dias: null` = sin límite por tiempo. */
export interface Intervalo {
  km: number
  dias: number | null
}

/** Punto de referencia del ciclo actual de una tarea (fecha ISO y odómetro). */
export interface Referencia {
  fecha: string
  odo: number
}

export type Intervalos = Record<TareaId, Intervalo>
export type Referencias = Record<TareaId, Referencia>

export interface Vehiculo {
  apodo: string
  tipo: TipoMoto
  transmision: Transmision
  plantilla: PlantillaId
  rutina: Rutina
  dias: Dias
  /** km/día escritos a mano por quien sí conoce su recorrido. */
  tasaManual: number | null
  odometroFunciona: boolean
  /** Última lectura confirmada (o 0 relativo sin odómetro). */
  kmBase: number
  kmBaseFecha: string
  /** Factores de intensidad semanal, el más reciente al final. */
  checkins: number[]
  intervalos: Intervalos
  /** Referencias iniciales (onboarding o datos de prueba). Los registros las superan. */
  referencias: Referencias
  taller: string
}

export type TipoServicio = 'preventivo' | 'correctivo'
export type Modalidad = 'yo' | 'taller'

export interface Registro {
  id: string
  fecha: string
  tareas: TareaId[]
  otro: boolean
  tipo: TipoServicio
  modalidad: Modalidad
  taller: string
  odo: number
  costo: number | null
  nota: string
  foto: boolean
}
