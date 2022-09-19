let button = document.getElementById("button");
button.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  // window.scrollBy(0, -window.innerHeight);
});