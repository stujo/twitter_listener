angular.module('TwitterApp').factory('searchData', ['$http', function ($http) {
	var searchData = { 
		data: {
			searches: [
				{title: "Robots", results: 'Loading...'} 
			]
		},
		isLoaded: false
	};
	
	searchData.loadSearch = function() {
		if (!searchData.isLoaded) {
			$http.get('./searches/1.json').success(function(data) {
			searchData.data.searches = data;
			searchData.isLoaded = true;
			console.log('Sucessfully loaded search results!');
			console.log(data);
			}).error(function() {
				return console.log('Failed to load search results.')
			});
		}
	};

	return searchData;
	
}]);