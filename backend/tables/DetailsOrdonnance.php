<?php
error_reporting(E_ALL);
ini_set('display_errors' , 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


include '../ConnectDB.php';
$objectDb = new DbConnect;
$conn = $objectDb->connect();

$user = print_r(file_get_contents('php://input'));
$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":
           $sql ='SELECT patient.nom, patient.prenom,detailordannance.id ,detailordannance.ordonnance_id,produit.nomcommercial,detailordannance.qte,produit.ppm from patient,produit,ordonnance,detailordannance where patient.id=ordonnance.patient_id and ordonnance.id=detailordannance.ordonnance_id AND  produit.id=detailordannance.produit_id;';
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $detailordannance = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // ================ 
        echo json_encode($detailordannance);
        break;
    }