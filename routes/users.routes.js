const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users.controller');

router.get('/user', UserController.loadUser);

module.exports = router;
