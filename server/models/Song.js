var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var songSchema = mongoose.Schema({
	//_party: Number,
	name: {type:String, required:'{PATH} is required!'},
	artist: {type:String, required:'{PATH} is required!'},
	_parties: [
		{
			partyId:{type:Schema.Types.ObjectId, ref: 'Party'},
			voteCount:Number
		}
	]
});

var Song = mongoose.model('Song', songSchema);

function getSongModel() {
	return Song;
}

exports.getSongModel = getSongModel;