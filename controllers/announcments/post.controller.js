const {
  textPattern,
  titleMaxLength,
  contentMaxLength,
  validatePrice,
  acceptedFileTypes,
  validateDate,
} = require('../../const');
const Announcement = require('../../models/Announcment.model');
const { deleteFileFromImages } = require('../../utils/deleteFile');
const getImageFileType = require('../../utils/getImageFileType');

exports.add = async (req, res) => {
  try {
    const seller = req.session.login.id;
    const { title, content, date, price, address } = req.body;
    const file = req.file;

    if (!file) throw { message: 'Missing file!', status: 400 };

    if (!title || !content || !date || !price || !address)
      throw { message: 'Not all fields have been entered', status: 400 };

    if (!textPattern.test(title)) throw { message: 'Title can contain only letters', status: 400 };
    if (!textPattern.test(content)) throw { message: 'Content can contain only letters', status: 400 };

    if (!validatePrice.test(price)) throw { message: 'Invalid price', status: 400 };

    if (!validateDate.test(date)) throw { message: 'Invalid date', status: 400 };

    if (title.length >= titleMaxLength) throw { message: 'Title is too long', status: 400 };
    if (content.length >= contentMaxLength) throw { message: 'Content is too long', status: 400 };

    const fileType = await getImageFileType(file);

    if (!acceptedFileTypes.includes(fileType)) throw { message: 'Invalid file type', status: 400 };

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
    res.json(newAnnouncement);
  } catch (err) {
    deleteFileFromImages(req.file);
    res.status(err.status ?? 500).json({ message: err.message });
  }
};
