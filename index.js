var async = require('async');
var program = require('commander');
var yelp = require('./lib/yelp');
var fs = require('fs');

program
  .version('1.0.0')
  .command('convert <input> <output>')
  .action(function(input, output) {
    console.log('Start!');
    fs.readFile(input, function(err, data) {
      var res = [];

      var lines = data.toString().split('\n');

      async.eachLimit(lines, 20, function(line, done) {
        var start = (new Date()).getTime();
        var data = line.split(',');
        var num = data[0];
        var cc = data[1];

        var ws = fs.createWriteStream(output);

        yelp.fullLookup(data[0], cc, function(error, category) {
          console.log(num + ' ' + category);
          res.push(num + ',' + category);
          done();
        });

        var end = (new Date()).getTime();

        console.log( "Duration:", (end - start) );

      }, function(err) {
        if (err) { 
          console.log(err);
        }

        fs.writeFile(output, res.join('\n'), function() {
          console.log('End!');
        });
      });

    });

  });

program.parse(process.argv);