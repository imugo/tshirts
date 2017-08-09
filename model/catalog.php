<?php
	class Catalog {
		
		// Retrieves all departments
		public static function GetDepartments() {
			// Build SQL Query
			$sql = 'CALL catalog_get_departments_list()';
			
			// Execute the query and return the result
			return DatabaseHandler::GetAll($sql);
		}	
		
		// Retrieves complete details for the specified department
		public static function GetDepartmentDetails($departmentId) {
			// Build SQL Query
			$sql = 'CALL catalog_get_department_details(:departmentId)';
			
			// Build the parameters query
			$params = array(':departmentId'=>$departmentId);
			
			// Execute the query and return the results
			return DatabaseHandler::GetRow($sql, $params);	
		}
		
		// Retrieves list of categories that belong to a department
		public static function GetCategoriesInDepartment($departmentId) {
			// Build sql query	
			$sql = 'CALL catalog_get_categories_list(:departmentId)';
			
			// Build the parameters query
			$params = array(':departmentId'=>$departmentId);
			
			// Execute the query and return the results
			return DatabaseHandler::GetAll($sql, $params);
		}
		
		// Retrieve complete details for the specified category
		public static function GetCategoryDetails($categoryId) {
			// Build sql query
			$sql = 'CALL catalog_get_category_details(:categoryId)';
			
			// Build the parameters query
			$params = array(':categoryId'=>$categoryId);
			
			// Execute the query and return the results
			return DatabaseHandler::GetRow($sql, $params);	
		}
		
			// Retrieves the list of products for the department page
		public static function GetProductsOnDepartment($departmentId) {
			// Retrieve the list of products
			$sql = 'CALL catalog_get_products_on_department(:department_id)';
			
			// Build the parameters array
			$params = array(':department_id' => $departmentId);
			
			// Execute the query and return the results
			return DatabaseHandler::GetAll($sql, $params);
		
		}
		
		// Retrieves the list of products for the department page
		public static function GetProductsInCategory($categoryId) {
			// Retrieve the list of products
			$sql = 'CALL catalog_get_products_in_category(:category_id)';
			
			// Build the parameters array
			$params = array(':category_id' => $categoryId);
			
			// Execute the query and return the results
			return DatabaseHandler::GetAll($sql, $params);
		
		}
		
		// Retrieves the list of products for the catalog page
		public static function GetProductsOnCatalog() {
			// Retrieve the list of products
			$sql = 'CALL catalog_get_products_on_catalog()';
			
			// Execute the query and return the results
			return DatabaseHandler::GetAll($sql);
	
		}
		
		// Retrieve complete product details
		public static function GetProductDetails($productId) {
			// Build sql query
			$sql = 'CALL catalog_get_product_details(:productId)';
			
			// Build the parameters query
			$params = array(':productId'=>$productId);
			
			// Execute the query and return the results
			return DatabaseHandler::GetRow($sql, $params);	
		}
		// Retrieve product locations
		public static function GetProductLocations($productId) {
			// Build sql query
			$sql = 'CALL catalog_get_product_locations(:productId)';
			
			// Build the parameters query
			$params = array(':productId'=>$productId);
			
			// Execute the query and return the results
			return DatabaseHandler::GetAll($sql, $params);	
		}
	
		// Retrieves product attributes
		public static function GetProductAttributes($productId) {
			// Build Sql query
			$sql = 'CALL catalog_get_product_attributes(:product_id)';
			
			// Build parameters
			$params = array(':product_id'=>$productId);
			
			// Execute the query and return the results
			return DatabaseHandler::GetAll($sql, $params);	
		}
		
		// Create new order
		public static function CreateNewOrder($name, $street, $city, $state, $country, $giftwrap, $products) {
			// Build sql query
			$sql = 'CALL new_orders_create_orders(:name, :street, :city, :state, :country, :giftwrap, :products)';
			
			// Build parameters
			$params = array(':name'=>$name, ':street'=>$street, ':city'=>$city, ':state'=>$state, ':country'=>$country,
					':giftwrap'=>$giftwrap, ':products'=>$products);
					
			return DatabaseHandler::GetRow($sql, $params);	
		}
		
		// Retrieves all departments with their descriptions
		public static function GetDepartmentsWithDescriptions() {
			// Build the SQL query
			$sql = 'CALL catalog_get_departments()';
			
			// Execute the query and return the results
			return DatabaseHandler::GetAll($sql);
		}

		// Add a department
		public static function AddDepartment($departmentName, $departmentDescription) {
			// Build the SQL query
			$sql = 'CALL catalog_add_department(:department_name, :department_description)';
			
			// Build the parameters array
			$params = array (':department_name' => $departmentName, ':department_description' => $departmentDescription);
			
			// Execute the query
			return DatabaseHandler::GetRow($sql, $params);
		}
			
			// Updates department details
			public static function UpdateDepartment($departmentId, $departmentName, $departmentDescription) {
				// Build the SQL query
				$sql = 'CALL catalog_update_department(:department_id, :department_name, :department_description)';
				
				// Build the parameters array
				$params = array (':department_id' => $departmentId, ':department_name' => $departmentName, ':department_description' => $departmentDescription);
				
				// Execute the query
				DatabaseHandler::Execute($sql, $params);
			}
			// Deletes a department
		public static function DeleteDepartment($departmentId){
			// Build the SQL query
			$sql = 'CALL catalog_delete_department(:department_id)';
			
			// Build the parameters array
			$params = array (':department_id' => $departmentId);
			
			// Execute the query and return the results
			return DatabaseHandler::GetOne($sql, $params);
		}
		
		// Get categories in a department
		public static function GetDepartmentCategories($departmentId) {
				// Build sql query
			$sql = 'CALL catalog_get_department_categories(:department_id)';
	
			// Build the parameters
			$params = array(':department_id'=>$departmentId);
	
			// Execute the query and return the results
			return DatabaseHandler::GetAll($sql, $params);
		}
	
		// Add a category
		public static function AddCategory($departmentId, $categoryName, $categoryDescription) {
			// Build sql query
			$sql = 'CALL catalog_add_category(:department_id, :category_name, :category_description)';
	
			// Build the parameters
			$params = array(':department_id'=>$departmentId, ':category_name'=>$categoryName, ':category_description'=>$categoryDescription);
	
			// Execute the query
			return DatabaseHandler::GetRow($sql,$params);
		}
	
		// Update the category details
		public static function UpdateCategory($categoryId, $categoryName, $categoryDescription) {
			// Build the sql query
			$sql = 'CALL catalog_update_category(:category_id, :category_name, :category_description)';
	
			// Build the parameters
			$params = array(':category_id'=>$categoryId, ':category_name'=>$categoryName, ':category_description'=>$categoryDescription);
	
			// Execute the query
			DatabaseHandler::Execute($sql,$params);
		}
	
		// Delete the category details
		public static function DeleteCategory($categoryId) {
			// Build the sql query
			$sql = 'CALL catalog_delete_category(:category_id)';
	
			// Build the parameters
			$params = array(':category_id'=>$categoryId);
	
			// Execute the query and return the results
			return DatabaseHandler::GetOne($sql,$params);
		}	
		
		// Retrieves all attributes
		public static function GetAttributes() {
			// Build sql query
			$sql = 'CALL catalog_get_attributes()';
	
			// Execute the query and return the results
			return DatabaseHandler::GetAll($sql);
		}
	
		// Add an attribute
		public static function AddAttribute($attributeName) {
			// Build the query
			$sql = 'CALL catalog_add_attribute(:attribute_name)';
	
			// Build the parameters array
			$params = array(':attribute_name'=>$attributeName);
	
			// Execute the query
			return DatabaseHandler::GetRow($sql, $params);
		}
	
		// Update attribute name
		public static function UpdateAttribute($attributeId, $attributeName) {
			// Build the SQL query
			$sql = 'CALL catalog_update_attribute(:attribute_id, :attribute_name)';
	
			// Build the parameters array
			$params = array(':attribute_id' => $attributeId, ':attribute_name' => $attributeName);
	
			// Execute the query
			DatabaseHandler::Execute($sql, $params);
		}
	
		// Deletes an attribute
		public static function DeleteAttribute($attributeId) {
			// Build the sql query
			$sql = 'CALL catalog_delete_attribute(:attribute_id)';
	
			// Build the parameters
			$params = array(':attribute_id'=>$attributeId);
	
			// Execute the query and return the results
			return DatabaseHandler::GetOne($sql,$params);
		}	
		
		// Retrieves details for the specified attribute
	public static function GetAttributeDetails($attributeId) {
		// Build the sql query
		$sql = 'CALL catalog_get_attribute_details(:attribute_id)';

		// Build the parameters
		$params = array(':attribute_id'=>$attributeId);

		// Execute the query and return the results
		return DatabaseHandler::GetRow($sql,$params);
	}

	// Retrieves attribute values
	public static function GetAttributeValues($attributeId) {
	    // Build sql query
	    $sql = 'CALL catalog_get_attribute_values(:attribute_id)';

	    // Build the parameters
	    $params = array(':attribute_id'=>$attributeId);

	    // Execute the query and return the results
	    return DatabaseHandler::GetAll($sql, $params);
	}

	// Adds an attribute value
	public static function AddAttributeValue($attributeId, $attributeValue) {
	    // Build the query
	    $sql = 'CALL catalog_add_attribute_value(:attribute_id, :value)';

	    // Build the parameters array
	    $params = array(':attribute_id'=>$attributeId, ':value'=>$attributeValue);

	    // Execute the query
	    return DatabaseHandler::GetRow($sql, $params);
	}

	// Updates an attribute value
	public static function UpdateAttributeValue($attributeId, $attributeValue) {
	    // Build the query
	    $sql = 'CALL catalog_update_attribute_value(:attribute_id, :value)';

	    // Build the parameters array
	    $params = array(':attribute_id'=>$attributeId, ':value'=>$attributeValue);

	    // Execute the query
	    DatabaseHandler::Execute($sql, $params);
	}

	// Deletes an attribute
	public static function DeleteAttributeValue($attributeValueId) {
		// Build the sql query
		$sql = 'CALL catalog_delete_attribute_value(:attribute_value_id)';

		// Build the parameters
		$params = array(':attribute_value_id'=>$attributeValueId);

		// Execute the query and return the results
		return DatabaseHandler::GetOne($sql,$params);
	}	
	
	// Get products in category
	public static function GetCategoryProducts($categoryId) {
		// Build the SQL Query
		$sql = 'CALL catalog_get_category_products(:category_id)';
		
		// Build the parameters
		$params = array(':category_id'=>$categoryId);
		
		// Execute the query and return the results
		return DatabaseHandler::GetAll($sql,$params);
	}
	
	// Add products to category
	public static function AddProductToCategory($categoryId, $productName, $productDescription, $productPrice) {
		// Build the SQL Query
		$sql = 'CALL catalog_add_product_to_category(:category_id, :product_name, :product_description, :product_price)';
		
		// Build the parameters
		$params = array(':category_id'=>$categoryId, ':product_name'=>$productName, ':product_description'=>$productDescription,
					':product_price'=>$productPrice);
					
		// Execute the query
		return DatabaseHandler::GetRow($sql, $params);
	}
	
	// Updates a product
	public static function UpdateProduct($productId, $productName, $productDescription, $productPrice, $productDiscountedPrice) {
		// Build the SQL query
		$sql = 'CALL catalog_update_product(:product_id, :product_name, :product_description, :product_price, :product_discounted_price)';
		
		// Build the parameters array
		$params = array (':product_id' => $productId, ':product_name' => $productName, ':product_description' => $productDescription, ':product_price' => $productPrice,
			':product_discounted_price' => $productDiscountedPrice);

		// Execute the query
		DatabaseHandler::Execute($sql, $params);
	}
	
	// Removes a product from the product catalog
	public static function DeleteProduct($productId) {
	
		// Build SQL query
		$sql = 'CALL catalog_delete_product(:product_id)';
		
		// Build the parameters array
		$params = array (':product_id' => $productId);
		
		// Execute the query
		DatabaseHandler::Execute($sql, $params);
	}

	// Unassigns a product from a category
	public static function RemoveProductFromCategory($productId, $categoryId) {

		// Build SQL query
		$sql = 'CALL catalog_remove_product_from_category(:product_id, :category_id)';
		
		// Build the parameters array
		$params = array (':product_id' => $productId, ':category_id' => $categoryId);
		
		// Execute the query and return the results
		return DatabaseHandler::GetOne($sql, $params);
	}
	
	// Retrieves the list of categories a product belongs to
	public static function GetCategories() {
	
		// Build SQL query
		$sql = 'CALL catalog_get_categories()';
	
		// Execute the query and return the results
		return DatabaseHandler::GetAll($sql);
	}
	
	// Retrieves product info
	public static function GetProductInfo($productId) {
	
		// Build SQL query
		$sql = 'CALL catalog_get_product_info(:product_id)';
	
		// Build the parameters array
		$params = array (':product_id' => $productId);
	
		// Execute the query and return the results
		return DatabaseHandler::GetRow($sql, $params);
	}
	
	// Retrieves the list of categories a product belongs to
	public static function GetCategoriesForProduct($productId) {
		// Build SQL query
		$sql = 'CALL catalog_get_categories_for_product(:product_id)';
		
		// Build the parameters array
		$params = array(':product_id'=>$productId);
		
		return DatabaseHandler::GetAll($sql, $params);
	}
	
	// Assigns a product to a category
	public static function SetProductDisplayOption($productId, $display) {
		// Build the sql query
		$sql = 'CALL catalog_set_product_display_option(:product_id, :display)';
		
		// Build the params
		$params = array(':product_id'=>$productId, ':display'=>$display);
		
		DatabaseHandler::Execute($sql, $params);
	}
	
	// Defines product display options
	public static $mProductDisplayOptions = array ('Default', // 0
												'On Catalog', // 1
												'On Department', // 2
												'On Both'); // 3
	
	// Assigns a product to a category
	public static function AssignProductToCategory($productId, $categoryId) {
		// Build the sql query
		$sql = 'CALL catalog_assign_product_to_category(:product_id, :category_id)';
		
		// Build the parameters
		$params = array(':product_id'=>$productId, ':category_id'=>$categoryId);
		
		DatabaseHandler::Execute($sql, $params);
	}
	
	// Moves a product from one category to another
	public static function MoveProductToCategory($productId, $sourceCategoryId, $targetCategoryId) {
		// Build the sql query
		$sql = 'CALL catalog_move_product_to_category(:product_id, :source_category_id, :target_category_id)';
		
		// Build the params
		$params = array(':product_id'=>$productId, ':source_category_id'=>$sourceCategoryId, ':target_category_id'=>$targetCategoryId);
		
		DatabaseHandler::Execute($sql, $params);
	}
	
	// Gets the attributes not assigned to the particular product
	public static function GetAttributesNotAssignedToProduct($productId) {
		// Build the sql query
		$sql = 'CALL catalog_get_attributes_not_assigned_to_product(:product_id)';
		
		// Build the params
		$params = array(':product_id'=>$productId);
		
		return DatabaseHandler::GetAll($sql, $params);
	}
	
	// Assign an attribute value to the specified product
	public static function AssignAttributeValueToProduct($productId, $attributeValueId) {
		// Build the sql query
		$sql = 'CALL catalog_assign_attribute_value_to_product(:product_id, :attribute_value_id)';
		
		// Build the params
		$params = array(':product_id'=>$productId, ':attribute_value_id'=>$attributeValueId);
		
		DatabaseHandler::Execute($sql, $params);
	}
	
	// Remove a product attribute value
	public static function RemoveProductAttributeValue($productId, $attributeValueId) {
		// Build the sql query
		$sql = 'CALL catalog_remove_product_attribute_value(:product_id, :attribute_value_id)';
		
		// Build the params
		$params = array(':product_id'=>$productId, ':attribute_value_id'=>$attributeValueId);
		
		DatabaseHandler::Execute($sql, $params);
	}
	
	// Changes the name of the product image file in the database
	public static function SetImage($productId, $imageName) {
		// Build the sql query
		$sql = 'CALL catalog_set_image(:product_id, :image_name)';
		
		// Build the params
		$params = array(':product_id'=>$productId, ':image_name'=>$imageName);
		
		DatabaseHandler::Execute($sql, $params);
	}
	
	// Changes the name of the second product image file in the database
	public static function SetImage2($productId, $imageName) {
		// Build the sql query
		$sql = 'CALL catalog_set_image_2(:product_id, :image_name)';
		
		// Build the params
		$params = array(':product_id'=>$productId, ':image_name'=>$imageName);
		
		DatabaseHandler::Execute($sql, $params);
	}
	
	// Changes the name of the product thumbnail file in the database
	public static function SetThumbnail($productId, $imageName) {
		// Build the sql query
		$sql = 'CALL catalog_set_thumbnail(:product_id, :image_name)';
		
		// Build the params
		$params = array(':product_id'=>$productId, ':image_name'=>$imageName);
		
		DatabaseHandler::Execute($sql, $params);
	}
	
	// Gets the reviews for a specific product
	public static function GetProductReviews($productId) {
		// Build the SQL query
		$sql = 'CALL catalog_get_product_reviews(:product_id)';

		// Build the parameters array
		$params = array (':product_id' => $productId);

		// Execute the query and return the results
		return DatabaseHandler::GetAll($sql, $params);
	}

	// Creates a product review
	public static function CreateProductReview($customer_name, $productId, $review, $rating) {

		// Build the SQL query
		$sql ='CALL catalog_create_product_review(:customer_name, :product_id, :review, :rating)';

		// Build the parameters array
		$params = array (':customer_name' => $customer_name, ':product_id' => $productId, ':review' => $review, ':rating' => $rating);

		// Execute the query
		return DatabaseHandler::GetRow($sql, $params);
	}
	}
?>