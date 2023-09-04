// document.addEventListener("DOMContentLoaded", function () {
//     const chatBox = document.getElementById("chat-box");
//     const userInput = document.getElementById("user-input");
//     const sendButton = document.getElementById("send-button");

//     sendButton.addEventListener("click", function () {
//         sendMessage();
//     });

//     userInput.addEventListener("keydown", function (event) {
//         if (event.key === "Enter" && !event.shiftKey) {
//             event.preventDefault(); // Prevents Enter from creating a new line
//             sendMessage();
//         }
//     });

//     function sendMessage() {
//         const userMessage = userInput.value.trim();

//         if (userMessage === "") {
//             // User input is empty
//             return;
//         }
//         appendMessage("You", userMessage);
//         // Here, you can implement your chatbot's response logic.
//         // For simplicity, we'll just echo the user's message.
//         setTimeout(() => {
//             appendMessage("Chatbot", userMessage);
//         }, 1000);

//         userInput.value = "";
//     }


//     function appendMessage(sender, message) {
//         const messageDiv = document.createElement("div");
//         messageDiv.className = sender === "You" ? "user-message" : "bot-message";
//         messageDiv.textContent = sender + ": " + message;
//         chatBox.appendChild(messageDiv);
//         chatBox.scrollTop = chatBox.scrollHeight;
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const errorMessage = document.getElementById("error-message");

    sendButton.addEventListener("click", function () {
        sendMessage();
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
            appendMessage("Query(You)", userMessage);
            // Here, you can implement your chatbot's response logic.
            // For simplicity, we'll just echo the user's message.
            setTimeout(() => {
                appendMessage("Response", userMessage);
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
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

