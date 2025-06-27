const fs = require('fs');
const path = require('path');
const DB_FILE = path.join(__dirname, '../data/db.json');

let urls = {};

function loadData() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      if (data.trim()) {
        urls = JSON.parse(data);
        console.log('Database loaded successfully');
      }
    } else {
      console.log('No existing database found, starting fresh');
    }
  } catch (error) {
    console.error('Error loading database:', error.message);
    urls = {};
  }
}
function saveData() {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(DB_FILE, JSON.stringify(urls, null, 2));
  } catch (error) {
    console.error('Error saving database:', error.message);
  }
}
loadData();
exports.saveUrl = ({ url, code, expiry }) => {
  urls[code] = { 
    url, 
    expiry, 
    clicks: 0, 
    createdAt: new Date().toISOString()
  };
  saveData();
  console.log('URL saved: ' + code + ' -> ' + url);
};
exports.getUrl = (code) => {
  return urls[code];
};
exports.incrementClicks = (code) => {
  if (urls[code]) {
    urls[code].clicks += 1;
    saveData();
    console.log('Click count updated for ' + code + ': ' + urls[code].clicks);
  }
};
exports.getAllUrls = () => {
  return urls;
};

