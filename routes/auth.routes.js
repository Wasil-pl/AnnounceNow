const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');
const { avatarUpload } = require('../utils/imageUplad');

router.post('/register', avatarUpload.single('avatar'), auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);

module.exports = router;
