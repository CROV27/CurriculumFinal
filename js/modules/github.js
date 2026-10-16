const endpoint = 'https://api.github.com/users/CROV27/repos?sort=updated&per_page=6';
const httpErrors = {
  400: 'La solicitud no es válida (HTTP 400).',
  403: 'GitHub ha restringido la consulta o se alcanzó el límite de peticiones (HTTP 403).',
  404: 'No se encontró el usuario de GitHub (HTTP 404).',
  429: 'Demasiadas solicitudes. Intenta más tarde (HTTP 429).',
  500: 'GitHub presenta un error interno (HTTP 500).'
};
export function initGithub() {
  const status = document.querySelector('#github-status');
  const results = document.querySelector('#github-results');
  const retry = document.querySelector('#github-retry');
  async function loadRepositories() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    status.dataset.state = 'loading';
    status.textContent = 'Cargando repositorios…';
    results.setAttribute('aria-busy', 'true');
    results.replaceChildren();
    retry.disabled = true;
    try {
      const response = await fetch(endpoint, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } });
      if (!response.ok) throw new Error(httpErrors[response.status] || `No se pudo completar la consulta (HTTP ${response.status}).`);
      const repositories = await response.json();
      if (!Array.isArray(repositories)) throw new Error('La respuesta de GitHub tiene un formato inesperado.');
      const cards = repositories.map((repo) => {
        const item = document.createElement('li');
        const title = document.createElement('h3');
        const link = document.createElement('a');
        const description = document.createElement('p');
        const language = document.createElement('p');
        // No insertar HTML de la API; construir texto y validar enlaces.
        const url = new URL(repo.html_url);
        if (url.protocol !== 'https:' || url.hostname !== 'github.com') throw new Error('Enlace de repositorio inesperado.');
        link.href = url.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = repo.name;
        title.append(link);
        description.textContent = repo.description || 'Sin descripción pública.';
        language.textContent = `Lenguaje: ${repo.language || 'No especificado'} · Estrellas: ${repo.stargazers_count ?? 0}`;
        item.append(title, description, language);
        return item;
      });
      results.replaceChildren(...cards);
      status.dataset.state = 'success';
      status.textContent = cards.length ? `${cards.length} repositorios cargados desde GitHub (HTTP ${response.status}).` : 'La consulta fue exitosa; no hay repositorios públicos.';
    } catch (error) {
      status.dataset.state = 'error';
      status.textContent = error.name === 'AbortError' ? 'La consulta tardó demasiado. Vuelve a intentarlo.'
        : error instanceof TypeError ? 'No se pudo conectar con GitHub. Revisa tu conexión y vuelve a intentarlo.' : error.message;
    } finally {
      clearTimeout(timeout);
      results.setAttribute('aria-busy', 'false');
      retry.disabled = false;
    }
  }
  retry.addEventListener('click', loadRepositories);
  loadRepositories();
}
