<?php
		// Include utility files
		require_once 'config.php';
		
		// Load database handler
		require_once 'database_handler.php';
		
		// Load the catalog class
		require_once 'catalog.php';

	if (isset($_GET['GetDepartmentsWithDescriptions'])) {
		
		$departments = Catalog::GetDepartmentsWithDescriptions();
		$result = json_encode($departments);
		echo $result;
	}
	
	if (isset($_POST['AddDepartment'])) {
		$data = $_POST['AddDepartment'];
		$name = (string)$data['name'];
		$description = (string)$data['description'];
		$department = Catalog::AddDepartment($name, $description);
		$result = json_encode($department);
		echo $result;
	}
	
	if (isset($_POST['UpdateDepartment'])) {
		$data = $_POST['UpdateDepartment'];
		$id = (int)$data['id'];
		$name = (string)$data['name'];
		$description = (string)$data['description'];
		Catalog::UpdateDepartment($id, $name, $description);
	}	
	
	if (isset($_POST['DeleteDepartment'])) {
		$data = $_POST['DeleteDepartment'];
		$id = (int)$data['id'];
		$deleted_department = Catalog::DeleteDepartment($id);
		echo $deleted_department;
	}
		
		// Close the database connection
		DatabaseHandler::Close();
?>