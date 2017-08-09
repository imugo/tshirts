angular.module("tShirtsAdmin")
.component("login", {
	bindings: { authenticate: '<' },
	templateUrl: "/tshirts/views/adminLogin.html",
});
/*.constant("authUrl", "http://localhost/tshirts/model/authUrl.php")
.controller("authCtrl", function($scope, $http, $location, authUrl) {
	$scope.$on("$routeChangeSuccess", function() {
		$http({
			method: "GET",
			url: authUrl,
			cache: false,
			params: {"authenticate": ""}
		}).then(function(response) {
			if (response.data == false) {
				$location.path("/login");
			} else {
				$location.path("/main");
			}
		});
	});
	
	
	$scope.logout = function() {
		$http({
			method: "GET",
			url: authUrl,
			cache: false,
			params: {'logout': "true"}
		}).then(function(response) {
			if (response.data == true) {
				console.log(response.data);
				$location.path("/login");
			}
		});
	};
});*/