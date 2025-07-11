const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getShortUrlStats
} = require('../controllers/urlController');

router.post('/shorten', createShortUrl);
router.get('/shorturls/:shortCode', getShortUrlStats);

module.exports = router;
