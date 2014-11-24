var dotenv = require('dotenv');
dotenv.load();

var yelp = require("yelp").createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

var GooglePlaces = require('google-places');
var places = new GooglePlaces(process.env.PLACES_KEY);
