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

// ================= TELEFON MASK =================
document.getElementById('userPhone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.startsWith('998')) value = value.substring(3);
    if (value.length > 9) value = value.substring(0, 9);

    let formatted = '+998';
    if (value.length > 0) formatted += ' ' + value.substring(0, 2);
    if (value.length >= 3) formatted += ' ' + value.substring(2, 5);
    if (value.length >= 6) formatted += ' ' + value.substring(5, 7);
    if (value.length >= 8) formatted += ' ' + value.substring(7, 9);

    e.target.value = formatted;
});

// ================= MODAL =================
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.onclick = () => openModal('registerModal');
});

window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if(event.target === modal) modal.style.display = "none";
    });
}

// ================= TELEGRAM =================
function goToTelegram() {
    window.location.href = "https://t.me/+XLq4LXLQudxiZmQ6";
}

// ================= GOOGLE SHEETS =================
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyol0tp71woGCtJma4LD_wnp0epomoAQsE3DGhh6zHgIj_r6ry_YPRpiR6KOSeOqPuC/exec";

function completeRegistration() {
    const nameInput = document.getElementById('userName');
    const phoneInput = document.getElementById('userPhone');
    const name = nameInput.value.trim();
    let phone = phoneInput.value.replace(/[^\d]/g, '');
    if(phone.startsWith('998')) phone = phone.substring(3);
    if(phone.length !== 9 || !/^\d+$/.test(phone)) {
        alert("Telefon: 9 ta raqam kiriting!");
        phoneInput.focus();
        return;
    }
    phone = '+998' + phone;
    if(!name || name.length < 2) {
        alert("Iltimos, to‘g‘ri ism kiriting!");
        nameInput.focus();
        return;
    }

    closeModal('registerModal');
    document.getElementById('loadingModal').style.display = "flex";

    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('phone', phone);

    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).then(() => {
        closeModal('loadingModal');
        openModal('finalModal');
    }).catch(err => {
        console.warn(err);
        closeModal('loadingModal');
        openModal('finalModal');
    });
}
