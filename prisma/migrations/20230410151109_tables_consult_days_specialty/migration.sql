-- CreateTable
CREATE TABLE "consult" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "accountId" UUID NOT NULL,
    "specialtyId" UUID NOT NULL,

    CONSTRAINT "consult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialty" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "days" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialtiesDays" (
    "id" UUID NOT NULL,
    "specialtyId" UUID NOT NULL,
    "daysId" UUID NOT NULL,

    CONSTRAINT "specialtiesDays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specialty_name_key" ON "specialty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "days_name_key" ON "days"("name");

-- AddForeignKey
ALTER TABLE "consult" ADD CONSTRAINT "consult_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consult" ADD CONSTRAINT "consult_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialtiesDays" ADD CONSTRAINT "specialtiesDays_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialtiesDays" ADD CONSTRAINT "specialtiesDays_daysId_fkey" FOREIGN KEY ("daysId") REFERENCES "days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
