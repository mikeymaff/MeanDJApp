angular.module('app').factory('mvParty', function($resource) {
	var PartyResource = $resource('/api/parties/:_id', {_id: "@id"}, {
		update: {method:'PUT', isArray:false}
	});

	return PartyResource;
})