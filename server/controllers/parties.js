var Party 		= require('mongoose').model('Party'),
    songs 	= require('../controllers/songs');

exports.getParties = function(req, res) {
	Party.find({}).exec(function(err, collection) {
		res.send(collection);
	})
};

exports.createParty = function(req, res, next) {
	var partyData = req.body;
	//console.log('create party api called')
	//partyData.username = userData.username.toLowerCase();
	Party.create(partyData, function(err, party) {
		if(err) {
			if(err.toString().indexOf('E11000') > -1) {
				err = new Error('Duplicate Party: ' + party);
			}
			res.status(400);
			return res.send({reason:err.toString()});
		}
		res.send(party);
	})
}

exports.getPartyById = function(req, res) {
	Party.findOne({_id:req.params.id}).exec(function(err, party) {
		res.send(party);
	})
}

exports.getPartySongsById = function(req, res) {
	Party.findOne({_id:req.params.id}).exec(function(err, party) {
		songs.getSongsById({arrayOfSongIds:party.songs}, function(myPartysSongs){
			res.send(myPartysSongs);
		});
	})
}