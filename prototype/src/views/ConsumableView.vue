<script setup lang="ts">
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppScreen from '../components/AppScreen.vue'
import Icon from '../components/Icon.vue'
import PromoCard from '../components/PromoCard.vue'
import StatusShape from '../components/StatusShape.vue'
import UsageBar from '../components/UsageBar.vue'
import { itemDeTarea, NOMBRE_TAREA, nombreCortoItem, nombreServicio, vinetas } from '../domain/catalogo'
import { fechaCorta } from '../domain/fechas'
import { ETIQUETA_ESTADO } from '../domain/reglas'
import { margenTexto } from '../domain/textos'
import type { ItemId } from '../domain/types'
import { app, avisar, itemEval } from '../store'

const route = useRoute()
const id = computed(() => route.params.id as ItemId)
const v = computed(() => app.vehiculo!)
const item = computed(() => itemEval(id.value)!)

const TEXTO = { ok: 'text-ok-text', warn: 'text-warn-text', crit: 'text-crit-text' } as const
const FONDO = {
  ok: 'bg-ok-surface border-ok-border',
  warn: 'bg-warn-surface border-warn-border',
  crit: 'bg-crit-surface border-crit-border',
} as const

const beneficio = computed(() => {
  switch (id.value) {
    case 'aceite': return '10% en cambio de aceite'
    case 'transmision': return v.value.transmision === 'cadena' ? '10% en kit de arrastre' : '10% en revisión de banda'
    case 'frenos': return '10% en balatas'
    case 'bujia': return '10% en bujías'
    default: return '10% en revisión de llantas'
  }
})
const mostrarPromo = computed(() => app.prefs.mostrarPromociones && item.value.estado !== 'ok')

const recientes = computed(() =>
  app.registros
    .filter((r) => r.tareas.some((t) => itemDeTarea(t) === id.value))
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
    .slice(0, 3),
)
const nombreEnFrase = computed(() =>
  id.value === 'transmision' ? (v.value.transmision === 'cadena' ? 'cadena' : 'banda CVT') : nombreCortoItem(id.value, v.value.transmision).toLowerCase(),
)
const variasTareas = computed(() => item.value.tareas.length > 1)
</script>

<template>
  <AppScreen :title="item.nombre" back="/home">
    <div class="flex flex-col gap-3 px-4 pb-5 pt-3">
      <section class="rounded-5 border px-4 py-3.5" :class="FONDO[item.estado]" data-estado-detalle>
        <div class="flex items-center gap-3">
          <StatusShape :estado="item.estado" :size="34" />
          <div>
            <p class="text-xl font-bold leading-tight" :class="TEXTO[item.estado]">{{ ETIQUETA_ESTADO[item.estado] }}</p>
            <p class="text-base text-ink">{{ margenTexto(item) }}</p>
          </div>
        </div>

        <div class="mt-3 flex flex-col gap-2.5 rounded-3 bg-surface px-3.5 py-3">
          <template v-for="t in item.tareas" :key="t.tarea">
            <p v-if="variasTareas" class="text-base font-bold text-ink">{{ NOMBRE_TAREA[t.tarea] }}</p>
            <UsageBar label="Por recorrido" :fraccion="t.pKm" />
            <UsageBar label="Por tiempo" :fraccion="t.pTiempo" />
            <p class="text-sm text-ink-muted">{{ t.dias <= 0 ? 'Venció' : 'Vence' }} primero {{ t.primero === 'recorrido' ? 'por recorrido' : 'por tiempo' }}</p>
          </template>
        </div>
      </section>

      <PromoCard v-if="mostrarPromo" :beneficio="beneficio" />

      <section class="card px-4 py-3.5">
        <h2 class="section-title">Qué revisar y por qué importa</h2>
        <ul class="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-base text-ink marker:text-ink-muted">
          <li v-for="b in vinetas(id, v.transmision)" :key="b">{{ b }}</li>
        </ul>
        <button
          v-if="v.taller"
          type="button"
          class="btn-secondary mt-3 w-full"
          @click="avisar('En la app real aquí se abre WhatsApp')"
        >
          Agendar con mi taller
        </button>
      </section>

      <AccordionRoot type="single" collapsible class="card">
        <AccordionItem value="intervalo">
          <AccordionHeader>
            <AccordionTrigger class="row-tap group justify-between px-4 py-2 text-base font-bold text-ink">
              Cambiar cada cuánto toca
              <Icon name="chevron" :size="20" class="transition-transform group-data-[state=open]:rotate-90" />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent class="px-4 pb-4">
            <p class="label-text">Solo cambia esta pieza, por ejemplo si tu taller usa otro aceite.</p>
            <div v-for="t in item.tareas" :key="t.tarea" class="mt-3">
              <p v-if="variasTareas" class="text-base font-bold text-ink">{{ NOMBRE_TAREA[t.tarea] }}</p>
              <div class="mt-1 grid grid-cols-2 gap-2">
                <label class="flex flex-col gap-1 text-sm text-ink-muted">
                  Cada cuántos kilómetros
                  <input v-model.number="v.intervalos[t.tarea].km" type="number" min="100" step="100" class="field" />
                </label>
                <label class="flex flex-col gap-1 text-sm text-ink-muted">
                  Cada cuántos días
                  <input
                    :value="v.intervalos[t.tarea].dias ?? ''"
                    type="number"
                    min="1"
                    placeholder="Sin límite"
                    class="field"
                    @change="v.intervalos[t.tarea].dias = ($event.target as HTMLInputElement).value ? Number(($event.target as HTMLInputElement).value) : null"
                  />
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>

      <section class="card px-4 py-3.5">
        <h2 class="section-title">Últimos servicios</h2>
        <ul v-if="recientes.length" class="mt-1 flex flex-col">
          <li v-for="r in recientes" :key="r.id">
            <RouterLink :to="`/history/${r.id}`" class="row-tap justify-between border-b border-line py-2 last:border-b-0">
              <span class="min-w-0">
                <span class="block text-base text-ink">{{ r.tareas.filter((t) => itemDeTarea(t) === id).map(nombreServicio).join(', ') }}</span>
                <span class="block text-sm text-ink-muted">{{ fechaCorta(r.fecha) }}, {{ r.modalidad === 'yo' ? 'hecho por mí' : r.taller || 'taller' }}</span>
              </span>
              <Icon name="chevron" :size="20" class="text-ink-muted" />
            </RouterLink>
          </li>
        </ul>
        <p v-else class="mt-1 text-base text-ink-muted">Aún no registras servicios de {{ nombreCortoItem(id, v.transmision).toLowerCase() }}.</p>
      </section>
    </div>

    <template #footer>
      <RouterLink :to="{ path: '/log-service', query: { consumableId: id } }" class="btn-primary w-full">
        <Icon name="plus" :size="22" />
        Registrar servicio de {{ nombreEnFrase }}
      </RouterLink>
    </template>
  </AppScreen>
</template>
