-- AddForeignKey
ALTER TABLE `S_Order` ADD CONSTRAINT `S_Order_billingAddressId_fkey` FOREIGN KEY (`billingAddressId`) REFERENCES `S_Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `S_Order` ADD CONSTRAINT `S_Order_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `S_Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Order` ADD CONSTRAINT `T_Order_billingAddressId_fkey` FOREIGN KEY (`billingAddressId`) REFERENCES `T_Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Order` ADD CONSTRAINT `T_Order_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `T_Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
