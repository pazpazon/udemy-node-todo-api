const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';
bcrypt.genSalt(12, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(`hash: ${hash}`);
    console.log(`salt: ${salt}`);
  });
});

var hashedPassword = '$2a$12$APz4qjzIrBm75g2vexDhauz1me9OfnhRzEb3FG2OGXeHS4fL26Qre';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});



// let data = {
//     id: 10
// }
// var token = jwt.sign(data, 'abcdefg123');
// console.log(token);

// var decoded = jwt.verify(token, 'abckkkdefg123');
// console.log(decoded);

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