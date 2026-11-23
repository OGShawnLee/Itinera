<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem } from 'reka-ui'

defineProps<{ value: string; title: string; detail?: string }>()
</script>

<template>
  <RadioGroupItem :value="value" class="option-card group">
    <span class="radio-dot group-aria-checked:border-brand">
      <RadioGroupIndicator class="block size-2.5 rounded-full bg-brand" />
    </span>
    <span class="flex min-w-0 flex-col">
      <span class="font-medium leading-snug">{{ title }}</span>
      <span v-if="detail" class="text-sm text-ink-muted">{{ detail }}</span>
    </span>
    <slot />
  </RadioGroupItem>
</template>
