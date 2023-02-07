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
        $sql = "SELECT produit.id,produit.codebarre,produit.nomcommercial,produit.ppm,produit.pph,produit.stockinitial,produit.stock,produit.active,typemedicament.typemedicament FROM typemedicament , produit WHERE typemedicament.id=produit.typemedicament_id;";
        $path = explode('/' , $_SERVER['REQUEST_URI']);

        if(isset($path[5]) && is_numeric($path[5])){
            $sql = "SELECT * FROM produit WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
            $stmt->execute();
            $produit = $stmt->fetch(PDO::FETCH_ASSOC);
        }else{
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $produit = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        //================ 
        echo json_encode($produit);
        break;
    case "POST";
            // for Insert
            $produit = json_decode(file_get_contents('php://input'));
            $sql = "INSERT INTO `produit`(`id`, `codebarre`, `nomcommercial`, `ppm`, `pph`, `stockinitial`, `stock`, `active`, `typemedicament_id`) VALUES(null ,:codebarre ,:nomcommercial , :ppm, :pph , :stockinitial ,:stock , :active ,:typemedicament_id )";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':codebarre' , $produit->codebarre);
            $stmt->bindParam(':nomcommercial' , $produit->nomcommercial);
            $stmt->bindParam(':ppm' , $produit->ppm);
            $stmt->bindParam(':pph' , $produit->pph);
            $stmt->bindParam(':stockinitial' , $produit->stockinitial);
            $stmt->bindParam(':stock' , $produit->stock);
            $stmt->bindParam(':active' , $produit->active);
            $stmt->bindParam(':typemedicament_id' , $produit->typemedicament_id);
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
           $produit = json_decode(file_get_contents('php://input'));
           $sql = "UPDATE `produit` SET `codebarre`=:codebarre,`nomcommercial`=:nomcommercial,`ppm`=:ppm,`pph`=:pph,`stockinitial`=:stockinitial,`stock`=:stock,`active`=:active , `typemedicament_id`=:typemedicament_id  WHERE id = :id";
           $stmt = $conn->prepare($sql);
           $stmt->bindParam(':id' , $produit->id);
           $stmt->bindParam(':codebarre' , $produit->codebarre);
           $stmt->bindParam(':nomcommercial' , $produit->nomcommercial);
           $stmt->bindParam(':ppm' , $produit->ppm);
           $stmt->bindParam(':pph' , $produit->pph);
           $stmt->bindParam(':stockinitial' , $produit->stockinitial);
           $stmt->bindParam(':stock' , $produit->stock);
           $stmt->bindParam(':active' , $produit->active);
           $stmt->bindParam(':typemedicament_id' , $produit->typemedicament_id);
           if($stmt->execute()){
               $response = ['status' => 1 , 'message' => 'Record update successfully'] ;
           }else{
               $response = ['status' => 0 , 'message' => 'Failed to update record'] ;
           }
           echo json_encode($response);
           break;

    case "DELETE" :
            $sql = "DELETE FROM produit WHERE id= :id";
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