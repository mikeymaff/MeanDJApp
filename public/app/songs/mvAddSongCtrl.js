angular.module('app').controller('mvAddSongCtrl', function($http, mvSong, $q, mvUser, $scope, mvNotifier, $location, $routeParams) {
	

	$scope.addSong = function() {
		var newSongData = {
			name     : $scope.name,
			artist   : $scope.artist
		}

		var newSong = new mvSong(newSongData);
		var dfd = $q.defer();
		console.log(newSongData)

		//console.log($routeParams)

		newSong.$save({_id:$routeParams.id}).then(function() {
			dfd.resolve();
			console.log('saved!')
			//$location.path('/parties/' + $routeParams.id)
		}, function(response) {
			dfd.reject(response.data.reason);
			console.log("rejected!")
		});
	}
});