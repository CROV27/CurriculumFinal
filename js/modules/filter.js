const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function initFilter() {
  const results = document.querySelector('#project-results');
  const search = document.querySelector('#project-search');
  const count = document.querySelector('#project-count');
  // Instantánea congelada: nunca se modifica el contenido original del CV.
  const projects = Object.freeze(Array.from(results.children, (article) => Object.freeze({
    html: article.outerHTML,
    text: normalize(article.textContent)
  })));
  const render = () => {
    const query = normalize(search.value.trim());
    const cards = projects.filter((project) => project.text.includes(query)).map((project) => project.html);
    // HTML exclusivamente local; la entrada del usuario no se inserta en el marcado.
    results.innerHTML = cards.join('');
    count.textContent = cards.length ? `${cards.length} de ${projects.length} proyectos encontrados.` : 'No se encontraron proyectos. Prueba otra palabra.';
  };
  search.addEventListener('input', render);
  render();
}
