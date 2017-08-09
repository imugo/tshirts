angular.module("tShirtsAdmin")
.constant("deptUrl", "http://localhost/tshirts/model/adminDepartment.php")
.constant("catUrl", "http://localhost/tshirts/model/adminCategory.php")
.component("category", {
	templateUrl: '/tshirts/views/adminCategories.html',
	controller: function($http, $scope, $stateParams, catUrl, deptUrl) {
	$scope.listCategories = function() {
		$http({
			method: "GET",
			url: catUrl,
			params: {"GetDepartmentCategories": $stateParams.dept},
			cache: false
		}).then(function(response) {
			$scope.categories = response.data;
			
		});
	};
	
	$scope.deleteCategory = function(cat) {
			
			$http({
			method: "POST",
			url: catUrl,
			data: $.param({'DeleteCategory': {category_id: cat.category_id}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				if (response.data == 1) {
					$scope.categories.splice($scope.categories.indexOf(cat), 1);
				}
				else {
					$scope.categories.error = "There are products in category";	
				}
			});
		};
		
		$scope.removeError = function() {
			$scope.categories.error = null;
		};
		
		$scope.addCategory = function(cat) {
			$http({
			method: "POST",
			url: catUrl,
			data: $.param({'AddCategory': {department_id: $stateParams.dept, name: cat.name, description: cat.description}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				$scope.categories.push(response.data);
				$scope.editedCategory = null;
			});
		};
		
		$scope.updateCategory = function(cat) {
			$http({
			method: "POST",
			url: catUrl,
			data: $.param({'UpdateDepartment': {category_id: cat.category_id, name: cat.name, description: cat.description}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				$scope.editedCategory = null;
			});
		};
		
		$scope.startEdit = function(cat) {
			$scope.editedCategory = cat;
		};
		
		$scope.cancelEdit = function () {
			$scope.editedCategory = null;
		};
	
	$scope.listCategories();
}
});