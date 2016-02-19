// This function intends to receive the active tab index and send the appropriate place_type for query to the google places API

		    var activateContent = function (index){

		    	var userChoice = [];

				while (userChoice.length > 0){
					userChoice.pop();
				}

				imgbox.style.visibility='hidden';
    			btn.style.visibility="hidden";
    			imgName.style.visibility="hidden";

				switch (index){
		    		
		    		case 0 : userChoice.push('casino', 'night_club', 'movie_theater');
		    				 document.getElementById("entertainment").innerHTML = "Entertainment options shown for CURRENT MAP BOUNDS."; 
		    				 break;
		    		case 1 : userChoice.push('lodging'); 
		    				 document.getElementById("hotels").innerHTML = "Lodging options shown for CURRENT MAP BOUNDS."; 
		    				 break;
		    		case 2 : userChoice.push('restaurant', 'cafe');
		    				 document.getElementById("restaurants").innerHTML = "Dining options shown for CURRENT MAP BOUNDS."; 
		    				 break;
		    		case 3 : userChoice.push('shopping_mall', 'grocery_or_supermarket', 'department_store', 'convenience_store'); 
		    				 document.getElementById("store").innerHTML = "Shopping options shown for CURRENT MAP BOUNDS."; 
		    				 break;
		    		case 4 : userChoice.push('park','aquarium','art_gallery', 'museum', 'book_store', 'zoo'); 
		    				 document.getElementById("rec").innerHTML = "Recreation options shown for CURRENT MAP BOUNDS."; 
		    				 break;
		    	}

		    	loadMapContents (userChoice, index);
		    }




// This function sends the appropriate query according to user's choice of place types and retrieves information with nearby search.

var markersC = [];
var markersP = [];

var loadMapContents = function (userChoice) {

	document.getElementById("details_info").innerHTML = "";
	// Clear out the old markers.
	markersC.forEach(function(marker) {
		marker.setMap(null);
	});
	markersP.forEach(function(marker) {
		marker.setMap(null);
	});


	var service = new google.maps.places.PlacesService(map);
	var bounds = map.getBounds();

	service.nearbySearch({
	    bounds: bounds,
	    types: userChoice
	  }, callback);
}

var callback = function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
	    for (var i = 0; i < results.length; i++) {
	      
	      showDetails(results[i]);
	      createPhotoMarker(results[i]);
	    }
	 }
}

// Creating markers on the map

var createMarker = function (place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
	   	map: map,
	  	position: place.geometry.location
	});

	markersC.push(marker);

	var infowindow = new google.maps.InfoWindow();

	google.maps.event.addListener(marker, 'click', function() {
	   	infowindow.setContent(place.name);
    	infowindow.open(map, this);
 	});
}


var createPhotoMarker = function (place) {
  var photos = place.photos;
  if (!photos) {
  	createMarker(place);
    return;
  }

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
    icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
  });

  google.maps.event.addListener(marker, 'click', function() {
  		var imgbox=document.getElementById("imgbox");
    	imgbox.style.visibility='visible';
    	btn.style.visibility='visible';
    	imgName.style.visibility = 'visible'
  		var img = document.createElement('img');
  		img.src = photos[0].getUrl({'maxWidth': 400, 'maxHeight': 400});
  		imgbox.innerHTML = "";
		imgbox.appendChild(img);
		document.getElementById("imgName").innerHTML = place.name;
 });

  markersP.push(marker);
}

// Retrieving and displaying details of the places received by the search 

var showDetails  = function (place){
		
	var request = { reference: place.reference };
    var	service = new google.maps.places.PlacesService(map);

    service.getDetails(request, function(details, status) {
    	if (status == google.maps.places.PlacesServiceStatus.OK) {
    		var webLink = details.name;
    		var web = webLink.link (details.website);
        	document.getElementById("details_info").innerHTML += "<br />" + "<br />" + "<strong>" + web + "</strong>" + "<br />" + details.formatted_address + "<br />" ;
        	if (details.rating)
        		document.getElementById("details_info").innerHTML += "User Rating :  <strong>" +  details.rating + " </strong> <br /> ";
        	if (details.formatted_phone_number)
        		document.getElementById("details_info").innerHTML += "Phone Number : " + details.formatted_phone_number ;
    	}
    });
    
}

// Closing enlarged image view
var closeMe = function (){
	var imgbox=document.getElementById("imgbox");
    	imgbox.style.visibility='hidden';
    	btn.style.visibility="hidden";
    	imgName.style.visibility="hidden";
};