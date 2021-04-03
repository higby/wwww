
$(document).on( "click", ".pageUpdate", function() {
  var addressValue = $(this).attr("href");
  $(".content").fadeOut( "fast", function() {
    $( ".content" ).load( addressValue + " .content" );
    $(".content").fadeIn("fast");
    toc();
  });
  window.history.pushState({urlPath:addressValue},"",addressValue);
  event.preventDefault(); // cancel the event
});

function toc() {
  console.log("test");
  var li_ul = document.querySelectorAll(".toc li  ul");
    for (var i = 0; i < li_ul.length; i++) {
        li_ul[i].style.maxHeight = "0px";
       li_ul[i].style.transition = "max-height 1s ease-in-out";
    };

    var exp_li = document.querySelectorAll(".toc li > span");
    for (var i = 0; i < exp_li.length; i++) {
        exp_li[i].onclick = showul;
    };
    function showul () {
       if (this.innerHTML=='<svg height="24" viewBox="0 -5 24 24" width="24" aria-hidden="true" fill="RGBA(0,0,0,.6)"><path fill-rule="evenodd" d="M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"></path></svg>') {
       this.innerHTML='<svg height="24" viewBox="0 -5 24 24" width="24" aria-hidden="true" fill="RGBA(0,0,0,.6)"><path fill-rule="evenodd" d="M5.22 8.72a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06L12 14.44 6.28 8.72a.75.75 0 00-1.06 0z"></path></svg>';
     } else {
       this.innerHTML='<svg height="24" viewBox="0 -5 24 24" width="24" aria-hidden="true" fill="RGBA(0,0,0,.6)"><path fill-rule="evenodd" d="M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"></path></svg>';
     }
        nextul = this.nextElementSibling.nextElementSibling;
        if(nextul.style.maxHeight == "1000px") {
            nextul.style.maxHeight = "0px";
           nextul.style.transition = "max-height 1s cubic-bezier(0, 1, 0, 1)";

         }
        else {
            nextul.style.maxHeight = "1000px";
           nextul.style.transition = "max-height 1s ease-in-out";

         }
    }
}
