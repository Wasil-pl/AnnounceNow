const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const UserController = require('../controllers/users.controller');

router.get('/user', authMiddleware, UserController.getUser); // if authMiddleware passes, UserController.loadUser will be executed

module.exports = router;
