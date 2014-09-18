var Song = require('mongoose').model('Song'),
	Party = require('mongoose').model('Party'),
	_     = require('lodash')

exports.getSongsById = function(req, res) {
	Song.find({_id: {$in: req.arrayOfSongIds}}).exec(function(err, arrayOfSongs) {
		if (err) return handleError(err);
		//console.log(arrayOfSongs)

		//stupid logic to return an array of songs with the appropriate vote counts
		// var myPartyId = req.partyId;
		// var arrayOfSongsWithVoteCount = [];

		// for(i=0; i<arrayOfSongs.length; i++) {
		// 	var arrayOfParties = arrayOfSongs[i]._parties

		// 	var voteCountForThisSong;
		// 	for(j=0; j<arrayOfParties.length; j++) {
		// 		if(arrayOfParties[j].partyId == myPartyId) {
		// 			voteCountForThisSong = arrayOfParties[j].voteCount;
		// 			break;
		// 		}
		// 	}
		// 	var objectWithVoteCount = {song:arrayOfSongs[i], voteCount:voteCountForThisSong}
		// 	arrayOfSongsWithVoteCount.push(objectWithVoteCount)
		// }

		// res(arrayOfSongsWithVoteCount);




		var myPartyId = req.partyId;
		var arrayOfSongsWithVoteCount = [];

		_(arrayOfSongs).forEach(function(song){
			var partyVoteCountObject = _.find(song._parties, function(party){
				return party.partyId == myPartyId
			});
			var voteCountForThisSong = partyVoteCountObject.voteCount;
			arrayOfSongsWithVoteCount.push({song:song, voteCount:voteCountForThisSong});
		})

		res(arrayOfSongsWithVoteCount);
	})
}

exports.addSongToParty = function(req, res, next) {
	var songData = req.body;

	//first see if song exists in song database
	Song.findOne({name:songData.name, artist:songData.artist}).exec(function(err, song){
		if(err) {
			console.log(err)
		} else {
			if(song == null) {
				console.log('Song doesnt exist in database')
				addNewSongToDatabaseAndParty({partyId:req.params.id, song:songData})

			} else {
				console.log("Song exists in Songs Database")

				//see if song exists in party
				var existsInParty = _.find(song._parties, function(value) {
					return value.partyId == req.params.id
				})

				if (existsInParty) {
					console.log('Song exists in this party')
					incrementVoteCountForSong({partyId:req.params.id, song:song});
				} else {
					console.log('Song exists in songs database, but not this party');
					addExistingSongToThisParty({partyId:req.params.id, song:song});
				}
			}
		}	
	})
}

var addNewSongToDatabaseAndParty = function(params) {
	Party.findOne({_id:params.partyId}).exec(function(err, party) {
		if(err) {console.log(err + ': song couldnt be added to ' + party)}

		var newSong = new Song({name:params.song.name, artist:params.song.artist, _parties:[{partyId: party._id, voteCount:1}]});
		newSong.save();

		party.songs.push(newSong);

		party.save();
		
	})
}

var addExistingSongToThisParty = function(params) {
	params.song._parties.push({partyId:params.partyId, voteCount:1})
	params.song.save();

	Party.findOne({_id:params.partyId}).exec(function(err, party) {
		if(err) {console.log(err)}
		party.songs.push(params.song);
		party.save();
	});
}

var incrementVoteCountForSong = function(params) {
	_.forEach(params.song._parties, function(value){
		if(value.partyId == params.partyId) {
			console.log('increment vote count')
			value.voteCount ++;
		}
	})
	params.song.save();
}






