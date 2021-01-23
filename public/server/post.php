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

    $userId = $_POST['id'];

	if (empty($_POST['title'])) $response['title'] = 'Informe o título do post.';
    else $title = $_POST['title'];
    
    if (empty($_POST['content'])) $response['content'] = 'Informe o conteúdo do post.';
    else $content = $_POST['content'];
    
    if (!empty($_POST['tag'])) $tag = $_POST['tag'];	

	if (empty($response)) {

        $sql = "SELECT MAX(id_publi) AS id_publi FROM publicacao";
        $result = mysqli_query($con, $sql);
        $data = mysqli_fetch_assoc($result);
        $idPubli = $data['id_publi'] + 1;

        $sql = "INSERT INTO publicacao (id_publi, fk_usuario, content, created, active, tag, title) " .
        " VALUES ($idPubli, $userId, '$content', NOW(), 0, '[$tag]', '$title');";
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