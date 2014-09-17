angular.module('app').factory('mvSong', function($resource) {
	var SongResource = $resource('/api/parties/:_id/songs', {_id: "@id"}, {
		update: {method:'PUT', isArray:true}
	});

	return SongResource;
})