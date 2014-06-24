angular.module('TwitterApp').factory('searchData', ['$http', function ($http) {
	var searchData = { 
		data: {},
		isLoaded: false,
		selectedSearch: null
	};
	
	searchData.addSearch = function(newSearch) {
		term = { search_terms: newSearch};
		console.log(newSearch);
		$http.post("./searches.json", term).success(function(data) {
				console.log("Search added to database!");
				console.log(data);
				searchData.data.searches.push(data);
		});
	};

	searchData.loadSearch = function() {
		if (!searchData.isLoaded) {
			$http.get('./searches.json').success(function(data) {
				searchData.data.searches = data;
				searchData.isLoaded = true;
				console.log('Sucessfully loaded search results!');
				console.log(data);
			}).error(function() {
				return console.log('Failed to load search results.');
			});
		}
	};

	searchData.loadTweets = function(index) {
		// _.findWhere(searchData.data.searches, {id: index});
		$http.get('./searches/' + index + ".json").success(function(data) {
			searchData.data.tweets = data;
			console.log('Tweet Success!');
		}).error(function() {
			return console.log('Tweet Failure.');
		});

	};

	searchData.updateSearch = function(newSearch) {


	};
// factory needs to return your object for complete access to object, searchData. SearchData is a service.
	return searchData;
	
}]);