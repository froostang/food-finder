'use strict';

const yelp = require('yelp-fusion');
const config = require('./config.json'); // config file contains client id/secret in JSON
const clientId = config.clientId;
const clientSecret = config.clientSecret;

// pull data from yelp api and return promise
const getYelpFood = function(lat, long) {
  // return new pending promise
  return new Promise((resolve, reject) => {

    const latitude = lat;
    const longitude = long;

    const searchRequest = {
      term:'food',
      radius_filter: 20000,
      "latitude": latitude,
      "longitude":longitude
    };
    // generate access token and pick random response business to return
    yelp.accessToken(clientId, clientSecret).then(response => {
      const client = yelp.client(response.jsonBody.access_token);

      client.search(searchRequest).then(response => {
        const rand = (Math.floor(Math.random() * 100) % (response.jsonBody.businesses.length));
        const firstResult = response.jsonBody.businesses[rand];
        const prettyJson = JSON.stringify(firstResult, null, 4);
        console.log("in yelptesting");
        console.log(firstResult);
        resolve(firstResult);
      });
    }).catch(e => {
      reject(e);
    });
    })
};
module.exports.getYelpFood = getYelpFood;
