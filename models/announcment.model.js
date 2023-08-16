const mongoose = require('mongoose');
const { pattern, titleMaxLength, contentMaxLength } = require('../const');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, match: pattern, maxLength: titleMaxLength },
  content: { type: String, required: true, match: pattern, maxLength: contentMaxLength },
  picture: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  seller: { type: String, required: true, ref: 'User' },
});

module.exports = mongoose.model('Announcement', announcementSchema);
