	var map;

	function initAutocomplete() {
		  
		  	map = new google.maps.Map(document.getElementById('map'), {
		   	 	center: {lat: 37.7833, lng: -122.431297},
		    	zoom: 14,
		    	mapTypeId: google.maps.MapTypeId.ROADMAP
		  	});

		  	var markers = [];

		  		// Create the search box and link it to the UI element.
		  	
		  	var input = document.getElementById('place-input');
		  	
		  	var searchBox = new google.maps.places.SearchBox(input);

		  		// Bias the SearchBox results towards current map's viewport.
		  	
		  	map.addListener('bounds_changed', function() {
		    	searchBox.setBounds(map.getBounds());
		  	});
		 
		  		// Listen for the event fired when the user selects a prediction and retrieve
		  		// more details for that place.
		  
		  	searchBox.addListener('places_changed', function() {
		    	var places = searchBox.getPlaces();

		    	if (places.length == 0) {
		      		return;
		    	}

		    		// Clear out the old markers.
		    	markers.forEach(function(marker) {
		      	marker.setMap(null);
		    });
		    
		    document.getElementById("details_info").innerHTML = "";

		    		// For each place, get the icon, name and location.
		    var bounds = new google.maps.LatLngBounds();
		    
		    places.forEach(function(place) {
		      	var icon = {
		        	url: place.icon,
		        	size: new google.maps.Size(71, 71),
		        	origin: new google.maps.Point(0, 0),
		        	anchor: new google.maps.Point(17, 34),
		        	scaledSize: new google.maps.Size(25, 25)
		    	};

		      	// Create a marker for each place.
		      	markers.push(new google.maps.Marker({
			        map: map,
			        icon: icon,
			        title: place.name,
			        position: place.geometry.location
			    }));

		      	if (place.geometry.viewport) {
		        	// Only geocodes have viewport.
		        	bounds.union(place.geometry.viewport);
		      	} else {
		        	bounds.extend(place.geometry.location);
		      	}
		    });

		    map.fitBounds(bounds);
		    //activateContent (0);
		  });
	
	}

	
