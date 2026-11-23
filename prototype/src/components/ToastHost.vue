<script setup lang="ts">
import { toasts } from '../store'
</script>

<template>
  <div
    class="pointer-events-none absolute inset-x-4 bottom-36 z-50 flex flex-col items-center gap-2"
    role="status"
    aria-live="polite"
  >
    <TransitionGroup
      enter-from-class="opacity-0 translate-y-2"
      enter-active-class="transition duration-200"
      leave-to-class="opacity-0"
      leave-active-class="transition duration-150"
    >
      <p
        v-for="t in toasts"
        :key="t.id"
        class="max-w-full rounded-3 bg-ink px-4 py-3 text-base font-medium text-surface shadow-[0_8px_20px_-10px_rgba(27,42,39,0.6)]"
      >
        {{ t.texto }}
      </p>
    </TransitionGroup>
  </div>
</template>
