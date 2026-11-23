<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'

defineProps<{ label: string; detail?: string }>()
const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label class="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-1.5">
    <span class="flex min-w-0 flex-col">
      <span class="text-base font-medium text-ink">{{ label }}</span>
      <span v-if="detail" class="text-sm text-ink-muted">{{ detail }}</span>
    </span>
    <SwitchRoot v-model="model" class="switch-root">
      <SwitchThumb class="switch-thumb" />
    </SwitchRoot>
  </label>
</template>
