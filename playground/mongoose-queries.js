const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5aa12643264014583dcbde32';

User.findById(id).then( (user) => {
    if (!user) {
        return console.log('Could not find that user');
    }
    console.log('User:', user);
}).catch( (e) => console.log(e));
// var id = '5aa18a9c67311a700192f704ABC';

// if (!ObjectID.isValid(id)) {
//     console.log('Invalid ID provided!');
// }

// // Todo.find({
// //     _id: id
// // }).then( (todos) => {
// //     console.log('Todos:', todos);
// // });

// // Todo.findOne({
// //     _id: id
// // }).then( (todo) => {
// //     console.log('Todo:', todo);
// // });

// Todo.findById(id).then( (todo) => {
//     if (!todo) {
//         return console.log('Could not find that ID');
//     }
//     console.log('Todo by Id:', todo);
// }).catch( (e) => {
//     console.log(e);
// });