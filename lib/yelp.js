var request = require('superagent');
var cheerio = require('cheerio');

exports.yelpClient = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

exports.lookup = function(num, cc, cb) {
  exports.yelpClient.phone_search({
    phone: num,
    cc: cc
  }, function(error, data) {
    if (error) {
      cb(error);
    } else if (typeof data.businesses[0] === 'undefined') {
      cb(error);
    } else {
      cb(null, data.businesses[0].id);
    }
  });
};

exports.getCategories = function(id, cb) {
  exports.yelpClient.business(id, function(error, data) {
    if (error) {
      return cb(error);
    }
    var categories = data.categories.map(function (arr) {
      return arr[1];
    });
    cb(null, categories[0]);
  });
};

exports.fullLookup = function(num, cc, cb) {
  exports.lookup(num, cc, function(error, id) {
    exports.getCategories(id, function(err, category) {
      cb(null, category);
    }, function(err) {
      console.log(err);
    });
  });
}