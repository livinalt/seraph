const mongoose = require('mongoose');

const ScamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, lowercase: true }, // e.g. "fakeproject.io"
  title: { type: String, required: true }, // "FakeProject Rug Pull"
  summary: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Token', 'Website', 'NFT', 'Cloud Mining', 'Impersonation'],
    required: true 
  },
  tags: [{ type: String }], // e.g. ["rug-pull", "phishing"]
  reports: { type: Number, default: 1 },
  firstSeen: { type: Date, default: Date.now },
  screenshot: { type: String }, // URL from Microlink
  communitySafe: { type: Number, default: 10, min: 0, max: 100 },
  explanation: { type: String, required: true },
  logoUrl: { type: String },
  reportedBy: [{ type: String }] // optional: track IPs or user IDs later
}, { timestamps: true });

// Text index for search
ScamSchema.index({ title: 'text', name: 'text', summary: 'text', tags: 'text' });

module.exports = mongoose.model('Scam', ScamSchema);