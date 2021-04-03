
$(document).on( "click", ".pageUpdate", function() {
  var addressValue = $(this).attr("href");
  $(".content").slideUp( "normal", function() {
    $( ".content" ).load( addressValue + " .content" );
    $(".content").slideDown("normal");  });


  window.history.pushState({urlPath:addressValue},"",addressValue);
        event.preventDefault(); // cancel the event
      });
