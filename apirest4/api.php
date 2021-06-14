<?php
class Api
{

	public function listadoUsuarios()
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "SELECT * FROM usuario";
		$consulta = $db->prepare($sql);
		$consulta->execute();
		$data = $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $data;
		$consulta = null;
	}


	public function listadoCuestionario($id)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "SELECT * FROM cuestionario WHERE usuario_idusuario=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->execute();
		$data = $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $data;
		$consulta = null;
	}

	public function listadoBloque($id, $idRadio)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "SELECT b.idbloque, c.idcuestionario, b.name, b.description FROM usuario u " .
			"inner join cuestionario c on c.usuario_idusuario=u.idusuario " .
			"inner join bloque b on c.idcuestionario=b.cuestionario_idcuestionario " .
			"where u.idusuario=:id and  c.idcuestionario=:idRadio ";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->bindParam(':idRadio', $idRadio);
		$consulta->execute();
		$data = $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $data;
		$consulta = null;
	}


	public function listadoPregunta($id, $idbloque)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "select p.idpregunta, p.title, p.description from usuario u " .
			"inner join cuestionario c on u.idusuario=c.usuario_idusuario " .
			"inner join bloque b on c.idcuestionario=b.cuestionario_idcuestionario " .
			"inner join pregunta p on b.idbloque=p.bloque_idbloque " .
			"where c.usuario_idusuario=:idusuario and p.bloque_idbloque=:idbloque";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':idusuario', $id);
		$consulta->bindParam(':idbloque', $idbloque);
		$consulta->execute();
		$data = $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $data;
		$consulta = null;
	}

	public function listadoRespuesta($idusuario, $idcuestionario, $idbloque, $idpregunta)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "SELECT p.idpregunta, r.idrespuesta, r.text, r.isCorrect  from usuario u " .
			"inner join cuestionario c on u.idusuario=c.usuario_idusuario " .
			"inner join bloque b on c.idcuestionario=b.cuestionario_idcuestionario " .
			"inner join pregunta p on b.idbloque=p.bloque_idbloque " .
			"inner join respuesta r on p.idpregunta=r.pregunta_idpregunta " .
			"where u.idusuario=:idusuario and b.cuestionario_idcuestionario=:idcuestionario " .
			"and  p.bloque_idbloque=:idbloque and r.pregunta_idpregunta=:idpregunta";

		$consulta = $db->prepare($sql);
		$consulta->bindParam(':idusuario', $idusuario);
		$consulta->bindParam(':idcuestionario', $idcuestionario);
		$consulta->bindParam(':idbloque', $idbloque);
		$consulta->bindParam(':idpregunta', $idpregunta);
		$consulta->execute();
		$data = $consulta->fetchAll(PDO::FETCH_ASSOC);
		return $data;
		$consulta = null;
	}

	public function muestraUsuario($id)
	{
		$vector = array();
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "SELECT * FROM usuario WHERE idusuario=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			while ($fila = $consulta->fetch()) {
				$vector[] = array(
					'idusuario' => $fila['idusuario'],
					'email' => $fila['email'],
					'password' => $fila['password']
				);
			}
			return $vector[0];
		}
		$consulta = null;
	}

	public function muestraCuestionario($id)
	{
		$vector = array();
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "SELECT * FROM cuestionario WHERE idcuestionario=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			while ($fila = $consulta->fetch()) {
				$vector[] = array(
					'idcuestionario' => $fila['idcuestionario'],
					'name' => $fila['name'],
					'description' => $fila['description'],
					'category' => $fila['category']
				);
			}
			return $vector[0];
		} else {
			$vector[] = array('msg' => 'No hay datos para actualizar');
			return $vector[0];
		}
		$consulta = null;
	}


	public function recuperarBloque($id)
	{
		$vector = array();
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "SELECT * FROM bloque WHERE idbloque=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			while ($fila = $consulta->fetch()) {
				$vector[] = array(
					'idbloque' => $fila['idbloque'],
					'name' => $fila['name'],
					'description' => $fila['description']
				);
			}
			return $vector[0];
		} else {
			$vecto[] = array(
				'msg' => 'No hay datos para actualizar',
				'error' => 'Error al actualizar'
			);
			return $vector[0];
		}
		$consulta = null;
	}

	public function recuperarPregunta($id)
	{
		$vector = array();
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "SELECT * FROM pregunta WHERE idpregunta=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			while ($fila = $consulta->fetch()) {
				$vector[] = array(
					'idpregunta' => $fila['idpregunta'],
					'title' => $fila['title'],
					'description' => $fila['description']
				);
			}
			return $vector[0];
		} else {
			$vector[] = array(
				'msg' => 'No ha datos para actualizar',
				'error' => 'Error al actualizar'
			);
		}
		$consulta = null;
	}

	public function recuperarRespuesta($id)
	{
		$vector = array();
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "SELECT * FROM respuesta WHERE idrespuesta=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			while ($fila = $consulta->fetch()) {
				$vector[] = array(
					'idrespuesta' => $fila['idrespuesta'],
					'text' => $fila['text'],
					'isCorrect' => $fila['isCorrect']
				);
			}
			return $vector[0];
		} else {
			$vector[] = array(
				'msg' => 'No ha datos para actualizar',
				'error' => 'Error al actualizar'
			);
		}

		$consulta = null;
	}


	public function loginUsuario($email, $password)
	{
		$vector = array();
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "SELECT * FROM usuario where email=:email";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':email', $email);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			while ($data = $consulta->fetch()) {

				//varchar 255 caracteres
				if (password_verify($password, $data['password'])) {
					//if($data['password']==$password){
					$vector[] = array(
						'idusuario' => $data['idusuario'],
						'email' => $data['email'],
						'msg' => "usuarioOK"
					);
					return $vector[0];
				} else {
					$vector[] = array('msg' => "errorDeContraseña");
					return $vector[0];
				}
			}
		} else {
			$vector[] = array('msg' => "usuarioNoEncotrado");
			return $vector[0];
		}
		$consulta = null;
	}

	public function addUsuario($email, $password)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "INSERT INTO usuario (email, password) VALUES (:email, :password)";
		$consulta = $db->prepare($sql);
		$consulta->bindparam(':email', $email);
		// crea un nuevo hash de contraseña usando un algoritmo de hash fuerte de único sentido
		$passHush1 = password_hash($password, PASSWORD_DEFAULT);
		$consulta->bindparam(':password', $passHush1);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Usuario insertado"}';
		} else {
			return '{"msg":"Usuario no insertado"}';
		}
		$consulta = null;
	}


	public function addCuestionario($name, $description, $category, $cookiesId)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "INSERT INTO cuestionario (name,description,category,usuario_idusuario)" .
			" VALUES (:name,:description,:category,:usuario_idusuario)";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':name', $name);
		$consulta->bindParam(':description', $description);
		$consulta->bindParam(':category', $category);
		$consulta->bindParam(':usuario_idusuario', $cookiesId);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Cuestionario agregado"}';
		} else {

			return '{"msg":"Cuestionario no agregado"}';
		}
		$consulta = null;
	}

	public function addBloque($name, $description, $idRadio)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "INSERT INTO bloque (name, description, cuestionario_idcuestionario) " .
			"VALUES (:name, :description, :idRadio)";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':name', $name);
		$consulta->bindParam(':description', $description);
		$consulta->bindParam(':idRadio', $idRadio);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Bloque agregado"}';
		} else {
			return '{"msg":"Bloque no agregado"}';
		}
		$consulta = null;
	}

	public function addPregunta($title, $description, $idbloque)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "INSERT INTO pregunta (title, description, bloque_idbloque) " .
			"VALUES (:title, :description, :idbloque)";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':title', $title);
		$consulta->bindParam(':description', $description);
		$consulta->bindParam(':idbloque', $idbloque);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Pregunta agregado"}';
		} else {
			return '{"msg":"Pregunta no agregado"}';
		}
		$consulta = null;
	}

	public function addRespuesta($text, $iscorrect, $idpregunta)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "INSERT INTO respuesta (text, isCorrect, pregunta_idpregunta) " .
			"VALUES (:text, :isCorrect, :pre_id)";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':text', $text);
		$consulta->bindParam(':isCorrect', $iscorrect);
		$consulta->bindParam(':pre_id', $idpregunta);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Respuesta insertada"}';
		} else {
			return '{"msg":"Respuesta no insertada"}';
		}

		$consulta = null;
	}



	public function deleteUsuario($idusuario)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "DELETE FROM usuario WHERE idusuario=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $idusuario);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Usuario eliminado"}';
		} else {

			return '{"msg":"Usuario no eliminado"}';
		}

		$consulta = null;
	}

	public function deleteCuestionario($id)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "DELETE FROM cuestionario WHERE idcuestionario=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Cuestionario eliminado"}';
		} else {

			return '{"msg":"Cuestionario NO eliminado"}';
		}
		$consulta = null;
	}

	public function deleteBloque($id)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "DELETE FROM bloque WHERE idbloque=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Bloque eliminado"}';
		} else {

			return '{"msg":"Bloque no eliminado"}';
		}
		$consulta = null;
	}

	public function deletePregunta($id)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "DELETE FROM pregunta WHERE idpregunta=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Pregunta eliminada"}';
		} else {

			return '{"msg":"Pregunta no eliminada"}';
		}
		$consulta = null;
	}

	public function deleteRespuesta($id)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "DELETE FROM respuesta WHERE idrespuesta=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Respuesta eliminada"}';
		} else {

			return '{"msg":"Respuesta no eliminada"}';
		}
		$consulta = null;
	}


	public function updateUsuario($id, $email, $password)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "UPDATE usuario SET email=:email, password=:password WHERE idusuario=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->bindparam(':email', $email);
		// crea un nuevo hash de contraseña usando un algoritmo de hash fuerte de único sentido
		$passHush1 = password_hash($password, PASSWORD_DEFAULT);
		$consulta->bindParam(':password', $passHush1);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"usuario actualizado"}';
		} else {

			return '{"msg":"Usuario no actualizado"}';
		}
		$consulta = null;
	}

	public function updateCuestionario($id, $name, $description, $category)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "UPDATE cuestionario SET name=:name,description=:description,category=:category " .
			"WHERE idcuestionario=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindparam(':id', $id);
		$consulta->bindParam(':name', $name);
		$consulta->bindParam(':description', $description);
		$consulta->bindParam(':category', $category);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Cuestionario actualizado!!!"}';
		} else {
			return '{"msg":"No hay cambios en la actualización!"}';
		}
		$consulta = null;
	}

	public function updateBloque($id, $name, $description)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "UPDATE bloque SET name=:name, description=:description " .
			"WHERE idbloque=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->bindparam(':name', $name);
		$consulta->bindParam(':description', $description);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Bloque actualizada!!!"}';
		} else {
			return '{"msg":"No hay cambios en la actualización!"}';
		}
		$consulta = null;
	}
	public function updatePregunta($id, $title, $description)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "UPDATE pregunta SET title=:title, description=:description " .
			"WHERE idpregunta=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->bindparam(':title', $title);
		$consulta->bindParam(':description', $description);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Pregunta actualizada!!!"}';
		} else {
			return '{"msg":"No hay cambios en la actualización!"}';
		}
		$consulta = null;
	}

	public function updateRespuesta($id, $text, $iscorrect)
	{
		$conexion = new Conexion();
		$db = $conexion->getConexion();
		$sql = "UPDATE respuesta SET text=:text, isCorrect=:isCorrect " .
			"WHERE idrespuesta=:id";
		$consulta = $db->prepare($sql);
		$consulta->bindParam(':id', $id);
		$consulta->bindParam(':text', $text);
		$consulta->bindparam(':isCorrect', $iscorrect);
		$consulta->execute();
		if ($consulta->rowCount() > 0) {
			return '{"msg":"Respuesta actualizada"}';
		} else {

			return '{"msg":"Respuesta no actualizada"}';
		}
		$consulta = null;
	}
}
