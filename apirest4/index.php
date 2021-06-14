<?php
require_once('conexion.php');
require_once('api.php');
require_once('cors.php');

$method = $_SERVER['REQUEST_METHOD'];
$api = new Api();

if ($method == "GET") {

	$opcion = $_REQUEST['opcion'];


	switch ($opcion) {
		case "listadoUsuario":
			$vector = array();
			$vector = $api->listadoUsuarios();
			$json = json_encode($vector);
			echo $json;
			break;
		case "recuperaUsuario":
			$id = $_GET['id'];
			if (!empty($_GET['id'])) {
				$obj = $api->muestraUsuario($id);
				$json = json_encode($obj);
				echo $json;
			}
			break;
		case "listadoCuestionario":
			$vector = array();
			$id = $_GET['id'];
			if (!empty($_GET['id'])) {
				$vector = $api->listadoCuestionario($id);
				$json = json_encode($vector);
				echo $json;
			}
			break;
		case "recuperaCuestionario":
			$id = $_GET['id'];
			if (!empty($_GET['id'])) {
				$obj = $api->muestraCuestionario($id);
				$json = json_encode($obj);
				echo $json;
			}
			break;
		case "listadoBloque":
			$vector = array();
			$id = $_GET['id'];
			$idRadio = $_GET['idRadio'];
			if (!empty($_GET['id']) && !empty($_GET['idRadio'])) {
				$vector = $api->listadoBloque($id, $idRadio);
				$json = json_encode($vector);
				echo $json;
			}
			break;
		case 'recuperarBloque':
			$id = $_GET['id'];
			if (!empty($_GET['id'])) {
				$obj = $api->recuperarBloque($id);
				$json = json_encode($obj);
				echo $json;
			}
			break;
		case 'listadoPregunta':
			$vector = array();
			$id = $_GET['id'];
			$idbloque = $_GET['idbloque'];
			if (!empty($_GET['id']) && !empty($_GET['idbloque'])) {
				$vector = $api->listadoPregunta($id, $idbloque);
				$json = json_encode($vector);
				echo $json;
			}
			break;
		case 'recuperarPregunta':
			$id = $_GET['id'];
			if (!empty($_GET['id'])) {
				$obj = $api->recuperarPregunta($id);
				$json = json_encode($obj);
				echo $json;
			}
			break;
		case 'listadoRespuesta':
			$idusuario = $_GET['idCookieUsuario'];
			$idcuestionario = $_GET['idradio'];
			$idbloque = $_GET['idbloque'];
			$idpregunta = $_GET['idpregunta'];
			if (!empty($_GET['idCookieUsuario'])) {
				$obj = $api->listadoRespuesta($idusuario, $idcuestionario, $idbloque, $idpregunta);
				$json = json_encode($obj);
				echo $json;
			}
			break;
		case 'recuperarRespuesta':
			$id = $_GET['id'];
			if (!empty($_GET['id'])) {
				$obj = $api->recuperarRespuesta($id);
				$json = json_encode($obj);
				echo $json;
			}

			break;
	}
}

if ($method == 'POST') {
	$json = null;
	$data = json_decode(file_get_contents('php://input'), true);
	$opcion = $data['opcion'];

	switch ($opcion) {
		case "login":
			$email = $data['email'];
			$password = $data['password'];
			$obj = $api->loginUsuario($email, $password);
			$json = json_encode($obj);
			echo $json;
			break;
		case "addUsuario":
			$email = $data['email'];
			$password = $data['password'];
			$json = $api->addUsuario($email, $password);
			echo $json;
			break;
		case "addCuestionario":
			$name = $data['name'];
			$description = $data['description'];
			$category = $data['category'];
			$cookiesId = $data['cookiesId'];
			$json = $api->addCuestionario($name, $description, $category, $cookiesId);
			echo $json;
			break;
		case "addBloque":
			$name = $data['name'];
			$description = $data['description'];
			$idRadio = $data['idRadio'];
			$json = $api->addBloque($name, $description, $idRadio);
			echo $json;
			break;
		case "addPregunta":
			$title = $data['title'];
			$description = $data['description'];
			$idbloque = $data['idbloque'];
			$json = $api->addPregunta($title, $description, $idbloque);
			echo $json;
		case "addRespuesta":
			$text = $data['text'];
			$iscorrect = $data['value'];
			$idpregunta = $data['idpregunta'];
			$json = $api->addRespuesta($text, $iscorrect, $idpregunta);
			echo $json;
			break;
	}
}


if ($method == 'DELETE') {
	$json = null;
	$api = new Api();
	$id = $_REQUEST['id'];
	$opcion = $_REQUEST['opcion'];
	switch ($opcion) {
		case "deleteUsuario":
			$json = $api->deleteUsuario($id);
			echo $json;
			break;
		case "deleteCuestionario":
			$json = $api->deleteCuestionario($id);
			echo $json;
			break;
		case "deleteBloque":
			$json = $api->deleteBloque($id);
			echo $json;
			break;
		case "deletePregunta":
			$json = $api->deletePregunta($id);
			echo $json;
			break;
		case 'deleteRespuesta':
			$json = $api->deleteRespuesta($id);
			echo $json;
			break;
	}
}

if ($method == "PUT") {
	$json = null;
	$data = json_decode(file_get_contents('php://input'), true);
	$id = $data['id'];
	$opcion = $data['opcion'];
	switch ($opcion) {
		case 'updateUsuario':
			$email = $data['email'];
			$password = $data['password'];
			$json = $api->updateUsuario($id, $email, $password);
			echo $json;
			break;
		case 'updateCuestionario':
			$name = $data['name'];
			$description = $data['description'];
			$category = $data['category'];
			$json = $api->updateCuestionario($id, $name, $description, $category);
			echo $json;
			break;
		case 'updateBloque':
			$id = $data['id'];
			$name = $data['name'];
			$description = $data['description'];
			$json = $api->updateBloque($id, $name, $description);
			echo $json;
			break;
		case 'updatePregunta':
			$id = $data['id'];
			$title = $data['title'];
			$description = $data['description'];
			$json = $api->updatePregunta($id, $title, $description);
			echo $json;
			break;
		case 'updateRespuesta':
			$id=$data['id'];
			$text=$data['text'];
			$isCorrect=$data['valor'];
			$json=$api->updateRespuesta($id, $text, $isCorrect);
			echo $json;
			break;
	}
}
