const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const deleteFile = require('../utils/deleteFile');
const { validatePhoneNumber, acceptedFileTypes } = require('../const');

exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;
    const file = req.file;

    if (!file) throw { message: 'Missing file!', status: 400 };

    if (!login || !password || !phoneNumber) throw { message: 'Not all fields have been entered', status: 400 };

    if (typeof login !== 'string' || typeof password !== 'string' || typeof phoneNumber !== 'string')
      throw { message: 'Wrong input!', status: 400 };

    if (!validatePhoneNumber.test(phoneNumber)) throw { message: 'Wrong phone number!', status: 400 };

    const fileType = await getImageFileType(file);

    if (!acceptedFileTypes.includes(fileType)) throw { message: 'Invalid file type', status: 400 };

    const userExists = await User.findOne({ login });
    if (userExists) throw { message: 'User with this login already exists', status: 409 };

    const user = await User.create({
      login,
      password: await bcrypt.hash(password, 10),
      avatar: file.filename,
      phoneNumber,
    });
    res.status(201).json({ message: 'User created ' + user.login });
  } catch (err) {
    deleteFile(req.file);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || typeof login !== 'string' || !password || typeof password !== 'string')
      return res.status(400).json({ message: 'Invalid request' });

    const user = await User.findOne({ login });

    if (!user) return res.status(401).json({ message: 'Invalid login or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid login or password' });

    req.session.login = { login: user.login, id: user._id.toString() }; // add login and Id to session

    res.json({ message: 'Logged in' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
