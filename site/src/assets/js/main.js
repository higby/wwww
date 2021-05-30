$(document).ready(function () {
  onReload();
  oldValue = "";
  oldValue = window.location.pathname.split(".html");
  tinykeys(window, {
    "ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight B A": () => {
      location="https://www.youtube.com/watch?v=KBjhAqXg8MY";
  },
  "h i g b y": () => {
    fancyName();
  }
})
});

$("header h1 a").ready(function() {
  setTimeout(
    function() {
      fancyName();
    }, 250);
})

function onReload() {
  pokeHop();
}

function fancyName() {
  var headerClass = $("header h1 a").attr("class");
  if ($.type( headerClass ) === "undefined") {
    $("header h1 a").attr("class", "animating");
  } else {
    $("header h1 a").attr("class", "animating pageUpdate");
  }
  // Turn header into a fuck ton of spans323232
  const header = new Letterize({
    targets: "header h1 a",
  });
  $("header h1 a span:lt(7)").attr("id", "branden"); // Give the first seven spans a specific id

  // Setup animation
  var purple = anime.timeline({
    targets: header.listAll,
    duration: "1000",
    delay: anime.stagger(45),
    easing: "easeInOutQuad",
  });
  purple
    .add({
      color: [
        {
          value: "#323232",
        },
        {
          value: "#965ee5",
        },
      ],
    })
    .add({
      targets: "#branden",
      color: [
        {
          value: "#323232",
        },
      ],
      complete: function () {
        $("header h1 i").css("color", "#965ee5");
        header.deletterize();
        if ($.type( headerClass ) !== "undefined") {
          $("header h1 a").attr("class", "pageUpdate");
        } else {
          $("header h1 a").removeAttr("class");
        }
      },
    });
}

function contentUpdate() {

  newValue = window.location.pathname.split(".html");
  if (newValue[0] != oldValue[0]) {
    var location = window.location.pathname;
    h = true;
    g = true;
    $("main").fadeOut("fast", function () {
      if (h == true) {
        h = false;
        $("main").load(location + " main", function (response, status, xhr) {
          if ( status == "error" ) {
            $("main").load("/404" + " main", function () {
              if (g == true) {
                g = false;
                $("main main").hide();
                $("main main").unwrap();
                $("main").fadeIn("fast");
                onReload();
              }
            });
            $("title").load("/404" + " title", function() {
              $("title title").unwrap();
            });
          }
          else if (g == true) {
              g = false;
              $("main main").hide();
              $("main main").unwrap();
              $("main").fadeIn("fast");
              onReload();
            }
        });
        $("title").load(location + " title", function() {
          $("title title").unwrap();
        });
      }
    });
  }
  oldValue[0] = newValue[0];
}

function pokeHop() {
  list = $(".imgHolder .poke");
  list2 = $(".imgHolder .poke");
  loop = $(".imgHolder .poke");
  for (var i = 0; i < list.length; i++) {
    var poke = list[i];
    list[i] = anime({
      targets: poke,
      easing: "easeOutQuad",
      duration: "250",
      autoplay: false,
      direction: "alternate",
      translateY: "-10",
      complete: function (anim) {
        b = anim.animatables[0].target.id;
        e = $.inArray(b, list2);
        if (loop[e] == true) {
          anim.play();
        }
      },
    });
    list2[i] = $("#.imgHolder .poke")[i].id;
  }
  $(".imgHolder .poke").hover(
    function () {
      var hovered = $(this).attr("id");
      q = $.inArray(hovered, list2);
      list[q].play();
      loop[q] = true;
    },
    function () {
      loop[q] = false;
    }
  );
}

window.addEventListener("popstate", (event) => {
  contentUpdate();
});

$(document).on("click", ".pageUpdate", function () {
  var a = $(this).attr("href").split(".html");
  if (a.length > 1) {
    a.pop();
  }
  history.pushState({}, "", a);
  event.preventDefault();
  contentUpdate();
});

$(document).on("click", "nav ul li span", function () {
  if ($(this).next().next().is(":hidden")) {
    $(this).next().next().slideDown("fast", "easeOutQuad");
    var arrow = $(this).children();
    console.log(arrow);
    anime({
      targets: this.children,
      rotateZ: 90,
      duration: 100,
      easing: 'easeOutQuad'
    });
  } else {
    $(this).next().next().slideUp("fast", "easeOutQuad");
    anime({
      targets: this.children,
      rotateZ: 0,
      duration: 100,
      easing: 'easeOutQuad'
    });
  }
});

$(document).on("click", ".subtitle", function () {
  if ($(this).next().is(":hidden")) {
    $(this).next().slideDown("fast", "easeOutQuad");
    $(this)
      .children()
      .replaceWith(
        '<svg height="24" viewBox="0 0 0 0" width="24" aria-hidden="true" fill="#4b4b4b"><path d="M11.646 15.146L5.854 9.354a.5.5 0 01.353-.854h11.586a.5.5 0 01.353.854l-5.793 5.792a.5.5 0 01-.707 0z"></path>/svg>'
      );
  } else {
    $(this).next().slideUp("fast", "easeOutQuad");
    $(this)
      .children()
      .replaceWith(
        '<svg height="24" viewBox="0 0 0 0" width="24" aria-hidden="true" fill="#4b4b4b"><path d="M15.146 12.354l-5.792 5.792a.5.5 0 01-.854-.353V6.207a.5.5 0 01.854-.353l5.792 5.792a.5.5 0 010 .708z"></path></svg>'
      );
  }
});
