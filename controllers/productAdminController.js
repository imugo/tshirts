angular.module("tShirtsAdmin")
.constant("prAUrl", "http://localhost/tshirts/model/productAdmin.php")
.component("productAdmin", {
	templateUrl: '/tshirts/views/productAdmin.html',
	controller: function($http, $scope, $stateParams, prAUrl) {
	 
	$scope.listProducts = function() {
		$http({
			method: "GET",
			url: prAUrl,
			params: {"GetCategoryProducts": $stateParams.cat},
			cache: false
		}).then(function(response) {
			$scope.products = response.data;
			$scope.categoryId = $stateParams.cat;
			console.log($scope.categoryId);
		});
	};
			
		$scope.addProduct = function(product) {
			$http({
			method: "POST",
			url: prAUrl,
			data: $.param({'AddProductToCategory': {category_id: $stateParams.cat, productName: product.name, productDescription: product.description, productPrice: product.price}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				$scope.products.push(response.data);
				$scope.editedProduct = null;
				if (!response.data) {
					$scope.products.error = "An Error occurred";	
				}
			});
		};
		
	$scope.listProducts();
}
});