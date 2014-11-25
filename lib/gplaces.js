// create gplaces client
var GooglePlaces = require('google-places');
exports.places = new GooglePlaces(process.env.PLACES_KEY);

// search
exports.search = function(term) {
  exports.places.search({keyword: term}, function(err, response) {
    console.log(err);
    console.log(response);
    // exports.places.details({reference: response.results[0].reference}, function(err, response) {
    //   if (error) {
    //     return error;
    //   } else {
    //     return response.result;
    //   }
    // });
  });
};

