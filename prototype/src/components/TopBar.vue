<script setup lang="ts">
import { useRouter } from 'vue-router'
import Icon from './Icon.vue'

const props = withDefaults(defineProps<{ title: string; fallback?: string; showBack?: boolean; bordered?: boolean }>(), {
  bordered: true,
  fallback: '/home',
  showBack: true,
})
const router = useRouter()

function volver() {
  const st = window.history.state as { back?: string | null } | null
  if (st?.back) router.back()
  else router.replace(props.fallback)
}
</script>

<template>
  <header class="shrink-0 flex items-center gap-1 min-h-14 px-2 bg-canvas" :class="bordered ? 'border-b border-line' : ''">
    <button
      v-if="showBack"
      type="button"
      class="focus-ring inline-flex items-center justify-center size-11 rounded-full text-ink hover:bg-line/40 cursor-pointer"
      aria-label="Regresar"
      @click="volver"
    >
      <Icon name="back" :size="24" />
    </button>
    <span v-else class="w-3" />
    <h1 class="flex-1 min-w-0 truncate text-lg font-bold text-ink">{{ title }}</h1>
    <slot name="right" />
  </header>
</template>
