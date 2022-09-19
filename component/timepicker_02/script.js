var datetime = new Date()
var hour = datetime.getHours()
console.log(hour)

var ampm = 0 //'am'
var now = '오전'
if(hour==0) {
  ampm = 1 //'pm'
  now = '오후'
}else if(hour < 13) {
  ampm = 0 //'am'
  now = '오전'
}else{
  hour-= 12
  ampm = 1 //'pm'
  now = '오후'
}
hour = (hour == 0) ? 12 :hour

var defaults = {
  autoHeight: true,
  pagination: '.swiper-pagination',
  slidesPerView: 4,
  freeMode: true,
  freeModeSticky: true,
  freeModeMomentumRatio: 0.25,
  freeModeVelocityRatio: 0.25,
  freeModeMinimumVelocity: 0.1,
  mousewheelControl: false,
  mousewheelSensitivity: 0.5,
  loop: true,
  loopAdditionalSlides: 5,
  direction: 'vertical',
  slideToClickedSlide: true,
  centeredSlides: true
};

var defaultsAMPM = {
  autoHeight: true,
  pagination: '.swiper-pagination',
  slidesPerView: 4,
  freeMode: true,
  freeModeSticky: true,
  freeModeMomentumRatio: 0.25,
  freeModeVelocityRatio: 0.25,
  freeModeMinimumVelocity: 0.1,
  mousewheelControl: false,
  mousewheelSensitivity: 0.5,
  loop: false,
  loopAdditionalSlides: 5,
  direction: 'vertical',
  slideToClickedSlide: true,
  centeredSlides: true
};

var hours = Swiper(
  '.swiper-container.hours', 
  Object.assign({}, defaults, {initialSlide:hour-1})
);

var ampm = Swiper(
  '.swiper-container.ampm',
  Object.assign({}, defaultsAMPM, {initialSlide:ampm})
);

function updateInput() {
  if (!input) {
    return false;
  }
  
  var start = input.selectionStart;
  var end = input.selectionEnd;
  var am = 0
  am = (ampm.realIndex == 0) ? 0 : 12
  input.value = parseInt(am) + parseInt(pad(hours.realIndex + 1));
  input.setSelectionRange(start, end);

  modal_exit();
}

var input = document.getElementById('time');
console.log(input)

function pad(v) {
  return v > 9? v : "0" + String(v);
}