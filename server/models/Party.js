var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var partySchema = mongoose.Schema({
	name: {type:String, required:'{PATH} is required!'},
	dj: {type:String, required:'{PATH} is required!'},
	location: {type:String, required:'{PATH} is required!'},
	published: {type:Date, default:Date.now, required:'{PATH} is required!'},
	songs:[{ type: Schema.Types.ObjectId, ref: 'Song' }]
});

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

var Party = mongoose.model('Party', partySchema);
var Song = mongoose.model('Song', songSchema);


function createDefaultParties() {
	Party.find({}).exec(function(err, collection) {
		if(collection.length === 0) {
			Party.create({name: 'New Years Eve', dj: 'Dada Life', location: 'Pacha'}, function(err, myParty) {
				var songs = [
					new Song({name:"Gecko", artist:"Oliver Heldens", _parties:[{partyId: myParty, voteCount:1}]}),
					new Song({name:"You Should Know", artist:"Jack Beats", _parties:[{partyId: myParty, voteCount:1}]}),
					new Song({name:"Problem", artist:"Arriana Grande", _parties:[{partyId: myParty, voteCount:1}]})
				]

				for(i=0; i<songs.length; i++) {
					songs[i].save();
					myParty.songs.push(songs[i])
				}

				myParty.save();
			});

			Party.create({name: 'Electric Zoo', dj: 'Steve Aoki', location: 'Randalls Island'}, function(err, myParty) {
				var songs = [
					new Song({name:"Atmosphere", artist:"Kaskade", _parties:[{partyId: myParty, voteCount:1}]}),
					new Song({name:"Thinking About You", artist:"Calvin Harris", _parties:[{partyId: myParty, voteCount:1}]})
				]

				for(i=0; i<songs.length; i++) {
					songs[i].save();
					myParty.songs.push(songs[i])
				}

				myParty.save();
			});

			Party.create({name: 'Boys and Girls Club', dj: 'Wolfgang Gartner', location: 'Webster Hall'}, function(err, myParty) {
				var songs = [
					new Song({name:"Rift", artist:"Dirty South", _parties:[{partyId: myParty, voteCount:1}]}),
					new Song({name:"Codec", artist:"Zedd", _parties:[{partyId: myParty, voteCount:1}]}),
					new Song({name:"I Know The Truth", artist:"Pretty Lights", _parties:[{partyId: myParty, voteCount:1}]}),
					new Song({name:"Latch", artist:"Disclosure", _parties:[{partyId: myParty, voteCount:1}]})
				]

				for(i=0; i<songs.length; i++) {
					songs[i].save();
					myParty.songs.push(songs[i])
				}

				myParty.save();
			});
		}
	})
}

exports.createDefaultParties = createDefaultParties;