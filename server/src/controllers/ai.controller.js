import * as aiService from "../services/ai.service.js";

export async function chat(req, res) {

    try {

        const { message } = req.body;

        if (!message) {

            return res.status(400).json({
                success: false,
                message: "Message is required."
            });

        }

        const response = await aiService.processQuery(message);

        res.json(response);

    }

    catch (err) {

        console.error(err);

        const error = err.message || "";

        if (
            error.includes("RESOURCE_EXHAUSTED") ||
            error.includes("quota")
        ) {

            return res.status(503).json({

                success: false,

                message:
                    "Daily AI quota exceeded. Please try again later."

            });

        }

        if (
            error.includes("UNAVAILABLE") ||
            error.includes("high demand")
        ) {

            return res.status(503).json({

                success: false,

                message:
                    "Gemini AI is temporarily unavailable. Please retry."

            });

        }

        if (
            error.includes("API_KEY_INVALID")
        ) {

            return res.status(500).json({

                success: false,

                message:
                    "Invalid Gemini API Key."

            });

        }

        res.status(500).json({

            success: false,

            message: "Internal server error."

        });

    }

}