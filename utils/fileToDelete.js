const fs = require('fs');

let path = './public/uploads/images/';

const fileToDelete = (file) => {
  try {
    if (file.fieldname === 'avatar') path = './public/uploads/avatars/';

    fs.unlinkSync(path + file.filename);
  } catch (err) {
    console.error('Error deleting file:', err);
  }
};

module.exports = fileToDelete;
