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

    $id_usuario = $_POST['id'];

	if (empty($_POST['tipo'])) $response['tipo'] = 'Informe o tipo do chamado';
    else $tipo = $_POST['tipo'];
    
    if (empty($_POST['veiculo'])) $response['veiculo'] = 'Selecione seu veiculo';
    else $fk_veiculo = $_POST['veiculo'];

    if (empty($_POST['valor'])) $response['valor'] = 'Valor preterido';
    else $valor = $_POST['valor'];

    if (empty($_POST['descricao'])) $response['descricao'] = 'Dê uma breve descrição sobre o chamado';
    else $descrica = $_POST['descricao'];
    
	if (empty($response)) {

        $sql = "SELECT MAX(id_manut) AS id_manut FROM manutencao";
        $result = mysqli_query($con, $sql);
        $data = mysqli_fetch_assoc($result);
        $idManut = $data['id_manut'] + 1;

        $sql = "INSERT INTO manutencao (id_manut, fk_usuario, fk_veiculo, created, tipo, valor, descricao) " .
        " VALUES ($id_manut, $fk_usuario, $fk_veiculo, $created, $tipo, $valor, $descricao);";
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