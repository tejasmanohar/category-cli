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
    exports.yelpClient.search({term: 'walmart', location: 'Nashville, TN'}, function(error, data) {
      if (error) {
        fail(error);
      } else if (typeof data == 'undefined') {
        fail();
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
        success(data['categories']);
      }
    });
  });
};
