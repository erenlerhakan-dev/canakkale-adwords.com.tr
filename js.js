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
toast.classList.add('show');
this.reset();
setTimeout(() => {
toast.classList.remove('show');
}, 5000);
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