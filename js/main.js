/* ==========================================================================
   MAIN.JS — JavaScript nativo (sin librerías ni frameworks)
   Dos funcionalidades:
   1. Cambio de tema claro/oscuro, con memoria en localStorage.
   2. Validación del formulario de contacto en el cliente.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. TEMA CLARO / OSCURO
   -------------------------------------------------------------------------- */
(function () {
  const STORAGE_KEY = "cv-theme";
  const root = document.documentElement; // el <html>
  const boton = document.getElementById("theme-toggle");
  const icono = document.getElementById("theme-icon");
  const texto = document.getElementById("theme-text");

  // Aplica el tema (agrega o quita el atributo data-theme del <html>,
  // que es lo que activa las variables de variables.css)
  function aplicarTema(tema) {
    if (tema === "dark") {
      root.setAttribute("data-theme", "dark");
      icono.textContent = "🌙";
      texto.textContent = "Modo Oscuro";
      boton.setAttribute("aria-pressed", "true");
    } else {
      root.removeAttribute("data-theme");
      icono.textContent = "☀️";
      texto.textContent = "Modo Claro";
      boton.setAttribute("aria-pressed", "false");
    }
  }

  // Al cargar la página, revisa si el usuario ya había elegido un tema antes
  const temaGuardado = localStorage.getItem(STORAGE_KEY);
  aplicarTema(temaGuardado === "dark" ? "dark" : "light");

  // Al hacer clic, alterna entre los dos temas y lo guarda para la próxima visita
  boton.addEventListener("click", function () {
    const esOscuroAhora = root.getAttribute("data-theme") === "dark";
    const nuevoTema = esOscuroAhora ? "light" : "dark";
    aplicarTema(nuevoTema);
    localStorage.setItem(STORAGE_KEY, nuevoTema);
  });
})();

/* --------------------------------------------------------------------------
   2. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   -------------------------------------------------------------------------- */
(function () {
  const formulario = document.querySelector("#Contacto form");
  const estado = document.getElementById("form-status");

  // Cada campo con su propia regla de validación y su mensaje de error
  const campos = [
    {
      id: "nombre",
      idError: "error-nombre",
      esValido: function (valor) {
        return valor.trim().length >= 3;
      },
      mensaje: "Escribe tu nombre completo (mínimo 3 letras).",
    },
    {
      id: "email",
      idError: "error-email",
      esValido: function (valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
      },
      mensaje: "Ingresa un correo electrónico válido (ej. nombre@correo.com).",
    },
    {
      id: "asunto",
      idError: "error-asunto",
      esValido: function (valor) {
        return valor.trim().length >= 3;
      },
      mensaje: "Cuéntame brevemente el motivo del mensaje.",
    },
    {
      id: "mensaje",
      idError: "error-mensaje",
      esValido: function (valor) {
        return valor.trim().length >= 10;
      },
      mensaje: "El mensaje debe tener al menos 10 caracteres.",
    },
  ];

  function mostrarError(campo, mensaje) {
    const input = document.getElementById(campo.id);
    const spanError = document.getElementById(campo.idError);
    input.setAttribute("aria-invalid", "true");
    spanError.textContent = mensaje;
  }

  function limpiarError(campo) {
    const input = document.getElementById(campo.id);
    const spanError = document.getElementById(campo.idError);
    input.removeAttribute("aria-invalid");
    spanError.textContent = "";
  }

  // Valida un campo específico; devuelve true/false
  function validarCampo(campo) {
    const input = document.getElementById(campo.id);
    if (campo.esValido(input.value)) {
      limpiarError(campo);
      return true;
    }
    mostrarError(campo, campo.mensaje);
    return false;
  }

  // Mientras el usuario escribe, si corrige el error, lo hace desaparecer al instante
  campos.forEach(function (campo) {
    const input = document.getElementById(campo.id);
    input.addEventListener("input", function () {
      if (campo.esValido(input.value)) {
        limpiarError(campo);
      }
    });
  });

  // Al enviar el formulario: revisa TODOS los campos antes de dejarlo pasar
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita que la página se recargue

    let todoValido = true;
    campos.forEach(function (campo) {
      const campoValido = validarCampo(campo);
      if (!campoValido) {
        todoValido = false;
      }
    });

    if (todoValido) {
      estado.textContent = "¡Listo! Tu mensaje está correctamente completado.";
      estado.className = "form-status form-status--ok";
      formulario.reset();
    } else {
      estado.textContent = "Revisa los campos marcados en rojo antes de enviar.";
      estado.className = "form-status form-status--error";
    }
  });
})();
