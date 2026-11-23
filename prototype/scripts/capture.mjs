// Genera las 6 capturas (390×844 a escala 2 = PNG de 780×1688) desde el build servido por `bun run preview`.
import { mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright'
import { CAPTURAS, esperarFuentes, iniciarServidor, ROOT, VIEWPORT } from './lib.mjs'

function medidasPNG(ruta) {
  const b = readFileSync(ruta)
  return { ancho: b.readUInt32BE(16), alto: b.readUInt32BE(20) }
}

const servidor = await iniciarServidor()
const browser = await chromium.launch()
const salida = join(ROOT, 'captures')
mkdirSync(salida, { recursive: true })
let ok = true
try {
  for (const c of CAPTURAS) {
    const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2, locale: 'es-MX' })
    const page = await context.newPage()
    await page.goto(servidor.base + c.url, { waitUntil: 'networkidle' })
    const fuente = await esperarFuentes(page)
    await page.waitForTimeout(250)
    const ruta = join(salida, c.archivo)
    await page.screenshot({ path: ruta })
    const { ancho, alto } = medidasPNG(ruta)
    const bien = ancho === 780 && alto === 1688 && fuente
    ok &&= bien
    console.log(`${c.archivo}  ${ancho}x${alto}  satoshi=${fuente}  url=${c.url}  ${bien ? 'OK' : 'FALLA'}`)
    await context.close()
  }
} finally {
  await browser.close()
  servidor.cerrar()
}
process.exit(ok ? 0 : 1)
