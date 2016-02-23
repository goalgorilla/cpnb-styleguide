(function ($) {

  /*
   * Emphasis on external links
   */
  Drupal.behaviors.externalLink = {
    attach: function (context, settings) {

      // add class to external links so they can be styled
      $('a.teaser--event').filter(function() {
        return this.hostname && this.hostname !== location.hostname;
      }).attr('target', '_blank').addClass('external-link');

    }
  };

})(jQuery);
