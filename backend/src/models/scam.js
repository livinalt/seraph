const mongoose = require('mongoose');

const ScamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, lowercase: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Token', 'Website', 'NFT', 'Cloud Mining', 'Impersonation'],
    required: true 
  },
  tags: [{ type: String }],
  reports: { type: Number, default: 1 },
  firstSeen: { type: Date, default: Date.now },
  screenshot: { type: String },
  communitySafe: { type: Number, default: 10, min: 0, max: 100 },
  explanation: { type: String, required: true },
  logoUrl: { type: String }
}, { timestamps: true });

// Full-text search index
ScamSchema.index({ title: 'text', name: 'text', summary: 'text', tags: 'text' });

module.exports = mongoose.model('Scam', ScamSchema);