
// 보톰시트 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 보톰시트 터치/드래그 이벤트
class TouchDragListener {
	constructor({el, touchStartCallback, touchEndCallback, touchMoveCallback, showLog}) {
		this.el = el;
		this.touchStartCallback = touchStartCallback;
		this.touchEndCallback = touchEndCallback;
		this.touchMoveCallback = touchMoveCallback;
		this.showLog = showLog;
		this.active = false;
		this.currentY;
		this.initialY;
		this.yOffset = 0;
		this.dragStart = this.dragStart.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
		this.drag = this.drag.bind(this);
		this.el.addEventListener("mousedown", this.dragStart);
		this.el.addEventListener("mouseleave", this.dragEnd);
		this.el.addEventListener("mouseup", this.dragEnd);
		this.el.addEventListener("mousemove", this.drag);
		this.el.addEventListener("touchstart", this.dragStart);
		this.el.addEventListener("touchend", this.dragEnd);
		this.el.addEventListener("touchmove", this.drag);
	}
	dragStart(e) {
		this.active = true;
		this.el.classList.add("active");
		if (e.type === "touchstart") {
			this.initialY = e.touches[0].clientY - this.yOffset;
		} else {
			this.initialY = e.clientY - this.yOffset;
		}
		if (!this.touchStartCallback) return;
		this.touchStartCallback({
			el: this.el,
			active: this.active,
			currentY: this.currentY,
			initialY: this.initialY,
			yOffset: this.offSetY
		})
	}
	dragEnd(e) {
		this.active = false;
		this.el.classList.remove("active");
		this.yOffset = 0;
		this.initialY = this.currentY;
		if (!this.touchEndCallback) return;
		this.touchEndCallback({
			el: this.el,
			active: this.active,
			currentY: this.currentY,
			initialY: this.initialY,
			yOffset: this.offSetY
		})
	}
	drag(e) {
		if (!this.active) return;
		e.preventDefault();
		if (e.type === "touchmove") {
			this.currentY = e.touches[0].clientY - this.initialY;
		} else {
			this.currentY = e.clientY - this.initialY;
		}
		this.yOffset = this.currentX;
		if (!this.touchMoveCallback) return;
		this.touchMoveCallback({
			el: this.el,
			active: this.active,
			currentY: this.currentY,
			initialY: this.initialY,
			yOffset: this.offSetY
		});
		if (this.showLog) {
			console.log({
				active: this.active,
				initialY: this.initialY,
				currentY: this.currentY,
				offSetY: this.offSetY
			});
		}        
	}
}

// 보톰시트 공통
class BottomSheet {
	constructor(el) {
		// this.el = el;
		this.el = document.querySelector(el);
		this.scrim = this.el.querySelector(".bs__scrim");
		this.close = this.el.querySelector(".bs__close");
		this.handle = this.el.querySelector(".bs__handle");
		this.sheet = this.el.querySelector(".bs__sheet");
		this.on = this.on.bind(this);
		this.off = this.off.bind(this);

		this.scrim.addEventListener("click", this.off);
		this.close.addEventListener("click", this.off);
		this.handle.addEventListener("click", this.off);
		
		this.sheetListener = new TouchDragListener({
			el: this.sheet,
			touchStartCallback: ({el, active, initialY, currentY, yOffset}) => {
				el.style.setProperty("--translateY", `translateY(0)`);
				el.style.setProperty("transition", `unset`);
			},
			touchEndCallback: ({el, active, initialY, currentY, yOffset}) => {
				el.style.setProperty(
					"-webkit-transition",
					`transform 350ms cubic-bezier(0.4, 0, 0.2, 1)`
				);
				el.style.setProperty(
					"--translateY",
					`translateY(${currentY}px)`
				);
			},
			touchMoveCallback: ({el, active, initialY, currentY, yOffset}) => {
				if (currentY <= -40) {
					currentY = -41 + currentY / 10;
				} else if (currentY <= -60) {
					currentY = -60;
				} else if (currentY >= 120) {
					this.off(currentY);
					return;
				}
				el.style.setProperty(
					"--translateY",
					`translateY(${currentY}px)`
				);
			},
		});
		this.scrimListener = new TouchDragListener({
			el: this.scrim,
			touchMoveCallback: ({el, active, initialY, currentY, yOffset}) => {
				if (currentY >= 83) {
					this.off();
					return;
				}
			}
		});
	}
	on(e) {
		if (e) e.preventDefault();
		this.el.classList.add("active");
	}
	off(translateY) {
		if (!translateY) {
			this.sheet.style.setProperty("--translateY", `translateY(201px)`);
		} else {
			this.sheet.style.setProperty(
				"-webkit-transition",
				`transform 350ms cubic-bezier(0.4, 0, 0.2, 1)`
			);
			this.sheet.style.setProperty(
				"--translateY",
				`translateY(${translateY}px)`
			);
		}
		this.el.classList.remove("active");
	}
}

// 스케줄이 있는 약 ------------------------------
class ScheduleBS extends BottomSheet {
	constructor(el) {
		super(el);

		this.list = this.el.querySelector(".drug-item-list__body>.list-wrap");
		this.pagination = this.el.querySelector(".drug-item-list__body>.pagination-wrap");
		this.toggleBtn = this.el.querySelector(".drug-item-list__footer .toggle__take-all");
		this.takeAllCheckbox = this.el.querySelector(".toggle__take-all-checkbox");
		this.takeIdv = this.el.querySelector(".drug-item-list__footer .toggle__take-all-checkbox");
		this.toggleTakeIdvs = this.el.querySelectorAll(".drug-item-list__body>.list-wrap .toggle__take-idv");
		this.doses = this.el.querySelectorAll(".drug-item-list__body>.list-wrap .dose")
		this.takeAllConfirm = this.el.querySelector(".btn--take-all-confirm");
		this.takeIdvConfirm = this.el.querySelector(".btn--take-idv-confirm");
		this.idvTakeBtns = this.el.querySelectorAll(".toggle__take-idv-checkbox");
		this.btnIdvConfirm = this.el.querySelector(".btn--take-idv-confirm");
		this.submitBtns = this.el.querySelectorAll('.drug-item-list__footer>input');
		this.itemCount = this.list.childElementCount; 
		this.itemPerPage = 5
		this.totalPage = Math.ceil(this.itemCount / this.itemPerPage);
		
		this.el.addEventListener("change", this.takeAllIdvToggle);
		this.el.addEventListener('change', this.takeIdvConfirmAtv);

		this.scrim.addEventListener("click", this.idvReset);
		this.close.addEventListener("click", this.idvReset);
		this.handle.addEventListener("click", this.idvReset);
		


		// 버튼 햅틱(진동) >> 안드로이드 크롬에서만 작동
		// this.submitBtns.forEach(function(item) {
		// 	item.addEventListener('click', () => navigator.vibrate(30))
		// })
	}
	on(e) {
		if (e) e.preventDefault();
		this.el.classList.add("active");
		// 페이지 넘김 show/hide
		if (this.itemCount && this.itemCount <= 4) {
			this.pagination.style.setProperty("display", `none`);
		} else {
			console.log('pagination applied');
			this.pagination.style.setProperty("display", `flex`);
		};
		// 전체-부분 토글 show/hide
		if (this.itemCount && this.itemCount <= 1) {
			this.toggleBtn.style.setProperty("display", `none`);
		};
		
	}
	// "전체 / 부분" 토글 
	takeAllIdvToggle = () => {
		if (this.takeIdv.checked) {
			this.toggleTakeIdvs.forEach(function(e){
				e.style.setProperty('display', 'block');
			})
			this.doses.forEach(function(e){
				e.style.setProperty('display', 'none');
			})
			this.takeIdvConfirm.style.setProperty("display", `block`);
			this.takeAllConfirm.style.setProperty("display", `none`);
		} else {
			this.toggleTakeIdvs.forEach(function(e){
				e.style.setProperty('display', 'none');
			})
			this.doses.forEach(function(e){
				e.style.setProperty('display', 'block');
			})
			this.takeIdvConfirm.style.setProperty("display", `none`);
			this.takeAllConfirm.style.setProperty("display", `block`);
		}
	}
	// "부분 복약" 버튼 활성화 
	takeIdvConfirmAtv = () => {
		this.c = 0
		for (this.i=0; this.i < this.idvTakeBtns.length; this.i++) {
			if (this.idvTakeBtns[this.i].checked) {
				this.c++;
			}
		}
		if (this.c === 0) {
			this.btnIdvConfirm.disabled = true;
		} else {
			this.btnIdvConfirm.disabled = false;
		}
	}
}

// 필요시 복용 ------------------------------

class PrnBS extends BottomSheet {
	constructor(el) {
		super(el);
		this.submitBtn = this.el.querySelector('.drug-item-list__footer>input');
		// 버튼 햅틱(진동) >> 안드로이드 크롬에서만 작동
		// this.submitBtn.addEventListener('click', () => navigator.vibrate(30));
		this.taken_history = this.el.querySelector('.taken-history');
		this.btn_take = this.el.querySelector('.btn--take-all-confirm');
		this.initTime();
		this.el.addEventListener('click', this.eventHandler);
	}
	initTime() {
		let drug_taken = this.taken_history.querySelectorAll('.taken-time>span');
		// 시간순으로 정렬하기 위해서 만들어 놓은 함수입니다.
		for (let i of drug_taken) {
			const ampm = i.innerText.substr(0, 2);
			const hhmm = i.innerText.substr(3, i.innerText.length);
			this.time_split = hhmm.split(":");
			this.hh = Number(this.time_split[0]);
			this.mm = this.time_split[1];
			this.time_minutes = (this.hh * 60) + Number(this.mm);
			if (ampm == '오후') {
				this.time_minutes = this.time_minutes + 720;
			}
			i.closest('.drug-taken').setAttribute('data-time', this.time_minutes);
		}
	}
	on(e) {
		if (e) e.preventDefault();
		this.el.classList.add("active");
	}
	eventHandler = (e) => {
		this.t = e.target;
		this.btn_remove = this.t.closest('.btn--remove');
		this.drug_taken = this.t.closest('.drug-taken');
		this.taken_time = this.t.closest('.taken-time>span');
		this.taken_time2 = this.t.closest('.taken-time');
		this.drugTakens = this.taken_history.querySelectorAll('li.drug-taken');
		
		if (this.t == this.btn_remove) {
			this.drug_taken.remove();
		} else if (this.t == this.taken_time || this.t == this.taken_time2) {
			this.current = this.taken_time.innerText.substr(3, this.taken_time.innerText.length);
			// 현재 선택된 시간을 최초값으로 반영
			app.timePicker(this.current, (time) => {
				this.changeTime(time)
			});
		} else if (this.t == this.btn_take) {
			let today = new Date();   
			let hh = today.getHours();
			let mm = today.getMinutes(); 
			let time = `${hh}:${mm}`;
			this.takeDrug(time)
		}
	}
	changeTime = (time) => {
		if (!time) return;
		this.time_split = time.split(":");
		this.hh = Number(this.time_split[0]);
		this.mm = this.time_split[1];
		if (this.hh <= 11 && this.hh >= 0) {
			this.ampm = '오전';
			this.hour = this.hh;
		} else if (this.hh == 12) {
			this.ampm = '오후';
			this.hour = this.hh;
		} else {
			this.ampm = '오후';
			this.hour = this.hh - 12;
		}
		const changedTime = `${this.ampm} ${this.hour}:${this.mm}`;
		this.taken_time.innerText = changedTime;
		// 최근 시간(가장 큰 시간)이 맨 상단에 올라오도록 정렬하는 기능 추가 필요
	}
	takeDrug = (time) => {
		console.log(time)
		if (!time) return;
		this.time_split = time.split(":");
		this.hh = Number(this.time_split[0]);
		this.mm = this.time_split[1];
		if (this.hh <= 11 && this.hh >= 0) {
			this.ampm = '오전';
			this.hour = this.hh;
		} else if (this.hh == 12) {
			this.ampm = '오후';
			this.hour = hh;
		} else {
			this.ampm = '오후';
			this.hour = this.hh - 12;
		}
		const takenTime = `${this.ampm} ${this.hour}:${this.mm}`;
		const drugTakenInput = `
			<li class="drug-taken">
				<div class="taken-time">
					<span>${takenTime}</span>&nbsp;복약
				</div>
				<a class="btn--remove">
					취소
				</a>
			</li>
		`;
		this.taken_history.innerHTML += drugTakenInput;
		// 최근 시간(가장 큰 시간)이 맨 상단에 올라오도록 정렬하는 기능 추가 필요
	}
	// 4개 이상의 약을 복약했을 때 "다음/이전" 버튼 노출
}



// Selector(선택자) 보톰시트 ------------------------------

class SelectorBS extends BottomSheet {
	constructor(el) {
		super(el);
		this.items = this.el.querySelectorAll(".bs__item");
		this.cancel = this.el.querySelector(".bs__cancel");
		this.confirm = this.el.querySelector(".bs__confirm");
		this.el.addEventListener('click', this.eventHandler);
	}
	on(e) {
		if (e) e.preventDefault();
		this.el.classList.add("active");
	}
	eventHandler = (e) => {
		this.t = e.target;
		this.item = this.t.closest('.bs__item');
		setTimeout(() => {
			this.off();
		}, 200);
	}
}


