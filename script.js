// ================= TIMER =================
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
updateTimer();


// ================= MODAL OCHISH / YOPISH =================
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Ro‘yxatdan o‘tish tugmasi
document.querySelector('.btn').onclick = function() {
    openModal('registerModal');
};

// Admin tugmasi
document.getElementById('adminBtn').onclick = function() {
    openModal('registerModal');
};


// ================= REGISTRATSIYA TUGMASI =================
function completeRegistration() {
    const name = document.getElementById('userName').value.trim();
    if (!name) {
        alert("Iltimos, ismingizni kiriting!");
        return;
    }

    closeModal('registerModal');
    openModal('finalModal');
}


// ================= TELEGRAMGA O‘TISH =================
function goToTelegram() {
    // !!! Sizning kanal havolangiz !!!
    window.location.href = "https://t.me/+XLq4LXLQudxiZmQ6";
}

// ================= ADMINGA YOZISH =================
function goToAdmin() {
    // !!! Admin sahifa linki !!!
    window.location.href = "https://t.me/simonaladyfit_admin";
}


// ================= MODALNI TASHQARIDAN BOSIB YOPISH =================
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};
