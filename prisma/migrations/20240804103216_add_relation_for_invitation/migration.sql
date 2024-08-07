/*
  Warnings:

  - Made the column `createdByUserId` on table `MealPlanInvite` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `MealPlanInvite` DROP FOREIGN KEY `MealPlanInvite_createdByUserId_fkey`;

-- AlterTable
ALTER TABLE `MealPlanInvite` MODIFY `createdByUserId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `MealPlanInvite` ADD CONSTRAINT `MealPlanInvite_createdByUserId_fkey` FOREIGN KEY (`createdByUserId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealPlanInvite` ADD CONSTRAINT `MealPlanInvite_mealPlanId_fkey` FOREIGN KEY (`mealPlanId`) REFERENCES `MealPlan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
