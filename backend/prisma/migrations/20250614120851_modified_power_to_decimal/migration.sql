/*
  Warnings:

  - Made the column `power` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `power` DECIMAL(65, 30) NOT NULL;
