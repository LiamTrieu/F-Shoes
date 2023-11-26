-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: datn_website_fshoes
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `gender` bit(1) DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `date_birth` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `citizen_id` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_g4b37bcdq6mmqdp3p67qoatc` (`phone_number`),
  UNIQUE KEY `UK_q0uja26qgu1atulenwup9rxyr` (`email`),
  UNIQUE KEY `UK_p12i9ddy24pr4ccecat2ky01v` (`citizen_id`),
  CONSTRAINT `account_chk_1` CHECK ((`role` between 0 and 2)),
  CONSTRAINT `account_chk_2` CHECK ((`status` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (_binary '',0,0,1700896530761,1700896530761,1700896530761,'0123456785','017892f3-f431-4acd-bd68-732115611c47','staff5@example.com','Lê Thị E','password5','https://shorturl.at/rAGJV','5678901234567890','NV5',NULL,NULL),(_binary '',0,0,1700896530757,1700896530757,1700896530757,'0123456786','052d8083-2306-4535-83df-3bde51134f03','staff4@example.com','Lê Thị D','password4','https://shorturl.at/pCFQU','4567890123456789','NV4',NULL,NULL),(_binary '',2,0,1700896530715,1700896530715,1700896530715,'0345678901','14feea20-bf44-4a55-b8a6-e6f24e5282dc','customer3@example.com','Nguyễn Văn C','password3',NULL,NULL,'KH3',NULL,NULL),(_binary '\0',2,0,1700896530711,1700896530710,1700896530711,'0234567890','1aec1944-b6ac-4c83-959b-2a1eb894056f','customer2@example.com','Nguyễn Văn B','password2',NULL,NULL,'KH2',NULL,NULL),(_binary '',0,0,1700896530747,1700896530746,1700896530747,'0123456789','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','staff1@example.com','Lê Thị A','password1','https://shorturl.at/CDP27','1234567890123456','NV1',NULL,NULL),(_binary '',2,0,1700896530723,1700896530722,1700896530723,'0567890123','61cd04b6-f63b-4fa2-baf0-940ff713033f','customer5@example.com','Nguyễn Văn E','password5',NULL,NULL,'KH5',NULL,NULL),(_binary '',2,0,1700896530674,1700896530661,1700896530674,'0123456781','6f4d915d-5c2d-44e7-91ab-01c4ba253e2b','customer1@example.com','Nguyễn Văn A','password1',NULL,NULL,'KH1',NULL,NULL),(_binary '',0,0,1700896530750,1700896530750,1700896530750,'0123456788','78eb9e4d-91e7-43e0-910f-fbdc3d3cd4e3','staff2@example.com','Lê Thị B','password2','https://shorturl.at/eqIR9','2345678901234567','NV2',NULL,NULL),(_binary '\0',2,0,1700896530719,1700896530719,1700896530719,'0456789012','94d3dfe0-593e-4867-b7e3-f5e8e88f52d4','customer4@example.com','Nguyễn Văn D','password4',NULL,NULL,'KH4',NULL,NULL),(_binary '',1,0,1700896531836,1700896531835,1700896531836,'0987656412','a7cfe4e1-0e4f-4ac8-b44d-7ac8d72e32d6','admin@gmail.com','Nguyễn Văn Nhật','21232f297a57a5a743894a0e4a801fc3','https://res.cloudinary.com/dioxktgsm/image/upload/v1699145685/hz5f5miaqvpxyewazije.png','1234999890123456','NV6',NULL,NULL),(_binary '',0,0,1700896530754,1700896530753,1700896530754,'0123456787','c6449bfa-6e3f-4922-9115-3b98f544427c','staff3@example.com','Lê Thị C','password3','https://shorturl.at/juFOV','3456789012345678','NV3',NULL,NULL),(_binary '',2,0,1700896531839,1700896531835,1700896531839,'0647536475','c6f40285-1e3d-4501-b2c5-889df553ed2a','nguyenthithuyduong948@gmail.com','Nguyễn Thị Thùy Dương','4ac4fcfbd3b0fc5271aa1d5e30e21d21','https://res.cloudinary.com/dioxktgsm/image/upload/v1699145591/vfitrqzsyeueqpiioguz.jpg','077564778753','KH6',NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `type` bit(1) DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `district_id` varchar(36) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_account` varchar(36) DEFAULT NULL,
  `province_id` varchar(36) DEFAULT NULL,
  `ward_id` varchar(36) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `specific_address` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrxvqniuqan1cfs6a7yejg9mp` (`id_account`),
  CONSTRAINT `FKrxvqniuqan1cfs6a7yejg9mp` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (_binary '',1700896531842,1700896531842,'0563728192','2204','11dfead3-d13d-4eef-808e-d81a2dba3618','a7cfe4e1-0e4f-4ac8-b44d-7ac8d72e32d6','266','140207','Địa chỉ 11',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896530846,1700896530846,'0261920192','2204','22ff2a68-9cc5-4b5b-ab27-a66f730f2a06','017892f3-f431-4acd-bd68-732115611c47','266','140207','Địa chỉ 10',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896530833,1700896530833,'0172617261','2204','44a60610-9fc7-45b0-b2ea-85be665f29b8','78eb9e4d-91e7-43e0-910f-fbdc3d3cd4e3','266','140207','Địa chỉ 7',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896530817,1700896530817,'0456789012','2204','5fbc5576-f087-477a-a08d-700df8318662','94d3dfe0-593e-4867-b7e3-f5e8e88f52d4','266','140207','Địa chỉ 4',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896531847,1700896531847,'0473029182','2204','8ff2b94d-f228-43e0-b03f-9ba55422e27a','c6f40285-1e3d-4501-b2c5-889df553ed2a','266','140207','Địa chỉ 12',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896530804,1700896530804,'0234567890','2204','9a9df255-6b92-45f6-ae0d-7aeba51626cc','1aec1944-b6ac-4c83-959b-2a1eb894056f','266','140207','Địa chỉ 2',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896530841,1700896530842,'0452619201','2204','a0115fbe-1092-4601-86ac-17b18d85b288','052d8083-2306-4535-83df-3bde51134f03','266','140207','Địa chỉ 9',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896530837,1700896530837,'0675826371','2204','a948ee0e-4add-49b1-b127-ecd0fea2528e','c6449bfa-6e3f-4922-9115-3b98f544427c','266','140207','Địa chỉ 8',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896530822,1700896530822,'0567890123','2204','b6166b64-dbad-4746-8ecf-e1a3587b38f2','61cd04b6-f63b-4fa2-baf0-940ff713033f','266','140207','Địa chỉ 5',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896530799,1700896530799,'0123456789','2204','bd08ca9c-faf5-4ffc-8f1a-a2404073e2b2','6f4d915d-5c2d-44e7-91ab-01c4ba253e2b','266','140207','Địa chỉ 1',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896530828,1700896530828,'0281372615','2204','c50373bb-0325-4094-a670-5c79cecdce11','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','266','140207','Địa chỉ 6',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700896530810,1700896530810,'0345678901','2204','eeea727b-c90a-4d71-beab-8d76658479fd','14feea20-bf44-4a55-b8a6-e6f24e5282dc','266','140207','Địa chỉ 3',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `customer_amount` decimal(38,2) DEFAULT NULL,
  `money_after` decimal(38,2) DEFAULT NULL,
  `money_reduced` decimal(38,2) DEFAULT NULL,
  `money_ship` decimal(38,2) DEFAULT NULL,
  `receiving_method` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `total_money` decimal(38,2) DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `complete_date` bigint DEFAULT NULL,
  `confirmation_date` bigint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `desired_receipt_date` bigint DEFAULT NULL,
  `receive_date` bigint DEFAULT NULL,
  `ship_date` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_customer` varchar(36) DEFAULT NULL,
  `id_voucher` varchar(36) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlx49ix9cxl5nfm73bq9sykjoq` (`id_customer`),
  KEY `FKp1cfhmgukkvd7vs992pdocfvb` (`id_voucher`),
  CONSTRAINT `FKlx49ix9cxl5nfm73bq9sykjoq` FOREIGN KEY (`id_customer`) REFERENCES `account` (`id`),
  CONSTRAINT `FKp1cfhmgukkvd7vs992pdocfvb` FOREIGN KEY (`id_voucher`) REFERENCES `voucher` (`id`),
  CONSTRAINT `bill_chk_1` CHECK ((`status` between 0 and 12)),
  CONSTRAINT `bill_chk_2` CHECK ((`type` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (900.00,12250000.00,100000.00,30000.00,NULL,7,12350000.00,1,1701069330849,1701069330849,1700896530850,1701069330849,1701069330849,1701069330849,1700896530850,'0123456789','HD001','0daf71d6-b8a3-494c-930a-f0fb479af3aa','6f4d915d-5c2d-44e7-91ab-01c4ba253e2b',NULL,NULL,'Nguyễn Văn A','Đặt hành','123 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(0.00,18100000.00,900000.00,80000.00,NULL,6,19000000.00,0,NULL,1700898330881,1700896530882,1700870400000,NULL,NULL,1700896530882,'0123456789','HD009','0deb6d13-4526-436f-9711-87d4390fd320',NULL,NULL,NULL,'Nguyễn Văn I','Mua tại quầy','131 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(0.00,19000000.00,1000000.00,0.00,NULL,0,20000000.00,1,NULL,1700898330893,1700896530894,1700870400000,NULL,NULL,1700896530894,'0123456789','HD013','24f6df6c-448f-4e32-87e8-d32b91c96c36','6f4d915d-5c2d-44e7-91ab-01c4ba253e2b',NULL,NULL,'Nguyễn Văn B','Đặt online','145 Đường ABC, Quận DEF, Thành phố ĐN',NULL,NULL),(0.00,17200000.00,800000.00,0.00,NULL,1,18000000.00,1,NULL,NULL,1700896530878,1701069330878,NULL,NULL,1700896530878,'0123456789','HD008','2efd6649-bc10-47d9-abcf-7f843ca167b0','6f4d915d-5c2d-44e7-91ab-01c4ba253e2b',NULL,NULL,'Nguyễn Văn H','Đặt hàng online','130 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(0.00,16300000.00,700000.00,0.00,NULL,1,17000000.00,1,NULL,NULL,1700896530874,1701069330874,NULL,NULL,1700896530874,'0123456789','HD007','3dfbcc35-c2f5-4606-b6be-2df16e758652','61cd04b6-f63b-4fa2-baf0-940ff713033f',NULL,NULL,'Nguyễn Văn G','Đặt online','129 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(15400000.00,15400000.00,600000.00,0.00,NULL,2,16000000.00,1,NULL,1701069330870,1700896530870,1701069330870,NULL,NULL,1700896530870,'0123456789','HD006','3fc840b4-2acd-4596-9d0e-301a5411ca62','1aec1944-b6ac-4c83-959b-2a1eb894056f',NULL,NULL,'Nguyễn Văn F','Đặt hàng online','128 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(12700000.00,12700000.00,300000.00,20000.00,NULL,3,13000000.00,1,NULL,1701069330861,1700896530861,1701069330861,NULL,1701069330861,1700896530861,'0123456789','HD003','5607c34b-119c-42b5-8159-3f6cd8494c92','14feea20-bf44-4a55-b8a6-e6f24e5282dc',NULL,NULL,'Nguyễn Văn C','Đặt hàng online','125 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(19000000.00,19000000.00,1000000.00,0.00,NULL,5,20000000.00,0,NULL,1700898330887,1700896530887,1700870400000,NULL,NULL,1700896530887,'0123456789','HD011','6791b9f9-e690-4a81-8797-a9f8afe72a5b',NULL,NULL,NULL,'Nguyễn Văn Nam','Mua tại quầy','142 Đường ABC, Quận DEF, Thành phố HCM',NULL,NULL),(20000000.00,20000000.00,0.00,0.00,NULL,5,20000000.00,0,NULL,1700898330890,1700896530891,1700870400000,NULL,NULL,1700896530891,'0123456789','HD012','6b6f891e-d90f-44cf-982b-2ef4ab1097e5',NULL,NULL,NULL,'Nguyễn Văn Nam','Mua tại quầy','145 Đường ABC, Quận DEF, Thành phố HN',NULL,NULL),(0.00,19000000.00,1000000.00,0.00,NULL,6,20000000.00,0,NULL,1700898330884,1700896530884,1700870400000,NULL,NULL,1700896530884,'0123456789','HD010','9db01685-30c1-4646-a0e9-75fa2e951d4f',NULL,NULL,NULL,'Nguyễn Văn J','Mua tại quầy','142 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(15000000.00,15000000.00,0.00,20000.00,NULL,3,15000000.00,1,NULL,1701069330865,1700896530866,1701069330865,NULL,1701069330865,1700896530866,'0123456789','HD004','cad2076f-342d-47e5-b619-b9a1428def46','14feea20-bf44-4a55-b8a6-e6f24e5282dc',NULL,NULL,'Nguyễn Văn D','Đặt hàng online','125 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(12300000.00,12300000.00,200000.00,25000.00,NULL,7,12500000.00,1,1701069330856,1701069330856,1700896530856,1701069330856,1701069330856,1701069330856,1700896530856,'0123456789','HD002','feeb8afc-2a30-46d8-908d-f5ea6f8b4f9b','1aec1944-b6ac-4c83-959b-2a1eb894056f',NULL,NULL,'Nguyễn Văn B','Đặt hàng online','124 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL);
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_detail`
--

DROP TABLE IF EXISTS `bill_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_detail` (
  `price` decimal(38,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_bill` varchar(36) DEFAULT NULL,
  `id_product_detail` varchar(36) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiu3wwq39mr69wsbklret9mtki` (`id_bill`),
  KEY `FKcpo5ddp6aci7g8f4jjaj6730n` (`id_product_detail`),
  CONSTRAINT `FKcpo5ddp6aci7g8f4jjaj6730n` FOREIGN KEY (`id_product_detail`) REFERENCES `product_detail` (`id`),
  CONSTRAINT `FKiu3wwq39mr69wsbklret9mtki` FOREIGN KEY (`id_bill`) REFERENCES `bill` (`id`),
  CONSTRAINT `bill_detail_chk_1` CHECK ((`status` between 0 and 2))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_detail`
--

LOCK TABLES `bill_detail` WRITE;
/*!40000 ALTER TABLE `bill_detail` DISABLE KEYS */;
INSERT INTO `bill_detail` VALUES (80000.00,1,0,1700896531410,1700896531410,'08d8c9ce-4ba0-4443-b452-4646a6d869cf','2efd6649-bc10-47d9-abcf-7f843ca167b0','464e5393-4765-4ed8-9fbf-ad8694fbbc3e',NULL,NULL,NULL),(270000.00,3,0,1700896531454,1700896531454,'0e42246e-18de-40df-81a4-fc7c33fa94b8','3dfbcc35-c2f5-4606-b6be-2df16e758652','a2bbc224-3ca4-4f30-be6d-0838a4023948',NULL,NULL,NULL),(120000.00,2,0,1700896531468,1700896531468,'2256a25d-9355-49e4-bebe-cbd51acb8749','9db01685-30c1-4646-a0e9-75fa2e951d4f','b67d174d-2147-4e5a-8687-aeca9cb33e0b',NULL,NULL,NULL),(200000.00,2,0,1700896531450,1700896531450,'2bdb7ad4-451b-4acb-9b0c-8288ee70a369','3fc840b4-2acd-4596-9d0e-301a5411ca62','302d9c7c-8da2-457e-a120-7cdf106ed34f',NULL,NULL,NULL),(270000.00,3,0,1700896531382,1700896531382,'3051e13e-2eea-4620-b906-bf3e323f791b','feeb8afc-2a30-46d8-908d-f5ea6f8b4f9b','9fed2ddc-1cce-4ec8-b2c9-b2ea748df754',NULL,NULL,NULL),(80000.00,1,0,1700896531388,1700896531388,'34e89f88-501a-48ed-a53e-8718d7461afb','5607c34b-119c-42b5-8159-3f6cd8494c92','e6b91c25-4603-462f-aaf1-9f9250de6b42',NULL,NULL,NULL),(270000.00,3,0,1700896531405,1700896531405,'38efe0df-8b06-4f8d-b4bf-2c9d5c0ac9ab','3dfbcc35-c2f5-4606-b6be-2df16e758652','0870a868-7b8b-467d-85f5-f87dd348c8fb',NULL,NULL,NULL),(80000.00,1,0,1700896531481,1700896531481,'3d16f1f6-946c-4115-91ab-5357f6e4441d','24f6df6c-448f-4e32-87e8-d32b91c96c36','f9831b2f-4678-46c2-8a1a-384ca6a69bf6',NULL,NULL,NULL),(270000.00,3,0,1700896531426,1700896531426,'4bbf322c-3e87-48aa-b28f-262ade5f5de5','6b6f891e-d90f-44cf-982b-2ef4ab1097e5','9fed2ddc-1cce-4ec8-b2c9-b2ea748df754',NULL,NULL,NULL),(200000.00,2,0,1700896531421,1700896531421,'6b14f1f0-383f-4d19-a434-c1affc643a98','6791b9f9-e690-4a81-8797-a9f8afe72a5b','f9831b2f-4678-46c2-8a1a-384ca6a69bf6',NULL,NULL,NULL),(270000.00,3,0,1700896531477,1700896531477,'7bd29b86-0c1e-4d9f-b3ac-690008fb2a62','6b6f891e-d90f-44cf-982b-2ef4ab1097e5','c58dee4b-b2cd-458e-9dc0-9f962598a672',NULL,NULL,NULL),(200000.00,2,0,1700896531473,1700896531473,'80d7b7cd-3367-43ce-b91a-da1d14d76f9c','6791b9f9-e690-4a81-8797-a9f8afe72a5b','945e20eb-3dce-4a06-a055-ce25fd41a2a5',NULL,NULL,NULL),(80000.00,1,0,1700896531430,1700896531430,'9236c103-902e-4c92-8e1d-06cf50fa477a','24f6df6c-448f-4e32-87e8-d32b91c96c36','e6b91c25-4603-462f-aaf1-9f9250de6b42',NULL,NULL,NULL),(80000.00,1,0,1700896531460,1700896531460,'95802a1b-69d9-4631-abd6-cf205d5ab136','2efd6649-bc10-47d9-abcf-7f843ca167b0','3c65230e-95c3-43ed-b11a-b554bf644814',NULL,NULL,NULL),(200000.00,2,0,1700896531375,1700896531375,'97b68795-7665-4b94-a73d-79ae8dfa084b','0daf71d6-b8a3-494c-930a-f0fb479af3aa','f9831b2f-4678-46c2-8a1a-384ca6a69bf6',NULL,NULL,NULL),(200000.00,2,0,1700896531400,1700896531400,'98f1bb16-3522-488d-941c-16bdb3f4a331','3fc840b4-2acd-4596-9d0e-301a5411ca62','bdbbe31d-b03f-4214-abe8-cbaf28e491fc',NULL,NULL,NULL),(280000.00,4,0,1700896531393,1700896531393,'a4adf6c2-5379-4ab2-97eb-27620b119c30','cad2076f-342d-47e5-b619-b9a1428def46','cfb82f94-7d70-49dd-a5c8-3e708a9d0f99',NULL,NULL,NULL),(80000.00,1,0,1700896531443,1700896531443,'a9c6236f-04a8-43e9-93fc-415f5b9e63d4','5607c34b-119c-42b5-8159-3f6cd8494c92','8ec4d6f7-bd97-4c62-b4f5-d9c5e57dd1ba',NULL,NULL,NULL),(280000.00,4,0,1700896531463,1700896531463,'bc31ebc3-8033-4799-bd1f-d817b33be851','0deb6d13-4526-436f-9711-87d4390fd320','389292dc-0428-46df-9921-de0e70d44c84',NULL,NULL,NULL),(280000.00,4,0,1700896531415,1700896531415,'cb558b8f-8e10-4920-a84e-c86e5484e51c','0deb6d13-4526-436f-9711-87d4390fd320','76a8e51c-e5b2-49a6-9ea6-ae193cbf6f17',NULL,NULL,NULL),(200000.00,2,0,1700896531434,1700896531435,'d8c2299a-c765-4d9d-82f8-2cce7e37efcd','0daf71d6-b8a3-494c-930a-f0fb479af3aa','87c22cf9-7328-4fb7-8149-07c8f47f23d5',NULL,NULL,NULL),(120000.00,2,0,1700896531418,1700896531418,'e3533370-d8a2-4923-bb4e-ef2c38eb3d73','9db01685-30c1-4646-a0e9-75fa2e951d4f','0fd221c7-e4f1-42a0-8c3f-26ed20f136f6',NULL,NULL,NULL),(280000.00,4,0,1700896531446,1700896531446,'f425579c-f9fd-4ecc-b583-0dbc1f2468d9','cad2076f-342d-47e5-b619-b9a1428def46','b3b653e1-bfa0-42c0-9626-1e1a811adb89',NULL,NULL,NULL),(270000.00,3,0,1700896531438,1700896531438,'f8ba7275-e312-4fcb-8440-53a129248751','feeb8afc-2a30-46d8-908d-f5ea6f8b4f9b','2aeed77c-ca44-4521-b26f-0764f3768f6f',NULL,NULL,NULL);
/*!40000 ALTER TABLE `bill_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_history`
--

DROP TABLE IF EXISTS `bill_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_history` (
  `status_bill` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_account` varchar(36) DEFAULT NULL,
  `id_bill` varchar(36) DEFAULT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqbkpylra0ub5ro0nlgp0ed8pu` (`id_account`),
  KEY `FKs3bxwm3kx9ats78kht029sgi6` (`id_bill`),
  CONSTRAINT `FKqbkpylra0ub5ro0nlgp0ed8pu` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`),
  CONSTRAINT `FKs3bxwm3kx9ats78kht029sgi6` FOREIGN KEY (`id_bill`) REFERENCES `bill` (`id`),
  CONSTRAINT `bill_history_chk_1` CHECK ((`status_bill` between 0 and 12))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_history`
--

LOCK TABLES `bill_history` WRITE;
/*!40000 ALTER TABLE `bill_history` DISABLE KEYS */;
INSERT INTO `bill_history` VALUES (2,1700896531746,1700896531746,'010e0e8b-17e8-4380-8193-7ae5437a1725','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','3fc840b4-2acd-4596-9d0e-301a5411ca62','Xac nhan don hang',NULL,NULL),(2,1700896531677,1700896531677,'0265508e-94d2-42e1-83bd-5d449fd1dce7','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','feeb8afc-2a30-46d8-908d-f5ea6f8b4f9b','Xac nhan don hang',NULL,NULL),(7,1700896531665,1700896531665,'06e361aa-251a-4fe0-8ff4-9588926e4d8c','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','0daf71d6-b8a3-494c-930a-f0fb479af3aa','Hoan thanh',NULL,NULL),(2,1700896531647,1700896531647,'0841aeb4-a516-4e2c-afbe-c0771f0713da','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','0daf71d6-b8a3-494c-930a-f0fb479af3aa','Xac nhan don hang',NULL,NULL),(5,1700896531742,1700896531742,'1c6a5b5f-03c7-4dd1-8588-7a28a93a50b4',NULL,'3fc840b4-2acd-4596-9d0e-301a5411ca62','Thanh toan',NULL,NULL),(4,1700896531687,1700896531687,'2cca2ac3-8a37-4223-a08c-a227e6e2f6a0','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','feeb8afc-2a30-46d8-908d-f5ea6f8b4f9b','Da giao hang',NULL,NULL),(0,1700896531831,1700896531831,'3bafdee7-d5e3-44c3-8cbf-b4560f28b734',NULL,'24f6df6c-448f-4e32-87e8-d32b91c96c36','Huy don',NULL,NULL),(1,1700896531673,1700896531673,'457574bf-03b3-422c-ab57-d4f30338f62f',NULL,'feeb8afc-2a30-46d8-908d-f5ea6f8b4f9b','Da thanh toan',NULL,NULL),(1,1700896531827,1700896531827,'526d5552-1a06-4572-821a-938e415ea87f',NULL,'24f6df6c-448f-4e32-87e8-d32b91c96c36','Tao don',NULL,NULL),(2,1700896531727,1700896531727,'5455f8e8-11e9-4669-82d9-391f5a767272','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','cad2076f-342d-47e5-b619-b9a1428def46','Xac nhan don hang',NULL,NULL),(1,1700896531738,1700896531738,'59f8d8a9-7058-4299-9904-ff4d48b3236d',NULL,'3fc840b4-2acd-4596-9d0e-301a5411ca62','Tạo đơn hàng',NULL,NULL),(3,1700896531651,1700896531651,'5f4ff148-c542-4ba3-93f8-b23ea4be877e','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','0daf71d6-b8a3-494c-930a-f0fb479af3aa','Don hang dang giao den ban',NULL,NULL),(2,1700896531706,1700896531706,'6dc8f929-c2f2-4d98-a52f-fb774f71e0b9','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','5607c34b-119c-42b5-8159-3f6cd8494c92','Xac nhan don hang',NULL,NULL),(2,1700896531817,1700896531817,'7005f722-e7f2-45da-858e-39af826793f1','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','6b6f891e-d90f-44cf-982b-2ef4ab1097e5','Da xac nhan',NULL,NULL),(1,1700896531812,1700896531812,'74b63ca9-0da5-4df4-856d-5754b2337d13','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','6b6f891e-d90f-44cf-982b-2ef4ab1097e5','Tao don',NULL,NULL),(3,1700896531712,1700896531712,'843302ed-e082-4180-b9c4-3a7e57439ec6','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','5607c34b-119c-42b5-8159-3f6cd8494c92','Don hang dang giao den ban',NULL,NULL),(2,1700896531800,1700896531800,'84f257f0-639a-4330-bea3-3d1997a452ba','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','6791b9f9-e690-4a81-8797-a9f8afe72a5b','Da xac nhan',NULL,NULL),(1,1700896531795,1700896531795,'861f8482-859e-4933-9285-431458b7a948','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','6791b9f9-e690-4a81-8797-a9f8afe72a5b','Tao don',NULL,NULL),(1,1700896531643,1700896531643,'8aa2b3cf-c86b-49e3-b04c-2f159848b699',NULL,'0daf71d6-b8a3-494c-930a-f0fb479af3aa','Tạo đơn hàng',NULL,NULL),(1,1700896531758,1700896531758,'8f02decb-39f1-449b-978d-cd001c4212b2','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','0deb6d13-4526-436f-9711-87d4390fd320','Tao don',NULL,NULL),(5,1700896531701,1700896531701,'909c41d5-24f2-4afe-b8c9-86779a3d2160',NULL,'5607c34b-119c-42b5-8159-3f6cd8494c92','Thanh toan',NULL,NULL),(2,1700896531789,1700896531789,'91a5d83c-fcfe-4379-b912-19ecc51ebaae','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','9db01685-30c1-4646-a0e9-75fa2e951d4f','Da xac nhan',NULL,NULL),(1,1700896531698,1700896531698,'9b991ed6-3e47-41b5-83d8-88f3e8ac1d49',NULL,'5607c34b-119c-42b5-8159-3f6cd8494c92','Tạo đơn hàng',NULL,NULL),(1,1700896531717,1700896531717,'9c1ab3eb-051b-473e-8ac8-621428994a12',NULL,'cad2076f-342d-47e5-b619-b9a1428def46','Tạo đơn hàng',NULL,NULL),(5,1700896531806,1700896531806,'9ced1a44-e6d7-48ab-b140-374c944f17c8','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','6791b9f9-e690-4a81-8797-a9f8afe72a5b','Da thanh toan',NULL,NULL),(7,1700896531693,1700896531693,'b312ee71-5652-49d0-8157-0c70637391f7','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','feeb8afc-2a30-46d8-908d-f5ea6f8b4f9b','Hoan thanh',NULL,NULL),(5,1700896531661,1700896531661,'b5a95ba0-05a8-4541-939a-11d9e5a60bc6','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','0daf71d6-b8a3-494c-930a-f0fb479af3aa','Da thanh toan',NULL,NULL),(1,1700896531754,1700896531754,'bde01d10-25be-4b98-b57d-e2b551696cb0',NULL,'2efd6649-bc10-47d9-abcf-7f843ca167b0','Tao don hang',NULL,NULL),(3,1700896531733,1700896531733,'c33d4938-9732-4c8c-b98d-7990056c9af3','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','cad2076f-342d-47e5-b619-b9a1428def46','Don hang dang giao den ban',NULL,NULL),(1,1700896531784,1700896531784,'d79d15e1-2cce-4b5d-8830-cb9a9892cfd9','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','9db01685-30c1-4646-a0e9-75fa2e951d4f','Tao don',NULL,NULL),(5,1700896531723,1700896531723,'de838267-ffe1-4a3b-a853-c9de4c9c3726',NULL,'cad2076f-342d-47e5-b619-b9a1428def46','Thanh toan',NULL,NULL),(1,1700896531670,1700896531670,'e66b24ad-88ec-49fe-a042-907ca05fb168',NULL,'feeb8afc-2a30-46d8-908d-f5ea6f8b4f9b','Tạo đơn hàng',NULL,NULL),(3,1700896531682,1700896531682,'e894675a-7ab7-4ae8-b67b-5a19b6d5be8b','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','feeb8afc-2a30-46d8-908d-f5ea6f8b4f9b','Don hang dang giao den ban',NULL,NULL),(1,1700896531750,1700896531750,'f26bda6a-b129-4b00-b1ad-4af5c1b2cbeb',NULL,'3dfbcc35-c2f5-4606-b6be-2df16e758652','Tao don hang',NULL,NULL),(5,1700896531822,1700896531822,'f90ecd7c-2e55-429e-a4ab-20afab2affc1','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','6b6f891e-d90f-44cf-982b-2ef4ab1097e5','Da thanh toan',NULL,NULL),(4,1700896531656,1700896531656,'fc214709-500a-41ae-a4a6-e7302c5b5a6a','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','0daf71d6-b8a3-494c-930a-f0fb479af3aa','Da giao hang',NULL,NULL);
/*!40000 ALTER TABLE `bill_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `deleted` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_rdxh7tq2xs66r485cc8dkxt77` (`name`),
  CONSTRAINT `brand_chk_1` CHECK ((`deleted` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (0,1700896530975,1700896530975,'108b3d78-a4a4-4c67-8717-d6b4b2d4d6fb','Nike',NULL,NULL),(0,1700896530988,1700896530988,'2e9439cb-adc0-4c32-83f4-0714c8903405','New Balance',NULL,NULL),(0,1700896530982,1700896530982,'6747177e-a653-4105-8952-6ddd426dbf65','Puma',NULL,NULL),(0,1700896530985,1700896530985,'d0c8243d-53d6-4c6a-8567-37b3b9d3c472','Reebok',NULL,NULL),(0,1700896530979,1700896530979,'f4667e80-aff8-4a83-b5b0-33408006832c','Adidas',NULL,NULL);
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `quantity` int DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_account` varchar(36) DEFAULT NULL,
  `id_product_detail` varchar(36) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKldb5k6mk67oudki8jgt7ri03h` (`id_account`),
  KEY `FKevtdgh47poc3xo2c7gj4jyumk` (`id_product_detail`),
  CONSTRAINT `FKevtdgh47poc3xo2c7gj4jyumk` FOREIGN KEY (`id_product_detail`) REFERENCES `product_detail` (`id`),
  CONSTRAINT `FKldb5k6mk67oudki8jgt7ri03h` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `deleted` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_46ccwnsi9409t36lurvtyljak` (`name`),
  CONSTRAINT `category_chk_1` CHECK ((`deleted` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (0,1700896531024,1700896531024,'1bbfb548-7905-4d91-b054-e6b7d225cfb4','Giày thể thao',NULL,NULL),(0,1700896531022,1700896531022,'65140550-7497-415b-a19b-a3a2b970df1c','Giày nữ',NULL,NULL),(0,1700896531017,1700896531017,'6d99288c-a90a-4b71-9447-447f1dc87f8a','Giày thời trang',NULL,NULL),(0,1700896531019,1700896531019,'86dbdb1e-e387-4e68-8cef-bf29d00f432b','Giày nam',NULL,NULL),(0,1700896531013,1700896531013,'cd0399ba-645f-431d-af79-79954e9ea273','Giày lười',NULL,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `deleted` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_cbnc5ktj6whhh690w32k8cyh8` (`code`),
  CONSTRAINT `color_chk_1` CHECK ((`deleted` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (0,1700896531002,1700896531002,'#0000FF','13ce05c7-48cc-460e-8770-ba265350c8d7',NULL,'Blue',NULL),(0,1700896530993,1700896530994,'#8B0016','5c2e624a-eb8e-492f-b462-072818487bca',NULL,'Red Devil',NULL),(0,1700896531009,1700896531009,'#FFA500','6dc1cc96-285b-4293-a917-2f3a71d6caa1',NULL,'Orange',NULL),(0,1700896530998,1700896530998,'#00FF00','84dab6a1-3449-4f08-8e39-9f1b4c0ad30c',NULL,'Green',NULL),(0,1700896531006,1700896531006,'#FFFF00','b70edd89-6faa-4ea8-8b43-d5ce7b808e60',NULL,'Yellow',NULL);
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_voucher`
--

DROP TABLE IF EXISTS `customer_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_voucher` (
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_account` varchar(36) DEFAULT NULL,
  `id_voucher` varchar(36) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKppdpoeva80npnovkxo9wc1090` (`id_account`),
  KEY `FKsogb0anib0u47526p44fokyhn` (`id_voucher`),
  CONSTRAINT `FKppdpoeva80npnovkxo9wc1090` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`),
  CONSTRAINT `FKsogb0anib0u47526p44fokyhn` FOREIGN KEY (`id_voucher`) REFERENCES `voucher` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_voucher`
--

LOCK TABLES `customer_voucher` WRITE;
/*!40000 ALTER TABLE `customer_voucher` DISABLE KEYS */;
INSERT INTO `customer_voucher` VALUES (1700896530772,1700896530772,'ede9668d-8b7c-4a49-8be1-64118057b770','6f4d915d-5c2d-44e7-91ab-01c4ba253e2b','523dc415-61a0-43ea-9421-753cf8e0b6b8',NULL,NULL);
/*!40000 ALTER TABLE `customer_voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `default_image` bit(1) DEFAULT NULL,
  `deleted` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_product_detail` varchar(36) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs4kpgowlj28nnxbw7r2gk3m9r` (`id_product_detail`),
  CONSTRAINT `FKs4kpgowlj28nnxbw7r2gk3m9r` FOREIGN KEY (`id_product_detail`) REFERENCES `product_detail` (`id`),
  CONSTRAINT `image_chk_1` CHECK ((`deleted` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (_binary '',0,1700896531276,1700896531276,'0e4f255b-2c0d-450e-9f84-c5f68dbeecc1','b6e8687a-a4d1-463b-89a8-9e25ed003811',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531336,1700896531336,'13101d3e-4a8a-4235-beaa-4f21027c4857','9ed2e703-d7af-45cb-a446-59ae21e9fdee',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531357,1700896531357,'1a5cbe43-d7a5-46df-8f82-7e60f562dbce','389292dc-0428-46df-9921-de0e70d44c84',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531352,1700896531352,'1c6937e6-182b-4cd2-a6fe-392901a76119','3c65230e-95c3-43ed-b11a-b554bf644814',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531347,1700896531347,'1e302012-960b-4535-9975-5bf594ddd2d0','a2bbc224-3ca4-4f30-be6d-0838a4023948',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531291,1700896531291,'1e86360a-7ea4-4d35-bdcd-07e2c2718213','76a8e51c-e5b2-49a6-9ea6-ae193cbf6f17',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531341,1700896531341,'2aa7db49-5550-45a2-9833-586c4afa4645','302d9c7c-8da2-457e-a120-7cdf106ed34f',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531324,1700896531324,'3a56a966-2df8-4863-8c4d-c7a7b9d24fd4','8ec4d6f7-bd97-4c62-b4f5-d9c5e57dd1ba',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531272,1700896531272,'52a92939-bda6-4b92-91f6-6475bcdce76a','cfb82f94-7d70-49dd-a5c8-3e708a9d0f99',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531362,1700896531362,'5a28688b-f220-4f80-8518-b6acaefdade2','b67d174d-2147-4e5a-8687-aeca9cb33e0b',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531258,1700896531258,'7c3c2571-be98-4038-9144-b1358dc1c876','f9831b2f-4678-46c2-8a1a-384ca6a69bf6',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531319,1700896531320,'8a786c36-38d1-48bd-989b-c2e225fbc8c5','2aeed77c-ca44-4521-b26f-0764f3768f6f',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531371,1700896531371,'93971883-f44b-4980-b321-53b5654eca98','c58dee4b-b2cd-458e-9dc0-9f962598a672',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531309,1700896531309,'9b7e61e5-3cb9-43e6-b5b7-fb8ab5945eb2','b4609086-7363-4eb6-9577-865ddcf792be',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531366,1700896531366,'a3689c63-6b0f-431e-b2d4-58ae33961199','945e20eb-3dce-4a06-a055-ce25fd41a2a5',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531268,1700896531268,'b0bf89aa-4034-411c-965d-507c287c3d6d','e6b91c25-4603-462f-aaf1-9f9250de6b42',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531264,1700896531264,'b2d95334-3525-4449-a576-e15197977c29','9fed2ddc-1cce-4ec8-b2c9-b2ea748df754',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531280,1700896531280,'b44f85aa-e7de-45a1-9f65-8c3041a89708','bdbbe31d-b03f-4214-abe8-cbaf28e491fc',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531295,1700896531295,'c3bd399f-40d8-48a6-a0ef-c5f8cd0f4f7c','0fd221c7-e4f1-42a0-8c3f-26ed20f136f6',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531330,1700896531330,'cc51572f-95fb-483c-9372-da01d575d170','b3b653e1-bfa0-42c0-9626-1e1a811adb89',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531288,1700896531288,'d63a36e4-748b-44f2-b1dd-986d51fe6ce6','464e5393-4765-4ed8-9fbf-ad8694fbbc3e',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531315,1700896531315,'e386f36a-31dc-437e-9127-45afbdfdf13e','87c22cf9-7328-4fb7-8149-07c8f47f23d5',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531299,1700896531299,'e5226c62-f63e-4d85-b3f3-38cddec541d4','52097237-375c-46ee-a6c5-46235b92b31f',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531284,1700896531284,'e6a1e678-1bbd-48cd-9e86-f619a8acd70f','0870a868-7b8b-467d-85f5-f87dd348c8fb',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700896531303,1700896531304,'ebb6d100-b806-45b5-a703-def8f8d91d6d','7948e590-4709-4569-a2c0-cf0d7aa16b51',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `deleted` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_j8lh9456buiw3bl8pg6kbuwln` (`name`),
  CONSTRAINT `material_chk_1` CHECK ((`deleted` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (0,1700896530968,1700896530968,'0ea1b64e-0789-4d49-aa6e-0d70caf624f8','Nylon',NULL,NULL),(0,1700896530965,1700896530965,'101eac18-c3d8-4315-8677-de57844f24b7','Vải canvas',NULL,NULL),(0,1700896530971,1700896530971,'27b9cf61-c909-40e5-bde4-939dacf84264','Suede',NULL,NULL),(0,1700896530958,1700896530958,'5ffb77d8-7b48-4fe6-8260-f1c1a3133d96','Da bò',NULL,NULL),(0,1700896530962,1700896530962,'8196d5de-11d3-4b1d-8ec3-bb7ae7cc8f73','Da lộn',NULL,NULL);
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_account` varchar(36) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `id_redirect` varchar(255) DEFAULT NULL,
  `status` enum('HOAT_DONG','NGUNG_HOAT_DONG') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` enum('HOA_DON') DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK10kjqa3c2i0d2j7gokgru42ul` (`id_account`),
  CONSTRAINT `FK10kjqa3c2i0d2j7gokgru42ul` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `deleted` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_jmivyxk9rmgysrmsqw15lqr5b` (`name`),
  CONSTRAINT `product_chk_1` CHECK ((`deleted` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (0,1700896530944,1700896530944,'d3368758-cdd7-4ff6-b78e-528c73fff9bf','Nike Air Force 1',NULL,NULL),(0,1700896530954,1700896530954,'e661ca62-278d-486b-aa75-34f2320b70aa','New Balance 990',NULL,NULL),(0,1700896530951,1700896530951,'f133d20d-666a-4a01-a827-9aad2a4b582c','Puma Suede',NULL,NULL),(0,1700896530948,1700896530948,'f4cd4b23-a09d-48d7-aa1d-2b97b7230375','Converse Chuck Taylor',NULL,NULL),(0,1700896530939,1700896530939,'faaa3694-30df-4cd9-b590-6e0643662a05','Adidas Superstar',NULL,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_detail` (
  `amount` int DEFAULT NULL,
  `deleted` tinyint DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_brand` varchar(36) DEFAULT NULL,
  `id_category` varchar(36) DEFAULT NULL,
  `id_color` varchar(36) DEFAULT NULL,
  `id_material` varchar(36) DEFAULT NULL,
  `id_product` varchar(36) DEFAULT NULL,
  `id_size` varchar(36) DEFAULT NULL,
  `id_sole` varchar(36) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsojh20lw9m01kycyhqw07hfla` (`id_brand`),
  KEY `FK7qtog5nlueu3wt2cyc1n4x8t9` (`id_category`),
  KEY `FKhgxo03bmh10q3vje0hofswwhc` (`id_color`),
  KEY `FKb421xx5lew4qo2y1upk69e3ld` (`id_material`),
  KEY `FKiyk9npasmucg0xxq9ooc31g04` (`id_product`),
  KEY `FKklell1kj4i5npdyb7un3n55nj` (`id_size`),
  KEY `FKfj5qpl72ghseei7k0pkr7tkev` (`id_sole`),
  CONSTRAINT `FK7qtog5nlueu3wt2cyc1n4x8t9` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`),
  CONSTRAINT `FKb421xx5lew4qo2y1upk69e3ld` FOREIGN KEY (`id_material`) REFERENCES `material` (`id`),
  CONSTRAINT `FKfj5qpl72ghseei7k0pkr7tkev` FOREIGN KEY (`id_sole`) REFERENCES `sole` (`id`),
  CONSTRAINT `FKhgxo03bmh10q3vje0hofswwhc` FOREIGN KEY (`id_color`) REFERENCES `color` (`id`),
  CONSTRAINT `FKiyk9npasmucg0xxq9ooc31g04` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  CONSTRAINT `FKklell1kj4i5npdyb7un3n55nj` FOREIGN KEY (`id_size`) REFERENCES `size` (`id`),
  CONSTRAINT `FKsojh20lw9m01kycyhqw07hfla` FOREIGN KEY (`id_brand`) REFERENCES `brand` (`id`),
  CONSTRAINT `product_detail_chk_1` CHECK ((`deleted` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

LOCK TABLES `product_detail` WRITE;
/*!40000 ALTER TABLE `product_detail` DISABLE KEYS */;
INSERT INTO `product_detail` VALUES (240,0,48000.00,1000,1700896531078,1700896531078,'PD007','0870a868-7b8b-467d-85f5-f87dd348c8fb','f4667e80-aff8-4a83-b5b0-33408006832c','6d99288c-a90a-4b71-9447-447f1dc87f8a','84dab6a1-3449-4f08-8e39-9f1b4c0ad30c','8196d5de-11d3-4b1d-8ec3-bb7ae7cc8f73','d3368758-cdd7-4ff6-b78e-528c73fff9bf','6308ffdd-85e2-4998-8036-0879fa45599d','305d8b13-29df-49c1-a87b-71ea89d33af9','Mô tả sản phẩm 7',NULL,NULL),(200,0,40000.00,1000,1700896531105,1700896531105,'PD010','0fd221c7-e4f1-42a0-8c3f-26ed20f136f6','2e9439cb-adc0-4c32-83f4-0714c8903405','1bbfb548-7905-4d91-b054-e6b7d225cfb4','6dc1cc96-285b-4293-a917-2f3a71d6caa1','27b9cf61-c909-40e5-bde4-939dacf84264','e661ca62-278d-486b-aa75-34f2320b70aa','e33431e6-08dd-4f71-a24f-f42891ce104b','6025b8d9-eb57-4a19-9ee3-ce04cd20af19','Mô tả sản phẩm 10',NULL,NULL),(80,0,15000.00,1000,1700896531153,1700896531153,'PD015','2aeed77c-ca44-4521-b26f-0764f3768f6f','2e9439cb-adc0-4c32-83f4-0714c8903405','1bbfb548-7905-4d91-b054-e6b7d225cfb4','6dc1cc96-285b-4293-a917-2f3a71d6caa1','27b9cf61-c909-40e5-bde4-939dacf84264','e661ca62-278d-486b-aa75-34f2320b70aa','c9676c3a-6054-42e2-805f-2d3867d849d7','d6f05e7f-6dfb-4fb5-946f-367bba910c9f','Mô tả sản phẩm 15',NULL,NULL),(90,0,19000.00,1000,1700896531198,1700896531198,'PD019','302d9c7c-8da2-457e-a120-7cdf106ed34f','f4667e80-aff8-4a83-b5b0-33408006832c','6d99288c-a90a-4b71-9447-447f1dc87f8a','84dab6a1-3449-4f08-8e39-9f1b4c0ad30c','8196d5de-11d3-4b1d-8ec3-bb7ae7cc8f73','d3368758-cdd7-4ff6-b78e-528c73fff9bf','6308ffdd-85e2-4998-8036-0879fa45599d','2be39198-9b64-456c-ba28-4cb0ca356d22','Mô tả sản phẩm 19',NULL,NULL),(110,0,22000.00,1000,1700896531230,1700896531230,'PD022','389292dc-0428-46df-9921-de0e70d44c84','2e9439cb-adc0-4c32-83f4-0714c8903405','1bbfb548-7905-4d91-b054-e6b7d225cfb4','84dab6a1-3449-4f08-8e39-9f1b4c0ad30c','27b9cf61-c909-40e5-bde4-939dacf84264','e661ca62-278d-486b-aa75-34f2320b70aa','e33431e6-08dd-4f71-a24f-f42891ce104b','d6f05e7f-6dfb-4fb5-946f-367bba910c9f','Mô tả sản phẩm 22',NULL,NULL),(100,0,21000.00,1000,1700896531221,1700896531221,'PD021','3c65230e-95c3-43ed-b11a-b554bf644814','d0c8243d-53d6-4c6a-8567-37b3b9d3c472','65140550-7497-415b-a19b-a3a2b970df1c','5c2e624a-eb8e-492f-b462-072818487bca','0ea1b64e-0789-4d49-aa6e-0d70caf624f8','f133d20d-666a-4a01-a827-9aad2a4b582c','887aa3e9-1a27-424e-87b9-8629c59f6a67','305d8b13-29df-49c1-a87b-71ea89d33af9','Mô tả sản phẩm 21',NULL,NULL),(250,0,50000.00,1000,1700896531087,1700896531087,'PD008','464e5393-4765-4ed8-9fbf-ad8694fbbc3e','6747177e-a653-4105-8952-6ddd426dbf65','86dbdb1e-e387-4e68-8cef-bf29d00f432b','13ce05c7-48cc-460e-8770-ba265350c8d7','101eac18-c3d8-4315-8677-de57844f24b7','f4cd4b23-a09d-48d7-aa1d-2b97b7230375','26894ce4-0306-4c35-8b41-cacf431a3e2e','dc7f6b36-d5e2-48bc-a3d6-00be205d7cf1','Mô tả sản phẩm 8',NULL,NULL),(180,0,35000.00,1000,1700896531115,1700896531116,'PD011','52097237-375c-46ee-a6c5-46235b92b31f','108b3d78-a4a4-4c67-8717-d6b4b2d4d6fb','cd0399ba-645f-431d-af79-79954e9ea273','5c2e624a-eb8e-492f-b462-072818487bca','5ffb77d8-7b48-4fe6-8260-f1c1a3133d96','faaa3694-30df-4cd9-b590-6e0643662a05','e33431e6-08dd-4f71-a24f-f42891ce104b','6025b8d9-eb57-4a19-9ee3-ce04cd20af19','Mô tả sản phẩm 11',NULL,NULL),(230,0,45000.00,1000,1700896531096,1700896531096,'PD009','76a8e51c-e5b2-49a6-9ea6-ae193cbf6f17','d0c8243d-53d6-4c6a-8567-37b3b9d3c472','65140550-7497-415b-a19b-a3a2b970df1c','b70edd89-6faa-4ea8-8b43-d5ce7b808e60','0ea1b64e-0789-4d49-aa6e-0d70caf624f8','f133d20d-666a-4a01-a827-9aad2a4b582c','887aa3e9-1a27-424e-87b9-8629c59f6a67','2be39198-9b64-456c-ba28-4cb0ca356d22','Mô tả sản phẩm 9',NULL,NULL),(150,0,30000.00,1000,1700896531124,1700896531124,'PD012','7948e590-4709-4569-a2c0-cf0d7aa16b51','f4667e80-aff8-4a83-b5b0-33408006832c','6d99288c-a90a-4b71-9447-447f1dc87f8a','84dab6a1-3449-4f08-8e39-9f1b4c0ad30c','8196d5de-11d3-4b1d-8ec3-bb7ae7cc8f73','d3368758-cdd7-4ff6-b78e-528c73fff9bf','887aa3e9-1a27-424e-87b9-8629c59f6a67','2be39198-9b64-456c-ba28-4cb0ca356d22','Mô tả sản phẩm 12',NULL,NULL),(100,0,20000.00,1000,1700896531143,1700896531143,'PD014','87c22cf9-7328-4fb7-8149-07c8f47f23d5','d0c8243d-53d6-4c6a-8567-37b3b9d3c472','65140550-7497-415b-a19b-a3a2b970df1c','b70edd89-6faa-4ea8-8b43-d5ce7b808e60','0ea1b64e-0789-4d49-aa6e-0d70caf624f8','f133d20d-666a-4a01-a827-9aad2a4b582c','6308ffdd-85e2-4998-8036-0879fa45599d','305d8b13-29df-49c1-a87b-71ea89d33af9','Mô tả sản phẩm 14',NULL,NULL),(60,0,12000.00,1000,1700896531163,1700896531163,'PD016','8ec4d6f7-bd97-4c62-b4f5-d9c5e57dd1ba','108b3d78-a4a4-4c67-8717-d6b4b2d4d6fb','cd0399ba-645f-431d-af79-79954e9ea273','5c2e624a-eb8e-492f-b462-072818487bca','27b9cf61-c909-40e5-bde4-939dacf84264','faaa3694-30df-4cd9-b590-6e0643662a05','c9676c3a-6054-42e2-805f-2d3867d849d7','6025b8d9-eb57-4a19-9ee3-ce04cd20af19','Mô tả sản phẩm 16',NULL,NULL),(120,0,24000.00,1000,1700896531245,1700896531245,'PD024','945e20eb-3dce-4a06-a055-ce25fd41a2a5','f4667e80-aff8-4a83-b5b0-33408006832c','6d99288c-a90a-4b71-9447-447f1dc87f8a','5c2e624a-eb8e-492f-b462-072818487bca','8196d5de-11d3-4b1d-8ec3-bb7ae7cc8f73','d3368758-cdd7-4ff6-b78e-528c73fff9bf','6308ffdd-85e2-4998-8036-0879fa45599d','2be39198-9b64-456c-ba28-4cb0ca356d22','Mô tả sản phẩm 24',NULL,NULL),(90,0,18000.00,1000,1700896531186,1700896531186,'PD018','9ed2e703-d7af-45cb-a446-59ae21e9fdee','108b3d78-a4a4-4c67-8717-d6b4b2d4d6fb','cd0399ba-645f-431d-af79-79954e9ea273','5c2e624a-eb8e-492f-b462-072818487bca','101eac18-c3d8-4315-8677-de57844f24b7','faaa3694-30df-4cd9-b590-6e0643662a05','c9676c3a-6054-42e2-805f-2d3867d849d7','6025b8d9-eb57-4a19-9ee3-ce04cd20af19','Mô tả sản phẩm 18',NULL,NULL),(450,0,90000.00,1000,1700896531036,1700896531036,'PD002','9fed2ddc-1cce-4ec8-b2c9-b2ea748df754','f4667e80-aff8-4a83-b5b0-33408006832c','6d99288c-a90a-4b71-9447-447f1dc87f8a','84dab6a1-3449-4f08-8e39-9f1b4c0ad30c','8196d5de-11d3-4b1d-8ec3-bb7ae7cc8f73','d3368758-cdd7-4ff6-b78e-528c73fff9bf','6308ffdd-85e2-4998-8036-0879fa45599d','2be39198-9b64-456c-ba28-4cb0ca356d22','Mô tả sản phẩm 2',NULL,NULL),(100,0,20000.00,1000,1700896531209,1700896531209,'PD020','a2bbc224-3ca4-4f30-be6d-0838a4023948','6747177e-a653-4105-8952-6ddd426dbf65','86dbdb1e-e387-4e68-8cef-bf29d00f432b','13ce05c7-48cc-460e-8770-ba265350c8d7','5ffb77d8-7b48-4fe6-8260-f1c1a3133d96','f4cd4b23-a09d-48d7-aa1d-2b97b7230375','26894ce4-0306-4c35-8b41-cacf431a3e2e','dc7f6b36-d5e2-48bc-a3d6-00be205d7cf1','Mô tả sản phẩm 20',NULL,NULL),(50,0,10000.00,1000,1700896531176,1700896531176,'PD017','b3b653e1-bfa0-42c0-9626-1e1a811adb89','f4667e80-aff8-4a83-b5b0-33408006832c','6d99288c-a90a-4b71-9447-447f1dc87f8a','84dab6a1-3449-4f08-8e39-9f1b4c0ad30c','0ea1b64e-0789-4d49-aa6e-0d70caf624f8','d3368758-cdd7-4ff6-b78e-528c73fff9bf','6308ffdd-85e2-4998-8036-0879fa45599d','2be39198-9b64-456c-ba28-4cb0ca356d22','Mô tả sản phẩm 17',NULL,NULL),(130,0,25000.00,1000,1700896531134,1700896531134,'PD013','b4609086-7363-4eb6-9577-865ddcf792be','6747177e-a653-4105-8952-6ddd426dbf65','86dbdb1e-e387-4e68-8cef-bf29d00f432b','13ce05c7-48cc-460e-8770-ba265350c8d7','101eac18-c3d8-4315-8677-de57844f24b7','f4cd4b23-a09d-48d7-aa1d-2b97b7230375','26894ce4-0306-4c35-8b41-cacf431a3e2e','dc7f6b36-d5e2-48bc-a3d6-00be205d7cf1','Mô tả sản phẩm 13',NULL,NULL),(110,0,23000.00,1000,1700896531238,1700896531238,'PD023','b67d174d-2147-4e5a-8687-aeca9cb33e0b','108b3d78-a4a4-4c67-8717-d6b4b2d4d6fb','cd0399ba-645f-431d-af79-79954e9ea273','13ce05c7-48cc-460e-8770-ba265350c8d7','5ffb77d8-7b48-4fe6-8260-f1c1a3133d96','faaa3694-30df-4cd9-b590-6e0643662a05','c9676c3a-6054-42e2-805f-2d3867d849d7','6025b8d9-eb57-4a19-9ee3-ce04cd20af19','Mô tả sản phẩm 23',NULL,NULL),(300,0,60000.00,1000,1700896531060,1700896531060,'PD005','b6e8687a-a4d1-463b-89a8-9e25ed003811','2e9439cb-adc0-4c32-83f4-0714c8903405','1bbfb548-7905-4d91-b054-e6b7d225cfb4','6dc1cc96-285b-4293-a917-2f3a71d6caa1','27b9cf61-c909-40e5-bde4-939dacf84264','e661ca62-278d-486b-aa75-34f2320b70aa','e33431e6-08dd-4f71-a24f-f42891ce104b','d6f05e7f-6dfb-4fb5-946f-367bba910c9f','Mô tả sản phẩm 5',NULL,NULL),(280,0,55000.00,1000,1700896531069,1700896531069,'PD006','bdbbe31d-b03f-4214-abe8-cbaf28e491fc','108b3d78-a4a4-4c67-8717-d6b4b2d4d6fb','cd0399ba-645f-431d-af79-79954e9ea273','5c2e624a-eb8e-492f-b462-072818487bca','5ffb77d8-7b48-4fe6-8260-f1c1a3133d96','faaa3694-30df-4cd9-b590-6e0643662a05','c9676c3a-6054-42e2-805f-2d3867d849d7','d6f05e7f-6dfb-4fb5-946f-367bba910c9f','Mô tả sản phẩm 6',NULL,NULL),(120,0,25000.00,1000,1700896531251,1700896531251,'PD025','c58dee4b-b2cd-458e-9dc0-9f962598a672','6747177e-a653-4105-8952-6ddd426dbf65','86dbdb1e-e387-4e68-8cef-bf29d00f432b','5c2e624a-eb8e-492f-b462-072818487bca','101eac18-c3d8-4315-8677-de57844f24b7','f4cd4b23-a09d-48d7-aa1d-2b97b7230375','26894ce4-0306-4c35-8b41-cacf431a3e2e','dc7f6b36-d5e2-48bc-a3d6-00be205d7cf1','Mô tả sản phẩm 25',NULL,NULL),(350,0,70000.00,1000,1700896531051,1700896531051,'PD004','cfb82f94-7d70-49dd-a5c8-3e708a9d0f99','d0c8243d-53d6-4c6a-8567-37b3b9d3c472','65140550-7497-415b-a19b-a3a2b970df1c','b70edd89-6faa-4ea8-8b43-d5ce7b808e60','0ea1b64e-0789-4d49-aa6e-0d70caf624f8','f133d20d-666a-4a01-a827-9aad2a4b582c','887aa3e9-1a27-424e-87b9-8629c59f6a67','305d8b13-29df-49c1-a87b-71ea89d33af9','Mô tả sản phẩm 4',NULL,NULL),(400,0,80000.00,1000,1700896531043,1700896531043,'PD003','e6b91c25-4603-462f-aaf1-9f9250de6b42','6747177e-a653-4105-8952-6ddd426dbf65','86dbdb1e-e387-4e68-8cef-bf29d00f432b','13ce05c7-48cc-460e-8770-ba265350c8d7','101eac18-c3d8-4315-8677-de57844f24b7','f4cd4b23-a09d-48d7-aa1d-2b97b7230375','26894ce4-0306-4c35-8b41-cacf431a3e2e','dc7f6b36-d5e2-48bc-a3d6-00be205d7cf1','Mô tả sản phẩm 3',NULL,NULL),(500,0,100000.00,1000,1700896531027,1700896531027,'PD001','f9831b2f-4678-46c2-8a1a-384ca6a69bf6','108b3d78-a4a4-4c67-8717-d6b4b2d4d6fb','cd0399ba-645f-431d-af79-79954e9ea273','5c2e624a-eb8e-492f-b462-072818487bca','5ffb77d8-7b48-4fe6-8260-f1c1a3133d96','faaa3694-30df-4cd9-b590-6e0643662a05','c9676c3a-6054-42e2-805f-2d3867d849d7','6025b8d9-eb57-4a19-9ee3-ce04cd20af19','Mô tả sản phẩm 1',NULL,NULL);
/*!40000 ALTER TABLE `product_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_promotion`
--

DROP TABLE IF EXISTS `product_promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_promotion` (
  `price_promotion` decimal(38,2) DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_product_detail` varchar(36) DEFAULT NULL,
  `id_promotion` varchar(36) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjdhyc8853tx6j3qspp8gucwol` (`id_product_detail`),
  KEY `FK372vuom85o9xqbipegkymgxjr` (`id_promotion`),
  CONSTRAINT `FK372vuom85o9xqbipegkymgxjr` FOREIGN KEY (`id_promotion`) REFERENCES `promotion` (`id`),
  CONSTRAINT `FKjdhyc8853tx6j3qspp8gucwol` FOREIGN KEY (`id_product_detail`) REFERENCES `product_detail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_promotion`
--

LOCK TABLES `product_promotion` WRITE;
/*!40000 ALTER TABLE `product_promotion` DISABLE KEYS */;
INSERT INTO `product_promotion` VALUES (55.00,1700896531523,1700896531523,'00a59762-bb82-4fe9-b7b9-5cb31fd478b0','9fed2ddc-1cce-4ec8-b2c9-b2ea748df754','edde0af4-ed34-4d9a-b6a7-8f0d9caaeebf',NULL,NULL),(145.00,1700896531619,1700896531619,'040e3ad3-b8bc-4037-a593-f63a65a6232d','a2bbc224-3ca4-4f30-be6d-0838a4023948','046a6b79-6803-4a4f-aa60-be669dd3ae21',NULL,NULL),(120.00,1700896531597,1700896531597,'14b6f8c5-4217-45ac-9dba-217cfc6324f9','2aeed77c-ca44-4521-b26f-0764f3768f6f','9347e706-e8b6-4a11-ad64-343a56ad8080',NULL,NULL),(60.00,1700896531529,1700896531529,'15756515-91fe-41de-9a75-2715f21c52e9','e6b91c25-4603-462f-aaf1-9f9250de6b42','edde0af4-ed34-4d9a-b6a7-8f0d9caaeebf',NULL,NULL),(85.00,1700896531560,1700896531560,'185cd599-60e9-4e00-be4a-563182ae3db5','464e5393-4765-4ed8-9fbf-ad8694fbbc3e','9347e706-e8b6-4a11-ad64-343a56ad8080',NULL,NULL),(160.00,1700896531631,1700896531631,'271029eb-2c6e-430a-9fc7-58e2850dafbc','b67d174d-2147-4e5a-8687-aeca9cb33e0b','14209a24-f4e0-46f8-8a6c-71f96509c3d4',NULL,NULL),(80.00,1700896531548,1700896531548,'2ded65ac-8000-4eea-b6ce-cfe379711ea5','0870a868-7b8b-467d-85f5-f87dd348c8fb','5590225c-a56f-464e-932a-53b117ba2de4',NULL,NULL),(140.00,1700896531615,1700896531615,'30925094-d8e0-44bf-8227-a1b22db6f21d','302d9c7c-8da2-457e-a120-7cdf106ed34f','046a6b79-6803-4a4f-aa60-be669dd3ae21',NULL,NULL),(70.00,1700896531539,1700896531539,'34417264-6b6c-48a5-b4da-ade2c8965454','b6e8687a-a4d1-463b-89a8-9e25ed003811','edde0af4-ed34-4d9a-b6a7-8f0d9caaeebf',NULL,NULL),(150.00,1700896531623,1700896531623,'3c8bde4b-7c1f-4d6a-9200-86dfd43c0690','3c65230e-95c3-43ed-b11a-b554bf644814','14209a24-f4e0-46f8-8a6c-71f96509c3d4',NULL,NULL),(65.00,1700896531534,1700896531534,'5b05460a-8f20-40d0-ac99-4c3aa52c4260','cfb82f94-7d70-49dd-a5c8-3e708a9d0f99','edde0af4-ed34-4d9a-b6a7-8f0d9caaeebf',NULL,NULL),(90.00,1700896531566,1700896531566,'62009bfe-4fb2-4e0d-843f-b052753c84ee','76a8e51c-e5b2-49a6-9ea6-ae193cbf6f17','046a6b79-6803-4a4f-aa60-be669dd3ae21',NULL,NULL),(170.00,1700896531639,1700896531639,'6ac96868-7e8d-44d3-88ca-3ec8f20b7dec','c58dee4b-b2cd-458e-9dc0-9f962598a672','14209a24-f4e0-46f8-8a6c-71f96509c3d4',NULL,NULL),(110.00,1700896531588,1700896531588,'77d27fdd-f53c-439a-9dc2-340aededcaac','b4609086-7363-4eb6-9577-865ddcf792be','9347e706-e8b6-4a11-ad64-343a56ad8080',NULL,NULL),(130.00,1700896531605,1700896531605,'8cda26f1-a0c1-480d-984e-2ef22661321f','b3b653e1-bfa0-42c0-9626-1e1a811adb89','046a6b79-6803-4a4f-aa60-be669dd3ae21',NULL,NULL),(105.00,1700896531582,1700896531582,'9369dfc0-fcd5-4a8e-9761-64f91ecd7b36','7948e590-4709-4569-a2c0-cf0d7aa16b51','9347e706-e8b6-4a11-ad64-343a56ad8080',NULL,NULL),(115.00,1700896531593,1700896531593,'b85e5a16-9cc8-4e70-8f28-03f2e5b39179','87c22cf9-7328-4fb7-8149-07c8f47f23d5','9347e706-e8b6-4a11-ad64-343a56ad8080',NULL,NULL),(125.00,1700896531601,1700896531601,'b925653a-3592-4db0-bf50-d6be366ccba5','8ec4d6f7-bd97-4c62-b4f5-d9c5e57dd1ba','046a6b79-6803-4a4f-aa60-be669dd3ae21',NULL,NULL),(50.00,1700896531518,1700896531518,'ba1bfe28-d14d-4d93-a98a-1934f4040b21','f9831b2f-4678-46c2-8a1a-384ca6a69bf6','edde0af4-ed34-4d9a-b6a7-8f0d9caaeebf',NULL,NULL),(75.00,1700896531543,1700896531543,'c21ec4d4-3277-4d98-9e92-ebc3ac13ee89','bdbbe31d-b03f-4214-abe8-cbaf28e491fc','5590225c-a56f-464e-932a-53b117ba2de4',NULL,NULL),(135.00,1700896531609,1700896531609,'c6685d5a-8c17-4262-9b28-dabaf73586f3','9ed2e703-d7af-45cb-a446-59ae21e9fdee','046a6b79-6803-4a4f-aa60-be669dd3ae21',NULL,NULL),(95.00,1700896531572,1700896531572,'c7ff74ac-f323-4418-8e83-781ec39cc597','0fd221c7-e4f1-42a0-8c3f-26ed20f136f6','14209a24-f4e0-46f8-8a6c-71f96509c3d4',NULL,NULL),(165.00,1700896531636,1700896531636,'e12effbe-337f-4aae-a383-a35dcd853251','945e20eb-3dce-4a06-a055-ce25fd41a2a5','14209a24-f4e0-46f8-8a6c-71f96509c3d4',NULL,NULL),(100.00,1700896531578,1700896531578,'eeeaa735-1b73-4b51-a0e6-7158e906760b','52097237-375c-46ee-a6c5-46235b92b31f','9347e706-e8b6-4a11-ad64-343a56ad8080',NULL,NULL),(155.00,1700896531627,1700896531627,'f52cb5ed-ff23-4fef-8689-6f2ff135687b','389292dc-0428-46df-9921-de0e70d44c84','14209a24-f4e0-46f8-8a6c-71f96509c3d4',NULL,NULL);
/*!40000 ALTER TABLE `product_promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `status` tinyint DEFAULT NULL,
  `type` bit(1) DEFAULT NULL,
  `value` int DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `time_end` bigint DEFAULT NULL,
  `time_start` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_tnm59112bh9o0828a4hotdubi` (`name`),
  CONSTRAINT `promotion_chk_1` CHECK ((`status` between 0 and 2))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (1,_binary '',80,1700896530739,1700982930738,1700896530738,1700896530739,'046a6b79-6803-4a4f-aa60-be669dd3ae21','Promotion 4',NULL,NULL),(1,_binary '',90,1700896530742,1700982930742,1700896530742,1700896530742,'14209a24-f4e0-46f8-8a6c-71f96509c3d4','Promotion 5',NULL,NULL),(1,_binary '',60,1700896530732,1700982930731,1700896530731,1700896530732,'5590225c-a56f-464e-932a-53b117ba2de4','Promotion 2',NULL,NULL),(2,_binary '',70,1700896530735,1700982930735,1700896530735,1700896530735,'9347e706-e8b6-4a11-ad64-343a56ad8080','Promotion 3',NULL,NULL),(0,_binary '',50,1700896530727,1700982930726,1700896530726,1700896530727,'edde0af4-ed34-4d9a-b6a7-8f0d9caaeebf','Promotion 1',NULL,NULL);
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `return_detail`
--

DROP TABLE IF EXISTS `return_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `return_detail` (
  `price` decimal(38,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_bill_detail` varchar(36) DEFAULT NULL,
  `id_product_detail` varchar(36) DEFAULT NULL,
  `id_return` varchar(36) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf9wp65a3amy34opxv78thn0bm` (`id_bill_detail`),
  KEY `FKf3324cty7psh7srxbhlxsnlp5` (`id_product_detail`),
  KEY `FKa0movpe9ilhgs03vck60l6wl8` (`id_return`),
  CONSTRAINT `FKa0movpe9ilhgs03vck60l6wl8` FOREIGN KEY (`id_return`) REFERENCES `returns` (`id`),
  CONSTRAINT `FKf3324cty7psh7srxbhlxsnlp5` FOREIGN KEY (`id_product_detail`) REFERENCES `product_detail` (`id`),
  CONSTRAINT `FKf9wp65a3amy34opxv78thn0bm` FOREIGN KEY (`id_bill_detail`) REFERENCES `bill_detail` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `return_detail`
--

LOCK TABLES `return_detail` WRITE;
/*!40000 ALTER TABLE `return_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `return_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `returns`
--

DROP TABLE IF EXISTS `returns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `returns` (
  `fee` int DEFAULT NULL,
  `return_money` decimal(38,2) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `return_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_bill` varchar(36) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKopwc17xak5e9o5t80bpxktiom` (`id_bill`),
  CONSTRAINT `FKopwc17xak5e9o5t80bpxktiom` FOREIGN KEY (`id_bill`) REFERENCES `bill` (`id`),
  CONSTRAINT `returns_chk_1` CHECK ((`status` between 0 and 4))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returns`
--

LOCK TABLES `returns` WRITE;
/*!40000 ALTER TABLE `returns` DISABLE KEYS */;
/*!40000 ALTER TABLE `returns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `deleted` tinyint DEFAULT NULL,
  `size` float DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_andxc5wkjhrdl847u1hhtq42c` (`size`),
  CONSTRAINT `size_chk_1` CHECK ((`deleted` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (0,38,1700896530928,1700896530928,'26894ce4-0306-4c35-8b41-cacf431a3e2e',NULL,NULL),(0,37,1700896530925,1700896530925,'6308ffdd-85e2-4998-8036-0879fa45599d',NULL,NULL),(0,39,1700896530931,1700896530931,'887aa3e9-1a27-424e-87b9-8629c59f6a67',NULL,NULL),(0,36,1700896530921,1700896530921,'c9676c3a-6054-42e2-805f-2d3867d849d7',NULL,NULL),(0,40,1700896530934,1700896530935,'e33431e6-08dd-4f71-a24f-f42891ce104b',NULL,NULL);
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sole`
--

DROP TABLE IF EXISTS `sole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sole` (
  `deleted` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_pvaw719m1tmlraxpy6ao9163k` (`name`),
  CONSTRAINT `sole_chk_1` CHECK ((`deleted` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sole`
--

LOCK TABLES `sole` WRITE;
/*!40000 ALTER TABLE `sole` DISABLE KEYS */;
INSERT INTO `sole` VALUES (0,1700896530906,1700896530906,'2be39198-9b64-456c-ba28-4cb0ca356d22','Đế da',NULL,NULL),(0,1700896530913,1700896530913,'305d8b13-29df-49c1-a87b-71ea89d33af9','Đế sắt',NULL,NULL),(0,1700896530900,1700896530900,'6025b8d9-eb57-4a19-9ee3-ce04cd20af19','Đế cao su',NULL,NULL),(0,1700896530917,1700896530917,'d6f05e7f-6dfb-4fb5-946f-367bba910c9f','Đế nhựa',NULL,NULL),(0,1700896530909,1700896530909,'dc7f6b36-d5e2-48bc-a3d6-00be205d7cf1','Đế vàng',NULL,NULL);
/*!40000 ALTER TABLE `sole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `payment_method` tinyint DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `total_money` decimal(38,2) DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `id_account` varchar(36) DEFAULT NULL,
  `id_bill` varchar(36) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `transaction_code` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqougs4kxpidm8i9514o13rfdk` (`id_account`),
  KEY `FKkjwk0ipawte026ou9w1l4ke9k` (`id_bill`),
  CONSTRAINT `FKkjwk0ipawte026ou9w1l4ke9k` FOREIGN KEY (`id_bill`) REFERENCES `bill` (`id`),
  CONSTRAINT `FKqougs4kxpidm8i9514o13rfdk` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`),
  CONSTRAINT `transaction_chk_1` CHECK ((`payment_method` between 0 and 1)),
  CONSTRAINT `transaction_chk_2` CHECK ((`status` between 0 and 1)),
  CONSTRAINT `transaction_chk_3` CHECK ((`type` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,0,700000.00,0,1700896531494,1700896531494,'0341ffb3-f931-46a3-981a-2444c56d6480','c6449bfa-6e3f-4922-9115-3b98f544427c','5607c34b-119c-42b5-8159-3f6cd8494c92',NULL,'Payment for Order #HD3',NULL,NULL),(1,0,600000.00,0,1700896531490,1700896531490,'13eeef16-3df3-4a24-a9b3-fd36ea910b5b','78eb9e4d-91e7-43e0-910f-fbdc3d3cd4e3','feeb8afc-2a30-46d8-908d-f5ea6f8b4f9b',NULL,'Payment for Order #HD2',NULL,NULL),(0,0,800000.00,0,1700896531499,1700896531499,'2fb7852e-56da-45d3-99b6-41523d31f7fc','052d8083-2306-4535-83df-3bde51134f03','cad2076f-342d-47e5-b619-b9a1428def46',NULL,'Payment for Order #HD4',NULL,NULL),(0,0,1000000.00,0,1700896531503,1700896531503,'3fccec90-0c74-40a5-af5a-0a65aaa412d1','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','3fc840b4-2acd-4596-9d0e-301a5411ca62',NULL,'Payment for Order #HD6',NULL,NULL),(0,0,1100000.00,0,1700896531507,1700896531507,'8287c7f0-f19d-4e36-85bf-f1d6051237b5','052d8083-2306-4535-83df-3bde51134f03','6791b9f9-e690-4a81-8797-a9f8afe72a5b',NULL,'Payment for Order #HD11',NULL,NULL),(1,0,1200000.00,0,1700896531512,1700896531512,'9a1d38cb-42c8-434a-9c28-87d6fd373a22','78eb9e4d-91e7-43e0-910f-fbdc3d3cd4e3','6b6f891e-d90f-44cf-982b-2ef4ab1097e5',NULL,'Payment for Order #HD12',NULL,NULL),(1,0,500000.00,0,1700896531486,1700896531486,'b63b301a-ea3f-4c37-b3bd-7733026e4cd0','22f82e73-481b-4bca-b3e3-ec0a8fb2d299','0daf71d6-b8a3-494c-930a-f0fb479af3aa',NULL,'Payment for Order #HD1',NULL,NULL);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `maximum_value` decimal(38,2) DEFAULT NULL,
  `minimum_amount` decimal(38,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `type` tinyint DEFAULT NULL,
  `type_value` tinyint DEFAULT NULL,
  `value` decimal(38,2) DEFAULT NULL,
  `created_at` bigint DEFAULT NULL,
  `end_date` bigint DEFAULT NULL,
  `start_date` bigint DEFAULT NULL,
  `updated_at` bigint DEFAULT NULL,
  `code` varchar(30) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_pvh1lqheshnjoekevvwla03xn` (`code`),
  CONSTRAINT `voucher_chk_1` CHECK ((`status` between 0 and 2)),
  CONSTRAINT `voucher_chk_2` CHECK ((`type` between 0 and 1)),
  CONSTRAINT `voucher_chk_3` CHECK ((`type_value` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (100.00,50.00,10,1,1,0,25.00,1700896530766,1701501330765,1700896530765,1700896530766,'VC12345','523dc415-61a0-43ea-9421-753cf8e0b6b8','Voucher 1',NULL,NULL);
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-25 14:16:27
