const program = require('commander');
const { getCurrentStockPrice } = require('../command/stockprice');

program
  .requiredOption(
    '-s, --stock <currency ISO code>',
    'set stock to look for price'
  )
  .option(
    '-b, --base-currency <currency-type>',
    'set base currency to convert stock price to',
    'USD'
  )
  .option('-l, --language <lang-type>', 'set preferred language', 'en')
  .action(() => {
    console.log(
      `Getting current price with ${program.baseCurrency} as base currency...`
    );
    getCurrentStockPrice({
      ...program.opts(),
    });
  });

program.parse(process.argv);
