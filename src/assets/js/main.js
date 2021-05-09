$(document).ready(function () {
  onReload();
  fancyName();
  function fancyName() {
    // Secret css values (so that the header still has the correct colors in non-js environments)
    $("header i").css("color", "RGBA(0,0,0,.8)");
    $("header a").attr("class", "animating pageUpdate");
    // Turn header into a fuck ton of spans
    const header = new Letterize({
      targets: "header a",
    });
    $("header a span:lt(7)").attr("id", "branden"); // Give the first seven spans a specific id

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
            value: "RGBA(0,0,0,.8)",
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
            value: "RGBA(0,0,0,.8)",
          },
        ],
        complete: function () {
          $("header i").removeAttr("style");
          header.deletterize();
          $("header a").attr("class", "pageUpdate");
        },
      });
  }
  oldValue = window.location.pathname.split(".html");
  if (oldValue[0].length > 1) {
    oldValue.pop();
  }
});

function onReload() {
  $(".toc li ul").hide();
  $(".subposts").hide();
  pokeHop();
}

function contentUpdate() {
  newValue = window.location.pathname.split(".html");
  if (newValue.length > 1) {
    newValue.pop();
  }
  if (newValue[0] != oldValue[0]) {
    var location = window.location.pathname;
    h = true;
    g = true;
    $(".content").fadeOut("fast", function () {
      if (h == true) {
        h = false;
        $(".content").load(location + " .content", function () {
          if (g == true) {
            g = false;
            $(".content").fadeIn("fast");
            onReload();
          }
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

$(document).on("click", ".pageUpdate", function () {
  var a = $(this).attr("href").split(".html");
  if (a.length > 1) {
    a.pop();
  }
  history.pushState({}, "", a);
  event.preventDefault();
  contentUpdate();
});

window.addEventListener("popstate", (event) => {
  contentUpdate();
});

$(document).on("click", ".toc li span", function () {
  if ($(this).next().next().is(":hidden")) {
    $(this).next().next().slideDown("fast", "easeOutQuad");
    $(this)
      .children()
      .replaceWith(
        '<svg height="24" viewBox="0 -5 24 24" width="24" aria-hidden="true" fill="RGBA(0,0,0,.6)"><path fill-rule="evenodd" d="M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"></path></svg>'
      );
  } else {
    $(this).next().next().slideUp("fast", "easeOutQuad");
    $(this)
      .children()
      .replaceWith(
        '<svg height="24" viewBox="0 -5 24 24" width="24" aria-hidden="true" fill="RGBA(0,0,0,.6)"><path fill-rule="evenodd" d="M5.22 8.72a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06L12 14.44 6.28 8.72a.75.75 0 00-1.06 0z"></path></svg>'
      );
  }
});

$(document).on("click", ".subtitle", function () {
  if ($(this).next().is(":hidden")) {
    $(this).next().slideDown("fast", "easeOutQuad");
    $(this)
      .children()
      .replaceWith(
        '<svg height="24" viewBox="0 -5 24 24" width="24" aria-hidden="true" fill="RGBA(0,0,0,.6)"><path fill-rule="evenodd" d="M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"></path></svg>'
      );
  } else {
    $(this).next().slideUp("fast", "easeOutQuad");
    $(this)
      .children()
      .replaceWith(
        '<svg height="24" viewBox="0 -5 24 24" width="24" aria-hidden="true" fill="RGBA(0,0,0,.6)"><path fill-rule="evenodd" d="M5.22 8.72a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 00-1.06-1.06L12 14.44 6.28 8.72a.75.75 0 00-1.06 0z"></path></svg>'
      );
  }
});
