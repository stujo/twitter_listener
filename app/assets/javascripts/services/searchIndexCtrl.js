SearchCtrl = function ($scope, $http, searchData) {
	$scope.data = { 
		searches: [
			{
				title: 'Robots', 
				results: ['Loading Results...']
			}
		] 
	};

	loadSearch = function() {
		$http.get('./searches/1.json').success(function(data) {
		$scope.data.searches = data;
		console.log('Sucessfully loaded search results!');
		console.log(data);
		}).error(function() {
			return console.log('Failed to load search results.')
		});
	};

	loadSearch();

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


