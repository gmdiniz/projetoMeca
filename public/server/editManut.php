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

    $id_manut = $_POST['manut_id'];

	if (empty($_POST['tipo'])) $response['tipo'] = 'Informe o tipo do chamado';
    else $tipo = $_POST['tipo'];

    if (empty($_POST['valor'])) $response['valor'] = 'Valor preterido';
    else $valor = $_POST['valor'];

    if (empty($_POST['descricao'])) $response['descricao'] = 'Dê uma breve descrição sobre o chamado';
    else $descricao = $_POST['descricao'];
    
	if (empty($response)) {

        $sql = "UPDATE manutencao set tipo='$tipo', valor='$valor', descricao='$descricao' WHERE id_manut = '$id_manut';";
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