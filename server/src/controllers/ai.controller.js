import { extractIntent } from "../ai/intentExtractor.js";

export async function chat(req, res) {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required."
            });
        }

        const intent = await extractIntent(message);

        res.json(intent);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

}