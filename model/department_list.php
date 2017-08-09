<?php

	if (isset($_GET['GetDepartmentList'])) {
			
	// Include utility files
	require_once 'config.php';
	
	// Load database handler
	require_once 'database_handler.php';
	
	// Load the catalog class
	require_once 'catalog.php';
	
	$department_list = Catalog::GetDepartments();
	$result = json_encode($department_list);
	echo $result;
	
	// Close the database connection
	DatabaseHandler::Close();
	
	}
?>