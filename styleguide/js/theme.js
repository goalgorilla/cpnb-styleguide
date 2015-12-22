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
          site.addClass('search-is-open');
          e.preventDefault();
        });

        $('.mask-modal').click(function(e) {
          site.removeClass('search-is-open');
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

;(function($){
    //pass in just the context as a $(obj) or a settings JS object
    $.fn.autogrow = function(opts) {
        var that = $(this).css({overflow: 'hidden', resize: 'none'}) //prevent scrollies
            , selector = that.selector
            , defaults = {
                context: $(document) //what to wire events to
                , animate: true //if you want the size change to animate
                , speed: 200 //speed of animation
                , fixMinHeight: true //if you don't want the box to shrink below its initial size
                , cloneClass: 'autogrowclone' //helper CSS class for clone if you need to add special rules
                , onInitialize: false //resizes the textareas when the plugin is initialized
            }
        ;
        opts = $.isPlainObject(opts) ? opts : {context: opts ? opts : $(document)};
        opts = $.extend({}, defaults, opts);
        that.each(function(i, elem){
            var min, clone;
            elem = $(elem);
            //if the element is "invisible", we get an incorrect height value
            //to get correct value, clone and append to the body.
            if (elem.is(':visible') || parseInt(elem.css('height'), 10) > 0) {
                min = parseInt(elem.css('height'), 10) || elem.innerHeight();
            } else {
                clone = elem.clone()
                    .addClass(opts.cloneClass)
                    .val(elem.val())
                    .css({
                        position: 'absolute'
                        , visibility: 'hidden'
                        , display: 'block'
                    })
                ;
                $('body').append(clone);
                min = clone.innerHeight();
                clone.remove();
            }
            if (opts.fixMinHeight) {
                elem.data('autogrow-start-height', min); //set min height
            }
            elem.css('height', min);

            if (opts.onInitialize) {
                resize.call(elem);
            }
        });
        opts.context
            .on('keyup paste', selector, resize)
        ;

        function resize (e){
            var box = $(this)
                , oldHeight = box.innerHeight()
                , newHeight = this.scrollHeight
                , minHeight = box.data('autogrow-start-height') || 0
                , clone
            ;
            if (oldHeight < newHeight) { //user is typing
                this.scrollTop = 0; //try to reduce the top of the content hiding for a second
                opts.animate ? box.stop().animate({height: newHeight}, opts.speed) : box.innerHeight(newHeight);
            } else if (!e || e.which == 8 || e.which == 46 || (e.ctrlKey && e.which == 88)) { //user is deleting, backspacing, or cutting
                if (oldHeight > minHeight) { //shrink!
                    //this cloning part is not particularly necessary. however, it helps with animation
                    //since the only way to cleanly calculate where to shrink the box to is to incrementally
                    //reduce the height of the box until the $.innerHeight() and the scrollHeight differ.
                    //doing this on an exact clone to figure out the height first and then applying it to the
                    //actual box makes it look cleaner to the user
                    clone = box.clone()
                        //add clone class for extra css rules
                        .addClass(opts.cloneClass)
                        //make "invisible", remove height restriction potentially imposed by existing CSS
                        .css({position: 'absolute', zIndex:-10, height: ''})
                        //populate with content for consistent measuring
                        .val(box.val())
                    ;
                    box.after(clone); //append as close to the box as possible for best CSS matching for clone
                    do { //reduce height until they don't match
                        newHeight = clone[0].scrollHeight - 1;
                        clone.innerHeight(newHeight);
                    } while (newHeight === clone[0].scrollHeight);
                    newHeight++; //adding one back eliminates a wiggle on deletion
                    clone.remove();
                    box.focus(); // Fix issue with Chrome losing focus from the textarea.

                    //if user selects all and deletes or holds down delete til beginning
                    //user could get here and shrink whole box
                    newHeight < minHeight && (newHeight = minHeight);
                    oldHeight > newHeight && opts.animate ? box.stop().animate({height: newHeight}, opts.speed) : box.innerHeight(newHeight);
                } else { //just set to the minHeight
                    box.innerHeight(minHeight);
                }
            }
        }
        return that;
    }
})(jQuery);

(function ($) {

  /*
   * textarea behavior
   */
  Drupal.behaviors.autogrow = {
    attach: function (context, settings) {

      // 1. these element must autogrow as the user types on multiple lines
      $('.autogrow').autogrow({animate: false}); //1

    }
    
  };

})(jQuery);


