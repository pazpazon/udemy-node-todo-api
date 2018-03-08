// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connecto to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    db.collection('Users').findOneAndUpdate({
        name: 'zapzapon'
    }, {
        $set: {
            name: 'polpolon'
        },
        $inc: {
            age: 1000
        }
    }, {
        returnOriginal: false
    }).then( (result) => {
        console.log(JSON.stringify(result, undefined, 3));
    });

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a9fc073d0820cade8506dbb')
    // }, {
    //     $set: {
    //         completed: true
    //     }        
    // }, {
    //     returnOriginal: false
    // }).then( (result) => {
    //     console.log(result);
    // });

// db.close();
});