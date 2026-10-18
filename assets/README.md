# Recursos multimedia (assets)

Esta carpeta contiene todos los archivos multimedia que usa `index.html`: fotografía, capturas, audio y video. No contiene código, solo recursos estáticos.

## Estructura

```
assets/
├── images/
│   ├── mifotito.png              → Fotografía de perfil (header)
│   └── portafiolioPaginaWeb.png  → Captura de la primera versión del CV (sección Portafolio)
├── audio/
│   └── audioPortafolio.mp4       → Audio de presentación (sección Portafolio)
└── video/
    └── DemostracionVideoBattleship.mp4  → Video de demostración (sección Portafolio)
```

## Dónde se usa cada archivo

| Archivo | Se referencia en | Etiqueta HTML |
|---|---|---|
| `images/mifotito.png` | `<header>` | `<img src="assets/images/mifotito.png" alt="Fotografía de Camilo Rafael Ordenes Vargas">` |
| `images/portafiolioPaginaWeb.png` | Sección `#Portafolio` | `<img>` dentro de `<figure>` |
| `audio/audioPortafolio.mp4` | Sección `#Portafolio` | `<audio controls><source ...></audio>` |
| `video/DemostracionVideoBattleship.mp4` | Sección `#Portafolio` | `<video controls><source ...></video>` |


