let minuteElement = document.querySelector('.minute');
let secondElement = document.querySelector('.sec');
let millisecondElement = document.querySelector('.msec');
let startButton = document.querySelector('.start');
let stopButton = document.querySelector('.stop');
let resetButton = document.querySelector('.reset');
let lapButton = document.querySelector('.lap');
let clearButton = document.querySelector('.button-clear');
let lapsContainer = document.querySelector('.laps');

let minute = 0;
let second = 0;
let millisecond = 0;
let interval;
let isRunning = false;

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);
clearButton.addEventListener('click', clearLaps);

function start() {
    if (!isRunning) {
        interval = setInterval(updateTime, 10);
        isRunning = true;
        startButton.classList.add('hidden');
        stopButton.classList.remove('hidden');
        resetButton.classList.remove('hidden');
        lapButton.classList.remove('hidden');
    }
}

function stop() {
    clearInterval(interval);
    isRunning = false;
    startButton.classList.remove('hidden');
    stopButton.classList.add('hidden');
}

function reset() {
    stop();
    minute = 0;
    second = 0;
    millisecond = 0;
    updateDisplay();
    resetButton.classList.add('hidden');
    lapButton.classList.add('hidden');
}

function recordLap() {
    let lapTime = `${format(minute)} : ${format(second)} : ${format(millisecond)}`;
    let lapItem = document.createElement('li');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span class="number">#${lapsContainer.children.length + 1}</span>
        <span class="time-stamp">${lapTime}</span>
    `;
    lapsContainer.appendChild(lapItem);
}

function clearLaps() {
    lapsContainer.innerHTML = '';
}

function updateTime() {
    millisecond += 1;
    if (millisecond === 100) {
        millisecond = 0;
        second += 1;
    }
    if (second === 60) {
        second = 0;
        minute += 1;
    }
    updateDisplay();
}

function updateDisplay() {
    minuteElement.textContent = `${format(minute)} :`;
    secondElement.textContent = ` ${format(second)} :`;
    millisecondElement.textContent = ` ${format(millisecond)}`;
}

function format(number) {
    return number < 10 ? `0${number}` : number;
}
