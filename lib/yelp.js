var Promise = require('es6-promise').Promise;

// create yelp client
exports.yelpClient = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

exports.lookup = function(term, loc) {
  return new Promise(function(success, fail) {
    exports.yelpClient.search({term: term, location: loc}, function(error, data) {
      if (error) {
        fail(error);
      } else if (typeof data.businesses[0] === 'undefined') {
        exports.fullLookup(term.substring(0, term.length - 1), loc);
      } else {
        success(data.businesses[0].id);
      }
    });
  });
};

exports.getCategories = function(id) {
  return new Promise(function(success, fail) {
    exports.yelpClient.business(id, function(error, data) {
      if (error) {
        fail(error);
      } else {
        var categories = [];
        data['categories'].forEach(function(arr) {
          categories.push(arr[1]);
        });
        success(categories[0]);
      }
    });
  });
};

exports.fullLookup = function(term, loc, cb) {
  exports.lookup(term, loc).then(function(id) {
    exports.getCategories(id).then(function(data) {
      cb(data, term);
    }, function(err) {
        console.log(err);
    });
  });
}
