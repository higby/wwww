$( document ).ready(function() {
  $(".toc li ul").hide();
  const header = new Letterize({
        targets: "#header"
      });
     $("#header span:lt(7)").attr('id', 'branden');
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
      ]
    });
});

$(document).on( "click", ".pageUpdate", function() {
  var addressValue = $(this).attr("href");
  $(".content").fadeOut( "fast", function() {
    $( ".content" ).load( addressValue + " .content", function() {
      $(".toc li ul").hide();
    } );
    $(".content").fadeIn("fast");
  });
  var droppedValue = addressValue.split(".");
  if (droppedValue.length > 1) {
    droppedValue.pop();
  }
  window.history.pushState({urlPath:droppedValue},"",droppedValue);
  event.preventDefault(); // cancel the event
});

window.addEventListener('popstate', (event) => {
  var addressValue = window.location.pathname;
  $(".content").fadeOut( "fast", function() {
    $( ".content" ).load( addressValue + " .content", function() {
      $(".toc li ul").hide();
    } );
    $(".content").fadeIn("fast");
  });
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
