// helper for limiting window scroll event listener calls
function debounce(func, wait = 10, immediate = true) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const header = document.querySelector('.header');
const headline = document.querySelector('.headline');
const subheadline = document.querySelector('.subheadline');

const headlineSlideIn = function() {
  headline.classList.add('header-slide-in');
}
const subheadlineSlideIn = function() {
  subheadline.classList.add('header-slide-in');
}

const headerToggleFade = function() {
  if (window.scrollY > 100) {
    header.classList.add('header-fade-out');
  } else {
    header.classList.remove('header-fade-out');
  }
}

const panels = document.querySelectorAll('.panel');

const panelSlideIn = function() {
  // for each panel, check if window bottom has scrolled past start of panel -> if yes, add .panel-fade-in class
  panels.forEach(panel => {
    const slideInAt = (window.scrollY + window.innerHeight) - panel.offsetHeight / 4;
    const panelMidpoint = panel.offsetTop + panel.offsetHeight / 4;
    console.log('panelMidpoint', panelMidpoint);
    console.log('slideInAt', slideInAt);
    if (slideInAt > panelMidpoint) {
      panel.classList.add('panel-fade-in');
    }
  })
}

setTimeout(headlineSlideIn, 1000);
setTimeout(subheadlineSlideIn, 2000);
window.addEventListener('scroll', debounce(function() {
  panelSlideIn();
  headerToggleFade();
}));



// 약 박스, 보톰시트 ------------------------------------------------------------------------------------------------------------------------------
// 스케줄이 있는 약 클릭시
const drugBs01 = new ScheduleBS("#drug-item-01-bs");
document.querySelector("#drug-item-01").addEventListener("click", (e) => {
  const t = e.target;
  const drug_banner = t.closest(".drug-banner");
  const drug_status = t.closest(".drug-status");
  const dur_tag_remove = t.closest(".btn--remove");
  console.log(t);
  if (t != drug_banner && t != drug_status && t != dur_tag_remove) {
    drugBs01.on(e);
  } else if (t == drug_banner) {
    console.log("drug banner clicked!");
  } else if (t == drug_status && drug_status.classList.contains("dur")) {
    side_dur();
  } else if (t == dur_tag_remove) {
    drug_status.remove();
    //DUR 태그 닫기 버튼은 "다시보지 않기"로 개선 필요. (한번 닫으면 다시는 보이지 않게 로컬에 저장)
  }
});

// 필요시복용 약 클릭시
const prnBs01 = new PrnBS("#prn-item-01-bs");
document.querySelector("#prn-item-01").addEventListener("click", prnBs01.on);

const prnBs02 = new PrnBS("#prn-item-02-bs");
document.querySelector("#prn-item-02").addEventListener("click", prnBs02.on);

