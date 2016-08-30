
(function() {

   // The Tabs component.
   
  var tabs = function (options) {

    var el = document.querySelector(options.el);
    var tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
    var tabContentContainers = el.querySelectorAll(options.tabContentContainers);
    var initCalled = false;
    activeIndex = 0;

    
      //For initializing the component by attaching event listeners to each of the nav items.
   
    var init = function() {
      if (!initCalled) {
        initCalled = true;

        for (var i = 0; i < tabNavigationLinks.length; i++) {
          var link = tabNavigationLinks[i];
          handleClick(link, i);
        }
      }
    };

     //for handling click event listeners on each of the links in the tab navigation.
     
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

     // Returns init and goToTab 
    return {
      init: init,
      goToTab: goToTab
    };

  };
		
   // Attach to global namespace		   
  window.tabs = tabs;

})();
