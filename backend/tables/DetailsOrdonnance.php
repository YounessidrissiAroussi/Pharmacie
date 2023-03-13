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
        // for Display ur databases
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        if(isset($path[5]) && is_numeric($path[5])){
            $sql ='select produit.nomcommercial,produit.ppm,detailordannance.ordonnance_id,detailordannance.qte FROM produit , detailordannance , ordonnance WHERE detailordannance.ordonnance_id = ordonnance.id and produit.id =detailordannance.produit_id AND detailordannance.ordonnance_id=:id;';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
            $stmt->execute();
            $detailordannance = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        //================ 
        echo json_encode($detailordannance);
        break;
    }