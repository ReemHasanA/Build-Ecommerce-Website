<?php
//////////////////////////////////////////////////////////////////////
///////////////////use GET Method  ///////////////////////////////////////// 
/////////////////to get all the comments where product_id = current proudect ///
/////////////////////////////////////////////////////////////////////////
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include '../include.php';

$data = json_decode(file_get_contents('php://input'), true);


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $product_id = $_GET['id'];
    $sql = "SELECT comments.comment_content, users.username,comments.rate 
            FROM comments
            JOIN users ON comments.user_id = users.id
            WHERE comments.product_id =$product_id;";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) { 
        $events = array();
        while ($row = $result->fetch_assoc()) {
            $events[] = $row;
        }
        echo json_encode($events);
    } else {
        echo json_encode(array("message" => "No comment records found."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method."));
}

// $conn->close();
?>
