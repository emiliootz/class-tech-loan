function sendResponse(res, status, data = {}, message = '') {
    res.status(status).json({
      success: status >= 200 && status < 300,
      message,
      data
    });
  }
  
  module.exports = sendResponse;
  