angular.module("tShirtsAdmin")
.constant("pAUrl", "http://localhost/tshirts/model/adminProductAttributes.php")
.component("attributeValues", {
	templateUrl: "/tshirts/views/adminProductAttributeValues.html",
	controller: function($http, $scope, $stateParams, pAUrl) {
		$scope.listAttributeValues = function() {
		$http({
			method: "GET",
			url: pAUrl,
			params: {"GetAttributeValues": $stateParams.attr},
			cache: false
		}).then(function(response) {
			$scope.attributeValues = response.data;
			
		});
	};
	
	$scope.deleteAttributeValue = function(attr) {
			$http({
			method: "POST",
			url: pAUrl,
			data: $.param({'DeleteAttributeValue': {attribute_value_id: attr.attribute_value_id}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				if (response.data == 1) {
					$scope.attributeValues.splice($scope.attributeValues.indexOf(attr), 1);
				}
				else {
					$scope.attributeValues.error = "There are products using this attribute";	
				}
			});
		};
		
		$scope.removeError = function() {
			$scope.attributeValues.error = null;
		};
		
		$scope.addAttributeValue = function(attribute) {
			$http({
			method: "POST",
			url: pAUrl,
			data: $.param({'AddAttributeValue': {attribute_id: $stateParams.attr, attribute_value: attribute.value}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				$scope.attributeValues.push(response.data);
				$scope.editedAttributeValue = null;
			});
		};
		
		$scope.updateAttributeValue = function(attr) {
			$http({
			method: "POST",
			url: pAUrl,
			data: $.param({'UpdateAttributeValue': {attribute_id: attr.attribute_id, attribute_value: attr.value}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				$scope.editedAttributeValue = null;
			});
		};
		
		$scope.startEdit = function(attr) {
			$scope.editedAttributeValue = attr;
		};
		
		$scope.cancelEdit = function () {
			$scope.editedAttributeValue = null;
		};
	
	$scope.listAttributeValues();
}
});