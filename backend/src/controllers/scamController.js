// src/controllers/scamController.js
const Scam = require('../models/scam');
const { getScreenshot } = require('../services/screenshotService');
const axios = require('axios');

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
 * SMART SCAN WITH VIRUSTOTAL INTEGRATION
 * - Database lookup first
 * - Fresh scan + real threat intelligence if new
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

    // Step 1: Check database first
    let scam = await Scam.findOne({ name: normalizedUrl });

    if (scam) {
      console.log(`Existing entry found: ${normalizedUrl}`);
      return res.json({
        fromDatabase: true,
        screenshot: scam.screenshot,
        verdict: scam.verdict || "High Risk",
        explanation: scam.explanation || "Previously identified as risky",
        flags: scam.flags || ["Known risk"],
        reports: scam.reports,
        malicious: scam.malicious || 0,
        _id: scam._id
      });
    }

    // Step 2: Fresh scan
    console.log(`New scan + VirusTotal analysis: ${normalizedUrl}`);
    const screenshot = await getScreenshot(url);

    // Step 3: VirusTotal Threat Check
    let vtResult = {
      malicious: 0,
      suspicious: 0,
      harmless: 0,
      undetected: 0,
      flags: []
    };

    if (process.env.VIRUSTOTAL_API_KEY) {
      try {
        // Submit URL
        const submitRes = await axios.post(
          'https://www.virustotal.com/api/v3/urls',
          new URLSearchParams({ url: normalizedUrl }),
          {
            headers: {
              'x-apikey': process.env.VIRUSTOTAL_API_KEY,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );

        const analysisId = submitRes.data.data.id.split('-')[1];

        // Wait for analysis (VT needs time)
        await new Promise(resolve => setTimeout(resolve, 8000));

        // Get report
        const reportRes = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
          headers: { 'x-apikey': process.env.VIRUSTOTAL_API_KEY }
        });

        const stats = reportRes.data.data.attributes.stats;
        vtResult = {
          malicious: stats.malicious || 0,
          suspicious: stats.suspicious || 0,
          harmless: stats.harmless || 0,
          undetected: stats.undetected || 0
        };

        if (vtResult.malicious > 0) vtResult.flags.push(`${vtResult.malicious} engines detected malware`);
        if (vtResult.suspicious > 0) vtResult.flags.push(`${vtResult.suspicious} engines flagged suspicious`);
        if (vtResult.malicious + vtResult.suspicious > 5) vtResult.flags.push("High threat level");

      } catch (vtErr) {
        console.warn('VirusTotal failed:', vtErr.response?.data || vtErr.message);
        vtResult.flags.push("Threat check unavailable");
      }
    } else {
      console.warn('VIRUSTOTAL_API_KEY not set');
      vtResult.flags.push("Threat intelligence disabled");
    }

    // Step 4: Final verdict
    const isMalicious = vtResult.malicious > 0 || vtResult.suspicious > 3;
    const verdict = isMalicious ? "High Risk" : vtResult.malicious + vtResult.suspicious > 0 ? "Medium Risk" : "Low Risk";
    
    const explanation = isMalicious
      ? `VirusTotal detected serious threats: ${vtResult.malicious} malicious and ${vtResult.suspicious} suspicious engines flagged this site.`
      : `VirusTotal scan: ${vtResult.malicious} malicious, ${vtResult.suspicious} suspicious detections. Exercise caution.`;

    const flags = [
      ...vtResult.flags,
      "Screenshot captured",
      verdict === "High Risk" ? "Immediate action recommended" : "Monitor closely"
    ];

    // Step 5: Save to DB
    scam = new Scam({
      name: normalizedUrl,
      title: url,
      summary: explanation.slice(0, 200),
      category: "Website",
      tags: ["vt-scanned", verdict.toLowerCase().replace(' ', '-')],
      screenshot,
      verdict,
      explanation,
      flags,
      malicious: vtResult.malicious,
      reports: 0,
      communitySafe: verdict === "Low Risk" ? 80 : verdict === "Medium Risk" ? 40 : 5
    });

    await scam.save();

    res.json({
      fromDatabase: false,
      screenshot,
      verdict,
      explanation,
      flags,
      malicious: vtResult.malicious,
      suspicious: vtResult.suspicious,
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
 * REPORT SCAM ENDPOINT
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
      scam.reports += 1;
      scam.tags = [...new Set([...(scam.tags || []), 'user-reported'])];
      if (reason) {
        scam.summary = (scam.summary || '') + ` | User reason: ${reason}`;
      }
      if (screenshot) scam.screenshot = screenshot;
      scam.communitySafe = Math.max(0, (scam.communitySafe || 50) - 10);
    } else {
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
    console.error('REPORT ENDPOINT ERROR:', err);
    res.status(500).json({ 
      error: 'Failed to save report',
      details: process.env.NODE_ENV === 'development' ? err.message : 'Internal error'
    });
  }
};