import { fallbackIntent } from "./fallbackIntent.js";
import ai from "../config/gemini.js";
import SYSTEM_PROMPT from "./prompt.js";

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

const manufacturerAliases = {
    "Honeywell": "Honeywell Aerospace",
    "GE": "GE Aerospace",
    "GE Aviation": "GE Aerospace",
    "Collins": "Collins Aerospace",
    "Pratt": "Pratt & Whitney",
    "Safran": "Safran Aircraft Engines"
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
    // Airbus
    "A320": "Airbus A320-200",
    "a320": "Airbus A320-200",
    "Airbus A320": "Airbus A320-200",
    "Airbus A320-200": "Airbus A320-200",

    // Boeing 737
    "737": "Boeing 737-800",
    "737-800": "Boeing 737-800",
    "B737": "Boeing 737-800",
    "b737": "Boeing 737-800",
    "B737-800": "Boeing 737-800",
    "b737-800": "Boeing 737-800",
    "Boeing 737": "Boeing 737-800",
    "Boeing 737-800": "Boeing 737-800"
};

export async function extractIntent(message) {

    const prompt = `
${SYSTEM_PROMPT}

User Query:

${message}
`;

    let lastError;

    for (let attempt = 1; attempt <= 3; attempt++) {

        try {

            const response =
                await ai.models.generateContent({

                    model: "gemini-2.5-flash",

                    contents: prompt

                });

            let text = response.text.trim();

text = text.replace(/```json/g, "");
text = text.replace(/```/g, "");

const intent = JSON.parse(text);

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

    const aircraft = intent.aircraft.trim();

    intent.aircraft =
        aircraftAliases[aircraft] ??
        aircraftAliases[aircraft.toLowerCase()] ??
        aircraft;

}

return intent;
        }

        catch (err) {

            lastError = err;

            console.log(
                `Gemini Retry ${attempt}/3`
            );

            await sleep(1500);

        }

    }

    console.log(
    "Gemini unavailable. Using fallback parser."
);

return fallbackIntent(message);

}