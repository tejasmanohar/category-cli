#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.0.1')
  .command('convert <input> <output>')
  .action(function (input, output) {
    console.log(input, output);
  });

program.parse(process.argv);
