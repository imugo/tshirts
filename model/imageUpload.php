<?php
		// Include utility files
		require_once 'config.php';
		
		// Load database handler
		require_once 'database_handler.php';
		
		// Load the catalog class
		require_once 'catalog.php';
		
		// If the error code is 0, the file was uploaded ok
		if (isset($_POST['image'])) {
			$id = (int)$_POST['id'];
		/* Use the move_uploaded_file PHP function to move the file
		from its temporary location to the product_images folder */
		move_uploaded_file($_FILES['file']['tmp_name'], SITE_ROOT . '/product_images/' . $_FILES['file']['name']);
		// Update the product's information in the database
		Catalog::SetImage($id, $_FILES['file']['name']);
		}
		
		if (isset($_POST['image2'])) {
			$id = (int)$_POST['id'];
			move_uploaded_file($_FILES['file']['tmp_name'], SITE_ROOT . '/product_images/' . $_FILES['file']['name']);
			
			Catalog::SetImage2($id, $_FILES['file']['name']);
			echo 'success';
		}
		// Close the database connection
		DatabaseHandler::Close();
?>