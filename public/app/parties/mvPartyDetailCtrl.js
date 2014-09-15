angular.module('app').controller('mvPartyDetailCtrl', function($scope, mvCachedParties, $routeParams){
	mvCachedParties.query().$promise.then(function(collection) {
		collection.forEach(function(party) {
			if(party._id === $routeParams.id) {
				$scope.party = party;
			}
		})
	})
})