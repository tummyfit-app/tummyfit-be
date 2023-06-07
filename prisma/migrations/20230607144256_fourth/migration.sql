/*
  Warnings:

  - Changed the type of `ready_minutes` on the `Foods` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Foods" DROP COLUMN "ready_minutes",
ADD COLUMN     "ready_minutes" INTEGER NOT NULL;
