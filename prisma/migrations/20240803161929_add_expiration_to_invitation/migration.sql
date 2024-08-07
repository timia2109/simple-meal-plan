/*
  Warnings:

  - Added the required column `expiresAt` to the `MealPlanInvite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MealPlanInvite` ADD COLUMN `expiresAt` DATETIME(3) NOT NULL;
