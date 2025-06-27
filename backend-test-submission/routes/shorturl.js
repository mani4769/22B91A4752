const express = require('express');
const shorturlController = require('../controllers/shorturlController');

const router = express.Router();
router.post('/', shorturlController.createShortUrl);
router.get('/:shortcode', shorturlController.getShortUrlStats);

module.exports = router;

