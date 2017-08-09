<?php

		$name = $street = $city = $state = $country = $giftwrap = $products = '';	
		try {
			if (isset($_POST['data'])) {
				$data = $_POST['data'];	
			}
			
				$name = $data['name'];
				$street = $data['street']; 
				$city = $data['city']; 
				$state = $data['state'];
				$country = $data['country'];
			if (isset($data['giftwrap']) && $data['giftwrap'] == true) {		
				$giftwrap = 1;
			} else {
			    $giftwrap = 0;	
			}
				$products = json_encode($data['products']);
			
			// Include utility files
			require_once 'config.php';
			
			// Load database handler
			require_once 'database_handler.php';
			
			// Load the catalog class
			require_once 'catalog.php';
		
		$order = Catalog::CreateNewOrder($name, $street, $city, $state, $country, $giftwrap, $products);
		$result = json_encode($order);
		echo $result;
		
		
		// Close the database connection
		DatabaseHandler::Close();
	
	}
	catch (Exception $e) {
		echo 'Message: '.$e->getMessage();	
	}

?>