import prisma from "../config/prisma.js";

export async function getAllParts(filters = {}) {

    const where = {};

    if (filters.manufacturer) {

        where.manufacturer = {

            name: {

                contains: filters.manufacturer,

                mode: "insensitive"

            }

        };

    }

    if (filters.ataChapter) {

        where.ataChapter = {

            chapter: Number(filters.ataChapter)

        };

    }

    if (filters.certificationStatus) {

        where.certificationStatus = filters.certificationStatus;

    }

    if (filters.keyword) {

        where.OR = [

    {
        partName: {
            contains: filters.keyword,
            mode: "insensitive"
        }
    },

    {
        description: {
            contains: filters.keyword,
            mode: "insensitive"
        }
    },

    {
        partNumber: {
            contains: filters.keyword,
            mode: "insensitive"
        }
    },

    {
        manufacturer: {
            name: {
                contains: filters.keyword,
                mode: "insensitive"
            }
        }
    },

    {
        ataChapter: {
            title: {
                contains: filters.keyword,
                mode: "insensitive"
            }
        }
    }

];

    }

    return prisma.partMaster.findMany({

        where,

        include: {

            manufacturer: true,

            supplier: true,

            ataChapter: true,

            stocks: {

                include: {

                    warehouse: true

                }

            }

        },

        orderBy: {

            partNumber: "asc"

        }

    });

}

export async function getAllAircraft() {

    return prisma.aircraft.findMany({

        orderBy: {

            model: "asc"

        }

    });

}

export async function getManufacturers() {

    return prisma.manufacturer.findMany({

        orderBy: {

            name: "asc"

        }

    });

}

export async function getCurrentStock() {

    return prisma.stock.findMany({

        include: {

            warehouse: true,

            part: {

                include: {

                    manufacturer: true,

                    ataChapter: true

                }

            }

        }

    });

}

export async function getLowStock() {

    return prisma.stock.findMany({

        where: {

            currentStock: {

                lte: 10

            }

        },

        include: {

            warehouse: true,

            part: {

                include: {

                    manufacturer: true,

                    ataChapter: true

                }

            }

        }

    });

}

export async function getWarehouseInventory(name) {

    return prisma.stock.findMany({

        where: {

            warehouse: {

                name: {

                    contains: name,

                    mode: "insensitive"

                }

            }

        },

        include: {

            warehouse: true,

            part: {

                include: {

                    manufacturer: true,

                    ataChapter: true

                }

            }

        }

    });

}

export async function countParts() {

    return prisma.partMaster.count();

}

export async function getPartsByATA(ataChapter) {

    return prisma.partMaster.findMany({

        where: {

            ataChapter: {

                chapter: Number(ataChapter)

            }

        },

        include: {

            manufacturer: true,

            supplier: true,

            ataChapter: true,

            stocks: {

                include: {

                    warehouse: true

                }

            }

        }

    });

}

export async function getPartsByManufacturer(name) {

    return prisma.partMaster.findMany({

        where: {

            manufacturer: {

                name: {

                    contains: name,

                    mode: "insensitive"

                }

            }

        },

        include: {

            manufacturer: true,

            supplier: true,

            ataChapter: true,

            stocks: {

                include: {

                    warehouse: true

                }

            }

        }

    });

}

export async function getAircraftCompatibility(model) {

    if (!model) return [];

    const searchTerms = [
        model,
        model.replace(/-/g, " "),
        model.replace(/\s+/g, " "),
        model.replace("B737", "Boeing 737"),
        model.replace("737", "Boeing 737"),
        model.replace("A320", "Airbus A320")
    ];

    return prisma.aircraftCompatibility.findMany({

        where: {

            OR: searchTerms.map(term => ({

                aircraft: {

                    model: {

                        contains: term,

                        mode: "insensitive"

                    }

                }

            }))

        },

        include: {

            aircraft: true,

            part: {

                include: {

                    manufacturer: true,

                    ataChapter: true

                }

            }

        }

    });

}


export async function getCertifiedParts(status) {

    return prisma.partMaster.findMany({

        where: {

            certificationStatus: status

        },

        include: {

            manufacturer: true,

            ataChapter: true,

            supplier: true

        }

    });

}