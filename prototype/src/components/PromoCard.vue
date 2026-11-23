<script setup lang="ts">
import { CODIGO_DEMO } from '../data/seed'
import { fechaCorta, sumarDias } from '../domain/fechas'
import { avisar, hoy } from '../store'
import Icon from './Icon.vue'

defineProps<{ beneficio: string }>()
const vigencia = fechaCorta(sumarDias(hoy, 30))
</script>

<template>
  <section
    class="rounded-5 border-2 border-dashed border-line-strong bg-surface px-4 py-3.5"
    aria-labelledby="promo-nombre"
    data-promo
  >
    <div class="flex flex-wrap gap-2">
      <span class="badge-neutral">Promoción pagada</span>
      <span class="badge border-brand-soft bg-brand-tint text-brand">Próximamente</span>
    </div>
    <div class="mt-2.5 flex items-start gap-3">
      <span class="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-3 bg-canvas text-ink">
        <Icon name="store" />
      </span>
      <div class="min-w-0">
        <h2 id="promo-nombre" class="section-title">Refaccionaria Ejemplo</h2>
        <p class="text-base text-ink">{{ beneficio }}</p>
        <p class="text-sm text-ink-muted">Vigente hasta el {{ vigencia }}</p>
      </div>
    </div>
    <div class="mt-3 flex items-center justify-between gap-3 rounded-3 bg-canvas px-3.5 py-2">
      <span class="text-sm text-ink-muted">Muestra este código en mostrador</span>
      <span class="shrink-0 whitespace-nowrap text-xl font-bold tracking-[0.06em] text-ink">{{ CODIGO_DEMO }}</span>
    </div>
    <p class="mt-2.5 text-sm text-ink-muted">Itinera no califica ni certifica talleres.</p>
    <button
      type="button"
      class="btn-secondary mt-2.5 w-full px-3"
      @click="avisar('En la app real aquí se abre WhatsApp')"
    >
      Cómo llegar o escribir por WhatsApp
    </button>
  </section>
</template>
