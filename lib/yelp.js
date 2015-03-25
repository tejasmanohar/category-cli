var request = require('superagent');
var cheerio = require('cheerio');

exports.yelpClient = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

exports.lookup = function(term, loc, cb) {
  exports.yelpClient.search({
    term: term,
    location: loc
  }, function(error, data) {
    if (error) {
      console.log(error);
      return;
    } else if (typeof data.businesses[0] === 'undefined') {
      console.log('no match for ' + term);
    } else {
      cb(data.businesses[0].id);
    }
  });
};

exports.getCategories = function(id, cb) {
  exports.yelpClient.business(id, function(error, data) {
    if (error) {
      console.log(error);
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
  console.log(process.env.YELP_CONSUMER_KEY)
  exports.lookup(term, loc, term, function(id) {
    exports.getCategories(id, function(data) {
      cb(data, term);
    }, function(err) {
      console.log(err);
    });
  });
}