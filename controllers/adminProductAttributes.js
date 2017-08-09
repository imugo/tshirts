angular.module("tShirtsAdmin")
.constant("pAUrl", "http://localhost/tshirts/model/adminProductAttributes.php")
.component("productAttributes", {
	templateUrl: "/tshirts/views/adminProductAttributes.html",
	controller: function($scope, $http, pAUrl) {
		$scope.listAttributes = function() {
			$http({
				method: "GET",
				url: pAUrl,
				params: {"GetAttributes": ""},
				cache: false
			}).then(function(response) {
				$scope.attributes = response.data;
				if (response.data == null) {
					$scope.attributes.error = "There are no product attributes in your catalog!";
				}
			});
		};
		
		$scope.deleteAttribute = function(attr) {
			
			$http({
			method: "POST",
			url: pAUrl,
			data: $.param({'DeleteAttribute': {attribute_id: attr.attribute_id}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				if (response.data == 1) {
					$scope.attributes.splice($scope.attributes.indexOf(attr), 1);
				}
				else {
					$scope.attributes.error = "There are atttibute values for this attribute";	
				}
			});
		};
		
		$scope.removeError = function() {
			$scope.attributes.error = null;
		};	
		
		$scope.addAttribute = function(attr) {
			$http({
			method: "POST",
			url: pAUrl,
			data: $.param({'AddAttribute': {attribute_name: attr.name}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				$scope.attributes.push(response.data);
				$scope.editedAttributes = null;
			});
		};
		
		$scope.updateAttribute = function(attr) {
			$http({
			method: "POST",
			url: pAUrl,
			data: $.param({'UpdateAttribute': {attribute_id: attr.attribute_id, attribute_name: attr.name}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				$scope.editedAttributes = null;
			});
		};
		
		$scope.startEdit = function(attr) {
			$scope.editedAttributes = attr;
		};
		
		$scope.cancelEdit = function () {
			$scope.editedAttributes = null;
		};
		
		$scope.listAttributes();
	}
});