angular.module('app').factory('mvCreateParty', function($http, mvParty, $q, mvUser) {
	return {
		createParty:function(newPartyData) {
			var newParty = new mvParty(newPartyData);
			var dfd = $q.defer();
			console.log(newParty)

			newParty.$save().then(function() {
				dfd.resolve();
				console.log("saved!")
			}, function(response) {
				dfd.reject(response.data.reason);
				console.log("rejected!")
			});
			return dfd.promise;
		}
	}
})