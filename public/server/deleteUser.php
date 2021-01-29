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

    $user_id = $_POST['user_id'];
    
	if (empty($response)) {
        $sql = "DELETE FROM usuario WHERE id_usuario = '$user_id';";
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