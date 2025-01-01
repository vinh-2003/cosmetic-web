-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: cosmetic_web
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

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
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner` (
  `banner_id` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`banner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner`
--

LOCK TABLES `banner` WRITE;
/*!40000 ALTER TABLE `banner` DISABLE KEYS */;
INSERT INTO `banner` VALUES ('153ceb68-7ed0-410c-a739-4a533f31d5af','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735215213/dkhlcuvepgirw1zbsczf.png','http://localhost:8080/frontend/html/product-search.html?categoryId=25a8faae-c17c-44fc-a1ba-42b439438037','2025-01-01 06:47:31','2024-12-26 12:18:00','2024-12-26 12:13:31'),('1f928619-8cb1-4935-ac83-5115085b4ed3','http://res.cloudinary.com/dhhr73s2r/image/upload/v1734961520/zbc4xhjgcvndaxjeljjl.png','http://localhost:8080/frontend/html/product-search.html?categoryId=b8159887-8763-415f-baa9-9d3ae97fa1ad','2025-01-01 06:47:31','2024-12-23 13:49:00','2024-12-23 13:45:17'),('8c848489-fe29-4584-8a02-2512d5e9a9a0','http://res.cloudinary.com/dhhr73s2r/image/upload/v1734961553/rv5crbxeaky98z0amjd9.png','http://localhost:8080/frontend/html/product-search.html?categoryId=25a8faae-c17c-44fc-a1ba-42b439438037','2025-01-01 06:47:31','2024-12-23 13:51:00','2024-12-23 13:45:49'),('a743fbf2-e382-4d65-b9b1-5291ad38229d','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735215388/l0dzm36xjrd5cdl0chgw.png','http://localhost:8080/frontend/html/product-search.html?categoryId=b8159887-8763-415f-baa9-9d3ae97fa1ad','2025-01-01 06:47:31','2024-12-31 15:31:00','2024-12-26 12:16:27'),('c56d66b3-b27c-4683-a914-18c8f50a1c7c','http://res.cloudinary.com/dhhr73s2r/image/upload/v1734961603/fqulczvqvz83b7uexsol.png','http://localhost:8080/frontend/html/product-search.html?categoryId=b8159887-8763-415f-baa9-9d3ae97fa1ad','2025-01-01 06:47:31','2024-12-23 13:52:00','2024-12-23 13:46:40');
/*!40000 ALTER TABLE `banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES ('0acf382f-5dc2-4713-81b5-5a4a33da3ac4','2bf41b7d-024e-42ce-8918-f77a4e1f6df8','2024-12-25 12:35:44'),('0f01ad27-40df-46a1-bd28-60b74e8e33bb','115de684-c459-437c-97a6-52c68fd16f7f','2024-12-22 15:00:49'),('105015aa-1f20-4c5f-837b-f9124073e54d','81cc88dd-b159-40a8-b093-e78b6232be95','2024-12-25 12:54:33'),('37919cb2-813f-4251-8b33-73c5a330b3a3','7494a5cb-6d84-4748-abd4-56845ce27cfe','2024-12-29 08:26:14'),('af360344-6777-4a80-ac86-30377fa2219e','979ffb7e-7bf7-42a1-9ba7-4e34a4644a5e','2024-12-26 17:48:45'),('bc46f2ea-85b4-423c-87cf-a646a3edc995','b7c1a8d8-eb87-4365-80b9-81be2ed8fe0c','2024-12-22 11:57:11'),('c1d563f6-c135-4511-9fd6-43935904d88c','e46d9d66-97c5-403a-bb47-98725d950dcd','2024-12-25 07:33:55'),('e0f7b752-3ec9-4751-91ea-e58b4b5306c0','85eca848-2cae-40d0-b356-0dd4fd3accd0','2025-01-01 07:06:06'),('f1995dae-9e05-4976-ae11-a5b78868affa','92ccb1a4-038d-4575-92b5-75c89f33c19e','2024-12-26 02:22:39'),('f40a6240-858c-4957-a5ae-68d36bf704fe','1e107c39-a878-47c0-a016-dfed1f6c60df','2024-12-26 17:50:21'),('faa4b8cb-6408-4df0-8762-2e04449742ae','07ed76e5-39aa-4e97-a0f4-0adf677352c5','2024-12-22 11:54:31'),('ff5b9826-131d-4aa5-8c26-5073f06db571','3eae249f-f358-4414-ba61-bb459df330c5','2025-01-01 07:14:33');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `cart_item_id` varchar(255) NOT NULL,
  `cart_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` bigint(20) NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`),
  CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES ('32821424-360f-4927-b0ad-ccc9dde1b746','bc46f2ea-85b4-423c-87cf-a646a3edc995','8afb96e5-d764-40cb-846d-650db0d343de',1,121500),('46e49653-4b1c-439b-bb32-81849ae3a05d','37919cb2-813f-4251-8b33-73c5a330b3a3','1621eadf-6401-4747-b586-2f5e41e59955',1,97000),('a979df5d-6324-4a9d-be77-982f392f6313','0acf382f-5dc2-4713-81b5-5a4a33da3ac4','365a6ec6-80af-43b0-891d-4fb19d690f5b',1,122550);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `enabled` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('19df2f04-8f0f-4b6a-b38a-749a7f7180b9','Chăm sóc da mụn','Chăm sóc da mụn','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735487689/p4clachkjrfxucrgw0nk.png','2024-12-29 15:54:03',1),('25a8faae-c17c-44fc-a1ba-42b439438037','Tẩy trang','Tẩy trang 2','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735029387/vxck2yqg99tz55lrreez.png','2024-12-24 08:36:25',1),('2bd7513a-77ee-4fc1-9585-545557a6ea4f','Dưỡng ẩm','Dưỡng ẩm','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735210906/nek6yjta55lrrpqowyzk.jpg','2024-12-26 11:01:46',1),('6e7958ee-5488-4ca9-ad64-d95d2fae24df','Kem dưỡng / Sữa dưỡng','Kem dưỡng / Sữa dưỡng','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735487458/hrwrndks4re8jzibbycp.png','2024-12-29 15:50:56',1),('b4b6dfff-bbe8-4edc-93b9-1f1f213bedc2','Dưỡng trắng mờ thâm sạm','Dưỡng trắng mờ thâm sạm','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735487577/r6qmf1lqdvbflf0jq6zk.png','2024-12-29 15:52:56',1),('b8159887-8763-415f-baa9-9d3ae97fa1ad','Tinh chất / Serum','Tinh chất / Serum','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735487430/e5k12w1ehzylh5dxb9gk.png','2024-12-29 15:50:29',1),('ca13e86f-586d-4bc8-9c13-3494ca133250','Dung dịch dưỡng','Dung dịch dưỡng','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735029453/vjgrklkijvqbepnmqr52.png','2024-12-24 08:37:31',0),('da9c81fc-048e-4668-aba1-745eb22323e0','Phạm Văn Vinh','ádfsdfds','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735204591/jdfjd2xskvcy7qpdiikx.png','2024-12-26 09:16:30',0),('e5ad2a99-7e22-4efd-ba31-eb7f85942802','Chống lão hoá','Chống lão hoá','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735487609/jp2ubq7stq2r1tadxpli.png','2024-12-29 15:53:28',1),('f900d59d-d43b-4fc3-8a33-ecbb710f4fe7','Nâng cấp dưỡng da','Nâng cấp dưỡng da','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735487723/k6a7yvyv2o1myiuwnmwr.png','2024-12-29 15:55:21',1),('fb65ea96-fb6f-4a1c-b306-db0631468f1d','Rửa mặt','Rửa mặt','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735029422/gpguwkvcjhufctjffv4o.png','2024-12-24 08:37:01',1),('fce32375-6a56-453b-bdf6-80ccf4cc60f2','Mặt nạ','Mặt nạ','http://res.cloudinary.com/dhhr73s2r/image/upload/v1735487485/mtjjals2odnzhughkizi.png','2024-12-29 15:51:24',1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invalidated_token`
--

DROP TABLE IF EXISTS `invalidated_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invalidated_token` (
  `id` varchar(255) NOT NULL,
  `expiry_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invalidated_token`
--

LOCK TABLES `invalidated_token` WRITE;
/*!40000 ALTER TABLE `invalidated_token` DISABLE KEYS */;
INSERT INTO `invalidated_token` VALUES ('002c647b-300d-4c0d-8ae5-5ff51f2cb39b','2024-12-30 18:43:27.000000'),('002f03f4-77d4-4f08-9434-f251068d68cf','2024-12-26 19:03:49.000000'),('0457af68-05c1-43b0-bb7f-b32e187697ec','2024-12-31 01:30:59.000000'),('07e4dd95-6465-4be5-80eb-6647d00cbb8e','2024-12-28 17:48:21.000000'),('175c94ae-7f17-4617-a7a6-3db3bc0fddb7','2024-12-30 18:12:45.000000'),('1b8015bf-fb50-459b-8c93-9bcf0f97d474','2024-12-27 14:18:17.000000'),('24647acb-2eee-445a-ad0f-308236b80fa5','2024-12-30 17:03:37.000000'),('24d7eaaf-996f-4448-b172-47fe25abd6de','2024-12-26 09:39:44.000000'),('2b570e59-9f1f-4fa9-9b43-a42a7ecf9c86','2024-12-25 13:45:26.000000'),('2b937a0b-acab-46e9-af44-7833fcce12d7','2024-12-30 18:34:03.000000'),('2bf9373a-9d0e-4758-886f-cff1ef8fe886','2024-12-30 18:12:35.000000'),('2e16c885-2f1d-4ce2-9cc8-44c904a03d11','2024-12-25 14:34:50.000000'),('2fb5e2cd-aa2e-424c-ba06-13701aaec741','2024-12-25 14:39:47.000000'),('31323d9b-e8b9-4e2c-bf9a-0ac59efaffc8','2024-12-29 19:04:31.000000'),('31b3399f-9075-4ed1-827e-e82a3837ede5','2024-12-27 18:02:13.000000'),('31cc5fde-cffa-48e6-aa19-5df49affb511','2024-12-26 19:01:12.000000'),('3321837b-148b-42d1-8690-5bd30f8989b6','2024-12-26 18:49:43.000000'),('371e8054-a0d5-4391-bb71-f4ee70a9d2c3','2024-12-28 20:12:12.000000'),('3999d795-6e83-4c78-a3e4-3e91cca3a7b4','2024-12-25 15:34:02.000000'),('3b583570-ae1b-4c0c-b084-8a4966ad30f3','2024-12-25 14:31:31.000000'),('3ec92044-671c-4c04-ba76-16c9bf7199f2','2025-01-01 15:14:33.000000'),('4635f509-ded7-491f-a760-8be3e9fb19a9','2024-12-30 00:06:50.000000'),('46435c42-9df7-431d-957c-ec1ce6fa173f','2024-12-29 23:49:31.000000'),('4765c2d8-5d28-4a3d-8d70-3d043900f8fd','2024-12-30 09:34:12.000000'),('4857f8aa-d02b-4eb6-8d32-dda9c037e485','2024-12-29 23:57:04.000000'),('48bee8ad-d221-43c6-ba40-f1dc7102191b','2024-12-30 00:15:23.000000'),('4a6f6c76-71fa-4949-a3db-e826012f33c2','2024-12-27 00:03:06.000000'),('4ab9b27b-44de-4967-8ab1-98e01edeb355','2024-12-26 20:00:12.000000'),('4ccd1780-0a8a-4515-9979-24424b260844','2024-12-30 11:21:08.000000'),('50e811c9-0b9c-42cf-bb5a-30621cc86191','2024-12-29 18:02:07.000000'),('55516208-77de-436c-a7ee-9220b56872a5','2024-12-29 23:35:14.000000'),('55b40a6d-4d80-409a-8a40-c8ebc65eb84a','2024-12-29 23:34:47.000000'),('55bc5562-62d8-4b74-b55e-def2e3dea310','2024-12-26 17:46:15.000000'),('571e0547-058e-44ae-b49b-41af3a11d878','2024-12-29 23:43:11.000000'),('59651313-524a-4486-afcc-4697ccc7b252','2024-12-29 17:23:22.000000'),('605af5b4-f673-4f56-b3ea-15ed7d992191','2024-12-27 01:45:17.000000'),('6626ff0a-a083-47d7-8cac-c84f332b4f65','2024-12-28 17:48:09.000000'),('682d8fdd-4346-4f71-b717-4ee24d64a2de','2024-12-29 18:03:04.000000'),('68aa7bcd-5b12-45c8-8a44-5ad99400f0ed','2024-12-29 16:04:24.000000'),('6ba8b1ba-3f1b-4b7f-abf8-d7b22416ed4d','2024-12-30 18:54:46.000000'),('6c2e281e-9fdd-4682-96e1-1cad894d7af9','2024-12-25 02:29:50.000000'),('6c4b4959-8507-44a2-9bf8-2febf4a59409','2024-12-27 01:45:52.000000'),('6ccf04e4-1d19-43b9-8d9f-215d63157440','2024-12-30 18:48:43.000000'),('6e093e9d-9f39-4df0-9fe0-42fea16ae388','2024-12-30 18:50:30.000000'),('6fa775a8-d24f-48a5-9b2c-f04d8be661c1','2024-12-25 14:28:20.000000'),('70360e61-91f8-437f-a0b6-a2832f5034f8','2024-12-27 01:44:22.000000'),('71de9d8b-2606-4019-a86d-b4706cd8cf41','2024-12-27 18:04:49.000000'),('75986661-3c26-4fc5-8da4-094c070769e2','2024-12-30 18:44:08.000000'),('79b42b9c-9837-42c3-b74a-6979a4854811','2024-12-30 00:19:48.000000'),('7a364ca7-56a4-4d65-bb96-76163b1c878d','2024-12-27 17:12:58.000000'),('7b659a82-217b-4651-8998-3593bf2f4eb0','2024-12-26 09:38:23.000000'),('7d28512c-2322-46dd-a71e-255059477639','2024-12-28 19:47:29.000000'),('7df41a17-4b57-47a5-aaa4-1157aef01c3d','2024-12-30 17:03:59.000000'),('80fb4450-e27e-4190-bf4d-b26ec3869a17','2024-12-29 12:32:00.000000'),('836033f2-8564-4a4f-9093-0321b6d6807b','2024-12-25 15:46:03.000000'),('83b11227-400f-4abf-a92d-8393def17168','2024-12-30 19:18:51.000000'),('857e9486-f908-4530-ba70-4c34a329fe17','2024-12-26 18:49:52.000000'),('87384ea0-8c05-4045-b20b-228693f97444','2024-12-25 15:41:04.000000'),('8b3468b3-44a1-4d62-ae7c-8dca25468927','2024-12-30 18:44:43.000000'),('8b885f33-ef68-4dbf-8382-8a84a3b5b257','2024-12-29 17:26:08.000000'),('8d6375e5-a157-401d-9665-1ba7e40f30e7','2024-12-29 18:03:21.000000'),('8ee276ef-aa94-4e2d-8054-0bfbbd17e917','2024-12-27 01:28:24.000000'),('91277603-090f-4f80-96f0-0a972e477aa4','2024-12-29 23:36:27.000000'),('9146c0ff-7be3-486f-9ae8-15e2c1a5b16d','2024-12-29 17:24:48.000000'),('914ec29d-a21b-43e1-ac56-0c29ea3eb2f7','2024-12-29 16:04:42.000000'),('928545ad-3ffb-4acd-aa20-d4dd17f78c6d','2024-12-27 14:19:29.000000'),('987951c8-ee30-4d3b-a57a-e186765a553f','2025-01-01 15:12:03.000000'),('9aa71ad9-281b-4191-be64-287ea7d1406b','2024-12-30 18:58:13.000000'),('9aed04fd-0f58-4688-9739-43b8f987ca36','2024-12-30 18:50:46.000000'),('9b302704-0194-4455-851a-792b1c78b41c','2024-12-29 17:47:25.000000'),('9b6b3cbf-40bf-4750-a403-3b47926d3e7d','2024-12-29 23:35:26.000000'),('9ede0a0f-4525-4f78-a3ff-0ff4ac8d9ab4','2024-12-26 20:05:52.000000'),('a21a848d-eb82-4809-87ae-3eac6d6e5c0f','2024-12-29 16:30:11.000000'),('a5977463-2747-4226-b96d-a601de60d289','2024-12-30 19:02:55.000000'),('a894c9c9-ad98-41e5-8da4-b8c697488f71','2024-12-29 16:29:57.000000'),('b5ec17ce-3901-472e-bdfb-03bd43de0b1a','2024-12-25 01:44:02.000000'),('b8a76ffc-c646-4a2a-aaa7-5344a2bdd838','2024-12-30 18:47:41.000000'),('b99d1836-eb41-4e6e-8876-b8ed17db717d','2024-12-27 18:04:11.000000'),('b9e07809-ed7a-429d-9ab2-bb548207b3cd','2024-12-26 18:21:00.000000'),('bfc7fea8-c1d5-4ee5-bf43-df5fc9137d43','2024-12-29 17:22:16.000000'),('c85b37bb-905b-4257-9349-261a389126fb','2024-12-28 17:31:53.000000'),('c95ac555-3a20-404c-b56e-3ec881043758','2024-12-30 11:20:46.000000'),('caa81984-5358-46cd-baba-c04f80f51c7c','2024-12-29 16:26:14.000000'),('d1e6c623-a7ba-4c6d-aaac-e01b1bffe8e5','2024-12-29 17:59:39.000000'),('d52f98c4-bcc9-477b-9ea5-ed7b120196e5','2024-12-31 22:59:45.000000'),('d697e3e1-08d4-4dc9-8246-3c9ef2d8cbb1','2024-12-30 18:33:50.000000'),('d6d528f3-c180-4f56-ac9a-3b233d08e1f4','2024-12-28 01:11:49.000000'),('d94bd00c-22fd-4868-ae0a-eff549e9e726','2024-12-30 18:55:00.000000'),('df2e19ab-fde1-46bc-ac2c-4ece6639148f','2024-12-25 02:27:41.000000'),('dfcb8309-a392-4137-872d-0c75db8db98a','2024-12-30 00:13:55.000000'),('e322c617-3f0d-4cfa-9b57-836d7896b5ac','2024-12-26 23:31:43.000000'),('e528179e-bb30-454d-abee-3e076b3348f1','2024-12-29 16:35:36.000000'),('e5d4cefb-48ac-4231-af50-b1d9e4b20431','2024-12-30 18:12:21.000000'),('ec625563-8e22-49e4-b5c2-a381975a6d5b','2024-12-30 18:45:37.000000'),('ecfcd187-9d4a-475f-9a0e-79099fb9e0bf','2024-12-30 11:23:04.000000'),('ef808560-a086-4b29-b2c3-296f543cc2d6','2024-12-29 12:25:03.000000'),('f40af7b1-38b3-4a32-813a-2579b3702937','2024-12-27 01:31:47.000000'),('f76f0a2f-b895-4e26-b519-4b623f23139e','2024-12-29 12:30:54.000000'),('fcaf0592-b0a1-4681-81a7-0ddb2eeaa2e0','2024-12-26 20:08:06.000000'),('ffe55118-cde6-4b37-9619-8c330a2f47bb','2025-01-01 15:06:30.000000');
/*!40000 ALTER TABLE `invalidated_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `order_item_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES ('1225977d-3d37-4ac0-aee5-dbf9d2da6947','a762d461-bf44-4675-ad99-cd0117230e63','8afb96e5-d764-40cb-846d-650db0d343de',2,135000),('18ec0b18-15e5-4488-a45c-08c4b4a73912','75d7cedd-588c-4feb-902f-6e2831a2613e','a7d8d3ac-57cc-455c-b745-f7eff0349d28',3,92070),('233a2342-dc91-4fe4-86cd-68dda85220c7','f7d4c4ce-8e51-489d-b56c-5a51a7b33973','365a6ec6-80af-43b0-891d-4fb19d690f5b',1,122550),('4d48860b-70df-4541-8cb3-a63ae5a9e8e6','781d1562-44a3-47e5-beb9-4e54c0644a15','59cbfa2f-96bf-41bd-8b05-cc033c725cc9',1,193600),('544525dc-1a81-4281-bfb8-bda4337db708','1031e8b1-81b3-48c7-86b3-9b66662b86fb','bee3919f-f8de-4cec-b079-002ed4b9d140',2,130500),('85526e34-5687-4531-afbe-321bb73486f2','75d7cedd-588c-4feb-902f-6e2831a2613e','1621eadf-6401-4747-b586-2f5e41e59955',1,97000),('869be2f9-e031-4121-9db7-730fcd362afe','36435090-f302-4577-8ef1-936ddf7cbfb7','6c8386ec-af3b-410f-a1a4-baa948af9409',6,266000),('90e31ed2-b143-492f-a082-04616c686b6e','a762d461-bf44-4675-ad99-cd0117230e63','bee3919f-f8de-4cec-b079-002ed4b9d140',6,130500),('9ebdbfbb-a50e-4435-ad7a-e3f9ed28becb','1031e8b1-81b3-48c7-86b3-9b66662b86fb','365a6ec6-80af-43b0-891d-4fb19d690f5b',1,129000),('a1c5ac1d-d03e-4ba7-9c3f-bb7247728d21','edcafe23-c93b-42a9-bcb0-d14daca0c91a','365a6ec6-80af-43b0-891d-4fb19d690f5b',1,122550),('afee7ff0-a65c-4214-b618-d2b3391728e1','781d1562-44a3-47e5-beb9-4e54c0644a15','6c8386ec-af3b-410f-a1a4-baa948af9409',1,266000),('bb26a8d2-2e07-4528-ba8f-15f0fc4c06ed','781d1562-44a3-47e5-beb9-4e54c0644a15','1621eadf-6401-4747-b586-2f5e41e59955',3,97000),('bc3b483b-dffa-4acf-9203-ff794d8e4bcb','a1a2d0ed-86c4-47cc-8b70-c755240fef16','365a6ec6-80af-43b0-891d-4fb19d690f5b',9,129000),('c3dc6a18-6561-4cd2-ab06-b0e2dcb4cebf','a1a2d0ed-86c4-47cc-8b70-c755240fef16','bee3919f-f8de-4cec-b079-002ed4b9d140',6,130500),('c7cbcf4d-b101-49f1-81b4-7832208de0d9','a762d461-bf44-4675-ad99-cd0117230e63','e8e004af-4206-4751-b006-061396780eea',1,55000),('d4b1e543-c485-486a-8d19-73eb07703756','f7d4c4ce-8e51-489d-b56c-5a51a7b33973','a7d8d3ac-57cc-455c-b745-f7eff0349d28',3,92070),('de28271c-00cc-4c8f-b7ac-883d1efb63e6','1031e8b1-81b3-48c7-86b3-9b66662b86fb','8afb96e5-d764-40cb-846d-650db0d343de',1,135000),('e90b161b-0e44-4629-b410-d726e0f8bf58','f7d4c4ce-8e51-489d-b56c-5a51a7b33973','1621eadf-6401-4747-b586-2f5e41e59955',1,97000);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `status_id` varchar(255) NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `changed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`status_id`),
  KEY `order_status_ibfk_1` (`order_id`),
  CONSTRAINT `order_status_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES ('2a788f40-aa65-4044-9759-3fb0e0f109eb','f7d4c4ce-8e51-489d-b56c-5a51a7b33973','Đang tạo','2024-12-30 01:41:43'),('33fa7fb3-6d94-45a4-b76a-9cf4eeb65da4','f7d4c4ce-8e51-489d-b56c-5a51a7b33973','Đã thanh toán','2024-12-30 01:43:01'),('46b4aedd-bc90-49c9-a010-69ceb2774ba0','36435090-f302-4577-8ef1-936ddf7cbfb7','Đã thanh toán','2025-01-01 07:10:54'),('5c7ff8aa-99af-4794-baba-690e8adc06d4','a1a2d0ed-86c4-47cc-8b70-c755240fef16','Đã thanh toán','2024-12-29 10:08:43'),('6c3f39d5-2849-4072-a6ff-814aac029d06','a762d461-bf44-4675-ad99-cd0117230e63','Đang tạo','2024-12-28 09:52:04'),('8885d2b9-97a0-41ff-b069-8ebdf747cfad','781d1562-44a3-47e5-beb9-4e54c0644a15','Đang tạo','2024-12-30 17:36:06'),('897d5642-6204-4bcf-9c35-a2eb86156eae','1031e8b1-81b3-48c7-86b3-9b66662b86fb','Đã thanh toán','2024-12-29 09:24:31'),('8d93deaf-454c-4c36-a357-8c54d9e1a4b7','1031e8b1-81b3-48c7-86b3-9b66662b86fb','Đang tạo','2024-12-29 09:23:45'),('adbf696e-2cd1-4bbc-a6d5-ff84929c9065','781d1562-44a3-47e5-beb9-4e54c0644a15','Đã thanh toán','2024-12-30 17:39:30'),('b36b6f06-9dbe-4f21-aa6f-55a4d38a696f','a762d461-bf44-4675-ad99-cd0117230e63','Đã thanh toán','2024-12-28 09:52:51'),('ca62576e-0eb1-4d5a-bbf4-f0b7cb521e0d','a1a2d0ed-86c4-47cc-8b70-c755240fef16','Đang tạo','2024-12-29 10:08:07'),('d2c34ea1-0603-433f-b5ba-80133937cb6a','36435090-f302-4577-8ef1-936ddf7cbfb7','Đang tạo','2025-01-01 07:10:20'),('d6a98767-7e97-423a-9cf2-7089c988e03b','75d7cedd-588c-4feb-902f-6e2831a2613e','Đã thanh toán','2024-12-30 10:59:57'),('e5fcbbbc-16c7-4a95-9040-230cc168dfd5','edcafe23-c93b-42a9-bcb0-d14daca0c91a','Đang tạo','2024-12-30 09:52:37'),('e9b2761a-6ba9-4011-abf1-8739fc9abe8e','75d7cedd-588c-4feb-902f-6e2831a2613e','Đang tạo','2024-12-30 10:59:28'),('f029561e-c565-4174-9f4e-d3a91e7d9fb1','edcafe23-c93b-42a9-bcb0-d14daca0c91a','Đã thanh toán','2024-12-30 09:53:27');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `total` bigint(20) NOT NULL DEFAULT 0,
  `current_status_id` varchar(255) NOT NULL,
  `shipping_address_id` varchar(255) NOT NULL,
  `voucher_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `current_status_id` (`current_status_id`),
  KEY `shipping_address_id` (`shipping_address_id`),
  KEY `voucher_id` (`voucher_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`current_status_id`) REFERENCES `order_status` (`status_id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`shipping_address_id`) REFERENCES `shipping_address` (`shipping_address_id`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`voucher_id`) REFERENCES `voucher` (`voucher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('1031e8b1-81b3-48c7-86b3-9b66662b86fb','7494a5cb-6d84-4748-abd4-56845ce27cfe',525000,'897d5642-6204-4bcf-9c35-a2eb86156eae','56a4c766-c522-480e-9b24-0dece4343641',NULL,'2024-12-29 09:23:45'),('36435090-f302-4577-8ef1-936ddf7cbfb7','85eca848-2cae-40d0-b356-0dd4fd3accd0',1497000,'46b4aedd-bc90-49c9-a010-69ceb2774ba0','211093e1-800c-4008-ac14-3f5636c495c3','95f562d4-da58-437a-ad3f-c2c6c2852f9a','2025-01-01 07:10:20'),('75d7cedd-588c-4feb-902f-6e2831a2613e','7494a5cb-6d84-4748-abd4-56845ce27cfe',373210,'d6a98767-7e97-423a-9cf2-7089c988e03b','9fb429ab-1492-443f-a799-a9187a6c69de',NULL,'2024-12-30 10:59:28'),('781d1562-44a3-47e5-beb9-4e54c0644a15','7494a5cb-6d84-4748-abd4-56845ce27cfe',750600,'adbf696e-2cd1-4bbc-a6d5-ff84929c9065','9fb429ab-1492-443f-a799-a9187a6c69de',NULL,'2024-12-30 17:36:06'),('a1a2d0ed-86c4-47cc-8b70-c755240fef16','b7c1a8d8-eb87-4365-80b9-81be2ed8fe0c',1845000,'5c7ff8aa-99af-4794-baba-690e8adc06d4','2b9febff-fb61-4d60-a357-9a5efbd91708','95f562d4-da58-437a-ad3f-c2c6c2852f9a','2024-12-29 10:08:07'),('a762d461-bf44-4675-ad99-cd0117230e63','b7c1a8d8-eb87-4365-80b9-81be2ed8fe0c',1108000,'b36b6f06-9dbe-4f21-aa6f-55a4d38a696f','2b9febff-fb61-4d60-a357-9a5efbd91708',NULL,'2024-12-28 09:52:04'),('edcafe23-c93b-42a9-bcb0-d14daca0c91a','7494a5cb-6d84-4748-abd4-56845ce27cfe',23550,'f029561e-c565-4174-9f4e-d3a91e7d9fb1','9fb429ab-1492-443f-a799-a9187a6c69de','95f562d4-da58-437a-ad3f-c2c6c2852f9a','2024-12-30 09:52:37'),('f7d4c4ce-8e51-489d-b56c-5a51a7b33973','7494a5cb-6d84-4748-abd4-56845ce27cfe',475760,'33fa7fb3-6d94-45a4-b76a-9cf4eeb65da4','56a4c766-c522-480e-9b24-0dece4343641','0bc7d1f8-3145-499a-ad2e-cccce44fae68','2024-12-30 01:41:43');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` bigint(20) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `category_id` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `discount_percentage` int(11) DEFAULT 0,
  `average_rating` decimal(2,1) DEFAULT 0.0,
  `enabled` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('1621eadf-6401-4747-b586-2f5e41e59955','Kem rửa mặt cải thiện dấu hiệu lão hóa Hada Labo','Bọt kem mềm mịn chứa thành phần làm sạch có nguồn gốc tự nhiên lấy sạch bụi bẩn, bã nhờn trong lỗ chân lông và tế bào chết trên da\n\n\nRetinol kết hợp Niacinamide (B3) và Collagen giúp làm mờ nếp nhăn, cải thiện độ đàn hồi, dưỡng sáng các vùng da sạm màu, cho da trông tươi trẻ và săn chắc sau 7 ngày\n\n\nHệ dưỡng ẩm sâu HA đặc trưng (HA, Nano HA, Super HA) kết hợp với 3X Ceramide & Dầu hạt Chia giúp giữ nước, cấp ẩm chuyên sâu và giảm khô ráp tức thì. Hàng rào bảo vệ da được cải thiện và tăng độ ẩm đến 1,6 lần.\n\n\nCông nghệ Retinol Carnauba Wax Capsule đưa dưỡng chất thấm sâu vào lớp biểu bì giúp da hấp thụ tối đa & hạn chế kích ứng.\n\n\nCông thức dịu nhẹ với pH cân bằng, không cồn, không hệ xà phòng, không Paraben, không hương liệu, không chất tạo màu, không dầu khoáng',97000,95,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735488034/ztcbohzagbqpjfnzfbuu.png','fb65ea96-fb6f-4a1c-b306-db0631468f1d','Hada Labo','2024-12-29 16:00:33',0,0.0,1),('365a6ec6-80af-43b0-891d-4fb19d690f5b','Nước tẩy trang sạch sâu dưỡng ẩm','Công nghệ Micelle Complex nhẹ nhàng làm sạch sâu 99% lớp trang điểm lâu trôi, kem chống nắng và bụi mịn PM2.5.\n\n\nHA lên men tự nhiên giúp giảm tình trạng mất nước, củng cố màng ẩm tự nhiên bảo vệ da.\n\n\nHệ dưỡng ẩm sâu HA (HA, Super HA, Nano HA) với tỉ lệ kết hợp hoàn hảo giúp cung cấp độ ẩm tối ưu, tăng cường độ đàn hồi, duy trì và tăng cường độ ẩm da đến 1.5 lần.\n\n\nĐã kiểm nghiệm dịu nhẹ, an toàn cho da: Công thức dịu nhẹ không cồn, không hương liệu, không chất tạo màu, không dầu khoáng, không Paraben và pH cân bằng.\n\n\nPhù hợp với mọi loại da.',129000,84,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735034511/gz6iu9eagbritczckkbx.png','25a8faae-c17c-44fc-a1ba-42b439438037','Hada Labo','2024-12-24 10:01:50',5,0.0,1),('47150867-a68f-43a9-a80d-9b3d37604d1d','Serum dưỡng ẩm Hada Labo','2% Hyaluronic Acid với 7 loại HA, Super HA, Nano HA, Binding HA, 3D HA, Penetrating HA và HA lên men cấp ẩm ở các tầng da, giúp da ẩm mượt tức thì suốt 48 giờ, làm mờ và cải thiện nếp nhăn. Da trông săn chắc rõ rệt sau 7 ngày.\n\n\n12 loại Amino Acid, thành phần giữ ẩm tự nhiên của da, giúp cải thiện màng ẩm tự nhiên gấp 2 lần.\n\n\nVitamin B5 kết hợp Allantoin làm dịu và chăm sóc làn da tươi trẻ.\n\n\nCông nghệ thấm sâu Max Intensifier đưa các dưỡng chất thấm sâu 2X, tăng cường hiệu quả dưỡng trắng\n\n\nCông thức dịu nhẹ không Paraben, không cồn, không hương liệu, không chất tạo màu, không dầu khoáng, pH cân bằng',320000,100,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735488698/uglsgueyal3tr09iqnft.jpg','b8159887-8763-415f-baa9-9d3ae97fa1ad','Hada Labo','2024-12-29 16:11:37',12,0.0,1),('59cbfa2f-96bf-41bd-8b05-cc033c725cc9','Dầu tẩy trang dưỡng ẩm Hada Labo','Dầu Ô liu và Jojoba tự nhiên nhẹ nhàng làm sạch sâu bụi bẩn, bã nhờn, kem chống nắng, lớp trang điểm lâu trôi, kể cả son lì và mascara chống nước.\n\n\nLần đầu tiên trên thế giới, Hyaluronic Acid lên men tự nhiên (Fermented HA) kết hợp hệ dưỡng ẩm sâu HA đặc trưng (HA, Super HA, Nano HA) giúp giảm tình trạng mất nước, củng cố màng ẩm tự nhiên bảo vệ da.\n\n\nĐã kiểm nghiệm dịu nhẹ, an toàn cho da: công thức dịu nhẹ với pH cân bằng, không cồn, không hệ xà phòng, không Sulfate, không Paraben, không hương liệu, không chất tạo màu, không dầu khoáng.',242000,99,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735487944/d5lkmyly95wpo4tq5xe7.png','25a8faae-c17c-44fc-a1ba-42b439438037','Hada Labo','2024-12-29 15:59:03',20,0.0,1),('6c8386ec-af3b-410f-a1a4-baa948af9409','Serum cải thiện dấu hiệu lão hóa Hada Labo','Retinol kết hợp 5% Niacinamide (B3) và Collagen giúp làm mờ nếp nhăn, cải thiện độ đàn hồi, dưỡng sáng các vùng da sạm màu, cho da trông tươi trẻ và săn chắc sau 7 ngày\n\n\nHệ dưỡng ẩm sâu HA đặc trưng (HA, Nano HA, Super HA) kết hợp với 3X Ceramide & Dầu hạt Chia giúp giữ nước, cấp ẩm chuyên sâu và giảm khô ráp tức thì. Hàng rào bảo vệ da được cải thiện và tăng độ ẩm đến 1,6 lần.\n\n\nCông nghệ Retinol Carnauba Wax Capsule đưa dưỡng chất thấm sâu vào lớp biểu bì giúp da hấp thụ tối đa & hạn chế kích ứng.\n\n\nKhông Paraben, không cồn, không hương liệu, không chất tạo màu, không dầu khoáng, pH cân bằng.',380000,93,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735488640/ke9ksifb8ljthxefg6ob.png','b8159887-8763-415f-baa9-9d3ae97fa1ad','Hada Labo','2024-12-29 16:10:39',30,0.0,1),('8afb96e5-d764-40cb-846d-650db0d343de','Nước tẩy trang sạch sâu dưỡng trắng','Công nghệ Micelle Complex nhẹ nhàng làm sạch sâu 99% lớp trang điểm lâu trôi, kem chống nắng và bụi mịn PM2.5.\n\n\nChiết xuất mật ong lên men giúp giảm hắc sắc tố melanin, cải thiện đốm nâu và làm sáng da.\n\n\nHệ Vitamin (B3, C, E) giúp tăng cường khả năng chống oxy hóa, dưỡng sáng, cải thiện và làm đều màu da.\n\n\nHệ dưỡng ẩm sâu HA (HA, Super HA, Nano HA) với tỉ lệ kết hợp hoàn hảo giúp cung cấp độ ẩm tối ưu, tăng cường độ đàn hồi, duy trì độ ẩm cho da.\n\n\nĐã kiểm nghiệm dịu nhẹ, an toàn cho da: Công thức dịu nhẹ không cồn, không hương liệu, không chất tạo màu, không dầu khoáng, không Paraben và pH cân bằng.\n\n\nPhù hợp với mọi loại da.',135000,97,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735034469/wbgnv0spvqwjtnw0joup.png','25a8faae-c17c-44fc-a1ba-42b439438037','Hada Labo','2024-12-24 10:01:07',10,0.0,1),('931f4d7d-7388-408e-a986-bfda4fdf4ace',' Dung dịch dưỡng ẩm cho da mụn, nhạy cảm','Tranexamic Acid 0,5% kết hợp với hệ thực vật gồm chiết xuất Hạt Ý Dĩ, Rau Diếp Cá và Cúc La Mã giúp kháng khuẩn và giảm mụn hiệu quả, bảo vệ da trước tác nhân gây mụn.\n\n\nHệ dưỡng ẩm sâu HA cùng Squalane cung cấp độ ẩm tối ưu, ngăn ngừa tình trạng khô da và giúp giảm dầu thừa, nuôi dưỡng làn da sáng khỏe.\n\n\nĐã kiểm nghiệm dịu nhẹ, an toàn cho da: công thức dịu nhẹ với pH cân bằng, không cồn, không Sulfate, không Paraben, không hương liệu, không chất tạo màu, không dầu khoáng.',270000,100,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735488510/yat7iexrdycfohm4ac4z.png','19df2f04-8f0f-4b6a-b38a-749a7f7180b9','Hada Labo','2024-12-29 16:08:29',0,0.0,1),('a296e2f6-9b98-46a4-9dee-8b73dc383889','Kem rửa mặt cho da mụn, nhạy cảm','Bọt kem mềm mịn chứa thành phần làm sạch gốc tự nhiên lấy sạch bụi bẩn, bã nhờn ẩn sâu trong lỗ chân lông, nguyên nhân chính gây mụn.\n\n\nTranexamic Acid kết hợp với hệ thực vật gồm chiết xuất Hạt Ý Dĩ, Rau Diếp Cá và Cúc La Mã giúp kháng khuẩn và giảm mụn hiệu quả, bảo vệ da trước tác nhân gây mụn.\n\n\nHệ dưỡng ẩm sâu HA cùng Squalane cung cấp độ ẩm tối ưu, ngăn ngừa tình trạng khô da và giúp giảm dầu thừa, nuôi dưỡng làn da sáng khỏe.\n\n\nĐã kiểm nghiệm dịu nhẹ, an toàn cho da: công thức dịu nhẹ với pH cân bằng, không cồn, không hệ xà phòng, không Sulfate, không Paraben, không hương liệu, không chất tạo màu, không dầu khoáng.',95000,100,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735488089/jyglbirwoetbb8qt13bf.png','fb65ea96-fb6f-4a1c-b306-db0631468f1d','Hada Labo','2024-12-29 16:01:28',3,0.0,1),('a7d8d3ac-57cc-455c-b745-f7eff0349d28','Kem rửa mặt dưỡng trắng Hada Labo','Bọt kem mềm mịn với công nghệ Amino Acid có nguồn gốc tự nhiên lấy sạch bụi bẩn, bã nhờn trong lỗ chân lông và tế bào chết trên da.\n\n\nTranexamic Acid kết hợp Vitamin C và E giúp mờ thâm sạm, dưỡng da sáng khỏe sau 7 ngày.\n\n\nHệ dưỡng ẩm HA (HA & Nano HA) kết hợp chiết xuất Hạt Ý Dĩ lên men tự nhiên giúp cấp ẩm chuyên sâu, dưỡng da ẩm mịn.\n\n\nCông thức dịu nhẹ với pH cân bằng, không cồn, không hệ xà phòng, không Sulfate, không Paraben, không hương liệu, không chất tạo màu, không dầu khoáng.',93000,94,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735488331/juxhvvvengi1bvp77muf.png','fb65ea96-fb6f-4a1c-b306-db0631468f1d','Hada Labo','2024-12-29 16:05:30',1,0.0,1),('bee3919f-f8de-4cec-b079-002ed4b9d140','Nước tẩy trang sạch sâu cho da mụn, nhạy cảm','Công nghệ Micelle Complex nhẹ nhàng làm sạch sâu 99% lớp trang điểm lâu trôi, kem chống nắng và bụi mịn PM2.5\n\n\nCông nghệ Microbiome giúp cải thiện hàng rào vi sinh có lợi và bảo vệ da trước tác nhân gây mụn\n\n\nHệ thực vật (Chiết xuất Diếp cá, Ý Dĩ, Cúc La Mã) giúp giảm dầu thừa, cải thiện và ngừa mụn hiệu quả\n\n\nDipotassium Glycyrrhizate kháng khuẩn, làm dịu da tức thì\n\n\nHệ dưỡng ẩm 3X HA (HA, Super HA, Nano HA) cung cấp độ ẩm tối ưu, làm giảm tình trạng mất nước và tăng cường độ ẩm cho da\n\n\nCông thức dịu nhẹ không cồn, không hương liệu, không chất tạo màu, không dầu khoáng, không Paraben và pH cân bằng\n\n\nPhù hợp cho da mụn, nhạy cảm',145000,86,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735034404/tyxoqbtk54cwd2l99iou.png','25a8faae-c17c-44fc-a1ba-42b439438037','Hada Labo','2024-12-24 10:00:02',10,0.0,1),('dbb0402b-b951-453e-9e51-936768480d93','Kem rửa mặt dưỡng ẩm Hada Labo','Bọt kem mềm mịn chứa thành phần làm sạch gốc tự nhiên lấy sạch bụi bẩn, bã nhờn ẩn sâu trong lỗ chân lông và làm sạch tế bào chết trên da.\n\n\nLần đầu tiên trên thế giới, Hyaluronic Acid lên men tự nhiên (Fermented HA) kết hợp hệ dưỡng ẩm sâu HA đặc trưng (HA, Super HA, Nano HA) giúp giảm tình trạng mất nước, củng cố màng ẩm tự nhiên bảo vệ da.\n\n\nĐã kiểm nghiệm dịu nhẹ, an toàn cho da: công thức dịu nhẹ với pH cân bằng, không cồn, không hệ xà phòng, không Sulfate, không Paraben, không hương liệu, không chất tạo màu, không dầu khoáng.',75000,100,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735488287/qr91zgnzhfxnb9th2cky.png','fb65ea96-fb6f-4a1c-b306-db0631468f1d','Hada Labo','2024-12-29 16:04:46',7,0.0,1),('e8e004af-4206-4751-b006-061396780eea','Dung dịch dưỡng ẩm (Da thường, da khô)','Lần đầu tiên trên thế giới, Hyaluronic Acid lên men tự nhiên (Fermented HA) giúp giảm tình trạng mất nước, củng cố màng ẩm tự nhiên bảo vệ da.\n\n\nKết hợp hệ dưỡng ẩm sâu HA đặc trưng (HA, Super HA, Nano HA) giúp cung cấp độ ẩm tối ưu, duy trì làn da ẩm mượt suốt 36 giờ.\n\n\nĐã kiểm nghiệm dịu nhẹ, an toàn cho da: công thức dịu nhẹ không Paraben, không cồn, không hương liệu, không chất tạo màu, không dầu khoáng, pH cân bằng.',55000,99,'http://res.cloudinary.com/dhhr73s2r/image/upload/v1735211004/hv3rcjdkbjtsgjxucj6m.png','2bd7513a-77ee-4fc1-9585-545557a6ea4f','Hada Labo','2024-12-26 11:03:23',0,0.0,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`review_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('ADMIN','Admin role'),('USER','User role');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_name` varchar(255) NOT NULL,
  `permission_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_name`,`permission_name`),
  KEY `permission_name` (`permission_name`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_name`) REFERENCES `role` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_name`) REFERENCES `permission` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_address`
--

DROP TABLE IF EXISTS `shipping_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_address` (
  `shipping_address_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `recipient_name` varchar(255) NOT NULL,
  `recipient_phone` varchar(10) NOT NULL,
  `recipient_address` varchar(255) NOT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `enabled` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`shipping_address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `shipping_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_address`
--

LOCK TABLES `shipping_address` WRITE;
/*!40000 ALTER TABLE `shipping_address` DISABLE KEYS */;
INSERT INTO `shipping_address` VALUES ('211093e1-800c-4008-ac14-3f5636c495c3','85eca848-2cae-40d0-b356-0dd4fd3accd0','Pham Van Vinh','0327871942','Phuong Trung - Thanh Oai - Ha Noi',0,1),('26e2783d-5835-4acb-9092-e0855d20fd5a','2bf41b7d-024e-42ce-8918-f77a4e1f6df8','nguyen thi hai 2','0980344612','Sơn Tây - Thanh Hoá',0,0),('2b9febff-fb61-4d60-a357-9a5efbd91708','b7c1a8d8-eb87-4365-80b9-81be2ed8fe0c','Nguyễn Thị Hải','0399133782','Phương Trung - Thanh Oai - Hà Nội 2',0,1),('45f57441-8731-441d-80ad-47ee55099a34','85eca848-2cae-40d0-b356-0dd4fd3accd0','Nguyen Hoang Tien','0303030303','Son Tay - Ha Noi',0,1),('56a4c766-c522-480e-9b24-0dece4343641','7494a5cb-6d84-4748-abd4-56845ce27cfe','Nguyễn Hoàng Tiến','0980344623','Sơn Tây - Hà Nội',0,0),('9fb429ab-1492-443f-a799-a9187a6c69de','7494a5cb-6d84-4748-abd4-56845ce27cfe','Nguyễn Hoàng Tiến','0980344623','Sơn Tây - Hà Nội',0,1),('bfa0095f-457c-42e2-83cd-8d7387d92aba','2bf41b7d-024e-42ce-8918-f77a4e1f6df8','Nguyễn Hoàng Tiến','0980344623','Phương Trung - Thanh Oai - Hà Nội',0,1),('c5f1ac09-c622-4eef-9d89-1c55844ce5ab','b7c1a8d8-eb87-4365-80b9-81be2ed8fe0c','Phạm Văn Vinh','0327871942','Phương Trung - Thanh Oai - Hà Nội',0,1),('d0d32b50-04eb-42ce-8ee0-d73f812ece26','7494a5cb-6d84-4748-abd4-56845ce27cfe','Phạm Văn Vinh','0399133782','Phương Trung - Thanh Oai - Hà Nội',0,1),('ed4959cb-7674-4503-9fb3-fcbb352be710','b7c1a8d8-eb87-4365-80b9-81be2ed8fe0c','Nguyễn Hoàng Tiến','0980344622','Sơn Tây - Thanh Hoá',0,1);
/*!40000 ALTER TABLE `shipping_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('07ed76e5-39aa-4e97-a0f4-0adf677352c5','admin','admin','admin','$2a$10$8ruGOAc2roftyZvOET4ESe6KUnrIGBWonQohz8j.jouQYeL9J3JFu','admin@gmail.com',NULL,1),('115de684-c459-437c-97a6-52c68fd16f7f','vinhpv2003','Vinh','Phạm Văn','$2a$10$3BLNQ9hphpQGUWga8ijW0Ozvo3RqR97/pCaESOHhZT8Bu5jN9Qjci','vinhpv2003@gmail.com','0327871942',1),('1e107c39-a878-47c0-a016-dfed1f6c60df','vinhpv9107867','Vinh','Phạm Văn','$2a$10$1HmL2YxKzfqtkq1Y4E8d3uDvHnD1/tscOxre1.5tPV//V50jKnMwe','vinh9a7204435403@gmail.co','',1),('2bf41b7d-024e-42ce-8918-f77a4e1f6df8','vinhpv123','Vinh 22','Phạm','$2a$10$3BokYTTKv0IxxtX0H6xi2OnAF3C1ICIpoz4yil2FQ4vmAm7xpJ3zK','vinh9a720033@gmail.com','0327871942',1),('3eae249f-f358-4414-ba61-bb459df330c5','vinhpv910@gmail.com','Vinh','Phạm Văn','$2a$10$tfYqsk4rzIofQuIdOizwZ.RVa5APeFv3s1bqfKmr1F2P7IjMSUnnG','vinhpv910@gmail.com',NULL,1),('7494a5cb-6d84-4748-abd4-56845ce27cfe','vinh9a72003@gmail.com','Vinh','Phạm Văn','$2a$10$O08RUKNdGYjyv1u/4IrIx.1JRmi0YSU3QITz8I3388zDNKCfQhukG','vinh9a72003@gmail.com',NULL,1),('81cc88dd-b159-40a8-b093-e78b6232be95','vinhpv001','Vinh','Phạm Văn','$2a$10$445MgUU1OMq4fbUPTKzzZ.FTyUzhhE6REm/54CiFLi5GqSIKQMJI2','vinh9a7200@gmail.com','',1),('85eca848-2cae-40d0-b356-0dd4fd3accd0','vinh091003','Vinh','Pham','$2a$10$87lxEZGJtU5GgoNZjgned.8CgMu8.s4UkE3ZdjCplZk9QZBhtQJGW','vinh091003@gmail.com','0327871942',0),('92ccb1a4-038d-4575-92b5-75c89f33c19e','vinhpv91543530','Vinh 2','Phạm','$2a$10$ezPmzAf5x8hDoYC.k.DjsuZahLF.D.ZcmiJfGm.Vs4waKviDdrB4e','vinh9a72232343003@gmail.com','0327871942',1),('979ffb7e-7bf7-42a1-9ba7-4e34a4644a5e','vinhpv910222','Vinh','Nguyễn Hoàng','$2a$10$lWuEk.vuO3sQgQ/51CqeseqcAWhf2i21hKKIj9kmFrvgzp0dn6wsq','vinh9a7200223@gmail.com','',1),('b7c1a8d8-eb87-4365-80b9-81be2ed8fe0c','vinhpv910','Vinh','Phạm','$2a$10$r3hVVpkCpsvO.pxzMc2J5OQGWWHIQf.CLhGrZnx0tVGC28u2tynuW','vvinh9a72003@gmail.com','0327871942',1),('e46d9d66-97c5-403a-bb47-98725d950dcd','vinhpv9102','Vinh','Phạm Văn','$2a$10$lnUxg84prmqDSI.R04HxleC6p8JfD0gvxp7wmynlMMy.2S47SXXr.','vinh9a720032@gmail.com','0327871942',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(255) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`role_name`),
  KEY `role_name` (`role_name`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_name`) REFERENCES `role` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('07ed76e5-39aa-4e97-a0f4-0adf677352c5','ADMIN'),('07ed76e5-39aa-4e97-a0f4-0adf677352c5','USER'),('115de684-c459-437c-97a6-52c68fd16f7f','USER'),('1e107c39-a878-47c0-a016-dfed1f6c60df','USER'),('2bf41b7d-024e-42ce-8918-f77a4e1f6df8','USER'),('3eae249f-f358-4414-ba61-bb459df330c5','USER'),('7494a5cb-6d84-4748-abd4-56845ce27cfe','USER'),('81cc88dd-b159-40a8-b093-e78b6232be95','USER'),('85eca848-2cae-40d0-b356-0dd4fd3accd0','USER'),('92ccb1a4-038d-4575-92b5-75c89f33c19e','USER'),('979ffb7e-7bf7-42a1-9ba7-4e34a4644a5e','USER'),('b7c1a8d8-eb87-4365-80b9-81be2ed8fe0c','USER'),('e46d9d66-97c5-403a-bb47-98725d950dcd','USER');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `voucher_id` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `discount` int(11) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `min_purchase` bigint(20) DEFAULT 0,
  `usage_limit` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `enabled` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`voucher_id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES ('0bc7d1f8-3145-499a-ad2e-cccce44fae68','VANVU',20000,'2024-12-27 19:54:00','2025-02-07 21:53:00',400000,9,'2024-12-27 19:53:35',1),('12fbd947-22ea-4ab2-be47-7d040e67f88b','TUANHUNG',1000000,'2024-12-29 10:03:00','2025-02-01 10:01:00',0,0,'2024-12-29 10:01:19',1),('95f562d4-da58-437a-ad3f-c2c6c2852f9a','VANVINH',99000,'2024-12-26 10:52:00','2025-01-24 10:55:00',100000,7,'2024-12-26 10:50:25',1),('ddc14100-b431-428c-84b8-058c4d043d7c','HOANGTIEN',50000,'2024-12-29 10:03:00','2024-12-29 10:03:00',0,10,'2024-12-29 10:01:52',1);
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

-- Dump completed on 2025-01-01 14:28:25
