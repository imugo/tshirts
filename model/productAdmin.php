<?php
		// Include utility files
		require_once 'config.php';
		
		// Load database handler
		require_once 'database_handler.php';
		
		// Load the catalog class
		require_once 'catalog.php';

	if (isset($_GET['GetCategoryProducts'])) {
		$id = (int)$_GET['GetCategoryProducts'];
		$products = Catalog::GetCategoryProducts($id);
		$result = json_encode($products);
		echo $result;
	}
	
	if (isset($_POST['AddProductToCategory'])) {
		$data = $_POST['AddProductToCategory'];
		$id = (int)$data['category_id'];
		$name = (string)$data['productName'];
		$description = (string)$data['productDescription'];
		$price = (float)$data['productPrice'];
		$product = Catalog::AddProductToCategory($id, $name, $description, $price);
		$result = json_encode($product);
		echo $result;
	}
			
		// Close the database connection
		DatabaseHandler::Close();
?>