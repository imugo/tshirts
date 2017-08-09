angular.module("tShirts")
.constant("departmentDetailsCountryUrl", "http://localhost/tshirts/model/department_details.php?GetDepartmentDetails=1")
.constant("categoriesInCountryDepartmentUrl", "http://localhost/tshirts/model/category_in_department.php?GetCategoriesInDepartment=1")
.constant("countryFrenchDepartmentUrl", "http://localhost/tshirts/model/category_details.php?GetCategoryDetails=1")
.constant("countryItalianDepartmentUrl", "http://localhost/tshirts/model/category_details.php?GetCategoryDetails=2")
.constant("countryIrishDepartmentUrl", "http://localhost/tshirts/model/category_details.php?GetCategoryDetails=3")
.constant("countryProductsOnDepartmentUrl", "http://localhost/tshirts/model/products_on_department.php?GetProductsOnDepartment=1")
.constant("countryFrenchProductsUrl", "http://localhost/tshirts/model/products_on_category.php?GetProductsInCategory=1")
.constant("countryItalianProductsUrl", "http://localhost/tshirts/model/products_on_category.php?GetProductsInCategory=2")
.constant("countryIrishProductsUrl", "http://localhost/tshirts/model/products_on_category.php?GetProductsInCategory=3")
.controller("departmentCountryCtrl", function($scope, $http, $filter, departmentDetailsCountryUrl, categoriesInCountryDepartmentUrl, countryFrenchDepartmentUrl, countryItalianDepartmentUrl, countryIrishDepartmentUrl, countryProductsOnDepartmentUrl, countryFrenchProductsUrl, countryItalianProductsUrl, countryIrishProductsUrl, ngProgressFactory) {
	$scope.countryData = {};
	
	$scope.countryFrenchData = {};
	
	$scope.countryItalianData = {};
	
	$scope.countryIrishData = {};
	
	$scope.countryProductsData = {};
	
	$scope.countryFrenchProductsData = {};
	
	$scope.countryItalianProductsData = {};
	
	$scope.countryIrishProductsData = {};
	
	$scope.progressbar = ngProgressFactory.createInstance();
	
	$scope.progressbar.start();
		
	$http({
			method: "GET",
			url: departmentDetailsCountryUrl,
			cache: false
		}).then(function (response) {
					$scope.countryData.country = response.data;
		}, function (error) {
				$scope.countryData.error = error;
		});
	$http({
		method: "GET",
			url: categoriesInCountryDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.countryData.countryCategories = response.data;
		}, function (error) {
				$scope.countryData.error = error;
	});
	
	$http({
			method: "GET",
			url: countryFrenchDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.countryFrenchData.french = response.data;
		}, function (error) {
				$scope.countryData.error = error;
		});
		
	$http({
			method: "GET",
			url: countryItalianDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.countryItalianData.italian = response.data;
		}, function (error) {
				$scope.countryData.error = error;
		});
		
	$http({
			method: "GET",
			url: countryIrishDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.countryIrishData.irish = response.data;
		}, function (error) {
				$scope.countryData.error = error;
		});
		
	$http({
			method: "GET",
			url: countryProductsOnDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.countryProductsData = response.data;
		}, function (error) {
				$scope.countryData.error = error;
		});
		
	$http({
			method: "GET",
			url: countryFrenchProductsUrl,
			cache: false
		}).then(function (response) {
					$scope.countryFrenchProductsData = response.data;
		}, function (error) {
				$scope.countryData.error = error;
		});
		
	$http({
			method: "GET",
			url: countryItalianProductsUrl,
			cache: false
		}).then(function (response) {
					$scope.countryItalianProductsData = response.data;
		}, function (error) {
				$scope.countryData.error = error;
		});
		
	$http({
			method: "GET",
			url: countryIrishProductsUrl,
			cache: false
		}).then(function (response) {
					$scope.countryIrishProductsData = response.data;
		}, function (error) {
				$scope.countryData.error = error;
		});
	$scope.progressbar.complete();	
});