const db = require('./db');
const bcrypt = require('bcrypt');


// <--สร้างฟังก์ชั่น Register-->
const userRegister = async function (name, password, email) {
  console.log(name, password, email);
  // hash password
  const hashpassword = await bcrypt.hash(password, 3)
  console.log(hashpassword);

  const docRef = db.collection('users');
  const result = await docRef.add({
    username: name,
    password: hashpassword,
    email: email
  });
  return result

}

// const User = module.exports = db.collection('users', userRegister);

module.exports.getUserById = async function (id, callback) {
  User.findById(id, callback);
}
module.exports.getUserByName = async function (name, callback) {
  var query = {
    username: name,
  };
  User.findOne(query, callback);
}

module.exports.comparePassword = async function (password, hash, callback) {
  bcrypt.compare(password, hash, async function (err, isMatch) {
    callback(null, isMatch);
  });
}

module.exports = {
  userRegister
}