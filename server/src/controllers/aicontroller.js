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

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

}