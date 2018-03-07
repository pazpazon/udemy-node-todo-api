// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connecto to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

// db.collection('Users').deleteMany({name: 'pazpazon'}).then((result) => {
//     console.log(result);
// });

db.collection('Users').findOneAndDelete({_id: new ObjectID('5a9fc883d0820cade850704f')}).then((result) => {
    console.log(result);
});
    
// deleteMany
// db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
//     console.log(result);
// }, (err) => {
//     console.log('Could not deleteMany:', err);
// });

// deleteOne
// db.collection('Todos').deleteOne({_id: new ObjectID('5a9f91c8fac9250d00588553')}).then((result) => {
//     console.log(result);
// }, (err) => {
//     console.log('Couldn\'t deleteOne');
// });

// findOneAndDelete
// db.collection('Todos').findOneAndDelete({completed: false}).then( (resultObj) => {
//     console.log(resultObj);
// });


// db.close();
});