angular.module("tShirts")
.constant("countryFrenchDepartmentUrl", "http://localhost/tshirts/model/category_details.php?GetCategoryDetails=1")
.controller("departmentCountryFrenchCtrl", function($scope, $http, countryFrenchDepartmentUrl) {
	$scope.countryFrenchData = {};
	
	$http({
			method: "GET",
			url: countryFrenchDepartmentUrl,
			cache: false
		}).then(function (response) {
					$scope.countryFrenchData.french = response.data;
		}, function (error) {
				$scope.countryData.error = error;
		});
});