import groq from "../config/groq.js";
import { extractIntent } from "../ai/intentExtractor.js";
import { formatResponse } from "../ai/responseFormatter.js";


import * as inventory from "./inventory.service.js";

export async function processQuery(
    message,
    options={}
){

    const intent =
    await extractIntent(
        message,
        options
    );

    let result = null;

    switch (intent.intent) {

        case "PART_SEARCH":

            result = await inventory.getAllParts({

                manufacturer: intent.manufacturer,

                ataChapter: intent.ataChapter,

                certificationStatus: intent.certificationStatus,

                keyword: intent.keyword

            });

            break;

        case "LOW_STOCK":

            result = await inventory.getLowStock();

            break;

        case "MANUFACTURER_SEARCH":

    result = await inventory.getPartsAdvanced({

        manufacturer: intent.manufacturer,
        inStock: intent.inStock

    });

    break;

        case "COUNT_PARTS":

            result = {

                totalParts: await inventory.countParts()

            };

            break;

        case "WAREHOUSE_LOOKUP":

    if(intent.keyword){

        result = await inventory.findPartWarehouse(

            intent.keyword

        );

    }else{

        result = await inventory.getWarehouseInventory(

            intent.warehouse

        );

    }

    break;

        case "AIRCRAFT_COMPATIBILITY":

    result = await inventory.getAircraftCompatibility(

        intent.aircraft

    );

    break;

    case "ATA_SEARCH":

    result = await inventory.getPartsByATA(

        intent.ataChapter

    );

    break;

    case "CERTIFICATION_SEARCH":

    result = await inventory.getCertifiedParts({

        certificationStatus: intent.certificationStatus,

        manufacturer: intent.manufacturer

    });

    break;

        default:

            result = {

                message: "Sorry, I don't understand that request yet."

            };

    }

    return formatResponse(intent, result);

}
export async function generalChat(
    message,
    options = {}
) {

    const completion = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        temperature: options.temperature ?? 0.7,

        top_p: options.top_p ?? 1,

        messages: [

            {
                role: "system",
                content:
`You are AeroMRO AI.

You are friendly, professional and conversational.

You can answer general questions naturally.

Whenever the question is related to aircraft inventory,
manufacturers,
warehouses,
ATA chapters,
certifications,
or aircraft compatibility,
encourage the user to ask specific inventory questions.

Keep answers concise.`
            },

            {
                role: "user",
                content: message
            }

        ]

    });

    return {

        success: true,

        timestamp: new Date().toISOString(),

        reply: completion.choices[0].message.content

    };

}
