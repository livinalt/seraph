// src/services/screenshotService.js
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const APIFLASH_KEY = process.env.APIFLASH_KEY?.trim();


const PLACEHOLDER = 'https://placehold.co/800x600/1a1a1c/ffffff?text=No+Preview+Available&font=roboto';

if (!APIFLASH_KEY) {
  console.warn('⚠️  APIFLASH_KEY not set in .env — using placeholder images');
}

const getScreenshot = async (url) => {
  if (!url?.trim()) {
    console.warn('No URL provided to getScreenshot');
    return PLACEHOLDER;
  }

  if (!APIFLASH_KEY) {
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
        delay: 3,
        response_type: 'json' // Important: get JSON with image URL
      },
      timeout: 20000
    });

    // ApiFlash returns { url: "https://s3.amazonaws.com/...jpg" }
    if (response.data && response.data.url) {
      console.log('✅ Screenshot captured:', response.data.url);
      return response.data.url;
    } else {
      console.warn('ApiFlash returned no image URL:', response.data);
      return PLACEHOLDER;
    }
  } catch (err) {
    if (err.response) {
      console.error(`ApiFlash error ${err.response.status}:`, err.response.data);
    } else if (err.code === 'ECONNABORTED') {
      console.error('ApiFlash timeout');
    } else {
      console.error('ApiFlash request failed:', err.message);
    }
    return PLACEHOLDER;
  }
};

module.exports = { getScreenshot };