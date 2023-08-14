const authMiddleware = (req, res, next) => {
  if (!req.session.login) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

module.exports = authMiddleware;
