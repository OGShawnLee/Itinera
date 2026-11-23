// Utilidades compartidas por verify.mjs y capture.mjs (ESM plano).
import { spawn, spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WIN = process.platform === 'win32'

export const VIEWPORT = { width: 390, height: 844 }

/** Las 6 capturas de MARKET_STUDY.md §2.3 / task.md §7. */
export const CAPTURAS = [
  {
    archivo: 'captura-1.png',
    url: '/onboarding?paso=2&seed=1&clean=1',
    requeridos: ['Paso 2 de 3', '¿Cómo usas tu moto en un día normal?', 'Varios viajes en el día', '¿Cuántos días a la semana la usas?', '5 o 6 días'],
    visibles: [
      { texto: 'Paso 2 de 3' },
      { selector: '[data-recap]', nombre: 'recap del tipo de moto' },
      { texto: '¿Cómo usas tu moto en un día normal?' },
      { texto: 'Traslados cortos dentro de mi zona' },
      { texto: 'Cruzo la ciudad de ida y vuelta' },
      { texto: 'Varios viajes en el día' },
      { texto: 'Reparto o uso continuo casi todo el día' },
      { selector: '[role=radio][value=R3][data-state=checked]', nombre: 'R3 seleccionada' },
      { texto: '¿Cuántos días a la semana la usas?' },
      { texto: '1 o 2 días' },
      { texto: '3 o 4 días' },
      { texto: '5 o 6 días' },
      { texto: 'Todos los días' },
      { selector: '[role=radio][value="5-6"][data-state=checked]', nombre: '5 o 6 días seleccionado' },
      { texto: 'No necesitas saber de mecánica ni contar kilómetros.' },
      { texto: 'Continuar' },
    ],
  },
  {
    archivo: 'captura-2.png',
    url: '/home?seed=1&clean=1',
    requeridos: ['Ve juntando', 'en ~2 semanas', 'Ya toca', 'Bien', 'Registrar servicio', 'Inicio', 'Bitácora', 'Ajustes'],
    visibles: [
      { selector: '#moto-apodo', nombre: 'encabezado' },
      { texto: 'Ajustar uso' },
      { selector: '[data-banner]', nombre: 'banner' },
      { selector: '[data-item=aceite]', nombre: 'tarjeta Aceite', contiene: ['Ve juntando', 'en ~2 semanas'] },
      { selector: '[data-item=transmision]', nombre: 'tarjeta Cadena', contiene: ['Cadena', 'Ya toca'] },
      { selector: '[data-item=frenos]', nombre: 'tarjeta Frenos', contiene: ['Bien'] },
      { selector: '[data-item=bujia]', nombre: 'tarjeta Bujía', contiene: ['Bien'] },
      { selector: '[data-item=llantas]', nombre: 'tarjeta Llantas', contiene: ['Bien'] },
      { texto: 'Registrar servicio' },
      { texto: 'Inicio' },
      { texto: 'Bitácora' },
      { texto: 'Ajustes' },
    ],
  },
  {
    archivo: 'captura-3.png',
    url: '/notificaciones?seed=1&clean=1',
    requeridos: ['¿Usaste tu moto como siempre esta semana?', 'Sí', 'Menos', 'Más', 'te toca cambio en ~2 semanas'],
    visibles: [
      { texto: '19:00', nombre: 'reloj' },
      { selector: '[data-notif=checkin]', nombre: 'notificación semanal' },
      { selector: '[data-notif=checkin] button:nth-of-type(1)', nombre: 'botón Sí' },
      { selector: '[data-notif=checkin] button:nth-of-type(2)', nombre: 'botón Menos' },
      { selector: '[data-notif=checkin] button:nth-of-type(3)', nombre: 'botón Más' },
      { selector: '[data-notif=aceite]', nombre: 'notificación de aceite' },
    ],
  },
  {
    archivo: 'captura-4.png',
    url: '/export?seed=1&clean=1',
    requeridos: ['Incluir montos', 'Aceite de motor', 'Cadena: lubricación y ajuste', 'Frenos (balatas)', 'Bujía'],
    visibles: [
      { texto: 'Últimos 6 meses' },
      { texto: 'Historial completo' },
      { selector: '[role=switch]', nombre: 'interruptor Incluir montos' },
      { texto: 'Incluir montos' },
      { texto: 'Resumen de mantenimiento' },
      { selector: '[data-fila]:nth-of-type(1)', nombre: 'fila 1' },
      { selector: '[data-fila]:nth-of-type(2)', nombre: 'fila 2' },
      { selector: '[data-fila]:nth-of-type(3)', nombre: 'fila 3' },
      { selector: '[data-fila]:nth-of-type(4)', nombre: 'fila 4' },
    ],
  },
  {
    archivo: 'captura-5.png',
    url: '/consumable/aceite?seed=1&clean=1',
    requeridos: ['Promoción pagada', 'Próximamente', 'Refaccionaria Ejemplo', '10% en cambio de aceite', 'ITN-482', 'Itinera no califica ni certifica talleres.', 'Por recorrido', 'Por tiempo'],
    visibles: [
      { selector: '[data-estado-detalle]', nombre: 'estado y barras', contiene: ['Ve juntando', 'Por recorrido', 'Por tiempo'] },
      { selector: '[data-promo]', nombre: 'tarjeta de promoción completa', contiene: ['ITN-482', 'Itinera no califica ni certifica talleres.'] },
    ],
  },
  {
    archivo: 'captura-6.png',
    url: '/comercio?seed=1&clean=1',
    requeridos: ['Próximamente', 'Escribe el código del cliente', 'Código válido', 'Clientes comprobados gratis: 4 de 10', '18 personas', '7 llegaron con código', 'Código QR de ejemplo'],
    visibles: [
      { texto: 'Escribe el código del cliente' },
      { selector: '#codigo', nombre: 'campo de código' },
      { selector: '[data-resultado]', nombre: 'resultado', contiene: ['Código válido'] },
      { texto: 'Clientes comprobados gratis: 4 de 10' },
      { texto: 'Este mes: 18 personas vieron su promoción y 7 llegaron con código.' },
      { selector: '[aria-label="Código QR de ejemplo"]', nombre: 'QR decorativo' },
      { texto: 'Imprimir cartel' },
    ],
  },
]

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: WIN })
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(' ')} terminó con código ${r.status}`)
}

async function esperarServidor(url, ms = 30000) {
  const fin = Date.now() + ms
  while (Date.now() < fin) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      // aún no responde
    }
    await new Promise((r) => setTimeout(r, 300))
  }
  throw new Error(`El servidor no respondió en ${url}`)
}

/** Compila (bun run build) y sirve dist con `bun run preview`. Con `--dev` usa el servidor de desarrollo. */
export async function iniciarServidor({ dev = false } = {}) {
  const puerto = dev ? 5179 : 4173
  const args = dev ? ['x', 'vite', '--port', String(puerto), '--strictPort'] : ['run', 'preview']
  if (!dev) run('bun', ['run', 'build'])
  const proc = spawn('bun', args, { cwd: ROOT, stdio: 'ignore', shell: WIN })
  const base = `http://localhost:${puerto}`
  await esperarServidor(base)
  return {
    base,
    cerrar() {
      if (WIN) spawnSync('taskkill', ['/pid', String(proc.pid), '/T', '/F'], { stdio: 'ignore' })
      else proc.kill('SIGTERM')
    },
  }
}

/** Espera a Satoshi y confirma que cargó. */
export async function esperarFuentes(page) {
  return page.evaluate(async () => {
    await document.fonts.load('500 16px Satoshi')
    await document.fonts.ready
    return document.fonts.check('500 16px Satoshi')
  })
}
