import prisma from "../config/prisma.js";

export async function getDashboardData() {

    const [
        aircraft,
        parts,
        manufacturers,
        suppliers,
        warehouses,
        stock
    ] = await Promise.all([

        prisma.aircraft.count(),

        prisma.partMaster.count(),

        prisma.manufacturer.count(),

        prisma.supplier.count(),

        prisma.warehouse.count(),

        prisma.stock.aggregate({
            _sum: {
                currentStock: true
            }
        })

    ]);

    return {

        aircraft,

        parts,

        manufacturers,

        suppliers,

        warehouses,

        totalInventory: stock._sum.currentStock ?? 0

    };

}