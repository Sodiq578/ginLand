    /* TIMER */
    let sec = 59, min = 1, timerRunning = true;
    const timerEl = document.getElementById('timer');
    const buttons = document.querySelectorAll('.btn');
    (function updateTimer() {
      if (!timerRunning) return;
      timerEl.textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
      if (sec > 0) sec--;
      else if (min > 0) { min--; sec = 59; }
      else {
        timerEl.textContent = "00:00";
        timerRunning = false;
        buttons.forEach(b => {
          b.disabled = true;
          b.style.opacity = '0.6';
          b.textContent = "VAQT TUGADI";
        });
        return;
      }
      setTimeout(updateTimer, 1000);
    })();

    /* PHONE MASK */
    const phoneInput = document.getElementById('userPhone');
    phoneInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g,'');
      if(v.startsWith('998')) v=v.slice(3);
      v = v.slice(0,9);
      let f = '+998';
      if(v.length>0) f+=' '+v.slice(0,2);
      if(v.length>2) f+=' '+v.slice(2,5);
      if(v.length>5) f+=' '+v.slice(5,7);
      if(v.length>7) f+=' '+v.slice(7,9);
      e.target.value = f;
    });

    /* MODAL */
    const modal = document.getElementById('registerModal');
    buttons.forEach(b => b.onclick = () => {
      if(!timerRunning){ alert("Vaqt tugadi!"); return; }
      modal.classList.add('active');
    });

    /* GOOGLE SHEETS SEND */
    const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyol0tp71woGCtJma4LD_wnp0epomoAQsE3DGhh6zHgIj_r6ry_YPRpiR6KOSeOqPuC/exec';
    document.getElementById('submitBtn').onclick = () => {
      if(!timerRunning){ alert("Vaqt tugadi!"); return; }
      const name = document.getElementById('userName').value.trim();
      let phone = phoneInput.value.replace(/\D/g,'');
      if(phone.startsWith('998')) phone=phone.slice(3);
      if(phone.length!==9){ alert('Telefon: 9 ta raqam kiriting!'); return; }
      if(!name || name.length<2){ alert('To‘g‘ri ism kiriting!'); return; }
      fetch(SHEET_URL,{
        method:'POST',
        mode:'no-cors',
        body: new URLSearchParams({ name, phone:'+998'+phone })
      });
      setTimeout(()=>window.location.href='../success.html',1200);
    };
  