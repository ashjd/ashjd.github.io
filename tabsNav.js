		
		(function() {

		   // The Tabs component.
		   
		  var tabs = function (options) {

		    var el = document.querySelector(options.el);
		    var tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
		    var tabContentContainers = el.querySelectorAll(options.tabContentContainers);
		    var activeIndex = 0;
		    var initCalled = false;

		    
		      //Initializes the component by attaching event listeners to each of the nav items.
		   
		    var init = function() {
		      if (!initCalled) {
		        initCalled = true;

		        for (var i = 0; i < tabNavigationLinks.length; i++) {
		          var link = tabNavigationLinks[i];
		          handleClick(link, i);
		        }
		      }
		    };

		     //Handles click event listeners on each of the links in the tab navigation.
		     
		    var handleClick = function(link, index) {
		      link.addEventListener('click', function(e) {
		        e.preventDefault();
		        goToTab(index);
		      });
		    };

		     //Goes to a specific tab based on index.

		    var goToTab = function(index) {
		      if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
		        tabNavigationLinks[activeIndex].classList.remove('is-active');
		        tabNavigationLinks[index].classList.add('is-active');
		        tabContentContainers[activeIndex].classList.remove('is-active');
		        tabContentContainers[index].classList.add('is-active');
		        activeIndex = index;
		        activateContent(index);
		      }
		    };

		    var activateContent = function (index){

		    	var userChoice = [];

				while (userChoice.length > 0){
					userChoice.pop();
				}

				switch (index){
		    		
		    		case 0 : userChoice.push('casino', 'night_club', 'movie_theater');
		    				 document.getElementById("entertainment").innerHTML = "Here are some details about your Entertainment options in the city."; 
		    				 break;
		    		case 1 : userChoice.push('lodging'); 
		    				 document.getElementById("hotels").innerHTML = "Here are some details about your Lodging options in the city."; 
		    				 break;
		    		case 2 : userChoice.push('restaurant', 'cafe');
		    				 document.getElementById("restaurants").innerHTML = "Here are some details about your Dining options in the city."; 
		    				 break;
		    		case 3 : userChoice.push('shopping_mall', 'grocery_or_supermarket', 'department_store', 'convenience_store'); 
		    				 document.getElementById("store").innerHTML = "Here are some details about your Shopping options in the city."; 
		    				 break;
		    		case 4 : userChoice.push('park','aquarium','art_gallery', 'museum', 'book_store', 'zoo'); 
		    				 document.getElementById("rec").innerHTML = "Here are some details about your Recreation options in the city."; 
		    				 break;
		    	}

		    	loadMapContents (userChoice, index);
		    }

		     // Returns init and goToTab 
		    return {
		      init: init,
		      goToTab: goToTab
		    };

		  };
 			
		   // Attach to global namespace		   
		  window.tabs = tabs;

		})();
