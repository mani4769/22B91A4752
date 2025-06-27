const axios = require('axios');
const fs = require('fs');
const path = require('path');

const LOG_API_URL = process.env.EVALUATION_SERVICE_URL || 'http://20.244.56.144/evaluation-service/logs';
const LOG_FILE = path.join(__dirname, 'application.log');
async function log(stack, level, pkg, message) {
  const timestamp = new Date().toISOString();
  const logEntry = '[' + timestamp + '] [' + stack.toUpperCase() + '] [' + level.toUpperCase() + '] [' + pkg.toUpperCase() + '] ' + message;

  console.log(logEntry);

  try {
    fs.appendFileSync(LOG_FILE, logEntry + '\n');
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }

  try {
    const payload = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: pkg.toLowerCase(),
      message,
    };

    const response = await axios.post(LOG_API_URL, payload, {
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.status === 200) {
      console.log('Log sent to evaluation service successfully');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Log service requires authentication (expected for testing)');
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.log('Log service unavailable (expected for local testing)');
    } else {
      console.log('Log service error:', error.message);
    }

  }
}

module.exports = { log };
