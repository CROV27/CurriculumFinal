# JavaScript ES6+

`main.js` importa e inicializa los módulos `theme`, `menu`, `filter`, `contact`, `github` y `map`. Cada archivo en `modules/` exporta su inicializador y mantiene su estado local. Se carga con `type="module"`; requiere un servidor HTTP (Live Server o Python).

El mapa de `map.js` usa Leaflet y OpenStreetMap; ambos requieren conexión a Internet. El formulario de `contact.js` envía mediante EmailJS cuando `emailjs-config.js` tiene la Public Key, Service ID y Template ID reales. No agregues la Private Key al cliente.

Consulta el README de la raíz para las decisiones, manejo de errores, restricciones del formulario y guía de prueba.
