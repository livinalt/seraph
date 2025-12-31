// src/services/screenshotService.js
const axios = require('axios');

const APIFLASH_KEY = process.env.APIFLASH_KEY?.trim();

const PLACEHOLDER = 'https://placehold.co/800x600/1a1a1c/ffffff?text=Preview+Blocked+or+Timeout&font=roboto';

const getScreenshot = async (url) => {
  if (!url?.trim() || !APIFLASH_KEY) {
    return PLACEHOLDER;
  }

  let formattedUrl = url.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = `https://${formattedUrl}`;
  }

  try {
    const response = await axios.get('https://api.apiflash.com/v1/urltoimage', {
      params: {
        access_key: APIFLASH_KEY,
        url: formattedUrl,
        format: 'jpeg',
        width: 1200,
        height: 800,
        thumbnail_width: 800,
        no_ads: true,
        no_cookie_banners: true,
        delay: 5, // Increased delay for slow sites
        response_type: 'json'
      },
      timeout: 30000 // 30 seconds (was 20k = 20 seconds)
    });

    if (response.data && response.data.url) {
      return response.data.url;
    }

    console.warn('ApiFlash returned no image:', response.data);
    return PLACEHOLDER;
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      console.warn('ApiFlash timeout for:', formattedUrl);
    } else if (err.response) {
      console.warn(`ApiFlash error ${err.response.status}:`, err.response.data);
    } else {
      console.warn('ApiFlash failed:', err.message);
    }
    return PLACEHOLDER;
  }
};

module.exports = { getScreenshot };