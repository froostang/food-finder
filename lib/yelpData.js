'use strict';

const yelp = require('yelp-fusion');
const config = require('./config.json'); // config file contains client id/secret
// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = config.clientId;
const clientSecret = config.clientSecret;

// testing lat and long coords request
const latitude = 0; //insert lat long here
const longitude = 0;

const searchRequest = {
  term:'Four Barrel Coffee',
  "latitude": latitude,
  "longitude":longitude
};

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});
