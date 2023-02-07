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
        $sql = "SELECT * FROM typemedicament ;";
        $path = explode('/' , $_SERVER['REQUEST_URI']);

        if(isset($path[5]) && is_numeric($path[5])){
            $sql = "SELECT * FROM typemedicament WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
            $stmt->execute();
            $typemedicament = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $typemedicament = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        //================ 
        echo json_encode($typemedicament);
        break;
        case "POST";
        // for Insert
        $typemedicament = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO `typemedicament`(`id`, `typemedicament`) VALUES(null ,:typemedicament)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':typemedicament' , $typemedicament->typemedicament);
     
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
           $typemedicament = json_decode(file_get_contents('php://input'));
           $sql = "UPDATE `typemedicament` SET `typemedicament`=:typemedicament WHERE id = :id";
           $stmt = $conn->prepare($sql);
           $stmt->bindParam(':id' , $typemedicament->id);
           $stmt->bindParam(':typemedicament' , $typemedicament->typemedicament);

           if($stmt->execute()){
               $response = ['status' => 1 , 'message' => 'Record update successfully'] ;
           }else{
               $response = ['status' => 0 , 'message' => 'Failed to update record'] ;
           }
           echo json_encode($response);
           break;
           case "DELETE" :
            $sql = "DELETE FROM typemedicament WHERE id= :id";
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