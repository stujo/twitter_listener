TwitterApp = angular.module("TwitterApp", [
	'ui.bootstrap', 
	'ngRoute'
]);

TwitterApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/searches/:id', { templateUrl: "/main/index", controller: "SearchCtrl"});

	$routeProvider.when('/main', { templateUrl: '/main/index', controller: 'SearchCtrl'});

	$routeProvider.otherwise({templateUrl: '/main/index', controller: 'SearchCtrl'});


}]);

// TODO: 
// 1. do you need all three routes above? 
// 2. does it make sense to have one controller for all?