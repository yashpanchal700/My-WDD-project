document.getElementById("start-timer").addEventListener("click", () => {
    const datePicker = document.getElementById("date-picker");
    const countdownDisplay = document.getElementById("countdown-display");
    const workNameInput = document.getElementById("work-name");
  
    if (!datePicker.value) {
      countdownDisplay.innerHTML = "Please select a date and time!";
      countdownDisplay.classList.remove("show");
      return;
    }
  
    const eventDate = new Date(datePicker.value).getTime();
  
    function updateTimer() {
      const now = new Date().getTime();
      const distance = eventDate - now;
  
      if (distance < 0) {
        clearInterval(timerInterval);
        const workName = workNameInput.value;
        countdownDisplay.innerHTML = `It's time for ${workName}.`;
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
    }
  
    if (window.timerInterval) {
      clearInterval(window.timerInterval);
    }
  
    updateTimer();
    window.timerInterval = setInterval(updateTimer, 1000);
  
    countdownDisplay.classList.add("show");
  });