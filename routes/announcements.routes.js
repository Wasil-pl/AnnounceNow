const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcment.model');

const AddAdsController = require('../controllers/announcments/post.controller');
const GetAdsController = require('../controllers/announcments/get.controller');
const DeleteAdsController = require('../controllers/announcments/delete.controller');
const PutAdsController = require('../controllers/announcments/put.controller');

const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUplad');

router.get('/ads', GetAdsController.loadAll);
router.get('/ads/:id', GetAdsController.loadOne);
router.post('/ads', authMiddleware, imageUpload.single('picture'), AddAdsController.add);
router.put('/ads/:id', authMiddleware, imageUpload.single('picture'), PutAdsController.edit);
router.delete('/ads/:id', authMiddleware, DeleteAdsController.delete);
router.get('/ads/seller/:id', GetAdsController.loadBySeller);
router.get('/ads/search/:searchPhrase', GetAdsController.search);

module.exports = router;
