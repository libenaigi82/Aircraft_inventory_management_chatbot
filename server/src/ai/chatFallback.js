// src/ai/chatFallback.js

export function chatFallback(message) {

    const msg = message.trim().toLowerCase();

    // ---------------------------------
    // Greetings
    // ---------------------------------

    if (/^(hi|hello|hey|hii|yo|hola)$/.test(msg)) {
        return {
            success: true,
            reply: "Hey! 👋 Welcome to AeroMRO. How can I help you today?"
        };
    }

    if (
        msg === "good morning" ||
        msg === "good afternoon" ||
        msg === "good evening"
    ) {
        return {
            success: true,
            reply: "Hello! 😊 Hope you're having a great day. What can I do for you today?"
        };
    }

    // ---------------------------------
    // Small Talk
    // ---------------------------------

    if (
        msg.includes("how are you") ||
        msg.includes("how's it going") ||
        msg.includes("how do you do")
    ) {
        return {
            success: true,
            reply: "I'm doing great, thanks for asking! 😊 What can I help you find today?"
        };
    }

    if (
        msg.includes("who are you")
    ) {
        return {
            success: true,
            reply: "I'm AeroMRO AI, your aircraft inventory assistant. I help engineers and operators search aircraft inventory, manufacturers, warehouses, certifications and aircraft compatibility."
        };
    }

    if (
        msg.includes("what are you") ||
        msg.includes("what do you do") ||
        msg.includes("what can you do")
    ) {
        return {
            success: true,
            reply:
`I can help you with things like:

• Search aircraft parts
• Check inventory availability
• Find manufacturers
• Search ATA chapters
• Locate warehouses
• Find certified parts
• Check aircraft compatibility

Just ask naturally and I'll do my best to help.`
        };
    }

    // ---------------------------------
    // Help
    // ---------------------------------

    if (msg === "help") {
        return {
            success: true,
            reply:
`Here are a few things you can ask me:

• Show Honeywell parts
• Find Airbus A320 compatible parts
• Show low stock items
• Find FAA certified parts
• Show ATA 24 parts
• Which warehouse has Cabin Pressure Controller?
• Find GE Aerospace components`
        };
    }

    // ---------------------------------
    // Thanks
    // ---------------------------------

    if (
        msg === "thanks" ||
        msg === "thank you" ||
        msg.includes("thanks") ||
        msg.includes("thank you")
    ) {
        return {
            success: true,
            reply: "You're welcome! Happy to help. 😊"
        };
    }

    // ---------------------------------
    // Goodbye
    // ---------------------------------

    if (
        msg === "bye" ||
        msg === "goodbye" ||
        msg === "see you" ||
        msg === "see ya"
    ) {
        return {
            success: true,
            reply: "Goodbye! ✈️ Have a great day, and feel free to come back anytime."
        };
    }

    // ---------------------------------
    // Generic vague requests
    // ---------------------------------

    if (
        msg === "everything" ||
        msg === "give me everything" ||
        msg === "show everything"
    ) {
        return {
            success: true,
            reply: "I'd be happy to help. Could you narrow it down a little? For example, manufacturer, aircraft model, ATA chapter, warehouse or certification."
        };
    }

    if (
        msg === "find airplane parts" ||
        msg === "find aircraft parts" ||
        msg === "aircraft parts"
    ) {
        return {
            success: true,
            reply: "Sure! Which aircraft, manufacturer or part are you interested in?"
        };
    }

    if (
        msg.includes("something")
    ) {
        return {
            success: true,
            reply: "Could you tell me a little more about what you're looking for? Even a manufacturer, aircraft model or part name will help."
        };
    }

    if (
        msg.includes("don't know") ||
        msg.includes("dont know")
    ) {
        return {
            success: true,
            reply: "No worries! Tell me anything you remember—like the manufacturer, aircraft model, ATA chapter or part name—and I'll help you find it."
        };
    }

    // ---------------------------------
    // Casual conversation
    // ---------------------------------

    if (
        msg.includes("nice") ||
        msg.includes("great job")
    ) {
        return {
            success: true,
            reply: "Thank you! 😊 I'm glad I could help."
        };
    }

    if (
        msg.includes("awesome") ||
        msg.includes("cool")
    ) {
        return {
            success: true,
            reply: "Glad you think so! 😄"
        };
    }

    if (
        msg.includes("good job")
    ) {
        return {
            success: true,
            reply: "Thanks! I'm always here if you need help with aircraft inventory."
        };
    }

    if (
        msg.includes("ok") ||
        msg === "okay" ||
        msg === "alright"
    ) {
        return {
            success: true,
            reply: "Great! Let me know what you'd like to search next."
        };
    }

    // ---------------------------------
    // No fallback matched
    // ---------------------------------

    return null;

}