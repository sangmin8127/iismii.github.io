// 요소 셀렉팅 
const button = document.getElementById('button');   // textbox 스크롤 테스트
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const section = document.getElementById('section');
const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const imgRect1 = section1.getBoundingClientRect().top;
const imgRect2 = section2.getBoundingClientRect().top;   // 
const txt1 = document.getElementById('txt1');
const txt2 = document.getElementById('txt2');
const txt3 = document.getElementById('txt3');
const txtRect = txt1.getBoundingClientRect().top;

button1.addEventListener('click', () => {
  window.scrollTo({ top: imgRect1, behavior: 'smooth' });
});

button2.addEventListener('click', () => {
  window.scrollTo({ top: imgRect2, behavior: 'smooth' });
});

button3.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {   // 스크롤 할 경우
  txt2.innerHTML = window.pageYOffset   // 현재 스크롤 위치값을 반환한다.
})

button.addEventListener('click', () => {   // 클릭 할 경우
  txt3.scroll({ top: 0, behavior: 'smooth' });   // 텍스트박스 최상단에 스크롤한다. 
})