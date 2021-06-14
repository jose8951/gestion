<?php
	class Conexion{
		public function getConexion(){
			define('servidor','localhost');
			define('nombre_db','gestion');
			define('usuario','root');
			define('password','');
			
			$opciones=array(PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');
			try{
				$db=new PDO("mysql:host=" .servidor . ";dbname=".nombre_db, usuario, password, $opciones);
				return $db;
			}catch(Exception $e){
				die("El error de conexión es ". $e->getMessage());
				
			}
		
	}
	}



?>