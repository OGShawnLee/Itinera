<script setup lang="ts">
export type IconName =
  | 'back' | 'plus' | 'check' | 'home' | 'list' | 'settings' | 'wrench' | 'camera'
  | 'share' | 'store' | 'close' | 'info' | 'chevron' | 'photo' | 'gauge' | 'bell' | 'map'

withDefaults(defineProps<{ name: IconName; size?: number }>(), { size: 22 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="shrink-0"
  >
    <path v-if="name === 'back'" d="M15 18l-6-6 6-6" />
    <path v-else-if="name === 'chevron'" d="M9 18l6-6-6-6" />
    <path v-else-if="name === 'plus'" d="M12 5v14M5 12h14" />
    <path v-else-if="name === 'check'" d="M5 12.5l4.5 4.5L19 7.5" />
    <path v-else-if="name === 'close'" d="M6 6l12 12M18 6L6 18" />
    <template v-else-if="name === 'home'">
      <path d="M4 11l8-7 8 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" />
    </template>
    <template v-else-if="name === 'list'">
      <rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 8.5h6M9 12h6M9 15.5h4" />
    </template>
    <template v-else-if="name === 'settings'">
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" />
    </template>
    <path
      v-else-if="name === 'wrench'"
      d="M14.5 6.5a4 4 0 0 0 5 5L13 18a2.1 2.1 0 0 1-3-3l6.5-6.5a4 4 0 0 0-2-2zM6 18l-1.5 1.5"
    />
    <template v-else-if="name === 'camera'">
      <path d="M4 8h3l2-2.5h6L17 8h3v11H4z" /><circle cx="12" cy="13" r="3.5" />
    </template>
    <template v-else-if="name === 'photo'">
      <rect x="3.5" y="5" width="17" height="14" rx="2" /><path d="M3.5 16l5-5 4 4 3-3 5 5" /><circle cx="15.5" cy="9" r="1.3" />
    </template>
    <template v-else-if="name === 'share'">
      <path d="M12 15V4M8 7.5L12 4l4 3.5" /><path d="M6 11v9h12v-9" />
    </template>
    <template v-else-if="name === 'store'">
      <path d="M4 9.5L5.5 4h13L20 9.5" /><path d="M5 9.5V20h14V9.5" /><path d="M4 9.5h16" /><path d="M10 20v-5h4v5" />
    </template>
    <template v-else-if="name === 'info'">
      <circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8h.01" />
    </template>
    <template v-else-if="name === 'gauge'">
      <path d="M4.5 16a8 8 0 1 1 15 0" /><path d="M12 13l3.5-4" /><circle cx="12" cy="14" r="1" />
    </template>
    <template v-else-if="name === 'bell'">
      <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" /><path d="M10 20.5h4" />
    </template>
    <template v-else-if="name === 'map'">
      <path d="M12 21s-6-5.5-6-10.5a6 6 0 0 1 12 0C18 15.5 12 21 12 21z" /><circle cx="12" cy="10.5" r="2" />
    </template>
  </svg>
</template>
