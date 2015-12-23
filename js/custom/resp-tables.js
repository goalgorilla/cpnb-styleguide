(function ($) {

  /*
   * Responsive tables behavior
   */
  Drupal.behaviors.responsiveTables = {
    attach: function (context, settings) {

      $('body').once('tables', function(){

        //Счиаем наши загаловки
        var head_col_count =  $('.table thead th').size();
        //Считаем наши th элементы в таблице
        for ( j=0; j <= head_col_count; j++ )  {
          // Работа с текстом
          var head_col_label = $('.table thead th:nth-child('+ j +')').text();
          //Каждому td присваиваем data-title, который потом выводим через css
          $('.table tr td:nth-child('+ j +')').replaceWith(
            function(){
            return $('<td data-title="'+ head_col_label +'">').append($(this).contents());
            }
          );
        }

      });

    }
  };

})(jQuery);
