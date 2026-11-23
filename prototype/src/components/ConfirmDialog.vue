<script setup lang="ts">
import {
  DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle,
} from 'reka-ui'

defineProps<{ title: string; description: string; confirmText: string; danger?: boolean }>()
const open = defineModel<boolean>('open', { required: true })
const emit = defineEmits<{ confirm: [] }>()

function confirmar() {
  emit('confirm')
  open.value = false
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal to="#sheet-root">
      <DialogOverlay class="absolute inset-0 z-40 bg-ink/45" />
      <DialogContent
        class="absolute inset-x-4 top-1/2 z-50 -translate-y-1/2 rounded-5 bg-surface p-5 focus:outline-none"
      >
        <DialogTitle class="screen-title">{{ title }}</DialogTitle>
        <DialogDescription class="mt-2 text-base text-ink-muted">{{ description }}</DialogDescription>
        <slot />
        <div class="mt-5 flex flex-col gap-2">
          <button type="button" :class="danger ? 'btn-danger' : 'btn-primary'" @click="confirmar">
            {{ confirmText }}
          </button>
          <DialogClose class="btn-secondary">Cancelar</DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
