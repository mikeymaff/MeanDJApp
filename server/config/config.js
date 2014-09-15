var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/meandjapp',
		port: process.env.PORT || 3030
	},
	production: {
		rootPath: rootPath,
		db: 'mongodb://mikeymaff:meandjapp@ds035250.mongolab.com:35250/meandjapp',
		port: process.env.PORT || 80
	}
}