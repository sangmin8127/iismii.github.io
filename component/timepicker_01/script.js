var defaults = {
  pagination: '.swiper-pagination',
  slidesPerView: 3,
  freeMode: true,
  freeModeSticky: true,
  freeModeMomentumRatio: 0.25,
  freeModeVelocityRatio: 0.25,
  freeModeMinimumVelocity: 0.1,
  mousewheelControl: true,
  mousewheelSensitivity: 0.5,
  loop: false,
  loopAdditionalSlides: 5,
  direction: 'vertical',
  slideToClickedSlide: true,
  centeredSlides: true
};

Swiper(
  '.swiper-container.hours', 
  Object.assign({}, defaults, { initialSlide: 13})
);

Swiper(
  '.swiper-container.minutes',
  Object.assign({}, defaults, { initialSlide: 37})
);

Swiper('.swiper-container.seconds', defaults);