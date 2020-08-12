const { expect } = require('chai');
const chalk = require('chalk');
const { searchCurrency } = require('../command/currencysearch');
const { getCols } = require('../lib/util');

describe('Searching currency', function () {
  this.timeout('25s');
  describe('given correct arguments have been passed', () => {
    const consoles = [];
    before(() => {
      console.log = (msg) => {
        consoles.push(msg);
      };
      process.argv = ['cs', 'search', 'currency', 'lyd'];
    });
    it('should look up currency and print support status to stdout', async () => {
      const isSupported = await searchCurrency();
      expect(isSupported).to.be.a('boolean');
      expect(consoles[0]).to.equal('searching currency LYD...');
      expect(consoles[1]).to.equal(
        chalk.green('hurray! LYD is supported in cheap stocks Inc.')
      );
    });
  });
  describe('given currency is not supported yet', () => {
    const consoles = [];
    before(() => {
      console.log = (msg) => {
        consoles.push(msg);
      };
      process.argv = ['cs', 'search', 'currency', 'nzd'];
    });
    it('should look up currency and print support status to stdout', async () => {
      const isSupported = await searchCurrency();
      expect(isSupported).to.be.a('boolean');
      expect(consoles[0]).to.equal('searching currency NZD...');
      expect(consoles[1]).to.equal(
        chalk.yellow('Oops! NZD is not yet supported in cheap stocks Inc.')
      );
    });
  });

  describe('given not supplied with the currency ISO code', () => {
    const consoles = [];
    before(() => {
      console.error = (msg) => {
        consoles.push(msg);
      };
      process.argv = ['cs', 'search', 'currency'];
    });
    it('should look up currency and print support status to stdout', async () => {
      const isSupported = await searchCurrency();
      expect(isSupported).to.be.a('boolean');
      expect(consoles[0]).to.equal(
        chalk.redBright(
          'Error: Missing required arguments, [currency ISO code]'
        )
      );
    });
  });
});

describe('Search utils', () => {
  describe('Getting a column', () => {
    it('should parse the csv and return the desired column', () => {
      const rows = [
        'Algeria,Algerian dinar,DZD',
        'Angola,Angolan kwanza,AOA',
        'Benin,CFA franc,XOF',
        'Botswana,Botswana pula,BWP',
        'Burkina Faso,CFA franc,XOF',
        'Burundi,Burundi franc,BIF',
        'Cameroon,CFA franc,XAF',
      ];
      const col3 = getCols(rows, 2);
      const expectedCol3 = ['DZD', 'AOA', 'XOF', 'BWP', 'XOF', 'BIF', 'XAF'];
      expect(col3).to.deep.equal(expectedCol3);
    });
  });
});
