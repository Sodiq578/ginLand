let minutes = 1;
let seconds = 59;
const timerEl = document.getElementById("timer");

function updateTimer() {
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;

    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(interval);
            timerEl.textContent = "00:00";
            timerEl.style.color = "#999";
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
}

const interval = setInterval(updateTimer, 1000);
updateTimer(); // Dastlabki ko‘rsatish