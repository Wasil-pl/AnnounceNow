const mongoose = require('mongoose');
const textPattern = new RegExp(/^[a-zA-Z1-9 \.\,\-\_\(\)]*$/);

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, match: textPattern, maxLength: 50 },
  content: { type: String, required: true, match: textPattern, maxLength: 1000 },
  picture: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  seller: { type: String, required: true, ref: 'User' },
});

module.exports = mongoose.model('Announcement', announcementSchema);
