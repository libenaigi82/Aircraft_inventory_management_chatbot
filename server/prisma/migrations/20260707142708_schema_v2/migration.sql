/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Warehouse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `PurchaseOrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Warehouse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StockTransactionType" AS ENUM ('RECEIVED', 'ISSUED', 'RESERVED', 'RELEASED', 'RETURNED', 'ADJUSTED');

-- AlterTable
ALTER TABLE "PartMaster" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD';

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseOrderItem" ADD COLUMN     "unitPrice" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "maximumStock" INTEGER;

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "StockTransaction" (
    "id" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,
    "transactionType" "StockTransactionType" NOT NULL,
    "quantityChanged" INTEGER NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StockTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StockTransaction_stockId_idx" ON "StockTransaction"("stockId");

-- CreateIndex
CREATE INDEX "StockTransaction_transactionType_idx" ON "StockTransaction"("transactionType");

-- CreateIndex
CREATE INDEX "Stock_warehouseId_idx" ON "Stock"("warehouseId");

-- CreateIndex
CREATE INDEX "Stock_partId_idx" ON "Stock"("partId");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_code_key" ON "Warehouse"("code");

-- AddForeignKey
ALTER TABLE "StockTransaction" ADD CONSTRAINT "StockTransaction_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
