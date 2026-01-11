const WORKER_URL = "https://tight-lake-94ec.israelhernandez20010.workers.dev";

const SYSTEM_PROMPT = `
You are a professional virtual assistant chatbot.
Only answer questions about the VA profile.
If unrelated, say: "I can only answer questions about my VA profile."

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

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  input.value = "";

  chat.innerHTML += `<div class="message user">You: ${text}</div>`;
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: [
          {
            role: "system",
            content: [{ type: "text", text: SYSTEM_PROMPT }]
          },
          {
            role: "user",
            content: [{ type: "text", text }]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    chat.innerHTML += `<div class="message bot">Bot: ${data.reply}</div>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    chat.innerHTML += `<div class="message bot">❌ Error connecting to server</div>`;
  }
}
