-- AddForeignKey
ALTER TABLE `A_Order` ADD CONSTRAINT `A_Order_billingAddressId_fkey` FOREIGN KEY (`billingAddressId`) REFERENCES `A_Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `A_Order` ADD CONSTRAINT `A_Order_shippingAddressId_fkey` FOREIGN KEY (`shippingAddressId`) REFERENCES `A_Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
