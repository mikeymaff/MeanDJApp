angular.module('app').controller('mvPartyDetailCtrl', function($scope, mvParty, mvSong, $routeParams){
	// mvCachedParties.query().$promise.then(function(collection) {
	// 	//console.log(collection)
	// 	collection.forEach(function(party) {
	// 		//console.log(party)
	// 		//console.log(songCollection);
	// 		if(party._id === $routeParams.id) {
	// 			$scope.party = party;
	// 			//$scope.songs = collection.songs;

	// 			//mvSong.get()
	// 		}
	// 	})
	// })

	//console.log($routeParams.id)

	mvParty.get({_id: $routeParams.id}, function(party){
		$scope.party = party;
	})

	mvSong.query({_id: $routeParams.id}, function(songs){
		console.log(songs)
		$scope.songs = songs;
	})
})