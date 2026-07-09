import ai from "../config/gemini.js";
import SYSTEM_PROMPT from "./prompt.js";

export async function extractIntent(message) {

    const prompt = `
${SYSTEM_PROMPT}

User Query:

${message}
`;

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt

    });

    let text = response.text.trim();

    text = text.replace(/```json/g, "");

    text = text.replace(/```/g, "");

    return JSON.parse(text);

}