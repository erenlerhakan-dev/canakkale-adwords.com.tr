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

$.ajax({
url: "/send_request.php",
type: 'POST',
data: $('quoteForm').serialize(),
success: function(response){
if (response === "ok") { 
const toast = document.getElementById('toast');
toast.classList.add('show');
this.reset();
setTimeout(() => {
toast.classList.remove('show');
}, 5000);
}
if (response === "name") { swal(" ", "Lütfen adınızı yazın.", "warning"); }
if (response === "emailbad") { swal(" ", "Email adresiniz hatalı. Lütfen kontrol edip tekrar deneyin.", "warning"); }
if (response === "email") { swal(" ", "Lütfen email adresinizi yazın.", "warning"); }
if (response === "phone") { swal(" ", "Lütfen telefon numaranızı yazın.", "warning"); }
if (response === "message") { swal(" ", "Lütfen mesajınızı yazın.", "warning"); }
if (response === "message_short") { swal(" ", "Lütfen daha açıklayıcı bir mesaj yazın.", "warning"); }
if (response === "nok") { swal(" ", "Bir hata oluştu. Lütfen sayfayı yenileyip tekrar deneyin.", "warning"); } }
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