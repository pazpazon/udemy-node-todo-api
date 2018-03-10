var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:P@$$w0rd@ds111319.mlab.com:11319/udemy_nodejs_course_todoapp' || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};