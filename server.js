var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var lib = __dirname + '/lib/';
var bodyParser = require('body-parser');
// contins function for returning yelp JSON based on lat/long
var yt = require('./lib/yelp-testing.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// set public static directory for css
app.use(express.static(path));

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

// pass query string with lat/long and queries yelp API
router.get("/data",function(req,res){
  var lat = req.query.lat;
  var long = req.query.long;

  if(lat == undefined || long == undefined) {
    // default return if querie(s) don't exist
    res.send("Please specify query string with lat and long ex. /data?lat=100&long=100");
  } else {
    yt.getYelpFood(lat, long).then(function(data) {
      res.json(data);
    });
  }

});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
  res.send('404 Error: Invalid Path.', 404);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
