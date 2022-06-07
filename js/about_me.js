[...document.getElementsByClassName("intro-el")].forEach(function (el, i) {
  el.onclick = () => {
    el.style.backgroundColor = "#8ecee4";

    [...document.getElementsByClassName("intro-content")][i].classList.add(
      "intro-content-show"
    );
  };
});
