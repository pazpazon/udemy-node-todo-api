// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connecto to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Todo:', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 3));
    // });

    // db.collection('Users').insertOne({
    //     name: 'pazpazon',
    //     age: 45,
    //     location: 'Madrid, Spain'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert User:', err)
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 3));
    // });



    db.close();
});