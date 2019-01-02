const express = require('express');
const router = express.Router();
const { getAvatar, getAlbumPic } = require('../controllers/imageController');

//set the router for the connection between frontend and backend
router.get('/avatar/:id', getAvatar);
router.get('/album/:id', getAlbumPic);

module.exports = router;