$( document ).ready(function() {
  $(".toc li ul").hide();
});

$(document).on( "click", ".pageUpdate", function() {
  var addressValue = $(this).attr("href");
  $(".content").fadeOut( "fast", function() {
    $( ".content" ).load( addressValue + " .content", function() {
      $(".toc li ul").hide();
    } );
    $(".content").fadeIn("fast");
  });
  window.history.pushState({urlPath:addressValue},"",addressValue);
  event.preventDefault(); // cancel the event
});

$(document).on( "click", ".toc li span", function() {
  if($(this).next().next().is(":hidden")) {
    $(this).next().next().slideDown("fast");
    $(this).children().replaceWith('<svg height="24" viewBox="0 -5 24 24" width="24" aria-hidden="true" fill="RGBA(0,0,0,.6)"><path fill-rule="evenodd" d="M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"></path></svg>');
  } else {
    $(this).next().next().slideUp("fast");
    $(this).children().replaceWith('<svg height="24" viewBox="0 -5 24 24" width="24" aria-hidden="true" fill="RGBA(0,0,0,.6)"><path fill-rule="evenodd" d="M5.22 8.72a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06L12 14.44 6.28 8.72a.75.75 0 00-1.06 0z"></path></svg>');
  }
});
