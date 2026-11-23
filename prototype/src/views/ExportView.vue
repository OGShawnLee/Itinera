<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import { computed, ref } from 'vue'
import AppScreen from '../components/AppScreen.vue'
import Icon from '../components/Icon.vue'
import StatusShape from '../components/StatusShape.vue'
import SwitchRow from '../components/SwitchRow.vue'
import {
  NOMBRE_TRANSMISION, nombreCortoItem, nombreServicio, plantillaTitulo, tipoMotoTitulo,
} from '../domain/catalogo'
import { diferenciaDias, fechaCorta } from '../domain/fechas'
import { ETIQUETA_ESTADO } from '../domain/reglas'
import { app, avisar, evaluacion, hoy } from '../store'

const alcance = ref<'6m' | 'todo'>('6m')
const montos = ref(true)
const v = computed(() => app.vehiculo!)

const filas = computed(() =>
  [...app.registros]
    .filter((r) => alcance.value === 'todo' || diferenciaDias(r.fecha, hoy) <= 182)
    .sort((a, b) => b.fecha.localeCompare(a.fecha)),
)

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
/** '6 nov'; agrega el año solo si no es el actual. */
function fechaTabla(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  const base = `${d} ${MESES[(m ?? 1) - 1]}`
  return iso.slice(0, 4) === hoy.slice(0, 4) ? base : `${base} ${String(y).slice(2)}`
}
function servicioTexto(tareas: string[], otro: boolean) {
  const partes = tareas.map((t) => nombreServicio(t as Parameters<typeof nombreServicio>[0]))
  if (otro) partes.push('Reparación general')
  return partes.join(', ')
}
const TEXTO = { ok: 'text-ok-text', warn: 'text-warn-text', crit: 'text-crit-text' } as const
</script>

<template>
  <AppScreen title="Resumen gratis" back="/history">
    <div class="flex flex-col gap-3 px-4 pb-5 pt-3">
      <ToggleGroupRoot
        v-model="alcance"
        type="single"
        class="flex gap-1 rounded-3 bg-line/60 p-1"
        aria-label="Qué periodo incluir"
        :rove-focus="true"
      >
        <ToggleGroupItem value="6m" class="tab-item">Últimos 6 meses</ToggleGroupItem>
        <ToggleGroupItem value="todo" class="tab-item">Historial completo</ToggleGroupItem>
      </ToggleGroupRoot>

      <div class="rounded-3 bg-surface px-3.5 ring-1 ring-line">
        <SwitchRow v-model="montos" label="Incluir montos" detail="Ocúltalos si solo vas a cotizar" />
      </div>

      <article class="rounded-3 border border-line-strong bg-surface px-3 py-3" aria-label="Vista previa del resumen" data-preview>
        <header class="border-b border-line pb-2">
          <h2 class="section-title">Resumen de mantenimiento</h2>
          <p class="text-sm text-ink-muted">
            {{ v.apodo }}, {{ tipoMotoTitulo(v.tipo).toLowerCase() }} con {{ NOMBRE_TRANSMISION[v.transmision].toLowerCase() }}.
            Plantilla {{ plantillaTitulo(v.plantilla) }}. Hecho el {{ fechaCorta(hoy) }}.
          </p>
        </header>

        <h3 class="mt-2 text-sm font-bold text-ink">Cómo está hoy</h3>
        <ul class="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5">
          <li v-for="i in evaluacion" :key="i.id" class="flex min-w-0 items-center gap-1.5 text-sm">
            <StatusShape :estado="i.estado" :size="14" />
            <span class="truncate text-ink">{{ nombreCortoItem(i.id, v.transmision) }}</span>
            <span class="ml-auto shrink-0 font-bold" :class="TEXTO[i.estado]">{{ ETIQUETA_ESTADO[i.estado] }}</span>
          </li>
        </ul>

        <h3 class="mt-2.5 text-sm font-bold text-ink">Servicios</h3>
        <table class="mt-1 w-full table-fixed border-collapse text-left text-sm">
          <colgroup>
            <col class="w-[52px]" />
            <col />
            <col class="w-[98px]" />
            <col v-if="montos" class="w-[46px]" />
          </colgroup>
          <thead>
            <tr class="border-b border-line text-ink-muted">
              <th class="py-1 pr-1.5 font-medium">Fecha</th>
              <th class="py-1 pr-1.5 font-medium">Servicio</th>
              <th class="py-1 pr-1.5 font-medium">Quién lo hizo</th>
              <th v-if="montos" class="py-1 text-right font-medium">Costo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in filas" :key="r.id" class="border-b border-line/70 align-top last:border-b-0" data-fila>
              <td class="py-1.5 pr-1.5 tabular-nums text-ink">{{ fechaTabla(r.fecha) }}</td>
              <td class="py-1.5 pr-1.5 text-ink">{{ servicioTexto(r.tareas, r.otro) }}</td>
              <td class="py-1.5 pr-1.5 text-ink">{{ r.modalidad === 'yo' ? 'Hecho por mí' : r.taller || 'Taller' }}</td>
              <td v-if="montos" class="py-1.5 text-right tabular-nums text-ink">{{ r.costo != null ? `$${r.costo}` : '' }}</td>
            </tr>
            <tr v-if="!filas.length">
              <td :colspan="montos ? 4 : 3" class="py-2 text-ink-muted">Aún no hay servicios en este periodo.</td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>

    <template #footer>
      <button type="button" class="btn-primary w-full" @click="avisar('En la app real aquí se abre el menú para compartir')">
        <Icon name="share" :size="22" />
        Compartir o guardar PDF
      </button>
    </template>
  </AppScreen>
</template>
