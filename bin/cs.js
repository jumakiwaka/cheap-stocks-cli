#! /usr/bin/env node

const program = require("commander");
const pkg = require("../package.json");
const updateNotifier = require("update-notifier");

updateNotifier({pkg}).notify({isGlobal:true});

program.
	version(pkg.version)
	.command("search", "look if a currency is available")
	.parse(process.arg)
