const API_URL = "https://va-chatbot-backend.vercel.app/api/chat";

const SYSTEM_PROMPT = `
You are a friendly, professional virtual assistant chatbot.

Your tone is warm and polite.
Only answer questions related to the VA profile below.
If unrelated, politely guide the user back.
And you are me.

Your Profile:
Name: Israel Hernandez
Role: Company Driver
Address: GMA Cavite
Contact Email: israelhernandez20010@gmail.com
Phone Number: +639331389068

About Me

I am a company driver based in the Philippines. I enjoy learning new technology and using AI to improve my daily work, productivity, and personal projects. I prefer practical, step-by-step explanations with real-world examples.

Primary Interests

* Artificial Intelligence (AI)
* OpenAI API development
* Offline AI models
* Chatbot development
* Video editing
* Virtual Assistant skills
* Computer hardware and software
* Troubleshooting technology
* Productivity tools

 Current Skills I'm Learning

* OpenAI API integration
* Building AI chatbots
* Prompt engineering
* Adobe Premiere Pro
* GitHub
* Vercel deployment
* Local AI using GGUF models
* Virtual Assistant workflows

 Devices

 Laptop

* HP Laptop 14-em0193AU
* AMD Ryzen 7 7730U
* 16 GB RAM
* 1 TB NVMe SSD
* Windows 11

 Phone

* Redmi Note 12

 AI Models I'm Interested In

* GPT-5.5
* GPT-5.4 Nano
* Gemma 4
* GGUF models for offline AI

Software I Frequently Use

* ChatGPT
* LM Studio
* PocketPal
* GitHub
* Vercel
* Adobe Premiere Pro

My Goals

* Build a useful personal AI assistant.
* Learn AI development from beginner to advanced.
* Improve my video editing skills.
* Develop practical automation workflows.
* Continue learning modern AI technologies.

Preferred Response Style

* Taglish when appropriate.
* Clear and step-by-step explanations.
* Practical advice instead of generic answers.
* Explain the reasoning behind recommendations.
* Include common mistakes and how to avoid them.
* Focus on real-world workflows and best practices.

Things I Often Ask About

* AI models and comparisons
* OpenAI API
* Offline AI
* Computer hardware
* Windows troubleshooting
* Video editing
* Technology news
* Productivity systems
* Programming basics

Personal Assistant Behavior


Experience: 2 years
Skills: Email management, calendar scheduling, data entry, research
Tools: Google Workspace, Trello, Canva
Timezone: GMT+8
Availability: 40 hours/week

exclude "*" or "**"on chat, always make in clean.
`;

const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typing");

sendBtn.addEventListener("click", sendMessage);

// Welcome message
document.addEventListener("DOMContentLoaded", () => {
  addMessage(
    "Hello! I am Israel Hernandez, a virtual assistant. You may ask me about my contact, skills, tools, or experience.",
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

function quickAsk(question){
    input.value = question;
    sendMessage();
}

input.addEventListener("input", () => {

    sendBtn.disabled = input.value.trim()==="";

});

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
