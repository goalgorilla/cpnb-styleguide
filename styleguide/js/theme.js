(function ($) {

  /*
   * Mobile menu behavior
   */
  Drupal.behaviors.mobileNav = {
    attach: function (context, settings) {

      $('body').once('mobile-nav', function(){

        var nav = $('.block--thema-menu'); // Define the menu
        var site = $('body'); // Define the site
        var resizeTimer; // Set resizeTimer to empty so it resets on page load
        var clickEventSet = true; // Variable to check while resizing if an event is already set

        var isMobileView = function( width ) {
          // This function checks device width
          if (width < 768) {
            return true;
          } else {
            return false;
          }
        }

        var initMobileMenu = function(){

          if ( nav.length ) {

            if( isMobileView( $(window).width() ) && clickEventSet == true ) {
              // Add click handler when they do not exist on anchors when in mobile view 
              nav.find('.expanded > .menu__link').click(function(e) {
                // Toggle display of the sibling menu list 
                $(this).next('.menu').slideToggle(400);
                $(this).toggleClass('open');
                e.preventDefault();
              });

              clickEventSet = false; // make sure to execute the above only once

            } else if ( !isMobileView( $(window).width() ) && clickEventSet == false ) {
              // Show the third level items of the menu for sure
              $('.block--system-main-menu .menu .menu').removeAttr('style');
              // Unbind the existing click eventhandlers
              nav.find('.expanded > a').unbind( "click" );
              clickEventSet = true; // make sure to execute the above only once
            }

          }

          if( isMobileView( $(window).width() ) ) {
            $('.block--thema-menu').insertBefore('.block--search');
          } else {
            if ( $('.l-region--header .block--thema-menu').length) {
              $('.block--thema-menu').insertBefore('.shoppingcart');
            }
          }
        }

        $('.mobile-nav-btn').click(function(e) {
          // Toggle body class so css transition will execute (open /close)
          site.toggleClass('menu-is-open');
          $(this).toggleClass('is-clicked');
          e.preventDefault();
        });

        $('.desktop-search-btn').click(function(e) {
          $('.block--search').toggle();
          e.preventDefault();
        });

        initMobileMenu( $(window).width() );

        $(window).on('resize', function(e){
          // Resize event for triggering the initMobileMenu function
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(initMobileMenu, 250);
        });
        
      });

    }
  };

})(jQuery);
