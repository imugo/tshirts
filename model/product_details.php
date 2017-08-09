<?php

	if (isset($_GET['GetProductDetails'])) {
	
		$product_id = (int)$_GET['GetProductDetails'];
				
		// Include utility files
		require_once 'config.php';
		
		// Load database handler
		require_once 'database_handler.php';
		
		// Load the catalog class
		require_once 'catalog.php';
		
		$product = Catalog::GetProductDetails($product_id);
		$result = json_encode($product);
		echo $result;
		
		
		// Close the database connection
		DatabaseHandler::Close();
	
	}
?>