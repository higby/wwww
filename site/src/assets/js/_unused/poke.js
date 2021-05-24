
$( document ).ready(function() {
  active = "0"; 

  freakout = anime({
   targets: 'img',
   autoplay: false,
   easing: 'easeInOutElastic(1, .6)',
   direction: 'reverse',
   loop: true,
   translateY: [
     {
       value: "-5"
     },
     {
       value: "500"
     },
     {
       value: "-25"
     },
     {
       value: "5"
     },
     {
       value: "457"
     }
   ],
   translateX: [
     {
       value: "-25"
     },
     {
       value: "13"
     },
     {
       value: "-45"
     },
     {
       value: "3"
     },
     {
       value: "300"
     }
   ],
   scale: [
     {
       value: 1
     },
     {
       value: 3
     }
   ]
  });

  freakout.seek(1);

 });

$(document).on('keyup',function(e) {
    if(e.which == 65) {
      if (active == "0") {
        $(".head h1").replaceWith("<h1>You pressed <marquee>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</marquee></h1>");
        freakout.play();
        active = "1";
      } else {
        freakout.pause();
        freakout.seek(0);
        active = "0";
      }
    }
});
