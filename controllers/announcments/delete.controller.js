const Announcement = require('../../models/Announcment.model');
const fs = require('fs');
const { deleteFile } = require('../../utils/deleteFile');

exports.delete = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    const seller = req.session.login.id;

    if (announcement.seller != seller) return res.status(403).json({ message: 'Not your ad...' });

    if (!announcement) res.status(404).json({ message: 'Not found...' });

    deleteFile(announcement.picture.filename);

    await Announcement.deleteOne(announcement);
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
