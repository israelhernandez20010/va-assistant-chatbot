async function sendMessage() {
  const input = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const typing = document.getElementById("typing");

  const userText = input.value.trim();
  if (!userText) return;

  input.value = "";
  chat.innerHTML += `<div class="message user">You: ${userText}</div>`;
  chat.scrollTop = chat.scrollHeight;

  typing.style.display = "block";

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
            content: [{ type: "text", text: userText }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText);
    }

    const data = await response.json();

    typing.style.display = "none";

    // ✅ Worker returns { reply: "..." }
    if (!data.reply) {
      throw new Error("No reply received from server");
    }

    typeWriterEffect(data.reply, chat);

  } catch (err) {
    typing.style.display = "none";
    chat.innerHTML += `
      <div class="message assistant" style="color:red;">
        ❌ Error: ${err.message}
      </div>
    `;
  }
}
