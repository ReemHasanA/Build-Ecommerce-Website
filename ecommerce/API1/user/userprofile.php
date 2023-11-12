<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
include '../include.php';

// Check if it's a GET request
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Check if 'email' parameter is set
    if (isset($_GET['email'])) {
        // Trim and convert to lowercase for case-insensitivity
        $email = strtolower(trim($_GET['email']));
        
        // Use prepared statements to prevent SQL injection
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();

        // Debugging
        if ($stmt->error) {
            echo json_encode(array("error" => "SQL Error: " . $stmt->error));
        } else {
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                echo json_encode($user);
            } else {
                echo json_encode(array("message" => "User with the provided email not found."));
            }
        }

        $stmt->close();
    } else {
        echo json_encode(array("error" => "Please provide the email."));
    }
} else {
    echo json_encode(array("error" => "Invalid request method."));
}

// Close the database connection (if not done automatically in your include.php)
$conn->close();
?>
