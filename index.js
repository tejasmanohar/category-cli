#!/usr/bin/env node

// module dependencies
var program = require('commander');
var requireDir = require('require-dir');
var dir = requireDir('./lib');

// cli configuration
program
  .version('0.0.1')
  .command('convert <input> <output>')
  .action(function (input, output) {
    console.log(input, output);
  });

program.parse(process.argv);
