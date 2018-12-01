const express = require('express');
const router = express.Router();
const { getAvatar, getAlbumPic } = require('../controllers/imageController');

router.get('/avatar/:id', getAvatar);
router.get('/album/:id', getAlbumPic);

module.exports = router;