-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 29 jan. 2023 à 23:10
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_pharmacie`
--

-- --------------------------------------------------------

--
-- Structure de la table `detailordannance`
--

CREATE TABLE `detailordannance` (
  `id` int(11) NOT NULL,
  `ordonnance_id` int(11) DEFAULT NULL,
  `produit_id` int(11) DEFAULT NULL,
  `qte` double DEFAULT NULL,
  `prix` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déclencheurs `detailordannance`
--
DELIMITER $$
CREATE TRIGGER `tr_delete_qte` BEFORE DELETE ON `detailordannance` FOR EACH ROW BEGIN
UPDATE produit set stock=stock+old.qte;
end
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_insert_qte_stock` AFTER INSERT ON `detailordannance` FOR EACH ROW BEGIN
update produit set stock=stock-new.qte;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `NomUtilisateur` varchar(100) DEFAULT NULL,
  `Motdepasse` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `Numero` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `login`
--

INSERT INTO `login` (`id`, `NomUtilisateur`, `Motdepasse`, `email`, `Numero`) VALUES
(1, 'admin', 'admin', 'Admin@gmail.com', '0622334455');

-- --------------------------------------------------------

--
-- Structure de la table `ordonnance`
--

CREATE TABLE `ordonnance` (
  `id` int(11) NOT NULL,
  `dateO` timestamp NULL DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `ordonnance`
--

INSERT INTO `ordonnance` (`id`, `dateO`, `patient_id`) VALUES
(1, '2023-01-26 23:00:00', 4),
(15, '2023-01-26 20:19:04', 3),
(16, '2023-01-27 17:43:42', 4),
(17, '2023-01-17 23:00:00', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `datenaissance` date DEFAULT NULL,
  `sexe` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `patient`
--

INSERT INTO `patient` (`id`, `nom`, `prenom`, `datenaissance`, `sexe`) VALUES
(3, 'maktoub', 'chama', '1997-07-18', 'F'),
(4, 'youness', 'idrisssi', '2001-02-15', 'M');

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id` int(11) NOT NULL,
  `codebarre` varchar(100) DEFAULT NULL,
  `nomcommercial` varchar(100) DEFAULT NULL,
  `ppm` double DEFAULT NULL,
  `pph` double DEFAULT NULL,
  `stockinitial` double DEFAULT NULL,
  `stock` double DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `typemedicament_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id`, `codebarre`, `nomcommercial`, `ppm`, `pph`, `stockinitial`, `stock`, `active`, `typemedicament_id`) VALUES
(27, '3456789901', 'doliprane', 25, 6, 21, 8, 1, 2),
(28, '75237523582', 'Doli', 15, 12, 30, 20, 0, 2),
(29, '5485546544', 'dolipranes ', 20, 20, 20, 202, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `typemedicament`
--

CREATE TABLE `typemedicament` (
  `id` int(11) NOT NULL,
  `typemedicament` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `typemedicament`
--

INSERT INTO `typemedicament` (`id`, `typemedicament`) VALUES
(1, 'Principse'),
(2, 'Générique');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `detailordannance`
--
ALTER TABLE `detailordannance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ordonnance_id` (`ordonnance_id`),
  ADD KEY `produit_id` (`produit_id`);

--
-- Index pour la table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ordonnance`
--
ALTER TABLE `ordonnance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Index pour la table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `typemedicament_id` (`typemedicament_id`);

--
-- Index pour la table `typemedicament`
--
ALTER TABLE `typemedicament`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `detailordannance`
--
ALTER TABLE `detailordannance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `ordonnance`
--
ALTER TABLE `ordonnance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `typemedicament`
--
ALTER TABLE `typemedicament`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `detailordannance`
--
ALTER TABLE `detailordannance`
  ADD CONSTRAINT `detailordannance_ibfk_1` FOREIGN KEY (`ordonnance_id`) REFERENCES `ordonnance` (`id`),
  ADD CONSTRAINT `detailordannance_ibfk_2` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`id`);

--
-- Contraintes pour la table `ordonnance`
--
ALTER TABLE `ordonnance`
  ADD CONSTRAINT `ordonnance_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`);

--
-- Contraintes pour la table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `produit_ibfk_1` FOREIGN KEY (`typemedicament_id`) REFERENCES `typemedicament` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
