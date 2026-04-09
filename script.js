// ===== Nova AI — SMART + GENERIC RESPONSE SYSTEM =====
(function () {
    'use strict';

    const messagesContainer = document.getElementById('messagesContainer');
    const messagesList = document.getElementById('messagesList');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const welcomeScreen = document.getElementById('welcomeScreen');

    let lastIntent = null;
    let logs = [];

    // ===== GENERIC RESPONSES (100+) =====
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
        "Let’s analyze it together.",

        "Nice, tell me more!",
        "That’s quite interesting!",
        "What exactly are you looking for?",
        "I can help — just expand it a bit.",
        "That’s a great thought!",
        "Let’s work through it.",
        "I’m curious now 😄",
        "Explain a bit more please.",
        "That sounds important.",
        "Let’s explore it step by step.",

        "That’s something new!",
        "I like this question.",
        "Can you add more detail?",
        "Let’s understand it better.",
        "That’s a good discussion point.",
        "Tell me more 👍",
        "I’d love to help with that.",
        "Let’s think about it.",
        "That’s worth exploring.",
        "Go on, I’m listening.",

        "That’s interesting 🤔",
        "Let’s dig deeper into it.",
        "Explain more please.",
        "I’m here — continue.",
        "That’s a cool idea!",
        "What exactly do you mean?",
        "Let’s explore all possibilities.",
        "I see — tell me more.",
        "That’s a valid point.",
        "Let’s go step by step.",

        "That’s something we can solve!",
        "I’m curious — explain more.",
        "Let’s break it down simply.",
        "Nice thinking!",
        "That’s an interesting direction.",
        "Tell me more details.",
        "I’m ready to help!",
        "Let’s explore together 🚀",
        "That’s a good question!",
        "I like this discussion."
    ];

    function getRandomGeneric() {
        return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }

    // ===== PREPROCESS =====
    function preprocess(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
    }

    // ===== INTENT =====
    function classifyIntent(text) {

        const intents = {
            fees: ["fee", "fees", "tuition", "payment", "cost"],
            exam: ["exam", "test", "schedule", "result", "date"],
            hostel: ["hostel", "room", "stay"],
            coding: ["code", "programming", "javascript", "python"],
            career: ["placement", "job", "resume", "interview"],
            ai: ["ai", "machine learning", "ml"]
        };

        for (let intent in intents) {
            for (let word of intents[intent]) {
                if (text.includes(word)) {
                    return intent;
                }
            }
        }

        return "general";
    }

    // ===== ENTITY =====
    function extractEntities(text) {
        let date = text.match(/\d{1,2}\/\d{1,2}\/\d{2,4}/);
        let sem = text.match(/sem\s?\d/i);

        return {
            date: date ? date[0] : null,
            semester: sem ? sem[0] : null
        };
    }

    // ===== RESPONSE =====
    function advancedResponse(userMessage) {

        let clean = preprocess(userMessage);
        let intent = classifyIntent(clean);
        let entities = extractEntities(userMessage);

        let response = "";

        switch (intent) {

            case "fees":
                response = "💰 Fees are around ₹80,000/year.";
                break;

            case "exam":
                response = "📝 Exams are scheduled by the college before semester end.";
                break;

            case "hostel":
                response = "🏠 Hostel with mess and WiFi available.";
                break;

            case "coding":
                response = "💻 I can help with coding, projects, and debugging!";
                break;

            case "career":
                response = "📊 Focus on DSA, projects, and internships for placements.";
                break;

            case "ai":
                response = "🤖 AI includes ML, deep learning, NLP, etc.";
                break;

            default:
                response = getRandomGeneric() + "\n\n💡 You can ask about coding, AI, college, career, or anything!";
        }

        // Context memory
        if (lastIntent && intent === "general") {
            response = `Earlier you were asking about ${lastIntent}.\n\n` + response;
        }

        lastIntent = intent;

        if (entities.date) response += `\n📅 Date: ${entities.date}`;
        if (entities.semester) response += `\n🎓 Semester: ${entities.semester}`;

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

    // ===== SEND =====
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

    // ===== EVENTS =====
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
