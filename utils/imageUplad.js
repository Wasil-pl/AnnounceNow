const multer = require('multer');

const limits = { fileSize: 1024 * 1024 * 5 };
const picturePath = './public/uploads/images';
const avatarPath = './public/uploads/avatars';

const pictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, picturePath);
  },

  filename: function (req, file, cb) {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarPath);
  },

  filename: function (req, file, cb) {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const pictureUpload = multer({ storage: pictureStorage, limits: limits });
const avatarUpload = multer({ storage: avatarStorage, limits: limits });

module.exports = { pictureUpload, avatarUpload };
