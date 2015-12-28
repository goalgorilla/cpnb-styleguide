(function ($) {

  /*
   * Action bar behavior
   */

  Drupal.behaviors.actionBar = {
    attach: function (context, settings) {

      // Toggle content in action bar with more button
      $('.button-more').click(function(event) {
        $('.action-bar--content').toggleClass('open');
        $('.l-header').slideToggle(500);

        var closeAnchor = $(this).attr('data-closetext');

        // Replace the close anchor text with the trigger html and vice versa
          if(typeof closeAnchor !== typeof undefined && closeAnchor !== false) {
            var defaultAnchor = $(this).html();
            $(this).attr('data-closetext', defaultAnchor);
            $(this).html(closeAnchor);
          }
      });

    }

  };

})(jQuery);

