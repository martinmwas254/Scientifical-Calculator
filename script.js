const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const themeSelect = document.getElementById("themeSelect");
let currentInput = "";
let memory = 0;

function updateDisplay(val) {
  display.textContent = val;
}

function playClickSound() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    playClickSound();
    let val = btn.textContent;

    if (val === "AC") {
      currentInput = "";
      updateDisplay("0");
    } else if (val === "DEL") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || "0");
    } else if (val === "=") {
      try {
        let result = eval(currentInput);
        currentInput = result.toString();
        updateDisplay(currentInput);
      } catch {
        updateDisplay("Error");
        currentInput = "";
      }
    } else if (val === "MC") {
      memory = 0;
    } else if (val === "MR") {
      currentInput += memory;
      updateDisplay(currentInput);
    } else if (val === "M+") {
      const currentValue = parseFloat(display.textContent);
      if (!isNaN(currentValue)) memory += currentValue;
    } else if (val === "M-") {
      const currentValue = parseFloat(display.textContent);
      if (!isNaN(currentValue)) memory -= currentValue;
    } else {
      currentInput += val;
      updateDisplay(currentInput);
    }
  });
});

themeSelect.addEventListener("change", () => {
  document.body.className = "";
  if (themeSelect.value === "light") {
    document.body.classList.add("light-theme");
  } else if (themeSelect.value === "blue") {
    document.body.classList.add("blue-theme");
  }
});

// PWA Service Worker registration
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(() => console.log("✅ Service Worker registered"))
    .catch(err => console.log("❌ SW failed:", err));
}
