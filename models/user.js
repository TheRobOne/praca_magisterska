const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "basic"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);

//get Users
module.exports.getUsers = (callback, limit) => {
  User.find(callback).limit(limit);
};

//update User
module.exports.updateUser = (id, user, callback) => {
  const query = {
      name: user.name,
      email: user.email,
      role: user.role
  };
  User.findByIdAndUpdate(id, query, callback);
}

//get User by id
module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

//remove User
module.exports.removeUser = (id, callback) => {
  User.findByIdAndRemove(id, callback);
};