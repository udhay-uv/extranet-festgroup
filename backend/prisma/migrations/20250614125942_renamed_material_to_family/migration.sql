/*
  Warnings:

  - You are about to drop the column `material` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `material`,
    ADD COLUMN `family` VARCHAR(191) NOT NULL DEFAULT '';
