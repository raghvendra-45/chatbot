function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  const chatOutput = document.getElementById("chat-output");
  const sendButton = document.querySelector(".send-btn");

  if (!userInput) {
    return;
  }

  chatOutput.innerHTML += `<div class="message user-message"><strong>You:</strong> ${userInput}</div><br>`;

  document.getElementById("userInput").value = "";

  sendButton.disabled = true;
  sendButton.textContent = "Sending...";

  fetch("https://exc-backend.satyamdwivedi.com.np/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      const botResponse =
        data.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No valid response from the chatbot.";

      chatOutput.innerHTML += `<div class="message chatbot-message"><strong>Chatbot:</strong> ${botResponse}</div><br>`;

      chatOutput.scrollTop = chatOutput.scrollHeight;

      sendButton.disabled = false;
      sendButton.textContent = "Send";
    })
    .catch((error) => {
      chatOutput.innerHTML += `<div><strong>Error:</strong> Unable to get response from the backend.</div><br>`;
      sendButton.disabled = false;
      sendButton.textContent = "Send";
    });
}
