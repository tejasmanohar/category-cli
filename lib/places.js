// create gplaces client
var GooglePlaces = require('google-places');
exports.places = new GooglePlaces(process.env.PLACES_KEY);