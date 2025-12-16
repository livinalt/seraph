// src/services/screenshotService.js
const axios = require('axios');

const APIFLASH_KEY = process.env.APIFLASH_KEY;

if (!APIFLASH_KEY) {
  console.warn('APIFLASH_KEY not set — screenshots will be placeholder');
}

const getScreenshot = async (url) => {
  if (!url || !APIFLASH_KEY) {
    // Fixed: Working placeholder service
    return 'https://placehold.co/800x600/1a1a1c/ffffff?text=No+Preview+Available&font=roboto';
  }

  let formattedUrl = url.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = 'https://' + formattedUrl;
  }

  try {
    const apiUrl = 'https://api.apiflash.com/v1/urltoimage';
    const response = await axios.get(apiUrl, {
      params: {
        access_key: APIFLASH_KEY,
        url: formattedUrl,
        format: 'jpeg',
        width: 1200,
        height: 800,
        thumbnail_width: 800,
        response_type: 'json',
        no_ads: true,
        no_cookie_banners: true,
        delay: 3
      },
      timeout: 20000
    });

    if (response.data && response.data.url) {
      return response.data.url;
    }

    console.warn('ApiFlash no image URL:', response.data);
    return 'https://placehold.co/800x600/1a1a1c/ffffff?text=No+Preview+Available&font=roboto';
  } catch (err) {
    console.error('ApiFlash screenshot failed:', err.response?.data || err.message);
    return 'https://placehold.co/800x600/1a1a1c/ffffff?text=No+Preview+Available&font=roboto';
  }
};

module.exports = { getScreenshot };