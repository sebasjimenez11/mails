const emojiArray = [
  "😀","😃","😃","😄","😁","😆",
  "😅","😂","🤣","😊","😇","🙂",
  "🙃","😉","😌","😍","🥰","😘",
  "😗","😗","😗","😙","😚","😋",
  "😛","😜","🤪","😝","🤑","🤗",
  "🤔","🤐","🤨","😐","😑","😶",
  "😏","😒","🙄","😬","🤥","😌",
  "😔",
];

const dominiosMasUsados = [
  "gmail.com","yahoo.com","outlook.com",
  "hotmail.com","icloud.com","aol.com",
  "protonmail.com","zoho.com","mail.com",
  "gmx.com",
];

// Abrir el modal
const emojiButton = document.querySelector(".bi-emoji-smile-fill");
const emojiModal = document.getElementById("emojiModal");
const closeEmojiModal = document.getElementById("closeEmojiModal");
const emojiGrid = document.getElementById("emojiGrid");
const textarea = document.querySelector("textarea");
const asunto = document.getElementById("asunto");

// Renderizar emojis en el modal
function renderEmojis() {
  emojiArray.forEach((emoji) => {
    const emojiElement = document.createElement("div");
    emojiElement.classList.add("emoji");
    emojiElement.textContent = emoji;
    emojiElement.addEventListener("click", () => {
      textarea.value += emoji;
      emojiModal.style.display = "none"; 
    });
    emojiGrid.appendChild(emojiElement);
  });
}

// Manejo de eventos
emojiButton.addEventListener("click", () => {
  emojiModal.style.display = "flex"; // Mostrar el modal
});

closeEmojiModal.addEventListener("click", () => {
  emojiModal.style.display = "none"; // Cerrar el modal
});

// Renderizar los emojis al cargar la página
renderEmojis();

const emails = [];
const inputEmails = document.getElementById("input-agregar");
const btnAgregar = document.getElementById("btn-agregar");
const contenedorEmails = document.querySelector(".container-personas");

btnAgregar.addEventListener("click", () => {
  const email = inputEmails.value.trim();
  if (email) {
    if (!correoValido(email, dominiosMasUsados)) {
      alert(
        "El correo electrónico no es válido o no pertenece a los dominios permitidos."
      );
      return;
    }

    if (emails.includes(email)) return;
    const persona = document.createElement("div");
    persona.classList.add("Persona");
    persona.innerHTML = `
        <i class="bi bi-person-circle"></i>
        <p>${email}</p>
        <i class="bi bi-x-lg" id='remove-persona'></i>
  `;
    contenedorEmails.appendChild(persona);
    emails.push(email);
    inputEmails.value = "";

    persona.querySelector("#remove-persona").addEventListener("click", () => {
      contenedorEmails.removeChild(persona);
      emails.splice(emails.indexOf(email), 1);
    });
  }
});
inputEmails.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btnAgregar.click();
  }
});

function correoValido(correo, dominiosPermitidos) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validar formato de correo
  if (!regex.test(correo)) {
    return false;
  }

  const dominio = correo.split("@")[1]; // Extraer el dominio del correo
  return dominiosPermitidos.includes(dominio);
}


const btnEnviar = document.getElementById("enviarCorreo");

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault(); // Evitar el comportamiento predeterminado del botón

  const emailsData = {
    emails: emails, // Obtenemos el arreglo de correos
    content: textarea.value.trim(), // Obtenemos el contenido del textarea
    asunto: asunto.value.trim(), // Obtenemos el asunto
  };

  // Validaciones individuales para los campos
  if (emailsData.emails.length === 0) {
    alert("Por favor, agrega al menos un correo.");
    return;
  }
  if (!emailsData.content) {
    alert("Por favor, escribe el contenido del mensaje.");
    return;
  }
  if (!emailsData.asunto) {
    alert("Por favor, escribe el asunto del correo.");
    return;
  }

  // Mostrar el overlay mientras se envían los correos
  mostrarOverlay();

  // Llamar a la función de envío de datos
  enviarDatos(emailsData);
});

function enviarDatos(data) {
  fetch("http://localhost:3000/mails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al enviar los datos.");
      }
      return response.json();
    })
    .then((result) => {
      alert("Correo enviado con éxito.");
      console.log(result); // Puedes ver la respuesta del servidor aquí
      limpiarFormulario();
      ocultarOverlay(); // Ocultar el overlay cuando termine el proceso
    })
    .catch((error) => {
      console.error(error);
      alert("Hubo un problema al enviar el correo.");
      ocultarOverlay(); // Asegurarse de ocultar el overlay incluso si hay un error
    });
}

function limpiarFormulario() {
  eliminarTodasLasPersonas();
  textarea.value = ""; // Limpiar el contenido del textarea
  asunto.value = ""; // Limpiar el contenido del asunto
}

function eliminarTodasLasPersonas() {
  // Seleccionar todos los elementos con la clase "Persona"
  const personas = document.querySelectorAll(".Persona");

  // Recorrer todos los elementos y eliminarlos
  personas.forEach((persona) => {
    persona.remove(); // Elimina el elemento del DOM
  });

  // También puedes vaciar el arreglo de correos si es necesario
  emails.length = 0; // Vaciar el arreglo de correos
}

function mostrarOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "flex"; // Mostrar el overlay
}

// Función para ocultar el overlay (después de enviar los correos)
function ocultarOverlay() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none"; // Ocultar el overlay
}
