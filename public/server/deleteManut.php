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
    
	if (empty($response)) {
        $sql = "DELETE FROM manutencao WHERE id_manut = '$id_manut';";
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