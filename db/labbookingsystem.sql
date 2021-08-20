-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2021 at 10:27 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `labbookingsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Admin_ID` int(11) NOT NULL,
  `Admin_Name` varchar(255) NOT NULL,
  `Admin_Surname` varchar(255) NOT NULL,
  `Admin_Email` varchar(255) NOT NULL,
  `Admin_Pass` varchar(255) NOT NULL,
  `Booking_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Admin_ID`, `Admin_Name`, `Admin_Surname`, `Admin_Email`, `Admin_Pass`, `Booking_ID`) VALUES
(216646797, 'Godfrey', 'Mabena', 'Godfrey555mabena@gmail.com', '1234', 0);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `Booking_ID` int(11) NOT NULL,
  `Lab_Name` varchar(255) NOT NULL,
  `Lab_Slot` varchar(1) NOT NULL,
  `Num_Bookings` int(11) NOT NULL,
  `Stud_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lab`
--

CREATE TABLE `lab` (
  `Lab_ID` int(11) NOT NULL,
  `Lab_Name` varchar(255) NOT NULL,
  `Lab_Capacity` int(11) NOT NULL,
  `Lab_Slot` varchar(1) NOT NULL,
  `Lab_availability` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lab`
--

INSERT INTO `lab` (`Lab_ID`, `Lab_Name`, `Lab_Capacity`, `Lab_Slot`, `Lab_availability`) VALUES
(0, '10-120', 40, 'A', 41),
(1, '10-120', 40, 'B', 0),
(2, '10-138', 50, 'A', 51),
(3, '10-138', 50, 'B', 0),
(4, '10-140', 60, 'A', 61),
(5, '10-140', 60, 'B', 0);

-- --------------------------------------------------------

--
-- Table structure for table `lab_record`
--

CREATE TABLE `lab_record` (
  `lab_no` int(11) NOT NULL,
  `lab_name` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `slot_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lecture`
--

CREATE TABLE `lecture` (
  `lec_id` int(11) NOT NULL,
  `lec_name` int(11) NOT NULL,
  `lec_email` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `confirm` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `slot`
--

CREATE TABLE `slot` (
  `slot_no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `stud_no` int(9) NOT NULL,
  `stu_name` varchar(255) NOT NULL,
  `stud_surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `confirm` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`stud_no`, `stu_name`, `stud_surname`, `email`, `password`, `confirm`) VALUES
(216646797, 'godfrey', 'mabena', '216646797@tut4life.ac.za', 'a', 'a'),
(217409950, 'Ricky', 'Tala', '217409950@tut4life.ac.za', '1234', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `student_record`
--

CREATE TABLE `student_record` (
  `stud_no` int(11) NOT NULL,
  `stud_name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_record`
--

INSERT INTO `student_record` (`stud_no`, `stud_name`, `surname`, `email`) VALUES
(212208124, 'Mpho', 'Nyambeni', '212208124@tut4life.ac.za'),
(214021170, 'Keletso ', 'Rangoako', '214021170@tut4life.ac.za'),
(214468824, 'Vutlharhi', 'Magayisa', '214468824@tut4life.ac.za'),
(215040895, 'sinethemba  ', 'Khoza ', '215040895@tut4life.ac.za'),
(215416321, 'Mpho', 'Chauke', '215416321@tut4life.ac.za'),
(216114345, 'nontobeko', 'Khoza', '216114345@tut4life.ac.za'),
(216210166, 'Siphesihle ', 'Mofokeng', '216210166@tut4life.ac.za'),
(216579615, 'lebogang ', 'Masanabo', '216579615@tut4life.ac.za'),
(216646797, 'Godfrey', 'Mabena', '216646797@tut4life.ac.za'),
(216861841, 'Amanda ', 'khumalo', '216861841@tut4life.ac.za'),
(217409950, 'Ricky', 'Tala', '217409950@tut4life.ac.za'),
(217582415, 'Dineo', 'Nakana', '217582415@tut4life.ac.za'),
(218418902, 'Mndeni', 'Shongwe', '218418902@tut4life.ac.za');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Admin_ID`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`Booking_ID`);

--
-- Indexes for table `lab`
--
ALTER TABLE `lab`
  ADD PRIMARY KEY (`Lab_ID`);

--
-- Indexes for table `lab_record`
--
ALTER TABLE `lab_record`
  ADD PRIMARY KEY (`lab_no`);

--
-- Indexes for table `slot`
--
ALTER TABLE `slot`
  ADD PRIMARY KEY (`slot_no`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`stud_no`);

--
-- Indexes for table `student_record`
--
ALTER TABLE `student_record`
  ADD PRIMARY KEY (`stud_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `Admin_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216646799;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `Booking_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lab_record`
--
ALTER TABLE `lab_record`
  MODIFY `lab_no` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slot`
--
ALTER TABLE `slot`
  MODIFY `slot_no` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `stud_no` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217409951;

--
-- AUTO_INCREMENT for table `student_record`
--
ALTER TABLE `student_record`
  MODIFY `stud_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=218418903;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
