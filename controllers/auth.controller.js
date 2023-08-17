const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const deleteFile = require('../utils/deleteFile');
const { validatePhoneNumber } = require('../const');

exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'Missing file!' });

    if (!login || !password || !phoneNumber) {
      deleteFile(file);
      return res.status(400).json({ message: 'Missing input!' });
    }

    if (typeof login !== 'string' || typeof password !== 'string' || typeof phoneNumber !== 'string') {
      deleteFile(file);
      return res.status(400).json({ message: 'Wrong input!' });
    }

    if (!validatePhoneNumber.test(phoneNumber)) {
      deleteFile(file);
      return res.status(400).json({ message: 'Wrong phone number!' });
    }

    const fileType = await getImageFileType(file);
    const acceptedFileTypes = ['image/png', 'image/gif', 'image/jpeg'];

    if (!acceptedFileTypes.includes(fileType)) {
      deleteFile(file);
      return res.status(400).json({ message: 'Invalid file type' });
    }

    const userExists = await User.findOne({ login });
    if (userExists) {
      deleteFile(file);
      return res.status(409).json({ message: 'User with this login already exists' });
    }

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
