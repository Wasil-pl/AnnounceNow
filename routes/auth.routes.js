const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUplad');

router.post('/register', imageUpload.single('avatar'), auth.register);
router.post('/login', auth.login);
router.post('/logout', authMiddleware, auth.logout);

module.exports = router;
