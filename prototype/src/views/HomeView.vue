<script setup lang="ts">
import { computed } from 'vue'
import AppScreen from '../components/AppScreen.vue'
import Icon from '../components/Icon.vue'
import StatusBadge from '../components/StatusBadge.vue'
import StatusShape from '../components/StatusShape.vue'
import TopBar from '../components/TopBar.vue'
import { NOMBRE_TRANSMISION, plantillaTitulo, rutinaEnPalabras } from '../domain/catalogo'
import { bannerPrioridad, margenTexto } from '../domain/textos'
import { app, evaluacion } from '../store'

/** `bajoHoja`: se dibuja debajo de la hoja de /calibrate (sin barra inferior). */
const props = defineProps<{ bajoHoja?: boolean }>()

const v = computed(() => app.vehiculo!)
const banner = computed(() => bannerPrioridad(evaluacion.value, v.value.transmision))
const TONO = {
  ok: 'bg-ok-surface border-ok-border',
  warn: 'bg-warn-surface border-warn-border',
  crit: 'bg-crit-surface border-crit-border',
} as const
const BORDE = { ok: '', warn: 'border-l-6 border-l-warn-solid', crit: 'border-l-6 border-l-crit-solid' } as const
const TEXTO = { ok: 'text-ok-text', warn: 'text-warn-text', crit: 'text-crit-text' } as const
</script>

<template>
  <AppScreen :tabs="!props.bajoHoja">
    <template #header>
      <TopBar v-if="props.bajoHoja" title="Mi moto" fallback="/home" />
    </template>

    <section
      class="mx-2 mt-2 rounded-6 bg-brand px-4 pb-3.5 pt-3 text-brand-ink"
      aria-labelledby="moto-apodo"
    >
      <div class="flex items-center justify-between gap-3">
        <h1 id="moto-apodo" class="min-w-0 truncate text-2xl font-bold tracking-[-0.02em]">{{ v.apodo }}</h1>
        <RouterLink
          to="/calibrate"
          class="focus-ring inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-surface/15 px-3.5 text-base font-bold text-brand-ink ring-1 ring-surface/40 hover:bg-surface/25"
        >
          <Icon name="gauge" :size="20" />
          Ajustar uso
        </RouterLink>
      </div>
      <p class="mt-1 text-base text-brand-soft">{{ rutinaEnPalabras(v.rutina, v.dias) }}</p>
      <div class="mt-2 flex flex-wrap gap-2">
        <span class="badge border-surface/35 bg-surface/12 font-medium text-brand-ink">{{ plantillaTitulo(v.plantilla) }}</span>
        <span class="badge border-surface/35 bg-surface/12 font-medium text-brand-ink" data-transmision>
          {{ NOMBRE_TRANSMISION[v.transmision] }}
        </span>
      </div>
    </section>

    <div class="px-4 pb-4">
      <section
        class="mt-3 flex gap-3 rounded-4 border px-3.5 py-3"
        :class="TONO[banner.tono]"
        aria-live="polite"
        data-banner
      >
        <StatusShape :estado="banner.tono" :size="26" class="mt-px" />
        <div class="min-w-0">
          <h2 class="text-base font-bold" :class="TEXTO[banner.tono]">{{ banner.titulo }}</h2>
          <p class="text-sm text-ink">{{ banner.cuerpo }}</p>
        </div>
      </section>

      <h2 class="sr-only">Tus 5 piezas</h2>
      <ul class="mt-3 flex flex-col gap-2">
        <li
          v-for="i in evaluacion"
          :key="i.id"
          class="card relative px-3.5 py-2.5"
          :class="BORDE[i.estado]"
          :data-item="i.id"
        >
          <RouterLink
            :to="`/consumable/${i.id}`"
            class="focus-ring absolute inset-0 rounded-4"
            :aria-label="`Ver ${i.nombre}`"
          />
          <div class="flex items-center justify-between gap-3">
            <span class="text-lg font-bold leading-6 text-ink">{{ i.nombre }}</span>
            <StatusBadge :estado="i.estado" />
          </div>
          <div class="mt-0.5 flex items-center justify-between gap-3">
            <span class="text-base text-ink-muted" data-margen>{{ margenTexto(i) }}</span>
            <RouterLink
              v-if="i.estado !== 'ok'"
              :to="{ path: '/log-service', query: { consumableId: i.id } }"
              class="btn-secondary relative z-1 shrink-0 px-3.5"
            >
              Registrar
            </RouterLink>
          </div>
        </li>
      </ul>
    </div>

    <template #footer>
      <RouterLink to="/log-service" class="btn-primary w-full">
        <Icon name="plus" :size="22" />
        Registrar servicio
      </RouterLink>
    </template>
  </AppScreen>
</template>
