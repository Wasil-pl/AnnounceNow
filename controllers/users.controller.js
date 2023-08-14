const User = require('../models/User.model');

exports.loadUser = async (req, res) => {
  try {
    res.json(await User.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
