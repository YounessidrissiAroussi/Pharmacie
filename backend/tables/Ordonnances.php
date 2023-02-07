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
        $sql = "SELECT ordonnance.id,ordonnance.dateO,patient.nom FROM ordonnance,patient where patient.id=ordonnance.patient_id ;";
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        if(isset($path[5]) && is_numeric($path[5])){
            $sql = "SELECT * FROM ordonnance WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
            $stmt->execute();
            $ordonnance = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $ordonnance = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        //================ 
        echo json_encode($ordonnance);
        break;
        case "POST";
            // for Insert
            $ordonnance = json_decode(file_get_contents('php://input'));
            $sql = "INSERT INTO `ordonnance`(`id`, `dateO`, `patient_id`) VALUES(null ,:dateO,:patient_id  )";
            $stmt = $conn->prepare($sql);
            $dateO = date("Y-m-d H:i:s");
            $stmt->bindParam(':dateO' , $dateO);
            $stmt->bindParam(':patient_id' , $ordonnance->patient_id);
            //=========================================
            if($stmt->execute()){
                $response = ['status' => 1 , 'message' => 'Record created successfully'] ;
            }else{
                $response = ['status' => 0 , 'message' => 'Failed to create record'] ;
            }
            echo json_encode($response);
            break;
        case "PUT";
        // for update
           $ordonnance = json_decode(file_get_contents('php://input'));
           $sql = "UPDATE `ordonnance` SET `dateO`=:dateO,`patient_id`=:patient_id WHERE id = :id";
           $stmt = $conn->prepare($sql);
           $dateO = date("Y-m-d H:i:s");
           $stmt->bindParam(':id' , $ordonnance->id);
           $stmt->bindParam(':dateO' , $dateO);
           $stmt->bindParam(':patient_id' , $ordonnance->patient_id);
           if($stmt->execute()){
               $response = ['status' => 1 , 'message' => 'Record update successfully'] ;
           }else{
               $response = ['status' => 0 , 'message' => 'Failed to update record'] ;
           }
           echo json_encode($response);
           break;

        case "DELETE" :
            $sql = "DELETE FROM ordonnance WHERE id= :id";
            $path = explode('/' , $_SERVER['REQUEST_URI']);
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
            if($stmt->execute()){
                $response = ['status' => 1 , 'message' => 'Record delete successfully'] ;
            }else{
                $response = ['status' => 0 , 'message' => 'Failed to delete record'] ;
            }
        echo json_encode($response);
        break;
}


?>