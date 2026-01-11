const API_URL = "https://va-chatbot-backend.vercel.app/api/chat";

const SYSTEM_PROMPT = `
You are a friendly, professional virtual assistant chatbot.

Your tone is warm and polite.
Only answer questions related to the VA profile below.
If unrelated, politely guide the user back.

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

// Welcome message
document.addEventListener("DOMContentLoaded", () => {
  addMessage(
    "Hello! I am a virtual assistant. You may ask me about my skills, tools, or experience.",
    "bot"
  );
});

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  addMessage(`You: ${text}`, "user");
  typing.style.display = "block";

  try {
    const res = await fetch(API_URL, {
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

    addMessage(`Bot: ${data.reply}`, "bot");

  } catch (err) {
    typing.style.display = "none";
    addMessage("Connection error. Please try again.", "bot");
  }
}

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
