<?php
include '../conn.php';
function sendJson(int $status, string $message, array $extra = []): void
{
    $response = ['status' => $status];
    if ($message) $response['message'] = $message;
    http_response_code($status);
    echo json_encode(array_merge($response, $extra));
    exit;
}

      
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: POST,PUT');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] == 'POST') :
    $data = json_decode(file_get_contents('php://input'));
    if (isset($data->email)&&isset($data->total_price)&&isset($data->payment)){
    $email= $data->email;
    $total_price = $data->total_price;
    $payment=$data->payment;
    $sql1 = "SELECT id FROM users WHERE users.email='$email'";
    $result = $conn->query($sql1);
    $nresult=$result->fetch_assoc();
    $user_id=$nresult['id'];
    $sql = "INSERT INTO orders (`user_id`,`total_price`,`payment_by`) VALUES('$user_id','$total_price','$payment')";
    $query = mysqli_query($conn, $sql);
    // print_r ($nresult)
    // $sql = "SELECT * FROM users INNER JOIN cart ON cart.user_id=users.id WHERE users.email='$email'";
    // $sql="UPDATE orders  SET user_id= '$user_id',total_price='$total_price';
        // $query=$conn->query($sql);
    $sql2="SELECT * FROM cart WHERE user_id = $user_id ";
            $result1 = $conn->query($sql2);
            if ($result1->num_rows > 0) {
    //             $talb=$result1->fetch_assoc();
    //             $quantity=++$talb['quantity'];
    //             if(isset($data->quantity)&&!empty($data->quantity)){
    //                 $quantity=$data->quantity;
    //             if(($quantity)===0){
                    $d="DELETE FROM cart WHERE user_id = '$user_id' ";
                 $conn->query($d);
               }
       }else{
        echo"no product to checkout";
}
    if ($query) sendJson(201, "successfully added.");
    sendJson(500, 'Something going wrong.');
    
endif;

sendJson(405, 'Invalid Request Method. HTTP method should be POST');