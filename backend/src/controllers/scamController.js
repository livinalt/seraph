// src/controllers/scamController.js
const Scam = require('../models/scam');
const { getScreenshot } = require('../services/screenshotService');

exports.getScams = async (req, res) => {
  try {
    let { search, category, tags, page = 1, limit = 9 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    if (search) {
      query.$text = { $search: search.trim() };
    }
    if (category) {
      query.category = category;
    }
    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim());
      query.tags = { $all: tagArray };
    }

    const scams = await Scam.find(query)
      .sort({ reports: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Scam.countDocuments(query);

    res.json({ scams, total, page, limit });
  } catch (err) {
    console.error('getScams error:', err);
    res.status(500).json({ error: 'Failed to fetch scams' });
  }
};

exports.getScamById = async (req, res) => {
  try {
    const scam = await Scam.findById(req.params.id);
    if (!scam) return res.status(404).json({ error: 'Scam not found' });
    res.json(scam);
  } catch (err) {
    console.error('getScamById error:', err);
    res.status(500).json({ error: 'Failed to fetch scam' });
  }
};

/**
 * SMART SCAN: Check DB first → fresh scan if new
 */
exports.scanUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({ error: 'Valid URL is required' });
    }

    let normalizedUrl = url.trim().toLowerCase();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = 'https://' + normalizedUrl.replace(/^https?:\/\//i, '');
    }

    // Step 1: Search database first (fast path)
    let scam = await Scam.findOne({ name: normalizedUrl });

    if (scam) {
      console.log(`Existing scam found for ${normalizedUrl}`);
      return res.json({
        fromDatabase: true,
        screenshot: scam.screenshot,
        verdict: scam.verdict || "High Risk",
        explanation: scam.explanation || "Previously reported by community",
        flags: scam.flags || ["Known scam", "Multiple reports"],
        reports: scam.reports,
        _id: scam._id
      });
    }

    // Step 2: New URL — perform fresh scan
    console.log(`New scan for ${normalizedUrl}`);
    const screenshot = await getScreenshot(url);

    // Mock AI result — replace with real AI later
    const verdict = "High Risk";
    const explanation = "AI analysis detected multiple red flags: new domain, suspicious patterns, no verified team.";
    const flags = [
      "New domain detected",
      "No verified ownership",
      "Suspicious content patterns",
      "Screenshot captured"
    ];

    // Save to database for future fast lookup
    scam = new Scam({
      name: normalizedUrl,
      title: url,
      summary: "Automatically scanned project",
      category: "Website",
      tags: ["auto-scanned", "high-risk"],
      screenshot,
      verdict,
      explanation,
      flags,
      reports: 0,
      communitySafe: 15
    });

    await scam.save();

    res.json({
      fromDatabase: false,
      screenshot,
      verdict,
      explanation,
      flags,
      reports: 0,
      _id: scam._id
    });

  } catch (err) {
    console.error('SCAN ENDPOINT CRASH:', err);
    res.status(500).json({ 
      error: 'Scan failed',
      details: process.env.NODE_ENV === 'development' ? err.message : 'Internal error'
    });
  }
};

/**
 * REPORT SCAM: Create or update entry
 */
exports.reportScam = async (req, res) => {
  try {
    const { website, projectName, reason = '', title = '', summary = '', category = 'Website' } = req.body;

    if (!website && !projectName) {
      return res.status(400).json({ error: 'Website or project name required' });
    }

    const domain = (website || projectName).trim().toLowerCase();
    let normalizedDomain = domain;
    if (!/^https?:\/\//i.test(normalizedDomain)) {
      normalizedDomain = 'https://' + normalizedDomain.replace(/^https?:\/\//i, '');
    }

    let scam = await Scam.findOne({ name: normalizedDomain });

    // Get fresh screenshot if possible
    let screenshot = null;
    if (website) {
      screenshot = await getScreenshot(website);
    }

    if (scam) {
      // Update existing
      scam.reports += 1;
      scam.tags = [...new Set([...(scam.tags || []), 'user-reported'])];
      if (reason) {
        scam.summary = (scam.summary || '') + ` | User reason: ${reason}`;
      }
      if (screenshot) scam.screenshot = screenshot;
      scam.communitySafe = Math.max(0, (scam.communitySafe || 50) - 10); // Lower safety score
    } else {
      // Create new
      scam = new Scam({
        name: normalizedDomain,
        title: title || projectName || website,
        summary: summary || reason || "User-reported suspicious project",
        category,
        tags: ['user-reported'],
        explanation: "Reported by community member. Investigation pending.",
        screenshot,
        reports: 1,
        communitySafe: 10
      });
    }

    await scam.save();
    console.log(`Report saved: ${scam._id} - Reports: ${scam.reports}`);

    res.json({ success: true, scam });
  } catch (err) {
    console.error('REPORT ENDPOINT CRASH:', err);
    res.status(500).json({ 
      error: 'Failed to save report',
      details: process.env.NODE_ENV === 'development' ? err.message : 'Internal error'
    });
  }
};