<?php

	if (isset($_GET['GetProductAttributes'])) {
	
		$attributes = (int)$_GET['GetProductAttributes'];
				
		// Include utility files
		require_once 'config.php';
		
		// Load database handler
		require_once 'database_handler.php';
		
		// Load the catalog class
		require_once 'catalog.php';
		
		$attributes = Catalog::GetProductAttributes($attributes);
		$result = json_encode($attributes);
		echo $result;
		
		
		// Close the database connection
		DatabaseHandler::Close();
	
	}
?>