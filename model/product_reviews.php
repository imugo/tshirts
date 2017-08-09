<?php

	// Include utility files
	require_once 'config.php';
	
	// Load database handler
	require_once 'database_handler.php';
	
	// Load the catalog class
	require_once 'catalog.php';

	if (isset($_GET['GetProductReviews'])) {
	
	$product_id = (int)$_GET['GetProductReviews'];
	
	$reviews = Catalog::GetProductReviews($product_id);
	$result = json_encode($reviews);
	echo $result;
	
	}
	if (isset($_POST['createReview'])) {
		$data = $_POST['createReview'];
		$name = (string)$data['customer_name'];
		$id = (int)$data['productId'];
		$review = (string)$data['review'];
		$rating = (float)$data['rating'];
		
		$review = Catalog::CreateProductReview($name, $id, $review, $rating);
		$result = json_encode($review);
		echo $result;
	}
	
	// Close the database connection
	DatabaseHandler::Close();
?>