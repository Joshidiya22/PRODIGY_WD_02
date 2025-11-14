let timer;
let isRunning = false;
let isPaused = false;
let startTime;
let lapStartTime;
let lapNumber = 1;
let elapsedTime = 0;

function start() {
  if (!isRunning) {
    startTime = performance.now() - elapsedTime;
    lapStartTime = performance.now();
    timer = setInterval(updateDisplay, 10); // Update every 10 milliseconds
    document.getElementById('start').innerText = 'Pause';
    isRunning = true;
  } else if (!isPaused) {
    pause();
  } else {
    resume();
  }
}

function pause() {
  clearInterval(timer);
  document.getElementById('start').innerText = 'Resume';
  isRunning = false;
  isPaused = true;
  elapsedTime = performance.now() - startTime;
}

function resume() {
  const now = performance.now();
  startTime = now - elapsedTime;
  lapStartTime = now - (now - lapStartTime);
  timer = setInterval(updateDisplay, 10); // Update every 10 milliseconds
  document.getElementById('start').innerText = 'Pause';
  isRunning = true;
  isPaused = false;
}

function stop() {
  clearInterval(timer);
  document.getElementById('start').innerText = 'Start';
  isRunning = false;
  isPaused = false;
  elapsedTime = 0;
  updateDisplay(); // Reset display
}

function reset() {
  clearInterval(timer);
  document.getElementById('display').innerText = '00:00:00:000';
  document.getElementById('start').innerText = 'Start';
  document.getElementById('lapTable').style.display = 'none';
  isRunning = false;
  isPaused = false;
  lapNumber = 1;
  clearLapTable();
  elapsedTime = 0;
}

function updateDisplay() {
  const now = performance.now();
  const totalMilliseconds = now - startTime;
  const display = document.getElementById('display');
  display.innerText = formatTime(totalMilliseconds);
}

function formatTime(milliseconds) {
  const totalMilliseconds = Math.floor(milliseconds);
  const hours = Math.floor(totalMilliseconds / (60 * 60 * 1000)).toString().padStart(2, '0');
  const remainingMilliseconds1 = totalMilliseconds % (60 * 60 * 1000);
  const minutes = Math.floor(remainingMilliseconds1 / (60 * 1000)).toString().padStart(2, '0');
  const remainingMilliseconds2 = remainingMilliseconds1 % (60 * 1000);
  const seconds = Math.floor(remainingMilliseconds2 / 1000).toString().padStart(2, '0');
  const millisecondsFormatted = (remainingMilliseconds2 % 1000).toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}:${millisecondsFormatted}`;
}

function lap() {
  const now = performance.now();
  const lapTime = now - lapStartTime;
  const lapTotal = formatTime(lapTime);

  const lapTimesTable = document.getElementById('lapTimes');
  const newRow = lapTimesTable.insertRow(-1);
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  cell1.innerHTML = lapNumber;
  cell2.innerHTML = lapTotal;
  lapNumber++;

  // Animate lap table to slide in from the right side
  const lapTable = document.getElementById('lapTable');
  lapTable.style.display = 'block';
  lapTable.style.transition = 'transform 0.5s';
  lapTable.style.transform = 'translateX(0)';
}

function clearLapTable() {
  const lapTimesTable = document.getElementById('lapTimes');
  const numRows = lapTimesTable.rows.length;
  for (let i = numRows - 1; i > 0; i--) {
    lapTimesTable.deleteRow(i);
  }
}