angular.module("tShirts")
.constant("productListActiveClass", "active")
.constant("productListPageCount", 3)
.controller("productListCtrl", function($scope, $filter, productListActiveClass, productListPageCount) {
	var selectedCategory = null;
	
	$scope.selectedPage = 1;
	$scope.pageSize = productListPageCount;
	
	$scope.selectCategory = function(newCategory) {
		selectedCategory = newCategory;
		$scope.selectedPage = 1;
	};
	
	$scope.selectPage = function(newPage) {
		if ((newPage >= 1)) {
			$scope.selectedPage = newPage;
		}
		else {
			$scope.selectedPage = 1;	
		}
	};
	
	$scope.categoryFilterFn = function(product) {
		return selectedCategory == null || product.category == selectedCategory;
	};
	
	$scope.getCategoryClass = function(category) {
		return selectedCategory == category ? productListActiveClass : "";
	};
	
	$scope.getPageClass = function(page) {
		
		return $scope.selectedPage == page ? productListActiveClass : "";
	};
	
	$scope.closeSideBar = function() {
		if ($(window).width() < 992) {
			$('.button-collapse').sideNav("hide");
		}
	};
});