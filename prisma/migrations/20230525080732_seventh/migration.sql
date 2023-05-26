/*
  Warnings:

  - Added the required column `age` to the `UserDescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDescription" ADD COLUMN     "age" INTEGER NOT NULL;
