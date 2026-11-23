<script setup lang="ts">
import {
  DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle,
  RadioGroupRoot,
} from 'reka-ui'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '../components/Icon.vue'
import OptionItem from '../components/OptionItem.vue'
import { DIAS_OPCIONES, RUTINAS } from '../domain/catalogo'
import { diferenciaDias } from '../domain/fechas'
import { FACTOR } from '../domain/reglas'
import { aplicarCheckin, confirmarTablero } from '../domain/servicio'
import type { Dias, Rutina } from '../domain/types'
import { app, avisar, hoy } from '../store'
import HomeView from './HomeView.vue'

const router = useRouter()
// La hoja se abre ya montada, para que el portal encuentre #sheet-root.
const abierta = ref(false)
onMounted(() => {
  abierta.value = true
})

function cerrar(v: boolean) {
  abierta.value = v
  if (!v) router.replace('/home')
}

/** Enfoca el primer campo útil en vez del botón Cerrar. */
function enfocar(e: Event) {
  e.preventDefault()
  document.querySelector<HTMLElement>('[data-calibrate] input, [data-calibrate] [role=radio]')?.focus()
}

const v = computed(() => app.vehiculo!)
const lectura = ref<number | null>(null)
const intensidad = ref('')
const cambiarRutina = ref(false)
const rutina = ref<Rutina>(v.value.rutina)
const dias = ref<Dias>(v.value.dias)

const haceDias = computed(() => diferenciaDias(v.value.kmBaseFecha, hoy))
const ultima = computed(() => Math.round(v.value.kmBase).toLocaleString('es-MX'))
const lecturaValida = computed(() => lectura.value != null && lectura.value >= v.value.kmBase)

const INTENSIDAD = [
  { id: 'no', titulo: 'No la usé', factor: FACTOR.noLaUse },
  { id: 'menos', titulo: 'Menos que de costumbre', factor: FACTOR.menos },
  { id: 'igual', titulo: 'Como siempre', factor: FACTOR.si },
  { id: 'mas', titulo: 'Más que de costumbre', factor: FACTOR.mas },
]

function confirmar() {
  if (cambiarRutina.value) {
    app.vehiculo = { ...v.value, rutina: rutina.value, dias: dias.value }
    avisar('Rutina actualizada')
  } else if (v.value.odometroFunciona) {
    if (!lecturaValida.value) return
    app.vehiculo = confirmarTablero(v.value, lectura.value!, hoy)
    avisar('Listo, lo tomamos en cuenta')
  } else {
    const op = INTENSIDAD.find((x) => x.id === intensidad.value)
    if (!op) return
    app.vehiculo = aplicarCheckin(v.value, op.factor, hoy)
    avisar('Listo, lo tomamos en cuenta')
  }
  cerrar(false)
}
const puedeConfirmar = computed(() =>
  cambiarRutina.value ? true : v.value.odometroFunciona ? lecturaValida.value : !!intensidad.value,
)
</script>

<template>
  <HomeView bajo-hoja />
  <DialogRoot :open="abierta" @update:open="cerrar">
    <DialogPortal to="#sheet-root">
      <DialogOverlay class="absolute inset-0 z-40 bg-ink/45" />
      <DialogContent
        class="absolute inset-x-0 bottom-0 z-50 max-h-[88%] overflow-y-auto rounded-t-7 bg-surface px-4 pb-5 pt-2 focus:outline-none"
        data-calibrate
        @open-auto-focus="enfocar"
      >
        <div class="mx-auto mb-2 h-1.5 w-11 rounded-full bg-line" aria-hidden="true" />
        <div class="flex items-start justify-between gap-3">
          <DialogTitle class="screen-title pt-1.5">
            {{ cambiarRutina ? 'Cambié mi rutina' : v.odometroFunciona ? 'Ajustar uso' : '¿Cómo usaste tu moto esta semana?' }}
          </DialogTitle>
          <DialogClose class="focus-ring inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink hover:bg-canvas cursor-pointer" aria-label="Cerrar">
            <Icon name="close" />
          </DialogClose>
        </div>

        <template v-if="cambiarRutina">
          <DialogDescription class="text-base text-ink-muted">Elige de nuevo cómo la usas.</DialogDescription>
          <RadioGroupRoot v-model="rutina" class="mt-3 flex flex-col gap-1.5" aria-label="Uso en un día normal">
            <OptionItem v-for="r in RUTINAS" :key="r.id" :value="r.id" :title="r.titulo" :detail="r.detalle || undefined" />
          </RadioGroupRoot>
          <RadioGroupRoot v-model="dias" class="mt-3 grid grid-cols-2 gap-1.5" aria-label="Días por semana">
            <OptionItem v-for="d in DIAS_OPCIONES" :key="d.id" :value="d.id" :title="d.titulo" />
          </RadioGroupRoot>
        </template>

        <template v-else-if="v.odometroFunciona">
          <DialogDescription class="text-base text-ink-muted">
            Escribe lo que marca tu tablero hoy. Última lectura: {{ ultima }} km, hace {{ haceDias }} días.
          </DialogDescription>
          <label for="tablero" class="mt-3 block text-base font-medium text-ink">Kilómetros en el tablero</label>
          <input
            id="tablero"
            v-model.number="lectura"
            type="number"
            inputmode="numeric"
            :min="Math.round(v.kmBase)"
            class="field mt-1.5 text-lg"
            :placeholder="ultima"
          />
          <p v-if="lectura != null && !lecturaValida" class="mt-1.5 text-sm text-crit-text">
            Debe ser igual o mayor que la última lectura.
          </p>
        </template>

        <template v-else>
          <DialogDescription class="text-base text-ink-muted">Sin números: solo dinos si fue una semana normal.</DialogDescription>
          <RadioGroupRoot v-model="intensidad" class="mt-3 flex flex-col gap-1.5" aria-label="Uso esta semana">
            <OptionItem v-for="o in INTENSIDAD" :key="o.id" :value="o.id" :title="o.titulo" />
          </RadioGroupRoot>
          <button type="button" class="btn-ghost mt-1" @click="cambiarRutina = true">Cambié mi rutina</button>
        </template>

        <button type="button" class="btn-primary mt-4 w-full" :disabled="!puedeConfirmar" @click="confirmar">
          {{ cambiarRutina ? 'Guardar rutina' : 'Confirmar' }}
        </button>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
