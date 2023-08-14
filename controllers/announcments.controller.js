const Announcement = require('../models/Announcment.model');

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

exports.add = async (req, res) => {
  try {
    const { title, content, date, price, address, seller } = req.body;
    const newAnnouncement = new Announcement({
      title,
      content,
      date,
      price,
      address,
      seller,
    });
    await newAnnouncement.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.edit = async (req, res) => {
  try {
    const { title, content, date, price, address, seller } = req.body;
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) return res.status(404).json({ message: 'Not found...' });

    announcement.title = title;
    announcement.content = content;
    announcement.date = date;
    announcement.price = price;
    announcement.address = address;
    announcement.seller = seller;
    await announcement.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) res.status(404).json({ message: 'Not found...' });

    await announcement.remove();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loadBySeller = async (req, res) => {
  try {
    const announcement = await Announcement.find({ seller: req.params.id }).populate({
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
