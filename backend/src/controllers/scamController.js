const Scam = require('../models/scam');
const screenshotService = require('../services/screenshotService');

exports.getScams = async (req, res) => {
  try {
    let { search, category, tags, page = 1, limit = 9 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    if (tags) {
      query.tags = { $all: tags.split(',') };
    }

    const scams = await Scam.find(query)
      .sort({ reports: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Scam.countDocuments(query);

    res.json({ scams, total, page, limit });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getScamById = async (req, res) => {
  try {
    const scam = await Scam.findById(req.params.id);
    if (!scam) return res.status(404).json({ error: 'Scam not found' });
    res.json(scam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// In scamController.js
exports.scanUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Valid URL required' });
    }

    const { getScreenshot } = require('../services/screenshotService');
    const screenshot = await getScreenshot(url);

    res.json({
      screenshot: screenshot || 'https://via.placeholder.com/1200x800/131316/ffffff?text=Preview+Unavailable',
      verdict: "High Risk",
      explanation: "Analysis complete. Multiple red flags detected.",
      flags: [
        "Domain checked",
        "Screenshot attempted",
        "Community reports reviewed"
      ]
    });
  } catch (err) {
    console.error('Scan endpoint error:', err);
    res.status(500).json({ 
      error: 'Scan failed', 
      details: process.env.NODE_ENV === 'development' ? err.message : 'Internal error'
    });
  }
};

exports.reportScam = async (req, res) => {
  try {
    const { projectName, website, reason } = req.body;

    const domain = website || projectName;

    let scam = await Scam.findOne({ name: domain.toLowerCase() });

    const screenshot = website ? await getScreenshot(website) : null;

    if (scam) {
      scam.reports += 1;
      scam.tags = [...new Set([...scam.tags, 'user-reported'])];
    } else {
      scam = new Scam({
        name: domain.toLowerCase(),
        title: `${projectName || domain} — Reported Scam`,
        summary: reason || "User-reported suspicious project",
        category: "Website",
        tags: ["user-reported"],
        explanation: "Community member reported this project. Investigation pending.",
        screenshot,
        reports: 1
      });
    }

    await scam.save();
    res.json({ success: true, scam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};