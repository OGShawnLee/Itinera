<script setup lang="ts">
import {
  DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle,
  RadioGroupRoot,
} from 'reka-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppScreen from '../components/AppScreen.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import Icon from '../components/Icon.vue'
import OptionItem from '../components/OptionItem.vue'
import SwitchRow from '../components/SwitchRow.vue'
import {
  DIAS_OPCIONES, intervalosDePlantilla, NOMBRE_TRANSMISION, nombreServicio, PLANTILLAS, plantillaTitulo,
  RUTINAS, rutinaEnPalabras, TIPOS_MOTO, tipoMotoTitulo,
} from '../domain/catalogo'
import type { Dias, PlantillaId, Rutina, TipoMoto, Transmision } from '../domain/types'
import { app, avisar, hoy, restablecerDatosDePrueba } from '../store'

const router = useRouter()
const v = computed(() => app.vehiculo!)

const tipo = computed({
  get: () => v.value.tipo,
  set: (x: TipoMoto) => (v.value.tipo = x),
})
const transmision = computed({
  get: () => v.value.transmision,
  set: (x: Transmision) => (v.value.transmision = x),
})
const plantilla = computed({
  get: () => v.value.plantilla,
  set: (x: PlantillaId) => {
    v.value.plantilla = x
    v.value.intervalos = intervalosDePlantilla(x)
    avisar(`Intervalos de ${plantillaTitulo(x)} aplicados`)
  },
})
const rutina = computed({ get: () => v.value.rutina, set: (x: Rutina) => (v.value.rutina = x) })
const dias = computed({ get: () => v.value.dias, set: (x: Dias) => (v.value.dias = x) })
const sinOdometro = computed({
  get: () => !v.value.odometroFunciona,
  set: (x: boolean) => (v.value.odometroFunciona = !x),
})
const tasaManual = computed({
  get: () => v.value.tasaManual ?? '',
  set: (x: number | string) => (v.value.tasaManual = x === '' || x == null || Number(x) <= 0 ? null : Number(x)),
})

const respaldo = ref(false)
const restablecer = ref(false)
const DIAS_SEMANA = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']

const respaldoTexto = computed(() =>
  JSON.stringify(
    {
      app: 'Itinera',
      guardado: hoy,
      moto: {
        apodo: v.value.apodo,
        tipo: tipoMotoTitulo(v.value.tipo),
        'transmisión': NOMBRE_TRANSMISION[v.value.transmision],
        plantilla: plantillaTitulo(v.value.plantilla),
        uso: rutinaEnPalabras(v.value.rutina, v.value.dias),
        'taller de confianza': v.value.taller || null,
      },
      servicios: app.registros.map((r) => ({
        fecha: r.fecha,
        servicio: r.tareas.map(nombreServicio).join(', '),
        'quién lo hizo': r.modalidad === 'yo' ? 'Hecho por mí' : r.taller || 'Taller',
        costo: r.costo,
        nota: r.nota,
      })),
    },
    null,
    2,
  ),
)

function escanear() {
  v.value.taller = 'Taller Ejemplo'
  avisar('En la app real aquí se abre la cámara')
}
function restablecerTodo() {
  restablecerDatosDePrueba()
  avisar('Datos de prueba restablecidos')
  router.replace('/home')
}
</script>

<template>
  <AppScreen tabs>
    <template #header>
      <header class="shrink-0 px-4 pb-2 pt-4">
        <h1 class="screen-title">Ajustes</h1>
      </header>
    </template>

    <div class="flex flex-col gap-3 px-4 pb-6">
      <section class="card px-4 py-3.5" aria-labelledby="s-moto">
        <h2 id="s-moto" class="section-title">Mi moto</h2>
        <label class="mt-2 flex flex-col gap-1.5 text-base font-medium text-ink">
          Apodo
          <input v-model="v.apodo" class="field" autocomplete="off" />
        </label>

        <h3 class="mt-4 text-base font-bold text-ink">Tipo de moto</h3>
        <RadioGroupRoot v-model="tipo" class="mt-1.5 grid grid-cols-2 gap-1.5" aria-label="Tipo de moto">
          <OptionItem v-for="t in TIPOS_MOTO" :key="t.id" :value="t.id" :title="t.titulo" class="items-start!" />
        </RadioGroupRoot>

        <h3 class="mt-4 text-base font-bold text-ink">Transmisión</h3>
        <RadioGroupRoot v-model="transmision" class="mt-1.5 grid grid-cols-2 gap-1.5" aria-label="Transmisión">
          <OptionItem value="cadena" title="Cadena" />
          <OptionItem value="CVT" title="Banda CVT" />
        </RadioGroupRoot>

        <h3 class="mt-4 text-base font-bold text-ink">Plantilla</h3>
        <RadioGroupRoot v-model="plantilla" class="mt-1.5 flex flex-col gap-1.5" aria-label="Plantilla">
          <OptionItem v-for="p in PLANTILLAS" :key="p.id" :value="p.id" :title="p.titulo" />
        </RadioGroupRoot>

        <h3 class="mt-4 text-base font-bold text-ink">¿Cómo usas tu moto en un día normal?</h3>
        <RadioGroupRoot v-model="rutina" class="mt-1.5 flex flex-col gap-1.5" aria-label="Uso en un día normal">
          <OptionItem v-for="r in RUTINAS" :key="r.id" :value="r.id" :title="r.titulo" :detail="r.detalle || undefined" />
        </RadioGroupRoot>

        <h3 class="mt-4 text-base font-bold text-ink">¿Cuántos días a la semana la usas?</h3>
        <RadioGroupRoot v-model="dias" class="mt-1.5 grid grid-cols-2 gap-1.5" aria-label="Días por semana">
          <OptionItem v-for="d in DIAS_OPCIONES" :key="d.id" :value="d.id" :title="d.titulo" />
        </RadioGroupRoot>

        <label class="mt-4 flex flex-col gap-1.5 text-base font-medium text-ink">
          Km por día, solo si lo sabes
          <input v-model="tasaManual" type="number" min="1" inputmode="numeric" class="field" placeholder="Lo calculamos con tu rutina" />
        </label>
      </section>

      <section class="card px-4 py-1.5" aria-label="Odómetro">
        <SwitchRow v-model="sinOdometro" label="Mi odómetro no funciona" detail="Seguimos la cuenta por uso y por tiempo" />
      </section>

      <section class="card px-4 py-3.5" aria-labelledby="s-taller">
        <h2 id="s-taller" class="section-title">Mi taller de confianza</h2>
        <p class="label-text">Solo se guarda en tu teléfono.</p>
        <input v-model="v.taller" class="field mt-2" placeholder="Nombre de tu taller" aria-label="Nombre de tu taller" />
        <button type="button" class="btn-secondary mt-2 w-full" @click="escanear">Escanear QR del taller</button>
      </section>

      <RouterLink to="/settings/intervals" class="card row-tap justify-between px-4 py-3">
        <span>
          <span class="block text-base font-bold text-ink">Intervalos de mantenimiento</span>
          <span class="block text-sm text-ink-muted">Cada cuánto toca cada pieza</span>
        </span>
        <Icon name="chevron" class="text-ink-muted" />
      </RouterLink>

      <section class="card px-4 py-3.5" aria-labelledby="s-avisos">
        <h2 id="s-avisos" class="section-title">Recordatorios</h2>
        <div class="mt-2 grid grid-cols-2 gap-2">
          <label class="flex flex-col gap-1.5 text-base font-medium text-ink">
            Día de la pregunta semanal
            <select v-model="app.prefs.checkinDia" class="field">
              <option v-for="d in DIAS_SEMANA" :key="d" :value="d">{{ d }}</option>
            </select>
          </label>
          <label class="flex flex-col gap-1.5 text-base font-medium text-ink">
            Hora
            <input v-model="app.prefs.checkinHora" type="time" class="field" />
          </label>
        </div>
        <h3 class="mt-4 text-base font-bold text-ink">Avisarme cuando</h3>
        <RadioGroupRoot v-model="app.prefs.alertas" class="mt-1.5 flex flex-col gap-1.5" aria-label="Avisos">
          <OptionItem value="ambas" title="Ve juntando y Ya toca" />
          <OptionItem value="rojo" title="Solo cuando ya toca" />
        </RadioGroupRoot>
      </section>

      <section class="card px-4 py-1.5" aria-label="Promociones">
        <SwitchRow v-model="app.prefs.mostrarPromociones" label="Mostrar promociones de negocios cercanos" detail="Próximamente. Siempre marcadas como pagadas." />
      </section>

      <section class="card px-4 py-3.5" aria-labelledby="s-datos">
        <h2 id="s-datos" class="section-title">Tus datos</h2>
        <p class="label-text">Todo vive en tu teléfono. Guarda una copia antes de cambiar de celular.</p>
        <button type="button" class="btn-secondary mt-2.5 w-full" @click="respaldo = true">Guardar copia de respaldo</button>
        <button type="button" class="btn-danger mt-2 w-full" @click="restablecer = true">Restablecer datos de prueba</button>
      </section>
    </div>

    <DialogRoot v-model:open="respaldo">
      <DialogPortal to="#sheet-root">
        <DialogOverlay class="absolute inset-0 z-40 bg-ink/45" />
        <DialogContent class="absolute inset-x-0 bottom-0 z-50 max-h-[85%] overflow-y-auto rounded-t-7 bg-surface px-4 pb-5 pt-4 focus:outline-none">
          <DialogTitle class="screen-title">Copia de respaldo</DialogTitle>
          <DialogDescription class="mt-1 text-base text-ink-muted">Así se vería el archivo itinera-respaldo-{{ hoy }}.json</DialogDescription>
          <pre class="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-3 bg-canvas p-3 text-sm text-ink">{{ respaldoTexto }}</pre>
          <button type="button" class="btn-primary mt-3 w-full" @click="avisar('En la app real aquí se guarda el archivo en tu teléfono'); respaldo = false">
            Guardar archivo
          </button>
          <DialogClose class="btn-secondary mt-2 w-full">Cerrar</DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>

    <ConfirmDialog
      v-model:open="restablecer"
      title="¿Restablecer datos de prueba?"
      description="Se reemplazan tu moto y tu bitácora por los datos de ejemplo."
      confirm-text="Sí, restablecer"
      danger
      @confirm="restablecerTodo"
    />
  </AppScreen>
</template>
