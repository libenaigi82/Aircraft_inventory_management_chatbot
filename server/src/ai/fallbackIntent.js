export function fallbackIntent(message) {

    const text = message.toLowerCase();

    // --------------------
    // LOW STOCK
    // --------------------

    if (text.includes("low stock")) {

        return {
            intent: "LOW_STOCK"
        };

    }

    // --------------------
    // COUNT
    // --------------------

    if (
        text.includes("how many") &&
        text.includes("part")
    ) {

        return {
            intent: "COUNT_PARTS"
        };

    }

    // --------------------
    // ATA
    // --------------------

    const ata = text.match(/ata\s*(chapter\s*)?(\d+)/i);

    if (ata) {

        return {
            intent: "ATA_SEARCH",
            ataChapter: ata[2]
        };

    }

    // --------------------
    // Warehouse
    // --------------------

    // Warehouse lookup

if (
    text.includes("bengaluru") ||
    text.includes("bangalore")
) {

    return {
        intent: "WAREHOUSE_LOOKUP",
        warehouse: "Bengaluru MRO Hub"
    };

}

if (
    text.includes("delhi")
) {

    return {
        intent: "WAREHOUSE_LOOKUP",
        warehouse: "Delhi MRO Hub"
    };

}

// Manufacturer search

if (text.includes("honeywell")) {

    return {
        intent: "MANUFACTURER_SEARCH",
        manufacturer: "Honeywell Aerospace"
    };

}

if (
    text.includes("ge aerospace") ||
    text.includes("ge aviation") ||
    text.includes("ge")
) {

    return {
        intent: "MANUFACTURER_SEARCH",
        manufacturer: "GE Aerospace"
    };

}

if (text.includes("collins")) {

    return {
        intent: "MANUFACTURER_SEARCH",
        manufacturer: "Collins Aerospace"
    };

}

if (text.includes("safran")) {

    return {
        intent: "MANUFACTURER_SEARCH",
        manufacturer: "Safran"
    };

}

    // --------------------
    // Manufacturer
    // --------------------

    const manufacturers = [

        "Honeywell",
        "Honeywell Aerospace",
        "GE",
        "GE Aviation",
        "GE Aerospace",
        "Collins",
        "Collins Aerospace",
        "Pratt",
        "Pratt & Whitney",
        "Safran"

    ];

    for (const m of manufacturers) {

        if (text.includes(m.toLowerCase())) {

            return {

                intent: "MANUFACTURER_SEARCH",

                manufacturer: m

            };

        }

    }
// Certification search

if (
    text.includes("active") ||
    text.includes("faa")
) {

    return {
        intent: "CERTIFICATION_SEARCH",
        certificationStatus: "ACTIVE"
    };

}

if (text.includes("pending")) {

    return {
        intent: "CERTIFICATION_SEARCH",
        certificationStatus: "PENDING"
    };

}

if (text.includes("expired")) {

    return {
        intent: "CERTIFICATION_SEARCH",
        certificationStatus: "EXPIRED"
    };

}
    // --------------------
    // Certification
    // --------------------

    if (
        text.includes("active") ||
        text.includes("faa")
    ) {

        return {

            intent: "CERTIFICATION_SEARCH",

            certificationStatus: "ACTIVE"

        };

    }

    if (text.includes("pending")) {

        return {

            intent: "CERTIFICATION_SEARCH",

            certificationStatus: "PENDING"

        };

    }

    if (text.includes("expired")) {

        return {

            intent: "CERTIFICATION_SEARCH",

            certificationStatus: "EXPIRED"

        };

    }

    // Aircraft compatibility

if (
    text.includes("a320")
) {

    return {
        intent: "AIRCRAFT_COMPATIBILITY",
        aircraft: "Airbus A320-200"
    };

}

if (
    text.includes("737")
) {

    return {
        intent: "AIRCRAFT_COMPATIBILITY",
        aircraft: "Boeing 737-800"
    };

}

    // --------------------
    // Aircraft
    // --------------------

    const aircraft = [

        "A320",
        "A350",
        "B737",
        "B777",
        "B787"

    ];

    for (const a of aircraft) {

        if (text.includes(a.toLowerCase())) {

            return {

                intent: "AIRCRAFT_COMPATIBILITY",

                aircraft: a

            };

        }

    }

    // --------------------
    // Generic Part Search
    // --------------------

    const keywords = [

        "pump",
        "pumps",
        "hydraulic",
        "filter",
        "valve",
        "sensor",
        "actuator"

    ];

    for (const k of keywords) {

        if (text.includes(k)) {

            return {

                intent: "PART_SEARCH",

                keyword: k

            };

        }

    }

    return {

        intent: "UNKNOWN"

    };

}