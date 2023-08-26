const express = require('express');
const router = express.Router();

const AddAdsController = require('../controllers/announcments/post.controller');
const GetAdsController = require('../controllers/announcments/get.controller');
const DeleteAdsController = require('../controllers/announcments/delete.controller');
const PutAdsController = require('../controllers/announcments/put.controller');

const authMiddleware = require('../utils/authMiddleware');
const { pictureUpload } = require('../utils/imageUplad');

router.get('/ads', GetAdsController.loadAll);
router.get('/ads/:id', GetAdsController.loadOne);
router.post('/ads', authMiddleware, pictureUpload.single('picture'), AddAdsController.add);
router.put('/ads/:id', authMiddleware, pictureUpload.single('picture'), PutAdsController.edit);
router.delete('/ads/:id', authMiddleware, DeleteAdsController.delete);
router.get('/ads/seller/:seller', GetAdsController.loadBySeller);
router.get('/ads/search/:searchPhrase', GetAdsController.search);

module.exports = router;
