/*
  Warnings:

  - Added the required column `active` to the `consult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "consult" ADD COLUMN     "active" BOOLEAN NOT NULL;
