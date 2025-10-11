-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09-Out-2025 às 21:24
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_wishy`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_jogadores`
--

CREATE TABLE `tb_jogadores` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `fase1_pontuacao` int(11) DEFAULT '0',
  `fase2_pontuacao` int(11) DEFAULT '0',
  `fase3_pontuacao` int(11) DEFAULT '0',
  `fase4_pontuacao` int(11) DEFAULT '0',
  `fase5_pontuacao` int(11) DEFAULT '0',
  `fase6_pontuacao` int(11) DEFAULT '0',
  `fase7_pontuacao` int(11) DEFAULT '0',
  `faseOculta_pontuacao` int(11) DEFAULT NULL,
  `pontuacao_total` int(11) DEFAULT '0',
  `data_jogo` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_jogadores`
--
ALTER TABLE `tb_jogadores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_jogadores`
--
ALTER TABLE `tb_jogadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
