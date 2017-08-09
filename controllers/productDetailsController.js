angular.module("tShirts")
.constant("producttDetailsUrl", "http://localhost/tshirts/model/product_details.php")
.constant("productsAttributesUrl", "http://localhost/tshirts/model/product_attributes.php")
.constant("productsReviewsUrl", "http://localhost/tshirts/model/product_reviews.php")
.controller("productDetailsCtrl", function($scope, $http, $location, $route, $routeParams, producttDetailsUrl, ngProgressFactory, productsAttributesUrl, productsReviewsUrl, $timeout) {
	
	$scope.progressbar = ngProgressFactory.createInstance();
	
	$scope.progressbar.start();
	
	$scope.productsData = {};
	
	$scope.$on("$routeChangeSuccess", function () {
		if ($location.path().indexOf("/details/") == 0) {
			 $scope.productsData.id = $routeParams["id"];
	
		$http({
			method: "GET",
			url: producttDetailsUrl,
			params: {"GetProductDetails":$routeParams["id"]},
		}).then(function(response) {
				$scope.productsData.products = response.data;
				$('title').text($scope.productsData.products.name + ' - tshirts');
		}, function(error) {
				$scope.productsData.error = error;
		});
		}
	});
	
	// Get product attributes
	$http({
		method: "GET",
		url: productsAttributesUrl,
		params: {"GetProductAttributes":$routeParams["id"]},
	}).then(function(response) {
			$scope.productsData.attributes = response.data;
	}, function(error) {
			$scope.productsData.error = error;
	});
	
	// Continue Shopping
	$scope.go_back = function() {
		window.history.back();	
	};
	
	// Get product reviews
	$scope.getReviews = function() {
		$http({
			method: "GET",
			url: productsReviewsUrl,
			params: {"GetProductReviews":$routeParams["id"]},
		}).then(function(response) {
				$scope.productsData.reviews = response.data;
		}, function(error) {
				$scope.productsData.error = error;
		});
	};
	
	// Create product Reviews $customer_name, $productId, $review, $rating
	$scope.createReview = function(review) {
			$scope.progressbar.start();
			$http({
			method: "POST",
			url: productsReviewsUrl,
			data: $.param({'createReview': {customer_name: review.name, productId: $routeParams["id"], review: review.review, rating: review.star}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				$scope.productsData.reviews.push(response.data);
				$route.reload();
				$scope.progressbar.complete();
			});
			
		};
		
		$timeout(function() {
		$.fn.stars = function() {
			return $(this).each(function() {
				var val = parseFloat($(this).html());
				var size = Math.max(0, (Math.min(5, val))) * 16;
				var $span = $('<span />').width(size);
				$(this).html($span);
			});
		};
		
			$('span.stars').stars();
		}, 0);
	
		
	$scope.getReviews();
	$scope.progressbar.complete();

});