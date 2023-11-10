<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: POST,PUT');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

session_start();

class Connection {
    public $host = "localhost";
    public $user = "root";
    public $password = "";
    public $dbname = "task2";
    public $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->user, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }
}

class Register extends Connection {
    public function registration($username, $password, $email) {
        try {
            $duplicate = mysqli_query($this->conn, "SELECT * FROM users WHERE username = '$username'");
            if (mysqli_num_rows($duplicate) > 0) {
                return ['status' => 10, 'message' => 'User with the same username already exists'];
            } else {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $query = "INSERT INTO users (username, password, email) VALUES ('$username', '$hashedPassword', '$email')";
                mysqli_query($this->conn, $query);
                return ['status' => 1, 'message' => 'Registration successful'];
            }
        } catch (mysqli_sql_exception $e) {
            return ['status' => -1, 'message' => $e->getMessage()];
        }
    }
}

// Handle API requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data && isset($data["username"]) && isset($data["email"]) && isset($data["password"])) {
        $username = $data["username"];
        $email = $data["email"];
        $password = $data["password"];

        $register = new Register();
        $result = $register->registration($username, $password, $email);

        // Send JSON response
        header('Content-Type: application/json');
        echo json_encode($result);
        exit();
    } else {
        // Invalid JSON input
        $response = ['status' => 'error', 'message' => 'Invalid JSON input'];

        // Send JSON response
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }
}

// If it's not an API request, continue with the regular HTML form submission
if (isset($_POST["submit"])) {
    $register = new Register();
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    $result = $register->registration($username, $password, $email);

    if ($result['status'] == 1) {
        echo "<script> alert('Registration successful'); </script>";
    } elseif ($result['status'] == 10) {
        echo "<script> alert('User with the same username already exists'); </script>";
    } else {
        echo "<script> alert('Registration failed: " . $result['message'] . "'); </script>";
    }
}
?>
