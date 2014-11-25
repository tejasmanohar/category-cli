var async = require('async');
var program = require('commander');
var csv = require('fast-csv');
var yelp = require('./lib/yelp');
var fs = require('fs');

// cli configuration
program
  .version('1.0.0')
  .command('convert <input> <output>')
  .action(function(input, output) {

    fs.readFile(input, function(err, data) {

      var res = [];

      var lines = data.toString().split('\n');

      async.eachLimit(lines, 10, function(line, done) {
        var data = line.split(',');
        console.log(data);
        var term = data[0].split(/(?=\.[^.]+$)/)[0];
        var loc = data[1] + ', ' + data[2];
        var ws = fs.createWriteStream(output);

        yelp.fullLookup(term, loc, function(cat, term) {
          console.log(data[0] + ' ' + cat);
          res.push(data[0] + ',' + cat);
          done();
        });

      }, function(err) {
        if (err) { 
          console.log(err);
        }

        fs.writeFile(output, res.join('\n'), function() {
          console.log('Done!');
        });
      });

    });

  });

program.parse(process.argv);
