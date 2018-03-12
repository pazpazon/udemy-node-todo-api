const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
}
var token = jwt.sign(data, 'abcdefg123');
console.log(token);

var decoded = jwt.verify(token, 'abckkkdefg123');
console.log(decoded);

// let message = 'I am user number 23';
// let hash = SHA256(message);

// console.log(`hash value: ${hash}`);
// console.log(`hash toString: ${hash.toString()}`);
// console.log(`hash typeof: ${typeof hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecretsalt').toString()
// }

// // token.data.id = 5;
// // token.data.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecretsalt').toString();

// if (resultHash === token.hash) {
//     console.log('Data good, was not changed');
// } else {
//     console.log('Data was jeopardized, call police');
// }