angular.module('app').controller('mvCreatePartyCtrl', function($scope, mvNotifier, $location, mvCreateParty) {
	this.party = {};

	this.addParty = function() {
		//send this.party to api
		var partyData = {
			name     : this.party.partyName,
			location : this.party.partyLocation,
			dj       : this.party.partyDJ
		}
		//console.log(this.party)
		mvCreateParty.createParty(partyData).then(function() {
			mvNotifier.notify('New Party created!');
		}, function(reason) {
			mvNotifier.error(reason);
		})
	}
});