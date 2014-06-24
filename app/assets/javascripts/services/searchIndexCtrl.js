SearchCtrl = function ($scope, $http, searchData) {
	$scope.data = searchData.data;

	searchData.loadSearch();

	$scope.addSearch = function() {
		searchData.addSearch($scope.newSearch.search_terms);

		$scope.newSearch.search_terms = "";
	};

// setting up var to select search terms
	$scope.selectedSearch = null;
// setting function to allow a particular searh term to be selected
	$scope.selectSearch = function (index) {
		$scope.selectedSearch = index;
		searchData.selectedSearch = index;
		searchData.loadTweets(index);
	}

}

SearchCtrl.$inject = ['$scope', '$http', 'searchData'];

