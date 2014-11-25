// module dependencies
var program = require('commander');
var csv = require('fast-csv');
var requireDir = require('require-dir');
var dir = requireDir('./lib');
var fs = require('fs');

// cli configuration
program
  .version('1.0.0')
  .command('convert <input> <output>')
  .action(function(input, output) {
    var out = [];
    var stream = fs.createReadStream(input);
    var csvStream = csv()
      .on('data', function(data) {
        var term = data[0].toLowerCase().split(/(?=\.[^.]+$)/)[0];
        var loc = data[1].toLowerCase() + ', ' + data[2].toLowerCase();
        var ws = fs.createWriteStream(output);
        dir.yelp.fullLookup(term, loc, function(content, term) {
          out.push([data[0], term]);
          console.log(out)
        });
      })
      .on('end', function() {
        var ws = fs.createWriteStream(output);
        csv
          .write(out, {
            headers: false
          })
          .pipe(ws);
      });
      stream.pipe(csvStream);
  });

program.parse(process.argv);