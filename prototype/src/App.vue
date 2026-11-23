<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import SimToolbar from './components/SimToolbar.vue'
import ToastHost from './components/ToastHost.vue'
import { ui } from './store'

const mq = window.matchMedia('(max-width: 479px)')
const angosto = ref(mq.matches)
const actualizar = () => {
  angosto.value = mq.matches
}
onMounted(() => {
  actualizar()
  mq.addEventListener('change', actualizar)
})
onBeforeUnmount(() => mq.removeEventListener('change', actualizar))

/** Con ?clean=1 o pantalla angosta: sin barra del simulador ni marco. */
const conMarco = computed(() => !ui.limpio && !angosto.value)
</script>

<template>
  <div
    v-if="conMarco"
    class="min-h-dvh flex flex-wrap items-center justify-center gap-10 px-6 py-8 bg-line/50"
  >
    <SimToolbar />
    <div
      id="phone-frame"
      data-phone-frame
      class="relative overflow-hidden [transform:translateZ(0)] w-[390px] h-[844px] shrink-0 rounded-[40px] bg-canvas ring-10 ring-ink shadow-[0_24px_60px_-20px_rgba(27,42,39,0.45)]"
    >
      <RouterView />
      <ToastHost />
      <div id="sheet-root" />
    </div>
  </div>
  <div
    v-else
    id="phone-frame"
    data-phone-frame
    class="relative overflow-hidden [transform:translateZ(0)] w-full h-dvh bg-canvas"
  >
    <RouterView />
    <ToastHost />
    <div id="sheet-root" />
  </div>
</template>
