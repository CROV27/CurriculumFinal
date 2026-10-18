# Arquitectura CSS

Los estilos están divididos en módulos, cada uno con una única responsabilidad. Esto evita tener un solo archivo gigante y facilita encontrar qué modificar según lo que se quiera cambiar.

## Orden de carga

`styles.css` es el **único** archivo enlazado desde `index.html`. Internamente importa a los demás, en este orden (el orden importa: los módulos generales deben cargar antes que los específicos):

```css
@import url("variables.css");
@import url("base.css");
@import url("layouts.css");
@import url("components.css");
@import url("animation.css");
```

## ¿Qué hace cada archivo?

### `variables.css`
Define los **tokens de diseño**: colores, tipografías y espaciados como *custom properties* de CSS (`--color-primary`, `--space-3`, etc.). No aplica ningún estilo visual por sí mismo, solo declara valores reutilizables.

También contiene el bloque de **tema oscuro** (`:root[data-theme="dark"]`), que sobrescribe algunas de esas variables cuando el usuario activa el modo oscuro con el botón de tema (ver `js/main.js`).

### `base.css`
El *reset* del proyecto: normaliza el comportamiento por defecto de etiquetas HTML genéricas (`body`, `h1`–`h3`, `a`, `ul`, `p`, inputs, etc.), sin diseño específico todavía. Aquí también vive el estilo de foco visible para accesibilidad.

### `layouts.css`
Define la **posición y distribución** de los bloques grandes de la página: el header y nav en Flexbox, las tarjetas de proyectos y repositorios en CSS Grid, el ancho máximo del contenido, y la estrategia Mobile-First (base <768px, tablet 768–1024px y escritorio >1024px).

### `components.css`
Define el **detalle visual** de piezas específicas del proyecto: la tabla de idiomas, las pastillas de habilidades (`.tags`), el callout de "Objetivo profesional", el formulario de contacto, el botón de tema, los mensajes de error de validación.

### `animation.css`
Todas las **transiciones e interactividad visual**, sin JavaScript: el subrayado del menú al pasar el cursor, el efecto de presión del botón de enviar, la transición suave de colores al cambiar de tema, y el único `@keyframes` del proyecto (el punto pulsante de "Actualidad" en Formación).

## Variables clave a conocer

| Variable | Para qué sirve |
|---|---|
| `--color-primary`, `--color-primary-dark`, `--color-primary-deep` | Azul principal `#1E3A8A` y tonos de texto legibles por tema |
| `--color-accent`, `--color-accent-dark`, `--color-accent-deep` | Dorado `#C9A227` y tonos con contraste para texto e interacción |
| `--color-band` | Azul de nav/footer/tabla: `#1E3A8A` claro y `#16213E` oscuro |
| `--color-bg`, `--color-surface`, `--color-panel-primary`, `--color-panel-accent` | Fondos, sí cambian entre tema claro y oscuro |
| `--color-ink` | Texto principal: `#111827` claro y `#F8FAFC` oscuro |
| `--space-1` a `--space-5` | Escala de espaciados consistente |
| `--font-display`, `--font-body` | Plus Jakarta Sans (títulos y cuerpo) |
| `--content-max` | Ancho máximo de 1120px para la cabecera y el contenido |

## Convenciones

- Los selectores por `id` (`#Proyectos`, `#Contacto`) se usan para estilos que aplican a **una sección puntual** del CV.
- Las clases (`.tags`, `.skill-group`, `.meters`) se usan para estilos **reutilizables** en varios lugares.
- Todo color, tipografía o espaciado debe salir de una variable de `variables.css` — evitar valores "sueltos" (hardcoded) en los demás archivos.
