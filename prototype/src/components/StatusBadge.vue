<script setup lang="ts">
import { ETIQUETA_ESTADO } from '../domain/reglas'
import type { Estado } from '../domain/types'
import StatusShape from './StatusShape.vue'

defineProps<{ estado: Estado }>()
const CLASE: Record<Estado, string> = { ok: 'badge-ok', warn: 'badge-warn', crit: 'badge-crit' }
</script>

<template>
  <span :class="CLASE[estado]" :data-estado="estado">
    <StatusShape :estado="estado" :size="16" />
    {{ ETIQUETA_ESTADO[estado] }}
  </span>
</template>
