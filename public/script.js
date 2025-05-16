document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  addMessageToChat(message, 'user-message');
  input.value = '';

  const res = await fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  addMessageToChat(data.reply, 'bot-message');
}

function addMessageToChat(text, className) {
  const chatWindow = document.getElementById('chat-window');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${className}`;
  messageDiv.textContent = text;
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
