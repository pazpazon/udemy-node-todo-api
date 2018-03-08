var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    completed: {
        type: Boolean,
        defualt: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};
