<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { diaSemanaYFecha } from '../domain/fechas'
import { etiquetaTiempo, FACTOR } from '../domain/reglas'
import { aplicarCheckin } from '../domain/servicio'
import { app, avisar, hoy, itemEval } from '../store'

const router = useRouter()
const respondido = ref(false)

const textoAceite = computed(() => {
  const a = itemEval('aceite')
  if (!a) return ''
  if (a.estado === 'crit') return 'Tu aceite: ya toca el cambio. Atiéndelo pronto.'
  return `Tu aceite: te toca cambio ${etiquetaTiempo(a.principal.dias)}. Ve juntando para el servicio.`
})

function responder(factor: number) {
  if (app.vehiculo) app.vehiculo = aplicarCheckin(app.vehiculo, factor, hoy)
  respondido.value = true
  avisar('Listo, lo tomamos en cuenta')
}

const opciones = [
  { label: 'Sí', factor: FACTOR.si },
  { label: 'Menos', factor: FACTOR.menos },
  { label: 'Más', factor: FACTOR.mas },
]
</script>

<template>
  <div class="relative flex h-full flex-col overflow-hidden bg-lock text-lock-ink">
    <!-- Fondo: cerros y niebla, en tonos del tema -->
    <svg class="pointer-events-none absolute inset-x-0 bottom-0 h-72 w-full" viewBox="0 0 390 288" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 150 L70 92 L120 130 L190 60 L250 118 L310 78 L390 128 V288 H0 Z" class="fill-brand/35" />
      <path d="M0 200 L60 168 L140 206 L220 150 L300 196 L390 170 V288 H0 Z" class="fill-brand/55" />
      <path d="M0 238 Q110 214 200 236 T390 228 V288 H0 Z" class="fill-ink/60" />
    </svg>

    <div class="relative px-5 pt-14 text-center">
      <p class="text-3xl font-bold tracking-[-0.03em] tabular-nums">19:00</p>
      <p class="mt-1 text-lg font-medium text-brand-soft first-letter:uppercase">{{ diaSemanaYFecha(hoy) }}</p>
    </div>

    <div class="relative mt-8 flex flex-col gap-3 px-3">
      <article
        v-if="!respondido"
        class="rounded-6 bg-lock-glass px-4 pb-3 pt-3 text-ink"
        aria-label="Notificación de Itinera"
        data-notif="checkin"
      >
        <header class="flex items-center gap-2 text-sm text-ink-muted">
          <span class="inline-flex size-5 items-center justify-center rounded-1.5 bg-brand text-xs font-bold text-brand-ink" aria-hidden="true">i</span>
          <span class="font-bold text-ink">Itinera</span>
          <span>ahora</span>
        </header>
        <p class="mt-1.5 text-base font-bold leading-snug">¿Usaste tu moto como siempre esta semana?</p>
        <div class="mt-2.5 grid grid-cols-3 gap-2">
          <button
            v-for="o in opciones"
            :key="o.label"
            type="button"
            class="focus-ring min-h-11 rounded-3 bg-surface text-base font-bold text-brand ring-1 ring-line cursor-pointer active:bg-brand-tint"
            @click="responder(o.factor)"
          >
            {{ o.label }}
          </button>
        </div>
      </article>

      <button
        v-if="textoAceite"
        type="button"
        class="focus-ring rounded-6 bg-lock-glass px-4 py-3 text-left text-ink cursor-pointer"
        data-notif="aceite"
        @click="router.push('/consumable/aceite')"
      >
        <span class="flex items-center gap-2 text-sm text-ink-muted">
          <span class="inline-flex size-5 items-center justify-center rounded-1.5 bg-brand text-xs font-bold text-brand-ink" aria-hidden="true">i</span>
          <span class="font-bold text-ink">Itinera</span>
          <span>hace 2 h</span>
        </span>
        <span class="mt-1.5 block text-base leading-snug">{{ textoAceite }}</span>
      </button>
    </div>

    <div class="relative mt-auto flex justify-center pb-6">
      <RouterLink to="/home" class="focus-ring inline-flex min-h-11 items-center rounded-full px-5 text-base font-medium text-lock-ink ring-1 ring-surface/50">
        Abrir Itinera
      </RouterLink>
    </div>
  </div>
</template>
