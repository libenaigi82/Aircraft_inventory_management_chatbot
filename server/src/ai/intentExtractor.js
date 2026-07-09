import { fallbackIntent } from "./fallbackIntent.js";
import groq from "../config/groq.js";
import SYSTEM_PROMPT from "./prompt.js";

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

const manufacturerAliases = {

    "Honeywell": "Honeywell Aerospace",
    "GE": "GE Aerospace",
    "GE Aviation": "GE Aerospace",
    "Collins": "Collins Aerospace",
    "Pratt": "Pratt & Whitney",
    "Safran": "Safran"

};

const certificationAliases = {

    "FAA": "ACTIVE",
    "FAA Certified": "ACTIVE",
    "Certified": "ACTIVE",
    "Active": "ACTIVE",
    "active": "ACTIVE",

    "Pending": "PENDING",
    "pending": "PENDING",

    "Expired": "EXPIRED",
    "expired": "EXPIRED"

};

const aircraftAliases = {

    "Airbus A320": "Airbus A320-200",
    "A320": "Airbus A320-200",

    "Boeing 737": "Boeing 737-800",
    "737": "Boeing 737-800"

};

export async function extractIntent(
    message,
    options = {}
) {

    const prompt = `
${SYSTEM_PROMPT}

User Query:

${message}
`;

    let lastError;

    for (let attempt = 1; attempt <= 3; attempt++) {

        try {

            const response = await groq.chat.completions.create({

    model: "llama-3.3-70b-versatile",

    temperature: options.temperature ?? 0,

    top_p: options.top_p ?? 1,

    response_format: {

        type: "json_object"

    },

    messages: [

        {
            role: "system",
            content: SYSTEM_PROMPT
        },

        {
            role: "user",
            content: message
        }

    ]

});
            const intent = JSON.parse(

                response.choices[0].message.content

            );

            if (intent.manufacturer) {

                intent.manufacturer =
                    manufacturerAliases[intent.manufacturer] ??
                    intent.manufacturer;

            }

            if (intent.certificationStatus) {

                intent.certificationStatus =
                    certificationAliases[intent.certificationStatus] ??
                    intent.certificationStatus;

            }

            if (intent.aircraft) {

                intent.aircraft =
                    aircraftAliases[intent.aircraft] ??
                    intent.aircraft;

            }

            return intent;

        }

        catch (err) {

            lastError = err;

            console.log(`Groq Retry ${attempt}/3`);

            await sleep(1000);

        }

    }

    console.log(

        "Groq unavailable. Using fallback parser."

    );

    return fallbackIntent(message);

}