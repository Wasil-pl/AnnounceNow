const mongoose = require('mongoose');
const { validatePhoneNumber } = require('../const');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  phoneNumber: { type: String, required: true, match: validatePhoneNumber },
});

module.exports = mongoose.model('User', userSchema);
