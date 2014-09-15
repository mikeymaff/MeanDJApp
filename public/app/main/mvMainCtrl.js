angular.module('app').controller('mvMainCtrl', function($scope, mvCachedParties) {
	$scope.parties = mvCachedParties.query();
});