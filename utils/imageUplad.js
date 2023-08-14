const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/images');
  },

  filename: function (req, file, cb) {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const imageUpload = multer({ storage });

module.exports = imageUpload;
