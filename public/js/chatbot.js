document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const errorMessage = document.getElementById("error-message");
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbotPopup = document.getElementById("chatbot-popup");

    chatbotIcon.addEventListener("click", function () {
        // Toggle the class for the chatbot icon
        chatbotIcon.classList.toggle("rectangular-icon");

        // Toggle the visibility of the chatbot popup
        if (chatbotPopup.style.display === "block") {
            chatbotPopup.style.display = "none"; // Hide it
        } else {
            chatbotPopup.style.display = "block"; // Show it
        }
    });

    sendButton.addEventListener("click", function () {
        sendMessage(); // Call the sendMessage function
    });

    userInput.addEventListener("input", function () {
        const userMessage = userInput.value.trim();

        if (userMessage === "") {
            sendButton.disabled = true;
            errorMessage.textContent = "Message cannot be empty.";
        } else if (/^\s+$/.test(userMessage)) {
            sendButton.disabled = true;
            errorMessage.textContent = "Message cannot contain only whitespace.";
        } else {
            sendButton.disabled = false;
            errorMessage.textContent = "";
        }
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();

        if (userMessage !== "") {
            appendMessage("You", userMessage);

            // Simulate a response from the chatbot after a delay
            setTimeout(() => {
                appendMessage("Chatbot", userMessage);
            }, 1000);

            userInput.value = "";
            sendButton.disabled = true;
            errorMessage.textContent = "";
        }
    }

    function appendMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.className = sender === "You" ? "user-message" : "bot-message";
        messageDiv.textContent = sender + ": " + message;
        chatBox.appendChild(messageDiv);

        // Create and append the separator line
        const separatorLine = document.createElement("div");
        separatorLine.className = "message-separator";
        chatBox.appendChild(separatorLine);

        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Close the chatbot popup when clicking outside of it
    document.addEventListener("click", function (event) {
        if (chatbotPopup.style.display === "block" && !chatbotPopup.contains(event.target) && event.target !== chatbotIcon) {
            chatbotPopup.style.display = "none"; // Hide it
            chatbotIcon.classList.remove("rectangular-icon"); // Make it circular
        }
    });
});
