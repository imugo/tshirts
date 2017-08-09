<?php
session_start();

	if (isset($_POST['authorise'])) {
		$data = $_POST['authorise'];
		if ($data['username'] && $data['password'] == 'admin') {
			$_SESSION['admin_logged'] = true;
			echo true;	
		}
		else {
			echo false;	
		}
	}
	
	if (isset($_GET['authenticate'])) {
		if (isset($_SESSION['admin_logged'])) {
			echo true;	
		}
		else {
			echo false;	
		}
	}
	
	if (isset($_GET['logout']) && $_GET['logout'] == true) {
		if (isset($_SESSION['admin_logged'])) {
			unset($_SESSION['admin_logged']);
			echo true;	
		}
		else {
			echo false;	
		}
	}
?>