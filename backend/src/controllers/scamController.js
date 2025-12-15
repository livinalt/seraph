const Scam = require('../models/scam');
const screenshotService = require('../services/screenshotService');

exports.getScams = async (req, res) => {
  try {
    const { search, category, tags, page = 1, limit = 9 } = req.query;
    const query = {};

    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (tags) query.tags = { $all: tags.split(',') };

    const scams = await Scam.find(query)
      .sort({ reports: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Scam.countDocuments(query);

    res.json({ scams, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getScam = async (req, res) => {
  try {
    const scam = await Scam.findById(req.params.id);
    if (!scam) return res.status(404).json({ error: "Not found" });
    res.json(scam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.scanUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL required" });

    const screenshot = await screenshotService.getScreenshot(url);

    // Mock AI result (replace with real logic later)
    res.json({
      screenshot,
      verdict: "High Risk",
      flags: [
        "Domain registered less than 30 days ago",
        "Contract contains high-risk functions",
        "No team verification",
        "Associated with flagged addresses",
      ],
      explanation: "AI detected multiple red flags including new domain, unsafe contract patterns, and suspicious tokenomics."
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};