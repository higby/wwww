createDiv();
gradientChange();

function createDiv() {
  var footer = document.getElementsByTagName("footer")[0];
  var div = document.createElement("div");
  div.setAttribute('id','particles-js');
  footer.parentNode.insertBefore(div, footer.nextSibling);
}


window.onscroll = function() {gradientChange()};

function gradientChange() {
  if (document.body.scrollTop > 750 || document.documentElement.scrollTop > 750) {
    document.getElementsByTagName("body")[0].setAttribute("class", "space");
  } else {
    document.getElementsByTagName("body")[0].removeAttribute("class", "space");
  }
}