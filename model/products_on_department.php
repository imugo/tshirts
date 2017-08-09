<?php

	if (isset($_GET['GetProductsOnDepartment'])) {
	
		$product_id = (int)$_GET['GetProductsOnDepartment'];
				
		// Include utility files
		require_once 'config.php';
		
		// Load database handler
		require_once 'database_handler.php';
		
		// Load the catalog class
		require_once 'catalog.php';
		
		$products = Catalog::GetProductsOnDepartment($product_id);
		$result = json_encode($products);
		echo $result;
		
		
		// Close the database connection
		DatabaseHandler::Close();
	
	}
?>