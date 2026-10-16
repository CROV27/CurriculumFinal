export function initMenu() {
  const nav = document.querySelector('nav');
  const button = document.querySelector('#menu-toggle');
  const desktop = window.matchMedia('(min-width: 1025px)');
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
  };
  button.hidden = false;
  nav.classList.add('nav-ready');
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  // Delegación: un único manejador para todos los enlaces.
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      setOpen(false);
      if (!desktop.matches) document.querySelector(event.target.closest('a').hash)?.scrollIntoView();
    }
  });
  nav.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !desktop.matches) { setOpen(false); button.focus(); }
  });
  desktop.addEventListener('change', () => setOpen(false));
}
