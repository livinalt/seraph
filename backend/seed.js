const mongoose = require('mongoose');
const Scam = require('./src/models/scam');
const dotenv = require('dotenv');
dotenv.config();

const mockData = [
  // Your 24 mocks here — copy from your ScamDirectory.tsx
  ...Array(24).fill(null).map((_, i) => ({
    id: i + 1, // ignore, Mongo will auto-ID
    name: ["moonshot-finance.app", "defi-yieldpro.io", "nft-giveaway.live", "btc-miner.cloud", "elon-giveaway.net"][i % 5],
    title: ["Moonshot Finance Rug", "YieldPro Fake Farm", "NFT Giveaway Scam", "Fake BTC Miner", "Elon Musk Impersonator"][i % 5],
    summary: "High-risk project with anonymous team and unsafe contract functions detected.",
    category: ["Token", "Website", "NFT", "Cloud Mining", "Impersonation"][i % 5],
    tags: i % 2 ? ["rug-pull", "anonymous-team"] : ["phishing", "fake-giveaway"],
    reports: Math.floor(Math.random() * 800) + 50,
    firstSeen: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    screenshot: `https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop&text=Scam+${i + 1}`,
    communitySafe: Math.floor(Math.random() * 25),
    explanation: "AI detected multiple red flags: anonymous team, unsafe contract functions, and suspicious tokenomics.",
    logoUrl: "https://via.placeholder.com/150/6366f1/ffffff?text=SCAM"
  }))
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Scam.deleteMany({});
    await Scam.insertMany(mockData);
    console.log('Mock data seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDB();