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

    $id_veiculo = $_POST['car_id'];
    
	if (empty($response)) {
        $sql = "DELETE FROM veiculo WHERE id_veiculo = '$id_veiculo';";
        if (mysqli_query($con, $sql)) {
            $response['status'] = 'ok';
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($con);
            $response['status'] = 'Ocorreu um erro ao excluir esse veículo';		
        }
	} else {
        $response['status'] = 'invalid';
    }

	echo json_encode($response);
?>  