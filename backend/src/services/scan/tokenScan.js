const CoinGecko = require('coingecko-api');

const cg = new CoinGecko();

const tokenScan = async (ticker) => {
  const details = {};
  const flags = [];

  try {
    const data = await cg.coins.fetch(ticker);
    details.marketCap = data.data.market_data.market_cap.usd || 'Unknown';
    details.price = data.data.market_data.current_price.usd || 'Unknown';
    if (details.marketCap < 100000) flags.push('Low market cap');
  } catch (e) {
    details.error = 'Token not found on CoinGecko';
    flags.push('Unknown token');
  }

  return { details, flags };
};

module.exports = { tokenScan };