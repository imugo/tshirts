angular.module("tShirts")
	.constant("departmentListUrl", "http://localhost/tshirts/model/department_list.php?GetDepartmentList")
	.constant("orderUrl", "http://localhost/tshirts/model/create_new_order.php")
	.controller("tShirtCtrl", function($scope, $http, $location, departmentListUrl, cart, orderUrl, $location, $route, $routeParams) {
		$scope.$on("$routeChangeSuccess", function () {
			if ($location.path().match(/placeorder/)) {
				$('title').text('Placeorder' + ' - tshirts');
			}
		});
		$scope.$on("$routeChangeSuccess", function () {
			if ($location.path().match(/complete/)) {
				$('title').text('Thank You!' + ' - tshirts');
			}
		});
		$scope.data = {};
		
		$http({
			method: "GET",
			url: departmentListUrl
		}).then(function (response) {
					$scope.data.departmentList = response.data;
					
		}, function (error) {
				$scope.data.error = error;
		});
		
		$scope.addProductToCart = function(product, color, size) {
			cart.addProduct(product.product_id, product.name, product.price, color.attribute_value, size.attribute_value);
			Materialize.toast('Added ' + product.name + ' to cart!', 4000);
			$('html, body').animate({
				scrollTop: $('body').offset().top
			}, 500);
		};
		
		$scope.sendOrder = function(shippingDetails) {
			
			var order = angular.copy(shippingDetails);
			order.products = cart.getProducts();
			$http({
				method: "POST",
				url: orderUrl,
				data: $.param({'data': order}),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				}
				}).then(function (response) {
							$scope.data.orderId = response.data.id;
							cart.getProducts().length = 0;
							
				}, function (error) {
						$scope.data.orderError = error;
			}).then(function () {
				$location.path("/complete");
			});
		};
		
});