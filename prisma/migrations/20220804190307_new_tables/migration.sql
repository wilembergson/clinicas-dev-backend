-- CreateTable
CREATE TABLE "specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "days" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialtiesDays" (
    "id" SERIAL NOT NULL,
    "specialtyId" INTEGER NOT NULL,
    "daysId" INTEGER NOT NULL,

    CONSTRAINT "specialtiesDays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "specialtyId" INTEGER NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consult" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "specialtyId" INTEGER NOT NULL,

    CONSTRAINT "consult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "specialty_name_key" ON "specialty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "days_name_key" ON "days"("name");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_crm_key" ON "doctor"("crm");

-- AddForeignKey
ALTER TABLE "specialtiesDays" ADD CONSTRAINT "specialtiesDays_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialtiesDays" ADD CONSTRAINT "specialtiesDays_daysId_fkey" FOREIGN KEY ("daysId") REFERENCES "days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consult" ADD CONSTRAINT "consult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consult" ADD CONSTRAINT "consult_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
