import { extractIntent } from "../ai/intentExtractor.js";
import { formatResponse } from "../ai/responseFormatter.js";

import * as inventory from "./inventory.service.js";

export async function processQuery(message) {

    const intent = await extractIntent(message);

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

    result = await inventory.getPartsByManufacturer(

        intent.manufacturer

    );

    break;

        case "COUNT_PARTS":

            result = {

                totalParts: await inventory.countParts()

            };

            break;

        case "WAREHOUSE_LOOKUP":

            result = await inventory.getWarehouseInventory(

                intent.warehouse

            );

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

    result = await inventory.getCertifiedParts(

        intent.certificationStatus

    );

    break;

        default:

            result = {

                message: "Sorry, I don't understand that request yet."

            };

    }

    return formatResponse(intent, result);

}
