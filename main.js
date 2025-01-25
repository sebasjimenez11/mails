const emojiArray = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣",
  "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰",
  "😘", "😗", "😙", "😚", "😋", "😛", "😜", "🤪",
  "😝", "🤑", "🤗", "🤔", "🤐", "🤨", "😐", "😑",
  "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔"
];

// Abrir el modal
const emojiButton = document.querySelector(".bi-emoji-smile-fill");
const emojiModal = document.getElementById("emojiModal");
const closeEmojiModal = document.getElementById("closeEmojiModal");
const emojiGrid = document.getElementById("emojiGrid");
const textarea = document.querySelector("textarea");

// Renderizar emojis en el modal
function renderEmojis() {
  emojiArray.forEach((emoji) => {
    const emojiElement = document.createElement("div");
    emojiElement.classList.add("emoji");
    emojiElement.textContent = emoji;
    emojiElement.addEventListener("click", () => {
      textarea.value += emoji; // Agregar el emoji al textarea
      emojiModal.style.display = "none"; // Cerrar el modal
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


