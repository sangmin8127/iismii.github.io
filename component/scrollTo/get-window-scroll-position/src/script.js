window.addEventListener("scroll", () => {
  if (window.scrollY < 100) {
    console.log("Not past 100px");
  } else {
    console.log("Past 100px!");
  }
});