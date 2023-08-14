const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { login, password, avatar, phoneNumber } = req.body;

    if (!login && typeof login !== 'string' && !password && typeof password !== 'string' && !avatar && !phoneNumber)
      return res.status(400).json({ message: 'Invalid request' });

    const userWithLogin = await User.findOne({ login });

    if (userWithLogin) return res.status(409).json({ message: 'User with this login already exists' });

    const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar, phoneNumber });
    res.status(201).json({ message: 'User created ' + user.login });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login && typeof login !== 'string' && !password && typeof password !== 'string')
      return res.status(400).json({ message: 'Invalid request' });

    const user = await User.findOne({ login });

    if (!user) return res.status(401).json({ message: 'Invalid login or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid login or password' });

    res.json({ message: 'Logged in' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {};
