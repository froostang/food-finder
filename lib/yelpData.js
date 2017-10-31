var x = $( "#FoodPlace" );
var run = $( "#Run" );

// $(document).ready(function() {
//     console.log("works");
// });


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getFoodPlaces);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getFoodPlaces(position) {
  // runs the api request for food places based on browser location
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

// $.ajax({
//
//     url : 'http://voicebunny.comeze.com/index.php',
//     type : 'GET',
//     data : {
//         'numberOfWords' : 10
//     },
//     dataType:'json',
//     success : function(data) {
//         alert('Data: '+data);
//     },
//     error : function(request,error)
//     {
//         alert("Request: "+JSON.stringify(request));
//     }
// });
