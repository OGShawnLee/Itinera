<script setup lang="ts">
// Patrón decorativo con forma de QR. No codifica ningún enlace ni dato.
withDefaults(defineProps<{ size?: number }>(), { size: 96 })

const N = 21
let semilla = 482
function azar() {
  semilla = (semilla * 1103515245 + 12345) % 2147483648
  return semilla / 2147483648
}
const enEsquina = (x: number, y: number) =>
  (x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8)
const celdas: { x: number; y: number }[] = []
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (!enEsquina(x, y) && azar() > 0.52) celdas.push({ x, y })
  }
}
const esquinas = [
  { x: 0, y: 0 },
  { x: N - 7, y: 0 },
  { x: 0, y: N - 7 },
]
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="`-1 -1 ${N + 2} ${N + 2}`"
    role="img"
    aria-label="Código QR de ejemplo"
    class="shrink-0 rounded-2 bg-surface"
    shape-rendering="crispEdges"
  >
    <rect v-for="(c, i) in celdas" :key="i" :x="c.x" :y="c.y" width="1" height="1" class="fill-ink" />
    <g v-for="(e, i) in esquinas" :key="`e${i}`">
      <rect :x="e.x" :y="e.y" width="7" height="7" class="fill-ink" />
      <rect :x="e.x + 1" :y="e.y + 1" width="5" height="5" class="fill-surface" />
      <rect :x="e.x + 2" :y="e.y + 2" width="3" height="3" class="fill-ink" />
    </g>
  </svg>
</template>
