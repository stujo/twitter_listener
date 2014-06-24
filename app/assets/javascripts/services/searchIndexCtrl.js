SearchCtrl = function ($scope, $http, searchData) {
	$scope.data = searchData.data;

	searchData.loadSearch();

	$scope.addSearch = function() {
		console.log($scope.newSearch);
		$http.post("./searches.json", $scope.newSearch).success(function(data) {
			console.log("Search added to database!");
			$scope.newSearch = {};
			// return $scope.searches.push(data);
		});
	};

	$scope.viewSearchResults = function (searchId) {
		$location.url('/searches/1');
	};
// setting up var to select search terms
	$scope.selectedSearch = null;
// setting function to allow a particular searh term to be selected
	$scope.selectSearch = function (index) {
		$scope.selectedSearch = index;
	}

}

SearchCtrl.$inject = ['$scope', '$http', 'searchData'];


TwitterApp.config(["$httpProvider", function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);