const Announcement = require('../../models/Announcment.model');

exports.loadAll = async (req, res) => {
  try {
    res.json(
      await Announcement.find().populate({
        path: 'seller',
        select: ' -password',
      })
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loadOne = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate({
      path: 'seller',
      select: '-password',
    });

    if (!announcement) return res.status(404).json({ message: 'Not found' });

    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loadBySeller = async (req, res) => {
  try {
    const announcement = await Announcement.find({ seller: req.params.seller }).populate({
      path: 'seller',
      select: '-password',
    });
    if (!announcement) return res.status(404).json({ message: 'Not found' });

    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.search = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;
    const announcement = await Announcement.find({
      $or: [{ title: { $regex: searchPhrase, $options: 'i' } }, { content: { $regex: searchPhrase, $options: 'i' } }],
    }).populate({
      path: 'seller',
      select: '-password',
    });

    if (!announcement) return res.status(404).json({ message: 'Not found' });

    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
