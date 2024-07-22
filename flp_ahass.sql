-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2024 at 03:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flp_ahass`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` char(36) NOT NULL,
  `title` varchar(60) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active` int(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `created_by` char(36) DEFAULT NULL,
  `modified_by` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `title`, `description`, `active`, `created`, `modified`, `created_by`, `modified_by`) VALUES
('640e1112-3746-11ea-91c1-005056be36b2', 'Mekanik', NULL, 1, '2021-09-16 20:08:09', '2021-09-16 20:08:12', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6'),
('d54c7a36-0590-11e8-9702-ac220be6ac47', 'Admin Main Dealer', NULL, 1, '2019-01-01 09:58:05', '2019-01-01 09:58:05', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6'),
('e24c7a36-0590-11e8-1111-ac220be6ac47', 'PMD', NULL, 1, '2019-01-01 09:58:05', '2019-01-01 09:58:05', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6'),
('f11c7a36-0590-22e8-3452-ac220be6ac47', 'Owner', NULL, 1, '2019-01-01 09:58:05', '2019-01-01 09:58:05', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6'),
('f11c7a36-0590-22e8-3452-ac220be6ac48', 'DMS', 'DMS', 1, '2023-10-26 09:58:05', '2023-10-26 09:58:05', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6'),
('f11c7a36-0590-22e8-3452-ac220beMac48', 'TSD', 'TSD', 1, '2023-10-26 09:58:05', '2023-10-26 09:58:05', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6', 'dcef4eb0-6a0d-11e8-8154-7fdb2693d4r6');

-- --------------------------------------------------------

--
-- Table structure for table `master_modul`
--

CREATE TABLE `master_modul` (
  `IdModul` int(10) NOT NULL,
  `modulName` varchar(255) NOT NULL,
  `fileUpload` text NOT NULL,
  `createdAt` text NOT NULL,
  `createdBy` text NOT NULL,
  `modifiedAt` varchar(10) NOT NULL,
  `modifiedBy` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master_modul`
--

INSERT INTO `master_modul` (`IdModul`, `modulName`, `fileUpload`, `createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`) VALUES
(50000, 'Keterampilan Teknis Sepeda Motor', '57ef7b30-43ec-11ef-8208-67c175e19518-tekniksepedamotor.pdf', '2024-07-17 10:27:06.290', '1', '2024-07-17', '1'),
(50001, 'Layanan Pelanggan', '57ef7b30-43ec-11ef-8208-67c175e19518-Pelayananpelanggan.pdf', '2024-07-17 10:27:36.919', '1', '2024-07-17', '1'),
(50002, 'Penjualan dan Pemasaran', '57ef7b30-43ec-11ef-8208-67c175e19518-PEMASARANPRODUK.pdf', '2024-07-17 10:28:06.825', '1', '2024-07-17', '1'),
(50003, 'Manajemen Ketenagakerjaan', '57ef7b30-43ec-11ef-8208-67c175e19518-ManajemenTenagaKerja.pdf', '2024-07-17 10:28:28.388', '1', '2024-07-17', '1'),
(50004, 'Keselamatan dan Kesehatan Kerja (K3)', '57ef7b30-43ec-11ef-8208-67c175e19518-BukuK3.pdf', '2024-07-17 10:28:51.910', '1', '2024-07-17', '1'),
(50005, 'Kemampuan Digital', '57ef7b30-43ec-11ef-8208-67c175e19518-LITERASIDIGITAL.pdf', '2024-07-17 10:29:13.763', '1', '2024-07-17', '1'),
(50006, 'Bahasa Asing', '57ef7b30-43ec-11ef-8208-67c175e19518-KEMAMPUANBERBAHASAINGGRIS.pdf', '2024-07-17 10:29:32.155', '1', '2024-07-17', '1'),
(50007, 'Etika Bisnis', '57ef7b30-43ec-11ef-8208-67c175e19518-EtikaBisnisdanProfesi.pdf', '2024-07-17 10:29:50.434', '1', '2024-07-17', '1'),
(50008, 'Pengembangan Diri', '57ef7b30-43ec-11ef-8208-67c175e19518-pengembangandiri.pdf', '2024-07-17 10:30:13.414', '1', '2024-07-17', '1'),
(50009, 'Budaya Perusahaan', '57ef7b30-43ec-11ef-8208-67c175e19518-BUDAYAPERUSAHAAN.ppt', '2024-07-17 10:30:31.145', '1', '2024-07-17', '1'),
(50010, 'edit test data', '8c16ec00-4599-11ef-acb5-2f56ee49a03d-FintiSasaSabila.pdf', '2024-07-19 13:40:22.973', '1', '2024-07-19', '1'),
(50011, 'nyoba edit modul', '0cecea10-45a8-11ef-b8a6-6740687f635e-LOGODIKDAS.jpg', '2024-07-19 14:46:43.795', '1', '2024-07-19', '1');

-- --------------------------------------------------------

--
-- Table structure for table `master_training`
--

CREATE TABLE `master_training` (
  `IdTraining` int(10) NOT NULL,
  `trainingName` varchar(255) NOT NULL,
  `participant` varchar(50) NOT NULL,
  `trainingStartDate` text NOT NULL,
  `trainingEndDate` text NOT NULL,
  `createdAt` text NOT NULL,
  `createdBy` text NOT NULL,
  `modifiedAt` varchar(10) DEFAULT NULL,
  `modifiedBy` varchar(10) DEFAULT NULL,
  `status` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master_training`
--

INSERT INTO `master_training` (`IdTraining`, `trainingName`, `participant`, `trainingStartDate`, `trainingEndDate`, `createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`, `status`) VALUES
(30000, 'Pelatihan Keterampilan Teknis', '50', '2024-07-01', '2024-07-01', '2024-07-17 11:02:59.159', '1', '2024-07-17', '1', ''),
(30001, 'Pelatihan Kepemimpinan', '50', '2024-07-02', '2024-07-05', '2024-07-17 11:10:33.458', '1', '2024-07-17', '1', ''),
(30002, 'Pelatihan Komunikasi', '30', '2024-07-04', '2024-07-04', '2024-07-17 11:11:38.346', '1', '2024-07-17', '1', ''),
(30003, 'Pelatihan Layanan Pelanggan', '55', '2024-07-15', '2024-07-15', '2024-07-17 11:29:45.652', '1', '2024-07-17', '1', ''),
(30004, 'Pelatihan digital marketing', '30', '2024-07-16', '2024-07-17', '2024-07-17 11:31:27.767', '1', '2024-07-17', '1', ''),
(30005, 'Pelatihan etika bisnis', '55', '2024-07-17', '2024-07-17', '2024-07-17 11:36:39.465', '1', '2024-07-17', '1', '');

-- --------------------------------------------------------

--
-- Table structure for table `modul_training`
--

CREATE TABLE `modul_training` (
  `IdModulTraining` bigint(20) UNSIGNED NOT NULL,
  `IdTraining` int(10) NOT NULL,
  `IdModul` int(10) NOT NULL,
  `createdAt` text NOT NULL,
  `createdBy` text NOT NULL,
  `modifiedAt` varchar(10) NOT NULL,
  `modifiedBy` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modul_training`
--

INSERT INTO `modul_training` (`IdModulTraining`, `IdTraining`, `IdModul`, `createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`) VALUES
(1000000000, 30000, 50000, '2024-07-17 11:02:59.159', '1', '2024-07-17', '1'),
(1000000001, 30000, 50004, '2024-07-17 11:02:59.159', '1', '2024-07-17', '1'),
(1000000002, 30001, 50003, '2024-07-17 11:10:33.458', '1', '2024-07-17', '1'),
(1000000003, 30001, 50006, '2024-07-17 11:10:33.458', '1', '2024-07-17', '1'),
(1000000004, 30001, 50007, '2024-07-17 11:10:33.458', '1', '2024-07-17', '1'),
(1000000005, 30001, 50008, '2024-07-17 11:10:33.458', '1', '2024-07-17', '1'),
(1000000006, 30001, 50009, '2024-07-17 11:10:33.458', '1', '2024-07-17', '1'),
(1000000007, 30002, 50001, '2024-07-17 11:11:38.346', '1', '2024-07-17', '1'),
(1000000008, 30002, 50006, '2024-07-17 11:11:38.346', '1', '2024-07-17', '1'),
(1000000009, 30003, 50001, '2024-07-17 11:29:45.652', '1', '2024-07-17', '1'),
(1000000010, 30004, 50001, '2024-07-17 11:31:27.767', '1', '2024-07-17', '1'),
(1000000011, 30004, 50002, '2024-07-17 11:31:27.767', '1', '2024-07-17', '1'),
(1000000012, 30004, 50006, '2024-07-17 11:31:27.767', '1', '2024-07-17', '1'),
(1000000013, 30004, 50007, '2024-07-17 11:31:27.767', '1', '2024-07-17', '1'),
(1000000014, 30005, 50007, '2024-07-17 11:36:39.465', '1', '2024-07-17', '1'),
(1000000015, 30005, 50009, '2024-07-17 11:36:39.465', '1', '2024-07-17', '1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `name` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `username` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `stall_code` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ahass_id` char(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ahass_code` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `ahass_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `employee_id` char(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `employee_kode` varchar(25) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `employee_nama` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `password` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `id` char(36) NOT NULL,
  `email` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `phone_number` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `image` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `is_login` int(1) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `branch_id` char(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `branch_code` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `branch_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `inisial` char(3) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `group_id` char(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `salesman_id` char(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `sls_kode` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `sls_nama` varchar(40) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `supervisor_id` char(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `supervisor_nama` varchar(40) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` char(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modi_by` char(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `status_user` varchar(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `versi` int(1) DEFAULT NULL,
  `token` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `status_aktivasi` varchar(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `tgl_aktivasi` datetime DEFAULT NULL,
  `tgl_end_aktivasi` datetime DEFAULT NULL,
  `driver_id` char(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `api_key` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `secret_key` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `login_myhero` char(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `honda_id` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `block` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `count_invalid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`name`, `username`, `stall_code`, `ahass_id`, `ahass_code`, `ahass_name`, `employee_id`, `employee_kode`, `employee_nama`, `password`, `id`, `email`, `phone_number`, `birth_date`, `gender`, `image`, `is_login`, `last_login`, `branch_id`, `branch_code`, `branch_name`, `inisial`, `group_id`, `salesman_id`, `sls_kode`, `sls_nama`, `supervisor_id`, `supervisor_nama`, `created_at`, `created_by`, `modified_at`, `modi_by`, `status_user`, `versi`, `token`, `status_aktivasi`, `tgl_aktivasi`, `tgl_end_aktivasi`, `driver_id`, `api_key`, `secret_key`, `login_myhero`, `honda_id`, `block`, `count_invalid`) VALUES
('John Doe', 'johndoe', 'SC001', 'AH001', 'AHC001', 'Ahass Center 1', 'EMP001', 'EK001', 'John Doe', '7c6a180b36896a0a8c02787eeafb0e4c', '1', 'john.doe@example.com', '1234567890', '1980-01-01', 'M', 'image1.jpg', 1, '2024-06-01 10:00:00', 'BR001', 'BC001', 'Branch 1', 'JD', 'd54c7a36-0590-11e8-9702-ac220be6ac47', 'SL001', 'SLS001', 'Sales Name 1', 'SUP001', 'Supervisor 1', '2024-01-01 09:00:00', 'ADM001', '2024-01-10 09:00:00', 'MOD001', 'A', 1, 'token1', 'A', '2024-01-01 09:00:00', '2024-12-31 09:00:00', 'DRV001', 'apikey1', 'secretkey1', 'Y', 'H001', 'block1', 0),
('Jane Smith', 'janesmith', 'SC002', 'AH002', 'AHC002', 'Ahass Center 2', 'EMP002', 'EK002', 'Jane Smith', '6cb75f652a9b52798eb6cf2201057c73', '2', 'jane.smith@example.com', '0987654321', '1990-02-02', 'F', 'image2.jpg', 0, NULL, 'BR002', 'BC002', 'Branch 2', 'JS', 'd54c7a36-0590-11e8-9702-ac220be6ac47', 'SL002', 'SLS002', 'Sales Name 2', 'SUP002', 'Supervisor 2', '2024-02-01 10:00:00', 'ADM002', '2024-02-10 10:00:00', 'MOD002', 'I', 2, 'token2', 'I', '2024-02-01 10:00:00', '2024-11-30 10:00:00', 'DRV002', 'apikey2', 'secretkey2', 'N', 'H002', 'block2', 1),
('Alice Johnson', 'alicejohnson', 'SC003', 'AH003', 'AHC003', 'Ahass Center 3', 'EMP003', 'EK003', 'Alice Johnson', '819b0643d6b89dc9b579fdfc9094f28e', '3', 'alice.johnson@example.com', '1122334455', '1985-03-03', 'F', 'image3.jpg', 1, '2024-06-15 15:30:00', 'BR003', 'BC003', 'Branch 3', 'AJ', 'e24c7a36-0590-11e8-1111-ac220be6ac47', 'SL003', 'SLS003', 'Sales Name 3', 'SUP003', 'Supervisor 3', '2024-03-01 08:30:00', 'ADM003', '2024-03-10 08:30:00', 'MOD003', 'A', 1, 'token3', 'A', '2024-03-01 08:30:00', '2024-12-31 08:30:00', 'DRV003', 'apikey3', 'secretkey3', 'Y', 'H003', 'block3', 0),
('Bob Brown', 'bobbrown', 'SC004', 'AH004', 'AHC004', 'Ahass Center 4', 'EMP004', 'EK004', 'Bob Brown', '34cc93ece0ba9e3f6f235d4af979b16c', '4', 'bob.brown@example.com', '5566778899', '1975-04-04', 'M', 'image4.jpg', 0, NULL, 'BR004', 'BC004', 'Branch 4', 'BB', 'f11c7a36-0590-22e8-3452-ac220be6ac47', 'SL004', 'SLS004', 'Sales Name 4', 'SUP004', 'Supervisor 4', '2024-04-01 09:30:00', 'ADM004', '2024-04-10 09:30:00', 'MOD004', 'I', 2, 'token4', 'I', '2024-04-01 09:30:00', '2024-10-31 09:30:00', 'DRV004', 'apikey4', 'secretkey4', 'N', 'H004', 'block4', 2),
('Charlie Davis', 'charliedavis', 'SC005', 'AH005', 'AHC005', 'Ahass Center 5', 'EMP005', 'EK005', 'Charlie Davis', 'db0edd04aaac4506f7edab03ac855d56', '5', 'charlie.davis@example.com', '6677889900', '1995-05-05', 'M', 'image5.jpg', 1, '2024-06-20 10:00:00', 'BR005', 'BC005', 'Branch 5', 'CD', 'f11c7a36-0590-22e8-3452-ac220beMac48', 'SL005', 'SLS005', 'Sales Name 5', 'SUP005', 'Supervisor 5', '2024-05-01 10:00:00', 'ADM005', '2024-05-10 10:00:00', 'MOD005', 'A', 1, 'token5', 'A', '2024-05-01 10:00:00', '2024-12-31 10:00:00', 'DRV005', 'apikey5', 'secretkey5', 'Y', 'H005', 'block5', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`) USING BTREE,
  ADD KEY `group_id` (`group_id`) USING BTREE;

--
-- Indexes for table `master_modul`
--
ALTER TABLE `master_modul`
  ADD PRIMARY KEY (`IdModul`);

--
-- Indexes for table `master_training`
--
ALTER TABLE `master_training`
  ADD PRIMARY KEY (`IdTraining`);

--
-- Indexes for table `modul_training`
--
ALTER TABLE `modul_training`
  ADD PRIMARY KEY (`IdModulTraining`),
  ADD KEY `IdModul` (`IdTraining`),
  ADD KEY `IdTraining` (`IdModul`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `master_modul`
--
ALTER TABLE `master_modul`
  MODIFY `IdModul` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `master_training`
--
ALTER TABLE `master_training`
  MODIFY `IdTraining` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `modul_training`
--
ALTER TABLE `modul_training`
  MODIFY `IdModulTraining` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000000027;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `modul_training`
--
ALTER TABLE `modul_training`
  ADD CONSTRAINT `modul_training_ibfk_1` FOREIGN KEY (`IdModul`) REFERENCES `master_modul` (`IdModul`),
  ADD CONSTRAINT `modul_training_ibfk_2` FOREIGN KEY (`IdTraining`) REFERENCES `master_training` (`IdTraining`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
