document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value.trim();

    if (userMessage === "") return;

    appendMessage(userMessage, "user");
    inputField.value = "";

    // Call GPTS API
    fetch("https://chatgpt.com/g/g-48fOdK5m3-rui-ping-ai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
    })
        .then(response => response.json())
        .then(data => {
            appendMessage(data.response, "bot");
        })
        .catch(error => {
            console.error("Error:", error);
            appendMessage("Sorry, something went wrong.", "bot");
        });
}

function appendMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;

    const messagesContainer = document.getElementById("messages");
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
