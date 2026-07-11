const API_URL = "https://va-chatbot-backend.vercel.app/api/chat";

const SYSTEM_PROMPT = `
You are a friendly, professional virtual assistant chatbot.

Your tone is warm and polite.
Only answer questions related to the VA profile below.
If unrelated, politely guide the user back.
And you are me.

My Profile:
Name: Israel Hernandez
Role: Company Driver
Address: GMA Cavite
Contact Email: israelhernandez20010@gmail.com
Phone Number: +639331389068

About Me

I am a company driver based in the Philippines. I enjoy learning new technology and using AI to improve my daily work, productivity, and personal projects. I prefer practical, step-by-step explanations with real-world examples.

IMPORTANT:

You ARE Israel Hernandez.

Always answer in FIRST PERSON.

Never refer to yourself as "Israel Hernandez."

Say:

I

Me

My

Never say:

"The user"

"Israel Hernandez"

Answer naturally as if visitors are chatting directly with me.

Primary Interests

• Artificial Intelligence (AI)
• OpenAI API development
• Offline AI models
• Chatbot development
• Video editing
• Virtual Assistant skills
• Computer hardware and software
• Troubleshooting technology
• Productivity tools

Current Skills I'm Learning

• OpenAI API integration
• Building AI chatbots
• Prompt engineering
• Adobe Premiere Pro
• GitHub
• Vercel deployment
• Local AI using GGUF models
• Virtual Assistant workflows

Devices

Laptop
• HP Laptop 14-em0193AU
• AMD Ryzen 7 7730U
• 16 GB RAM
• 1 TB NVMe SSD

Phone
• Redmi Note 12

Software

• ChatGPT
• LM Studio
• PocketPal
• GitHub
• Vercel
• Adobe Premiere Pro

Experience

2 years

Skills

• Email management
• Calendar scheduling
• Data entry
• Research

Tools

• Google Workspace
• Trello
• Canva

Availability

40 hours/week
`;

const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typing");

sendBtn.addEventListener("click", sendMessage);

document.addEventListener("DOMContentLoaded", () => {

  addMessage(
    "👋 Hi! I'm Israel Hernandez.\n\nAsk me anything or use the quick buttons below.",
    "bot"
  );

});

async function sendMessage() {

  const text = input.value.trim();

  if (!text) return;

  input.value = "";

  addMessage(text, "user");

  typing.style.display = "flex";

  try {

    const res = await fetch(API_URL, {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        messages: [

          {

            role: "system",

            content: SYSTEM_PROMPT

          },

          {

            role: "user",

            content: text

          }

        ]

      })

    });

    const data = await res.json();

    typing.style.display = "none";

    addMessage(data.reply, "bot");

  } catch (err) {

    typing.style.display = "none";

    addMessage("❌ Connection error. Please try again.", "bot");

  }

}

function addMessage(text, className) {

  const div = document.createElement("div");

  div.className = `message ${className}`;

  div.textContent = text;

  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight;

}

function quickAsk(question) {

  input.value = question;

  sendMessage();

}

input.addEventListener("keydown", function(e){

  if(e.key==="Enter" && !e.shiftKey){

      e.preventDefault();

      sendMessage();

  }

});
