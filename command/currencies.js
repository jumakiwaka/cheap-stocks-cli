const util = require('../lib/util');

const url =
  'https://focusmobile-interview-materials.s3.eu-west-3.amazonaws.com/Cheap.Stocks.Internationalization.Currencies.csv';

async function getAllCurrencies(path = url) {
  try {
    console.log('Getting all supported currencies...');
    const options = {
      method: 'get',
      redirect: 'follow',
    };
    const { data } = await util.fetch(path, options);
    // get data rows without headers
    const rows = data.split('\r\n').slice(1);
    // get specific column data as an array
    const columns = util.getCols(rows, 2); // currency ISO 4217 codes
    console.log(columns);
    return columns;
  } catch (error) {
    util.handleError(error);
    return error;
  }
}

module.exports = { getAllCurrencies };
