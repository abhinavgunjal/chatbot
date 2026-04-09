// ===== Nova AI Chatbot — Smart Response System =====

(function () {
    'use strict';

    // ===== DOM Elements =====
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const newChatBtn = document.getElementById('newChatBtn');
    const chatHistory = document.getElementById('chatHistory');

    const messagesContainer = document.getElementById('messagesContainer');
    const messagesList = document.getElementById('messagesList');
    const welcomeScreen = document.getElementById('welcomeScreen');

    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearChatBtn = document.getElementById('clearChatBtn');

    const suggestionCards = document.querySelectorAll('.suggestion-card');

    // ===== State =====
    let conversations = [];
    let currentConversationId = null;

    // ===== Knowledge Base =====
    const knowledgeBase = [
        {
            keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
            responses: [
                "Hello! 👋 Great to see you here. I'm Nova, your AI assistant. How can I help you today?",
                "Hey there! 😊 Welcome! I'm ready to help with whatever you need — just ask away!",
                "Hi! 🌟 I'm Nova. Whether you need creative ideas, technical help, or just a conversation — I'm here for you!"
            ]
        },
        {
            keywords: ['how are you', "how's it going", 'how do you do', "what's up"],
            responses: [
                "I'm doing fantastic, thanks for asking! 🚀 I'm always ready and energized to help. What's on your mind?",
                "I'm great! I've been processing knowledge all day and I'm excited to chat with you. What can I help with?",
                "Running at peak performance! ⚡ I'm here and ready to assist. What would you like to explore today?"
            ]
        },
        {
            keywords: ['your name', 'who are you', 'what are you', 'introduce yourself'],
            responses: [
                "I'm **Nova** — an AI assistant designed to help you with a wide range of tasks! 🌟 From answering questions and brainstorming ideas to writing content and explaining complex topics, I'm here to make your day more productive.",
                "My name is **Nova**! Think of me as your intelligent conversation partner. I can help with creative writing, explain technical concepts, offer productivity tips, and much more. What interests you?",
                "I'm **Nova**, your AI chat companion! 💫 I'm built to understand natural language and provide helpful, thoughtful responses. Feel free to ask me anything!"
            ]
        },
        {
            keywords: ['space', 'universe', 'cosmos', 'galaxy', 'planet', 'star', 'astronomy', 'space exploration'],
            responses: [
                "Space is absolutely fascinating! 🌌 Here are some mind-blowing facts:\n\n• The observable universe is about **93 billion light-years** in diameter\n• There are more stars in the universe than grains of sand on Earth — roughly **200 sextillion** (2×10²³)\n• A day on Venus is longer than its year\n• The largest known structure is the **Hercules-Corona Borealis Great Wall**, spanning 10 billion light-years\n\nWhat aspect of space intrigues you most?",
                "The cosmos never ceases to amaze! ✨ Did you know that we're all made of **stardust**? The elements in our bodies were forged in the cores of ancient stars that exploded billions of years ago.\n\nThe universe is roughly **13.8 billion years old**, and it's still expanding — accelerating, in fact! Would you like to dive deeper into any particular cosmic topic?",
                "Welcome to the cosmic conversation! 🚀 Space is one of my favorite topics.\n\nSome incredible facts:\n• **Neutron stars** are so dense that a teaspoon would weigh about 6 billion tons\n• There's a **diamond planet** (55 Cancri e) worth about $26.9 nonillion\n• Sound can't travel in space — it's completely silent\n\nWhat would you like to explore?"
            ]
        },
        {
            keywords: ['quantum', 'quantum computing', 'qubit', 'superposition'],
            responses: [
                "Quantum computing is one of the most exciting frontiers in technology! ⚛️\n\nHere's a simple breakdown:\n\n**Classical computers** use **bits** (0 or 1)\n**Quantum computers** use **qubits** which can be 0, 1, or *both at the same time* (superposition)\n\n🔑 **Key concepts:**\n• **Superposition** — A qubit exists in multiple states simultaneously\n• **Entanglement** — Two qubits can be linked so measuring one instantly affects the other\n• **Quantum interference** — Used to amplify correct answers and cancel wrong ones\n\nThis allows quantum computers to solve certain problems *exponentially faster* than classical ones — like drug discovery, cryptography, and optimization!\n\nWant me to explain any of these concepts in more detail?"
            ]
        },
        {
            keywords: ['email', 'write email', 'professional email', 'draft email'],
            responses: [
                "I'd love to help you write a professional email! ✉️ Here's a solid template structure:\n\n```\nSubject: [Clear, specific subject line]\n\nDear [Name],\n\nI hope this message finds you well.\n\n[Opening — state reason for writing]\n\n[Body — provide details, context, or requests]\n\n[Closing — clear call to action]\n\nBest regards,\n[Your Name]\n[Your Title]\n```\n\n**Pro tips:**\n• Keep the subject line under 50 characters\n• Lead with the most important information\n• Use bullet points for multiple items\n• End with a clear next step\n\nWould you like me to draft a specific email for you? Just tell me the context!"
            ]
        },
        {
            keywords: ['productivity', 'productive', 'time management', 'efficiency', 'focus'],
            responses: [
                "Here are some powerful productivity strategies that actually work! 💡\n\n**🎯 The Big 3 Framework**\nEach morning, identify 3 critical tasks. Focus on completing these before anything else.\n\n**⏱️ Time Blocking**\nSchedule specific blocks for deep work, meetings, and breaks. Guard these blocks fiercely.\n\n**🍅 Pomodoro Technique**\n25 minutes of focused work → 5-minute break → Repeat. After 4 cycles, take a 15-30 minute break.\n\n**📵 Digital Detox Windows**\nSet 2-3 hour windows where you turn off notifications. Your focus will thank you.\n\n**🧠 Energy Management**\nDo your hardest work during your peak energy hours. Save routine tasks for low-energy periods.\n\n**📝 2-Minute Rule**\nIf a task takes less than 2 minutes, do it immediately. Don't add it to your list.\n\nWhich of these resonates with you? I can dive deeper into any of them!"
            ]
        },
        {
            keywords: ['story', 'creative writing', 'tell me a story', 'write a story', 'creative story'],
            responses: [
                "Here's a short story for you! 📖\n\n---\n\n**The Last Light of Andara**\n\nCaptain Elira Voss pressed her face against the observation deck glass. Before her, the dying star of Andara pulsed in hues of amber and violet — a cosmic heartbeat counting down to silence.\n\n\"Captain, we have forty-seven minutes,\" her navigator whispered.\n\nForty-seven minutes to save a civilization that had flourished for ten thousand years. The Andarians had built cities in their star's corona, a feat of engineering that made humanity's greatest achievements look like sandcastles.\n\nBut stars don't care about engineering.\n\n\"Open a channel,\" Elira said, her voice steady despite the trembling in her hands. \"Tell them we're ready.\"\n\nThe evacuation ships hummed to life — three hundred vessels forming a constellation of hope against the dying light. Each one carried a fragment of Andarian culture: their music, their art, their memories of a sun that had once burned eternal.\n\nAs the last ship cleared the corona, Andara collapsed inward, then erupted in a supernova that painted the void in impossible colors.\n\nElira watched, tears floating in zero gravity.\n\n\"They're safe, Captain,\" her navigator said.\n\n\"Their star is gone,\" she replied.\n\n\"But their story continues.\"\n\n---\n\n*Would you like me to continue this story, or create a new one in a different genre?*"
            ]
        },
        {
            keywords: ['joke', 'funny', 'make me laugh', 'humor'],
            responses: [
                "Here are some jokes for you! 😄\n\n**Why do programmers prefer dark mode?**\nBecause light attracts bugs. 🐛\n\n**What did the ocean say to the beach?**\nNothing. It just waved. 🌊\n\n**Why did the scarecrow win an award?**\nBecause he was outstanding in his field! 🌾\n\n**A SQL query walks into a bar, walks up to two tables and asks:**\n\"Can I join you?\" 🍺\n\nWant more? I've got plenty! 😊"
            ]
        },
        {
            keywords: ['weather', 'temperature', 'forecast', 'rain', 'sunny'],
            responses: [
                "I appreciate you asking about the weather! ☁️ Unfortunately, I don't have access to real-time weather data.\n\nHowever, I can suggest some great weather resources:\n• **Weather.com** — Comprehensive forecasts\n• **AccuWeather** — Minute-by-minute predictions\n• **Windy.com** — Beautiful interactive weather maps\n\nIs there anything else I can help you with? 😊"
            ]
        },
        {
            keywords: ['code', 'programming', 'javascript', 'python', 'developer', 'coding'],
            responses: [
                "Programming is a fantastic topic! 💻 I'd love to help.\n\nHere's what I can assist with:\n\n🔧 **Code explanations** — Break down complex logic\n🐛 **Debugging tips** — Help identify issues\n📐 **Architecture advice** — Design patterns & best practices\n📚 **Learning resources** — Curated paths for any language\n✍️ **Code snippets** — Quick examples and templates\n\nSome popular languages and their strengths:\n• **JavaScript** — Web development, full-stack\n• **Python** — AI/ML, data science, automation\n• **TypeScript** — Type-safe JavaScript for large projects\n• **Rust** — Performance-critical, systems programming\n• **Go** — Cloud services, microservices\n\nWhat programming topic would you like to explore?"
            ]
        },
        {
            keywords: ['music', 'song', 'album', 'artist', 'genre', 'playlist'],
            responses: [
                "Music is the universal language! 🎵\n\nI'd love to chat about music with you. Here are some topics we can explore:\n\n🎸 **Genre deep-dives** — From jazz to electronic, classical to hip-hop\n🎹 **Music theory basics** — Chords, scales, and harmony\n🎤 **Artist discussions** — Talk about your favorites\n📝 **Songwriting tips** — Structure, lyrics, and melody\n🎧 **Playlist curation** — Recommendations based on mood or activity\n\nFun fact: Music activates more areas of the brain simultaneously than any other activity! 🧠\n\nWhat aspect of music interests you?"
            ]
        },
        {
            keywords: ['health', 'exercise', 'fitness', 'workout', 'diet', 'nutrition'],
            responses: [
                "Taking care of your health is so important! 💪 Here are some evidence-based wellness tips:\n\n**🏃 Movement**\n• Aim for 150 minutes of moderate exercise per week\n• Even 10-minute walks boost mood and energy\n• Mix cardio with strength training\n\n**🥗 Nutrition**\n• Fill half your plate with vegetables\n• Stay hydrated — aim for 8 glasses of water daily\n• Eat whole foods over processed when possible\n\n**😴 Sleep**\n• Prioritize 7-9 hours of quality sleep\n• Keep a consistent sleep schedule\n• Avoid screens 1 hour before bed\n\n**🧘 Mental Health**\n• Practice mindfulness or meditation\n• Take regular breaks during work\n• Stay connected with people you care about\n\nWould you like specific advice on any of these areas?"
            ]
        },
        {
            keywords: ['book', 'reading', 'recommend', 'novel', 'literature'],
            responses: [
                "I love discussing books! 📚 Here are some all-time recommendations across genres:\n\n**🔬 Science Fiction**\n• *Dune* — Frank Herbert\n• *Neuromancer* — William Gibson\n• *The Left Hand of Darkness* — Ursula K. Le Guin\n\n**🕵️ Mystery/Thriller**\n• *Gone Girl* — Gillian Flynn\n• *The Girl with the Dragon Tattoo* — Stieg Larsson\n\n**💡 Non-Fiction**\n• *Sapiens* — Yuval Noah Harari\n• *Thinking, Fast and Slow* — Daniel Kahneman\n• *Atomic Habits* — James Clear\n\n**🎭 Literary Fiction**\n• *The Great Gatsby* — F. Scott Fitzgerald\n• *One Hundred Years of Solitude* — Gabriel García Márquez\n\nWhat genres do you enjoy? I can give you more tailored recommendations!"
            ]
        },
        {
            keywords: ['thank', 'thanks', 'appreciate', 'helpful', 'great job'],
            responses: [
                "You're very welcome! 😊 It's genuinely my pleasure to help. If you have any more questions — whether it's five minutes or five hours from now — I'll be right here!",
                "Thank *you* for the great conversation! 🌟 Don't hesitate to come back anytime. I'm always here and happy to help!",
                "Aww, that means a lot! 💜 Helping you is what I'm here for. Feel free to reach out whenever you need anything!"
            ]
        },
        {
            keywords: ['bye', 'goodbye', 'see you', 'farewell', 'later'],
            responses: [
                "Goodbye! 👋 It was wonderful chatting with you. Come back anytime — I'll be here! Have an amazing day! ✨",
                "See you later! 🌟 Thanks for the great conversation. Wishing you an awesome rest of your day!",
                "Take care! 💫 Remember, I'm always just a message away. Until next time!"
            ]
        },
        {
            keywords: ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural network'],
            responses: [
                "AI is transforming our world in incredible ways! 🤖\n\nHere's a quick overview of the AI landscape:\n\n**🧠 Types of AI:**\n• **Narrow AI** — Specialized in one task (like me! 👋)\n• **General AI** — Human-level reasoning across domains (still theoretical)\n• **Super AI** — Beyond human intelligence (way in the future)\n\n**🔥 Hot Areas in AI:**\n• **Large Language Models** — GPT, Claude, Gemini\n• **Computer Vision** — Image recognition, autonomous vehicles\n• **Generative AI** — Creating art, music, code, and text\n• **Reinforcement Learning** — Game playing, robotics\n\n**💼 Real-world Applications:**\n• Healthcare diagnostics\n• Climate modeling\n• Personalized education\n• Scientific discovery\n\nThe field is evolving at breakneck speed. What aspect of AI interests you most?"
            ]
        },
        {
            keywords: ['travel', 'vacation', 'trip', 'destination', 'explore'],
            responses: [
                "Travel is one of life's greatest pleasures! 🌍 Here are some dream destinations:\n\n**🏔️ Adventure**\n• Patagonia, Argentina — Epic hiking and glaciers\n• Iceland — Northern lights & volcanic landscapes\n• New Zealand — Adventure sports capital\n\n**🏖️ Relaxation**\n• Maldives — Crystal-clear waters & overwater villas\n• Santorini, Greece — Stunning sunsets & white-washed villages\n• Bali, Indonesia — Temples, rice terraces & beaches\n\n**🏛️ Culture**\n• Kyoto, Japan — Temples, gardens & traditions\n• Rome, Italy — 3,000 years of history\n• Marrakech, Morocco — Vibrant markets & architecture\n\n**💡 Travel tips:**\n• Book flights on Tuesdays for best deals\n• Pack a universal adapter\n• Learn 5 basic phrases in the local language\n\nWhere would you love to go? I can help plan! ✈️"
            ]
        },
        {
            keywords: ['movie', 'film', 'cinema', 'watch', 'series', 'show', 'netflix'],
            responses: [
                "Great topic — let's talk movies and shows! 🎬\n\n**🏆 Must-Watch Films:**\n• *Inception* — Mind-bending sci-fi thriller\n• *Parasite* — Brilliant social commentary\n• *Interstellar* — Emotional space epic\n• *The Shawshank Redemption* — Timeless classic\n• *Everything Everywhere All at Once* — Creative masterpiece\n\n**📺 Binge-Worthy Series:**\n• *Breaking Bad* — The gold standard of TV\n• *Severance* — Sci-fi workplace thriller\n• *Shogun* — Historical epic\n• *The Bear* — Intense kitchen drama\n• *Dark* — Mind-bending time travel\n\nWhat genres do you enjoy? I can give more specific recommendations! 🍿"
            ]
        },
        {
            keywords: ['math', 'mathematics', 'calculate', 'equation', 'algebra', 'geometry'],
            responses: [
                "Mathematics is the language of the universe! 🔢\n\nI can help with various math topics:\n\n**📐 Core Areas:**\n• **Algebra** — Equations, functions, polynomials\n• **Geometry** — Shapes, angles, proofs\n• **Calculus** — Derivatives, integrals, limits\n• **Statistics** — Probability, distributions, analysis\n\n**🌟 Beautiful Math Facts:**\n• **Euler's Identity:** e^(iπ) + 1 = 0 — connects 5 fundamental constants\n• **Fibonacci Sequence** appears everywhere in nature — sunflowers, shells, galaxies\n• **Pi (π)** has been calculated to over 100 trillion digits\n\nWhat math topic would you like help with? I'm ready to break it down! 📊"
            ]
        },
        {
            keywords: ['love', 'relationship', 'dating', 'romance'],
            responses: [
                "Relationships are such an important part of life! 💕\n\nHere are some timeless relationship insights:\n\n**🗝️ Key Principles:**\n• **Communication** is everything — express your feelings openly\n• **Active listening** — truly hear what your partner says\n• **Quality time** — be present, not just physically there\n• **Respect** — for boundaries, opinions, and individuality\n\n**💡 Healthy Habits:**\n• Express gratitude daily — even for small things\n• Maintain your own identity and friendships\n• Address conflicts early, before they grow\n• Celebrate each other's wins\n\n**📚 Great reads on relationships:**\n• *The 5 Love Languages* — Gary Chapman\n• *Attached* — Amir Levine & Rachel Heller\n\nIs there something specific about relationships you'd like to discuss? 😊"
            ]
        },
        {
            keywords: ['food', 'recipe', 'cook', 'cooking', 'meal', 'dinner', 'lunch', 'breakfast'],
            responses: [
                "Let's talk food! 🍳 Cooking is both an art and a science.\n\n**🔥 Quick & Delicious Meal Ideas:**\n\n**Breakfast (10 min)**\n• Avocado toast with poached eggs & chili flakes\n• Greek yogurt bowl with granola, berries & honey\n\n**Lunch (15 min)**\n• Mediterranean wrap with hummus, feta & veggies\n• Asian-style noodle bowl with soy-ginger dressing\n\n**Dinner (30 min)**\n• One-pan lemon herb chicken with roasted veggies\n• Creamy garlic pasta with spinach & sun-dried tomatoes\n\n**💡 Pro Kitchen Tips:**\n• Salt your pasta water generously — it should taste like the sea\n• Let meat rest after cooking for juicier results\n• Fresh herbs go in at the end, dried herbs at the beginning\n\nWant me to share a detailed recipe for any of these? 🍽️"
            ]
        }
    ];

    // ===== Fallback Responses =====
    const fallbackResponses = [
        "That's a really interesting topic! 🤔 While I don't have deep expertise in that specific area, I'd love to explore it with you. Could you share a bit more about what you'd like to know?",
        "Great question! 💫 I want to give you the best response possible. Could you tell me more about what specific aspect you're interested in? That way I can tailor my answer.",
        "I appreciate you bringing that up! 🌟 I'd love to help you explore this further. What angle are you most curious about?",
        "That's a thoughtful question! ✨ To give you the best response, could you share what prompted your curiosity? It'll help me provide more relevant insights.",
        "Interesting! 🧠 I always enjoy diving into new topics. I can help you brainstorm, organize your thoughts, or explore different angles. What would be most useful?",
        "I love the curiosity! 🚀 Let me share what I can — I can offer general insights, help you think through the problem, or suggest resources. What works best for you?"
    ];

    // ===== Utility Functions =====
    function generateId() {
        return 'conv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    }

    function getTimestamp() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function formatMessage(text) {
        // Code blocks
        text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
        // Bold
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Italic
        text = text.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
        // Inline code
        text = text.replace(/`(.+?)`/g, '<code>$1</code>');
        // Horizontal rule
        text = text.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--border-subtle);margin:12px 0;">');
        // Line breaks & paragraphs
        text = text.replace(/\n\n/g, '</p><p>');
        text = text.replace(/\n/g, '<br>');
        // Bullet points
        text = text.replace(/• /g, '&bull; ');

        return `<p>${text}</p>`;
    }

    function randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // ===== Bot Response Logic =====
    function generateBotResponse(userMessage) {
        const lower = userMessage.toLowerCase().trim();

        let bestMatch = null;
        let bestScore = 0;

        for (const entry of knowledgeBase) {
            let score = 0;
            for (const keyword of entry.keywords) {
                if (lower.includes(keyword)) {
                    score += keyword.length;
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        if (bestMatch && bestScore > 0) {
            return randomChoice(bestMatch.responses);
        }

        return randomChoice(fallbackResponses);
    }

    // ===== Conversation Management =====
    function createConversation() {
        const id = generateId();
        const conv = {
            id: id,
            title: 'New Chat',
            messages: [],
            createdAt: Date.now()
        };
        conversations.unshift(conv);
        currentConversationId = id;
        renderChatHistory();
        clearMessages();
        welcomeScreen.classList.remove('hidden');
        messageInput.focus();
        return conv;
    }

    function getCurrentConversation() {
        return conversations.find(c => c.id === currentConversationId);
    }

    function clearMessages() {
        messagesList.innerHTML = '';
    }

    // ===== Render Functions =====
    function renderChatHistory() {
        const items = chatHistory.querySelectorAll('.history-item');
        items.forEach(item => item.remove());

        conversations.forEach(conv => {
            const item = document.createElement('div');
            item.className = `history-item ${conv.id === currentConversationId ? 'active' : ''}`;
            item.innerHTML = `
                <svg class="history-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>${escapeHTML(conv.title)}</span>
            `;
            item.addEventListener('click', () => switchConversation(conv.id));
            chatHistory.appendChild(item);
        });
    }

    function switchConversation(id) {
        currentConversationId = id;
        const conv = getCurrentConversation();
        clearMessages();
        renderChatHistory();

        if (conv.messages.length === 0) {
            welcomeScreen.classList.remove('hidden');
        } else {
            welcomeScreen.classList.add('hidden');
            conv.messages.forEach(msg => appendMessage(msg.role, msg.text, msg.time, false));
        }

        closeSidebarMobile();
    }

    function appendMessage(role, text, time, animate = true) {
        const row = document.createElement('div');
        row.className = 'message-row';
        if (!animate) {
            row.style.animation = 'none';
        }

        const isBot = role === 'bot';
        const avatarClass = isBot ? 'bot' : 'user';
        const avatarContent = isBot ?
            `<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>` : 'U';
        const senderName = isBot ? 'Nova' : 'You';

        row.innerHTML = `
            <div class="message-avatar ${avatarClass}">${avatarContent}</div>
            <div class="message-content">
                <div class="message-sender">
                    ${senderName}
                    <span class="timestamp">${time}</span>
                </div>
                <div class="message-text">${formatMessage(text)}</div>
            </div>
        `;

        messagesList.appendChild(row);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const row = document.createElement('div');
        row.className = 'message-row';
        row.id = 'typingRow';
        row.innerHTML = `
            <div class="message-avatar bot">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="message-sender">Nova</div>
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        messagesList.appendChild(row);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const el = document.getElementById('typingRow');
        if (el) el.remove();
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            messagesContainer.scrollTo({
                top: messagesContainer.scrollHeight,
                behavior: 'smooth'
            });
        });
    }

    // ===== Send Message =====
    function sendMessage(text) {
        text = text.trim();
        if (!text) return;

        // Hide welcome screen
        welcomeScreen.classList.add('hidden');

        // Get or create conversation
        let conv = getCurrentConversation();
        if (!conv) {
            conv = createConversation();
            welcomeScreen.classList.add('hidden');
        }

        const time = getTimestamp();

        // Update title if first message
        if (conv.messages.length === 0) {
            conv.title = text.length > 32 ? text.substring(0, 32) + '...' : text;
            renderChatHistory();
        }

        // Add user message
        conv.messages.push({ role: 'user', text, time });
        appendMessage('user', text, time);

        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        updateSendButton();

        // Bot response with typing delay
        showTypingIndicator();
        const delay = 700 + Math.random() * 1000;

        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = generateBotResponse(text);
            const botTime = getTimestamp();
            conv.messages.push({ role: 'bot', text: botResponse, time: botTime });
            appendMessage('bot', botResponse, botTime);
        }, delay);
    }

    // ===== Input Handling =====
    function updateSendButton() {
        const hasText = messageInput.value.trim().length > 0;
        sendBtn.classList.toggle('active', hasText);
        sendBtn.disabled = !hasText;
    }

    function autoResizeInput() {
        messageInput.style.height = 'auto';
        messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
    }

    // ===== Sidebar Mobile =====
    function openSidebarMobile() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
    }

    function closeSidebarMobile() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }

    // ===== Event Listeners =====

    // Send message
    sendBtn.addEventListener('click', () => sendMessage(messageInput.value));

    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(messageInput.value);
        }
    });

    messageInput.addEventListener('input', () => {
        updateSendButton();
        autoResizeInput();
    });

    // Suggestion cards
    suggestionCards.forEach(card => {
        card.addEventListener('click', () => {
            const prompt = card.dataset.prompt;
            if (prompt) {
                messageInput.value = prompt;
                sendMessage(prompt);
            }
        });
    });

    // New chat
    newChatBtn.addEventListener('click', () => {
        createConversation();
        closeSidebarMobile();
    });

    // Clear chat
    clearChatBtn.addEventListener('click', () => {
        const conv = getCurrentConversation();
        if (conv) {
            conv.messages = [];
            conv.title = 'New Chat';
            clearMessages();
            welcomeScreen.classList.remove('hidden');
            renderChatHistory();
        }
    });

    // Sidebar toggle (desktop)
    sidebarToggle.addEventListener('click', () => {
        sidebar.style.display = sidebar.style.display === 'none' ? '' : 'none';
    });

    // Mobile sidebar
    mobileMenuBtn.addEventListener('click', openSidebarMobile);
    sidebarOverlay.addEventListener('click', closeSidebarMobile);

    // ===== Initialize =====
    createConversation();
    messageInput.focus();

})();
