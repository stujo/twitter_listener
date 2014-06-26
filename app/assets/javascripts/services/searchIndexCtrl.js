SearchCtrl = function ($scope, $http, searchData) {
	$scope.data = searchData.data;
// calling loadSearch function from searchData factory/service to load searches
	searchData.loadSearch();

	// setting up var to select search terms
	$scope.selectedSearch = null;
	$scope.selectedSearchIndex = null;
// setting function to allow a particular searh term to be selected
	$scope.selectSearch = function (id, index) {
		$scope.selectedSearch = id;
		$scope.selectedSearchIndex = index;
		searchData.selectedSearch = id;
		searchData.loadTweets(id);
	}
// setting up scope and function to add searches. the http request and data manipulation are in Search Data.
	$scope.addSearch = function() {
		searchData.addSearch($scope.newSearch.search_terms);
		$scope.newSearch.search_terms = "";
	};
// setting up scope and function to update searches. the http request and data manipulation are in Search Data.
	$scope.updateSearch = function() {
		searchData.updateSearch($scope.selectedSearchIndex);
	};
// setting up scope and function to delete searches. the http request and data manipulation are in Search Data.
	$scope.deleteSearch = function(id, index) {
		$http.delete('./searches/' + id + '.json').success(function(data) {
			console.log("Search deleted.");
			$scope.data.searches.splice(index, 1);
		})
	};
}
// a different way to inject dependancies for compiling.
SearchCtrl.$inject = ['$scope', '$http', 'searchData'];

