var mongoose = require('mongoose');
var connectionString = '';

mongoose.Promise = global.Promise;

mongoose.connect( process.env.MONGODB_URI );

module.exports = {mongoose};