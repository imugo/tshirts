<?php
		// Include utility files
		require_once 'config.php';
		
		// Load database handler
		require_once 'database_handler.php';
		
		// Load the catalog class
		require_once 'catalog.php';

	if (isset($_POST['UpdateProduct'])) {
		$data = $_POST['UpdateProduct']; 
		$id = (int)$data['id'];
		$name = (string)$data['name'];
		$description = (string)$data['description'];
		$price = (float)$data['price'];
		$discounted_price = (float)$data['discounted_price'];
		Catalog::UpdateProduct($id, $name, $description, $price, $discounted_price);
	}
	
	if (isset($_POST['DeleteProduct'])) {
		$data = $_POST['DeleteProduct'];
		$id = (int)$data['id'];
		Catalog::DeleteProduct($id);
	}
	
	// categories belonging to product
	if (isset($_GET['CategoriesToRemove'])) {
		$id = (int)$_GET['CategoriesToRemove'];
		$product_categories = Catalog::GetCategoriesForProduct($id);
		
		// Show the categories the product belongs to
		for ($i = 0; $i < count($product_categories); $i++) {
			$temp1[$product_categories[$i]['category_id']] = $product_categories[$i]['name'];
		}
		
		$result = json_encode($temp1);
		echo $result;
	}
	
	if (isset($_POST['RemoveProductFromCategory'])) {
		$data = $_POST['RemoveProductFromCategory'];
		$productId = (int)$data['product_id'];
		$categoryId = (int)$data['category_id'];
		$result = Catalog::RemoveProductFromCategory($productId, $categoryId);
		echo $result;
	}
	
	if (isset($_GET['AssignOrMove'])) {
		$id = (int)$_GET['AssignOrMove'];
		$product_categories = Catalog::GetCategoriesForProduct($id);
		$all_categories = Catalog::GetCategories();
		// Show the categories the product belongs to
		for ($i = 0; $i < count($product_categories); $i++) {
			$temp1[$product_categories[$i]['category_id']] = $product_categories[$i]['name'];
		}
	
		// all categories
		for ($i = 0; $i < count($all_categories); $i++) {
			$temp2[$all_categories[$i]['category_id']] = $all_categories[$i]['name'];
		}
		
		$result = array_diff($temp2, $temp1);
		$result = json_encode($result);
		echo $result;
	}
	
	if (isset($_GET['GetProductInfo'])) {
		$id = (int)$_GET['GetProductInfo'];
		$result = Catalog::GetProductInfo($id);
		$result = json_encode($result);
		echo $result;
	}

	if (isset($_GET['GetCategoriesForProduct'])) {
		$id = (int)$_GET['GetCategoriesForProduct'];
		$product_categories = Catalog::GetCategoriesForProduct($id);
		// Show the categories the product belongs to
		for ($i = 0; $i < count($product_categories); $i++) {
			$temp1[$product_categories[$i]['category_id']] = $product_categories[$i]['name'];
		}
		$result = implode(', ', $temp1);
		echo $result;
	}
	
	if (isset($_GET['RemoveFromCat'])) {
		$id = (int)$_GET['RemoveFromCat'];
		$product_categories = Catalog::GetCategoriesForProduct($id);
		// Show the categories the product belongs to
		for ($i = 0; $i < count($product_categories); $i++) {
			$temp1[$product_categories[$i]['category_id']] = $product_categories[$i]['name'];
		}
		$result = json_encode($temp1);
		echo $result;
	}

	if (isset($_POST['SetProductDisplayOption'])) {
		$data = $_POST['SetProductDisplayOption']; 
		$id = (int)$data['productId'];
		$display = (int)$data['display'];
		Catalog::SetProductDisplayOption($id, $display);
	}

	if (isset($_POST['AssignProductToCategory'])) {
		$data = $_POST['AssignProductToCategory']; 
		$productId = (int)$data['productId'];
		$categoryId = (int)$data['categoryId'];
		Catalog::AssignProductToCategory($productId, $categoryId);
	}

	if (isset($_POST['MoveProductToCategory'])) {
		$data = $_POST['MoveProductToCategory']; 
		$productId = (int)$data['productId'];
		$sourceCategoryId = (int)$data['sourceCategoryId'];
		$targetCategoryId = (int)$data['targetCategoryId'];
		Catalog::MoveProductToCategory($productId, $sourceCategoryId, $targetCategoryId);
	}

	if (isset($_GET['GetProductAttributes'])) {
		$id = (int)$_GET['GetProductAttributes'];
		$product_attributes = Catalog::GetProductAttributes($id);
		
		for ($i = 0; $i < count($product_attributes); $i++) {
			$result[$product_attributes[$i]['attribute_value_id']] = $product_attributes[$i]['attribute_name'] . ': ' .
$product_attributes[$i]['attribute_value'];
		}
		
		$result = json_encode($result);
		echo $result;
	}

	if (isset($_GET['GetAttributesNotAssignedToProduct'])) {
		$id = (int)$_GET['GetAttributesNotAssignedToProduct'];
		$catalog_attributes = Catalog::GetAttributesNotAssignedToProduct($id);
		
		if (!empty($catalog_attributes)) {
			for ($i = 0; $i < count($catalog_attributes); $i++) {
				$result[$catalog_attributes[$i]['attribute_value_id']] = $catalog_attributes[$i]['attribute_name'] . ': ' .$catalog_attributes[$i]['attribute_value'];
			}
			
			$result = json_encode($result);
			echo $result;
		}
		else {
			echo '';	
		}
	}
	
	if (isset($_POST['AssignAttributeValueToProduct'])) {
		$data = $_POST['AssignAttributeValueToProduct']; 
		$productId = (int)$data['productId'];
		$attributeValueId = (int)$data['attributeValueId'];
		Catalog::AssignAttributeValueToProduct($productId, $attributeValueId);
	}

	if (isset($_POST['RemoveProductAttributeValue'])) {
		$data = $_POST['RemoveProductAttributeValue']; 
		$productId = (int)$data['productId'];
		$attributeValueId = (int)$data['attributeValueId'];
		Catalog::RemoveProductAttributeValue($productId, $attributeValueId);
	}
	
	if (isset($_POST['SetImage'])) {
		$data = $_POST['SetImage']; 
		$productId = (int)$data['productId'];
		$imageName = $data['imageUpload'];
		
		if (!is_writeable(SITE_ROOT . '/product_images/')) {
			echo "Can't write to the product_images folder";
			exit();
		}
		
		if ($_FILES['ImageUpload']['error'] == 0) {
			move_uploaded_file($_FILES['ImageUpload']['tmp_name'], SITE_ROOT . '/product_images/' . $_FILES['ImageUpload']['name']);
			// Update the product's information in the database
			Catalog::SetImage($productId, $_FILES['ImageUpload']['name']);
		}
	}

	if (isset($_POST['SetImage2'])) {
		$data = $_POST['SetImage2']; 
		$productId = (int)$data['productId'];
		$imageName = (string)$data['imageName'];
		Catalog::SetImage2($productId, $imageName);
	}
	
	if (isset($_POST['SetThumbnail'])) {
		$data = $_POST['SetThumbnail']; 
		$productId = (int)$data['productId'];
		$imageName = (string)$data['imageName'];
		Catalog::SetThumbnail($productId, $imageName);
	}
	
	if (isset($_GET['ProductDisplayOptions'])) {
		echo json_encode(Catalog::$mProductDisplayOptions);
	}
	
			
		// Close the database connection
		DatabaseHandler::Close();
?>