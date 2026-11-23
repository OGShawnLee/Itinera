<script setup lang="ts">
import type { Estado } from '../domain/types'

/** Forma de señal vial por estado: círculo (Bien), triángulo (Ve juntando), octágono (Ya toca). */
withDefaults(defineProps<{ estado: Estado; size?: number }>(), { size: 18 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" aria-hidden="true" class="shrink-0">
    <template v-if="estado === 'ok'">
      <circle cx="12" cy="12" r="11" class="fill-ok-solid" />
      <path d="M7 12.5l3.2 3.2L17 9" class="stroke-surface" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="estado === 'warn'">
      <path d="M12 1.8L23 21.5H1z" class="fill-warn-solid stroke-warn-text" stroke-width="1.4" stroke-linejoin="round" />
      <path d="M12 8.5v6.5" class="stroke-ink" stroke-width="2.6" stroke-linecap="round" />
      <circle cx="12" cy="18.3" r="1.5" class="fill-ink" />
    </template>
    <template v-else>
      <path d="M7.4 1h9.2L23 7.4v9.2L16.6 23H7.4L1 16.6V7.4z" class="fill-crit-solid" />
      <path d="M7.5 12h9" class="stroke-surface" stroke-width="3" stroke-linecap="round" />
    </template>
  </svg>
</template>
