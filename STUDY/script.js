let timer;
let totalSeconds = 25 * 60;
let isRunning = false;
let isMuted = false;

const tickSound = new Audio('tick.mp3');
tickSound.loop = false;

function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

function setTimer(seconds) {
  totalSeconds = seconds;
  clearInterval(timer);
  isRunning = false;
  updateDisplay();
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;

      if (!isMuted) {
        tickSound.currentTime = 0;
        tickSound.play().catch((e) => {
          console.log('Tick sound blocked until user interaction.');
        });
      }

      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("Time's up!");
    }
  }, 1000);
}

function toggleSound() {
  isMuted = !isMuted;
  document.getElementById('muteButton').textContent = isMuted ? '🔇' : '🔊';

  if (isMuted) {
    tickSound.pause();
    tickSound.currentTime = 0;
  }
}


updateDisplay();
