<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { app, avisar, empezarDesdeCero, fijarLimpio, restablecerDatosDePrueba } from '../store'

const router = useRouter()
const route = useRoute()

const capturas = [
  { n: 1, url: '/onboarding?paso=2&seed=1&clean=1', nota: 'Configuración inicial' },
  { n: 2, url: '/home?seed=1&clean=1', nota: 'Inicio con semáforo' },
  { n: 3, url: '/notificaciones?seed=1&clean=1', nota: 'Pantalla de bloqueo' },
  { n: 4, url: '/export?seed=1&clean=1', nota: 'Resumen gratis' },
  { n: 5, url: '/consumable/aceite?seed=1&clean=1', nota: 'Aceite con promoción' },
  { n: 6, url: '/comercio?seed=1&clean=1', nota: 'Vista del comercio' },
]

const esCVT = computed({
  get: () => app.vehiculo?.transmision === 'CVT',
  set: (v: boolean) => {
    if (app.vehiculo) app.vehiculo.transmision = v ? 'CVT' : 'cadena'
  },
})

function restablecer() {
  restablecerDatosDePrueba()
  avisar('Datos de prueba restablecidos')
  router.replace('/home')
}
function desdeCero() {
  empezarDesdeCero()
  router.replace('/onboarding')
}
function limpio() {
  fijarLimpio(true)
  router.replace({ path: route.path, query: { ...route.query, clean: '1' } })
}
</script>

<template>
  <aside
    data-sim-toolbar
    class="w-80 shrink-0 self-center rounded-5 border border-line bg-surface p-5 text-ink"
    aria-label="Simulador"
  >
    <h2 class="section-title">Simulador del prototipo</h2>
    <p class="mt-1 text-sm text-ink-muted">Datos de ejemplo, sin conexión a nada real.</p>

    <h3 class="mt-4 text-base font-bold">Capturas para la encuesta</h3>
    <ul class="mt-1 flex flex-col">
      <li v-for="c in capturas" :key="c.n">
        <a :href="c.url" target="_blank" class="focus-ring flex min-h-11 items-center justify-between gap-2 rounded-2 px-1 text-base font-medium text-brand hover:bg-brand-tint">
          <span>Captura {{ c.n }}</span>
          <span class="text-sm font-normal text-ink-muted">{{ c.nota }}</span>
        </a>
      </li>
    </ul>

    <div class="mt-4 flex flex-col gap-2">
      <button type="button" class="btn-secondary" @click="restablecer">Restablecer datos de prueba</button>
      <button type="button" class="btn-secondary" @click="desdeCero">Empezar desde cero</button>
      <button type="button" class="btn-secondary" @click="limpio">Modo captura limpio</button>
    </div>

    <label class="mt-3 flex min-h-12 cursor-pointer items-center justify-between gap-3">
      <span class="text-base font-medium">Transmisión: {{ esCVT ? 'Banda CVT' : 'Cadena' }}</span>
      <SwitchRoot v-model="esCVT" class="switch-root" :disabled="!app.vehiculo" aria-label="Usar banda CVT">
        <SwitchThumb class="switch-thumb" />
      </SwitchRoot>
    </label>
  </aside>
</template>
