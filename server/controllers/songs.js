var Song = require('mongoose').model('Song');

// exports.getSongs = function(req, res) {
// 	Song.find({}).exec(function(err, collection) {
// 		res.send(collection);
// 	})
// };

// exports.getSongsById = function(req, res) {
// 	Song.findOne({_id:req.params.id}).exec(function(err, song) {
// 		res.send(song);
// 	})
// }

exports.getSongsById = function(req, res) {
	Song.find({_id: {$in: req.arrayOfSongIds}}).exec(function(err, arrayOfSongs) {
		if (err) return handleError(err);
		//console.log(arrayOfSongs)
		res(arrayOfSongs);
	})
}