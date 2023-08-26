const fs = require('fs');

const picturePath = './public/uploads/images/';
const avatarPath = './public/uploads/avatars/';

const deleteFileFromAvatars = (file) => {
  try {
    fs.unlinkSync(avatarPath + file.filename);
  } catch (err) {
    console.error('Error deleting file:', err);
  }
};

const deleteFileFromImages = (file) => {
  try {
    fs.unlinkSync(picturePath + file.filename);
  } catch (err) {
    console.error('Error deleting file:', err);
  }
};

const deleteFile = (fileName) => {
  try {
    fs.unlinkSync(picturePath + fileName);
  } catch (err) {
    console.error('Error deleting file:', err);
  }
};

module.exports = { deleteFileFromAvatars, deleteFileFromImages, deleteFile };
