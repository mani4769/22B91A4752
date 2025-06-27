require('dotenv').config();
const express = require('express');
const shorturlRoutes = require('./routes/shorturl');
const urlModel = require('./models/urlModel');
const loggingMiddleware = require('../logging-middleware/middleware');
const { log } = require('../logging-middleware/logger');

const app = express();

app.use(express.json());
app.use(loggingMiddleware);

app.use('/shorturls', shorturlRoutes);

app.get('/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  
  log('backend', 'info', 'handler', 'Redirect request for: ' + shortcode);
  
  const urlData = urlModel.getUrl(shortcode);

  if (!urlData) {
    log('backend', 'warn', 'handler', 'Shortcode not found: ' + shortcode);
    return res.status(404).send('Shortcode not found');
  }

  if (new Date() > new Date(urlData.expiry)) {
    log('backend', 'warn', 'handler', 'Link expired for: ' + shortcode);
    return res.status(410).send('Link has expired');
  }
  urlModel.incrementClicks(shortcode);
  log('backend', 'info', 'handler', 'Redirecting to: ' + urlData.url);
  res.redirect(urlData.url);
});

app.use((error, req, res, next) => {
  log('backend', 'error', 'handler', 'Unhandled error: ' + error.message);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  log('backend', 'info', 'handler', 'Server started on port ' + PORT);
  const baseUrl = process.env.BASE_URL || ('http://localhost:' + PORT);
  console.log('Server running on ' + baseUrl);
});
