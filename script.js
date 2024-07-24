let timer;
let isRunning = false;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

startStopBtn.addEventListener('click', function() {
  if (isRunning) {
    clearInterval(timer);
    startStopBtn.textContent = 'Start';
  } else {
    timer = setInterval(updateTime, 1000);
    startStopBtn.textContent = 'Stop';
  }
  isRunning = !isRunning;
});

resetBtn.addEventListener('click', function() {
  clearInterval(timer);
  isRunning = false;
  startStopBtn.textContent = 'Start';
  elapsedTime = 0;
  display.textContent = formatTime(elapsedTime);
});

function updateTime() {
  elapsedTime++;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}
