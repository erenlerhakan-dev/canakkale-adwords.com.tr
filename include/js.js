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
    // 1. Prevent default form submission
    e.preventDefault();

    const toast = document.getElementById('toast');
    const formy = e.target; // 'e.target' is the form that was submitted

    // Function to handle the toast display
    const showToast = (message) => {
        toast.textContent = message; // Standard way to set text content
        toast.classList.add('show');
        
        // Hide the toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    };

    // 2. Prepare form data for transmission
    // 'new FormData(formy)' gathers all form inputs automatically
    const formData = new FormData(formy);
    
    // Convert FormData to URLSearchParams for x-www-form-urlencoded format
    // This format is often expected by PHP scripts receiving POST data
    const urlEncodedData = new URLSearchParams(formData).toString();

    // 3. Initiate the AJAX request using the Fetch API
    fetch("/include/send_request.php", {
        method: 'POST',
        headers: {
            // Important: This header matches the format used by form.serialize()
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: urlEncodedData
    })
    .then(response => response.text()) // Convert the response stream to plain text
    .then(responseText => {
        // Trim any whitespace from the response text for accurate comparison
        const response = responseText.trim(); 

        // 4. Process the server response and show feedback
        switch (response) {
            case "ok":
                showToast('Mesajınız alındı! En kısa sürede sizinle iletişime geçeceğiz.');
                formy.reset(); // Standard way to reset the form
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
        // 5. Handle network or fetch-related errors
        console.error('Fetch error:', error);
        showToast('İletişim hatası oluştu. Lütfen ağ bağlantınızı kontrol edin.'); // Communication error
    });
});