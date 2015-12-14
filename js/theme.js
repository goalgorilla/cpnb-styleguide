(function ($) {

  /*
   * Mobile menu behavior
   */
  Drupal.behaviors.mobileNav = {
    attach: function (context, settings) {

      $('body').once('mobile-nav', function(){

        var nav = $('.l-region--header'); // Define the menu
        var site = $('body'); // Define the site
        var resizeTimer; // Set resizeTimer to empty so it resets on page load

        var isMobileView = function( width ) {
          // This function checks device width
          if (width < 768) {
            return true;
          } else {
            return false;
          }
        }

        var initMobileMenu = function(){
          if( isMobileView( $(window).width() ) ) {
            $('.block--thema-menu').insertBefore('.block--search');
          } else {
            if ( $('.l-region--header .block--thema-menu').length) {
              console.log('yessir');
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
