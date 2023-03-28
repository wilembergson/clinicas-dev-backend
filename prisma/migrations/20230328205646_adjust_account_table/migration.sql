/*
  Warnings:

  - You are about to drop the column `birthDate` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "birthDate",
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL;
