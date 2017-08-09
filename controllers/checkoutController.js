angular.module("tShirts")
.controller("cartSummaryController", function($scope, cart, $location, $route, $routeParams) {
	$scope.$on("$routeChangeSuccess", function () {
		if ($location.path().match(/checkout/)) {
			$('title').text('Checkout' + ' - tshirts');
		}
	});
	$scope.cartData = cart.getProducts();
	$scope.total = function () {
		var total = 0;
		for (var i = 0; i < $scope.cartData.length; i++) {
			total += ($scope.cartData[i].price * $scope.cartData[i].count);
		}
		return total;
	};
	
	$scope.remove = function (id) {
		cart.removeProduct(id);
	};
	
	$scope.go_back = function() {
		window.history.back();	
	};
});