SearchCtrl = function ($scope, searchData) {
	$scope.data = searchData.data

	$scope.selectedSearch = null;

	$scope.selectSearch = function (index) {
		$scope.selectedSearch = index;
	}
}

SearchCtrl.$inject = ['$scope', 'searchData'];