$( document ).ready(function() {

  $(".toc li ul").hide();
  $("header i").css("color", "RGBA(0,0,0,.8)");
  $("header a").attr("class", "animating pageUpdate");
  const header = new Letterize({
        targets: "header a"
      });
     $("header a span:lt(7)").attr('id', 'branden');
    var purple = anime.timeline({
       targets: header.listAll,
       duration: '1000',
       delay: anime.stagger(45),
       easing: 'easeInOutQuad'
     });

    purple
    .add({
        color: [
        { value: 'RGBA(0,0,0,.8)' },
        { value: '#965ee5'}
      ]
    })
    .add({
      targets: "#branden",
        color: [
        { value: 'RGBA(0,0,0,.8)' }
      ],
      complete: function() {
        $("header i").removeAttr("style");
        header.deletterize();
        $("header a").attr("class", "pageUpdate");
      }
    });
    var addressValue = window.location.pathname;
    oldValue = addressValue.split(".");

});

$(document).on( "click", ".pageUpdate", function() {
  var addressValue = $(this).attr("href");
  $(".content").fadeOut( "fast", function() {
    $( ".content" ).load( addressValue + " .content", function( response, status, xhr ) {

      if (status == "error") {
  		$( ".content" ).load( "404.html .content", function() {
              $(".toc li ul").hide();
      } );
    } else {
      $(".toc li ul").hide();

    }
  } );
    $(".content").fadeIn("fast");
  });
  var droppedValue = addressValue.split(".");
  if (droppedValue.length > 1) {
    droppedValue.pop();
  }
  window.history.pushState({urlPath:droppedValue},"",droppedValue);
  oldValue = droppedValue;
  console.log("test1");
  event.preventDefault(); // cancel the event
});

window.addEventListener('popstate', (event) => {
  var addressValue = window.location.pathname;
  if ( addressValue != oldValue ) {
    $(".content").fadeOut( "fast", function() {
      $( ".content" ).load( addressValue + " .content", function( response, status, xhr ) {
        if (status == "error") {
      		$( ".content" ).load( "404.html .content", function() {
                  $(".toc li ul").hide();
          } );
        } else {
          $(".toc li ul").hide();

        }
      } );
      $(".content").fadeIn("fast");
      oldValue = addressValue.split(".");
    });
  	}
console.log("test12");
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
