// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll progress bar
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
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
document.getElementById('contactForm').addEventListener('submit', async function(e) {
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
        // Simulate form submission (replace with actual backend API)
        const response = await simulateFormSubmission(formData);
        
        if (response.success) {
            // Success message
            showMessage(messageDiv, 'Your message has been sent successfully! I will get back to you soon.', 'success');
            form.reset();
        } else {
            // Server error
            showMessage(messageDiv, 'Failed to send message. Please try again later or contact me directly via email/phone.', 'error');
        }
    } catch (error) {
        // Network error or other issues
        showMessage(messageDiv, 'Message could not be sent. Please check your connection or contact me directly via email/phone.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Auto-hide message after 8 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
            messageDiv.className = 'form-message';
        }, 8000);
    }
});

// Helper function to show messages
function showMessage(element, text, type) {
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

// Simulate form submission (Replace with real API call)
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // For demo purposes, let's simulate 90% success rate
            const isSuccess = Math.random() > 0.1;
            
            if (isSuccess) {
                resolve({
                    success: true,
                    message: 'Message sent successfully',
                    timestamp: new Date().toISOString()
                });
                
                // In real implementation, you would send to a server:
                
                fetch('https://your-api-endpoint.com/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
                
            } else {
                reject(new Error('Simulated server error'));
            }
        }, 1500); // 1.5 second delay to simulate network request
    });
}

// Update copyright year
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
    copyrightElement.textContent = `© ${currentYear} Created by Kabelo Anthon. All rights reserved.`;
}