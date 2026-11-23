<script setup lang="ts">
import {
  AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger, RadioGroupRoot,
} from 'reka-ui'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppScreen from '../components/AppScreen.vue'
import Icon from '../components/Icon.vue'
import OptionItem from '../components/OptionItem.vue'
import { ITEMS, NOMBRE_TAREA, nombreCortoItem, tareasDeItem } from '../domain/catalogo'
import { agregarRegistro } from '../domain/servicio'
import type { ItemId, Modalidad, TareaId, TipoServicio } from '../domain/types'
import { kmProyectado } from '../domain/vehiculo'
import { app, avisar, hoy, nuevoId } from '../store'

const route = useRoute()
const router = useRouter()
const v = computed(() => app.vehiculo!)

const pre = route.query.consumableId as ItemId | undefined
const elegidos = ref<ItemId[]>(pre && ITEMS.includes(pre) ? [pre] : [])
const otro = ref(false)
const [corta, cambio] = tareasDeItem('transmision', v.value.transmision) as [TareaId, TareaId]
const subTransmision = ref<string>(corta)

const odoSugerido = Math.round(kmProyectado(v.value, hoy))
const f = reactive({
  tipo: 'preventivo' as TipoServicio,
  modalidad: 'yo' as Modalidad,
  taller: '',
  fecha: hoy,
  odo: odoSugerido as number | null,
  costo: null as number | null,
  nota: '',
  foto: false,
})

/** Sugerencias solo de talleres que el usuario ya escribió antes. */
const talleresPrevios = computed(() => [
  ...new Set(app.registros.map((r) => r.taller).filter((t) => t && t.toLowerCase().includes(f.taller.toLowerCase()) && t !== f.taller)),
])

function alternar(id: ItemId) {
  elegidos.value = elegidos.value.includes(id) ? elegidos.value.filter((x) => x !== id) : [...elegidos.value, id]
}

const puedeGuardar = computed(() => elegidos.value.length > 0 || otro.value)

function guardar() {
  if (!puedeGuardar.value) return
  const tareas: TareaId[] = elegidos.value.map((i) =>
    i === 'transmision' ? (subTransmision.value as TareaId) : (i as TareaId),
  )
  const odo = f.odo ?? odoSugerido
  const r = agregarRegistro(
    v.value,
    app.registros,
    {
      id: nuevoId(),
      fecha: f.fecha || hoy,
      tareas,
      otro: otro.value,
      tipo: f.tipo,
      modalidad: f.modalidad,
      taller: f.modalidad === 'taller' ? f.taller.trim() : '',
      odo,
      costo: f.costo,
      nota: f.nota.trim(),
      foto: f.foto,
    },
    odo !== odoSugerido,
  )
  app.vehiculo = r.vehiculo
  app.registros = r.registros
  avisar('Servicio guardado')
  const st = window.history.state as { back?: string | null } | null
  if (st?.back) router.back()
  else router.replace('/home')
}
</script>

<template>
  <AppScreen title="Registrar servicio">
    <div class="flex flex-col gap-5 px-4 pb-5 pt-3">
      <section>
        <h2 class="section-title">¿Qué le hiciste?</h2>
        <p class="label-text">Puedes marcar varios.</p>
        <div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Piezas atendidas">
          <button
            v-for="i in ITEMS"
            :key="i"
            type="button"
            class="chip"
            :aria-pressed="elegidos.includes(i)"
            @click="alternar(i)"
          >
            <Icon v-if="elegidos.includes(i)" name="check" :size="18" />
            {{ nombreCortoItem(i, v.transmision) }}
          </button>
          <button type="button" class="chip" :aria-pressed="otro" @click="otro = !otro">
            <Icon v-if="otro" name="check" :size="18" />
            Otro o reparación general
          </button>
        </div>
        <div v-if="elegidos.includes('transmision')" class="mt-3 rounded-3 bg-surface p-3 ring-1 ring-line">
          <p class="text-base font-medium text-ink">¿Qué le hiciste a la {{ v.transmision === 'cadena' ? 'cadena' : 'banda' }}?</p>
          <RadioGroupRoot v-model="subTransmision" class="mt-2 flex flex-col gap-1.5" aria-label="Trabajo en la transmisión">
            <OptionItem :value="corta" :title="NOMBRE_TAREA[corta]" />
            <OptionItem :value="cambio" :title="NOMBRE_TAREA[cambio]" detail="También reinicia la tarea corta" />
          </RadioGroupRoot>
        </div>
      </section>

      <section>
        <h2 class="section-title">Tipo de servicio</h2>
        <RadioGroupRoot v-model="f.tipo" class="mt-2 grid grid-cols-2 gap-2" aria-label="Tipo de servicio">
          <OptionItem value="preventivo" title="Preventivo" detail="Reinicia la cuenta" class="items-start!" />
          <OptionItem value="correctivo" title="Correctivo" detail="Una reparación" class="items-start!" />
        </RadioGroupRoot>
      </section>

      <section>
        <h2 class="section-title">¿Quién lo hizo?</h2>
        <RadioGroupRoot v-model="f.modalidad" class="mt-2 grid grid-cols-2 gap-2" aria-label="Quién lo hizo">
          <OptionItem value="yo" title="Hecho por mí" />
          <OptionItem value="taller" title="Taller" />
        </RadioGroupRoot>
        <div v-if="f.modalidad === 'taller'" class="mt-2.5">
          <label for="taller" class="text-base font-medium text-ink">Nombre del taller <span class="font-normal text-ink-muted">(opcional)</span></label>
          <input id="taller" v-model="f.taller" class="field mt-1.5" autocomplete="off" />
          <div v-if="talleresPrevios.length" class="mt-2 flex flex-wrap gap-2">
            <button v-for="t in talleresPrevios" :key="t" type="button" class="chip" @click="f.taller = t">{{ t }}</button>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-2 gap-2">
        <label class="flex flex-col gap-1.5 text-base font-medium text-ink">
          Fecha
          <input v-model="f.fecha" type="date" :max="hoy" class="field" />
        </label>
        <label class="flex flex-col gap-1.5 text-base font-medium text-ink">
          {{ v.odometroFunciona ? 'Kilómetros del tablero' : 'Kilómetros (estimado)' }}
          <input v-model.number="f.odo" type="number" inputmode="numeric" min="0" class="field" />
        </label>
      </section>

      <AccordionRoot type="single" collapsible class="card">
        <AccordionItem value="mas">
          <AccordionHeader>
            <AccordionTrigger class="row-tap group justify-between px-4 py-2 text-base font-bold text-ink">
              Más detalles (opcional)
              <Icon name="chevron" :size="20" class="transition-transform group-data-[state=open]:rotate-90" />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent class="flex flex-col gap-3 px-4 pb-4">
            <label class="flex flex-col gap-1.5 text-base font-medium text-ink">
              Costo total (pesos)
              <input v-model.number="f.costo" type="number" inputmode="numeric" min="0" class="field" placeholder="Ej. 320" />
            </label>
            <label class="flex flex-col gap-1.5 text-base font-medium text-ink">
              Nota
              <input v-model="f.nota" class="field" placeholder="Ej. aceite 20W-50 mineral" />
            </label>
            <div>
              <button v-if="!f.foto" type="button" class="btn-secondary w-full" @click="f.foto = true">
                <Icon name="camera" :size="20" />
                Agregar foto del ticket o la pieza
              </button>
              <div v-else class="flex items-center gap-3 rounded-3 bg-canvas p-2.5">
                <span class="inline-flex size-14 items-center justify-center rounded-2 bg-line/60 text-ink-muted"><Icon name="photo" :size="26" /></span>
                <span class="flex-1 text-base text-ink">Foto de ejemplo</span>
                <button type="button" class="btn-ghost" @click="f.foto = false">Quitar</button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </div>

    <template #footer>
      <button type="button" class="btn-primary w-full" :disabled="!puedeGuardar" @click="guardar">Guardar servicio</button>
    </template>
  </AppScreen>
</template>
