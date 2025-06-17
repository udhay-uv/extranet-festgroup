/*
  Warnings:

  - You are about to drop the column `family` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `family`,
    DROP COLUMN `quantity`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `brand_short` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `desc_offcial` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `group` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `igst` DECIMAL(65, 30) NOT NULL DEFAULT 0.0,
    ADD COLUMN `material` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `mn_pn` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `pn` VARCHAR(191) NULL DEFAULT '',
    MODIFY `brand` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `company` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `mn` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `type` VARCHAR(191) NULL DEFAULT '',
    MODIFY `power` DECIMAL(65, 30) NULL DEFAULT 0.0,
    MODIFY `description` VARCHAR(191) NOT NULL DEFAULT '';
