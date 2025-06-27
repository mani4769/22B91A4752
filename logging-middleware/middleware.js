const { log } = require('./logger');
function loggingMiddleware(req, res, next) {

  log('backend', 'info', 'middleware', 'Incoming ' + req.method + ' request to ' + req.url);

  const originalSend = res.send;
  res.send = function(data) {
    const statusCode = res.statusCode;
    if (statusCode >= 400) {
      log('backend', 'error', 'middleware', 'Response ' + statusCode + ' for ' + req.method + ' ' + req.url);
    } else {
      log('backend', 'info', 'middleware', 'Response ' + statusCode + ' for ' + req.method + ' ' + req.url);
    }
    return originalSend.call(this, data);
  };
  
  next();
}

module.exports = loggingMiddleware;
