let btn = document.querySelector('button'),
    btn2 = document.querySelectorAll('button')[1],
    input = document.querySelector('input'),
    select = document.querySelector('select');

btn.addEventListener('click', function () {
  window.scrollTo({
    left: 0,
    top: input.value,
    behavior: select.value
  });
}, false);

btn2.addEventListener('click', function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: select.value
  });
}, false);