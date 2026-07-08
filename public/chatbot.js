let chatHistory = [];
let isOpen = false;

// Create chatbot HTML and inject into page
function createChatbot() {
  const chatHTML = `
    <!-- Floating Button -->
    <div id="chat-btn" onclick="toggleChat()" style="
      position: fixed; bottom: 30px; right: 30px;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; box-shadow: 0 4px 20px rgba(102,126,234,0.5);
      z-index: 9999; font-size: 1.6rem;
      transition: transform 0.2s;
    " onmouseover="this.style.transform='scale(1.1)'" 
       onmouseout="this.style.transform='scale(1)'">
      🤖
    </div>

    <!-- Chat Window -->
    <div id="chat-window" style="
      position: fixed; bottom: 100px; right: 30px;
      width: 350px; height: 480px;
      background: white; border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      display: none; flex-direction: column;
      z-index: 9998; overflow: hidden;
      font-family: sans-serif;
    ">
      <!-- Header -->
      <div style="
        background: linear-gradient(135deg, #667eea, #764ba2);
        padding: 1rem 1.2rem; color: white;
        display: flex; align-items: center; gap: 0.7rem;
      ">
        <div style="font-size: 1.5rem;">🤖</div>
        <div>
          <div style="font-weight: 700; font-size: 1rem;">Hotel Assistant</div>
          <div style="font-size: 0.75rem; opacity: 0.85;">● Online • Powered by AI</div>
        </div>
        <div onclick="toggleChat()" style="
          margin-left: auto; cursor: pointer;
          font-size: 1.3rem; opacity: 0.8;
        ">✕</div>
      </div>

      <!-- Messages Area -->
      <div id="chat-messages" style="
        flex: 1; overflow-y: auto; padding: 1rem;
        display: flex; flex-direction: column; gap: 0.7rem;
        background: #f8f9ff;
      ">
        <!-- Welcome message -->
        <div class="bot-msg" style="
          background: white; border-radius: 14px 14px 14px 4px;
          padding: 0.7rem 1rem; max-width: 85%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          font-size: 0.9rem; color: #333; line-height: 1.5;
        ">
          👋 Hi! I'm your hotel assistant.<br><br>
          Ask me anything like:<br>
          • "Hotels in Goa under ₹2000"<br>
          • "Plan a trip to Manali"<br>
          • "Best beach hotels"
        </div>
      </div>

      <!-- Input Area -->
      <div style="
        padding: 0.8rem; border-top: 1px solid #eee;
        display: flex; gap: 0.5rem; background: white;
      ">
        <input 
          id="chat-input" 
          type="text" 
          placeholder="Ask about hotels, trips..." 
          onkeypress="handleKey(event)"
          style="
            flex: 1; border: 1.5px solid #e0e0e0;
            border-radius: 50px; padding: 0.6rem 1rem;
            font-size: 0.9rem; outline: none;
          "
        />
        <button onclick="sendMessage()" style="
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white; border: none; border-radius: 50%;
          width: 40px; height: 40px; cursor: pointer;
          font-size: 1.1rem; display: flex;
          align-items: center; justify-content: center;
        ">➤</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", chatHTML);
}

function toggleChat() {
  isOpen = !isOpen;
  const window = document.getElementById("chat-window");
  window.style.display = isOpen ? "flex" : "none";
  if (isOpen) document.getElementById("chat-input").focus();
}

function handleKey(e) {
  if (e.key === "Enter") sendMessage();
}

async function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  appendMessage(message, "user");
  input.value = "";

  // Add to history
  chatHistory.push({ role: "user", content: message });

  // Show typing indicator
  showTyping();

  try {
    const response = await fetch("/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: chatHistory.slice(-6) })
      // slice(-6) keeps last 6 messages for context
    });

    const data = await response.json();
    removeTyping();

    // Show bot reply
    appendMessage(data.reply, "bot");

    // Add to history
    chatHistory.push({ role: "assistant", content: data.reply });

  } catch (err) {
    removeTyping();
    appendMessage("Sorry, something went wrong. Please try again!", "bot");
  }
}

function appendMessage(text, sender) {
  const messages = document.getElementById("chat-messages");
  const isBot = sender === "bot";

  const msgDiv = document.createElement("div");
  msgDiv.style.cssText = `
    background: ${isBot ? "white" : "linear-gradient(135deg, #667eea, #764ba2)"};
    color: ${isBot ? "#333" : "white"};
    border-radius: ${isBot ? "14px 14px 14px 4px" : "14px 14px 4px 14px"};
    padding: 0.7rem 1rem;
    max-width: 85%;
    align-self: ${isBot ? "flex-start" : "flex-end"};
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    font-size: 0.9rem;
    line-height: 1.5;
    white-space: pre-wrap;
  `;
  msgDiv.textContent = text;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById("chat-messages");
  const typing = document.createElement("div");
  typing.id = "typing-indicator";
  typing.style.cssText = `
    background: white; border-radius: 14px 14px 14px 4px;
    padding: 0.7rem 1rem; max-width: 85%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    font-size: 0.9rem; color: #999;
  `;
  typing.innerHTML = `<span style="animation: blink 1s infinite;">● ● ●</span>`;
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing-indicator");
  if (typing) typing.remove();
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", createChatbot);