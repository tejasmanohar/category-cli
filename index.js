#!/usr/bin/env node


// module dependencies
var program = require('commander');
var csv = require('fast-csv');
var requireDir = require('require-dir');
var dir = requireDir('./lib');
var fs = require('fs');


// cli configuration
program
  .version('0.0.1')
  .command('convert <input> <output>')
  .action(function (input, output) {
    input = input.replace('-',' ');
    var stream = fs.createReadStream(input);
    var csvStream = csv()
      .on('data', function(data){
        var term = data[0].split(/(?=\.[^.]+$)/)[0];
        data[1] = data[1].charAt(0).toUpperCase() + data[1].slice(1);
        var loc = data[1] + ', ' + data[2].toUpperCase();
        console.log(term);
        console.log(loc);
        dir.yelp.lookup(term, loc).then(function(id) {
          dir.yelp.getCategories(id).then(function(data) {
              console.log(data);
          }, function(err) {
              console.log(err);
          });
        });
      })
      .on('end', function(){
         console.log('done');
      });
    stream.pipe(csvStream);
  });

program.parse(process.argv);
