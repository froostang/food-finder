var express = require("express");
var app = express();
<<<<<<< HEAD
app.use(
    "/", //the URL throught which you want to access to you static content
    express.static(__dirname) //where your static content is located in your filesystem
);
app.listen(3000, () => {
    console.log("listening on port 3000");
}); //the port you want to use

=======
var router = express.Router();
var path = __dirname + '/views/';
var lib = __dirname + '/lib/';

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
  var q = url.parse(req.url, true).query;
  console.log(q);
  // try {
  //   var txt = q.user + " is your user request";
  // } catch(err) {
  //   var txt = "incorrect query string, try 'user'";
  // }
  //res.end(txt);
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
  res.send('404 Error: Invalid Path.', 404);
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
>>>>>>> landing-page
