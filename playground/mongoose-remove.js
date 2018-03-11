const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then( (result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({text: 'this is a test'}).then((doc) => {
    console.log(doc);
});

// Todo.findByIdAndRemove('5aa45db8f486a3cfc539d34f').then((doc) => {
//     console.log(doc);
// });