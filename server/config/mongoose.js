var mongoose	= require('mongoose'),
	userModel	= require('../models/User'),
	partyModel	= require('../models/Party'),
	songModel	= require('../models/Song');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('meandjapp db opened');
	});
	// var messageSchema = mongoose.Schema({message: String});
	// var Message = mongoose.model('Message', messageSchema);
	// var mongoMessage;
	// Message.findOne().exec(function(err, messageDoc) {
	// 	mongoMessage = messageDoc.message;
	// });

	userModel.createDefaultUsers();
	partyModel.createDefaultParties();
}