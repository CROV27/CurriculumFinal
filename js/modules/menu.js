export function initMenu() {
  const nav = document.querySelector('nav');
  const button = document.querySelector('#menu-toggle');
  const desktop = window.matchMedia('(min-width: 1025px)');
  const isOpen = () => button.getAttribute('aria-expanded') === 'true';
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
  };
  button.hidden = false;
  nav.classList.add('nav-ready');
  button.addEventListener('click', () => setOpen(!isOpen()));
  // Delegación: un único manejador para todos los enlaces.
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      setOpen(false);
      if (!desktop.matches) document.querySelector(event.target.closest('a').hash)?.scrollIntoView();
    }
  });
  // Cierre al tocar fuera del menú o al pulsar Escape en cualquier parte.
  document.addEventListener('click', (event) => {
    if (isOpen() && !nav.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) { setOpen(false); button.focus(); }
  });
  desktop.addEventListener('change', () => setOpen(false));
}
