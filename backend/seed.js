const mongoose = require('mongoose');
const Scam = require('./src/models/scam');
require('dotenv').config();

const mockData = [
  ...Array(24).fill(null).map((_, i) => ({
    name: ["moonshot-finance.app", "defi-yieldpro.io", "nft-giveaway.live", "btc-miner.cloud", "elon-giveaway.net"][i % 5],
    title: ["Moonshot Finance Rug", "YieldPro Fake Farm", "NFT Giveaway Scam", "Fake BTC Miner", "Elon Musk Impersonator"][i % 5],
    summary: "High-risk project with anonymous team and unsafe contract functions detected.",
    category: ["Token", "Website", "NFT", "Cloud Mining", "Impersonation"][i % 5],
    tags: i % 2 ? ["rug-pull", "anonymous-team"] : ["phishing", "fake-giveaway"],
    reports: Math.floor(Math.random() * 800) + 50,
    communitySafe: Math.floor(Math.random() * 25),
    explanation: "AI detected multiple red flags: anonymous team, unsafe contract functions, and suspicious tokenomics.",
    logoUrl: "https://via.placeholder.com/150/6366f1/ffffff?text=SCAM",
    screenshot: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop"
  }))
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Scam.deleteMany({});
  await Scam.insertMany(mockData);
  console.log('24 mock scams seeded!');
  process.exit();
}

seed();