SearchCtrl = function ($scope, $http, searchData) {
	$scope.data = searchData.data;

	searchData.loadSearch();

	$scope.addSearch = function() {
		console.log($scope.newSearch);
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


