<script setup lang="ts">
import { computed, ref } from 'vue'
import AppScreen from '../components/AppScreen.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { intervalosDePlantilla, ITEMS, NOMBRE_TAREA, nombreItem, plantillaTitulo, tareasDeItem } from '../domain/catalogo'
import type { TareaId } from '../domain/types'
import { app, avisar } from '../store'

const v = computed(() => app.vehiculo!)
const confirmar = ref(false)

function enMeses(dias: number | null) {
  if (!dias) return 'Sin límite de tiempo'
  const m = Math.round(dias / 30)
  return dias < 30 ? `${dias} días` : `≈ ${m} ${m === 1 ? 'mes' : 'meses'}`
}
function fijarDias(t: TareaId, e: Event) {
  const val = (e.target as HTMLInputElement).value
  v.value.intervalos[t].dias = val ? Number(val) : null
}
function restablecer() {
  v.value.intervalos = intervalosDePlantilla(v.value.plantilla)
  avisar('Intervalos restablecidos')
}
</script>

<template>
  <AppScreen title="Intervalos de mantenimiento" back="/settings">
    <div class="flex flex-col gap-3 px-4 pb-5 pt-3">
      <p class="text-base text-ink-muted">
        Valores del plan {{ plantillaTitulo(v.plantilla) }}. Toca primero lo que ocurra antes: los kilómetros o los días.
      </p>
      <section v-for="i in ITEMS" :key="i" class="card px-4 py-3.5">
        <h2 class="section-title">{{ nombreItem(i, v.transmision) }}</h2>
        <div v-for="t in tareasDeItem(i, v.transmision)" :key="t" class="mt-2.5">
          <p v-if="i === 'transmision'" class="text-base font-bold text-ink">{{ NOMBRE_TAREA[t] }}</p>
          <div class="mt-1 grid grid-cols-2 gap-2">
            <label class="flex flex-col gap-1 text-sm text-ink-muted">
              Kilómetros
              <input v-model.number="v.intervalos[t].km" type="number" min="100" step="100" class="field" />
            </label>
            <label class="flex flex-col gap-1 text-sm text-ink-muted">
              Días
              <input :value="v.intervalos[t].dias ?? ''" type="number" min="1" class="field" placeholder="Sin límite" @change="fijarDias(t, $event)" />
            </label>
          </div>
          <p class="mt-1 text-sm text-ink-muted">{{ v.intervalos[t].km.toLocaleString('es-MX') }} km o {{ enMeses(v.intervalos[t].dias) }}</p>
        </div>
      </section>
      <button type="button" class="btn-secondary w-full" @click="confirmar = true">Restablecer desde plantilla</button>
    </div>
    <ConfirmDialog
      v-model:open="confirmar"
      title="¿Volver a los valores de la plantilla?"
      :description="`Se usan otra vez los intervalos de ${plantillaTitulo(v.plantilla)} para las 5 piezas.`"
      confirm-text="Sí, restablecer"
      @confirm="restablecer"
    />
  </AppScreen>
</template>
