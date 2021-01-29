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

    $id_veiculo = $_POST['id_veiculo'];

	if (empty($_POST['modelo'])) $response['modelo'] = 'Informe o modelo do veiculo.';
    else $modelo = $_POST['modelo'];

	if (empty($_POST['marca'])) $response['marca'] = 'Informe a marca do veiculo.';
    else $marca = $_POST['marca'];

	if (empty($_POST['placa'])) $response['placa'] = 'Informe a placa do veiculo.';
    else $placa = $_POST['placa'];

	if (empty($_POST['cor'])) $response['cor'] = 'Informe a cor do veiculo.';
    else $cor = $_POST['cor'];

	if (empty($_POST['ano'])) $response['ano'] = 'Informe o ano do veiculo.';
    else $ano = $_POST['ano'];
    
	if (empty($response)) {

        $sql = "UPDATE veiculo set modelo='$modelo', marca='$marca', placa='$placa', cor='$cor', ano='$ano' WHERE id_veiculo = '$id_veiculo';";
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