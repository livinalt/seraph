const ethers = require('ethers');
const dotenv = require('dotenv');
dotenv.config();

const ensScan = async (name) => {
  const provider = new ethers.providers.AlchemyProvider('mainnet', process.env.ALCHEMY_API_KEY);
  const address = await provider.resolveName(name);

  if (!address) {
    throw new Error('ENS name not registered or invalid');
  }

  return { resolvedAddress: address };
};

module.exports = { ensScan };