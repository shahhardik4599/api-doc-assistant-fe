function initializeChatbot() {
    const chatContainer = document.getElementById("chatbot-widget");
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const errorMessage = document.getElementById("error-message");
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbotPopup = document.getElementById("chatbot-popup");

    // Initialize chatbox to be hidden
    chatbotPopup.style.display = "none";

    // Function to toggle chatbox visibility
    function toggleChatbox() {
        if (chatbotPopup.style.display === "block") {
            chatbotPopup.style.display = "none";
            chatbotIcon.classList.remove("rectangular-icon");
            chatContainer.classList.remove("rectangular-icon");
        } else {
            chatbotPopup.style.display = "block";
            chatbotIcon.classList.add("rectangular-icon");
            chatContainer.classList.add("rectangular-icon");
        }
    }

    // Toggle the chatbox when clicking on the chatbot icon
    chatbotIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleChatbox();
    });

    // Toggle the chatbox when clicking outside of the chatbox
    document.addEventListener("click", function (event) {
        if (!chatbotPopup.contains(event.target) && chatbotPopup.style.display === "block") {
            toggleChatbox();
        }
    });

    // Call the sendMessage function when the send button is clicked
    sendButton.addEventListener("click", function () {
        sendMessage();
    });

    // Validate user input and enable/disable the send button
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

            // Display the loader
            const loader = document.createElement("div");
            loader.className = "user-message-loader";
            chatBox.appendChild(loader);

            const apiUrl = `http://127.0.0.1:8000/api/web/suggestions?query=${userMessage}`;
            console.log("apiUrl", apiUrl);

            // Hit the API with the user's message
            fetch(apiUrl, {
                method: 'GET',
                headers: []
            })
                .then(response => response.json())
                .then(data => {
                    // Hide the loader
                    chatBox.removeChild(loader);

                    // Display the API response as a chatbot message
                    console.log(data);
                    appendMessage("ChatBot", data.message);
                })
                .catch(error => {
                    console.error('Error fetching API:', error);

                    // Hide the loader in case of an error
                    chatBox.removeChild(loader);
                    appendMessage("ChatBot", "Sorry, there was an error.");
                });

            userInput.value = "";
            sendButton.disabled = true;
            errorMessage.textContent = "";
        }
    }



    // Function to append messages and separator lines
    // Function to append messages and separator lines
    function appendMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.className = sender === "You" ? "user-message" : "bot-message";
        const senderElement = document.createElement("strong");
        senderElement.textContent = sender + ": ";

        // Add a class to the sender element based on the sender
        senderElement.classList.add(sender === "You" ? "user-sender" : "bot-sender");

        messageDiv.appendChild(senderElement);
        const messageText = document.createTextNode(message);
        messageDiv.appendChild(messageText);

        chatBox.appendChild(messageDiv);
        const separatorLine = document.createElement("div");
        separatorLine.className = "message-separator";
        chatBox.appendChild(separatorLine);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

}

// Add an event listener to run your chatbot when the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    initializeChatbot();
});

