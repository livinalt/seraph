// src/controllers/scamController.js
const Scam = require('../models/scam');
const { websiteScan } = require('../services/scan/websiteScan');
const { contractScan } = require('../services/scan/contractScan');
const { tokenScan } = require('../services/scan/tokenScan');
const { ensScan } = require('../services/scan/ensScan');
const { teamScan } = require('../services/scan/teamScan');
const { projectScan } = require('../services/scan/projectScan');

exports.getScams = async (req, res) => {
  try {
    let { search, category, tags, page = 1, limit = 9 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};

    if (search) query.$text = { $search: search.trim() };
    if (category) query.category = category;
    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim());
      if (tagArray.length > 0) query.tags = { $all: tagArray };
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

exports.scanUrl = async (req, res) => {
  try {
    let { url, type = 'website' } = req.body;

    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({ error: 'Valid input required' });
    }

    url = url.trim().toLowerCase();

    // Auto-detect ENS
    if (url.endsWith('.eth')) {
      type = 'ens';
    }

    let normalized = url;
    if (type === 'website' && !/^https?:\/\//i.test(normalized)) {
      normalized = 'https://' + normalized;
    }

    // Check database first
    let scam = await Scam.findOne({ name: normalized });
    if (scam) {
      console.log(`Cache hit for ${normalized}`);
      return res.json({ ...scam.toObject(), fromDatabase: true });
    }

    // Perform category-specific scan
    let result = {
      verdict: "High Risk",
      explanation: "Analysis complete.",
      flags: [],
      details: {}
    };

    try {
      switch (type) {
        case 'website':
          const web = await websiteScan(normalized);
          result.details = web.details;
          result.flags = web.flags;
          result.explanation = "Website scanned for domain age and malware.";
          break;

        case 'contract':
          const contract = await contractScan(url);
          result.details = contract.details;
          result.flags = contract.flags;
          result.explanation = "Contract scanned for honeypot and verification.";
          break;

        case 'token':
          const token = await tokenScan(url);
          result.details = token.details;
          result.flags = token.flags;
          result.explanation = "Token analyzed for market cap and liquidity.";
          break;

        case 'ens':
          const ens = await ensScan(url);
          result.details.resolvedAddress = ens.resolvedAddress;
          result.flags.push('ENS resolved');

          // Then scan as contract
const contractResult = await contractScan(ensResult.resolvedAddress);
        result.details.contract = contractResult.details;
        result.flags.push(...contractResult.flags);
        result.explanation = "ENS name resolved and scanned as contract.";
        break;

        case 'team':
          const team = await teamScan();
          result.details = team.details;
          result.flags = team.flags;
          result.explanation = "Team reputation check.";
          break;

        case 'project':
          const project = await projectScan();
          result.details = project.details;
          result.flags = project.flags;
          result.explanation = "Project database search.";
          break;

        default:
          return res.status(400).json({ error: 'Invalid scan type' });
      }
    } catch (scanErr) {
      console.error(`Scan failed for type ${type}:`, scanErr);
      result.flags.push('Analysis error');
      result.details.error = scanErr.message;
    }

    // Save result
    scam = await Scam.findOneAndUpdate(
      { name: normalized },
      {
        $set: {
          title: url,
          category: type,
          verdict: result.verdict,
          explanation: result.explanation,
          flags: result.flags,
          details: result.details,
          lastScanned: new Date()
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      ...result,
      fromDatabase: false,
      reports: scam.reports || 0,
      _id: scam._id
    });

  } catch (err) {
    console.error('SCAN ENDPOINT CRASH:', err);
    res.status(500).json({ error: 'Scan failed', details: err.message });
  }
};

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

    let screenshot = null;
    if (website) {
      screenshot = await require('../services/screenshotService').getScreenshot(website);
    }

    if (scam) {
      scam.reports += 1;
      scam.tags = [...new Set([...(scam.tags || []), 'user-reported'])];
      if (reason) scam.summary = (scam.summary || '') + ` | User reason: ${reason}`;
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
    res.status(500).json({ error: 'Failed to save report' });
  }
};