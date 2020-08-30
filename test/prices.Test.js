/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { getCurrentStockPrice } = require('../command/stockprice');

// eslint-disable-next-line prefer-arrow-callback
describe('Getting current price for a stock', function () {
  this.timeout('25s');
  before(() => {
    console.log = (msg) => {
      // dummy stub of console.log
      const text = msg;
    };
    // dumb stub of console.error
    console.error = (err) => {};
  });
  describe('Given a user has provided a supported stock and base currency', () => {
    it('should return current price for that stock (USD base)', async () => {
      const details = {
        baseCurrency: 'USD',
        stock: 'NZD',
        language: 'en',
      };
      const result = await getCurrentStockPrice(details);
      expect(result.success).to.be.true;
      expect(result.quotes[`${details.baseCurrency}${details.stock}`]).not.to.be
        .null;
    });
    it('should return current price for that stock (EUR base)', async () => {
      const details = {
        baseCurrency: 'EUR',
        stock: 'NZD',
        language: 'en',
      };
      const result = await getCurrentStockPrice(details);
      expect(result.success).to.be.true;
      expect(result.rates[details.stock]).not.to.be.null;
    });
  });
  describe('Given a user has provided an unsupported stock or base currency', () => {
    it('should exit with an error message (unsupported base)', async () => {
      const details = {
        baseCurrency: 'LYD',
        stock: 'NZD',
        language: 'en',
      };
      const result = await getCurrentStockPrice(details);
      expect(result).to.be.an.instanceOf(Error);
    });
    it('should exit with an error message (unsupported stock)', async () => {
      const details = {
        baseCurrency: 'EUR',
        stock: 'Uis',
        language: 'en',
      };
      const result = await getCurrentStockPrice(details);
      expect(result).to.be.an.instanceOf(Error);
    });
  });
});
