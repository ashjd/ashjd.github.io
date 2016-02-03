// This function loads the appropriate information on the map according to user's choice of place types.  

var markersC = [];
var markersP = [];

function loadMapContents (userChoice) {

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

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
	    for (var i = 0; i < results.length; i++) {
	      //createMarker(results[i]);
	      showDetails(results[i]);
	      createPhotoMarker(results[i]);
	    }
	 }
}

function createMarker(place) {
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


function createPhotoMarker(place) {
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
  		var img = document.createElement('img');
  		img.src = photos[0].getUrl({'maxWidth': 400, 'maxHeight': 400});
  		imgbox.innerHTML = "";
		imgbox.appendChild(img);
 });

  markersP.push(marker);
}


function showDetails (place){
		
	var request = { reference: place.reference };
    var	service = new google.maps.places.PlacesService(map);

    service.getDetails(request, function(details, status) {
    	if (status == google.maps.places.PlacesServiceStatus.OK) {
    		var webLink = details.name;
    		var web = webLink.link (details.website);
        	document.getElementById("details_info").innerHTML += "<br />" + "<br />" + "<strong>" + web + "</strong>" + "<br />" + details.formatted_address + "<br />" + "User Rating :  <strong>" +  details.rating + " </strong> <br />" + details.formatted_phone_number ;
        }
    });
    
}


function closeMe(){
	var imgbox=document.getElementById("imgbox");
    	imgbox.style.visibility='hidden';
    	btn.style.visibility="hidden";
}