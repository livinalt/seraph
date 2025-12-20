// src/controllers/scamController.js
const Scam = require('../models/scam');
const { getScreenshot } = require('../services/screenshotService');
const { Alchemy, Network } = require('alchemy-sdk');

const alchemyConfig = {
  apiKey: process.env.ALCHEMY_API_KEY,
};

// Supported chains - easy to extend
const CHAIN_MAP = {
  eth: Network.ETH_MAINNET,
  polygon: Network.POLYGON_MAINNET,
  bsc: Network.BNB_MAINNET,
  arbitrum: Network.ARB_MAINNET,
  optimism: Network.OPT_MAINNET,
  base: Network.BASE_MAINNET,
  // Add more as needed
};

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
 * MULTI-CHAIN SMART SCAN
 */
exports.scanUrl = async (req, res) => {
  try {
    const { url, chain = 'eth' } = req.body; // Allow chain override

    if (!url || typeof url !== 'string' || url.trim() === '') {
      return res.status(400).json({ error: 'Valid URL or contract address required' });
    }

    let normalizedUrl = url.trim().toLowerCase();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = 'https://' + normalizedUrl.replace(/^https?:\/\//i, '');
    }

    // Step 1: Check database first
    let scam = await Scam.findOne({ name: normalizedUrl });

    if (scam) {
      return res.json({
        fromDatabase: true,
        screenshot: scam.screenshot,
        verdict: scam.verdict || "High Risk",
        explanation: scam.explanation || "Previously reported",
        flags: scam.flags || ["Known risk"],
        reports: scam.reports,
        chainRisks: scam.chainRisks || [],
        _id: scam._id
      });
    }

    // Step 2: Fresh scan
    const screenshot = await getScreenshot(url);

    // Step 3: Multi-chain contract analysis
    let chainRisks = [];
    let contractType = "None";
    let tokenName = "Unknown";

    const contractMatch = url.match(/0x[a-fA-F0-9]{40}/i);
    if (contractMatch && process.env.ALCHEMY_API_KEY) {
      const contractAddress = contractMatch[0];
      const selectedNetwork = CHAIN_MAP[chain] || Network.ETH_MAINNET;

      try {
        const alchemy = new Alchemy({ ...alchemyConfig, network: selectedNetwork });

        // Get token metadata if ERC20
        const metadata = await alchemy.core.getTokenMetadata(contractAddress);
        if (metadata.name || metadata.symbol) {
          contractType = "Token";
          tokenName = metadata.name || metadata.symbol;
          chainRisks.push(`Token: ${tokenName}`);
        }

        // Check ownership (rug risk if single owner)
        const owners = await alchemy.core.getOwnersForContract(contractAddress);
        if (owners?.owners?.length === 1) {
          chainRisks.push("Single owner - high rug risk");
        } else if (owners?.owners?.length > 1) {
          chainRisks.push("Multiple owners - lower rug risk");
        }

        // Check for proxy pattern (upgradable = risk)
        const code = await alchemy.core.getCode(contractAddress);
        if (code.includes('delegatecall') || code.includes('callcode')) {
          chainRisks.push("Proxy contract - upgrade risk");
        }

      } catch (chainErr) {
        console.warn(`Alchemy analysis failed on ${chain}:`, chainErr.message);
        chainRisks.push("Blockchain analysis unavailable");
      }
    }

    // Step 4: Final verdict
    const hasChainRisk = chainRisks.some(r => r.includes('rug') || r.includes('Proxy'));
    const verdict = hasChainRisk ? "High Risk" : contractType !== "None" ? "Medium Risk" : "Low Risk";

    const explanation = contractType !== "None"
      ? `Blockchain analysis: ${contractType} contract "${tokenName}" detected on ${chain.toUpperCase()}. Risks: ${chainRisks.join(', ')}`
      : "No blockchain contract detected in input";

    const flags = [
      contractType !== "None" ? `Contract: ${contractType}` : "No contract",
      ...chainRisks,
      "Screenshot captured"
    ];

    // Step 5: Save to DB
    scam = new Scam({
      name: normalizedUrl,
      title: url,
      summary: explanation.slice(0, 200),
      category: contractType !== "None" ? "Token" : "Website",
      tags: ["multi-chain-scanned", verdict.toLowerCase().replace(' ', '-')],
      screenshot,
      verdict,
      explanation,
      flags,
      chainRisks,
      reports: 0,
      communitySafe: verdict === "Low Risk" ? 80 : verdict === "Medium Risk" ? 50 : 10
    });

    await scam.save();

    res.json({
      fromDatabase: false,
      screenshot,
      verdict,
      explanation,
      flags,
      chainRisks,
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
 * REPORT SCAM (unchanged - works with multi-chain)
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