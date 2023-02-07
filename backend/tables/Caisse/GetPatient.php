<?php
error_reporting(E_ALL);
ini_set('display_errors' , 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../../ConnectDB.php';
$objectDb = new DbConnect;
$conn = $objectDb->connect();

$user = print_r(file_get_contents('php://input'));
$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":
        // for Display ur databases
        $sql = "SELECT ordonnance.id , patient.nom , patient.prenom from ordonnance , patient where patient.id = ordonnance.patient_id;";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $login = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //================
        echo json_encode($login);
        break;
}

?>