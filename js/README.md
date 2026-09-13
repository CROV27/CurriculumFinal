# JavaScript del proyecto

Todo el JavaScript vive en un único archivo: **`main.js`**. Es JavaScript nativo (Vanilla JS) — sin librerías ni frameworks — y se enlaza en `index.html` con `defer` para que se ejecute recién cuando el HTML terminó de cargar:

```html
<script src="js/main.js" defer></script>
```

Está organizado en **dos bloques independientes**, cada uno envuelto en su propia función autoejecutable `(function () { ... })();` para no mezclar variables entre ambos ni contaminar el alcance global.

## 1. Tema claro / oscuro

**Qué hace:** alterna entre el tema claro (por defecto) y un tema oscuro, y recuerda la elección del usuario aunque cierre y vuelva a abrir la página.

**Cómo funciona:**
1. Busca en el HTML el botón (`#theme-toggle`) y los `<span>` de ícono/texto (`#theme-icon`, `#theme-text`).
2. Al cargar la página, revisa si ya había un tema guardado en `localStorage` (bajo la clave `cv-theme`) y lo aplica.
3. Al hacer clic en el botón, agrega o quita el atributo `data-theme="dark"` en la etiqueta `<html>` — eso es lo único que necesita el CSS para saber qué paleta de colores usar (ver el bloque `:root[data-theme="dark"]` en `variables.css`).
4. Actualiza el ícono (☀️ / 🌙), el texto del botón y el atributo `aria-pressed` (accesibilidad: indica si el botón está "activado").
5. Guarda la elección en `localStorage` para la próxima visita.

**Elementos del HTML de los que depende:**
| id / atributo | Para qué se usa |
|---|---|
| `#theme-toggle` | El botón que se hace clic |
| `#theme-icon` | El emoji que cambia (☀️ / 🌙) |
| `#theme-text` | El texto que cambia ("Modo Claro" / "Modo Oscuro") |
| `data-theme` (en `<html>`) | El "interruptor" que lee el CSS |

## 2. Validación del formulario de contacto

**Qué hace:** valida los 4 campos del formulario (nombre, correo, asunto, mensaje) antes de "enviarlo", sin depender únicamente de la validación automática del navegador.

**Cómo funciona:**
1. El `<form>` tiene el atributo `novalidate` en el HTML — esto le dice al navegador "no muestres tus propios globitos de error, yo (JavaScript) me encargo".
2. Un arreglo `campos` define, por cada campo: su `id`, el `id` de su mensaje de error, una función `esValido()` con la regla (ej. "mínimo 3 letras", "formato de email válido") y el texto del mensaje de error.
3. **Mientras el usuario escribe** (evento `input`): si corrige el campo, el mensaje de error desaparece al instante.
4. **Al enviar el formulario** (evento `submit`):
   - Se cancela el envío real con `event.preventDefault()` (no hay backend, así que igual no se enviaría a ningún lado, pero esto evita que la página se recargue).
   - Se valida cada campo. Si algo falla, se muestra su mensaje de error específico debajo del campo y se marca `aria-invalid="true"` en el input (accesibilidad).
   - Si todo es válido, se muestra un mensaje de éxito y se limpia el formulario con `formulario.reset()`.

**Elementos del HTML de los que depende:**
| id | Para qué se usa |
|---|---|
| `#nombre`, `#email`, `#asunto`, `#mensaje` | Los campos a validar |
| `#error-nombre`, `#error-email`, `#error-asunto`, `#error-mensaje` | `<span>` donde se escribe el mensaje de error de cada campo |
| `#form-status` | Mensaje general de éxito o error, arriba del formulario |

## Por qué está separado en dos funciones autoejecutables

Cada bloque `(function () { ... })()` crea su propio "espacio privado". Así, por ejemplo, la variable `estado` de la validación del formulario no choca ni se mezcla con ninguna variable del bloque del tema, aunque ambas vivan en el mismo archivo. Es una práctica común en JS nativo cuando no se usan módulos (`import`/`export`).

