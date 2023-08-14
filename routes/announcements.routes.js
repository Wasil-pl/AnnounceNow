const express = require('express');
const router = express.Router();

const AnnouncmentController = require('../controllers/announcments.controller');

router.get('/ads', AnnouncmentController.loadAll);
router.get('/ads/:id', AnnouncmentController.loadOne);
router.post('/ads', AnnouncmentController.add);
router.put('/ads/:id', AnnouncmentController.edit);
router.delete('/ads/:id', AnnouncmentController.delete);
router.get('/ads/seller/:id', AnnouncmentController.loadBySeller);
router.get('/ads/search/:searchPhrase', AnnouncmentController.search);

module.exports = router;
