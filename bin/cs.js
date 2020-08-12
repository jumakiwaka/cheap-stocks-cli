#! /usr/bin/env node

const program = require('commander');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

updateNotifier({ pkg }).notify({ isGlobal: true });

program
  .version(pkg.version)
  .command('search', 'look up if an asset is available for support')
  .parse(process.arg);
