'use strict';

const yelp = require('yelp-fusion');
const config = require('./config.json'); // config file contains client id/secret
// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = config.clientId;
const clientSecret = config.clientSecret;

function getYelpFood(lat, long) {

  const latitude = lat;
  const longitude = long;

  const searchRequest = {
    term:'food',
    radius_filter: 20000,
    "latitude": latitude,
    "longitude":longitude
  };

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      const rand = (Math.floor(Math.random() * 100) % (response.jsonBody.businesses.length));
      const firstResult = response.jsonBody.businesses[rand];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log("in yelptesting");
      console.log(firstResult.name);
      return firstResult.name;
    });
  }).catch(e => {
    console.log(e);
  });
}
module.exports.getYelpFood = getYelpFood;
