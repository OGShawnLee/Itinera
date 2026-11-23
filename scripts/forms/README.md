# Generadores de Google Forms — Estudio de Mercado Itinera

Esta carpeta contiene los scripts de Google Apps Script (`FormApp`, runtime V8) que construyen automáticamente los dos instrumentos del Estudio de Mercado de **Itinera** en Xalapa, Veracruz:

- `create_instrument_a_b2c.gs` → **Instrumento A** (`crearEncuestaMotociclistasItinera`): *Cuidado y mantenimiento de motocicletas en Xalapa* (segmento B2C, 44 reactivos en 18 páginas).
- `create_instrument_b_b2b.gs` → **Instrumento B** (`crearFormularioTalleresItinera`): *Itinera: formulario para talleres y refaccionarias de Xalapa* (segmento B2B, 32 reactivos en 17 páginas).
- `verify_forms.mjs` → Verificador local en Node.js (sin dependencias externas) que ejecuta ambos scripts contra un `FormApp` simulado y comprueba la estructura, textos, validaciones, capturas y saltos condicionales.

---

## Pasos para generar los formularios en Google Forms

### Paso 1. (Opcional) Subir las capturas del prototipo a Google Drive y copiar sus IDs
1. Sube a una carpeta de tu Google Drive los 6 archivos PNG ubicados en `prototype/captures/`:
   - `captura-1.png` a `captura-5.png` (usados en el Instrumento A).
   - `captura-2.png`, `captura-5.png` y `captura-6.png` (usados en el Instrumento B).
2. En Google Drive, haz clic derecho sobre cada imagen → **Compartir** → **Copiar enlace**.
3. De cada enlace (`https://drive.google.com/file/d/<ID_DEL_ARCHIVO>/view?usp=sharing`), copia únicamente la cadena que está entre `/d/` y `/view`.
4. Pega cada ID en el objeto de configuración al inicio del script correspondiente:
   - En `create_instrument_a_b2c.gs`: `CAPTURAS_A_DRIVE_IDS = { 1: '...', 2: '...', 3: '...', 4: '...', 5: '' }`.
   - En `create_instrument_b_b2b.gs`: `CAPTURAS_B_DRIVE_IDS = { 2: '...', 5: '...', 6: '...' }`.

### Paso 2. Crear el proyecto en Google Apps Script y ejecutar la función
1. Abre [https://script.google.com](https://script.google.com) e inicia sesión con tu cuenta de Google.
2. Haz clic en **Nuevo proyecto**.
3. Borra el contenido de `Código.gs` y pega el código completo de `create_instrument_a_b2c.gs` (puedes agregar un segundo archivo `.gs` en el mismo proyecto para `create_instrument_b_b2b.gs`, ya que no comparten nombres globales).
4. Guarda el proyecto (`Ctrl + S`), selecciona en la barra superior la función de entrada (`crearEncuestaMotociclistasItinera` o `crearFormularioTalleresItinera`) y haz clic en **Ejecutar**.
5. En la ventana emergente de autorización, revisa y acepta los permisos de **Google Forms** (`FormApp`) y **Google Drive** (`DriveApp`).

> **Advertencia importante:** Cada vez que ejecutes la función de entrada se **creará un formulario nuevo** en tu Google Drive en lugar de actualizar el anterior. Ejecuta cada función una sola vez (o elimina los formularios de prueba duplicados en Drive).

### Paso 3. Abrir el enlace de edición desde el registro de ejecución
1. Al finalizar la ejecución, observa el panel inferior **Registro de ejecución** (*Execution log*).
2. Copia y abre en el navegador el enlace **Editar Instrumento A** (o **Editar Instrumento B**).

### Paso 4. Reemplazar los marcadores de posición si no usaste IDs de Drive
1. Si dejaste vacíos los IDs en `CAPTURAS_A_DRIVE_IDS` o `CAPTURAS_B_DRIVE_IDS`, el formulario incluirá encabezados con el título `[Insertar Captura n del prototipo aquí]` y el pie de imagen en la descripción.
2. En el editor de Google Forms, ubica cada marcador, inserta la imagen `prototype/captures/captura-n.png` con el pie de imagen indicado, centra la imagen y elimina el encabezado marcador.

### Paso 5. Probar todas las rutas en Vista previa antes de compartir
Antes de difundir el enlace público (`Responder Instrumento A / B`), abre el modo **Vista previa** (icono del ojo en Google Forms) y verifica cada una de las rutas de la siguiente lista de comprobación manual:

| Comprobación | Instrumento | Acción en Vista previa | Resultado esperado |
| :---: | :---: | :--- | :--- |
| [ ] | **A** | Seleccionar `A0 = No` en la página 1 y pulsar *Siguiente* | Termina la encuesta y lleva directamente a enviar el formulario |
| [ ] | **A** | Seleccionar `A0 = Sí`, luego en la página 2 elegir `A2 = Menor de 18 años` y pulsar *Siguiente* | Termina la encuesta después de la página 2 y lleva a enviar el formulario |
| [ ] | **A** | En *Conoce Itinera*, elegir `A21 = Definitivamente no` (o `Probablemente no`) | Salta a **Por qué no la usarías** (`A21b`) y, al pulsar *Siguiente*, salta directo a **Tu celular** |
| [ ] | **A** | En *Avisos y semáforo*, probar `A23 = Sí` (pasa a **Anticipación del aviso**) y `A23 = No` (pasa a **Otra forma de aviso**) | Ambas ramas convergen en **Bitácora y resumen** al avanzar |
| [ ] | **A** | En *Pago*, probar `A29 = Sí` / `Depende del precio` (pasa a **Cuánto pagarías**) y `A29 = No` (pasa a **Si no pagarías**) | Ambas ramas convergen en **Promociones a cambio de usarla gratis** al avanzar |
| [ ] | **B** | En *Clientes y servicios*, probar `B7 = Sí` y `B7 = No` | `Sí` pasa a **Cómo se reparten sus clientes** y luego a **Servicios y temporadas**; `No` salta directo a **Servicios y temporadas** |
| [ ] | **B** | En *Recordatorios a sus clientes*, probar `B14 = Sí` y `B14 = No` | `Sí` pasa a **Su forma de recordar** y luego a **Regreso de clientes**; `No` salta directo a **Regreso de clientes** |
| [ ] | **B** | En *Forma de pago*, probar `B19 = No` frente a `B19 = Sí` / `Tal vez` | `No` pasa a **Por qué no** (`B20`) y luego salta a **Dar a conocer la app**; `Sí` / `Tal vez` salta a **Formas de pago** |
| [ ] | **B** | En *Formas de pago*, probar cada opción de `B21` (`Cuota fija al mes`, `Pagar por cada cliente que llegue y compre`, `Ninguna` / `No sé`) | `Cuota fija al mes` pasa a **Cuota fija al mes** y luego salta a **Descuento y prueba**; `Pagar por cada cliente…` pasa a **Pago por cliente** y luego a **Descuento y prueba**; `Ninguna` / `No sé` salta directo a **Descuento y prueba** |
| [ ] | **B** | En `B9` marcar una cuarta casilla; en `B28` intentar avanzar con menos o más de tres casillas | `B9` rechaza seleccionar una cuarta opción (*"Elija máximo tres."*), y `B28` exige exactamente tres opciones (*"Elija exactamente tres."*) |
