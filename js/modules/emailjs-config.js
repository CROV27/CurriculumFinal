/* ==========================================================================
   EMAILJS-CONFIG.JS — Credenciales del servicio de correo (EmailJS)
   Reemplaza los tres textos 'TU_...' con los valores de tu cuenta de EmailJS
   (Account → API keys, Email Services y Email Templates).
   La Public Key está pensada para usarse en el navegador: es pública por
   diseño. NUNCA pegues aquí la Private Key.
   ========================================================================== */
export const EMAILJS_CONFIG = {
  publicKey: 'TU_PUBLIC_KEY',
  serviceId: 'TU_SERVICE_ID',
  templateId: 'TU_TEMPLATE_ID'
};

export const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
