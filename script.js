// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Scroll progress bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Initial check
fadeInOnScroll();

// Check on scroll
window.addEventListener('scroll', fadeInOnScroll);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = this;
        const submitBtn = form.querySelector('.submit-btn');
        const messageDiv = document.getElementById('formMessage');
        const originalBtnText = submitBtn.textContent;
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showMessage(messageDiv, 'Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage(messageDiv, 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send data to FormSubmit.co
            const response = await sendToFormSubmit(formData);
            
            if (response.success) {
                // Success message
                showMessage(messageDiv, 'Your message has been sent successfully! I will get back to you soon.', 'success');
                form.reset();
            } else {
                // Server error
                showMessage(messageDiv, 'Failed to send message. Please try again later.', 'error');
            }
        } catch (error) {
            // Network error or other issues
            console.error('Form submission error:', error);
            showMessage(messageDiv, 'Message could not be sent. Please check your connection.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Auto-hide message after 8 seconds
            setTimeout(() => {
                if (messageDiv) {
                    messageDiv.style.display = 'none';
                    messageDiv.className = 'form-message';
                }
            }, 8000);
        }
    });
}

// REAL Backend Submission using FormSubmit.co
async function sendToFormSubmit(formData) {
    // -------------------------------------------------------------------
    // STEP 1: ENTER YOUR EMAIL ADDRESS HERE BELOW
    // -------------------------------------------------------------------
    const myEmail = "anthonkabelo17@gmail.com"; 
    
    const endpoint = `https://formsubmit.co/ajax/${myEmail}`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: "New Portfolio Message!" // This sets the email subject line
        })
    });

    const data = await response.json();

    if (response.ok) {
        return { success: true };
    } else {
        throw new Error(data.message || 'Form submission failed');
    }
}

// Helper function to show messages
function showMessage(element, text, type) {
    if (!element) return;
    
    element.innerHTML = '';
    
    // Create icon based on type
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    // Create text element
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    
    // Append to message div
    element.appendChild(icon);
    element.appendChild(textSpan);
    element.className = `form-message ${type}`;
    element.style.display = 'flex';
}

// Update copyright year
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
    copyrightElement.textContent = `© ${currentYear} Created by Kabelo Anthon. All rights reserved.`;
}