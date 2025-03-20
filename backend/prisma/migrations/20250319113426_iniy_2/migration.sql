-- CreateTable
CREATE TABLE `A_User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gstin` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sales` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `contactNo` VARCHAR(191) NULL,

    UNIQUE INDEX `A_User_gstin_key`(`gstin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `A_Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gstin` VARCHAR(191) NOT NULL,
    `bs` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `contactName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `A_Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNo` VARCHAR(191) NOT NULL,
    `gstin` VARCHAR(191) NOT NULL,
    `billingAddressId` INTEGER NOT NULL,
    `shippingAddressId` INTEGER NOT NULL,
    `timeStamp` VARCHAR(191) NOT NULL,
    `orderDate` VARCHAR(191) NOT NULL,
    `totalPrice` DECIMAL(65, 30) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `paymentFile` VARCHAR(191) NULL,
    `vehicleRegNo` VARCHAR(191) NULL,

    UNIQUE INDEX `A_Order_orderNo_key`(`orderNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `A_OrderDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` VARCHAR(191) NOT NULL,
    `modelNumber` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DECIMAL(65, 30) NOT NULL,
    `netPrice` DECIMAL(65, 30) NOT NULL,
    `cgst` DECIMAL(65, 30) NOT NULL,
    `sgst` DECIMAL(65, 30) NOT NULL,
    `totalAmount` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `S_User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gstin` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sales` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `contactNo` VARCHAR(191) NULL,

    UNIQUE INDEX `S_User_gstin_key`(`gstin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `S_Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gstin` VARCHAR(191) NOT NULL,
    `bs` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `contactName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `S_Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNo` VARCHAR(191) NOT NULL,
    `gstin` VARCHAR(191) NOT NULL,
    `billingAddressId` INTEGER NOT NULL,
    `shippingAddressId` INTEGER NOT NULL,
    `timeStamp` VARCHAR(191) NOT NULL,
    `orderDate` VARCHAR(191) NOT NULL,
    `totalPrice` DECIMAL(65, 30) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `paymentFile` VARCHAR(191) NULL,
    `vehicleRegNo` VARCHAR(191) NULL,

    UNIQUE INDEX `S_Order_orderNo_key`(`orderNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `S_OrderDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` VARCHAR(191) NOT NULL,
    `modelNumber` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DECIMAL(65, 30) NOT NULL,
    `netPrice` DECIMAL(65, 30) NOT NULL,
    `cgst` DECIMAL(65, 30) NOT NULL,
    `sgst` DECIMAL(65, 30) NOT NULL,
    `totalAmount` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gstin` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sales` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `contactNo` VARCHAR(191) NULL,

    UNIQUE INDEX `T_User_gstin_key`(`gstin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gstin` VARCHAR(191) NOT NULL,
    `bs` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `contactName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNo` VARCHAR(191) NOT NULL,
    `gstin` VARCHAR(191) NOT NULL,
    `billingAddressId` INTEGER NOT NULL,
    `shippingAddressId` INTEGER NOT NULL,
    `timeStamp` VARCHAR(191) NOT NULL,
    `orderDate` VARCHAR(191) NOT NULL,
    `totalPrice` DECIMAL(65, 30) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `paymentFile` VARCHAR(191) NULL,
    `vehicleRegNo` VARCHAR(191) NULL,

    UNIQUE INDEX `T_Order_orderNo_key`(`orderNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `T_OrderDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` VARCHAR(191) NOT NULL,
    `modelNumber` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DECIMAL(65, 30) NOT NULL,
    `netPrice` DECIMAL(65, 30) NOT NULL,
    `cgst` DECIMAL(65, 30) NOT NULL,
    `sgst` DECIMAL(65, 30) NOT NULL,
    `totalAmount` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `family` VARCHAR(191) NULL,
    `mn` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `power` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `Product_mn_key`(`mn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `A_Address` ADD CONSTRAINT `A_Address_gstin_fkey` FOREIGN KEY (`gstin`) REFERENCES `A_User`(`gstin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `A_Order` ADD CONSTRAINT `A_Order_gstin_fkey` FOREIGN KEY (`gstin`) REFERENCES `A_User`(`gstin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `A_OrderDetails` ADD CONSTRAINT `A_OrderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `A_Order`(`orderNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `A_OrderDetails` ADD CONSTRAINT `A_OrderDetails_modelNumber_fkey` FOREIGN KEY (`modelNumber`) REFERENCES `Product`(`mn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `S_Address` ADD CONSTRAINT `S_Address_gstin_fkey` FOREIGN KEY (`gstin`) REFERENCES `S_User`(`gstin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `S_Order` ADD CONSTRAINT `S_Order_gstin_fkey` FOREIGN KEY (`gstin`) REFERENCES `S_User`(`gstin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `S_OrderDetails` ADD CONSTRAINT `S_OrderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `S_Order`(`orderNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `S_OrderDetails` ADD CONSTRAINT `S_OrderDetails_modelNumber_fkey` FOREIGN KEY (`modelNumber`) REFERENCES `Product`(`mn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Address` ADD CONSTRAINT `T_Address_gstin_fkey` FOREIGN KEY (`gstin`) REFERENCES `T_User`(`gstin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_Order` ADD CONSTRAINT `T_Order_gstin_fkey` FOREIGN KEY (`gstin`) REFERENCES `T_User`(`gstin`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_OrderDetails` ADD CONSTRAINT `T_OrderDetails_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `T_Order`(`orderNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `T_OrderDetails` ADD CONSTRAINT `T_OrderDetails_modelNumber_fkey` FOREIGN KEY (`modelNumber`) REFERENCES `Product`(`mn`) ON DELETE RESTRICT ON UPDATE CASCADE;
