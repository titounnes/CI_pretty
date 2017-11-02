-- MySQL dump 10.16  Distrib 10.1.25-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: bpptpm
-- ------------------------------------------------------
-- Server version	10.1.25-MariaDB-1~xenial

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `biodata_registrar`
--

DROP TABLE IF EXISTS `biodata_registrar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biodata_registrar` (
  `user_id` int(11) NOT NULL,
  `prefix` varchar(20) DEFAULT NULL,
  `fullname` varchar(60) DEFAULT NULL,
  `subfix` varchar(20) DEFAULT NULL,
  `nickname` varchar(10) DEFAULT NULL,
  `address` text,
  `job` text,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biodata_registrar`
--

LOCK TABLES `biodata_registrar` WRITE;
/*!40000 ALTER TABLE `biodata_registrar` DISABLE KEYS */;
/*!40000 ALTER TABLE `biodata_registrar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'admin','administrator'),(2,'operator','Operator'),(9,'registrar','Pemohon');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imbs`
--

DROP TABLE IF EXISTS `imbs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imbs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_name` varchar(100) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `birth_city` varchar(50) DEFAULT NULL,
  `job` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `company` varchar(50) DEFAULT NULL,
  `business_type` tinyint(3) DEFAULT NULL,
  `type_of_req` tinyint(3) DEFAULT NULL,
  `type_of_build` tinyint(3) DEFAULT NULL,
  `utility_of_build` tinyint(3) DEFAULT NULL,
  `lenth_prime` decimal(8,1) DEFAULT NULL,
  `width_prime` decimal(8,1) DEFAULT NULL,
  `lenth_side` decimal(8,1) DEFAULT NULL,
  `width_side` decimal(8,1) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `village` varchar(100) DEFAULT NULL,
  `sector` varchar(100) DEFAULT NULL,
  `persil` varchar(100) DEFAULT NULL,
  `fondation` varchar(100) DEFAULT NULL,
  `floor` varchar(100) DEFAULT NULL,
  `wall` varchar(100) DEFAULT NULL,
  `frame` varchar(100) DEFAULT NULL,
  `roof_frame` varchar(100) DEFAULT NULL,
  `roof` varchar(100) DEFAULT NULL,
  `north` varchar(100) DEFAULT NULL,
  `south` varchar(100) DEFAULT NULL,
  `west` varchar(100) DEFAULT NULL,
  `east` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imbs`
--

LOCK TABLES `imbs` WRITE;
/*!40000 ALTER TABLE `imbs` DISABLE KEYS */;
INSERT INTO `imbs` VALUES (1,'Harjito, S.Pd, M.Sc','2017-11-10','2017-11-01 10:38:23','Demak','null','null','null','e-project',1,1,1,0,0.0,0.0,0.0,0.0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','2017-11-01 13:33:50'),(2,'Harjitos','0000-00-00','2017-11-01 10:38:23','null','null','null','null','null',1,1,1,0,0.0,0.0,0.0,0.0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','2017-11-01 13:34:43'),(3,'Harjitos','0000-00-00','2017-11-01 10:38:23','null','null','null','null','null',1,1,1,0,0.0,0.0,0.0,0.0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','0000-00-00 00:00:00'),(4,'Harjitosff','1972-06-23','2017-11-01 10:38:23','null','null','null','null','null',1,1,1,0,0.0,0.0,0.0,0.0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','2017-11-01 13:36:02'),(5,'','1972-06-23','2017-11-01 10:39:13','Semarang','null','Kalirejo','085640776086','Perusahaanku',1,1,1,0,0.0,0.0,0.0,0.0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','0000-00-00 00:00:00'),(6,'Harjitos','0000-00-00','2017-11-01 11:08:46','null','null','null','null','null',1,1,1,0,0.0,0.0,0.0,0.0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','0000-00-00 00:00:00'),(7,'Harjitos','0000-00-00','2017-11-01 11:11:04','null','null','null','null','null',1,1,1,0,0.0,0.0,0.0,0.0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','0000-00-00 00:00:00'),(8,'Harjitos','0000-00-00','2017-11-01 12:22:30','null','null','null','null','null',1,1,1,0,0.0,0.0,0.0,0.0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','0000-00-00 00:00:00'),(9,'Harjitos','0000-00-00','2017-11-01 12:22:44','null','null','null','null','null',1,1,1,0,0.0,0.0,0.0,0.0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','0000-00-00 00:00:00'),(10,'Harjitos','0000-00-00','2017-11-01 12:23:02','null','null','null','null','null',1,1,1,0,0.0,0.0,0.0,0.0,'null','null','null','null','null','null','null','null','null','null','null','null','null','null','0000-00-00 00:00:00'),(11,'','0000-00-00','2017-11-01 16:10:43','Demak','PNS','Gunungpati Semarang','085640776086','eProject Technology',1,1,1,0,0.0,9.5,0.0,3.5,'Kalirejo','Mangunsari','Gunungpati','1234/7/8','Batu','Keramik','batu bata','Besi','baja ringan','beton press','Harjito','Harjito','Harjito','Harjito','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `imbs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imbs_users`
--

DROP TABLE IF EXISTS `imbs_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imbs_users` (
  `imb_id` int(11) NOT NULL,
  `registrar_id` int(11) NOT NULL,
  `front_id` int(11) DEFAULT NULL,
  `back_id` int(11) DEFAULT NULL,
  `officer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`imb_id`,`registrar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imbs_users`
--

LOCK TABLES `imbs_users` WRITE;
/*!40000 ALTER TABLE `imbs_users` DISABLE KEYS */;
INSERT INTO `imbs_users` VALUES (1,5,NULL,NULL,NULL),(4,5,NULL,NULL,NULL),(5,5,NULL,NULL,NULL),(6,5,NULL,NULL,NULL),(7,5,NULL,NULL,NULL),(8,5,NULL,NULL,NULL),(9,5,NULL,NULL,NULL),(10,5,NULL,NULL,NULL),(11,22,NULL,NULL,NULL);
/*!40000 ALTER TABLE `imbs_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` text,
  `phone` varchar(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'administrator',NULL,'$2y$10$1yBWLDwCUSRzjw51BYztFuBRLNAIX.q0sOGDKIRFtYlaC0rgyScQy',NULL,NULL),(2,NULL,NULL,'$2y$12$4NC.D3Y960FHyDEdTEibn.zi51HfV0ixIfdimsNvrsi4T1HR2OQdu','',NULL),(3,NULL,NULL,'$2y$12$W2UKRx0QVpPhrK.tOsRGB.3skXmtBDbRXEQOS6Xl1HHd7gceurJNK','',NULL),(4,NULL,NULL,'$2y$12$BPZftOqMr2c2751VCPTSp.kT.SBOz/brFdKqbj0VvOxpZKJ5pAf/q','aaa',NULL),(5,'mencoba',NULL,'$2y$12$QYNicbxiyS68PxXvNrKrQ.FEYhDtoZ9CA6GJOz.muHBcZqB/u.WR6',NULL,NULL),(6,'lagi',NULL,'$2y$12$kE/LQMmVzAekYtCx5m5O/Opa7VGRd1Gwq6AM.QYf7rujAOobc1rgC',NULL,NULL),(10,'',NULL,'$2y$12$sIHDdxF1nkQZV5/p7iajhOGniBd20zkTtaQbnpsIyooH7RYNaZCju',NULL,NULL),(11,'mencobad',NULL,'$2y$12$Eo018/.RO1omezgX4wxHs.W7u6QlHVmhc/7xbu7ZjSNZA4tXc78/.',NULL,NULL),(12,'mencobadfffff',NULL,'$2y$12$Ylaz5Iz66AaNco9FUD2bBupZiqMMX9/5VJGj9E/R8q2Q.yZAWWSGW',NULL,NULL),(13,'mencobadfffffdff',NULL,'$2y$12$CT5gacT3/YDxMiLslj96Qe88XJpJ/dLL0IkgXZQ5RBM4DKqYxu9L2',NULL,NULL),(14,'mencobalagi',NULL,'$2y$12$cepDGsXLCckjPs9bPI5Boulf7iFrM5czkYt7JP6yE.T/vCvwaNIL6',NULL,NULL),(15,'mizanoamr',NULL,'$2y$12$u2IIdN0DFeX3grhbwLH1IOy3HYxSw3p5i4LBUw9nqIwa75IJK3X3K',NULL,NULL),(16,'widyarosanti',NULL,'$2y$12$WonGmIRb5p8Py8D6s63/XOymaXmSG2LggdqysXezqvruT/sRqUb3y',NULL,NULL),(17,'widyaros',NULL,'$2y$12$JYTsPggiVsdaRkroiBw6OOu5WxKJQsRU0Yv8NuncfIOEoGRwJwRQ2',NULL,NULL),(18,'qaisaranurin',NULL,'$2y$12$i7H8.3h/ES854.p3uNQEmeMQ6GoIgapDTmqzLWUA126IC4Kuy.j5e',NULL,NULL),(19,'mencobalagilahi',NULL,'$2y$12$aIZAZKEaEtDqVgKMOdmbSek6NkoaqQZqgeiIwb3FHDHHIdcSFlHTe',NULL,NULL),(20,'lalalala',NULL,'$2y$12$CJC1T9/4WHhO72rvs8wGjebpz4VpK.zlRMhWIOW.9Xv7tROytMAQW',NULL,NULL),(21,'trililili',NULL,'$2y$12$ZIdSMCXwJQUOeabHDDKfsOtiA4uAvzdygLw9qAN.0Td1BIS2F8Vwq',NULL,NULL),(22,'harjito',NULL,'$2y$12$jykfBUnF6kxlDxiTD3zTXOagb8hjM0XI5Cb6ry0xEZdAYESW1QTiG',NULL,'harjito');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_groups`
--

DROP TABLE IF EXISTS `users_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_groups` (
  `user_id` int(11) NOT NULL,
  `group_id` int(4) NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_groups`
--

LOCK TABLES `users_groups` WRITE;
/*!40000 ALTER TABLE `users_groups` DISABLE KEYS */;
INSERT INTO `users_groups` VALUES (1,1),(1,2),(1,3),(2,9),(3,9),(4,9),(5,9),(6,9),(10,9),(11,9),(12,9),(13,9),(14,9),(15,9),(16,9),(17,9),(18,9),(19,9),(20,9),(21,9),(22,9);
/*!40000 ALTER TABLE `users_groups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-02 14:47:25
