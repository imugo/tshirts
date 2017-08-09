<?php
		// Include utility files
		require_once 'config.php';
		
		// Load database handler
		require_once 'database_handler.php';
		
		// Load the catalog class
		require_once 'catalog.php';

	if (isset($_GET['GetDepartmentCategories'])) {
		
		$id = (int)$_GET['GetDepartmentCategories'];
		$categories = Catalog::GetDepartmentCategories($id);
		$result = json_encode($categories);
		echo $result;
	}
	
	if (isset($_POST['AddCategory'])) {
		$data = $_POST['AddCategory'];
		$id = (int)$data['department_id'];
		$name = (string)$data['name'];
		$description = (string)$data['description'];
		$category = Catalog::AddCategory($id, $name, $description);
		$result = json_encode($category);
		echo $result;
	}
	
	if (isset($_POST['UpdateCategory'])) {
		$data = $_POST['UpdateCategory'];
		$id = (int)$data['category_id'];
		$name = (string)$data['name'];
		$description = (string)$data['description'];
		Catalog::UpdateCategory($id, $name, $description);
	}	
	
	if (isset($_POST['DeleteCategory'])) {
		$data = $_POST['DeleteCategory'];
		$id = (int)$data['category_id'];
		$deleted_category = Catalog::DeleteCategory($id);
		echo $deleted_category;
	}
		
		// Close the database connection
		DatabaseHandler::Close();
?>