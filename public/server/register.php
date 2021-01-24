<?php

    include('connection.php');

    $message = '';
    $validation_error = '';

    $input = file_get_contents("php://input");
    try {
        $post = json_decode($input);
    } catch (Exception $e) {
        $post = $_POST;
    }
    $_POST = $post;

    //validação de nome
    if(empty($_POST->nome)) {
        $error[] = 'Nome é requerido';
    } else {
        $nome = $_POST->nome;
    }
  
    //validação de cpf
    if(empty($_POST->cpf)) {
        $error[] = 'Cpf precisa ser preenchido';
    } else {
        $cpf = $_POST->cpf;
    }

    //validação de email
    if(empty($_POST->email)) {
        $error[] = 'Email é requerido';
    } else {
        if(!filter_var($_POST->email, FILTER_VALIDATE_EMAIL)) {
            $error[] = 'Formato invalido';
        }
        else {
            $email = $_POST->email;
        }
    }

    //validação de senha
    if(empty($_POST->senha)) {
        $error[] = 'Senha é requerida';
    } else {
        $senha = password_hash($_POST->senha, PASSWORD_DEFAULT);
    }

    //cadastro
    if(empty($error)) {
        $query = "INSERT INTO `usuario` (nome, email, senha, cpf, created) VALUES ('$nome','$email','$senha','$cpf',NOW())";
        $statement = mysqli_query($con, $query);
    }

    //exception de erro
    $output = array(
        'error'  => $validation_error,
        'message' => $message
    );

    echo json_encode($output);

?>





