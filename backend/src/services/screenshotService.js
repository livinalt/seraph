const axios = require('axios');

exports.getScreenshot = async (url) => {
  try {
    const response = await axios.get('https://api.microlink.io', {
      params: {
        url,
        screenshot: true,
        meta: false,
        embed: 'screenshot.url'
      }
    });
    return response.data.data.screenshot.url || null;
  } catch (err) {
    console.error("Screenshot failed:", err.message);
    return null;
  }
};