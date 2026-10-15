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
