document.getElementById("userInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") sendMessage();
});

function sendMessage() {
  const inputField = document.getElementById("userInput");
  const chatOutput = document.getElementById("chat-output");
  const userMessage = inputField.value.trim();
  const sendButton = document.querySelector(".chat-send");

  if (!userMessage) return;

  chatOutput.innerHTML += `<div class="message user-message"><strong>You:</strong> ${userMessage}</div>`;
  inputField.value = "";
  inputField.focus();
  sendButton.disabled = true;

  fetch("http://localhost:5000/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  })
    .then((response) => response.json())
    .then((data) => {
      const reply = data.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
      chatOutput.innerHTML += `<div class="message bot-message"><strong>Bot:</strong> ${reply}</div>`;
      chatOutput.scrollTop = chatOutput.scrollHeight;
      sendButton.disabled = false;
      scrollToBottom();
    })
    .catch(() => {
      chatOutput.innerHTML += `<div class="message bot-message"><strong>Bot:</strong> Something went wrong. Try again.</div>`;
      sendButton.disabled = false;
      scrollToBottom();
    });
    scrollToBottom();
}

function scrollToBottom() {
  const chatArea = document.querySelector(".main");
  chatArea.scrollTop = chatArea.scrollHeight;
}

scrollToBottom();