// src/services/scan/websiteScan.js
const whois = require('whois-json');
const axios = require('axios');
const { getScreenshot } = require('../screenshotService');

const VIRUSTOTAL_KEY = process.env.VIRUSTOTAL_API_KEY;

const websiteScan = async (url) => {
  const screenshot = await getScreenshot(url);
  const details = { screenshot };
  const flags = [];

  // Domain age
  try {
    const whoisData = await whois(url);
    if (whoisData.createdDate) {
      const ageDays = Math.floor((Date.now() - new Date(whoisData.createdDate)) / 86400000);
      details.domainAgeDays = ageDays;
      if (ageDays < 30) flags.push(`New domain (${ageDays} days old)`);
    }
  } catch (e) {
    details.domainAgeError = 'WHOIS lookup failed';
  }

  // VirusTotal scan (direct API call)
  if (VIRUSTOTAL_KEY) {
    try {
      // First: submit URL for scan
      const submitRes = await axios.post(
        'https://www.virustotal.com/api/v3/urls',
        new URLSearchParams({ url }),
        {
          headers: {
            'x-apikey': VIRUSTOTAL_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      const analysisId = submitRes.data.data.id.split('-')[1];

      // Wait 10 seconds then get report
      await new Promise(resolve => setTimeout(resolve, 10000));

      const reportRes = await axios.get(
        `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
        { headers: { 'x-apikey': VIRUSTOTAL_KEY } }
      );

      const stats = reportRes.data.data.attributes.stats;
      details.malwareScore = stats.malicious + stats.suspicious;
      if (details.malwareScore > 0) {
        flags.push(`Malware detected (${details.malwareScore} engines flagged)`);
      }
    } catch (e) {
      details.malwareError = 'VirusTotal scan unavailable';
    }
  } else {
    details.malwareNote = 'VirusTotal disabled (no key)';
  }

  return { details, flags };
};

module.exports = { websiteScan };