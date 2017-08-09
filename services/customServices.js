angular.module("customServices", [])
.factory("getProductsService", function($http) {
	var getProductsUrl = "http://localhost/tshirts/model/products_on_category.php?GetProductsInCategory=";
	
	return {
		getProducts: function(id) {
				var result;
				$http({
					method: "GET",
					url: getProductsUrl + id,
					cache: false
					}).then(function (response) {
							result = response.data;
							
					}, 
					function (error) {
							return error;
				});
				console.log(result);
				return result;
				
		}
	};
});