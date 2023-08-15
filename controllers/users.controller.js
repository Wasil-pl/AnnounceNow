const User = require('../models/User.model');

exports.loadUser = async (req, res) => {
  try {
    res.status(200).json(req.session.login.login);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
