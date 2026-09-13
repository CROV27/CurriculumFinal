# Curriculum Vitae Web — Camilo Rafael Ordenes Vargas

CV interactivo y profesional, desarrollado como proyecto de la asignatura **Tecnologías Web I (SIS-214)** — Universidad Católica Boliviana "San Pablo".

## 📋 Descripción

Sitio web personal tipo CV que presenta perfil profesional, formación académica, experiencia, habilidades, certificaciones, idiomas, proyectos destacados, portafolio multimedia y un formulario de contacto con validación. Construido con **HTML5 semántico**, **CSS3 moderno** (variables, Flexbox y Grid) y **JavaScript nativo** (sin frameworks ni librerías externas).

## 🚀 Características

- **HTML5 semántico**: `header`, `nav`, `main`, `section`, `article`, `footer`, `figure`, `time`, `address`, `meter`.
- **CSS3 moderno**: variables en `:root`, paleta de colores consistente, Flexbox (header, nav, habilidades) y CSS Grid (sección de proyectos).
- **Diseño responsivo**: adaptado a dispositivos móviles mediante `@media` queries (punto de quiebre en 720px).
- **Modo claro / oscuro**: alternable con un botón, con memoria de preferencia mediante `localStorage`.
- **Formulario de contacto validado**: validación en tiempo real con JavaScript nativo (sin depender solo de la validación del navegador).
- **Accesibilidad**: atributos `alt` en imágenes, `aria-labelledby` en cada sección, `aria-live` en mensajes de error, `aria-pressed` en el botón de tema, foco visible consistente.

## 🗂️ Estructura del proyecto

```
├── index.html          → Estructura HTML5 de todo el sitio
├── css/
│   ├── styles.css       → Punto de entrada, importa los demás módulos
│   ├── variables.css    → Paleta de colores y tokens de diseño (temas claro/oscuro)
│   ├── base.css         → Reset y estilos base de elementos HTML
│   ├── layouts.css      → Estructura, Flexbox, Grid y responsive
│   ├── components.css   → Estilos específicos de cada componente
│   ├── animation.css    → Transiciones e interactividad visual
│   └── README.md        → Detalle de la arquitectura CSS
├── js/
│   └── main.js          → Tema claro/oscuro + validación del formulario
└── assets/
    ├── images/          → Fotografía y capturas
    ├── audio/           → Audio de presentación del portafolio
    └── video/           → Video de demostración del portafolio
```

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica del contenido |
| CSS3 | Diseño visual, Flexbox, Grid, variables, responsive |
| JavaScript (nativo) | Tema claro/oscuro y validación de formulario |
| Google Fonts | Tipografías Cinzel y Plus Jakarta Sans |



## ⚙️ Funcionalidades de JavaScript

1. **Cambio de tema claro/oscuro**: botón ubicado en la esquina superior derecha del encabezado. Alterna el atributo `data-theme` en `<html>`, lo que activa la paleta de colores oscura definida en `variables.css`. La elección se guarda en `localStorage` y persiste entre visitas.
2. **Validación de formulario de contacto**: valida nombre, correo electrónico, asunto y mensaje antes de "enviar" (no hay backend real). Muestra mensajes de error específicos por campo y un mensaje de estado general, todo mediante manipulación del DOM.

## ✍️ Autor

**Camilo Rafael Ordenes Vargas**
Estudiante de Ingeniería de Sistemas — Universidad Católica Boliviana "San Pablo"
📧 camiloordenesvargas@gmail.com
📍 La Paz, Bolivia

## 📄 Licencia

Proyecto académico de uso educativo. © 2026 Camilo Rafael Ordenes Vargas. Todos los derechos reservados.
