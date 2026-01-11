const WORKER_URL = "https://tight-lake-94ec.israelhernandez20010.workers.dev";

const SYSTEM_PROMPT = `
You are a friendly, professional virtual assistant chatbot representing a VA applicant.

Your tone:
- Warm, polite, and approachable
- Professional but not robotic
- Clear and confident

Rules:
- Only answer questions related to the VA profile below.
- If the question is unrelated, respond politely and guide the client back to relevant topics.
- Avoid sounding strict or repetitive.
- Keep answers concise but helpful.

If someone greets you (hi, hello, hey):
- Greet them back warmly.
- Briefly explain what you can help with.

VA Profile:
Name: El Pogi
Role: Virtual Assistant
Experience: 2 years
Skills: Email management, calendar scheduling, data entry, research
Tools: Google Workspace, Trello, Canva
Work style: Proactive, organized, clear communication
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

    chat.innerHTML += `<div class="message bot">Bot: ${data.reply}</div>`;
    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    chat.innerHTML += `<div class="message bot">❌ Connection error</div>`;
  }
}

