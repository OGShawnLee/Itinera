<script setup lang="ts">
import { RadioGroupRoot } from 'reka-ui'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppScreen from '../components/AppScreen.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import Icon from '../components/Icon.vue'
import OptionItem from '../components/OptionItem.vue'
import { nombreServicio } from '../domain/catalogo'
import { fechaLarga } from '../domain/fechas'
import type { Modalidad, TipoServicio } from '../domain/types'
import { app, avisar, hoy } from '../store'

const route = useRoute()
const router = useRouter()
const registro = computed(() => app.registros.find((r) => r.id === route.params.logId))

const editando = ref(false)
const borrar = ref(false)
const fotoAbierta = ref(false)
const f = reactive({ fecha: '', tipo: 'preventivo' as TipoServicio, modalidad: 'yo' as Modalidad, taller: '', costo: null as number | null, nota: '' })

function editar() {
  const r = registro.value!
  Object.assign(f, { fecha: r.fecha, tipo: r.tipo, modalidad: r.modalidad, taller: r.taller, costo: r.costo, nota: r.nota })
  editando.value = true
}
function guardar() {
  const r = registro.value!
  Object.assign(r, { ...f, taller: f.modalidad === 'taller' ? f.taller.trim() : '' })
  editando.value = false
  avisar('Cambios guardados')
}
function eliminar() {
  app.registros = app.registros.filter((r) => r.id !== route.params.logId)
  avisar('Registro eliminado')
  router.replace('/history')
}
</script>

<template>
  <AppScreen title="Detalle del servicio" back="/history">
    <div v-if="registro" class="flex flex-col gap-3 px-4 pb-5 pt-3">
      <section v-if="!editando" class="card px-4 py-3.5">
        <p class="text-sm text-ink-muted">{{ fechaLarga(registro.fecha) }}</p>
        <h2 class="section-title mt-0.5">
          {{ [...registro.tareas.map(nombreServicio), ...(registro.otro ? ['Reparación general'] : [])].join(', ') }}
        </h2>
        <dl class="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-base">
          <dt class="text-ink-muted">Tipo</dt>
          <dd class="text-ink">{{ registro.tipo === 'preventivo' ? 'Preventivo' : 'Correctivo' }}</dd>
          <dt class="text-ink-muted">Quién lo hizo</dt>
          <dd class="text-ink">{{ registro.modalidad === 'yo' ? 'Hecho por mí' : registro.taller || 'Taller' }}</dd>
          <dt class="text-ink-muted">Costo</dt>
          <dd class="text-ink">{{ registro.costo != null ? `$${registro.costo} MXN` : 'Sin capturar' }}</dd>
          <dt class="text-ink-muted">Nota</dt>
          <dd class="text-ink">{{ registro.nota || 'Sin nota' }}</dd>
        </dl>
        <button v-if="registro.foto" type="button" class="row-tap mt-3 rounded-3 bg-canvas p-2.5" @click="fotoAbierta = !fotoAbierta">
          <span class="inline-flex size-14 items-center justify-center rounded-2 bg-line/60 text-ink-muted"><Icon name="photo" :size="26" /></span>
          <span class="text-base text-ink">{{ fotoAbierta ? 'Ocultar foto' : 'Ver foto del ticket' }}</span>
        </button>
        <div v-if="fotoAbierta" class="mt-2 flex h-48 items-center justify-center rounded-3 bg-line/50 text-base text-ink-muted">
          Foto de ejemplo
        </div>
      </section>

      <section v-else class="card flex flex-col gap-3 px-4 py-3.5">
        <label class="flex flex-col gap-1.5 text-base font-medium text-ink">
          Fecha
          <input v-model="f.fecha" type="date" :max="hoy" class="field" />
        </label>
        <RadioGroupRoot v-model="f.tipo" class="grid grid-cols-2 gap-2" aria-label="Tipo de servicio">
          <OptionItem value="preventivo" title="Preventivo" />
          <OptionItem value="correctivo" title="Correctivo" />
        </RadioGroupRoot>
        <RadioGroupRoot v-model="f.modalidad" class="grid grid-cols-2 gap-2" aria-label="Quién lo hizo">
          <OptionItem value="yo" title="Hecho por mí" />
          <OptionItem value="taller" title="Taller" />
        </RadioGroupRoot>
        <input v-if="f.modalidad === 'taller'" v-model="f.taller" class="field" placeholder="Nombre del taller" aria-label="Nombre del taller" />
        <label class="flex flex-col gap-1.5 text-base font-medium text-ink">
          Costo (pesos)
          <input v-model.number="f.costo" type="number" min="0" class="field" />
        </label>
        <label class="flex flex-col gap-1.5 text-base font-medium text-ink">
          Nota
          <input v-model="f.nota" class="field" />
        </label>
        <div class="flex gap-2">
          <button type="button" class="btn-primary flex-1" @click="guardar">Guardar cambios</button>
          <button type="button" class="btn-secondary" @click="editando = false">Cancelar</button>
        </div>
      </section>

      <div v-if="!editando" class="flex gap-2">
        <button type="button" class="btn-secondary flex-1" @click="editar">Editar</button>
        <button type="button" class="btn-danger flex-1" @click="borrar = true">Eliminar</button>
      </div>

      <ConfirmDialog
        v-model:open="borrar"
        title="¿Eliminar este registro?"
        description="Se borra de tu bitácora y no se puede deshacer."
        confirm-text="Sí, eliminar"
        danger
        @confirm="eliminar"
      />
    </div>
  </AppScreen>
</template>
