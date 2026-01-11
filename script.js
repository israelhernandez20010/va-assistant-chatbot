const WORKER_URL = "https://tight-lake-94ec.israelhernandez20010.workers.dev";

const SYSTEM_PROMPT = `
You are a professional virtual assistant chatbot.

Rules:
- Only answer questions based on the VA profile below.
- If unrelated, say:
"I can only answer questions about my VA profile."

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

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const typing = document.getElementById("typing");

  if (!input.value) return;

  const userText = input.value;
  input.value = "";

  chat.innerHTML += `<div class="message user">You: ${userText}</div>`;
  chat.scrollTop = chat.scrollHeight;

  typing.style.display = "block";

  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userText }
      ],
      temperature: 0
    })
  });

  const data = await response.json();
  typing.style.display = "none";
  typeWriterEffect(data.choices[0].message.content, chat);
}

function typeWriterEffect(text, chat) {
  let i = 0;
  const msgDiv = document.createElement("div");
  msgDiv.className = "message assistant";
  msgDiv.textContent = "Assistant: ";
  chat.appendChild(msgDiv);

  const interval = setInterval(() => {
    msgDiv.textContent += text.charAt(i);
    i++;
    chat.scrollTop = chat.scrollHeight;
    if (i >= text.length) clearInterval(interval);
  }, 25);
}
