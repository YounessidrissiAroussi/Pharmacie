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
        $sql = "SELECT * FROM login";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $login = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //================ 
        echo json_encode($login);
        break;
        case "PUT";
        // for update
           $users = json_decode(file_get_contents('php://input'));
           $sql = "UPDATE `login` SET `NomUtilisateur`=:nomUtilisateur,`Motdepasse`=:motdepasse,`email`=:email,`Numero`=:numero WHERE id = 1";
           $stmt = $conn->prepare($sql);
           $stmt->bindParam(':nomUtilisateur' , $users->nomUtilisateur);
           $stmt->bindParam(':motdepasse' , $users->motdepasse);
           $stmt->bindParam(':email' , $users->email);
           $stmt->bindParam(':numero' , $users->numero);
           if($stmt->execute()){
               $response = ['status' => 1 , 'message' => 'Record update successfully'] ;
           }else{
               $response = ['status' => 0 , 'message' => 'Failed to update record'] ;
           }
           echo json_encode($response);
           break;
}

?>
