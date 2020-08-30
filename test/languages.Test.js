const { expect } = require('chai');
const { getSupportedLangs } = require('../command/languages');

describe('Getting supported languages', function () {
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
    const supportedLangs = await getSupportedLangs();
    expect(supportedLangs).to.be.an.instanceOf(Array);
    expect(supportedLangs).length.to.be.gt(0);
  });

  it('should return an error when path is changed / network failed', async () => {
    const supportedCurr = await getSupportedLangs('https://__unkown_url__.com');
    expect(supportedCurr).to.be.an.instanceOf(Error);
  });
});
