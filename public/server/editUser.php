<?php
	
	include('connection.php');
	header('Content-Type: application/json');	

	if(!isset($_POST)) {
      	die();
    }

    $response = [];
	$input = file_get_contents("php://input");

	try {
		$_POST = json_decode($input, true);
	} catch (Exception $e) {
		echo $e->getMessage();
		return;
	}

    $user_id = $_POST['id'];

	if (empty($_POST['nome'])) $response['nome'] = 'Informe seu nome';
    else $nome = $_POST['nome'];

    if (empty($_POST['cpf'])) $response['cpf'] = 'CPF preterido';
    else $cpf = $_POST['cpf'];

    if (empty($_POST['email'])) $response['email'] = 'O usuario deve ter um email';
    else $email = $_POST['email'];
    
	if (empty($response)) {

        $sql = "UPDATE usuario set nome='$nome', email='$email', cpf='$cpf' WHERE id_usuario = '$user_id';";
        if (mysqli_query($con, $sql)) {
            $response['status'] = 'ok';
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($con);
            $response['status'] = 'error';		
        }
	} else {
        $response['status'] = 'invalid';
    }

	echo json_encode($response);
?>  