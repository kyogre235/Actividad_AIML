const history = document.getElementById("chat-history");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const resetBtn = document.getElementById("reset-btn");
const themeToggle = document.getElementById("theme-toggle");

function addMessage(sender, text, type = "user") {
  const div = document.createElement("div");
  div.classList.add("message", type);

  const ts = new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"});
  div.innerHTML = `<span class="chat-bubble">${text}</span><div class="timestamp">${ts}</div>`;

  history.appendChild(div);
  history.scrollTop = history.scrollHeight;
}

async function sendMessage() {
  const msg = input.value.trim();
  if (!msg) return;
  addMessage("Tú", msg, "user");
  input.value = "";
  sendBtn.disabled = true;
  try {
    const res = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });
    const data = await res.json();
    addMessage("Bot", data.reply, "bot");
  } catch {
    addMessage("Sistema", "Error de conexión", "system");
  } finally {
    sendBtn.disabled = false;
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
resetBtn.addEventListener("click", () => {
  history.innerHTML = "";
});

// Toggle modo oscuro/claro
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // Cambiar icono
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
