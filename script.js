const WORKER_URL = "https://tight-lake-94ec.israelhernandez20010.workers.dev";

const SYSTEM_PROMPT = `
You are a friendly, professional virtual assistant chatbot.

Your tone is warm, polite, and conversational.
Only answer questions related to the VA profile below.
If unrelated, gently guide the user back to relevant topics.

VA Profile:
Name: El Pogi
Role: Virtual Assistant
Experience: 2 years
Skills: Email management, calendar scheduling, data entry, research
Tools: Google Workspace, Trello, Canva
Timezone: GMT+8
Availability: 40 hours/week
`;

const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typing");

sendBtn.addEventListener("click", sendMessage);

/* ✅ AUTO WELCOME MESSAGE – SAFE VERSION */
document.addEventListener("DOMContentLoaded", () => {
  addMessage(
    "Hi! 👋 I’m a virtual assistant. You can ask me about my skills, tools, or experience.",
    "bot"
  );
});

/* ✅ QUICK ASK */
function quickAsk(text) {
  input.value = text;
  sendMessage();
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  addMessage(`You: ${text}`, "user");
  typing.style.display = "block";

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text }
        ]
      })
    });

    const data = await res.json();
    typing.style.display = "none";

    if (!data.reply) {
  addMessage("Bot: (No response received)", "bot");
} else {
  // SAFETY CHECK – show raw reply first
if (typeof data.reply !== "string" || data.reply.trim() === "") {
  addMessage("Bot: (No reply received)", "bot");
} else {
  // show instantly (stable)
  addMessage(`Bot: ${data.reply}`, "bot");

  // OPTIONAL: comment this out if you want zero typing effect
  // typeWriter(`Bot: ${data.reply}`, "bot");
}



  } catch (err) {
    typing.style.display = "none";
    addMessage("❌ Connection error", "bot");
  }
}

/* ✅ TYPEWRITER EFFECT */
function typeWriter(text, className) {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  chat.appendChild(div);

  let i = 0;
  const speed = 20;

  const interval = setInterval(() => {
    div.textContent += text.charAt(i);
    i++;
    chat.scrollTop = chat.scrollHeight;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}


