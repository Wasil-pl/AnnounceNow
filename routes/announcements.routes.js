const express = require('express');
const router = express.Router();

const AnnouncmentController = require('../controllers/announcments.controller');

router.get('/announcments', AnnouncmentController.loadAll);

module.exports = router;
