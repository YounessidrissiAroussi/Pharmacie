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
    case "POST";
    // for Insert
    $Dordonnances = json_decode(file_get_contents('php://input'));
    foreach ($Dordonnances as $Ordan){
        $sql = "INSERT INTO detailordannance VALUES (null,'$Ordan->ordonnance_id','$Ordan->id','$Ordan->qte','$Ordan->ppm');";
        $stmt = $conn->prepare($sql);
    if($stmt->execute()){
        $response = ['status' => 1 , 'message' => 'Record created successfully'] ;
    }else{
        $response = ['status' => 0 , 'message' => 'Failed to create record'] ;
    }
    }
     echo json_encode($response);
}

?>