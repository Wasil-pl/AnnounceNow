const { pattern, titleMaxLength, contentMaxLength, validatePrice } = require('../../const');
const Announcement = require('../../models/Announcment.model');
const fileToDelete = require('../../utils/fileToDelete');
const getImageFileType = require('../../utils/getImageFileType');

exports.edit = async (req, res) => {
  try {
    const { title, content, date, price, address } = req.body;
    const announcement = await Announcement.findById(req.params.id);
    const seller = req.session.login.id;
    const file = req.file;

    if (announcement.seller != seller) return res.status(403).json({ message: 'Not your ad...' });

    if (!file) return res.status(400).json({ message: 'Missing file!' });

    if (!title || !content || !date || !price || !address) {
      fileToDelete(file);
      return res.status(400).json({ message: 'Not all fields have been entered' });
    }

    if (!pattern.test(title)) {
      fileToDelete(file);
      return res.status(400).json({ message: 'Title can contain only letters' });
    }
    if (!pattern.test(content)) {
      fileToDelete(file);
      return res.status(400).json({ message: 'Content can contain only letters' });
    }

    const fileType = await getImageFileType(file);
    const acceptedFileTypes = ['image/png', 'image/gif', 'image/jpeg'];

    if (!acceptedFileTypes.includes(fileType)) {
      fileToDelete(file);
      return res.status(400).json({ message: 'Invalid file type' });
    }

    if (!validatePrice.test(price)) {
      fileToDelete(file);
      return res.status(400).json({ message: 'Invalid price' });
    }

    if (title.length >= titleMaxLength) throw new Error('Title is too long');
    if (content.length >= contentMaxLength) throw new Error('Content name is too long');

    if (!announcement) {
      fileToDelete(file);
      return res.status(404).json({ message: 'Not found...' });
    }

    announcement.title = title;
    announcement.content = content;
    announcement.date = date;
    announcement.price = price;
    announcement.address = address;
    await announcement.save();
    res.json({ message: 'OK' });
  } catch (err) {
    fileToDelete(req.file);
    res.status(500).json({ message: err.message });
  }
};
