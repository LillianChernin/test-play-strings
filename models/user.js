const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  username: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: true
  },
  passwordDigest: String
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
