const {
  textPattern,
  titleMaxLength,
  contentMaxLength,
  validatePrice,
  acceptedFileTypes,
  validateDate,
} = require('../../const');
const Announcement = require('../../models/Announcment.model');
const deleteFile = require('../../utils/deleteFile');
const getImageFileType = require('../../utils/getImageFileType');

exports.edit = async (req, res) => {
  try {
    const { title, content, date, price, address } = req.body;
    const announcement = await Announcement.findById(req.params.id);
    const seller = req.session.login.id;
    const file = req.file;

    if (announcement.seller != seller) throw { message: 'Not your ad...', status: 403 };
    // "throw" that error mean that we will not execute next lines of code. We will go to catch block

    if (!file) throw { message: 'Missing file!', status: 400 };

    if (!title || !content || !date || !price || !address)
      throw { message: 'Not all fields have been entered', status: 400 };

    if (!textPattern.test(title)) throw { message: 'Title can contain only letters', status: 400 };
    if (!textPattern.test(content)) throw { message: 'Content can contain only letters', status: 400 };

    const fileType = await getImageFileType(file);

    if (!acceptedFileTypes.includes(fileType)) throw { message: 'Invalid file type', status: 400 };

    if (!validatePrice.test(price)) throw { message: 'Invalid price', status: 400 };

    if (!validateDate.test(date)) throw { message: 'Invalid date', status: 400 };

    if (title.length >= titleMaxLength) throw { message: 'Title is too long', status: 400 };
    if (content.length >= contentMaxLength) throw { message: 'Content is too long', status: 400 };

    if (!announcement) throw { message: 'Not found...', status: 404 };

    announcement.title = title;
    announcement.content = content;
    announcement.date = date;
    announcement.price = price;
    announcement.address = address;
    await announcement.save();
    res.json({ message: 'OK' });
  } catch (err) {
    deleteFile(req.file);
    res.status(err.status ?? 500).json({ message: err.message });
  }
};
