-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : dim. 26 fév. 2023 à 18:28
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

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
-- Structure de la table `archiveordonnance`
--

CREATE TABLE `archiveordonnance` (
  `id` int(11) NOT NULL,
  `dateO` date DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `archivepatient`
--

CREATE TABLE `archivepatient` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `datenaissance` date DEFAULT NULL,
  `sexe` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `archiveproduit`
--

CREATE TABLE `archiveproduit` (
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
-- Déchargement des données de la table `detailordannance`
--

INSERT INTO `detailordannance` (`id`, `ordonnance_id`, `produit_id`, `qte`, `prix`) VALUES
(15, 21, 36, 6, 29),
(16, 21, 31, 3, 20.97),
(17, 23, 37, 2, 20),
(18, 22, 31, 10, 20.97);

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
(21, '2023-02-24 15:53:46', 6),
(22, '2023-02-24 15:53:59', 7),
(23, '2023-02-24 15:54:13', 5);

--
-- Déclencheurs `ordonnance`
--
DELIMITER $$
CREATE TRIGGER `SoftDelete2` BEFORE DELETE ON `ordonnance` FOR EACH ROW BEGIN
insert into ArchiveOrdonnance VALUES (old.id,old.dateO,old.patient_id);
END
$$
DELIMITER ;

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
(5, 'Passager', 'passager', '0001-01-01', 'F'),
(6, 'maktoub', 'chama', '1997-07-18', 'F'),
(7, 'ABIBOU', 'Idriss', '1986-12-05', 'M');

--
-- Déclencheurs `patient`
--
DELIMITER $$
CREATE TRIGGER `SoftDelete1` BEFORE DELETE ON `patient` FOR EACH ROW BEGIN
insert into ArchivePatient VALUES (old.id,old.nom,old.prenom,old.datenaissance,old.sexe);
END
$$
DELIMITER ;

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
(31, '3456789900', 'RENOMICINE', 20.97, 10.07, 20, -1, 1, 2),
(36, '4567890545', 'Doliprane', 29, 13, 30, 9, 2, 2),
(37, NULL, 'Nuravite', 20, 12, 34, 13, 1, 2);

--
-- Déclencheurs `produit`
--
DELIMITER $$
CREATE TRIGGER `SoftDelete3` BEFORE DELETE ON `produit` FOR EACH ROW BEGIN
insert into ArchiveOrdonnance VALUES (old. id ,
   old. codebarre,
  old.	nomcommercial,
   old. ppm ,
  old.  pph,
   old. stockinitial,
   old. stock ,
   old. active,
   old. typemedicament_id );
END
$$
DELIMITER ;

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
-- Index pour la table `archiveordonnance`
--
ALTER TABLE `archiveordonnance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Index pour la table `archivepatient`
--
ALTER TABLE `archivepatient`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `archiveproduit`
--
ALTER TABLE `archiveproduit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `typemedicament_id` (`typemedicament_id`);

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
-- AUTO_INCREMENT pour la table `archiveordonnance`
--
ALTER TABLE `archiveordonnance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `archivepatient`
--
ALTER TABLE `archivepatient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `archiveproduit`
--
ALTER TABLE `archiveproduit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `detailordannance`
--
ALTER TABLE `detailordannance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `ordonnance`
--
ALTER TABLE `ordonnance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `typemedicament`
--
ALTER TABLE `typemedicament`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `archiveordonnance`
--
ALTER TABLE `archiveordonnance`
  ADD CONSTRAINT `archiveordonnance_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`);

--
-- Contraintes pour la table `archiveproduit`
--
ALTER TABLE `archiveproduit`
  ADD CONSTRAINT `archiveproduit_ibfk_1` FOREIGN KEY (`typemedicament_id`) REFERENCES `typemedicament` (`id`);

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
