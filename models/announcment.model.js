const mongoose = require('mongoose');
const textPattern = new RegExp(/^[a-zA-Z ]*$/);

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 50 },
  content: { type: String, required: true, maxLength: 1000 },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  seller: { type: String, required: true, ref: 'User' },
});

module.exports = mongoose.model('Announcement', announcementSchema);
