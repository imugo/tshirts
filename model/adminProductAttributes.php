<?php
		// Include utility files
		require_once 'config.php';
		
		// Load database handler
		require_once 'database_handler.php';
		
		// Load the catalog class
		require_once 'catalog.php';

	if (isset($_GET['GetAttributes'])) {
		$attributes = Catalog::GetAttributes();
		$result = json_encode($attributes);
		echo $result;
	}
	
	if (isset($_POST['AddAttribute'])) {
		$data = $_POST['AddAttribute'];
		$name = (string)$data['attribute_name'];
		$attribute = Catalog::AddAttribute($name);
		$result = json_encode($attribute);
		echo $result;
	}
	
	if (isset($_POST['UpdateAttribute'])) {
		$data = $_POST[' UpdateAttribute'];
		$id = (int)$data['attribute_id'];
		$name = (string)$data['attribute_name'];
		Catalog:: UpdateAttribute($id, $name);
	}	
	
	if (isset($_POST['DeleteAttribute'])) {
		$data = $_POST['DeleteAttribute'];
		$id = (int)$data['attribute_id'];
		$deleted_attribute = Catalog::DeleteAttribute($id);
		echo $deleted_attribute;
	}
	
	if (isset($_GET['GetAttributeValues'])) {
		$id = (int)$_GET['GetAttributeValues'];
		$attributes = Catalog::GetAttributeValues($id);
		$result = json_encode($attributes);
		echo $result;
	}
	
	if (isset($_POST['AddAttributeValue'])) {
		$data = $_POST['AddAttributeValue'];
		$id = (int)$data['attribute_id'];
		$value = (string)$data['attribute_value'];
		$attribute = Catalog::AddAttributeValue($id, $value);
		$result = json_encode($attribute);
		echo $result;
	}
	
	if (isset($_POST['UpdateAttributeValue'])) {
		$data = $_POST['UpdateAttributeValue'];
		$id = (int)$data['attribute_id'];
		$value = (string)$data['attribute_value'];
		Catalog::UpdateAttributeValue($id, $value);
	}
	
	if (isset($_POST['DeleteAttributeValue'])) {
		$data = $_POST['DeleteAttributeValue'];
		$id = (int)$data['attribute_value_id'];
		$deleted_attribute = Catalog:: DeleteAttributeValue($id);
		echo $deleted_attribute;
	}
		// Close the database connection
		DatabaseHandler::Close();
?>