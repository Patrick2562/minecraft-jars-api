/*
  Warnings:

  - Added the required column `fileName` to the `Jar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jar" ADD COLUMN     "fileName" TEXT NOT NULL;
