angular.module("tShirts")
.constant("departmentDetailsNatureUrl", "http://localhost/tshirts/model/department_details.php?GetDepartmentDetails=2")
.constant("categoriesInNatureDepartmentUrl", "http://localhost/tshirts/model/category_in_department.php?GetCategoriesInDepartment=2")
.constant("natureAnimalDepartmentUrl", "http://localhost/tshirts/model/category_details.php?GetCategoryDetails=4")
.constant("natureFlowerDepartmentUrl", "http://localhost/tshirts/model/category_details.php?GetCategoryDetails=5")
.constant("natureProductsOnDepartmentUrl", "http://localhost/tshirts/model/products_on_department.php?GetProductsOnDepartment=2")
.constant("natureAnimalProductsUrl", "http://localhost/tshirts/model/products_on_category.php")
.constant("natureFlowerProductsUrl", "http://localhost/tshirts/model/products_on_category.php?GetProductsInCategory=5")
.controller("departmentNatureCtrl", function($scope, $http, departmentDetailsNatureUrl, categoriesInNatureDepartmentUrl, natureAnimalDepartmentUrl, natureFlowerDepartmentUrl, natureProductsOnDepartmentUrl, natureAnimalProductsUrl, natureFlowerProductsUrl, ngProgressFactory) {
	$scope.natureData = {};
	
	$scope.natureAnimalData = {};
	
	$scope.natureFlowerData = {};
	
	$scope.natureProductsData = {};
	
	$scope.natureAnimalProductsData = {};
	
	$scope.natureFlowerProductsData = {};
	
	$scope.progressbar = ngProgressFactory.createInstance();
	
	$scope.progressbar.start();
	$scope.loading = true;
	
	$http({
			method: "GET",
			url: departmentDetailsNatureUrl,
			cache: false
		}).then(function (response) {
					$scope.natureData.nature = response.data;
		}, function (error) {
				$scope.natureData.error = error;
		});
		
	$http({
		method: "GET",
			url: categoriesInNatureDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.natureData.natureCategories = response.data;
		}, function (error) {
				$scope.natureData.error = error;
	});
		
	$http({
			method: "GET",
			url: natureAnimalDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.natureAnimalData.animal = response.data;
		}, function (error) {
				$scope.natureData.error = error;
		});
		
	$http({
			method: "GET",
			url: natureFlowerDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.natureFlowerData.flower = response.data;
		}, function (error) {
				$scope.natureData.error = error;
		});
		
	$http({
			method: "GET",
			url: natureProductsOnDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.natureProductsData = response.data;
		}, function (error) {
				$scope.natureData.error = error;
		});
		
	$http({
			method: "GET",
			url: natureAnimalProductsUrl,
			params: {"GetProductsInCategory":4},
			cache: false
		}).then(function (response) {
					$scope.natureAnimalProductsData = response.data;
		}, function (error) {
				$scope.natureData.error = error;
		});
		
	$http({
			method: "GET",
			url: natureFlowerProductsUrl,
			cache: false
		}).then(function (response) {
					$scope.natureFlowerProductsData = response.data;
		}, function (error) {
				$scope.natureData.error = error;
		});
		
	$scope.progressbar.complete();
	$scope.loading = false;
});