const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const contractScan = async (address) => {
  const details = {};
  const flags = [];

  try {
    const res = await fetch(`https://api.honeypot.is/v2/IsHoneypot?address=${address}&chainID=1`);
    const data = await res.json();
    details.isHoneypot = data.isHoneypot ? 'Yes' : 'No';
    if (data.isHoneypot) flags.push('Honeypot detected');
  } catch (e) {
    details.honeypotError = 'Honeypot check failed';
  }

  try {
    const res = await fetch(`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${process.env.ETHERSCAN_KEY}`);
    const data = await res.json();
    details.isVerified = data.result[0].SourceCode ? 'Yes' : 'No';
    if (!details.isVerified) flags.push('Contract not verified');
  } catch (e) {
    details.verificationError = 'Etherscan check failed';
  }

  return { details, flags };
};

module.exports = { contractScan };