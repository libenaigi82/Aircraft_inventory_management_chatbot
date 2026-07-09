import prisma from "../config/prisma.js";

export async function getAllParts(filters = {}) {

    const where = {};

    if (filters.manufacturer) {

        where.manufacturer = {

            name: filters.manufacturer

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

    return prisma.partMaster.findMany({

        where,

        include: {

            manufacturer: true,

            supplier: true,

            ataChapter: true

        },

        orderBy: {

            partNumber: "asc"

        }

    });

}

export async function getPartByNumber(partNumber) {

    return prisma.partMaster.findUnique({

        where: {

            partNumber

        },

        include: {

            manufacturer: true,

            supplier: true,

            ataChapter: true,

            compatibilities: {

                include: {

                    aircraft: true

                }

            }

        }

    });

}

export async function searchParts(keyword) {

    return prisma.partMaster.findMany({

        where: {

            OR: [

                {

                    partName: {

                        contains: keyword,

                        mode: "insensitive"

                    }

                },

                {

                    partNumber: {

                        contains: keyword,

                        mode: "insensitive"

                    }

                }

            ]

        },

        include: {

            manufacturer: true,

            supplier: true,

            ataChapter: true

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

export async function getCurrentStock(code = null) {

    const where = {};

    if (code) {

        where.warehouse = {

            code

        };

    }

    return prisma.stock.findMany({

        where,

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

                    manufacturer: true

                }

            }

        }

    });

}