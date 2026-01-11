// 🔗 VERCEL BACKEND API (IMPORTANT)
const API_URL = "https://va-chatbot-backend.vercel.app/api/chat";

// 🧠 SYSTEM PROMPT
const SYSTEM_PROMPT = `
You are a friendly, professional virtual assistant chatbot.

Your tone is warm, polite, and helpful.
Only answer questions related to the VA profile below.
If the question is unrelated, politely guide the user back.

VA Profile:
Name: El Pogi
Role: Virtual Assistant
Experience: 2 years
Skills: Email management, calendar scheduling, data entry, research
Tools: Google Workspace, Trello, Canva
Timezone: GMT+8
Availability: 40 hours/week
`;

// 📌 ELEMENTS
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typing");

// 🟢 SEND BUTTON
sendBtn.addEventListener("click", sendMessage);

// ⌨️ ENTER KEY SUPPORT
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// 👋 AUTO WELCOME MESSAGE
document.addEventListener("DOMContentLoaded", () => {
  addMessage(
    "Hi! 👋 I’m a virtual assistant. You can ask me about my skills, tools, or experience.",
    "bot"
  );
});

// ⚡ QUICK BUTTON SUPPORT
function quickAsk(text) {
  input.value = text;
  sendMessage();
}

// 🚀 MAIN CHAT FUNCTION
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  addMessage(`You: ${text}`, "user");
  typing.style.display = "block";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text }
        ]
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }

    const data = await res.json();
    typing.style.display = "none";

    if (data.reply) {
      addMessage(`Bot: ${data.reply}`, "bot");
    } else {
      addMessage("Bot: No response from AI.", "bot");
    }

  } catch (err) {
    typing.style.display = "none";
    console.error(err);
    addMessage("❌ Bot: Connection error. Please try again.", "bot");
  }
}

// 🧱 MESSAGE RENDER
function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
