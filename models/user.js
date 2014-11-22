var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  password: {type: String, required: true},
  email: {type: String, required: true, lowercase: true, unique: true},
});