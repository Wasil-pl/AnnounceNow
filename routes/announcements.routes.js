const express = require('express');
const router = express.Router();

const AnnouncmentController = require('../controllers/announcments.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUplad');

router.get('/ads', AnnouncmentController.loadAll);
router.get('/ads/:id', AnnouncmentController.loadOne);
router.post('/ads', authMiddleware, imageUpload.single('picture'), AnnouncmentController.add);
router.put('/ads/:id', authMiddleware, imageUpload.single('picture'), AnnouncmentController.edit);
router.delete('/ads/:id', authMiddleware, AnnouncmentController.delete);
router.get('/ads/seller/:id', AnnouncmentController.loadBySeller);
router.get('/ads/search/:searchPhrase', AnnouncmentController.search);

module.exports = router;
