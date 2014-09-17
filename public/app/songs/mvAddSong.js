angular.module('app').factory('mvAddSong', function($resource) {
	console.log('mvAddSong')

	var SongResource = $resource('/api/parties/:_id/songs', {_id: "@id"}, {
		update: {method:'PUT', isArray:false}
	});

	return SongResource;
})