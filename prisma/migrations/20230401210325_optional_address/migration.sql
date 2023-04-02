-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_addressId_fkey";

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "addressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
