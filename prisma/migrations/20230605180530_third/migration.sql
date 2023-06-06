/*
  Warnings:

  - You are about to drop the column `alcohol` on the `UserDescription` table. All the data in the column will be lost.
  - Added the required column `halal` to the `UserDescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDescription" DROP COLUMN "alcohol",
ADD COLUMN     "halal" TEXT NOT NULL;
