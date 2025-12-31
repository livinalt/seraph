// src/services/scan/ensScan.js
const { ethers } = require('ethers');

const ensScan = async (name) => {
  if (!process.env.ALCHEMY_API_KEY) {
    throw new Error('ALCHEMY_API_KEY not set');
  }

  // Use Alchemy as JSON-RPC provider
  const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

  const address = await provider.resolveName(name);

  if (!address) {
    throw new Error('ENS name not registered or invalid');
  }

  return { resolvedAddress: address };
};

module.exports = { ensScan };