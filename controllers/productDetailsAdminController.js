angular.module("tShirtsAdmin")
.constant("prDAUrl", "http://localhost/tshirts/model/productDetailsAdmin.php")
.directive('fileModel', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			
			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);	
				});
			});
		}
	};
}])
.component("productDetailsAdmin", {
	templateUrl: '/tshirts/views/productDetailsAdmin.html',
	controller: function($http, $scope, $stateParams, prDAUrl, $state, $filter) {
		$scope.DisplayOptions = function() {
			$http({
				method: "GET",
				url: prDAUrl,
				params: {"ProductDisplayOptions": ""},
				cache: false
			}).then(function(response) {
				$scope.productDisplayOptions = response.data;
				console.log(response.data);
			});
		};
		
		 $scope.productInfo = function() {
			$http({
				method: "GET",
				url: prDAUrl,
				params: {"GetProductInfo": $stateParams.prod},
				cache: false
			}).then(function(response) {
				$scope.productInfo = response.data;
				$scope.currentDisplayOption = $scope.productDisplayOptions[$scope.productInfo.display];
			});
		};
		
		$scope.updateProduct = function(product) {
			$http({
			method: "POST",
			url: prDAUrl,
			data: $.param({'UpdateProduct': {id: $stateParams.prod, name: product.name, description: product.description, price: product.price, discounted_price: product.discounted_price}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				$scope.removeFromCat.splice($scope.removeFromCat.indexOf(product), 1);
				Materialize.toast('Updated Successfully', 4000);
			});
		};
		
		// Categories that a product belongs to 
		$scope.categoriesToRemove = function() {
			$http({
				method: "GET",
				url: prDAUrl,
				params: {"CategoriesToRemove": $stateParams.prod},
				cache: false
			}).then(function(response) {
				$scope.CategoriesInProduct = response.data;
				var arr = [];
				for (var i in $scope.CategoriesInProduct) {
					if ($scope.CategoriesInProduct.hasOwnProperty(i)) {
						arr.push($scope.CategoriesInProduct[i]);
					}
				}
				if (arr.length === 1) {
				 $scope.removeFromCategoryButtonDisabled = true;	
				}
				else {
					$scope.removeFromCategoryButtonDisabled = false;
				}
			});
		};
		
		// Remove a product from a category
		$scope.removeProductFromCategory = function(cat) {
			$http({
			method: "POST",
			url: prDAUrl,
			data: $.param({'RemoveProductFromCategory': {product_id: $stateParams.prod, category_id: cat}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				$scope.categoriesToRemove();
				$scope.assignOrMove();
				Materialize.toast('Removed Successfully', 4000);
			});
		};
		
		
		$scope.getCategoriesForProduct = function() {
			$http({
			method: "GET",
			url: prDAUrl,
			params: {'GetCategoriesForProduct': $stateParams.prod},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				$scope.productCategories = response.data;
				console.log($scope.productCategories);
				
			});
		};
		
		
		
		// Get categories products don't belong to
		$scope.assignOrMove = function() {
			$http({
			method: "GET",
			url: prDAUrl,
			params: {'AssignOrMove': $stateParams.prod},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				$scope.newCategories = response.data;
			});
		};
		
		// Assign a product to a new category
		$scope.assignProductToCategory =  function(cat) {
			console.log(cat);
			$http({
			method: "POST",
			url: prDAUrl,
			data: $.param({'AssignProductToCategory': {productId: $stateParams.prod, categoryId: cat}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				$scope.categoriesToRemove();
				$scope.getCategoriesForProduct();
				$scope.assignOrMove();
				Materialize.toast('Assigned Successfully', 4000);
			});
		};
		
		
		/*$scope.categoriesNotInProducts = function() {
			$http({
			method: "GET",
			url: prDAUrl,
			params: {'GetCategories': ""},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				var allCategories = response.data, temp2 = [];
				var arr = [];
				for (var i in allCategories) {
					if (allCategories.hasOwnProperty(i)) {
						arr.push(allCategories[i]);
					}
				}
				console.log(arr.length);
				for (var j = 0; j < arr.length; j++) {
					temp2[arr[j]['category_id']] = arr[j]['name'];
				}
				console.log(temp2);
				console.log($scope.removeFromCat);
				var newArr = [];
				var myArr = $.map($scope.removeFromCat, function(value, index) {
					
					newArr[index] = value;
					return newArr;
				});
				console.log(myArr);
				$scope.diff = $(temp2).not(myArr).get();
				console.log($scope.diff);
			});
		};*/
		
		$scope.moveProductToCategory =  function(cat) {
			$http({
			method: "POST",
			url: prDAUrl,
			data: $.param({'MoveProductToCategory': {productId: $stateParams.prod, sourceCategoryId: $stateParams.cat, targetCategoryId: cat}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				Materialize.toast('Moved Successfully', 4000);
				$state.transitionTo('department');
			});
		};
		
		$scope.setProductDisplayOption = function(displayId) {
			$http({
				method: "POST",
				url: prDAUrl,
				data: $.param({'SetProductDisplayOption': {productId: $stateParams.prod, display: displayId}}),
				headers: {
						"Content-Type": "application/x-www-form-urlencoded"	
					},
				withCredentials: true,
				cache: false
			}).then(function() {
				$scope.currentDisplayOption = $scope.productDisplayOptions[displayId];
				Materialize.toast('Display has been set Successfully', 4000);
			});
		};
		
		$scope.getProductAttributes = function() {
			$http({
				method: "GET",
				url: prDAUrl,
				params: {'GetProductAttributes': $stateParams.prod},
				withCredentials: true,
				cache: false
			}).then(function(response) {
				$scope.productAttributes = response.data;
			});
		};
		
		$scope.RemoveProductAttributeValue =  function(attribute) {
			$http({
			method: "POST",
			url: prDAUrl,
			data: $.param({'RemoveProductAttributeValue': {productId: $stateParams.prod, attributeValueId: attribute}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				$scope.getProductAttributes();
				$scope.getAttributesNotAssignedToProduct();
				Materialize.toast('Removed attribute Successfully', 4000);
			});
		};
		
		$scope.getAttributesNotAssignedToProduct =  function() {
			$http({
			method: "GET",
			url: prDAUrl,
			params: {'GetAttributesNotAssignedToProduct': $stateParams.prod},
			withCredentials: true,
			cache: false
			}).then(function(response) {
				$scope.catalogAttributes = response.data;
			});
		};
		
		$scope.assignAttributeValueToProduct =  function(attribute) {
			$http({
			method: "POST",
			url: prDAUrl,
			data: $.param({'AssignAttributeValueToProduct': {productId: $stateParams.prod, attributeValueId: attribute}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				$scope.getProductAttributes();
				$scope.getAttributesNotAssignedToProduct();
				Materialize.toast('Assigned attribute Successfully', 4000);
			});
		};
		
		/*$scope.deleteProduct =  function(product) {
			$http({
			method: "POST",
			url: prDAUrl,
			data: $.param({'DeleteProduct': {id: product.product_id}}),
			headers: {
					"Content-Type": "application/x-www-form-urlencoded"	
				},
			withCredentials: true,
			cache: false
			}).then(function() {
				$state.transitionTo('department');
				Materialize.toast('Deleted Successfully', 4000);
			});
		};
		
		*/
		$scope.uploadFile = function() {
			var file = $scope.myFile;
			var text = $scope.image;
			var fd = new FormData();
			fd.append('file', file);
			fd.append('image', text);
			fd.append('id', $stateParams.prod);
			$http({
				method: "POST",
				url: "http://localhost/tshirts/model/imageUpload.php",
				data: fd,
				headers: {
						"Content-Type": undefined,
						"Process-data": false	
					},
				withCredentials: true,
				cache: false
			}).then(function(response){
				$state.reload();
				Materialize.toast('uploaded Successfully', 4000);	
			});
		};
		
		$scope.uploadFile2 = function() {
			var file = $scope.myFile;
			var text = $scope.image2;
			var fd = new FormData();
			fd.append('file', file);
			fd.append('image2', text);
			fd.append('id', $stateParams.prod);
			$http({
				method: "POST",
				url: "http://localhost/tshirts/model/imageUpload.php",
				data: fd,
				headers: {
						"Content-Type": undefined,
						"Process-data": false	
					},
				withCredentials: true,
				cache: false
			}).then(function(response){
				console.log(response.data);
				$state.reload();
				Materialize.toast('uploaded Successfully', 4000);	
			});
		};
		
		
		$scope.DisplayOptions();
		$scope.productInfo();
		$scope.categoriesToRemove(); 
		/*$scope.getAttributesNotAssignedToProduct();*/
		$scope.assignOrMove();
		$scope.getCategoriesForProduct();
		$scope.getProductAttributes();
		$scope.getAttributesNotAssignedToProduct();
	}
});