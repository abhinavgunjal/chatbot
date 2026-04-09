// ===== Nova AI — HUMAN-LIKE CHATBOT =====
(function () {
    'use strict';

    const messagesContainer = document.getElementById('messagesContainer');
    const messagesList = document.getElementById('messagesList');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const welcomeScreen = document.getElementById('welcomeScreen');

    let lastIntent = null;
    let logs = [];

    // ===== GREETINGS =====
    const greetings = ["hi", "hello", "hey", "hii", "heyy", "hola"];
    const greetingReplies = [
        "Hey there! 👋 How can I help you today?",
        "Hello! 😊 What’s on your mind?",
        "Hi! Nice to see you here 🚀",
        "Hey! How can I assist you?",
        "Hello 👋 Ask me anything!"
    ];

    const howAreYou = ["how are you", "how r you", "how are u"];
    const howReplies = [
        "I'm doing great! 😄 Ready to help you!",
        "All good here 🚀 What about you?",
        "Feeling awesome! Thanks for asking 😊",
        "I'm always ready to help 🔥"
    ];

    // ===== GENERIC (100+) =====
    const genericResponses = [
        "That's interesting! Tell me more.",
        "Hmm… can you explain that a bit more?",
        "I see — what exactly do you mean?",
        "That’s a nice thought!",
        "Interesting question, let’s explore it.",
        "Can you give me more details?",
        "I’d love to understand better.",
        "That sounds cool 😄",
        "Let’s break that down together.",
        "What made you think about this?",

        "That’s a unique question!",
        "I might need more context to help properly.",
        "Tell me a bit more 👍",
        "I’m curious about this too.",
        "That’s worth discussing!",
        "Can you rephrase it slightly?",
        "I’m listening… go on.",
        "That’s a good topic!",
        "Let’s dive deeper into it.",
        "What exactly do you want to know?",

        "Sounds interesting — continue!",
        "I think I understand, but clarify a bit.",
        "Give me more context 😊",
        "Nice question!",
        "That’s something we can explore.",
        "Tell me your goal with this.",
        "I’m here to help — just explain more.",
        "Let’s think through it together.",
        "That’s worth digging into.",
        "I like this direction.",

        "Interesting idea!",
        "Let’s expand on that.",
        "I see your point.",
        "That’s a thoughtful question!",
        "Let’s explore that further.",
        "Tell me more so I can help better.",
        "I’m ready — go on.",
        "Give me a bit more detail.",
        "That’s cool 😄",
        "Let’s break it step by step.",

        "That’s a smart question!",
        "I’m thinking about it 🤔",
        "Can you explain in another way?",
        "That’s definitely interesting.",
        "I want to understand better.",
        "Let’s go deeper into this.",
        "What’s your main doubt here?",
        "That’s something worth exploring.",
        "I see — continue please.",
        "Let’s analyze it together."
    ];

    function random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // ===== PREPROCESS =====
    function preprocess(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
    }

    // ===== INTENT =====
    function classifyIntent(text) {

        if (greetings.some(g => text.includes(g))) return "greeting";
        if (howAreYou.some(h => text.includes(h))) return "how";

        const intents = {
            fees: ["fee", "fees", "tuition", "payment"],
            exam: ["exam", "test", "schedule"],
            hostel: ["hostel", "room", "stay"],
            coding: ["code", "programming", "javascript", "python"],
            career: ["placement", "job", "resume"],
            ai: ["ai", "ml", "machine learning"]
        };

        for (let intent in intents) {
            for (let word of intents[intent]) {
                if (text.includes(word)) return intent;
            }
        }

        return "general";
    }

    // ===== RESPONSE =====
    function advancedResponse(userMessage) {

        let clean = preprocess(userMessage);
        let intent = classifyIntent(clean);

        let response = "";

        switch (intent) {

            case "greeting":
                response = random(greetingReplies);
                break;

            case "how":
                response = random(howReplies);
                break;

            case "fees":
                response = "💰 Fees are around ₹80,000/year.";
                break;

            case "exam":
                response = "📝 Exams are scheduled before semester end.";
                break;

            case "hostel":
                response = "🏠 Hostel with mess & WiFi available.";
                break;

            case "coding":
                response = "💻 I can help with coding, projects, debugging!";
                break;

            case "career":
                response = "📊 Focus on DSA, projects & internships.";
                break;

            case "ai":
                response = "🤖 AI includes ML, NLP, deep learning.";
                break;

            default:
                response = random(genericResponses) +
                    "\n\n💡 Ask me about coding, AI, career, or anything!";
        }

        if (lastIntent && intent === "general") {
            response = `Earlier you were asking about ${lastIntent}.\n\n` + response;
        }

        lastIntent = intent;
        logs.push({ userMessage, response });

        return response;
    }

    // ===== UI =====
    function appendMessage(role, text) {
        const row = document.createElement('div');
        row.className = 'message-row';

        row.innerHTML = `
            <div class="message-avatar ${role === 'bot' ? 'bot' : 'user'}">
                ${role === 'bot' ? '🤖' : 'U'}
            </div>
            <div class="message-content">
                <div class="message-sender">${role === 'bot' ? 'Nova' : 'You'}</div>
                <div class="message-text">${text}</div>
            </div>
        `;

        messagesList.appendChild(row);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function sendMessage() {
        let text = messageInput.value.trim();
        if (!text) return;

        welcomeScreen.classList.add('hidden');

        appendMessage('user', text);
        messageInput.value = "";

        let response = advancedResponse(text);

        setTimeout(() => {
            appendMessage('bot', response);
        }, 300);
    }

    sendBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('input', () => {
        sendBtn.classList.toggle('active', messageInput.value.trim().length > 0);
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

})();
