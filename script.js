// =======================
// Ensure Modal Hidden on Load
// =======================
document.addEventListener("DOMContentLoaded", () => {
    const successModal = document.getElementById('successModal');
    if (successModal) successModal.style.display = "none";
});

// =======================
// Mobile Menu Toggle
// =======================
/*const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => menu.classList.toggle('show'));
}*/

// =======================
// Dropdown Toggle for Mobile
// =======================
/*const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('open');
        }
    });
});*/

// Toggle mobile menu
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Toggle dropdowns on mobile
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // prevent link click
      dropdown.classList.toggle('open');
    }
  });
});


// =======================
// Slideshow Functionality
// =======================
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) { showSlides(slideIndex += n); }
function currentSlide(n) { showSlides(slideIndex = n); }

function showSlides(n) {
    const slides = document.querySelectorAll(".slides");
    const dots = document.querySelectorAll(".dot");
    if (!slides.length) return;

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach(s => s.style.display = "none");
    dots.forEach(d => d.classList.remove("active"));

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}
setInterval(() => plusSlides(1), 3000); // Auto slide every 3s

// =======================
// Chatbot Functionality
// =======================
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-message');
const sendChat = document.getElementById('send-chat');

if (chatbotBtn && chatbotWindow) {
    chatbotBtn.addEventListener('click', () => chatbotWindow.style.display = 'flex');
    closeChat.addEventListener('click', () => chatbotWindow.style.display = 'none');
}

if (sendChat && chatInput) {
    sendChat.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

    function sendMessage() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        chatBody.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
        chatInput.value = '';
        setTimeout(() => {
            let reply = "I'm here to assist you.";
            if (msg.toLowerCase().includes('loan')) reply = "Apply for loans via 'Loan Apply' in Quick Links.";
            else if (msg.toLowerCase().includes('branch')) reply = "Use 'Branch Locator' in Quick Links.";
            chatBody.innerHTML += `<p><strong>Bot:</strong> ${reply}</p>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 500);
    }
}

// =======================
// Inquiry Form with Success Modal
// =======================
const inquiryForm = document.getElementById('inquiryForm');
const formStatus = document.getElementById('formStatus');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const okBtn = document.getElementById('okBtn');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(inquiryForm);
        const name = data.get('name').trim();
        const email = data.get('email').trim();
        const phone = data.get('phone').trim();
        const message = data.get('message').trim();

        if (!name || !email || !phone || !message) {
            formStatus.textContent = "⚠ Please fill all fields.";
            formStatus.style.color = "red";
            return;
        }

        formStatus.textContent = "⏳ Sending...";
        formStatus.style.color = "blue";

        try {
            const res = await fetch(inquiryForm.action, {
                method: inquiryForm.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                inquiryForm.reset();
                formStatus.textContent = "";
                successModal.style.display = "flex";

                // Auto close modal after 3 seconds
                setTimeout(() => successModal.style.display = "none", 3000);
            } else {
                formStatus.textContent = "❌ Failed to send. Try again later.";
                formStatus.style.color = "red";
            }
        } catch {
            formStatus.textContent = "❌ Error sending inquiry.";
            formStatus.style.color = "red";
        }
    });
}

// Close Modal Events
if (closeModal && okBtn) {
    closeModal.addEventListener('click', () => successModal.style.display = "none");
    okBtn.addEventListener('click', () => successModal.style.display = "none");
}
window.addEventListener('click', e => { if (e.target === successModal) successModal.style.display = "none"; });

// =======================
// Hide Google Translate Tooltip
// =======================
setInterval(() => {
    const balloon = document.querySelector('.goog-te-balloon-frame');
    const tooltip = document.querySelector('#goog-gt-tt');
    if (balloon) balloon.style.display = 'none';
    if (tooltip) tooltip.style.display = 'none';
}, 300);
