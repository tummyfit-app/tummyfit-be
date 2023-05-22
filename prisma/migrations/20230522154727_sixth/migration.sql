/*
  Warnings:

  - You are about to drop the column `age` on the `UserDescription` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `UserDescription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserDescription" DROP COLUMN "age",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL;
