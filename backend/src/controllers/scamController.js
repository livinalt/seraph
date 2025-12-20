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
      if (tagArray.length > 0) {
        query.tags = { $all: tagArray };
      }
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
 * SMART SCAN ENDPOINT
 * - Checks database first (fast path)
 * - If not found, performs fresh scan and saves result
 */
exports.scanUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string' || url.trim() === '') {
      return res.status(400).json({ error: 'Valid URL is required' });
    }

    let normalizedUrl = url.trim().toLowerCase();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = 'https://' + normalizedUrl.replace(/^https?:\/\//i, '');
    }

    // Step 1: Check if already in database
    let scam = await Scam.findOne({ name: normalizedUrl });

    if (scam) {
      console.log(`Found existing scam in DB: ${normalizedUrl}`);
      return res.json({
        fromDatabase: true,
        screenshot: scam.screenshot,
        verdict: scam.verdict || "High Risk",
        explanation: scam.explanation || "Previously identified as risky",
        flags: scam.flags || ["Known scam", "Community reported"],
        reports: scam.reports,
        _id: scam._id
      });
    }

    // Step 2: New URL — perform fresh scan
    console.log(`Performing fresh scan for: ${normalizedUrl}`);
    const screenshot = await getScreenshot(url);

    // Mock analysis (replace with real AI later)
    const verdict = "High Risk";
    const explanation = "AI analysis detected multiple red flags: new domain, suspicious patterns, lack of verified information.";
    const flags = [
      "New domain detected",
      "No verified team or ownership",
      "Suspicious content patterns",
      "Screenshot captured"
    ];

    // Save new result to database
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
      communitySafe: 10
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
    console.error('SCAN ENDPOINT ERROR:', err);
    res.status(500).json({ 
      error: 'Scan failed',
      details: process.env.NODE_ENV === 'development' ? err.message : 'Internal error'
    });
  }
};

/**
 * REPORT SCAM ENDPOINT
 * - Creates or updates existing entry
 * - Integrates with scan flow
 */
exports.reportScam = async (req, res) => {
  try {
    const { website, projectName, reason = '', title = '', summary = '', category = 'Website' } = req.body;

    if (!website && !projectName) {
      return res.status(400).json({ error: 'Website or project name is required' });
    }

    const domain = (website || projectName).trim().toLowerCase();
    let normalizedDomain = domain;
    if (!/^https?:\/\//i.test(normalizedDomain)) {
      normalizedDomain = 'https://' + normalizedDomain.replace(/^https?:\/\//i, '');
    }

    let scam = await Scam.findOne({ name: normalizedDomain });

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
    console.log(`Report saved: ${scam._id} - Total reports: ${scam.reports}`);

    res.json({ success: true, scam });
  } catch (err) {
    console.error('REPORT ENDPOINT ERROR:', err);
    res.status(500).json({ 
      error: 'Failed to save report',
      details: process.env.NODE_ENV === 'development' ? err.message : 'Internal error'
    });
  }
};