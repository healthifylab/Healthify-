document.addEventListener('DOMContentLoaded', () => {
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendChatbot = document.getElementById('sendChatbot');

    if (!chatbot || !chatbotToggle || !closeChatbot || !chatbotMessages || !chatbotInput || !sendChatbot) {
        console.error('Chatbot elements missing');
        return;
    }

    // Toggle chatbot visibility
    chatbotToggle.onclick = () => {
        chatbot.classList.toggle('open');
        chatbotToggle.setAttribute('aria-expanded', chatbot.classList.contains('open'));
    };

    closeChatbot.onclick = () => {
        chatbot.classList.remove('open');
        chatbotToggle.setAttribute('aria-expanded', 'false');
    };

    // Predefined responses
    const responses = {
        'test prices': 'Prices: Healthify Vital Check ₹480, Healthify Core Wellness ₹959.2, Healthify Diabetes Care ₹800. <a href="/booking.html">Book now</a>.',
        'book': 'Book your test at <a href="/booking.html">our booking page</a>.',
        'diabetes': 'Our Healthify Diabetes Care package includes HbA1c, Glucose Fasting. <a href="/booking.html?profile=healthify-diabetes-care">Book now</a>.',
        'contact': 'Contact us at +91 9503832889 or <a href="mailto:report@healthifylab.com">report@healthifylab.com</a>.',
        default: 'Sorry, I didn’t understand. Try asking about test prices, booking, or contact details!'
    };

    // Send message
    sendChatbot.onclick = () => {
        const message = chatbotInput.value.trim().toLowerCase();
        if (!message) return;

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chatbot-message user';
        userMessage.textContent = message;
        chatbotMessages.appendChild(userMessage);

        // Add bot response
        const botMessage = document.createElement('div');
        botMessage.className = 'chatbot-message bot';
        botMessage.innerHTML = responses[Object.keys(responses).find(key => message.includes(key))] || responses.default;
        chatbotMessages.appendChild(botMessage);

        // Clear input and scroll to bottom
        chatbotInput.value = '';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    // Handle Enter key
    chatbotInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendChatbot.click();
        }
    });
});
