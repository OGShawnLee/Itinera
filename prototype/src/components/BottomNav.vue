<script setup lang="ts">
import Icon, { type IconName } from './Icon.vue'

const tabs: { to: string; label: string; icon: IconName }[] = [
  { to: '/home', label: 'Inicio', icon: 'home' },
  { to: '/history', label: 'Bitácora', icon: 'list' },
  { to: '/settings', label: 'Ajustes', icon: 'settings' },
]
</script>

<template>
  <nav class="shrink-0 grid grid-cols-3 bg-surface border-t border-line" aria-label="Secciones">
    <RouterLink
      v-for="t in tabs"
      :key="t.to"
      :to="t.to"
      class="focus-ring relative flex flex-col items-center justify-center gap-0.5 min-h-15 text-sm font-medium text-ink-muted"
      active-class="text-brand! font-bold!"
    >
      <Icon :name="t.icon" :size="22" />
      {{ t.label }}
    </RouterLink>
  </nav>
</template>
