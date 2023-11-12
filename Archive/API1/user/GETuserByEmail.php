<?php
//////////////////////////////////////////////////////////////////////
///////////////////use GET Method  ///////////////////////////////////////// 
/////////////////to get all the users /////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////send :id + POST method ////////////////////////////
/////////////////to GET the user /////////////////////////////////
//////////////////////////////////////////////////////////////////////
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include '../include.php';



if ($_SERVER['REQUEST_METHOD'] =='GET') {
    if (isset($_GET['email'])){
        $email=$_GET['email'];
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {  
        $event = $result->fetch_assoc();
        echo json_encode($event);
    } else {
        echo json_encode(array("message" => "user with the provided ID not found."));
    }
} else {
    echo json_encode(array("error" => "Please provide the user ID."));
}}

   
 else {
    echo json_encode(array("error" => "Invalid request method."));
}


?>
