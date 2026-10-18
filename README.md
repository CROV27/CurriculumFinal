# CV / Portafolio — Camilo Rafael Ordenes Vargas

Continuación del primer examen de Tecnologías Web I (SIS-214), Universidad Católica Boliviana «San Pablo». Mantiene el contenido, la fotografía, la paleta y el material multimedia del trabajo original; incorpora las funcionalidades de la Unidad II y un mapa interactivo de contacto.

## Ejecución local

1. Extrae el ZIP completo.
2. Abre la carpeta `CurriculumFinal` con Visual Studio Code.
3. Usa **Live Server → Open with Live Server** sobre `index.html`.

Alternativa con Python, desde esa carpeta:

```bash
python -m http.server 8000
```

Abre http://localhost:8000. No abras el HTML con doble clic: los módulos ES6 necesitan HTTP. No hay compilación ni paquetes que instalar. Las API de GitHub y EmailJS, el mapa Leaflet con teselas de OpenStreetMap y Google Fonts requieren Internet; las fuentes tienen alternativas locales.

## Arquitectura y tecnologías

- `index.html`: CV semántico con header, nav, main, section, article, aside y footer; controles etiquetados y regiones de estado accesibles.
- `css/styles.css`: importa variables, base, layouts, components y animation.
- `css/variables.css`: tokens de color, fuentes y espaciado; temas claro y oscuro.
- `css/base.css`: reset universal, tipografía y foco visible.
- `css/layouts.css`: Mobile-First; base menor de 768px, tablet 768–1024px, escritorio desde 1025px. Flexbox alinea cabecera, menú y habilidades; Grid distribuye tarjetas de proyectos y repositorios.
- `js/main.js`: inicializa módulos ES6 independientes en `js/modules/`.
- `assets/`: recursos originales, incluido el audio MP4 con la ruta corregida.

HTML5, CSS3 y JavaScript ES6+ nativo, sin frameworks. La API de GitHub no requiere claves; el envío de correos usa EmailJS con identificadores públicos configurados en `js/modules/emailjs-config.js` (ver «Configurar EmailJS»).

## Funciones y decisiones

1. **Tema (`theme.js`)**: atributo `data-theme`, `aria-pressed`, JSON.parse/stringify y localStorage. Migra las preferencias de la versión anterior; soporta almacenamiento corrupto o bloqueado.
2. **Menú (`menu.js`)**: colapsable en móvil y tablet, clase CSS y `aria-expanded`. Se abre como panel de dos columnas sobre el contenido, con desplazamiento interno en pantallas bajas y enlaces táctiles de más de 44px. Delegación de clics, cierre al elegir sección, al tocar fuera, con Escape y al cambiar de tamaño. Sin JS se mantienen visibles los enlaces.
3. **Buscador (`filter.js`)**: toma una instantánea congelada de los proyectos locales; encadena `.filter().map()`. No altera el origen y restaura los dos proyectos al vaciar el campo. Ignora mayúsculas y tildes; informa si no hay resultados.
4. **Contacto (`contact.js`)**: `submit` con `preventDefault()`, validación con `input`, restricciones HTML5 y Constraint Validation API (`checkValidity`, `setCustomValidity`). Mensajes por campo, `aria-describedby`, `aria-invalid`, foco en el primer error. Con datos válidos envía una confirmación automática únicamente a la persona que completa el formulario, mediante una plantilla Auto-Reply de EmailJS con `{{email}}` como destinatario. Usa `fetch` POST, `async/await`, `try/catch/finally`, `response.ok`, códigos 400/403/404/429/500 y timeout de 12 s. Evita envíos dobles.
5. **REST (`github.js`)**: GET a `https://api.github.com/users/CROV27/repos?sort=updated&per_page=6`. Fetch, async/await, try/catch/finally, response.ok, estados loading/success/error, códigos 400/403/404/429/500 y otros no exitosos. Timeout de 12 segundos, reintento manual y estado vacío. Inserta datos externos como texto y valida los enlaces HTTPS. Una consulta fallida no bloquea las otras funciones.
6. **Mapa (`map.js`)**: mapa interactivo Leaflet con OpenStreetMap y marcador en `-16.498575334934664, -68.10548407670504`. Si la biblioteca o las teselas no están disponibles, muestra un aviso y conserva el enlace directo a OpenStreetMap.

## Configurar EmailJS

1. Crea una cuenta gratuita en https://www.emailjs.com.
2. **Email Services → Add New Service**: conecta tu Gmail y copia el **Service ID**.
3. **Email Templates → Auto-Reply**: configura *To Email* como `{{email}}`, *Reply To* como `{{from_email}}`, y usa `{{name}}` en el cuerpo para saludar a la persona. Guarda y copia el **Template ID**.
4. **Account → General**: copia la **Public Key**.
5. Pega la Public Key, Service ID y Template ID de Auto-Reply en `js/modules/emailjs-config.js`. Ya están configurados para esta entrega.
6. Prueba el formulario en Live Server y luego en GitHub Pages; revisa tu bandeja de entrada y la carpeta de spam.

El formulario está configurado para enviar solo la confirmación automática a la dirección escrita por el visitante. No se envía una notificación del formulario al correo del autor. La Public Key es pública por diseño; no pegues la Private Key en el proyecto. El plan gratuito de EmailJS limita la cantidad de correos por mes.

## Git y publicación: pendiente de realizar en la cuenta del autor

Esta etapa es una instantánea de archivos sin carpeta `.git`. Conserva la carpeta `.git` de tu directorio de trabajo al aplicar los avances. Los commits de estas etapas debes realizarlos tú después de revisar y probar cada cambio. No se ha publicado el proyecto desde esta entrega.

Nombre requerido para el repositorio nuevo: **SIS214_ExamenPractico2_OrdenesCamilo**.

URLs previstas (NO verificadas ni publicadas por esta entrega):

- Repositorio: https://github.com/CROV27/SIS214_ExamenPractico2_OrdenesCamilo
- Producción: https://CROV27.github.io/SIS214_ExamenPractico2_OrdenesCamilo/

### Publicar conservando el historial

1. Crea en GitHub un repositorio **público y vacío** con el nombre indicado, sin README ni licencia iniciales.
2. Desde `CurriculumFinal`, ejecuta:

```bash
git log --oneline
git remote set-url origin https://github.com/CROV27/SIS214_ExamenPractico2_OrdenesCamilo.git
git push -u origin main
```

3. En Settings → Pages selecciona publicar desde la rama `main`, carpeta raíz `/`, y guarda.
4. Espera el despliegue y abre la URL que GitHub muestre. Comprueba las rutas, las funciones, el audio y el video en esa dirección.
5. Actualiza este README para señalar que las URLs están verificadas y registra ese cambio con un commit.
6. En Moodle entrega **solamente las dos URL públicas**. El ZIP por sí solo no reemplaza ese requisito.

Si el nombre de usuario de GitHub cambia, adapta ambas URLs y el endpoint del módulo GitHub.

## Verificación antes de entregar

- Probar anchos 375, 768, 1024 y 1440px; comprobar que no hay desplazamiento horizontal de toda la página.
- Cambiar de tema y recargar; abrir/cerrar el menú y usar Escape.
- Buscar `Java`, una palabra inexistente y luego borrar el buscador.
- Intentar validar campos vacíos, un correo incorrecto, espacios y un mensaje válido; la página no debe recargarse. Con EmailJS configurado, confirmar que el correo llega a tu bandeja.
- Comprobar GitHub con conexión y sin ella; usar Actualizar repositorios para reintentar.
- Navegar por teclado, revisar foco y mensajes, probar multimedia y confirmar que no hay excepciones JS.
- Verificar que el repositorio es público, que Pages está activo y que ambas URLs abren sin sesión.

El cumplimiento de publicación, enlaces finales y entrega Moodle queda pendiente hasta realizar los pasos anteriores. No se afirma una calificación ni una certificación completa de WCAG.

### Verificación realizada en esta entrega

Se comprobó el mapa Leaflet en el navegador: biblioteca, marcador, teselas de OpenStreetMap y comportamiento adaptable en móvil. También se comprobó que el formulario valida los campos y avisa cuando falta configurar EmailJS; no se envió un correo real porque aún no se han proporcionado credenciales. Ejecuta la lista anterior en Live Server antes de publicar.
