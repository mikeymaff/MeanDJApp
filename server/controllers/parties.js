var Party = require('mongoose').model('Party');

exports.getParties = function(req, res) {
	Party.find({}).exec(function(err, collection) {
		res.send(collection);
	})
};

exports.getPartyById = function(req, res) {
	Party.findOne({_id:req.params.id}).exec(function(err, party) {
		res.send(party);
	})
}