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
    $emailOrCpf = mysqli_real_escape_string($con, $_POST['emailOrCpf']);
    $senha = mysqli_real_escape_string($con, $_POST['senha']);
    $query = "SELECT * FROM usuario WHERE email='$emailOrCpf' or cpf='$emailOrCpf';";
    $result = mysqli_query($con, $query);

    if(mysqli_num_rows($result) > 0) {
        foreach($result as $row) {
            if(password_verify($senha, $row["senha"])) {
                $response['id'] = $row['id_usuario'];
                $response['created'] = $row['created'];
                $response['email'] = $row['email'];
                $response['username'] = $row['nome'];
                $response['foto_perfil'] = $row['foto_perfil'];
                $response['cpf'] = $row['cpf'];
                $response['status'] = 'loggedin';
            } else {
                $response = 'Wrong Password';
            }
        }
    } else {
        $response['status'] = 'error';
    }

    echo json_encode($response);
?>