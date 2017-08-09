angular.module("tShirtsAdmin")
.factory('httpPostFactory', function($http) {
	return function(file, data, callback) {
		$http({
			url: file,
			method: "POST",
			data: data,
			headers: {'Content-Type': undefined}
		}).then(function(response) {
			callback(response.data);
		});
	};
});