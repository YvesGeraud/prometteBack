-- AlterTable
ALTER TABLE `ct_correspondencia_estado` ADD COLUMN `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updatedAt` DATETIME(0) NULL;
