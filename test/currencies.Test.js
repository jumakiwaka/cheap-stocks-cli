const { expect } = require('chai');
const { getAllCurrencies } = require('../command/currencies');

// TODO => mock the api calls instead of hitting a real endpoint

describe('Getting all supported currencies', function () {
  this.timeout('25s');

  before(() => {
    console.log = (msg) => {
      // dummy stub of console.log
      const text = msg;
    };
    // dumb stub of console.error
    console.error = (err) => {};
  });

  it('should return an array with all supported currencies', async () => {
    const supportedCurr = await getAllCurrencies();
    expect(supportedCurr).to.be.an.instanceOf(Array);
    expect(supportedCurr).length.to.be.gt(0);
  });

  it('should return an error when path is changed / network failed', async () => {
    const supportedCurr = await getAllCurrencies('https://__unkown_url__.com');
    expect(supportedCurr).to.be.an.instanceOf(Error);
  });
});
