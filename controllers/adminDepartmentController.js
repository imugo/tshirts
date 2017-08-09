angular.module("tShirtsAdmin")
.constant("deptUrl", "http://localhost/tshirts/model/adminDepartment.php")
.constant("authUrl", "http://localhost/tshirts/model/authUrl.php")
.component("department", {
	templateUrl: '/tshirts/views/adminDepartment.html',
	controller: function($http, $scope, deptUrl, $state, authUrl) {
			$http({
				method: "GET",
				url: authUrl,
				params: {"authenticate": ""},
				cache: false
			}).then(function(response) {
				if (response.data == false) {
					e.preventDefault();
					$state.transitionTo("login");
				}
			});
		$scope.listDepartments = function() {
			$http({
				method: "GET",
				url: deptUrl,
				params: {"GetDepartmentsWithDescriptions": ""},
				cache: false
			}).then(function(response) {
				$scope.departments = response.data;
				if (response.data == null) {
					$scope.departments.error = "There are no departments in your catalog!";
				}
			});
		};
		
		$scope.deleteDepartment = function(dept) {
			
			$http({
			method: "POST",
			url: deptUrl,
			data: $.param({'DeleteDepartment': {id: dept.department_id}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				if (response.data == 1) {
					$scope.departments.splice($scope.departments.indexOf(dept), 1);
				}
				else {
					$scope.departments.error = "There are categories in department";	
				}
			});
		};
		
		$scope.removeError = function() {
			$scope.departments.error = null;
		};
		
		$scope.addDepartment = function(dept) {
			$http({
			method: "POST",
			url: deptUrl,
			data: $.param({'AddDepartment': {name: dept.name, description: dept.description}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				$scope.departments.push(response.data);
				$scope.editedDepartment = null;
			});
		};
		
		$scope.updateDepartment = function(dept) {
			$http({
			method: "POST",
			url: deptUrl,
			data: $.param({'UpdateDepartment': {id: dept.department_id, name: dept.name, description: dept.description}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				$scope.editedDepartment = null;
			});
		};
		
		$scope.startEdit = function(dept) {
			$scope.editedDepartment = dept;
		};
		
		$scope.cancelEdit = function () {
			$scope.editedDepartment = null;
		};
		
		$scope.listDepartments();
		}
});