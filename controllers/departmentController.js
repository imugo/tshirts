angular.module("tShirts")
.constant("departmentDetailsUrl", "http://localhost/tshirts/model/department_details.php")
.constant("categoriesInDepartmentUrl", "http://localhost/tshirts/model/category_in_department.php")
.constant("categoryDetailsUrl", "http://localhost/tshirts/model/category_details.php")
.constant("productsOnDepartmentUrl", "http://localhost/tshirts/model/products_on_department.php")
.constant("productsOnCategoryUrl", "http://localhost/tshirts/model/products_on_category.php")
.controller("departmentCtrl", function($scope, $http, $location, $route, $routeParams, ngProgressFactory, departmentDetailsUrl, categoriesInDepartmentUrl, categoryDetailsUrl, productsOnDepartmentUrl, productsOnCategoryUrl) {
	
	$scope.progressbar = ngProgressFactory.createInstance();
	
	$scope.progressbar.start();
	
	$scope.departmentData = {};
	
	$scope.categoryData = {};
	
	$scope.departmentProductsData = {};
	
	$scope.$on("$routeChangeSuccess", function () {
		
		if ($location.path().match(/^\/department\/\d$/)) {
			 $scope.departmentData.id = $routeParams["id"];
		
			$http({
				method: "GET",
				url: departmentDetailsUrl,
				params: {"GetDepartmentDetails":$scope.departmentData.id},
			}).then(function(response) {
					$scope.departmentData.department = response.data;
					$('title').text($scope.departmentData.department.name + ' - tshirts');
			}, function(error) {
					$scope.departmentData.error = error;
			});
			
			$http({
				method: "GET",
				url: categoriesInDepartmentUrl,
				params: {"GetCategoriesInDepartment":$scope.departmentData.id},
			}).then(function(response) {
					$scope.departmentData.categories = response.data;
			}, function(error) {
					$scope.departmentData.error = error;
			});
			
			// Get products
			$http({
				method: "GET",
				url: productsOnDepartmentUrl,
				params: {"GetProductsOnDepartment":$scope.departmentData.id},
			}).then(function(response) {
					$scope.departmentProductsData = response.data;
			}, function(error) {
					$scope.departmentData.error = error;
			});
						
			$scope.progressbar.complete();
		}
		else if ($location.path().match(/^\/category\/\d\/\d$/)) {
			$scope.departmentData.id = $routeParams["id"];
			$scope.categoryData.id = $routeParams["data"];
			
			$http({
				method: "GET",
				url: departmentDetailsUrl,
				params: {"GetDepartmentDetails":$scope.departmentData.id},
			}).then(function(response) {
					$scope.departmentData.department = response.data;
			}, function(error) {
					$scope.departmentData.error = error;
			});
			
			$http({
				method: "GET",
				url: categoryDetailsUrl,
				params: {"GetCategoryDetails":$scope.categoryData.id},
			}).then(function(response) {
					$scope.categoryData.category = response.data;
					$scope.departmentData.department.name = $scope.departmentData.department.name + " >> " + 
					$scope.categoryData.category.name;
					$('title').text($scope.departmentData.department.name + ' - tshirts');
					$scope.departmentData.department.description = $scope.categoryData.category.description;
			}, function(error) {
					$scope.departmentData.error = error;
			});
			
			$http({
				method: "GET",
				url: categoriesInDepartmentUrl,
				params: {"GetCategoriesInDepartment":$scope.departmentData.id},
			}).then(function(response) {
					$scope.departmentData.categories = response.data;
			}, function(error) {
					$scope.departmentData.error = error;
			});
			
			// Get products
			$http({
				method: "GET",
				url: productsOnCategoryUrl,
				params: {"GetProductsInCategory":$scope.categoryData.id},
			}).then(function(response) {
					$scope.departmentProductsData = response.data;
			}, function(error) {
					$scope.departmentData.error = error;
			});
			
			$scope.progressbar.complete();
		}
	});
});