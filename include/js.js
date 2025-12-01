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

document.getElementById('quoteForm').addEventListener('submit', function(e) {
e.preventDefault();

const toast = document.getElementById('toast');

$.ajax({
url: "/include/send_request.php",
type: 'POST',
data: $('quoteForm').serialize(),
success: function(response){

if (response === "ok") {
toast.html('Mesajınız alındı! En kısa sürede sizinle iletişime geçeceğiz.');
toast.classList.add('show');
this.reset();
setTimeout(() => {toast.classList.remove('show');}, 5000);
}

if (response === "name") { toast.html('Lütfen adınızı yazın.');
toast.classList.add('show');
this.reset();
setTimeout(() => {toast.classList.remove('show');}, 5000); 
}

if (response === "emailbad") { toast.html('Email adresiniz hatalı. Lütfen kontrol edip tekrar deneyin.');
toast.classList.add('show');
this.reset();
setTimeout(() => {toast.classList.remove('show');}, 5000); 
}

if (response === "email") { toast.html('Lütfen email adresinizi yazın.');
toast.classList.add('show');
this.reset();
setTimeout(() => {toast.classList.remove('show');}, 5000); 
}

if (response === "phone") { toast.html('Lütfen telefon numaranızı yazın.');
toast.classList.add('show');
this.reset();
setTimeout(() => {toast.classList.remove('show');}, 5000); 
}

if (response === "message") { toast.html('Lütfen mesajınızı yazın.');
toast.classList.add('show');
this.reset();
setTimeout(() => {toast.classList.remove('show');}, 5000); 
}

if (response === "message_short") { toast.html('Lütfen daha açıklayıcı bir mesaj yazın.');
toast.classList.add('show');
this.reset();
setTimeout(() => {toast.classList.remove('show');}, 5000); 
}

if (response === "nok") { toast.html('Bir hata oluştu. Lütfen sayfayı yenileyip tekrar deneyin.');
toast.classList.add('show');
this.reset();
setTimeout(() => {toast.classList.remove('show');}, 5000); 
}

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