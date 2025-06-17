-- DropForeignKey
ALTER TABLE `A_OrderDetails` DROP FOREIGN KEY `A_OrderDetails_modelNumber_fkey`;

-- DropForeignKey
ALTER TABLE `A_OrderDetails` DROP FOREIGN KEY `A_OrderDetails_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `S_OrderDetails` DROP FOREIGN KEY `S_OrderDetails_modelNumber_fkey`;

-- DropForeignKey
ALTER TABLE `T_OrderDetails` DROP FOREIGN KEY `T_OrderDetails_modelNumber_fkey`;

-- DropForeignKey
ALTER TABLE `T_OrderDetails` DROP FOREIGN KEY `T_OrderDetails_orderId_fkey`;

-- DropIndex
DROP INDEX `A_OrderDetails_modelNumber_fkey` ON `A_OrderDetails`;

-- DropIndex
DROP INDEX `A_OrderDetails_orderId_fkey` ON `A_OrderDetails`;

-- DropIndex
DROP INDEX `S_OrderDetails_modelNumber_fkey` ON `S_OrderDetails`;

-- DropIndex
DROP INDEX `T_OrderDetails_modelNumber_fkey` ON `T_OrderDetails`;

-- DropIndex
DROP INDEX `T_OrderDetails_orderId_fkey` ON `T_OrderDetails`;

-- AddForeignKey
ALTER TABLE `A_OrderDetails` ADD CONSTRAINT `A_OrderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `A_Order`(`orderNo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `A_OrderDetails` ADD CONSTRAINT `A_OrderDetails_modelNumber_fkey` FOREIGN KEY (`modelNumber`) REFERENCES `Product`(`mn`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `S_OrderDetails` ADD CONSTRAINT `S_OrderDetails_modelNumber_fkey` FOREIGN KEY (`modelNumber`) REFERENCES `Product`(`mn`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_OrderDetails` ADD CONSTRAINT `T_OrderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `T_Order`(`orderNo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_OrderDetails` ADD CONSTRAINT `T_OrderDetails_modelNumber_fkey` FOREIGN KEY (`modelNumber`) REFERENCES `Product`(`mn`) ON DELETE CASCADE ON UPDATE CASCADE;
