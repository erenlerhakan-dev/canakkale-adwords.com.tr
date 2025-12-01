document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
target.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
});
});

document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
const nav = document.querySelector('nav');
if (nav.style.display === 'flex') {
nav.style.display = 'none';
} else {
nav.style.display = 'flex';
nav.style.flexDirection = 'column';
nav.style.position = 'absolute';
nav.style.top = '100%';
nav.style.left = '0';
nav.style.right = '0';
nav.style.background = 'white';
nav.style.padding = '1rem';
nav.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
}
});

document.getElementById('quoteForm').addEventListener('submit', function(e) {
e.preventDefault();
document.getElementById('formbutton').classList.add('blink_me');
document.getElementById('formbutton').innerHTML = 'Gönderiliyor';

const toast = document.getElementById('toast');
const formy = e.target;
const showToast = (message) => {
toast.textContent = message;
toast.classList.add('show');
setTimeout(() => {
toast.classList.remove('show');
}, 5000);
};

const formData = new FormData(formy);
const urlEncodedData = new URLSearchParams(formData).toString();
fetch("/include/send_request.php", {
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded' 
},
body: urlEncodedData
})
.then(response => response.text())
.then(responseText => {
const response = responseText.trim(); 
switch (response) {
case "ok":
showToast('Mesajınız alındı! En kısa sürede sizinle iletişime geçeceğiz.');
formy.reset();
document.getElementById('formbutton').classList.remove('blink_me');
document.getElementById('formbutton').innerHTML = 'Teşekkürler';
break;
case "name":
showToast('Lütfen adınızı yazın.');
break;
case "emailbad":
showToast('Email adresiniz hatalı. Lütfen kontrol edip tekrar deneyin.');
break;
case "email":
showToast('Lütfen email adresinizi yazın.');
break;
case "phone":
showToast('Lütfen telefon numaranızı yazın.');
break;
case "message":
showToast('Lütfen mesajınızı yazın.');
break;
case "message_short":
showToast('Lütfen daha açıklayıcı bir mesaj yazın.');
break;
case "nok":
default:
showToast('Bir hata oluştu. Lütfen sayfayı yenileyip tekrar deneyin.');
break;
}
})
.catch(error => {
showToast('İletişim hatası oluştu. Lütfen ağ bağlantınızı kontrol edin.'); // Communication error
});
});