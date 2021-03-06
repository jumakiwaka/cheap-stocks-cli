const program = require('commander');
const pkg = require('../package.json');
const { searchCurrency } = require('../command/currencysearch');

program.version(pkg.version);

program
  .command('currency [ISO_4217_code]')
  .description('search currency support')
  .action(() => searchCurrency());

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
