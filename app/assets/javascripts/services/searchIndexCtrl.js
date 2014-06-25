SearchCtrl = function ($scope, $http, searchData) {
	$scope.data = searchData.data;

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

	$scope.addSearch = function() {
		searchData.addSearch($scope.newSearch.search_terms);
		$scope.newSearch.search_terms = "";
	};

	$scope.updateSearch = function() {
		searchData.updateSearch($scope.selectedSearchIndex);
	};

	$scope.deleteSearch = function(id, index) {
		$http.delete('./searches/' + id + '.json').success(function(data) {
			console.log("Search deleted.");
			$scope.data.searches.splice(index, 1);
		})
	};
}

SearchCtrl.$inject = ['$scope', '$http', 'searchData'];

