/*
  Warnings:

  - You are about to drop the column `state` on the `address` table. All the data in the column will be lost.
  - Added the required column `uf` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "state",
ADD COLUMN     "uf" TEXT NOT NULL;
