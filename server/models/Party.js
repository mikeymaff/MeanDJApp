var mongoose = require('mongoose');

var partySchema = mongoose.Schema({
	name: {type:String, required:'{PATH} is required!'},
	dj: {type:String, required:'{PATH} is required!'},
	location: {type:String, required:'{PATH} is required!'},
	published: {type:Date, required:'{PATH} is required!'},
	songs:[String]
});
var Party = mongoose.model('Party', partySchema);

function createDefaultParties() {
	Party.find({}).exec(function(err, collection) {
		if(collection.length === 0) {
			Party.create({name: 'New Years Eve', dj: 'Dada Life', location: 'Pacha', published: new Date('10/5/2013'), songs:["Gecko - Oliver Heldens", "You Should Know - Jack Beats", "Problem - Arriana Grande"]});
			Party.create({name: 'Electric Zoo', dj: 'Steve Aoki', location: 'Randalls Island', published: new Date('9/1/2013'), songs:["Gecko - Oliver Heldens", "You Should Know - Jack Beats", "Problem - Arriana Grande"]});
			Party.create({name: 'Boys and Girls Club', dj: 'Wolfgang Gartner', location: 'Webster Hall', published: new Date('12/5/2013'), songs:["Gecko - Oliver Heldens", "You Should Know - Jack Beats", "Problem - Arriana Grande"]});
		}
	})
}

exports.createDefaultParties = createDefaultParties;