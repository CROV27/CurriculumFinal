export function initTheme() {
  const root = document.documentElement;
  const button = document.querySelector('#theme-toggle');
  const key = 'cv-theme';
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.setAttribute('aria-label', `Activar modo ${theme === 'dark' ? 'claro' : 'oscuro'}`);
    document.querySelector('#theme-icon').textContent = theme === 'dark' ? '🌙' : '☀️';
    document.querySelector('#theme-text').textContent = theme === 'dark' ? 'Modo oscuro' : 'Modo claro';
  };
  let theme = 'light';
  try {
    const stored = localStorage.getItem(key);
    // Compatibilidad con el valor sin JSON de la primera parte del examen.
    const parsed = stored === 'dark' || stored === 'light' ? stored : JSON.parse(stored);
    if (parsed === 'dark' || parsed === 'light') theme = parsed;
  } catch { /* Un almacenamiento bloqueado o corrupto no impide usar el CV. */ }
  applyTheme(theme);
  button.addEventListener('click', () => {
    theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem(key, JSON.stringify(theme)); } catch { /* Tema válido durante esta visita. */ }
  });
}
