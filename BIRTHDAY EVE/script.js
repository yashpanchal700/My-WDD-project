document.getElementById("start-timer").addEventListener("click", () => {
  const datePicker = document.getElementById("date-picker");
  const countdownDisplay = document.getElementById("countdown-display");
  const mainBox = document.querySelector("main");

  let eventDate;
  try {
    eventDate = new Date(datePicker.value).getTime();
  } catch (e) {
    countdownDisplay.innerHTML = "Please select a valid date and time!";
    countdownDisplay.classList.remove("show");
    return;
  }

  const now = new Date().getTime();

  if (eventDate < now) {
    countdownDisplay.innerHTML = "The event has already occurred!";
    countdownDisplay.classList.add("show");
    return;
  }

  let timerInterval;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (!datePicker.value) {
      countdownDisplay.innerHTML = "Please select a date and time!";
      countdownDisplay.classList.remove("show");
      return;
    }

    if (distance < 0) {
      clearInterval(timerInterval);
      displayBirthdayMessage(); // Only this part changes
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownDisplay.innerHTML = `
        <div class="digit-container">
          <div class="digit">${days.toString().padStart(2, '0')}</div>
          <div class="label">Days</div>
        </div>
        <div class="digit-container">
          <div class="digit">${hours.toString().padStart(2, '0')}</div>
          <div class="label">Hours</div>
        </div>
        <div class="digit-container">
          <div class="digit">${minutes.toString().padStart(2, '0')}</div>
          <div class="label">Minutes</div>
        </div>
        <div class="digit-container">
          <div class="digit">${seconds.toString().padStart(2, '0')}</div>
          <div class="label">Seconds</div>
        </div>
      `;
    countdownDisplay.classList.add("show");
  }

  function displayBirthdayMessage() {
    const mainBox = document.querySelector("main");
  mainBox.innerHTML = ""; // Clear previous content

  const message = document.createElement("div");
  message.textContent = "HAPPY BIRTHDAY!";
  message.className = "happy-birthday"; // Assign the CSS class
  mainBox.style.position = "relative"; // Ensure the container supports absolute positioning
  mainBox.appendChild(message);

  startCelebration(); // Keep your animation
  setTimeout(stopCelebration, 10000);

  
  }

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});

// Emoji celebration logic remains unchanged
let emojiElements = [];

function startCelebration() {
  const emojis = ['🎉', '🎈'];
  const numEmojis = 100;
  const mainBox = document.querySelector("main");
  const mainBoxRect = mainBox.getBoundingClientRect();

  for (let i = 0; i < numEmojis; i++) {
    const emoji = document.createElement("div");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = "absolute";
    emoji.style.fontSize = `${Math.random() * 2 + 1}em`;

    let translateX;
    let rotate;

    if (i % 2 === 0) { // Even index, from the left
      emoji.style.left = `${mainBoxRect.left - Math.random() * 100}px`;
      translateX = -Math.random() * 200;
      emoji.classList.add("mirrored"); // Mirror animation for even indexes
      rotate = -Math.random() * 360;
    } else { // Odd index, from the right
      emoji.style.left = `${mainBoxRect.right + Math.random() * 100}px`;
      translateX = Math.random() * 200;
      rotate = Math.random() * 360;
    }

    emoji.style.top = `${Math.random() * mainBoxRect.height + mainBoxRect.top}px`;
    const translateY = Math.random() * 200 - 100;

    emoji.style.animation = `emojiOut ${Math.random() * 5 + 3}s ease-out forwards`;
    emoji.style.setProperty("--translateX", `${translateX}px`);
    emoji.style.setProperty("--translateY", `${translateY}px`);
    emoji.style.setProperty("--rotate", `${rotate}deg`);
    emoji.style.zIndex = "5";

    document.body.appendChild(emoji);
    emojiElements.push(emoji);
  }
}

function stopCelebration() {
  emojiElements.forEach((emoji) => {
    if (emoji.parentNode) {
      emoji.parentNode.removeChild(emoji);
    }
  });
  emojiElements = [];
  location.reload();
}
