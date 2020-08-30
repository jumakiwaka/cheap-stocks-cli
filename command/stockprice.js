const chalk = require('chalk');
const util = require('../lib/util');

async function getCurrentStockPrice({ baseCurrency, language, stock }) {
  try {
    const asset = stock.toUpperCase();
    const url = new URL('http://api.currencylayer.com/live');

    url.searchParams.append('access_key', 'ebe6a46a4e8c8d221ff0689642a2cf2d');
    url.searchParams.append('source', baseCurrency);
    url.searchParams.append('currencies', asset);

    const options = {
      method: 'get',
      redirect: 'follow',
    };

    const { data } = await util.fetch(url.href, options);
    console.log();

    if (data.success) {
      console.log(
        chalk.green(
          `The current stock price for ${asset} is ${
            data.quotes[`${data.source}${asset}`]
          } ${data.source}.`
        )
      );
      return data;
    }

    // fallback to fixer api
    const endpoint = new URL('http://data.fixer.io/api/latest');

    endpoint.searchParams.append(
      'access_key',
      '58d7b4a9a7ce0a2def3fc6e3e2458228'
    );
    endpoint.searchParams.append('base', baseCurrency);

    endpoint.searchParams.append('symbols', asset);

    const reqOptions = {
      method: 'get',
      redirect: 'follow',
    };

    const { data: result } = await util.fetch(endpoint.href, reqOptions);
    if (result.success) {
      console.log(
        chalk.green(
          `The current stock price for ${asset} is ${result.rates[asset]} ${result.base}`
        )
      );
      return result;
    }
    throw new Error(result.error.type);
  } catch (error) {
    util.handleError(error);
    return error;
  }
}

module.exports = { getCurrentStockPrice };
