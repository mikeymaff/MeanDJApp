angular.module('app').controller('mvPartyListCtrl', function($scope, mvCachedParties) {
	$scope.parties = mvCachedParties.query();

	$scope.sortOptions = [{value:"name", text: "Sort by Name"},
		{value: "published",text: "Sort by Publish Date"}];
	$scope.sortOrder = $scope.sortOptions[0].value;
});