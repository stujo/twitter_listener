SearchCtrl = function ($scope, $http, searchData) {
	$scope.data = searchData.data;

	searchData.loadSearch();

	// setting up var to select search terms
	$scope.selectedSearch = null;
// setting function to allow a particular searh term to be selected
	$scope.selectSearch = function (index) {
		$scope.selectedSearch = index;
		searchData.selectedSearch = index;
		searchData.loadTweets(index);
	}

	$scope.addSearch = function() {
		searchData.addSearch($scope.newSearch.search_terms);
		$scope.newSearch.search_terms = "";
	};

	$scope.updateSearch = function(selectedSeach) {
		console.log("updatedSearch hit!")
		searchData.updateSearch($scope.newSearch.screen_name);
	};

	$scope.deleteSearch = function(selectedSearch) {
		$http.delete('/searches.json').success(function(data) {
			console.log("Search deleted.");
			$scope.searchData.splice(selectedSearch, 1);
		})
	};


}

SearchCtrl.$inject = ['$scope', '$http', 'searchData'];

