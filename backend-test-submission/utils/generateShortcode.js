const crypto = require('crypto');

// Generate a random 6-character shortcode
function generateShortcode() {
  return crypto.randomBytes(3).toString('hex');
}

module.exports = generateShortcode;
