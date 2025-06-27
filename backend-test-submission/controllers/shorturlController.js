
const urlModel = require('../models/urlModel');
const generateShortcode = require('../utils/generateShortcode');
const { log } = require('../../logging-middleware/logger');


exports.createShortUrl = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  log('backend', 'info', 'controller', 'Create short URL request received');

  if (!url) {
    log('backend', 'error', 'controller', 'URL field is required but not provided');
    return res.status(400).json({ error: 'URL is required' });
  }


  try {
    new URL(url);
  } catch (error) {
    log('backend', 'error', 'controller', 'Invalid URL format provided: ' + url);
    return res.status(400).json({ error: 'Invalid URL format' });
  }


  const code = shortcode || generateShortcode();
  

  if (shortcode && urlModel.getUrl(shortcode)) {
    log('backend', 'warn', 'controller', 'Shortcode already in use: ' + shortcode);
    return res.status(409).json({ error: 'Shortcode already exists' });
  }
  const expiry = new Date(Date.now() + validity * 60000).toISOString();
  try {
    urlModel.saveUrl({ url, code, expiry });
    log('backend', 'info', 'controller', 'Short URL created with code: ' + code);
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    res.json({ 
      shortLink: baseUrl + '/' + code, 
      expiry,
      shortcode: code
    });
  } catch (error) {
    log('backend', 'error', 'controller', 'Error saving URL: ' + error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getShortUrlStats = (req, res) => {
  const { shortcode } = req.params; 
  log('backend', 'info', 'controller', 'Stats requested for: ' + shortcode); 
  const urlData = urlModel.getUrl(shortcode);
  if (!urlData) {
    log('backend', 'warn', 'controller', 'Shortcode not found: ' + shortcode);
    return res.status(404).json({ error: 'Shortcode not found' });
  }
  const response = {
    shortcode: shortcode,
    url: urlData.url,
    createdAt: urlData.createdAt,
    expiry: urlData.expiry,
    clicks: urlData.clicks
  };
  log('backend', 'info', 'controller', 'Stats retrieved for: ' + shortcode);
  res.json(response);
};
