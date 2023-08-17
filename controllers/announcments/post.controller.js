const { textPattern, titleMaxLength, contentMaxLength, validatePrice, acceptedFileTypes } = require('../../const');
const Announcement = require('../../models/Announcment.model');
const deleteFile = require('../../utils/deleteFile');
const getImageFileType = require('../../utils/getImageFileType');

exports.add = async (req, res) => {
  try {
    const seller = req.session.login.id;
    const { title, content, date, price, address } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    if (!title || !content || !date || !price || !address) {
      deleteFile(file);
      return res.status(400).json({ message: 'Not all fields have been entered' });
    }

    if (!textPattern.test(title)) {
      deleteFile(file);
      return res.status(400).json({ message: 'Title can contain only letters' });
    }
    if (!textPattern.test(content)) {
      deleteFile(file);
      return res.status(400).json({ message: 'Content can contain only letters' });
    }

    if (!validatePrice.test(price)) {
      deleteFile(file);
      return res.status(400).json({ message: 'Invalid price' });
    }

    if (title.length >= titleMaxLength) throw new Error('Title is too long');
    if (content.length >= contentMaxLength) throw new Error('Content is too long');

    const fileType = await getImageFileType(file);

    if (!acceptedFileTypes.includes(fileType)) {
      deleteFile(file);
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
    deleteFile(req.file);
    res.status(500).json({ message: err.message });
  }
};
