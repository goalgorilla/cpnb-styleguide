(function ($) {

  /*
   * Wrap selects into a themable div
   */

  Drupal.behaviors.enhanceForms = {
    attach: function (context, settings) {

      // Pass focused state to visible parent element.
      $('.form-item .form-select')
        .wrap('<div class="selector"></div>')
        .focus(function(){
          $(this).parent('.selector').addClass('focused');
        })
        .blur(function(){
          $(this).parent('.selector').removeClass('focused');
        });

    }

  };

})(jQuery);