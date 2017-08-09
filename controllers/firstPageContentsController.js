angular.module("tShirts")
.constant("firstPageProductsUrl",  "http://localhost/tshirts/model/products_on_catalog.php?GetProductsOnCatalog")
.controller("firstPageCtrl", function($scope, $http, $location, $route, $routeParams, firstPageProductsUrl, ngProgressFactory) {
	$scope.progressbar = ngProgressFactory.createInstance();
	
	$scope.progressbar.start();
	
	$scope.firstPageData = {};
	$scope.$on("$routeChangeSuccess", function () {
		if ($location.path().match(/index/)) {
			$('title').text('Home' + ' - tshirts');
		}
	});
	$http({
		method: "GET",
		url: firstPageProductsUrl
	}).then(function(response) {
			$scope.firstPageData.products = response.data;
			
	}, function(error) {
			$scope.firstPageData.error = error;
	});
	$scope.progressbar.complete();
});