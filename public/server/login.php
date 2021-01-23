<?php
    include('connection.php');

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    if(!isset($_POST)) {
    die();
    }

    session_start();
    $response = []; 
    $input = file_get_contents("php://input");

    try {
        $post = json_decode($input, 1);
    } catch (Exception $e) {
        $post = $_POST;
    }

    $_POST = $post;
    $email = mysqli_real_escape_string($con, $_POST['email']);
    $senha = mysqli_real_escape_string($con, $_POST['senha']);
    $query = "SELECT * FROM usuario WHERE email='$email';";
    $result = mysqli_query($con, $query);

    if(mysqli_num_rows($result) > 0) {
        foreach($result as $row) {
            if(password_verify($senha, $row["senha"])) {
                $_SESSION["name"] = $row["nome"];
                $response['status'] = 'loggedin';
                $response['user'] = $email;
                $response['id'] = $row['id_usuario'];
                $_SESSION['user'] = $email;
            } else {
                $response = 'Wrong Password';
            }
        }
    } else {
        $response['status'] = 'error';
    }

    echo json_encode($response);
?>