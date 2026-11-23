<script setup lang="ts">
import BottomNav from './BottomNav.vue'
import TopBar from './TopBar.vue'

defineProps<{ title?: string; back?: string; tabs?: boolean }>()
</script>

<template>
  <div class="h-full flex flex-col bg-canvas">
    <slot name="header">
      <TopBar v-if="title" :title="title" :fallback="back ?? '/home'" />
    </slot>
    <main class="flex-1 min-h-0 overflow-y-auto overscroll-contain">
      <slot />
    </main>
    <div
      v-if="$slots.footer"
      class="relative shrink-0 px-4 pt-2 pb-3 bg-canvas"
    >
      <span class="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-b from-canvas/0 to-canvas" aria-hidden="true" />
      <slot name="footer" />
    </div>
    <BottomNav v-if="tabs" />
  </div>
</template>
