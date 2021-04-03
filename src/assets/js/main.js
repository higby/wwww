
$(document).on( "click", ".pageUpdate", function() {
  var addressValue = $(this).attr("href");
  $(".content").fadeOut( "fast", function() {
    $( ".content" ).load( addressValue + " .content" );
    $(".content").fadeIn("fast");  });

  window.history.pushState({urlPath:addressValue},"",addressValue);
        event.preventDefault(); // cancel the event
      });
