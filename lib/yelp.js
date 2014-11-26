var request = require('superagent');
var cheerio = require('cheerio');

// create yelp client
exports.yelpClient = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

exports.getWebsite = function(url, cb) {
  request.get(url, function(res) {
    var html = res.text,
      $ = cheerio.load(html);
    return cb($('.biz-website').find('a').text());
  });
}

exports.lookup = function(term, loc, original, cb) {
  if(term.length === 0 || original.length === 0) {
    return;
  }
  term = term.split(/(?=\.[^.]+$)/)[0];
  exports.yelpClient.search({
    term: term,
    location: loc
  }, function(error, data) {
    if (error) {
      console.log(error);
      return;
    } else if (typeof data.businesses[0] === 'undefined') {
      exports.lookup(term.substring(0, term.length - 1), loc, original, cb);
    } else {
      exports.getWebsite(data.businesses[0].url, function(result) {
        if (original === result) {
          cb(data.businesses[0].id);
        } else {
          exports.lookup(term.substring(0, term.length - 1), loc, original, cb);
        }
      });
    }
  });
};

exports.getCategories = function(id, cb) {
  exports.yelpClient.business(id, function(error, data) {
    if (error) {
      console.log(err);
      return;
    }

    var categories = [];
    data['categories'].forEach(function(arr) {
      categories.push(arr[1]);
    });
    cb(categories[0]);
  });
};

exports.fullLookup = function(term, loc, cb) {
  exports.lookup(term, loc, term, function(id) {
    exports.getCategories(id, function(data) {
      cb(data, term);
    }, function(err) {
      console.log(err);
    });
  });
}