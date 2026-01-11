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

  try {
    console.log("Sending request to Worker...");

    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
body: JSON.stringify({
  model: "gpt-5-nano",
  input: [
    {
      role: "system",
      content: [
        { type: "text", text: SYSTEM_PROMPT }
      ]
    },
    {
      role: "user",
      content: [
        { type: "text", text: userText }
      ]
    }
  ]
})


    console.log("Response received:", response);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    console.log("Response JSON:", data);

    typing.style.display = "none";

    if (!data.choices || !data.choices[0]) {
      throw new Error("Invalid OpenAI response structure");
    }

    typeWriterEffect(data.choices[0].message.content, chat);

  } catch (err) {
    typing.style.display = "none";

    console.error("Chatbot error:", err);

    chat.innerHTML += `
      <div class="message assistant" style="color:red;">
        ❌ Error: ${err.message}
      </div>
    `;
  }
}

