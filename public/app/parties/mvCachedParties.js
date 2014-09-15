angular.module('app').factory('mvCachedParties', function(mvParty){
	var partyList;

	return {
		query: function() {
			if(!partyList) {
				partyList = mvParty.query();
			}

			return partyList;
		}
	}
})