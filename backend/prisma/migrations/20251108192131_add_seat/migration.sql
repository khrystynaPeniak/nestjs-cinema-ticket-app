-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('STANDARD', 'VIP');

-- CreateTable
CREATE TABLE "seats" (
    "id" TEXT NOT NULL,
    "hallId" TEXT NOT NULL,
    "rowNumber" INTEGER NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "type" "SeatType" NOT NULL DEFAULT 'STANDARD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seats_hallId_rowNumber_seatNumber_key" ON "seats"("hallId", "rowNumber", "seatNumber");

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "halls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
