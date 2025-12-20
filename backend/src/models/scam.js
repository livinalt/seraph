// src/models/Scam.js
const mongoose = require('mongoose');

const ScamSchema = new mongoose.Schema({
  // Core identification
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true 
  },
  title: { type: String, required: true },
  summary: { type: String, required: true },

  // Classification
  category: { 
    type: String, 
    enum: ['Token', 'Website', 'NFT', 'Cloud Mining', 'Impersonation', 'Contract'],
    required: true 
  },
  tags: [{ type: String }],

  // Community & Reporting
  reports: { type: Number, default: 1 },
  communitySafe: { type: Number, default: 10, min: 0, max: 100 },

  // Timestamps
  firstSeen: { type: Date, default: Date.now },

  // Media
  screenshot: { type: String },
  logoUrl: { type: String },

  // AI & Analysis Results
  verdict: { 
    type: String, 
    enum: ['Low Risk', 'Medium Risk', 'High Risk'],
    default: 'High Risk'
  },
  explanation: { type: String, required: true },
  flags: [{ type: String }], // e.g. "New domain", "Malware detected", "Single owner"

  // VirusTotal Integration
  malicious: { type: Number, default: 0 },     // Number of engines detecting malware
  suspicious: { type: Number, default: 0 },    // Suspicious detections

  // Multi-Chain Blockchain Analysis
  chainRisks: [{ type: String }],              // e.g. "Single owner - rug risk", "Proxy contract"
  contractType: { 
    type: String, 
    enum: ['None', 'Token', 'Contract', 'Proxy'],
    default: 'None'
  },
  tokenName: { type: String },
  chain: { type: String, default: 'eth' },     // eth, polygon, bsc, etc.

  // Metadata
  lastScanned: { type: Date, default: Date.now }
}, { 
  timestamps: true 
});

// Full-text search on key fields
ScamSchema.index({ 
  title: 'text', 
  name: 'text', 
  summary: 'text', 
  explanation: 'text', 
  tags: 'text' 
});

// Compound index for efficient sorting
ScamSchema.index({ reports: -1, lastScanned: -1 });
ScamSchema.index({ verdict: 1, malicious: -1 });

module.exports = mongoose.model('Scam', ScamSchema);