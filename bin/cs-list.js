const program = require('commander');
const pkg = require('../package.json');
const { getSupportedLangs } = require('../command/languages');
const { getAllCurrencies } = require('../command/currencies');

program.version(pkg.version);

program.option(
  '-l, --languages',
  'view all supported languages',
  getSupportedLangs
);

program.option(
  '-c, --currencies',
  'view all supported currencies',
  getAllCurrencies
);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
