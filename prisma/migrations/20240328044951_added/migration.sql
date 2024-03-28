-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('perishable', 'nonPerishable');

-- CreateTable
CREATE TABLE "Organisation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "id" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "baseDistanceInKm" INTEGER NOT NULL DEFAULT 5,
    "fixPrice" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "kmPrice" DOUBLE PRECISION NOT NULL,
    "organisationId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pricing_organisationId_idx" ON "Pricing"("organisationId");

-- CreateIndex
CREATE INDEX "Pricing_itemId_idx" ON "Pricing"("itemId");

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
