export function formatResponse(intent, result) {

    let reply = "";

    switch (intent.intent) {

        case "COUNT_PARTS":

            reply = `There are ${result.totalParts} parts available in the inventory.`;

            break;

        case "LOW_STOCK":

            if (!result.length) {

                reply = "Great news! There are currently no low-stock items.";

            }

            else {

                reply = `I found ${result.length} low-stock item(s).`;

            }

            break;

        case "PART_SEARCH":

            if (!result.length) {

                reply = "No matching parts were found.";

            }

            else {

                reply = `I found ${result.length} matching part(s).`;

            }

            break;

        case "ATA_SEARCH":

            if (!result.length) {

                reply = `No parts were found under ATA Chapter ${intent.ataChapter}.`;

            }

            else {

                reply = `I found ${result.length} part(s) under ATA Chapter ${intent.ataChapter}.`;

            }

            break;

        case "MANUFACTURER_SEARCH":

            if (!result.length) {

                reply = `No parts were found for ${intent.manufacturer}.`;

            }

            else {

                reply = `I found ${result.length} part(s) manufactured by ${intent.manufacturer}.`;

            }

            break;

        case "WAREHOUSE_LOOKUP":

            if (!result.length) {

                reply = `No inventory was found in ${intent.warehouse}.`;

            }

            else {

                reply = `I found ${result.length} stock record(s) in ${intent.warehouse}.`;

            }

            break;

        case "AIRCRAFT_COMPATIBILITY":

            if (!result.length) {

                reply = `No compatible parts were found for ${intent.aircraft}.`;

            }

            else {

                reply = `I found ${result.length} compatible part(s) for ${intent.aircraft}.`;

            }

            break;

        case "CERTIFICATION_SEARCH":

            if (!result.length) {

                reply = `No ${intent.certificationStatus} certified parts were found.`;

            }

            else {

                reply = `I found ${result.length} ${intent.certificationStatus} certified part(s).`;

            }

            break;

        default:

            reply = "I couldn't understand your request.";

    }

    return {

        success: true,

        timestamp: new Date().toISOString(),

        reply,

        intent,

        count: Array.isArray(result)
    ? result.length
    : (result.totalParts ?? undefined),

        data: result,
count: Array.isArray(result)
    ? result.length
    : result.totalParts ?? undefined
    };

}