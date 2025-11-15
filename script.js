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


// ================= TELEFON MASK (avto format) =================
document.getElementById('userPhone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/[^\d]/g, ''); // Faqat raqamlar
    if (value.startsWith('998')) value = value.substring(3);
    if (value.length > 9) value = value.substring(0, 9);

    let formatted = '+998';
    if (value.length > 0) formatted += ' ' + value.substring(0, 2);
    if (value.length >= 3) formatted += ' ' + value.substring(2, 5);
    if (value.length >= 6) formatted += ' ' + value.substring(5, 7);
    if (value.length >= 8) formatted += ' ' + value.substring(7, 9);

    e.target.value = formatted;
});


// ================= MODAL OCHISH / YOPISH =================
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Barcha "RO‘YXATDAN O‘TISH" tugmalariga
document.querySelectorAll('.btn').forEach(btn => {
    btn.onclick = () => openModal('registerModal');
});


// ================= GOOGLE SHEETS GA YUBORISH =================
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyol0tp71woGCtJma4LD_wnp0epomoAQsE3DGhh6zHgIj_r6ry_YPRpiR6KOSeOqPuC/exec";

function completeRegistration() {
    const nameInput = document.getElementById('userName');
    const phoneInput = document.getElementById('userPhone');

    const name = nameInput.value.trim();
    let phone = phoneInput.value.trim();

    // 1. Telefonni tozalash
    phone = phone.replace(/[^\d]/g, ''); // Faqat raqamlar
    if (phone.startsWith('998')) phone = phone.substring(3);
    if (phone.length !== 9 || !/^\d+$/.test(phone)) {
        alert("Iltimos, to‘g‘ri telefon raqam kiriting!\nMasalan: +998 90 123 45 67");
        phoneInput.focus();
        return;
    }

    // 2. To‘g‘ri format
    phone = '+998' + phone;

    // 3. Ism tekshiruvi
    if (!name || name.length < 2) {
        alert("Iltimos, to‘g‘ri ism kiriting!");
        nameInput.focus();
        return;
    }

    // 4. FORM-DATA SIFATIDA YUBORISH (Apps Script uchun to‘g‘ri usul)
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('phone', phone);

    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    })
    .then(() => {
        closeModal('registerModal');
        openModal('finalModal');
    })
    .catch(err => {
        console.warn("Yuborishda xato (lekin davom etamiz):", err);
        closeModal('registerModal');
        openModal('finalModal');
    });
}


// ================= TELEGRAMGA O‘TISH =================
function goToTelegram() {
    window.location.href = "https://t.me/+XLq4LXLQudxiZmQ6";
}


// ================= MODAL TASHQARIDAN BOSISH =================
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};