const multer = require('multer');

const limits = { fileSize: 1024 * 1024 * 5 };

let path = './public/uploads/images';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'avatar') path = './public/uploads/avatars';

    cb(null, path);
  },

  filename: function (req, file, cb) {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const imageUpload = multer({ storage, limits: limits });

module.exports = imageUpload;
