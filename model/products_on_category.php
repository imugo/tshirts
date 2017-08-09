<?php

	if (isset($_GET['GetProductsInCategory'])) {
	
		$category_id = (int)$_GET['GetProductsInCategory'];
				
		// Include utility files
		require_once 'config.php';
		
		// Load database handler
		require_once 'database_handler.php';
		
		// Load the catalog class
		require_once 'catalog.php';
		
		$products = Catalog::GetProductsInCategory($category_id);
		$result = json_encode($products);
		echo $result;
		
		
		// Close the database connection
		DatabaseHandler::Close();
	
	}
?>