var Song = require('mongoose').model('Song'),
	Party = require('mongoose').model('Party')

exports.getSongsById = function(req, res) {
	Song.find({_id: {$in: req.arrayOfSongIds}}).exec(function(err, arrayOfSongs) {
		if (err) return handleError(err);
		//console.log(arrayOfSongs)
		res(arrayOfSongs);
	})
}

exports.addSongToParty = function(req, res, next) {
	var songData = req.body;

	Party.findOne({_id:req.params.id}).exec(function(err, party) {
		if(err) {console.log(err + ': song couldnt be added to ' + party)}

		var newSong = new Song({name:songData.name, artist:songData.artist, _parties:[{partyId: party._id, voteCount:1}]});
		newSong.save();

		party.songs.push(newSong);

		party.save(function(err) {
			if(err) return console.log(err);
			res.send(party);
		});
		
	})
}