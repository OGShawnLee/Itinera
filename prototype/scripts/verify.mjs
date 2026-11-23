// Verificación en Chromium (Checks 3, 4, 5, 7, 8 y 9 del spec). Imprime un reporte JSON.
// Uso: bun scripts/verify.mjs [--dev]   (sin --dev usa el build servido por `bun run preview`)
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'
import { CAPTURAS, esperarFuentes, iniciarServidor, ROOT, VIEWPORT } from './lib.mjs'

const DEV = process.argv.includes('--dev')
const DESKTOP = { width: 1280, height: 960 }

const RUTAS = [
  '/onboarding', '/onboarding?paso=2', '/onboarding?paso=3', '/home', '/history', '/history/r-aceite',
  '/settings', '/settings/intervals', '/calibrate',
  '/consumable/aceite', '/consumable/transmision', '/consumable/frenos', '/consumable/bujia', '/consumable/llantas',
  '/log-service', '/export', '/notificaciones', '/comercio',
]
const RUTAS_ESPERADAS = [
  '/', '/onboarding', '/home', '/history', '/history/:logId', '/settings', '/settings/intervals', '/calibrate',
  '/consumable/:id', '/log-service', '/export', '/notificaciones', '/comercio', '/:pathMatch(.*)*',
]
const PROHIBIDAS = [
  'Km_proyectado', 'Km_base', 'Tasa_dia', 'Rolling Average', 'MAU', 'SQLite', 'Local-First', 'WearTrafficLight',
  'ServiceTemplate', 'ConsumableItem', 'HomeWorkshopTag', 'MerchantPartner', 'ContextualPromotion',
  'CouponRedemption', 'transmision', 'núcleo básico', 'ticket promedio', 'redimido', 'pauta', 'Fase 1',
  'ventana preventiva', 'Óptimo', 'Crítico',
]
const RUTA_PROHIBIDA = ['login', 'registro', 'gasolina', 'combustible', 'talleres', 'directorio', 'flotilla', 'vehiculos']
const KM = /\d[\d,.]*\s?km\b/i

const reporte = { modo: DEV ? 'dev' : 'preview', checks: {}, fallas: [] }
const falla = (check, detalle) => reporte.fallas.push({ check, detalle })

/* Check 5 (estático): rutas registradas */
{
  const src = readFileSync(join(ROOT, 'src/router.ts'), 'utf8')
  // Solo registros de ruta (path seguido de component o redirect), no los destinos de los guards.
  const rutas = [...src.matchAll(/path: '([^']+)',\s*(?:component|redirect)/g)].map((m) => m[1])
  const faltan = RUTAS_ESPERADAS.filter((r) => !rutas.includes(r))
  const sobran = rutas.filter((r) => !RUTAS_ESPERADAS.includes(r))
  const prohibidas = rutas.filter((r) => RUTA_PROHIBIDA.some((p) => r.toLowerCase().includes(p)))
  reporte.checks.rutasRegistradas = { rutas, faltan, sobran, prohibidas }
  if (faltan.length || sobran.length) falla('5', { faltan, sobran })
  if (prohibidas.length) falla('9', { rutasProhibidas: prohibidas })
}

const servidor = await iniciarServidor({ dev: DEV })
const browser = await chromium.launch()

function escuchar(page, sink) {
  page.on('console', (m) => {
    const t = m.text()
    if (m.type() === 'error') sink.push(`console.error: ${t.slice(0, 300)}`)
    else if (t.includes('[Vue warn]')) sink.push(`vue warn: ${t.slice(0, 300)}`)
  })
  page.on('pageerror', (e) => sink.push(`pageerror: ${e.message}`))
}

async function abrir(page, ruta) {
  await page.goto(servidor.base + ruta, { waitUntil: 'networkidle' })
  return esperarFuentes(page)
}

const conQuery = (ruta, q) => ruta + (ruta.includes('?') ? '&' : '?') + q

try {
  /* Checks 5 y 9: cada ruta sin errores y sin palabras prohibidas */
  {
    const context = await browser.newContext({ viewport: VIEWPORT })
    const page = await context.newPage()
    const errores = []
    escuchar(page, errores)
    const porRuta = {}
    for (const ruta of RUTAS) {
      const antes = errores.length
      await abrir(page, conQuery(ruta, 'seed=1&clean=1'))
      await page.waitForTimeout(150)
      const info = await page.evaluate(() => {
        const texto = document.body.innerText
        const hrefs = [...document.querySelectorAll('[href]')]
          .filter((e) => e.tagName !== 'LINK')
          .map((e) => e.getAttribute('href'))
        const estrellas = texto.includes('★') || [...document.querySelectorAll('[aria-label]')].some((e) => /estrellas/i.test(e.getAttribute('aria-label')))
        return { texto, hrefs, estrellas, path: location.pathname }
      })
      const bajo = info.texto.toLowerCase()
      const prohibidas = PROHIBIDAS.filter((p) => bajo.includes(p.toLowerCase()))
      const externos = info.hrefs.filter((h) => /^(https?:|tel:)|wa\.me/i.test(h ?? ''))
      const otraMoto = /agregar moto|añadir moto|otra moto/i.test(info.texto)
      const nuevos = errores.slice(antes)
      porRuta[ruta] = { path: info.path, errores: nuevos.length, prohibidas, externos, estrellas: info.estrellas }
      if (nuevos.length) falla('5', { ruta, errores: nuevos })
      if (prohibidas.length) falla('9', { ruta, prohibidas })
      if (externos.length) falla('9', { ruta, externos })
      if (info.estrellas) falla('9', { ruta, estrellas: true })
      if (otraMoto) falla('9', { ruta, selectorDeMotos: true })
      if (ruta === '/export' && /\$\s?49|pagar|precio|premium|comprar|suscrip/i.test(info.texto)) falla('9', { ruta, cobro: true })
    }
    reporte.checks.rutas = porRuta
    const html = readFileSync(join(ROOT, 'index.html'), 'utf8')
    reporte.checks.linksIndexHtml = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1])
    await context.close()
  }

  /* Checks 3 y 7: pantallas de captura */
  {
    const porCaptura = {}
    for (const c of CAPTURAS) {
      const context = await browser.newContext({ viewport: VIEWPORT })
      const page = await context.newPage()
      const errores = []
      escuchar(page, errores)
      const satoshi = await abrir(page, c.url)
      await page.waitForTimeout(200)
      const m = await page.evaluate(({ visibles, H, W }) => {
        const visible = (el) => {
          const r = el.getBoundingClientRect()
          const s = getComputedStyle(el)
          return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0
        }
        // Fuentes de todos los nodos de texto visibles
        const chicos = []
        const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
        let minimo = Infinity
        while (tw.nextNode()) {
          const n = tw.currentNode
          if (!n.textContent.trim() || !n.parentElement || !visible(n.parentElement)) continue
          const px = parseFloat(getComputedStyle(n.parentElement).fontSize)
          minimo = Math.min(minimo, px)
          if (px < 13) chicos.push({ texto: n.textContent.trim().slice(0, 40), px })
        }
        // Controles táctiles
        const bajos = []
        for (const el of document.querySelectorAll('button, a, [role=radio], [role=switch], [role=tab]')) {
          if (!visible(el)) continue
          let ok = el.getBoundingClientRect().height >= 44
          let p = el.parentElement
          for (let i = 0; !ok && p && i < 3; i++, p = p.parentElement) {
            if (p.matches('label, button, a, [role=radio], [role=switch], [role=tab]') && p.getBoundingClientRect().height >= 44) ok = true
          }
          if (!ok) bajos.push({ texto: (el.innerText || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 40), alto: Math.round(el.getBoundingClientRect().height) })
        }
        // Elementos que deben verse completos sin desplazarse
        const buscarTexto = (t) => {
          let mejor = null
          for (const el of document.body.querySelectorAll('*')) {
            if (!visible(el) || !(el.innerText ?? '').includes(t)) continue
            if (!mejor || mejor.contains(el)) mejor = el
          }
          return mejor
        }
        const resultados = visibles.map((v) => {
          const el = v.selector ? document.querySelector(v.selector) : buscarTexto(v.texto)
          const nombre = v.nombre ?? v.texto
          if (!el) return { nombre, encontrado: false, ok: false }
          const r = el.getBoundingClientRect()
          const faltaTexto = (v.contiene ?? []).filter((t) => !el.innerText.includes(t))
          return {
            nombre,
            encontrado: true,
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            ok: r.top >= 0 && r.bottom <= H && !faltaTexto.length,
            faltaTexto,
          }
        })
        // Nada fuera de 0..W en horizontal
        const fuera = []
        for (const el of document.body.querySelectorAll('*')) {
          if (!visible(el)) continue
          const r = el.getBoundingClientRect()
          if (r.left < -0.5 || r.right > W + 0.5) fuera.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`)
        }
        return {
          scrollWidth: document.documentElement.scrollWidth,
          fuenteMinima: minimo,
          textosChicos: chicos,
          controlesBajos: bajos,
          visibles: resultados,
          fueraHorizontal: fuera.slice(0, 10),
          toolbar: !!document.querySelector('[data-sim-toolbar]'),
          texto: document.body.innerText,
        }
      }, { visibles: c.visibles, H: VIEWPORT.height, W: VIEWPORT.width })
      const faltan = c.requeridos.filter((t) => !m.texto.includes(t))
      const km = m.texto.match(KM)?.[0] ?? null
      const res = {
        url: c.url,
        satoshi,
        scrollWidth: m.scrollWidth,
        fuenteMinimaPx: m.fuenteMinima,
        textosMenoresA13: m.textosChicos,
        controlesMenoresA44: m.controlesBajos,
        kilometros: km,
        requeridosFaltantes: faltan,
        noVisibles: m.visibles.filter((v) => !v.ok),
        elementosVerificados: m.visibles.length,
        fueraHorizontal: m.fueraHorizontal,
        toolbarEnDom: m.toolbar,
        errores,
      }
      porCaptura[c.archivo] = res
      const ok = satoshi && m.scrollWidth <= 390 && !m.textosChicos.length && !m.controlesBajos.length && !km
        && !faltan.length && !res.noVisibles.length && !m.fueraHorizontal.length && !m.toolbar && !errores.length
      res.ok = ok
      if (!ok) falla('7', { captura: c.archivo, res: { ...res } })
      await context.close()
    }
    reporte.checks.capturas = porCaptura
  }

  /* Check 4: la hoja de /calibrate queda dentro del marco del teléfono (escritorio, sin clean) */
  {
    const context = await browser.newContext({ viewport: DESKTOP })
    const page = await context.newPage()
    await abrir(page, '/calibrate?seed=1')
    await page.waitForSelector('[data-calibrate]')
    await page.waitForTimeout(400)
    const r = await page.evaluate(() => {
      const box = (s) => {
        const b = document.querySelector(s).getBoundingClientRect()
        return { left: b.left, top: b.top, right: b.right, bottom: b.bottom }
      }
      return { marco: box('[data-phone-frame]'), hoja: box('[data-calibrate]'), toolbar: !!document.querySelector('[data-sim-toolbar]') }
    })
    const dentro = r.hoja.left >= r.marco.left - 0.5 && r.hoja.right <= r.marco.right + 0.5
      && r.hoja.top >= r.marco.top - 0.5 && r.hoja.bottom <= r.marco.bottom + 0.5
    reporte.checks.hojaDentroDelMarco = { ...r, dentro }
    if (!dentro || !r.toolbar) falla('4', r)
    await context.close()
  }

  /* Check 8: interacciones */
  const inter = {}
  const nueva = async (vp = VIEWPORT) => {
    const context = await browser.newContext({ viewport: vp })
    const page = await context.newPage()
    return { context, page }
  }
  {
    // Notificaciones
    const { context, page } = await nueva()
    await abrir(page, '/notificaciones?seed=1&clean=1')
    await page.getByRole('button', { name: 'Más', exact: true }).click()
    const toast = await page.getByText('Listo, lo tomamos en cuenta').isVisible()
    await page.locator('[data-notif=aceite]').click()
    await page.waitForURL('**/consumable/aceite')
    inter.notificaciones = { toast, navegaA: new URL(page.url()).pathname }
    if (!toast || inter.notificaciones.navegaA !== '/consumable/aceite') falla('8', inter.notificaciones)
    await context.close()
  }
  {
    // Calibrar con y sin odómetro
    const { context, page } = await nueva()
    await abrir(page, '/home?seed=1&clean=1')
    await page.getByRole('link', { name: 'Ajustar uso' }).click()
    await page.waitForURL('**/calibrate')
    const dialogo = page.getByRole('dialog')
    await dialogo.waitFor()
    const conOdometro = await dialogo.locator('input[type=number]').count()
    await dialogo.getByRole('button', { name: 'Cerrar' }).click()
    await page.waitForURL('**/home')
    await page.getByRole('link', { name: 'Ajustes' }).click()
    await page.getByRole('switch').first().waitFor()
    const sw = page.locator('label', { hasText: 'Mi odómetro no funciona' }).getByRole('switch')
    await sw.click()
    const encendido = await sw.getAttribute('aria-checked')
    await page.getByRole('link', { name: 'Inicio' }).click()
    await page.getByRole('link', { name: 'Ajustar uso' }).click()
    await page.waitForURL('**/calibrate')
    await dialogo.waitFor()
    const opciones = ['No la usé', 'Menos que de costumbre', 'Como siempre', 'Más que de costumbre']
    const presentes = []
    for (const o of opciones) if (await dialogo.getByRole('radio', { name: o, exact: true }).count()) presentes.push(o)
    const numeros = await dialogo.locator('input[type=number]').count()
    inter.calibrar = { url: new URL(page.url()).pathname, camposNumericosConOdometro: conOdometro, switchSinOdometro: encendido, opciones: presentes, camposNumericosSinOdometro: numeros }
    if (presentes.length !== 4 || numeros !== 0 || conOdometro !== 1 || encendido !== 'true') falla('8', inter.calibrar)
    await context.close()
  }
  {
    // Registrar aceite
    const { context, page } = await nueva()
    await abrir(page, '/log-service?seed=1&clean=1')
    await page.getByRole('button', { name: 'Aceite', exact: true }).click()
    const preventivo = await page.getByRole('radio', { name: /Preventivo/ }).getAttribute('aria-checked')
    await page.getByRole('button', { name: 'Guardar servicio' }).click()
    const toast = await page.getByText('Servicio guardado').isVisible()
    await abrir(page, '/home')
    const aceite = (await page.locator('[data-item=aceite]').innerText()).replace(/\s+/g, ' ')
    await abrir(page, '/history')
    const filas = await page.locator('[data-registro]').count()
    inter.registrarAceite = { preventivo, toast, tarjetaAceite: aceite, filasBitacora: filas }
    if (!toast || !aceite.includes('Bien') || filas !== 5) falla('8', inter.registrarAceite)
    await context.close()
  }
  {
    // Incluir montos
    const { context, page } = await nueva()
    await abrir(page, '/export?seed=1&clean=1')
    const vista = page.locator('[data-preview]')
    const antes = (await vista.innerText()).includes('$')
    await page.getByRole('switch').click()
    const oculto = !(await vista.innerText()).includes('$')
    await page.getByRole('switch').click()
    const despues = (await vista.innerText()).includes('$')
    inter.incluirMontos = { conMontos: antes, alApagar: oculto ? 'sin $' : 'con $', alEncender: despues }
    if (!antes || !oculto || !despues) falla('8', inter.incluirMontos)
    await context.close()
  }
  {
    // Cambiar a Banda CVT
    const { context, page } = await nueva()
    await abrir(page, '/settings?seed=1&clean=1')
    await page.getByRole('radio', { name: 'Banda CVT', exact: true }).click()
    await page.getByRole('link', { name: 'Inicio' }).click()
    await page.waitForURL('**/home')
    const tarjeta = (await page.locator('[data-item=transmision]').innerText()).replace(/\s+/g, ' ')
    const texto = await page.locator('body').innerText()
    inter.bandaCVT = { tarjeta, muestraBandaCVT: texto.includes('Banda CVT'), muestraCadena: /\bCadena\b/.test(texto) }
    if (!inter.bandaCVT.muestraBandaCVT || inter.bandaCVT.muestraCadena) falla('8', inter.bandaCVT)
    await context.close()
  }
  {
    // Empezar desde cero (simulador de escritorio)
    const { context, page } = await nueva(DESKTOP)
    await abrir(page, '/home?seed=1')
    await page.getByRole('button', { name: 'Empezar desde cero' }).click()
    await abrir(page, '/home')
    inter.desdeCero = { url: new URL(page.url()).pathname }
    if (inter.desdeCero.url !== '/onboarding') falla('8', inter.desdeCero)
    await context.close()
  }
  reporte.checks.interacciones = inter
} finally {
  await browser.close()
  servidor.cerrar()
}

reporte.ok = reporte.fallas.length === 0
console.log(JSON.stringify(reporte, (k, v) => (k === 'texto' ? undefined : v), 2))
process.exit(reporte.ok ? 0 : 1)
