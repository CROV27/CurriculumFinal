import { EMAILJS_CONFIG, EMAILJS_ENDPOINT } from './emailjs-config.js';

// Mensajes claros para los códigos HTTP más comunes de la API de EmailJS.
const httpErrors = {
  400: 'EmailJS rechazó la solicitud (HTTP 400). Revisa la Public Key, el Service ID y el Template ID.',
  403: 'EmailJS bloqueó el envío (HTTP 403). Revisa los dominios permitidos de tu cuenta.',
  404: 'No se encontró el servicio o la plantilla de EmailJS (HTTP 404).',
  429: 'Demasiados envíos seguidos (HTTP 429). Espera unos segundos e inténtalo otra vez.',
  500: 'EmailJS presenta un error interno (HTTP 500). Inténtalo más tarde.'
};

// El envío solo se intenta si ya se reemplazaron los valores 'TU_...'.
const isConfigured = () => Object.values(EMAILJS_CONFIG).every((value) => value && !value.startsWith('TU_'));

// Petición REST a EmailJS: fetch + async/await + response.ok + timeout.
async function sendMessage(templateParams) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(EMAILJS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.serviceId,
        template_id: EMAILJS_CONFIG.templateId,
        user_id: EMAILJS_CONFIG.publicKey,
        template_params: templateParams
      }),
      signal: controller.signal
    });
    if (!response.ok) {
      // EmailJS responde con texto plano; se muestra como texto, nunca como HTML.
      const detail = (await response.text()).trim().slice(0, 120);
      const base = httpErrors[response.status] || `No se pudo enviar el mensaje (HTTP ${response.status}).`;
      throw new Error(detail ? `${base} Detalle: ${detail}` : base);
    }
    return response.status;
  } finally {
    clearTimeout(timeout);
  }
}

export function initContact() {
  const form = document.querySelector('#Contacto form');
  const status = document.querySelector('#form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const fields = Array.from(form.querySelectorAll('input, textarea'));
  let sending = false;

  // Se conserva required/type/minlength en HTML. Constraint Validation API
  // decide la validez; JS sustituye las burbujas por mensajes accesibles.
  form.noValidate = true;

  const setStatus = (kind, text) => {
    status.className = `form-status form-status--${kind}`;
    status.textContent = text;
  };

  const validate = (field) => {
    field.setCustomValidity('');
    const trimmed = field.value.trim();
    if (!trimmed) field.setCustomValidity('Completa este campo.');
    else if (field.minLength > 0 && trimmed.length < field.minLength) {
      field.setCustomValidity(`Escribe al menos ${field.minLength} caracteres sin contar espacios al inicio y al final.`);
    }
    const valid = field.checkValidity();
    const message = document.querySelector(`#error-${field.id}`);
    message.textContent = valid ? 'Campo válido.' : field.validationMessage;
    message.dataset.valid = String(valid);
    field.setAttribute('aria-invalid', String(!valid));
    return valid;
  };

  // Tras un envío correcto se limpia el formulario y sus mensajes de validación.
  const resetForm = () => {
    form.reset();
    fields.forEach((field) => {
      field.setCustomValidity('');
      field.removeAttribute('aria-invalid');
      const message = document.querySelector(`#error-${field.id}`);
      message.textContent = '';
      delete message.dataset.valid;
    });
  };

  form.addEventListener('input', (event) => {
    if (fields.includes(event.target)) {
      validate(event.target);
      if (!sending) status.textContent = '';
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;

    const valid = fields.map(validate).every(Boolean);
    if (!valid) {
      setStatus('error', 'Revisa los campos indicados antes de continuar.');
      fields.find((field) => !field.validity.valid).focus();
      return;
    }
    if (!isConfigured()) {
      setStatus('error', 'El envío aún no está configurado: completa js/modules/emailjs-config.js con tus credenciales de EmailJS.');
      return;
    }

    sending = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando…';
    setStatus('loading', 'Enviando mensaje…');
    try {
      // Los nombres deben coincidir con las variables {{...}} de la plantilla.
      await sendMessage({
        from_name: form.elements.nombre.value.trim(),
        from_email: form.elements.email.value.trim(),
        subject: form.elements.asunto.value.trim(),
        message: form.elements.mensaje.value.trim()
      });
      resetForm();
      setStatus('ok', '¡Mensaje enviado correctamente! Te responderé al correo que indicaste.');
    } catch (error) {
      setStatus('error', error.name === 'AbortError' ? 'El envío tardó demasiado. Vuelve a intentarlo.'
        : error instanceof TypeError ? 'No se pudo conectar con EmailJS. Revisa tu conexión y vuelve a intentarlo.' : error.message);
    } finally {
      sending = false;
      submitButton.disabled = false;
      submitButton.textContent = 'Enviar mensaje';
    }
  });
}
