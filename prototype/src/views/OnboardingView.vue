<script setup lang="ts">
import { RadioGroupRoot } from 'reka-ui'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppScreen from '../components/AppScreen.vue'
import Icon from '../components/Icon.vue'
import OptionItem from '../components/OptionItem.vue'
import TopBar from '../components/TopBar.vue'
import {
  DIAS_OPCIONES, NOMBRE_TRANSMISION, PLANTILLAS, RUTINAS, TIPOS_MOTO, tipoMotoTitulo,
} from '../domain/catalogo'
import { crearVehiculo, transmisionDeTipo, type UltimoAceite } from '../domain/servicio'
import type { Dias, PlantillaId, Rutina, TipoMoto, Transmision } from '../domain/types'
import { app, hoy } from '../store'

const route = useRoute()
const router = useRouter()

const paso = computed(() => {
  const n = Number(route.query.paso)
  return n === 2 || n === 3 ? n : 1
})

// Si ya hay moto, se parte de sus datos; si no, se elige desde cero.
const v = app.vehiculo
const f = reactive({
  tipo: (v?.tipo ?? '') as TipoMoto | '',
  transmision: (v?.transmision ?? 'cadena') as Transmision,
  apodo: v?.apodo ?? '',
  plantilla: (v?.plantilla ?? '') as PlantillaId | '',
  rutina: (v?.rutina ?? '') as Rutina | '',
  dias: (v?.dias ?? '') as Dias | '',
  odometro: (v ? (v.odometroFunciona ? 'si' : 'no') : '') as 'si' | 'no' | '',
  lectura: v?.odometroFunciona ? Math.round(v.kmBase) : (null as number | null),
  tasaManual: v?.tasaManual ?? (null as number | null),
  ultimoAceite: '' as UltimoAceite | '',
})
const manual = ref(f.tasaManual != null)

function elegirTipo(t: string) {
  f.tipo = t as TipoMoto
  f.transmision = transmisionDeTipo(f.tipo)
}
function elegirRutina(r: string) {
  f.rutina = r as Rutina
  if (r === 'R4' && !f.plantilla) f.plantilla = 'trabajo'
}

const puedeSeguir = computed(() => {
  if (paso.value === 1) return !!f.tipo && !!f.plantilla
  if (paso.value === 2) {
    const odoOk = f.odometro === 'no' || (f.odometro === 'si' && f.lectura != null && f.lectura >= 0)
    return !!f.rutina && !!f.dias && odoOk
  }
  return !!f.ultimoAceite
})

function ir(n: number) {
  router.push({ path: '/onboarding', query: { paso: String(n) } })
}

function empezar() {
  if (!f.tipo || !f.plantilla || !f.rutina || !f.dias || !f.ultimoAceite) return
  app.vehiculo = crearVehiculo(
    {
      apodo: f.apodo,
      tipo: f.tipo,
      transmision: f.transmision,
      plantilla: f.plantilla,
      rutina: f.rutina,
      dias: f.dias,
      tasaManual: manual.value && f.tasaManual ? f.tasaManual : null,
      odometroFunciona: f.odometro === 'si',
      lectura: f.odometro === 'si' ? f.lectura : null,
      ultimoAceite: f.ultimoAceite,
    },
    hoy,
  )
  app.registros = []
  router.replace('/home')
}

function siguiente() {
  if (!puedeSeguir.value) return
  if (paso.value < 3) ir(paso.value + 1)
  else empezar()
}

const ACEITE: { id: UltimoAceite; titulo: string; detalle: string }[] = [
  { id: 'reciente', titulo: 'Hace poco', detalle: 'Recién afinada' },
  { id: 'mitad', titulo: 'Hace un tiempo', detalle: 'Va a mitad de camino' },
  { id: 'pronto', titulo: 'Hace mucho', detalle: 'Ya le toca pronto' },
  { id: 'no-recuerdo', titulo: 'No recuerdo', detalle: 'Empezar desde cero' },
]
const fallback = computed(() => (paso.value > 1 ? `/onboarding?paso=${paso.value - 1}` : '/home'))
</script>

<template>
  <AppScreen>
    <template #header>
      <TopBar :title="`Paso ${paso} de 3`" :fallback="fallback" :show-back="paso > 1 || !!app.vehiculo" :bordered="false" />
      <div class="flex gap-1.5 bg-canvas px-4 pb-1" aria-hidden="true">
        <span v-for="n in 3" :key="n" class="h-1.5 flex-1 rounded-full" :class="n <= paso ? 'bg-brand' : 'bg-line'" />
      </div>
    </template>

    <!-- Paso 1: tipo de moto, apodo y plantilla -->
    <div v-if="paso === 1" class="flex flex-col gap-5 px-4 pb-6 pt-3">
      <section>
        <h2 class="section-title">¿Qué moto tienes?</h2>
        <RadioGroupRoot :model-value="f.tipo" class="mt-2 grid grid-cols-2 gap-2" aria-label="Tipo de moto" @update:model-value="(x) => elegirTipo(String(x))">
          <OptionItem v-for="t in TIPOS_MOTO" :key="t.id" :value="t.id" :title="t.titulo" :detail="t.detalle" class="items-start! py-2.5!" />
        </RadioGroupRoot>
        <div v-if="f.tipo" class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span class="text-base text-ink">Transmisión:</span>
          <RadioGroupRoot v-model="f.transmision" class="flex gap-2" aria-label="Transmisión" orientation="horizontal">
            <OptionItem value="cadena" title="Cadena" class="w-auto! py-1!" />
            <OptionItem value="CVT" title="Banda CVT" class="w-auto! py-1!" />
          </RadioGroupRoot>
        </div>
      </section>

      <section>
        <label for="apodo" class="section-title block">¿Cómo le dices? <span class="text-base font-normal text-ink-muted">(opcional)</span></label>
        <input id="apodo" v-model="f.apodo" class="field mt-2" placeholder="Mi moto" autocomplete="off" />
        <button v-if="!f.apodo" type="button" class="chip mt-2" @click="f.apodo = 'Mi FT150'">Usar “Mi FT150”</button>
      </section>

      <section>
        <h2 class="section-title">Elige una plantilla</h2>
        <p class="label-text">Puedes cambiar cada intervalo después.</p>
        <RadioGroupRoot v-model="f.plantilla" class="mt-2 flex flex-col gap-2" aria-label="Plantilla">
          <OptionItem v-for="p in PLANTILLAS" :key="p.id" :value="p.id" :title="p.titulo" :detail="p.resumen" class="py-2.5!" />
        </RadioGroupRoot>
      </section>
    </div>

    <!-- Paso 2: rutina primero (Captura 1), luego odómetro -->
    <div v-else-if="paso === 2" class="flex flex-col gap-4 px-4 pb-6 pt-2.5">
      <div class="flex min-h-11 items-center justify-between gap-3 rounded-3 bg-surface px-3.5 ring-1 ring-line" data-recap>
        <span class="min-w-0 truncate text-base text-ink">
          <span class="text-ink-muted">Tu moto: </span><span class="font-bold">{{ f.tipo ? tipoMotoTitulo(f.tipo) : 'Sin elegir' }}</span>
        </span>
        <span class="badge-neutral shrink-0">{{ NOMBRE_TRANSMISION[f.transmision] }}</span>
      </div>

      <section>
        <h2 class="section-title">¿Cómo usas tu moto en un día normal?</h2>
        <RadioGroupRoot :model-value="f.rutina" class="mt-2 flex flex-col gap-1.5" aria-label="Uso en un día normal" @update:model-value="(x) => elegirRutina(String(x))">
          <OptionItem v-for="r in RUTINAS" :key="r.id" :value="r.id" :title="r.titulo" :detail="r.detalle || undefined" />
        </RadioGroupRoot>
      </section>

      <section>
        <h2 class="section-title">¿Cuántos días a la semana la usas?</h2>
        <RadioGroupRoot v-model="f.dias" class="mt-2 grid grid-cols-2 gap-1.5" aria-label="Días por semana">
          <OptionItem v-for="d in DIAS_OPCIONES" :key="d.id" :value="d.id" :title="d.titulo" />
        </RadioGroupRoot>
        <p class="mt-2.5 flex items-center gap-2 text-sm text-ink-muted">
          <Icon name="info" :size="18" />
          No necesitas saber de mecánica ni contar kilómetros.
        </p>
      </section>

      <section>
        <h2 class="section-title">¿Funciona tu odómetro?</h2>
        <RadioGroupRoot v-model="f.odometro" class="mt-2 flex flex-col gap-1.5" aria-label="Estado del odómetro">
          <OptionItem value="si" title="Sí funciona" />
          <OptionItem value="no" title="No funciona" detail="Llevamos la cuenta por uso y por tiempo" />
        </RadioGroupRoot>
        <div v-if="f.odometro === 'si'" class="mt-2.5">
          <label for="lectura" class="text-base font-medium text-ink">¿Cuántos kilómetros marca hoy tu tablero?</label>
          <input id="lectura" v-model.number="f.lectura" type="number" inputmode="numeric" min="0" class="field mt-1.5" />
        </div>
        <button v-if="!manual" type="button" class="btn-ghost mt-1" @click="manual = true">Ingresar km/día manualmente</button>
        <div v-else class="mt-2.5">
          <label for="tasa" class="text-base font-medium text-ink">¿Cuántos kilómetros recorres al día?</label>
          <input id="tasa" v-model.number="f.tasaManual" type="number" inputmode="numeric" min="1" class="field mt-1.5" />
          <button type="button" class="btn-ghost mt-1" @click="manual = false; f.tasaManual = null">Mejor calcularlo con mi rutina</button>
        </div>
      </section>
    </div>

    <!-- Paso 3: último cambio de aceite -->
    <div v-else class="flex flex-col gap-3 px-4 pb-6 pt-3">
      <h2 class="section-title">¿Cuándo fue tu último cambio de aceite?</h2>
      <p class="label-text -mt-1">Así no empieza todo en verde si tu moto ya tiene uso.</p>
      <RadioGroupRoot v-model="f.ultimoAceite" class="flex flex-col gap-2" aria-label="Último cambio de aceite">
        <OptionItem v-for="a in ACEITE" :key="a.id" :value="a.id" :title="a.titulo" :detail="a.detalle" />
      </RadioGroupRoot>
    </div>

    <template #footer>
      <button type="button" class="btn-primary w-full" :disabled="!puedeSeguir" @click="siguiente">
        {{ paso === 3 ? 'Empezar seguimiento' : 'Continuar' }}
      </button>
    </template>
  </AppScreen>
</template>
