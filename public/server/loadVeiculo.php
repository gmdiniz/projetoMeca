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
		$_POST = json_decode($input, true);
	} catch (Exception $e) {
		echo $e->getMessage();
		return;
	}

    $userId = $_POST['userId'];

    $query = "SELECT * FROM veiculo WHERE fk_usuario ='$userId';";
    $result = mysqli_query($con, $query);


    if(mysqli_num_rows($result) > 0) {
        $response = mysqli_fetch_all($result, MYSQLI_ASSOC);
    } else {
        $response = 'error';
    }

    echo json_encode($response);
?>