angular.module('app').controller('mvCreatePartyCtrl', function($http, mvParty, $q, mvUser, $scope, mvNotifier, $location) {
	

	$scope.createParty = function() {
		var newPartyData = {
			name     : $scope.name,
			location : $scope.location,
			dj       : $scope.dj
		}

		var newParty = new mvParty(newPartyData);
		var dfd = $q.defer();
		console.log(newParty)

		newParty.$save().then(function() {
			dfd.resolve();
			//console.log(newParty._id)
			$location.path('/parties/' + newParty._id)
		}, function(response) {
			dfd.reject(response.data.reason);
			console.log("rejected!")
		});
	}
});