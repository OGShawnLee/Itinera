<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '../components/Icon.vue'
import QrDemo from '../components/QrDemo.vue'
import StatusShape from '../components/StatusShape.vue'
import { CODIGO_DEMO, PRUEBA_CLIENTES_GRATIS } from '../data/seed'
import type { Estado } from '../domain/types'
import { app, avisar } from '../store'

/** Códigos de ejemplo que existen en la demostración. */
const VALIDOS = [CODIGO_DEMO, 'ITN-517', 'ITN-903']

const codigo = ref(CODIGO_DEMO)
// La vista abre mostrando la comprobación recién hecha del código de ejemplo.
const resultado = ref<'valido' | 'usado' | 'no-encontrado'>('valido')

function comprobar() {
  const c = codigo.value.trim().toUpperCase()
  if (!VALIDOS.includes(c)) {
    resultado.value = 'no-encontrado'
    return
  }
  const usados = app.comercio.usados
  if (c === CODIGO_DEMO || usados.includes(c)) {
    resultado.value = 'usado'
    return
  }
  app.comercio.usados = [...usados, c]
  app.comercio.comprobados = Math.min(PRUEBA_CLIENTES_GRATIS, app.comercio.comprobados + 1)
  resultado.value = 'valido'
}

const RES: Record<typeof resultado.value, { estado: Estado; titulo: string; texto: string; clase: string }> = {
  valido: {
    estado: 'ok',
    titulo: 'Código válido',
    texto: 'Aplica 10% en cambio de aceite. Ya quedó contado.',
    clase: 'bg-ok-surface border-ok-border text-ok-text',
  },
  usado: {
    estado: 'warn',
    titulo: 'Ya usado',
    texto: 'Este código ya se cobró antes. No apliques el descuento.',
    clase: 'bg-warn-surface border-warn-border text-warn-text',
  },
  'no-encontrado': {
    estado: 'crit',
    titulo: 'No encontrado',
    texto: 'Revisa que esté bien escrito, por ejemplo ITN-482.',
    clase: 'bg-crit-surface border-crit-border text-crit-text',
  },
}
const r = computed(() => RES[resultado.value])
const avance = computed(() => `${(app.comercio.comprobados / PRUEBA_CLIENTES_GRATIS) * 100}%`)
</script>

<template>
  <div class="h-full overflow-y-auto bg-canvas">
    <div class="flex flex-col gap-3 px-4 pb-6 pt-4">
      <header>
        <p class="flex items-center gap-2 text-sm font-medium text-ink-muted">
          <span class="inline-flex size-6 items-center justify-center rounded-2 bg-brand text-sm font-bold text-brand-ink" aria-hidden="true">i</span>
          Itinera para negocios
        </p>
        <div class="mt-2 flex items-center gap-2.5">
          <h1 class="screen-title">Comprobar clientes</h1>
          <span class="badge border-brand-soft bg-brand-tint text-brand">Próximamente</span>
        </div>
        <p class="text-base text-ink-muted">Refaccionaria Ejemplo</p>
      </header>

      <section class="card px-4 py-3.5" aria-label="Comprobar un código">
        <label for="codigo" class="text-base font-medium text-ink">Escribe el código del cliente</label>
        <input
          id="codigo"
          v-model="codigo"
          class="field mt-1.5 text-lg font-bold tracking-[0.06em] uppercase"
          autocomplete="off"
          @keydown.enter="comprobar"
        />
        <button type="button" class="btn-primary mt-2.5 w-full" @click="comprobar">Comprobar código</button>
        <div class="mt-3 flex items-start gap-3 rounded-3 border px-3.5 py-2.5" :class="r.clase" role="status" data-resultado>
          <StatusShape :estado="r.estado" :size="26" class="mt-0.5" />
          <div>
            <p class="text-lg font-bold leading-tight">{{ r.titulo }}</p>
            <p class="text-sm text-ink">{{ r.texto }}</p>
          </div>
        </div>
      </section>

      <section class="card px-4 py-3.5" aria-label="Tu prueba y tu mes">
        <p class="text-base font-bold text-ink">Clientes comprobados gratis: {{ app.comercio.comprobados }} de {{ PRUEBA_CLIENTES_GRATIS }}</p>
        <div class="mt-1.5 h-2.5 overflow-hidden rounded-full bg-canvas ring-1 ring-line" aria-hidden="true">
          <div class="h-full rounded-full bg-brand" :style="{ width: avance }" />
        </div>
        <p class="mt-2.5 text-base text-ink">
          Este mes: {{ app.comercio.vieron }} personas vieron su promoción y {{ app.comercio.llegaron }} llegaron con código.
        </p>
        <p class="mt-1.5 text-sm text-ink-muted">Al terminar la prueba eliges: cuota fija al mes o pago por cada cliente comprobado.</p>
      </section>

      <section class="card flex items-center gap-3.5 px-3.5 py-3" aria-label="Cartel para tu mostrador">
        <QrDemo :size="88" class="ring-1 ring-line" />
        <div class="min-w-0">
          <p class="text-base font-bold text-ink">Código QR de ejemplo</p>
          <p class="text-sm text-ink-muted">Tu cartel para que tus clientes descarguen la app.</p>
          <button type="button" class="btn-secondary mt-1.5 min-h-11" @click="avisar('En la app real aquí se abre el menú para imprimir')">
            <Icon name="share" :size="20" />
            Imprimir cartel
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
