const LOCATION = {
  latitude: -16.498575334934664,
  longitude: -68.10548407670504
};

export function initMap() {
  const container = document.querySelector('#contact-map');
  const status = document.querySelector('#map-status');
  if (!container || !status) return;

  if (!window.L) {
    status.dataset.state = 'error';
    status.textContent = 'No se pudo cargar Leaflet. Usa el enlace a OpenStreetMap para ver la ubicación.';
    return;
  }

  const map = window.L.map(container).setView(
    [LOCATION.latitude, LOCATION.longitude],
    16
  );

  let tileError = false;
  const tiles = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  });
  tiles.on('load', () => {
    if (!tileError) {
      status.dataset.state = 'success';
      status.textContent = 'Mapa cargado. Puedes acercar, alejar y mover el mapa.';
    }
  });
  tiles.on('tileerror', () => {
    tileError = true;
    status.dataset.state = 'error';
    status.textContent = 'No se pudieron cargar todos los mapas base. Usa el enlace a OpenStreetMap para ver la ubicación.';
  });
  tiles.addTo(map);

  window.L.marker([LOCATION.latitude, LOCATION.longitude])
    .addTo(map)
    .bindPopup('Ubicación indicada · La Paz, Bolivia');

  status.dataset.state = 'loading';
  status.textContent = 'Cargando mapa…';
}
