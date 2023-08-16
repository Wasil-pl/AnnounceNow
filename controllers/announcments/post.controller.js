const { pattern, titleMaxLength, contentMaxLength, validatePrice } = require('../../const');
const Announcement = require('../../models/Announcment.model');
const fileToDelete = require('../../utils/fileToDelete');
const getImageFileType = require('../../utils/getImageFileType');

exports.add = async (req, res) => {
  try {
    const seller = req.session.login.id;
    const { title, content, date, price, address } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

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

    if (!validatePrice.test(price)) {
      fileToDelete(file);
      return res.status(400).json({ message: 'Invalid price' });
    }

    if (title.length >= titleMaxLength) throw new Error('Title is too long');
    if (content.length >= contentMaxLength) throw new Error('Content is too long');

    const fileType = await getImageFileType(file);
    const acceptedFileTypes = ['image/png', 'image/gif', 'image/jpeg'];

    if (!acceptedFileTypes.includes(fileType)) {
      fileToDelete(file);
      return res.status(400).json({ message: 'Invalid file type' });
    }

    const newAnnouncement = new Announcement({
      title,
      content,
      picture: file.filename,
      date,
      price,
      address,
      seller,
    });
    await newAnnouncement.save();
    res.json({ message: 'OK' });
  } catch (err) {
    fileToDelete(req.file);
    res.status(500).json({ message: err.message });
  }
};
