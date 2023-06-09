/*
  Warnings:

  - Added the required column `calories` to the `UserMealPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserMealPlan" ADD COLUMN     "calories" DECIMAL(65,30) NOT NULL;
