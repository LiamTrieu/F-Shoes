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
INSERT INTO `account` VALUES (_binary '\0',2,0,1700309771914,1700309771913,1700309771914,'0234567890','19b5a076-b1ec-4303-b532-f67b82e93323','customer2@example.com','Nguyễn Văn B','password2',NULL,NULL,NULL,NULL),(_binary '',0,0,1700309771972,1700309771972,1700309771972,'0123456786','2cf744e4-5edc-4e85-8cc1-6ed77a98b8ca','staff4@example.com','Lê Thị D','password4','https://shorturl.at/pCFQU','4567890123456789',NULL,NULL),(_binary '',0,0,1700309771963,1700309771962,1700309771963,'0123456788','2f30e0e3-1d9c-4c18-a8cd-6d50b30d8773','staff2@example.com','Lê Thị B','password2','https://shorturl.at/eqIR9','2345678901234567',NULL,NULL),(_binary '',2,0,1700309771865,1700309771852,1700309771865,'0123456781','351273ed-02b0-45ee-a739-92f3007046f6','customer1@example.com','Nguyễn Văn A','password1',NULL,NULL,NULL,NULL),(_binary '',0,0,1700309771968,1700309771967,1700309771968,'0123456787','4c555c02-61f2-4fad-920c-30302c773006','staff3@example.com','Lê Thị C','password3','https://shorturl.at/juFOV','3456789012345678',NULL,NULL),(_binary '',1,0,1700309773061,1700309773061,1700309773061,'0987656412','6ee8123b-7b8a-4582-804e-be13299396da','admin@gmail.com','Nguyễn Văn Nhật','21232f297a57a5a743894a0e4a801fc3','https://res.cloudinary.com/dioxktgsm/image/upload/v1699145685/hz5f5miaqvpxyewazije.png','1234999890123456',NULL,NULL),(_binary '',0,0,1700309771958,1700309771957,1700309771958,'0123456789','75c54e1c-8a9b-4ebe-9370-d0073af182ad','staff1@example.com','Lê Thị A','password1','https://shorturl.at/CDP27','1234567890123456',NULL,NULL),(_binary '',0,0,1700309771977,1700309771977,1700309771977,'0123456785','a626678c-ad88-4bf1-9abb-7c581fd5ac35','staff5@example.com','Lê Thị E','password5','https://shorturl.at/rAGJV','5678901234567890',NULL,NULL),(_binary '',2,0,1700309771919,1700309771918,1700309771919,'0345678901','bad07290-000e-49c8-be99-1f4cd51a0fd7','customer3@example.com','Nguyễn Văn C','password3',NULL,NULL,NULL,NULL),(_binary '',2,0,1700309773064,1700309773061,1700309773064,'0647536475','bc3ffe44-0ecc-4c81-a539-08c0418687bc','nguyenthithuyduong948@gmail.com','Nguyễn Thị Thùy Dương','4ac4fcfbd3b0fc5271aa1d5e30e21d21','https://res.cloudinary.com/dioxktgsm/image/upload/v1699145591/vfitrqzsyeueqpiioguz.jpg','077564778753',NULL,NULL),(_binary '\0',2,0,1700309771924,1700309771923,1700309771924,'0456789012','cfde3e70-5dcd-46f6-a848-14ba807fe957','customer4@example.com','Nguyễn Văn D','password4',NULL,NULL,NULL,NULL),(_binary '',2,0,1700309771929,1700309771928,1700309771929,'0567890123','e459bdc7-3a66-449e-900b-a89836cfed9c','customer5@example.com','Nguyễn Văn E','password5',NULL,NULL,NULL,NULL);
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
INSERT INTO `address` VALUES (_binary '',1700309772019,1700309772019,'0123456789','2204','234c7e6a-01ed-4565-a1fe-1cbf6a8282e9','351273ed-02b0-45ee-a739-92f3007046f6','266','140207','Địa chỉ 1',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700309772034,1700309772034,'0567890123','2204','4c344fdf-6686-40c4-af7f-23b156c96b94','e459bdc7-3a66-449e-900b-a89836cfed9c','266','140207','Địa chỉ 5',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700309772030,1700309772030,'0456789012','2204','5eff1b36-2cc9-4859-8eca-5f2093430e1a','cfde3e70-5dcd-46f6-a848-14ba807fe957','266','140207','Địa chỉ 4',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700309772042,1700309772042,'0172617261','2204','7dfe713e-14ef-4016-b7df-8038d8f3a33d','2f30e0e3-1d9c-4c18-a8cd-6d50b30d8773','266','140207','Địa chỉ 7',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700309772023,1700309772023,'0234567890','2204','9231297d-ef83-4e0a-a144-b04c098d5f74','19b5a076-b1ec-4303-b532-f67b82e93323','266','140207','Địa chỉ 2',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700309772039,1700309772039,'0281372615','2204','9d376ae7-be6a-45fe-a61b-4a7cd7ae8272','75c54e1c-8a9b-4ebe-9370-d0073af182ad','266','140207','Địa chỉ 6',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700309772054,1700309772054,'0261920192','2204','ad5e4e68-8d6b-4548-a947-56a5db0b31c8','a626678c-ad88-4bf1-9abb-7c581fd5ac35','266','140207','Địa chỉ 10',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700309772050,1700309772050,'0452619201','2204','d39f26f6-0b2e-47a4-a122-60a9260d6231','2cf744e4-5edc-4e85-8cc1-6ed77a98b8ca','266','140207','Địa chỉ 9',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700309772046,1700309772046,'0675826371','2204','e7335010-34f3-4d17-af4e-e774b7812c7d','4c555c02-61f2-4fad-920c-30302c773006','266','140207','Địa chỉ 8',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL),(_binary '',1700309772027,1700309772027,'0345678901','2204','fcdce15c-659a-4286-a794-f19cc60d5432','bad07290-000e-49c8-be99-1f4cd51a0fd7','266','140207','Địa chỉ 3',NULL,'aaaaa, Xã Mường Giàng, Huyện Quỳnh Nhai, Sơn La',NULL);
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
  CONSTRAINT `bill_chk_1` CHECK ((`status` between 0 and 8)),
  CONSTRAINT `bill_chk_2` CHECK ((`type` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (0.00,18100000.00,900000.00,80000.00,6,19000000.00,0,NULL,1700311572090,1700309772090,1700265600000,NULL,NULL,1700309772090,'0123456789','HD009','0827fd45-2e92-4c86-8307-0d1dce262a6b',NULL,NULL,NULL,'Nguyễn Văn I','Mua tại quầy','131 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(0.00,17200000.00,800000.00,0.00,1,18000000.00,1,NULL,NULL,1700309772086,1700482572086,NULL,NULL,1700309772086,'0123456789','HD008','0be6f1a9-e30b-497e-ba0c-5c32f01213c7','351273ed-02b0-45ee-a739-92f3007046f6',NULL,NULL,'Nguyễn Văn H','Đặt hàng online','130 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(19000000.00,19000000.00,1000000.00,0.00,5,20000000.00,0,NULL,1700311572098,1700309772099,1700265600000,NULL,NULL,1700309772099,'0123456789','HD011','12487ba4-e478-4dc5-8cec-677d0ce436b3',NULL,NULL,NULL,'Nguyễn Văn Nam','Mua tại quầy','142 Đường ABC, Quận DEF, Thành phố HCM',NULL,NULL),(12300000.00,12300000.00,200000.00,25000.00,7,12500000.00,1,1700482572064,1700482572064,1700309772064,1700482572064,1700482572064,1700482572064,1700309772064,'0123456789','HD002','13ec5327-1868-4634-ac4e-d6ef5ab5c2a4','19b5a076-b1ec-4303-b532-f67b82e93323',NULL,NULL,'Nguyễn Văn B','Đặt hàng online','124 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(900.00,12250000.00,100000.00,30000.00,7,12350000.00,1,1700482572057,1700482572057,1700309772058,1700482572057,1700482572057,1700482572057,1700309772058,'0123456789','HD001','1ea1f05b-1a5c-40f7-ae80-07dfb5cb168b','351273ed-02b0-45ee-a739-92f3007046f6',NULL,NULL,'Nguyễn Văn A','Đặt hành','123 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(20000000.00,20000000.00,0.00,0.00,5,20000000.00,0,NULL,1700311572103,1700309772104,1700265600000,NULL,NULL,1700309772104,'0123456789','HD012','3b3b5dfa-ac77-4c8d-8414-e924510c0d24',NULL,NULL,NULL,'Nguyễn Văn Nam','Mua tại quầy','145 Đường ABC, Quận DEF, Thành phố HN',NULL,NULL),(0.00,19000000.00,1000000.00,0.00,0,20000000.00,1,NULL,1700311572108,1700309772109,1700265600000,NULL,NULL,1700309772109,'0123456789','HD013','4793f240-4ea7-4ca1-9d0d-d7265b1e9087','351273ed-02b0-45ee-a739-92f3007046f6',NULL,NULL,'Nguyễn Văn B','Đặt online','145 Đường ABC, Quận DEF, Thành phố ĐN',NULL,NULL),(15400000.00,15400000.00,600000.00,0.00,2,16000000.00,1,NULL,1700482572077,1700309772077,1700482572077,NULL,NULL,1700309772077,'0123456789','HD006','a32ebce6-f6b5-4f5d-bb87-f1102137b0c1','19b5a076-b1ec-4303-b532-f67b82e93323',NULL,NULL,'Nguyễn Văn F','Đặt hàng online','128 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(0.00,19000000.00,1000000.00,0.00,6,20000000.00,0,NULL,1700311572093,1700309772094,1700265600000,NULL,NULL,1700309772094,'0123456789','HD010','aa73505e-6d66-4a34-96fa-33bd0dca4f1d',NULL,NULL,NULL,'Nguyễn Văn J','Mua tại quầy','142 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(15000000.00,15000000.00,0.00,20000.00,3,15000000.00,1,NULL,1700482572072,1700309772072,1700482572072,NULL,1700482572072,1700309772073,'0123456789','HD004','c3a854e7-2971-4acc-9907-0847a8efc219','bad07290-000e-49c8-be99-1f4cd51a0fd7',NULL,NULL,'Nguyễn Văn D','Đặt hàng online','125 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(12700000.00,12700000.00,300000.00,20000.00,3,13000000.00,1,NULL,1700482572068,1700309772068,1700482572068,NULL,1700482572068,1700309772068,'0123456789','HD003','efaef719-14c8-4b2b-b3f1-e0809f104681','bad07290-000e-49c8-be99-1f4cd51a0fd7',NULL,NULL,'Nguyễn Văn C','Đặt hàng online','125 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL),(0.00,16300000.00,700000.00,0.00,1,17000000.00,1,NULL,NULL,1700309772082,1700482572082,NULL,NULL,1700309772082,'0123456789','HD007','f2f26d72-074f-4ab7-bfe6-8990816f241a','e459bdc7-3a66-449e-900b-a89836cfed9c',NULL,NULL,'Nguyễn Văn G','Đặt online','129 Đường ABC, Quận XYZ, Thành phố HCM',NULL,NULL);
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
  CONSTRAINT `bill_detail_chk_1` CHECK ((`status` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_detail`
--

LOCK TABLES `bill_detail` WRITE;
/*!40000 ALTER TABLE `bill_detail` DISABLE KEYS */;
INSERT INTO `bill_detail` VALUES (80000.00,1,0,1700309772684,1700309772684,'016687ef-3ffe-4dd6-b49a-8216d3d881c3','0be6f1a9-e30b-497e-ba0c-5c32f01213c7','62ccff86-f59d-4c2c-9b77-ae9b34d6f905',NULL,NULL,NULL),(280000.00,4,0,1700309772673,1700309772673,'03272e83-e8b7-48dd-b919-02b70fab2247','c3a854e7-2971-4acc-9907-0847a8efc219','a17adc8b-71a9-483b-be1e-16d44e2a21eb',NULL,NULL,NULL),(280000.00,4,0,1700309772640,1700309772640,'0b62cc15-d1de-4588-922e-bd75d31b0b2e','0827fd45-2e92-4c86-8307-0d1dce262a6b','98eb9f42-9238-441f-8d61-f0fd66b9fbb3',NULL,NULL,NULL),(200000.00,2,0,1700309772629,1700309772629,'0c198026-16ca-418c-82a7-9459868b4c70','a32ebce6-f6b5-4f5d-bb87-f1102137b0c1','5d3086a9-b99e-4a8e-a45f-3b71099cbfdb',NULL,NULL,NULL),(120000.00,2,0,1700309772643,1700309772643,'0f4cc62f-c4e4-40a3-96f5-4e5b6d043eba','aa73505e-6d66-4a34-96fa-33bd0dca4f1d','5c34ab0e-5a56-42da-a043-0ec00f10d7be',NULL,NULL,NULL),(200000.00,2,0,1700309772676,1700309772676,'20a59575-43e3-4311-9ca2-38fabbbc2993','a32ebce6-f6b5-4f5d-bb87-f1102137b0c1','0de7d3f3-4333-4b56-b715-a18e2b2b686f',NULL,NULL,NULL),(80000.00,1,0,1700309772618,1700309772618,'2a3fe89c-50df-40f3-a88d-04f7a8647faa','efaef719-14c8-4b2b-b3f1-e0809f104681','e54b0165-690e-48e4-bc2b-0fe6ecf40b00',NULL,NULL,NULL),(270000.00,3,0,1700309772680,1700309772680,'2bd85e65-6539-4acf-a0df-a7fbce116956','f2f26d72-074f-4ab7-bfe6-8990816f241a','e4204a65-72a3-436c-80ba-11df548d1820',NULL,NULL,NULL),(200000.00,2,0,1700309772694,1700309772694,'555b8997-2a24-4e75-aca8-4dea5ad64fd1','12487ba4-e478-4dc5-8cec-677d0ce436b3','fbf3c08b-5f0a-4a7f-a9b1-ff545586c710',NULL,NULL,NULL),(270000.00,3,0,1700309772651,1700309772651,'58663839-b5e5-44ea-9d58-e7018da5bc11','3b3b5dfa-ac77-4c8d-8414-e924510c0d24','1724214e-304c-4d90-a3a3-f5432168f05d',NULL,NULL,NULL),(80000.00,1,0,1700309772702,1700309772702,'587207b3-3844-4703-880c-569e189ba020','4793f240-4ea7-4ca1-9d0d-d7265b1e9087','3d53eb6c-15bc-465e-801b-6d2215eef38d',NULL,NULL,NULL),(200000.00,2,0,1700309772602,1700309772602,'5a4c2758-6671-4760-a046-0e13431a780c','1ea1f05b-1a5c-40f7-ae80-07dfb5cb168b','3d53eb6c-15bc-465e-801b-6d2215eef38d',NULL,NULL,NULL),(280000.00,4,0,1700309772624,1700309772624,'6679cdcf-703a-4642-ab70-2bc07335ca87','c3a854e7-2971-4acc-9907-0847a8efc219','de38068f-5e6b-4358-a052-575cf2cf37e7',NULL,NULL,NULL),(280000.00,4,0,1700309772688,1700309772688,'70d26995-23f3-4d35-ae44-ce489ef231cd','0827fd45-2e92-4c86-8307-0d1dce262a6b','4e9cd50e-36b6-40ae-91c7-b5fd94f13ea7',NULL,NULL,NULL),(270000.00,3,0,1700309772611,1700309772611,'7df29730-da7d-4c35-a5d6-827fc9f15f06','13ec5327-1868-4634-ac4e-d6ef5ab5c2a4','1724214e-304c-4d90-a3a3-f5432168f05d',NULL,NULL,NULL),(270000.00,3,0,1700309772664,1700309772664,'8951c053-45f4-4396-bdca-8119f6756540','13ec5327-1868-4634-ac4e-d6ef5ab5c2a4','d74474bd-53e1-4f63-9631-d9fe647aaf53',NULL,NULL,NULL),(200000.00,2,0,1700309772647,1700309772647,'8b8a259c-4453-4edd-bcf3-88de30569763','12487ba4-e478-4dc5-8cec-677d0ce436b3','3d53eb6c-15bc-465e-801b-6d2215eef38d',NULL,NULL,NULL),(80000.00,1,0,1700309772669,1700309772669,'95265dd4-77db-4664-9484-422019af72f8','efaef719-14c8-4b2b-b3f1-e0809f104681','f80a15b9-41a9-428c-8acf-ee6ff317392b',NULL,NULL,NULL),(200000.00,2,0,1700309772659,1700309772659,'a80dd8db-f400-4180-a292-e1afed6d4f9e','1ea1f05b-1a5c-40f7-ae80-07dfb5cb168b','8924cbed-45c7-489b-8e4a-fdcac98b2231',NULL,NULL,NULL),(270000.00,3,0,1700309772697,1700309772697,'b6869ccf-13e0-428a-a610-e18179db66d6','3b3b5dfa-ac77-4c8d-8414-e924510c0d24','c9a912e6-9059-424d-9bbe-38999177a346',NULL,NULL,NULL),(270000.00,3,0,1700309772634,1700309772634,'bb56de27-0136-44b4-a9f6-52be9a304075','f2f26d72-074f-4ab7-bfe6-8990816f241a','585667a5-7858-4e87-b879-b722b0af6470',NULL,NULL,NULL),(80000.00,1,0,1700309772655,1700309772655,'ca7c1f88-9949-47e9-bd09-85be6c95a8d7','4793f240-4ea7-4ca1-9d0d-d7265b1e9087','e54b0165-690e-48e4-bc2b-0fe6ecf40b00',NULL,NULL,NULL),(120000.00,2,0,1700309772691,1700309772691,'f641f39f-e4b4-40da-b6f8-9c407e5fbb11','aa73505e-6d66-4a34-96fa-33bd0dca4f1d','c2cff0a1-4b0b-4380-aed2-4eefb656fa4e',NULL,NULL,NULL),(80000.00,1,0,1700309772637,1700309772637,'fd8510a3-bbfb-4207-b24e-ec94929c665c','0be6f1a9-e30b-497e-ba0c-5c32f01213c7','b56c11da-d40c-470e-9647-3a9dd969ad43',NULL,NULL,NULL);
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
  CONSTRAINT `bill_history_chk_1` CHECK ((`status_bill` between 0 and 8))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_history`
--

LOCK TABLES `bill_history` WRITE;
/*!40000 ALTER TABLE `bill_history` DISABLE KEYS */;
INSERT INTO `bill_history` VALUES (2,1700309773038,1700309773038,'040d0522-9934-49b0-b63f-7f4e0d30b0ce','75c54e1c-8a9b-4ebe-9370-d0073af182ad','12487ba4-e478-4dc5-8cec-677d0ce436b3','Da xac nhan',NULL,NULL),(1,1700309773056,1700309773056,'106ba940-01fd-4501-a922-e11dcaa33385',NULL,'4793f240-4ea7-4ca1-9d0d-d7265b1e9087','Tao don',NULL,NULL),(2,1700309772921,1700309772921,'1bb602a9-6bf3-4c35-8c31-6d536603c0f0','75c54e1c-8a9b-4ebe-9370-d0073af182ad','efaef719-14c8-4b2b-b3f1-e0809f104681','Xac nhan don hang',NULL,NULL),(0,1700309773058,1700309773058,'284f6c9b-5667-4841-b1a5-b24dd1b436df',NULL,'4793f240-4ea7-4ca1-9d0d-d7265b1e9087','Huy don',NULL,NULL),(2,1700309772973,1700309772973,'29c0c36b-1cac-4d33-87a3-381868b491ee','75c54e1c-8a9b-4ebe-9370-d0073af182ad','a32ebce6-f6b5-4f5d-bb87-f1102137b0c1','Xac nhan don hang',NULL,NULL),(2,1700309773030,1700309773030,'2b14efa7-809d-481d-9243-b02f150b1d64','75c54e1c-8a9b-4ebe-9370-d0073af182ad','aa73505e-6d66-4a34-96fa-33bd0dca4f1d','Da xac nhan',NULL,NULL),(5,1700309772939,1700309772939,'2b7f059c-5ef5-4801-9f44-b7f8e594ba78',NULL,'c3a854e7-2971-4acc-9907-0847a8efc219','Thanh toan',NULL,NULL),(7,1700309772878,1700309772878,'34d323c7-3d71-4a7d-bae3-c604662570f4','75c54e1c-8a9b-4ebe-9370-d0073af182ad','1ea1f05b-1a5c-40f7-ae80-07dfb5cb168b','Hoan thanh',NULL,NULL),(5,1700309772967,1700309772967,'39667c98-8c40-4131-b71f-7655d5d53044',NULL,'a32ebce6-f6b5-4f5d-bb87-f1102137b0c1','Thanh toan',NULL,NULL),(7,1700309772902,1700309772902,'3ac47278-50e3-4ddc-85db-9a5441e32809','75c54e1c-8a9b-4ebe-9370-d0073af182ad','13ec5327-1868-4634-ac4e-d6ef5ab5c2a4','Hoan thanh',NULL,NULL),(1,1700309773034,1700309773034,'3f501e9d-bbf0-44e7-8f61-f8b5e8d2fa72','75c54e1c-8a9b-4ebe-9370-d0073af182ad','12487ba4-e478-4dc5-8cec-677d0ce436b3','Tao don',NULL,NULL),(5,1700309773042,1700309773042,'3fa6ef11-68ff-4462-89dd-fcb86cc20af7','75c54e1c-8a9b-4ebe-9370-d0073af182ad','12487ba4-e478-4dc5-8cec-677d0ce436b3','Da thanh toan',NULL,NULL),(3,1700309772867,1700309772867,'48ac71f6-dc61-4ab0-a679-ba8a7cd78736','75c54e1c-8a9b-4ebe-9370-d0073af182ad','1ea1f05b-1a5c-40f7-ae80-07dfb5cb168b','Don hang dang giao den ban',NULL,NULL),(1,1700309772880,1700309772880,'4d14a992-82a5-4568-acb2-f81fb8335cf8',NULL,'13ec5327-1868-4634-ac4e-d6ef5ab5c2a4','Tạo đơn hàng',NULL,NULL),(5,1700309772916,1700309772916,'4faf4e19-09cd-4651-bf72-5ee660feabdc',NULL,'efaef719-14c8-4b2b-b3f1-e0809f104681','Thanh toan',NULL,NULL),(3,1700309772927,1700309772927,'56ee4724-8ff4-4d1b-a2e1-e6d4da6c3f5d','75c54e1c-8a9b-4ebe-9370-d0073af182ad','efaef719-14c8-4b2b-b3f1-e0809f104681','Don hang dang giao den ban',NULL,NULL),(5,1700309773053,1700309773053,'6f4abde3-24f7-4345-9b99-fc47193ebfed','75c54e1c-8a9b-4ebe-9370-d0073af182ad','3b3b5dfa-ac77-4c8d-8414-e924510c0d24','Da thanh toan',NULL,NULL),(1,1700309772934,1700309772934,'78535122-fd00-472b-88cf-085a211248f0',NULL,'c3a854e7-2971-4acc-9907-0847a8efc219','Tạo đơn hàng',NULL,NULL),(1,1700309772985,1700309772985,'91d62eff-ab12-46d0-8651-0ddfb37dc4d7',NULL,'0be6f1a9-e30b-497e-ba0c-5c32f01213c7','Tao don hang',NULL,NULL),(2,1700309772863,1700309772863,'977a17f3-4d58-4ccb-8005-b5ef543d3d74','75c54e1c-8a9b-4ebe-9370-d0073af182ad','1ea1f05b-1a5c-40f7-ae80-07dfb5cb168b','Xac nhan don hang',NULL,NULL),(3,1700309772892,1700309772892,'9da0c425-32dd-4954-bb5f-793f37da89ce','75c54e1c-8a9b-4ebe-9370-d0073af182ad','13ec5327-1868-4634-ac4e-d6ef5ab5c2a4','Don hang dang giao den ban',NULL,NULL),(5,1700309772874,1700309772874,'b39ed8b4-3e41-4079-8db8-ec4352acc389','75c54e1c-8a9b-4ebe-9370-d0073af182ad','1ea1f05b-1a5c-40f7-ae80-07dfb5cb168b','Da thanh toan',NULL,NULL),(2,1700309772887,1700309772887,'b8fe320f-af77-41c5-861d-dae1328fc605','75c54e1c-8a9b-4ebe-9370-d0073af182ad','13ec5327-1868-4634-ac4e-d6ef5ab5c2a4','Xac nhan don hang',NULL,NULL),(2,1700309773050,1700309773050,'c20bab59-c87f-4a6b-bca7-b193e04ada1c','75c54e1c-8a9b-4ebe-9370-d0073af182ad','3b3b5dfa-ac77-4c8d-8414-e924510c0d24','Da xac nhan',NULL,NULL),(1,1700309773026,1700309773026,'cc300ab5-e9f0-481d-95ac-2a288389e91e','75c54e1c-8a9b-4ebe-9370-d0073af182ad','aa73505e-6d66-4a34-96fa-33bd0dca4f1d','Tao don',NULL,NULL),(1,1700309772993,1700309772993,'cce8afce-2f4f-4419-90cc-e970fdbbfb52','75c54e1c-8a9b-4ebe-9370-d0073af182ad','0827fd45-2e92-4c86-8307-0d1dce262a6b','Tao don',NULL,NULL),(2,1700309772945,1700309772945,'d3a38ac9-13c1-477a-a0ed-0ef669984345','75c54e1c-8a9b-4ebe-9370-d0073af182ad','c3a854e7-2971-4acc-9907-0847a8efc219','Xac nhan don hang',NULL,NULL),(1,1700309773047,1700309773047,'e228c73d-7299-421e-9cd1-a675ff19b76b','75c54e1c-8a9b-4ebe-9370-d0073af182ad','3b3b5dfa-ac77-4c8d-8414-e924510c0d24','Tao don',NULL,NULL),(1,1700309772884,1700309772884,'e47b5948-a6d1-4895-a922-a264b60327b5',NULL,'13ec5327-1868-4634-ac4e-d6ef5ab5c2a4','Da thanh toan',NULL,NULL),(1,1700309772859,1700309772859,'e5567154-a638-48e9-be2e-aa0a90c71f5f',NULL,'1ea1f05b-1a5c-40f7-ae80-07dfb5cb168b','Tạo đơn hàng',NULL,NULL),(1,1700309772979,1700309772979,'e8a67656-d55d-477b-ac91-9352afe577f7',NULL,'f2f26d72-074f-4ab7-bfe6-8990816f241a','Tao don hang',NULL,NULL),(4,1700309772871,1700309772871,'e8f4a278-9c3f-434d-9bb3-09a5a3461477','75c54e1c-8a9b-4ebe-9370-d0073af182ad','1ea1f05b-1a5c-40f7-ae80-07dfb5cb168b','Da giao hang',NULL,NULL),(3,1700309772953,1700309772953,'fa555073-3187-4203-afc6-49cf4d2e10ae','75c54e1c-8a9b-4ebe-9370-d0073af182ad','c3a854e7-2971-4acc-9907-0847a8efc219','Don hang dang giao den ban',NULL,NULL),(1,1700309772961,1700309772961,'fadbeca1-1389-4e82-af5f-7fc900b6547c',NULL,'a32ebce6-f6b5-4f5d-bb87-f1102137b0c1','Tạo đơn hàng',NULL,NULL),(4,1700309772896,1700309772896,'fc5a609c-b593-419e-b85e-f49f73f46071','75c54e1c-8a9b-4ebe-9370-d0073af182ad','13ec5327-1868-4634-ac4e-d6ef5ab5c2a4','Da giao hang',NULL,NULL),(1,1700309772910,1700309772910,'ff449389-d098-4555-8364-ffb3fb8fb7d6',NULL,'efaef719-14c8-4b2b-b3f1-e0809f104681','Tạo đơn hàng',NULL,NULL);
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
INSERT INTO `brand` VALUES (0,1700309772224,1700309772224,'4cb3d2b8-9c1a-4bb5-a510-448634a7b6b7','Reebok',NULL,NULL),(0,1700309772226,1700309772226,'60bfa15f-52a5-4922-bcd3-f7d02b868a89','New Balance',NULL,NULL),(0,1700309772220,1700309772220,'763f00d1-c7cd-48c6-a795-1f2edf5046a3','Adidas',NULL,NULL),(0,1700309772222,1700309772222,'8f34188a-d436-471d-8bfb-3f50e85eb1cc','Puma',NULL,NULL),(0,1700309772216,1700309772216,'c0688ffc-0dd5-4225-9065-7fa569dca778','Nike',NULL,NULL);
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
INSERT INTO `category` VALUES (0,1700309772253,1700309772253,'066b505f-fce9-4d47-a68c-a74841d29da2','Giày nữ',NULL,NULL),(0,1700309772250,1700309772250,'6e3744bb-b573-4db3-b328-4fcaa349880d','Giày nam',NULL,NULL),(0,1700309772255,1700309772255,'7c5237ca-df51-4cc9-b943-b697565fa00d','Giày thể thao',NULL,NULL),(0,1700309772245,1700309772245,'dc462ba3-2a1a-4977-a079-282029960b4c','Giày lười',NULL,NULL),(0,1700309772248,1700309772248,'eedb28fb-81db-43df-a240-ae47a3d92071','Giày thời trang',NULL,NULL);
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
INSERT INTO `color` VALUES (0,1700309772233,1700309772233,'#00FF00','0beb1df5-3bc0-45af-beb2-770a09b4cdd5',NULL,'Green',NULL),(0,1700309772230,1700309772230,'#8B0016','15a5f771-c351-4ab6-b006-a3a5ad0f8482',NULL,'Red Devil',NULL),(0,1700309772242,1700309772242,'#FFA500','8fc9dde5-0092-437f-9c68-37a873ddf73d',NULL,'Orange',NULL),(0,1700309772236,1700309772236,'#0000FF','ce8b1455-e988-4a00-9aaf-3a09b69f2472',NULL,'Blue',NULL),(0,1700309772239,1700309772239,'#FFFF00','d932755b-e3ca-4e4f-aa3f-3d78d084e489',NULL,'Yellow',NULL);
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
INSERT INTO `customer_voucher` VALUES (1700309771990,1700309771990,'611cedb8-7e0b-4b65-8101-be112df657aa','351273ed-02b0-45ee-a739-92f3007046f6','1aba96cf-15c9-42c1-acc2-5092005f78a9',NULL,NULL);
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
INSERT INTO `image` VALUES (_binary '',0,1700309772508,1700309772508,'0202eb9b-2c88-43c2-b05d-2222e8374ae5','5d3086a9-b99e-4a8e-a45f-3b71099cbfdb',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772499,1700309772499,'21fef946-fd1b-4f5a-a2f4-a40e8b021353','de38068f-5e6b-4358-a052-575cf2cf37e7',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772518,1700309772518,'234db173-beb1-46d4-984e-de2947223d5e','b56c11da-d40c-470e-9647-3a9dd969ad43',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772482,1700309772482,'333e64ed-3b81-4ab5-9e63-f53efa0ccc6c','3d53eb6c-15bc-465e-801b-6d2215eef38d',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772575,1700309772575,'3c879b77-9f3f-4c6c-bc66-1cf5d699d199','62ccff86-f59d-4c2c-9b77-ae9b34d6f905',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772562,1700309772562,'4967879c-d2c0-4006-a1b0-14d17b1632fa','600591c6-2b6a-47f4-a9ff-adf69bcfc986',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772558,1700309772558,'5233b58b-0289-4041-9856-4c7e0c0573a9','a17adc8b-71a9-483b-be1e-16d44e2a21eb',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772550,1700309772550,'56430a09-70e8-4ac2-b1dc-8b67a86bbf16','d74474bd-53e1-4f63-9631-d9fe647aaf53',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772513,1700309772513,'5847776e-6535-4447-917f-a20509c8ef6b','585667a5-7858-4e87-b879-b722b0af6470',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772546,1700309772546,'63aa4748-49b7-4b56-a38b-878ccfd34f64','8924cbed-45c7-489b-8e4a-fdcac98b2231',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772570,1700309772570,'6685b4ae-59e9-4984-8c19-5a92ccad1a8a','e4204a65-72a3-436c-80ba-11df548d1820',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772595,1700309772595,'6fbabe7b-1d33-4deb-b1e5-f8cec9d01a6c','c9a912e6-9059-424d-9bbe-38999177a346',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772580,1700309772580,'76d029c6-692b-440e-b079-453bc57cfc53','4e9cd50e-36b6-40ae-91c7-b5fd94f13ea7',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772553,1700309772553,'8a4a6248-bff3-4145-95a8-21d06142dad1','f80a15b9-41a9-428c-8acf-ee6ff317392b',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772585,1700309772585,'8f8bf04b-6bc2-43ec-a9f1-d09b035f47f6','c2cff0a1-4b0b-4380-aed2-4eefb656fa4e',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772589,1700309772589,'9dd3024f-4511-45d6-8dbf-6911823be916','fbf3c08b-5f0a-4a7f-a9b1-ff545586c710',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772503,1700309772503,'a0cc2c5b-3de4-4048-ad21-b05d3fbb6e44','21bb5de0-2db9-4c56-9c18-2a6c9d6195c1',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772566,1700309772566,'a50b741f-7b5c-40c6-b193-823c82b77b88','0de7d3f3-4333-4b56-b715-a18e2b2b686f',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772527,1700309772527,'ad516775-f42b-4b49-874f-f2b73eb0844a','5c34ab0e-5a56-42da-a043-0ec00f10d7be',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772531,1700309772531,'b1795f4d-1ec1-4d10-9fb4-5e9c2cb2b3fa','4e29ac35-f6c5-4cf6-bc43-f54c877c77b6',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772541,1700309772541,'b3135b92-4f35-4aad-acab-e3ea94bf1cb5','f9b7bf09-395f-4576-a2f0-cb8f785822b2',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772536,1700309772536,'d8d07f63-e5e0-4679-ada2-171b54b9f5dd','4b1539fa-9922-4914-b7e6-7f9099f32b77',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772496,1700309772496,'da8f05b3-17e4-4baa-bb8c-1a431392e6c9','e54b0165-690e-48e4-bc2b-0fe6ecf40b00',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772493,1700309772493,'dc0ebead-2567-4299-b14a-d68e3da7ed3c','1724214e-304c-4d90-a3a3-f5432168f05d',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg'),(_binary '',0,1700309772522,1700309772522,'e0b3cf07-4ff8-487d-a07f-17d5a5bd86d9','98eb9f42-9238-441f-8d61-f0fd66b9fbb3',NULL,NULL,'https://res.cloudinary.com/shoesf/image/upload/v1698907261/0c01a2ac-a893-4d1a-a7ae-4f64e5791a19/ntvbqcs5nlqcqqidz4v3.jpg');
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
INSERT INTO `material` VALUES (0,1700309772213,1700309772213,'3a20b6ee-58a5-432a-9e91-1d900371374c','Suede',NULL,NULL),(0,1700309772194,1700309772194,'53bab3a2-debd-4d58-a47a-173b34871bc0','Da bò',NULL,NULL),(0,1700309772209,1700309772209,'5eb38b5d-e1f9-49ea-ad12-b2dbd31eb9ba','Nylon',NULL,NULL),(0,1700309772200,1700309772200,'6e97bc71-2a41-461e-894b-f93c1582e067','Da lộn',NULL,NULL),(0,1700309772204,1700309772204,'de9feed1-1ba5-40f9-a5d9-2379494515d4','Vải canvas',NULL,NULL);
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
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
INSERT INTO `product` VALUES (0,1700309772180,1700309772180,'359964b5-8dcc-4a8c-81ac-a29c70071f50','Converse Chuck Taylor',NULL,NULL),(0,1700309772189,1700309772189,'36874d7f-4257-4f75-b006-65720b15a914','New Balance 990',NULL,NULL),(0,1700309772185,1700309772185,'4eae6bcb-c2b6-4428-a5e3-a204e0e1099f','Puma Suede',NULL,NULL),(0,1700309772170,1700309772170,'c5280099-2632-4f08-bfd1-768019d2a8b0','Adidas Superstar',NULL,NULL),(0,1700309772175,1700309772175,'d9c9ce8f-103d-4057-a567-ad9e6bc1fb93','Nike Air Force 1',NULL,NULL);
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
INSERT INTO `product_detail` VALUES (90,0,19000.00,1000,1700309772434,1700309772434,'PD019','0de7d3f3-4333-4b56-b715-a18e2b2b686f','763f00d1-c7cd-48c6-a795-1f2edf5046a3','eedb28fb-81db-43df-a240-ae47a3d92071','0beb1df5-3bc0-45af-beb2-770a09b4cdd5','6e97bc71-2a41-461e-894b-f93c1582e067','d9c9ce8f-103d-4057-a567-ad9e6bc1fb93','62f1eb04-b2da-49e7-9c8b-5a795c473d51','d2511360-72e6-475c-af3f-3ce50503ab68','Mô tả sản phẩm 19',NULL,NULL),(450,0,90000.00,1000,1700309772267,1700309772267,'PD002','1724214e-304c-4d90-a3a3-f5432168f05d','763f00d1-c7cd-48c6-a795-1f2edf5046a3','eedb28fb-81db-43df-a240-ae47a3d92071','0beb1df5-3bc0-45af-beb2-770a09b4cdd5','6e97bc71-2a41-461e-894b-f93c1582e067','d9c9ce8f-103d-4057-a567-ad9e6bc1fb93','62f1eb04-b2da-49e7-9c8b-5a795c473d51','d2511360-72e6-475c-af3f-3ce50503ab68','Mô tả sản phẩm 2',NULL,NULL),(300,0,60000.00,1000,1700309772287,1700309772287,'PD005','21bb5de0-2db9-4c56-9c18-2a6c9d6195c1','60bfa15f-52a5-4922-bcd3-f7d02b868a89','7c5237ca-df51-4cc9-b943-b697565fa00d','8fc9dde5-0092-437f-9c68-37a873ddf73d','3a20b6ee-58a5-432a-9e91-1d900371374c','36874d7f-4257-4f75-b006-65720b15a914','ee15a70a-be24-45ba-baa9-b13286dc90e1','3e18e8f4-bd5f-430f-8cd3-bbb56ba090c6','Mô tả sản phẩm 5',NULL,NULL),(500,0,100000.00,1000,1700309772258,1700309772258,'PD001','3d53eb6c-15bc-465e-801b-6d2215eef38d','c0688ffc-0dd5-4225-9065-7fa569dca778','dc462ba3-2a1a-4977-a079-282029960b4c','15a5f771-c351-4ab6-b006-a3a5ad0f8482','53bab3a2-debd-4d58-a47a-173b34871bc0','c5280099-2632-4f08-bfd1-768019d2a8b0','f75015c5-f5e0-4194-b208-890e57f912e3','f1236930-f089-48c6-9f7f-88ea29194912','Mô tả sản phẩm 1',NULL,NULL),(150,0,30000.00,1000,1700309772365,1700309772365,'PD012','4b1539fa-9922-4914-b7e6-7f9099f32b77','763f00d1-c7cd-48c6-a795-1f2edf5046a3','eedb28fb-81db-43df-a240-ae47a3d92071','0beb1df5-3bc0-45af-beb2-770a09b4cdd5','6e97bc71-2a41-461e-894b-f93c1582e067','d9c9ce8f-103d-4057-a567-ad9e6bc1fb93','3f563843-0dab-4b77-b491-fb7f04390401','d2511360-72e6-475c-af3f-3ce50503ab68','Mô tả sản phẩm 12',NULL,NULL),(180,0,35000.00,1000,1700309772356,1700309772356,'PD011','4e29ac35-f6c5-4cf6-bc43-f54c877c77b6','c0688ffc-0dd5-4225-9065-7fa569dca778','dc462ba3-2a1a-4977-a079-282029960b4c','15a5f771-c351-4ab6-b006-a3a5ad0f8482','53bab3a2-debd-4d58-a47a-173b34871bc0','c5280099-2632-4f08-bfd1-768019d2a8b0','ee15a70a-be24-45ba-baa9-b13286dc90e1','f1236930-f089-48c6-9f7f-88ea29194912','Mô tả sản phẩm 11',NULL,NULL),(110,0,22000.00,1000,1700309772457,1700309772457,'PD022','4e9cd50e-36b6-40ae-91c7-b5fd94f13ea7','60bfa15f-52a5-4922-bcd3-f7d02b868a89','7c5237ca-df51-4cc9-b943-b697565fa00d','0beb1df5-3bc0-45af-beb2-770a09b4cdd5','3a20b6ee-58a5-432a-9e91-1d900371374c','36874d7f-4257-4f75-b006-65720b15a914','ee15a70a-be24-45ba-baa9-b13286dc90e1','3e18e8f4-bd5f-430f-8cd3-bbb56ba090c6','Mô tả sản phẩm 22',NULL,NULL),(240,0,48000.00,1000,1700309772305,1700309772305,'PD007','585667a5-7858-4e87-b879-b722b0af6470','763f00d1-c7cd-48c6-a795-1f2edf5046a3','eedb28fb-81db-43df-a240-ae47a3d92071','0beb1df5-3bc0-45af-beb2-770a09b4cdd5','6e97bc71-2a41-461e-894b-f93c1582e067','d9c9ce8f-103d-4057-a567-ad9e6bc1fb93','62f1eb04-b2da-49e7-9c8b-5a795c473d51','c9efe338-3320-48c3-b62c-37d1f1856fcc','Mô tả sản phẩm 7',NULL,NULL),(200,0,40000.00,1000,1700309772345,1700309772345,'PD010','5c34ab0e-5a56-42da-a043-0ec00f10d7be','60bfa15f-52a5-4922-bcd3-f7d02b868a89','7c5237ca-df51-4cc9-b943-b697565fa00d','8fc9dde5-0092-437f-9c68-37a873ddf73d','3a20b6ee-58a5-432a-9e91-1d900371374c','36874d7f-4257-4f75-b006-65720b15a914','ee15a70a-be24-45ba-baa9-b13286dc90e1','f1236930-f089-48c6-9f7f-88ea29194912','Mô tả sản phẩm 10',NULL,NULL),(280,0,55000.00,1000,1700309772295,1700309772296,'PD006','5d3086a9-b99e-4a8e-a45f-3b71099cbfdb','c0688ffc-0dd5-4225-9065-7fa569dca778','dc462ba3-2a1a-4977-a079-282029960b4c','15a5f771-c351-4ab6-b006-a3a5ad0f8482','53bab3a2-debd-4d58-a47a-173b34871bc0','c5280099-2632-4f08-bfd1-768019d2a8b0','f75015c5-f5e0-4194-b208-890e57f912e3','3e18e8f4-bd5f-430f-8cd3-bbb56ba090c6','Mô tả sản phẩm 6',NULL,NULL),(90,0,18000.00,1000,1700309772428,1700309772428,'PD018','600591c6-2b6a-47f4-a9ff-adf69bcfc986','c0688ffc-0dd5-4225-9065-7fa569dca778','dc462ba3-2a1a-4977-a079-282029960b4c','15a5f771-c351-4ab6-b006-a3a5ad0f8482','de9feed1-1ba5-40f9-a5d9-2379494515d4','c5280099-2632-4f08-bfd1-768019d2a8b0','f75015c5-f5e0-4194-b208-890e57f912e3','f1236930-f089-48c6-9f7f-88ea29194912','Mô tả sản phẩm 18',NULL,NULL),(100,0,21000.00,1000,1700309772449,1700309772449,'PD021','62ccff86-f59d-4c2c-9b77-ae9b34d6f905','4cb3d2b8-9c1a-4bb5-a510-448634a7b6b7','066b505f-fce9-4d47-a68c-a74841d29da2','15a5f771-c351-4ab6-b006-a3a5ad0f8482','5eb38b5d-e1f9-49ea-ad12-b2dbd31eb9ba','4eae6bcb-c2b6-4428-a5e3-a204e0e1099f','3f563843-0dab-4b77-b491-fb7f04390401','c9efe338-3320-48c3-b62c-37d1f1856fcc','Mô tả sản phẩm 21',NULL,NULL),(100,0,20000.00,1000,1700309772388,1700309772388,'PD014','8924cbed-45c7-489b-8e4a-fdcac98b2231','4cb3d2b8-9c1a-4bb5-a510-448634a7b6b7','066b505f-fce9-4d47-a68c-a74841d29da2','d932755b-e3ca-4e4f-aa3f-3d78d084e489','5eb38b5d-e1f9-49ea-ad12-b2dbd31eb9ba','4eae6bcb-c2b6-4428-a5e3-a204e0e1099f','62f1eb04-b2da-49e7-9c8b-5a795c473d51','c9efe338-3320-48c3-b62c-37d1f1856fcc','Mô tả sản phẩm 14',NULL,NULL),(230,0,45000.00,1000,1700309772332,1700309772332,'PD009','98eb9f42-9238-441f-8d61-f0fd66b9fbb3','4cb3d2b8-9c1a-4bb5-a510-448634a7b6b7','066b505f-fce9-4d47-a68c-a74841d29da2','d932755b-e3ca-4e4f-aa3f-3d78d084e489','5eb38b5d-e1f9-49ea-ad12-b2dbd31eb9ba','4eae6bcb-c2b6-4428-a5e3-a204e0e1099f','3f563843-0dab-4b77-b491-fb7f04390401','d2511360-72e6-475c-af3f-3ce50503ab68','Mô tả sản phẩm 9',NULL,NULL),(50,0,10000.00,1000,1700309772420,1700309772421,'PD017','a17adc8b-71a9-483b-be1e-16d44e2a21eb','763f00d1-c7cd-48c6-a795-1f2edf5046a3','eedb28fb-81db-43df-a240-ae47a3d92071','0beb1df5-3bc0-45af-beb2-770a09b4cdd5','5eb38b5d-e1f9-49ea-ad12-b2dbd31eb9ba','d9c9ce8f-103d-4057-a567-ad9e6bc1fb93','62f1eb04-b2da-49e7-9c8b-5a795c473d51','d2511360-72e6-475c-af3f-3ce50503ab68','Mô tả sản phẩm 17',NULL,NULL),(250,0,50000.00,1000,1700309772318,1700309772318,'PD008','b56c11da-d40c-470e-9647-3a9dd969ad43','8f34188a-d436-471d-8bfb-3f50e85eb1cc','6e3744bb-b573-4db3-b328-4fcaa349880d','ce8b1455-e988-4a00-9aaf-3a09b69f2472','de9feed1-1ba5-40f9-a5d9-2379494515d4','359964b5-8dcc-4a8c-81ac-a29c70071f50','f2c15c85-7bb9-4d73-bc71-6228610f7c77','2d2df225-30c0-4864-ac12-d3002dbafab8','Mô tả sản phẩm 8',NULL,NULL),(110,0,23000.00,1000,1700309772464,1700309772464,'PD023','c2cff0a1-4b0b-4380-aed2-4eefb656fa4e','c0688ffc-0dd5-4225-9065-7fa569dca778','dc462ba3-2a1a-4977-a079-282029960b4c','ce8b1455-e988-4a00-9aaf-3a09b69f2472','53bab3a2-debd-4d58-a47a-173b34871bc0','c5280099-2632-4f08-bfd1-768019d2a8b0','f75015c5-f5e0-4194-b208-890e57f912e3','f1236930-f089-48c6-9f7f-88ea29194912','Mô tả sản phẩm 23',NULL,NULL),(120,0,25000.00,1000,1700309772476,1700309772476,'PD025','c9a912e6-9059-424d-9bbe-38999177a346','8f34188a-d436-471d-8bfb-3f50e85eb1cc','6e3744bb-b573-4db3-b328-4fcaa349880d','15a5f771-c351-4ab6-b006-a3a5ad0f8482','de9feed1-1ba5-40f9-a5d9-2379494515d4','359964b5-8dcc-4a8c-81ac-a29c70071f50','f2c15c85-7bb9-4d73-bc71-6228610f7c77','2d2df225-30c0-4864-ac12-d3002dbafab8','Mô tả sản phẩm 25',NULL,NULL),(80,0,15000.00,1000,1700309772399,1700309772399,'PD015','d74474bd-53e1-4f63-9631-d9fe647aaf53','60bfa15f-52a5-4922-bcd3-f7d02b868a89','7c5237ca-df51-4cc9-b943-b697565fa00d','8fc9dde5-0092-437f-9c68-37a873ddf73d','3a20b6ee-58a5-432a-9e91-1d900371374c','36874d7f-4257-4f75-b006-65720b15a914','f75015c5-f5e0-4194-b208-890e57f912e3','3e18e8f4-bd5f-430f-8cd3-bbb56ba090c6','Mô tả sản phẩm 15',NULL,NULL),(350,0,70000.00,1000,1700309772280,1700309772280,'PD004','de38068f-5e6b-4358-a052-575cf2cf37e7','4cb3d2b8-9c1a-4bb5-a510-448634a7b6b7','066b505f-fce9-4d47-a68c-a74841d29da2','d932755b-e3ca-4e4f-aa3f-3d78d084e489','5eb38b5d-e1f9-49ea-ad12-b2dbd31eb9ba','4eae6bcb-c2b6-4428-a5e3-a204e0e1099f','3f563843-0dab-4b77-b491-fb7f04390401','c9efe338-3320-48c3-b62c-37d1f1856fcc','Mô tả sản phẩm 4',NULL,NULL),(100,0,20000.00,1000,1700309772441,1700309772441,'PD020','e4204a65-72a3-436c-80ba-11df548d1820','8f34188a-d436-471d-8bfb-3f50e85eb1cc','6e3744bb-b573-4db3-b328-4fcaa349880d','ce8b1455-e988-4a00-9aaf-3a09b69f2472','53bab3a2-debd-4d58-a47a-173b34871bc0','359964b5-8dcc-4a8c-81ac-a29c70071f50','f2c15c85-7bb9-4d73-bc71-6228610f7c77','2d2df225-30c0-4864-ac12-d3002dbafab8','Mô tả sản phẩm 20',NULL,NULL),(400,0,80000.00,1000,1700309772274,1700309772274,'PD003','e54b0165-690e-48e4-bc2b-0fe6ecf40b00','8f34188a-d436-471d-8bfb-3f50e85eb1cc','6e3744bb-b573-4db3-b328-4fcaa349880d','ce8b1455-e988-4a00-9aaf-3a09b69f2472','de9feed1-1ba5-40f9-a5d9-2379494515d4','359964b5-8dcc-4a8c-81ac-a29c70071f50','f2c15c85-7bb9-4d73-bc71-6228610f7c77','2d2df225-30c0-4864-ac12-d3002dbafab8','Mô tả sản phẩm 3',NULL,NULL),(60,0,12000.00,1000,1700309772410,1700309772410,'PD016','f80a15b9-41a9-428c-8acf-ee6ff317392b','c0688ffc-0dd5-4225-9065-7fa569dca778','dc462ba3-2a1a-4977-a079-282029960b4c','15a5f771-c351-4ab6-b006-a3a5ad0f8482','3a20b6ee-58a5-432a-9e91-1d900371374c','c5280099-2632-4f08-bfd1-768019d2a8b0','f75015c5-f5e0-4194-b208-890e57f912e3','f1236930-f089-48c6-9f7f-88ea29194912','Mô tả sản phẩm 16',NULL,NULL),(130,0,25000.00,1000,1700309772379,1700309772379,'PD013','f9b7bf09-395f-4576-a2f0-cb8f785822b2','8f34188a-d436-471d-8bfb-3f50e85eb1cc','6e3744bb-b573-4db3-b328-4fcaa349880d','ce8b1455-e988-4a00-9aaf-3a09b69f2472','de9feed1-1ba5-40f9-a5d9-2379494515d4','359964b5-8dcc-4a8c-81ac-a29c70071f50','f2c15c85-7bb9-4d73-bc71-6228610f7c77','2d2df225-30c0-4864-ac12-d3002dbafab8','Mô tả sản phẩm 13',NULL,NULL),(120,0,24000.00,1000,1700309772470,1700309772470,'PD024','fbf3c08b-5f0a-4a7f-a9b1-ff545586c710','763f00d1-c7cd-48c6-a795-1f2edf5046a3','eedb28fb-81db-43df-a240-ae47a3d92071','15a5f771-c351-4ab6-b006-a3a5ad0f8482','6e97bc71-2a41-461e-894b-f93c1582e067','d9c9ce8f-103d-4057-a567-ad9e6bc1fb93','62f1eb04-b2da-49e7-9c8b-5a795c473d51','d2511360-72e6-475c-af3f-3ce50503ab68','Mô tả sản phẩm 24',NULL,NULL);
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
INSERT INTO `product_promotion` VALUES (70.00,1700309772769,1700309772769,'028867b4-524e-4a39-ad68-21276046f051','21bb5de0-2db9-4c56-9c18-2a6c9d6195c1','0d0d7156-fdab-40d4-8e59-fae0a5fa3241',NULL,NULL),(150.00,1700309772843,1700309772843,'06f3a216-07a9-4f0f-abf7-9667b0c4a35f','62ccff86-f59d-4c2c-9b77-ae9b34d6f905','6755f917-8691-4fd7-805f-4066a5a40ac3',NULL,NULL),(80.00,1700309772780,1700309772780,'17b74b8d-fde6-44ba-a63a-eb44fdcd9d1e','585667a5-7858-4e87-b879-b722b0af6470','9d677ded-0324-4f94-900b-4a18a471b8f7',NULL,NULL),(65.00,1700309772764,1700309772764,'1d5c4f7c-d9de-441b-a7f0-ee0ce908f735','de38068f-5e6b-4358-a052-575cf2cf37e7','0d0d7156-fdab-40d4-8e59-fae0a5fa3241',NULL,NULL),(95.00,1700309772798,1700309772798,'22602625-a7ec-4b36-baac-0c6d4e6a538d','5c34ab0e-5a56-42da-a043-0ec00f10d7be','6755f917-8691-4fd7-805f-4066a5a40ac3',NULL,NULL),(85.00,1700309772786,1700309772786,'2530d61a-6eb8-4a5e-8dcb-f153dbf246cc','b56c11da-d40c-470e-9647-3a9dd969ad43','617aa564-1ff6-43cc-89a2-f228325a29e3',NULL,NULL),(120.00,1700309772824,1700309772824,'31eba890-884d-487c-873a-8ee92e77276b','d74474bd-53e1-4f63-9631-d9fe647aaf53','617aa564-1ff6-43cc-89a2-f228325a29e3',NULL,NULL),(55.00,1700309772753,1700309772753,'3233703c-4b05-4607-82c3-44e248a0815c','1724214e-304c-4d90-a3a3-f5432168f05d','0d0d7156-fdab-40d4-8e59-fae0a5fa3241',NULL,NULL),(155.00,1700309772846,1700309772846,'449b8042-659f-4928-8172-e569453cdb2e','4e9cd50e-36b6-40ae-91c7-b5fd94f13ea7','6755f917-8691-4fd7-805f-4066a5a40ac3',NULL,NULL),(115.00,1700309772820,1700309772820,'5e1d1c9e-5daf-4f9f-80eb-4f50167d47eb','8924cbed-45c7-489b-8e4a-fdcac98b2231','617aa564-1ff6-43cc-89a2-f228325a29e3',NULL,NULL),(60.00,1700309772758,1700309772758,'6a9e215d-17cc-4858-a2ca-ecb9713a8bed','e54b0165-690e-48e4-bc2b-0fe6ecf40b00','0d0d7156-fdab-40d4-8e59-fae0a5fa3241',NULL,NULL),(145.00,1700309772840,1700309772840,'6e9b606d-1407-442e-83ef-1d5a7b867bd5','e4204a65-72a3-436c-80ba-11df548d1820','e4fc6718-9409-4bcd-b043-084759f05180',NULL,NULL),(50.00,1700309772747,1700309772747,'71322728-8c6c-4fbd-bc64-ce58d7e70008','3d53eb6c-15bc-465e-801b-6d2215eef38d','0d0d7156-fdab-40d4-8e59-fae0a5fa3241',NULL,NULL),(110.00,1700309772814,1700309772814,'82e74d9f-a100-4298-a617-baad3d2fae86','f9b7bf09-395f-4576-a2f0-cb8f785822b2','617aa564-1ff6-43cc-89a2-f228325a29e3',NULL,NULL),(140.00,1700309772837,1700309772837,'87df8c93-301f-4ae5-953c-fce26453a1ab','0de7d3f3-4333-4b56-b715-a18e2b2b686f','e4fc6718-9409-4bcd-b043-084759f05180',NULL,NULL),(125.00,1700309772828,1700309772828,'94c1d183-a738-466b-9585-a47be84a7d60','f80a15b9-41a9-428c-8acf-ee6ff317392b','e4fc6718-9409-4bcd-b043-084759f05180',NULL,NULL),(160.00,1700309772849,1700309772849,'99679e3b-39ea-4a0b-af37-9a874b631a1f','c2cff0a1-4b0b-4380-aed2-4eefb656fa4e','6755f917-8691-4fd7-805f-4066a5a40ac3',NULL,NULL),(130.00,1700309772832,1700309772832,'99afc161-cee9-4ea2-8900-b641dd04aaf7','a17adc8b-71a9-483b-be1e-16d44e2a21eb','e4fc6718-9409-4bcd-b043-084759f05180',NULL,NULL),(170.00,1700309772856,1700309772856,'9fb6c23c-b2c3-4b43-b80d-00d23bc6f50e','c9a912e6-9059-424d-9bbe-38999177a346','6755f917-8691-4fd7-805f-4066a5a40ac3',NULL,NULL),(105.00,1700309772808,1700309772808,'b25a40ab-dc71-4720-8fcd-14f791393f39','4b1539fa-9922-4914-b7e6-7f9099f32b77','617aa564-1ff6-43cc-89a2-f228325a29e3',NULL,NULL),(100.00,1700309772803,1700309772803,'cdb3c0a0-ac8e-4afc-8f14-b7a5b49247ea','4e29ac35-f6c5-4cf6-bc43-f54c877c77b6','617aa564-1ff6-43cc-89a2-f228325a29e3',NULL,NULL),(90.00,1700309772792,1700309772792,'ed095ebb-ec53-4c20-8959-0baf888cc716','98eb9f42-9238-441f-8d61-f0fd66b9fbb3','e4fc6718-9409-4bcd-b043-084759f05180',NULL,NULL),(135.00,1700309772834,1700309772834,'f5b5f31b-a11a-46da-b338-dae010544c68','600591c6-2b6a-47f4-a9ff-adf69bcfc986','e4fc6718-9409-4bcd-b043-084759f05180',NULL,NULL),(165.00,1700309772853,1700309772853,'fa0218f6-91b2-4714-9ea5-f9bf49df8169','fbf3c08b-5f0a-4a7f-a9b1-ff545586c710','6755f917-8691-4fd7-805f-4066a5a40ac3',NULL,NULL),(75.00,1700309772775,1700309772775,'fcaff198-f9b5-481e-9275-e280e1ef91df','5d3086a9-b99e-4a8e-a45f-3b71099cbfdb','9d677ded-0324-4f94-900b-4a18a471b8f7',NULL,NULL);
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
INSERT INTO `promotion` VALUES (0,_binary '',50,1700309771934,1700396171933,1700309771933,1700309771934,'0d0d7156-fdab-40d4-8e59-fae0a5fa3241','Promotion 1',NULL,NULL),(2,_binary '',70,1700309771945,1700396171944,1700309771944,1700309771945,'617aa564-1ff6-43cc-89a2-f228325a29e3','Promotion 3',NULL,NULL),(1,_binary '',90,1700309771954,1700396171953,1700309771953,1700309771954,'6755f917-8691-4fd7-805f-4066a5a40ac3','Promotion 5',NULL,NULL),(1,_binary '',60,1700309771940,1700396171940,1700309771940,1700309771940,'9d677ded-0324-4f94-900b-4a18a471b8f7','Promotion 2',NULL,NULL),(1,_binary '',80,1700309771950,1700396171949,1700309771949,1700309771950,'e4fc6718-9409-4bcd-b043-084759f05180','Promotion 4',NULL,NULL);
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
  `id_product_detail` varchar(36) DEFAULT NULL,
  `id_return` varchar(36) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf3324cty7psh7srxbhlxsnlp5` (`id_product_detail`),
  KEY `FKa0movpe9ilhgs03vck60l6wl8` (`id_return`),
  CONSTRAINT `FKa0movpe9ilhgs03vck60l6wl8` FOREIGN KEY (`id_return`) REFERENCES `returns` (`id`),
  CONSTRAINT `FKf3324cty7psh7srxbhlxsnlp5` FOREIGN KEY (`id_product_detail`) REFERENCES `product_detail` (`id`)
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
  CONSTRAINT `returns_chk_1` CHECK ((`status` between 0 and 2))
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
INSERT INTO `size` VALUES (0,39,1700309772159,1700309772159,'3f563843-0dab-4b77-b491-fb7f04390401',NULL,NULL),(0,37,1700309772150,1700309772150,'62f1eb04-b2da-49e7-9c8b-5a795c473d51',NULL,NULL),(0,40,1700309772164,1700309772164,'ee15a70a-be24-45ba-baa9-b13286dc90e1',NULL,NULL),(0,38,1700309772154,1700309772154,'f2c15c85-7bb9-4d73-bc71-6228610f7c77',NULL,NULL),(0,36,1700309772144,1700309772144,'f75015c5-f5e0-4194-b208-890e57f912e3',NULL,NULL);
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
INSERT INTO `sole` VALUES (0,1700309772130,1700309772130,'2d2df225-30c0-4864-ac12-d3002dbafab8','Đế vàng',NULL,NULL),(0,1700309772139,1700309772139,'3e18e8f4-bd5f-430f-8cd3-bbb56ba090c6','Đế nhựa',NULL,NULL),(0,1700309772134,1700309772134,'c9efe338-3320-48c3-b62c-37d1f1856fcc','Đế sắt',NULL,NULL),(0,1700309772125,1700309772125,'d2511360-72e6-475c-af3f-3ce50503ab68','Đế da',NULL,NULL),(0,1700309772117,1700309772118,'f1236930-f089-48c6-9f7f-88ea29194912','Đế cao su',NULL,NULL);
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
INSERT INTO `transaction` VALUES (1,0,1200000.00,0,1700309772741,1700309772741,'1fe0ae33-5f84-484f-bfef-43580a280925','2f30e0e3-1d9c-4c18-a8cd-6d50b30d8773','3b3b5dfa-ac77-4c8d-8414-e924510c0d24',NULL,'Payment for Order #HD12',NULL,NULL),(1,0,700000.00,0,1700309772717,1700309772717,'23762617-d71e-4109-8653-dbd3069b9f23','4c555c02-61f2-4fad-920c-30302c773006','efaef719-14c8-4b2b-b3f1-e0809f104681',NULL,'Payment for Order #HD3',NULL,NULL),(0,0,1000000.00,0,1700309772729,1700309772729,'7d3de467-b05c-4a38-8f53-2e54a8513583','75c54e1c-8a9b-4ebe-9370-d0073af182ad','a32ebce6-f6b5-4f5d-bb87-f1102137b0c1',NULL,'Payment for Order #HD6',NULL,NULL),(1,0,600000.00,0,1700309772712,1700309772712,'8c017cd3-e339-4170-a547-bfde028fdb0b','2f30e0e3-1d9c-4c18-a8cd-6d50b30d8773','13ec5327-1868-4634-ac4e-d6ef5ab5c2a4',NULL,'Payment for Order #HD2',NULL,NULL),(0,0,1100000.00,0,1700309772735,1700309772735,'8f4648ce-7d90-4e54-8ad7-c910be6a91e4','2cf744e4-5edc-4e85-8cc1-6ed77a98b8ca','12487ba4-e478-4dc5-8cec-677d0ce436b3',NULL,'Payment for Order #HD11',NULL,NULL),(0,0,800000.00,0,1700309772723,1700309772723,'d38e8505-a91b-48f5-b7ea-d106bb454ab3','2cf744e4-5edc-4e85-8cc1-6ed77a98b8ca','c3a854e7-2971-4acc-9907-0847a8efc219',NULL,'Payment for Order #HD4',NULL,NULL),(1,0,500000.00,0,1700309772706,1700309772706,'fcc54195-7c8d-45b2-8d99-0e96dea8e3dd','75c54e1c-8a9b-4ebe-9370-d0073af182ad','1ea1f05b-1a5c-40f7-ae80-07dfb5cb168b',NULL,'Payment for Order #HD1',NULL,NULL);
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
INSERT INTO `voucher` VALUES (100.00,50.00,10,1,1,0,25.00,1700309771983,1700914571982,1700309771982,1700309771983,'VC12345','1aba96cf-15c9-42c1-acc2-5092005f78a9','Voucher 1',NULL,NULL);
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'datn_website_fshoes'
--

--
-- Dumping routines for database 'datn_website_fshoes'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-18 19:26:07
