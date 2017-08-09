angular.module("tShirtsAdmin")
.directive('fileUpload', function(httpPostFactory) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, element, attr) {
			
			elemet.bind('change', function() {
				var formData = new formData();
				formData.append('file', element[0].files[0]);
				formData.append
				httpPostFactory("http://localhost/tshirts/model/productDetailsAdmin.php", formData, function(callback) {
					//use image name to use in src attribute
					console.log(callback);	
				});
			});
		}
	};
});