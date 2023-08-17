const User = require('../models/User.model');

exports.getUser = async (req, res) => {
  try {
    res.json(await User.findById(req.session.login.id).select('-password'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
