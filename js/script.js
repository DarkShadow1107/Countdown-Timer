var time, start, counter, minutes, seconds;
var running = false;

var minHolder = document.querySelector(".minutes"),
	secHolder = document.querySelector(".seconds"),
	startBtn = document.querySelector(".start"),
	timeDisplay = document.querySelector(".time"),
	pulse = document.querySelector(".pulse");

function getTime() {
	minutes = parseInt(minHolder.value, 10);
	seconds = parseInt(secHolder.value, 10);
	time = minutes * 60000 + seconds * 1000;
}

function convertMs(ms) {
	var m = ms / 1000 / 60;
	var s = (ms / 1000) % 60;

	m = "0" + Math.floor(m);
	s = "0" + Math.floor(s);
	var time = [m.slice(-2), s.slice(-2)];

	return time;
}

function countdown() {
	current = new Date().getTime() - start;
	var display;

	if (current < time) {
		display = convertMs(time - current);
		minHolder.value = display[0];
		secHolder.value = display[1];
	} else {
		pauseTimer();
	}
}

function startTimer() {
	getTime();

	if (time) {
		start = new Date().getTime();
		counter = window.setInterval(countdown, 1);
		startBtn.innerText = "Pause";
		pulse.classList.add("active");

		running = true;
	}
}

function pauseTimer() {
	start = new Date().getTime();
	getTime();
	window.clearInterval(counter);
	startBtn.innerText = "Start";
	pulse.classList.remove("active");

	running = false;
}

function activateTimer() {
	if (running) {
		pauseTimer();
	} else {
		startTimer();
	}
}

startBtn.addEventListener("click", activateTimer);
