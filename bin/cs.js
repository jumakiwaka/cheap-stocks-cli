#! /usr/bin/env node

const program = require('commander');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({ pkg }).notify({ isGlobal: true });

program.version(pkg.version);

program.command('search', 'look up if an asset is available for support');
program.command('list', 'list all supported assets/lang');
program.command('price', 'get current price of a stock');

program.parse(process.argv);
