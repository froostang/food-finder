var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var lib = __dirname + '/lib/';
var bodyParser = require('body-parser');
var yt = require('./lib/yelp-testing.js');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

// will server as api for testing
router.get("/data",function(req,res){
  var lat = req.query.lat;
  var long = req.query.long;

  // just for testing display, remove when correct JSON returned from getYelpFood
  var ob = {
      "lat": lat,
      "long": long
  }
  // everything works but I -think-
  // I need a callback based on the value returned from getYelpFood
  // or a callback in yelp-testing function to return data

  //var final = yt.getYelpFood(lat, long);
  //res.json(ob);
  if(lat == undefined || long == undefined) {
    res.send("Please specify query string with lat and long ex. /data?lat=100&long=100");
  } else {
    res.json(ob);  
  }

});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
  res.send('404 Error: Invalid Path.', 404);
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
