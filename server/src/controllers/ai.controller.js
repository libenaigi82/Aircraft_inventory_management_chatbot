import { processQuery } from "../services/ai.service.js";
import { chatFallback } from "../ai/chatFallback.js";
import * as aiService from "../services/ai.service.js"; 


export async function chat(req, res) {

    try {

        const {

            message,
            temperature = 0,
            top_p = 1

        } = req.body;

        if (!message) {

            return res.status(400).json({

                success: false,
                message: "Message is required."

            });

        }

        const fallback = chatFallback(message);

if (fallback) {

    return res.json({
        ...fallback,
        timestamp: new Date().toISOString()
    });

}

const response = await processQuery(
    message,
    {
        temperature,
        top_p
    }
);

// Inventory intent found
if (response.intent.intent !== "UNKNOWN") {

    return res.json(response);

}

// Otherwise answer normally using Groq

const chatResponse = await aiService.generalChat(
    message,
    {
        temperature,
        top_p
    }
);

return res.json(chatResponse);
    }

    catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,
            message: err.message || "Internal server error."

        });

    }

}