const Scam = require('../models/scam');

exports.reportScam = async (req, res) => {
  try {
    const { projectName, website, contract, reason, evidence } = req.body;

    let scam = await Scam.findOne({ name: website?.toLowerCase() || projectName?.toLowerCase() });

    if (scam) {
      scam.reports += 1;
      scam.tags = [...new Set([...scam.tags, "user-reported"])];
    } else {
      scam = new Scam({
        name: website || projectName,
        title: `${projectName || website} — Reported Scam`,
        summary: reason || "User-reported suspicious project",
        category: "Website", // default, can improve later
        tags: ["user-reported"],
        explanation: "This project was reported by a community member. Investigation pending.",
        screenshot: "", // can fill later via job
        reports: 1
      });
    }

    await scam.save();
    res.json({ success: true, scam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};