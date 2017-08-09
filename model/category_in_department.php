<?php

	if (isset($_GET['GetCategoriesInDepartment'])) {
	
	$department = (int)$_GET['GetCategoriesInDepartment'];
			
	// Include utility files
	require_once 'config.php';
	
	// Load database handler
	require_once 'database_handler.php';
	
	// Load the catalog class
	require_once 'catalog.php';
	
	$category_details = Catalog::GetCategoriesInDepartment($department);
	$result = json_encode($category_details);
	echo $result;
	
	// Close the database connection
	DatabaseHandler::Close();
	
	}
?>