var mongoose = require('mongoose');
var connectionString = '';

mongoose.Promise = global.Promise;
if (process.env.PORT) {
    connectionString = 'mongodb://admin:P@$$w0rd@ds111319.mlab.com:11319/udemy_nodejs_course_todoapp';
} else {
    connectionString = 'mongodb://localhost:27017/TodoApp';
}
mongoose.connect( connectionString );

module.exports = {mongoose};