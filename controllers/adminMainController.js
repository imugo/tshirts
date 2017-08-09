angular.module("tShirtsAdmin")
.constant("authUrl", "http://localhost/tshirts/model/authUrl.php")
.component("login", {
	templateUrl: "/tshirts/views/adminLogin.html",
	controller: function($http, authUrl, $location, $state, $scope, $route, $routeParams) {
			$http({
				method: "GET",
				url: authUrl,
				cache: false,
				params: {"authenticate": ""}
			}).then(function(response) {
				if (response.data == true) {
					$state.transitionTo('department');
				} else {
					$state.transitionTo("login");
				}
			});
		
		$scope.authenticate = function(user, pass) {
				$http({
					method: "POST",
					url: authUrl,
					cache: false,
					data: $.param({'authorise': {username: user, password: pass}}),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"	
					},
					withCredentials: true
				}).then(function(response) {
					if (response.data == true) {
						$location.path("/main");
					}
					else {
						console.log("Error");
						$scope.authenticationError = "Error Logging In";		
					}
				}, function(error) {
					$scope.authenticationError = error;
				});
			};	
		
	}
})
.component("main", { 
	templateUrl: "/tshirts/views/adminMain.html",
	controller: function($http, $scope, $state, $location, authUrl) {
			$http({
				method: "GET",
				url: authUrl,
				params: {"authenticate": ""},
				cache: false
			}).then(function(response) {
				if (response.data == false) {
					$state.transitionTo("login");
				}
				else {
					$state.transitionTo("department");
				}
			});
		
		$scope.logout = function() {
			$http({
				method: "GET",
				url: authUrl,
				cache: false,
				params: {'logout': "true"}
			}).then(function(response) {
				if (response.data == true) {
					$location.path("/login");
				}
			});
		};
	}
});
	
	/*$scope.screens = ["Departments", "Orders", "Category"];
	$scope.current = $scope.screens[0];
	$scope.setScreen = function(index) {
		$scope.current = $scope.screens[index];
	};
	$scope.getScreen = function() {
		var view;
		switch($scope.current) {
			case "Departments":
				view ="views/adminDepartment.html";	
			break;
			case "Orders":
				view = "views/adminOrders.html";
			break;
			case "Category":
				view = "views/adminCategories.html";
			break;
		}
		return view;
	};
});*/
