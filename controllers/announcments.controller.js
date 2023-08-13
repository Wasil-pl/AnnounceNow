const Announcement = require('../models/announcment.model');

exports.loadAll = async (req, res) => {
  try {
    res.json(await Announcement.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
