var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongodb_url = "mongodb://vineet30:Buntymis30!@ds141889.mlab.com:41889/modulegenerator";

mongoose.connect(mongodb_url);
module.exports = {mongoose};
