// src/controllers/reportController.js
const Scam = require('../models/scam');
const { getScreenshot } = require('../services/screenshotService');

exports.reportScam = async (req, res) => {
  try {
    console.log('Report request received:', req.body); // Debug log

    const { website, reason = '', title = '', summary = '', category = 'Website' } = req.body;

    if (!website || typeof website !== 'string') {
      return res.status(400).json({ error: 'Valid website URL is required' });
    }

    const normalizedUrl = website.trim().toLowerCase();

    // Find existing or create new
    let scam = await Scam.findOne({ name: normalizedUrl });

    // Try to get screenshot (won't crash if fails)
    let screenshot = null;
    try {
      screenshot = await getScreenshot(website);
    } catch (screenshotErr) {
      console.warn('Screenshot failed during report:', screenshotErr.message);
    }

    if (scam) {
      // Update existing
      scam.reports += 1;
      scam.tags = [...new Set([...(scam.tags || []), 'user-reported'])];
      if (reason) {
        scam.summary = (scam.summary || '') + ` | User reason: ${reason}`;
      }
      if (screenshot) scam.screenshot = screenshot;
    } else {
      // Create new
      scam = new Scam({
        name: normalizedUrl,
        title: title || website,
        summary: summary || reason || "User-reported suspicious project",
        category,
        tags: ['user-reported'],
        explanation: "Reported by community member via scan tool. Investigation pending.",
        screenshot,
        reports: 1,
        communitySafe: 15, // Default score
        logoUrl: screenshot || 'https://placehold.co/150?text=SCAM'
      });
    }

    await scam.save();
    console.log('Report saved successfully:', scam._id);

    res.json({ success: true, scam });
  } catch (err) {
    console.error('REPORT ENDPOINT CRASH:', err);
    console.error(err.stack);
    res.status(500).json({ 
      error: 'Failed to save report',
      details: err.message 
    });
  }
};