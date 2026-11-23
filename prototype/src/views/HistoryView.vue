<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'
import { computed, ref } from 'vue'
import AppScreen from '../components/AppScreen.vue'
import Icon from '../components/Icon.vue'
import { ITEMS, itemDeTarea, nombreCortoItem, nombreServicio } from '../domain/catalogo'
import { fechaCorta } from '../domain/fechas'
import { app } from '../store'

const v = computed(() => app.vehiculo!)
const filtro = ref<string>('todos')

const lista = computed(() =>
  [...app.registros]
    .filter((r) => {
      if (filtro.value === 'todos') return true
      if (filtro.value === 'yo' || filtro.value === 'taller') return r.modalidad === filtro.value
      return r.tareas.some((t) => itemDeTarea(t) === filtro.value)
    })
    .sort((a, b) => b.fecha.localeCompare(a.fecha)),
)
const total = computed(() => app.registros.reduce((s, r) => s + (r.costo ?? 0), 0))
const filtros = computed(() => [
  { id: 'todos', label: 'Todos' },
  { id: 'yo', label: 'Hecho por mí' },
  { id: 'taller', label: 'Taller' },
  ...ITEMS.map((i) => ({ id: i, label: nombreCortoItem(i, v.value.transmision) })),
])
function cambiarFiltro(x: unknown) {
  filtro.value = typeof x === 'string' && x ? x : 'todos'
}
</script>

<template>
  <AppScreen tabs>
    <template #header>
      <header class="shrink-0 px-4 pb-2 pt-4">
        <h1 class="screen-title">Bitácora</h1>
      </header>
    </template>

    <div class="flex flex-col gap-3 px-4 pb-5">
      <section class="card px-4 py-3" aria-label="Resumen">
        <div>
          <p class="text-lg font-bold text-ink">{{ app.registros.length }} {{ app.registros.length === 1 ? 'servicio' : 'servicios' }}</p>
          <p class="text-sm text-ink-muted">Total gastado: ${{ total.toLocaleString('es-MX') }} MXN</p>
        </div>
        <RouterLink to="/export" class="btn-secondary mt-2.5 w-full">
          <Icon name="share" :size="20" />
          Exportar resumen gratis
        </RouterLink>
      </section>

      <ToggleGroupRoot
        :model-value="filtro"
        type="single"
        class="flex flex-wrap gap-2"
        aria-label="Filtrar bitácora"
        @update:model-value="cambiarFiltro"
      >
        <ToggleGroupItem v-for="x in filtros" :key="x.id" :value="x.id" class="chip">{{ x.label }}</ToggleGroupItem>
      </ToggleGroupRoot>

      <div v-if="!app.registros.length" class="card flex flex-col items-start gap-3 px-4 py-5">
        <p class="text-base text-ink">Aquí queda cada servicio que hagas, en taller o por tu cuenta. Te sirve para recordar fechas, costos y para cotizar.</p>
        <RouterLink to="/log-service" class="btn-primary">Registrar mi primer servicio</RouterLink>
      </div>

      <ul v-else class="flex flex-col gap-2" aria-label="Servicios registrados">
        <li v-for="r in lista" :key="r.id">
          <RouterLink :to="`/history/${r.id}`" class="card row-tap justify-between px-4 py-3" data-registro>
            <span class="min-w-0 flex-1">
              <span class="block text-sm text-ink-muted">{{ fechaCorta(r.fecha) }}</span>
              <span class="block text-base font-bold text-ink">
                {{ [...r.tareas.map(nombreServicio), ...(r.otro ? ['Reparación general'] : [])].join(', ') }}
              </span>
              <span class="mt-1 flex flex-wrap items-center gap-1.5">
                <span class="badge-neutral">{{ r.tipo === 'preventivo' ? 'Preventivo' : 'Correctivo' }}</span>
                <span class="badge-neutral">{{ r.modalidad === 'yo' ? 'Hecho por mí' : r.taller || 'Taller' }}</span>
                <span v-if="r.foto" class="badge-neutral"><Icon name="photo" :size="16" />Con foto</span>
              </span>
            </span>
            <span class="flex shrink-0 items-center gap-1 text-base font-bold text-ink">
              {{ r.costo != null ? `$${r.costo}` : '' }}
              <Icon name="chevron" :size="20" class="text-ink-muted" />
            </span>
          </RouterLink>
        </li>
        <li v-if="!lista.length" class="px-1 text-base text-ink-muted">No hay servicios con este filtro.</li>
      </ul>
    </div>
  </AppScreen>
</template>
