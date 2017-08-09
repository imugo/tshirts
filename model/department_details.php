<?php

	if (isset($_GET['GetDepartmentDetails'])) {
	
	$department = (int)$_GET['GetDepartmentDetails'];
			
	// Include utility files
	require_once 'config.php';
	
	// Load database handler
	require_once 'database_handler.php';
	
	// Load the catalog class
	require_once 'catalog.php';
	
	$department_details = Catalog::GetDepartmentDetails($department);
	$result = json_encode($department_details);
	echo $result;
	
	// Close the database connection
	DatabaseHandler::Close();
	
	}
?>