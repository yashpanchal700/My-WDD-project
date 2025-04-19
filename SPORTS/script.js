document.getElementById("start-timer").addEventListener("click", () => {
    const datePicker = document.getElementById("date-picker");
    const sportsNameInput = document.getElementById("sports-name");
    const countdownDisplay = document.getElementById("countdown-display");
    const footballAnimation = document.getElementById("football-animation");
  
    // Reset animation and ensure hidden
    footballAnimation.classList.remove("football-animate-left", "football-animate-right");
    void footballAnimation.offsetWidth; // Trigger reflow
    footballAnimation.style.opacity = '0';
    footballAnimation.pause();
    footballAnimation.currentTime = 0;
    footballAnimation.style.left = '-100vw'; // Reset initial left
    footballAnimation.style.right = 'auto'; // Reset right
  
    if (!datePicker.value) {
      countdownDisplay.innerHTML = "Please select a date and time!";
      countdownDisplay.classList.remove("show");
      return;
    }
  
    if (!sportsNameInput.value) {
      countdownDisplay.innerHTML = "Please enter a sports name!";
      countdownDisplay.classList.remove("show");
      return;
    }
  
    // Start the left animation
    footballAnimation.classList.add("football-animate-left");
    footballAnimation.style.opacity = '1';
    footballAnimation.play();
  
    // After the left animation duration (2s), switch to the right animation
    setTimeout(() => {
      footballAnimation.classList.remove("football-animate-left");
      footballAnimation.classList.add("football-animate-right");
      footballAnimation.style.left = 'auto'; // Important: Reset left
      footballAnimation.style.right = '-100vw'; // Start from the right
    }, 2000);
  
    const eventDate = new Date(datePicker.value).getTime();
  
    function updateTimer() {
      const now = new Date().getTime();
      const distance = eventDate - now;
  
      if (distance < 0) {
        clearInterval(timerInterval);
        const sportsName = sportsNameInput.value;
        countdownDisplay.innerHTML = `Time to play ${sportsName}!!!`;
        footballAnimation.classList.remove("football-animate-left", "football-animate-right");
        footballAnimation.style.opacity = '0'; // Ensure hidden after countdown ends
        footballAnimation.pause();
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
