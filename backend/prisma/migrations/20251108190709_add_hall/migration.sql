-- CreateTable
CREATE TABLE "halls" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "configuration" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "halls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "halls_name_key" ON "halls"("name");
