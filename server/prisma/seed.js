import { PrismaClient } from "@prisma/client";

import aircraft from "./data/aircraft.js";
import ataChapters from "./data/ataChapters.js";
import manufacturers from "./data/manufacturers.js";
import suppliers from "./data/suppliers.js";
import warehouses from "./data/warehouses.js";
import parts from "./data/parts.js";

const prisma = new PrismaClient();

function buildMap(rows, key) {
  return new Map(rows.map((row) => [row[key], row.id]));
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function clearDatabase() {
  console.log("🗑 Clearing database...");

  await prisma.stockTransaction.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.aircraftCompatibility.deleteMany();
  await prisma.purchaseOrderItem.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.partMaster.deleteMany();
  await prisma.warehouse.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.manufacturer.deleteMany();
  await prisma.aTAChapter.deleteMany();
  await prisma.aircraft.deleteMany();

  console.log("✅ Database cleared");
}

async function seedMasterTables() {
  console.log("🌱 Seeding master tables...");

  await prisma.aircraft.createMany({
    data: aircraft,
    skipDuplicates: true,
  });

  await prisma.aTAChapter.createMany({
    data: ataChapters,
    skipDuplicates: true,
  });

  await prisma.manufacturer.createMany({
    data: manufacturers,
    skipDuplicates: true,
  });

  await prisma.supplier.createMany({
    data: suppliers,
    skipDuplicates: true,
  });

  await prisma.warehouse.createMany({
    data: warehouses,
    skipDuplicates: true,
  });

  console.log("✅ Aircraft:", aircraft.length);
  console.log("✅ ATA Chapters:", ataChapters.length);
  console.log("✅ Manufacturers:", manufacturers.length);
  console.log("✅ Suppliers:", suppliers.length);
  console.log("✅ Warehouses:", warehouses.length);
}

async function buildLookupMaps() {

  const aircraftRows = await prisma.aircraft.findMany();

  const ataRows = await prisma.aTAChapter.findMany();

  const manufacturerRows = await prisma.manufacturer.findMany();

  const supplierRows = await prisma.supplier.findMany();

  const warehouseRows = await prisma.warehouse.findMany();

  return {

    aircraftRows,

    warehouseRows,

    aircraftMap: buildMap(aircraftRows, "model"),

    ataMap: buildMap(ataRows, "chapter"),

    manufacturerMap: buildMap(manufacturerRows, "name"),

    supplierMap: buildMap(supplierRows, "name"),

    warehouseMap: buildMap(warehouseRows, "code")

  };

}

async function seedParts(lookups) {

  console.log("🛠 Seeding Parts...");

  const {

    manufacturerMap,

    supplierMap,

    ataMap

  } = lookups;

  for (const part of parts) {

    const manufacturerId = manufacturerMap.get(part.manufacturer);

    const supplierId = supplierMap.get(part.supplier);

    const ataChapterId = ataMap.get(part.ataChapter);

    if (!manufacturerId) {
      throw new Error(
        `Manufacturer not found: ${part.manufacturer}`
      );
    }

    if (!supplierId) {
      throw new Error(
        `Supplier not found: ${part.supplier}`
      );
    }

    if (!ataChapterId) {
      throw new Error(
        `ATA Chapter not found: ${part.ataChapter}`
      );
    }

    await prisma.partMaster.create({

      data: {

        partNumber: part.partNumber,

        partName: part.partName,

        description: part.description,

        manufacturerId,

        supplierId,

        ataChapterId,

        unitCost: part.unitCost,

        currency: part.currency ?? "USD",

        shelfLifeMonths: part.shelfLifeMonths,

        certificationStatus: part.certificationStatus

      }

    });

  }

  const allParts = await prisma.partMaster.findMany();

  console.log(`✅ ${allParts.length} Parts Seeded`);

  return allParts;

}

async function seedCompatibility(lookups, allParts) {

  console.log("✈️ Creating Aircraft Compatibility...");

  const { aircraftRows } = lookups;

  let compatibilityCount = 0;

  for (const aircraft of aircraftRows) {

    for (const part of allParts) {

      await prisma.aircraftCompatibility.create({

        data: {

          aircraftId: aircraft.id,

          partId: part.id

        }

      });

      compatibilityCount++;

    }

  }

  console.log(`✅ ${compatibilityCount} Compatibility Records Created`);

}

async function seedStock(lookups, allParts) {

  console.log("📦 Creating Stock...");

  const { warehouseRows } = lookups;

  let stockCount = 0;

  const createdStocks = [];

  for (const warehouse of warehouseRows) {

    for (const part of allParts) {

      const currentStock = random(20, 80);

      const reservedStock = random(0, 5);

      const stock = await prisma.stock.create({

        data: {

          warehouseId: warehouse.id,

          partId: part.id,

          currentStock,

          reservedStock,

          minimumStock: 10,

          maximumStock: 100,

          rack: `R-${random(1,8)}`,

          bin: `B-${random(1,20)}`

        }

      });

      createdStocks.push(stock);

      stockCount++;

    }

  }

  console.log(`✅ ${stockCount} Stock Records Created`);

  return createdStocks;

}

async function seedTransactions(createdStocks) {

  console.log("🧾 Creating Stock Transactions...");

  let transactionCount = 0;

  for (const stock of createdStocks) {

    await prisma.stockTransaction.create({

      data: {

        stockId: stock.id,

        transactionType: "RECEIVED",

        quantityChanged: stock.currentStock,

        remarks: "Initial inventory load"

      }

    });

    transactionCount++;

  }

  console.log(`✅ ${transactionCount} Transactions Created`);

}

async function main() {

  console.log("======================================");
  console.log("     AERO MRO AI DATABASE SEED");
  console.log("======================================");

  await clearDatabase();

  await seedMasterTables();

  const lookups = await buildLookupMaps();

  const allParts = await seedParts(lookups);

  await seedCompatibility(lookups, allParts);

  const createdStocks = await seedStock(

    lookups,

    allParts

  );

  await seedTransactions(createdStocks);

  console.log("");
  console.log("======================================");
  console.log("🎉 DATABASE SEEDED SUCCESSFULLY");
  console.log("======================================");
}

main()
  .catch((err) => {
    console.error("❌ Seed Failed");
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });