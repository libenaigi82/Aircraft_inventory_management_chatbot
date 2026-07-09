import { extractIntent } from "../ai/intentExtractor.js";
import * as inventoryService from "./inventory.service.js";
import { formatResponse } from "../ai/responseFormatter.js";

export async function processQuery(message) {

    const intent = await extractIntent(message);

    let data = [];

    switch (intent.intent) {

        case "PART_SEARCH":

            data = await inventoryService.getAllParts({

                manufacturer: intent.manufacturer || undefined,

                ataChapter: intent.ataChapter || undefined

            });

            if (intent.keyword) {

                data = data.filter(part =>

                    part.partName
                        .toLowerCase()
                        .includes(intent.keyword.toLowerCase())

                );

            }

            break;

        case "LOW_STOCK":

            data = await inventoryService.getLowStock();

            break;

        case "MANUFACTURER_SEARCH":

            data = await inventoryService.getManufacturers();

            break;

        case "COUNT_PARTS":

            data = await inventoryService.getAllParts();

            data = {

                totalParts: data.length

            };

            break;

        case "ATA_SEARCH":

            data = await inventoryService.getAllParts({

                ataChapter: intent.ataChapter

            });

            break;

        default:

            data = {

                message: "Intent not supported yet."

            };

    }

    return formatResponse(intent, data);

}