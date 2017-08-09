angular.module("tShirts")
.constant("departmentDetailsSeasonalUrl", "http://localhost/tshirts/model/department_details.php?GetDepartmentDetails=3")
.constant("categoriesInSeasonalDepartmentUrl", "http://localhost/tshirts/model/category_in_department.php?GetCategoriesInDepartment=3")
.constant("seasonalChristmasDepartmentUrl", "http://localhost/tshirts/model/category_details.php?GetCategoryDetails=6")
.constant("seasonalValentineDepartmentUrl", "http://localhost/tshirts/model/category_details.php?GetCategoryDetails=7")
.constant("seasonalProductsOnDepartmentUrl", "http://localhost/tshirts/model/products_on_department.php?GetProductsOnDepartment=3")
.constant("seasonalChristmasProductsOnDepartmentUrl", "http://localhost/tshirts/model/products_on_category.php?GetProductsInCategory=6")
.constant("seasonalValentineProductsOnDepartmentUrl", "http://localhost/tshirts/model/products_on_category.php?GetProductsInCategory=7")
.controller("departmentSeasonalCtrl", function($scope, $http, departmentDetailsSeasonalUrl, categoriesInSeasonalDepartmentUrl, seasonalChristmasDepartmentUrl, seasonalValentineDepartmentUrl, seasonalProductsOnDepartmentUrl, seasonalChristmasProductsOnDepartmentUrl,
seasonalValentineProductsOnDepartmentUrl, ngProgressFactory) {
	$scope.seasonalData = {};
	
	$scope.seasonalChristmasData = {};
	
	$scope.seasonalValentineData = {};
	
	$scope.seasonalProductsData = {};
	
	$scope.seasonalChristmasProductsData = {};
	
	$scope.seasonalValentineProductsData = {};
	
	$scope.progressbar = ngProgressFactory.createInstance();
	
	$scope.progressbar.start();
	
	$http({
			method: "GET",
			url: departmentDetailsSeasonalUrl,
			cache: false
		}).then(function (response) {
					$scope.seasonalData.seasonal = response.data;
		}, function (error) {
				$scope.seasonalData.error = error;
		});
		
	$http({
		method: "GET",
			url: categoriesInSeasonalDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.seasonalData.seasonalCategories = response.data;
					console.log($scope.seasonalData.seasonalCategories);
		}, function (error) {
				$scope.seasonalData.error = error;
	});
	
	$http({
		method: "GET",
			url: seasonalChristmasDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.seasonalChristmasData.christmas = response.data;
		}, function (error) {
				$scope.seasonalData.error = error;
	});
	
	$http({
		method: "GET",
			url: seasonalValentineDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.seasonalValentineData.valentine = response.data;
		}, function (error) {
				$scope.seasonalData.error = error;
	});
	
	$http({
			method: "GET",
			url: seasonalProductsOnDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.seasonalProductsData = response.data;
		}, function (error) {
				$scope.seasonalData.error = error;
		});
		
	$http({
			method: "GET",
			url: seasonalChristmasProductsOnDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.seasonalChristmasProductsData = response.data;
		}, function (error) {
				$scope.seasonalData.error = error;
		});
		
	$http({
			method: "GET",
			url: seasonalValentineProductsOnDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.seasonalValentineProductsData = response.data;
		}, function (error) {
				$scope.seasonalData.error = error;
		});
		
	$scope.progressbar.complete();
});