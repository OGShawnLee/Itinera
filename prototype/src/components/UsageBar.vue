<script setup lang="ts">
import { computed } from 'vue'
import { estado as estadoDe } from '../domain/reglas'

const props = defineProps<{ label: string; fraccion: number | null }>()
const pct = computed(() => (props.fraccion == null ? null : Math.round(props.fraccion * 100)))
const relleno = computed(() => {
  if (props.fraccion == null) return ''
  const e = estadoDe(props.fraccion)
  return e === 'ok' ? 'bg-ok-solid' : e === 'warn' ? 'bg-warn-solid' : 'bg-crit-solid'
})
</script>

<template>
  <div>
    <div class="flex items-baseline justify-between gap-3">
      <span class="text-base font-medium text-ink">{{ label }}</span>
      <span v-if="pct != null" class="text-base font-bold text-ink tabular-nums">{{ pct }}%</span>
      <span v-else class="text-sm text-ink-muted">Sin límite de tiempo</span>
    </div>
    <div
      class="relative mt-1.5 h-2.5 overflow-hidden rounded-full bg-canvas ring-1 ring-line"
      role="img"
      :aria-label="pct != null ? `${label}: ${pct}% usado` : `${label}: sin límite`"
    >
      <div
        v-if="pct != null"
        class="h-full rounded-full"
        :class="relleno"
        :style="{ width: `${Math.min(100, pct)}%` }"
      />
      <span class="absolute inset-y-0 left-[80%] w-0.5 bg-ink/35" aria-hidden="true" />
    </div>
  </div>
</template>
