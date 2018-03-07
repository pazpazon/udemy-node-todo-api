// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connecto to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    // db.collection('Todos').find({_id: new ObjectID('5a9f91c8fac9250d00588553')}).toArray().then( (docs) => {
    //     console.log('Todos:');
    //     console.log(JSON.stringify(docs, undefined, 3));
    // }, (err) => {
    //     console.log('Unable to fetch Todos:', err);
    // });

    db.collection('Users').find({name: 'pazpazon'}).toArray().then( (docs) => {
        console.log('User with name `pazpazon`:');
        console.log(JSON.stringify(docs, undefined, 3));
    }, (err) => {
        console.log('Unable to fetch Users:', err);
    });

    db.collection('Todos').find().count().then( (count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch Count:', err);
    });

    // db.close();
});