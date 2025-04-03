// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth scrolling for navigation links
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

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formStatus = document.getElementById('formStatus');
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Show form status element
    formStatus.style.display = 'block';
    formStatus.textContent = 'Sending message...';
    formStatus.className = 'form-status';
    
    try {
        // Validate inputs
        if (!name || !email || !message) {
            throw new Error('Please fill in all fields');
        }
        
        // Disable submit button while processing
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Log for debugging
        console.log('Attempting to send message to Firebase...');
        
        // Create message object
        const messageData = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString(),
            createdAt: new Date()
        };
        
        console.log('Message data:', messageData);
        
        // Verify Firebase is initialized
        if (!window.db || !window.collection || !window.addDoc) {
            throw new Error('Firebase is not properly initialized');
        }
        
        // Store in Firebase
        const messagesRef = window.collection(window.db, 'messages');
        console.log('Collection reference created');
        
        const docRef = await window.addDoc(messagesRef, messageData);
        console.log('Document written with ID:', docRef.id);
        
        // Show success message
        formStatus.textContent = 'Message sent successfully!';
        formStatus.className = 'form-status success';
        
        // Clear form
        this.reset();
        
    } catch (error) {
        console.error('Detailed error:', error);
        
        // Show user-friendly error message
        let errorMessage = 'Error sending message. ';
        if (error.code === 'permission-denied') {
            errorMessage += 'Permission denied. Please try again later.';
        } else if (error.message) {
            errorMessage += error.message;
        } else {
            errorMessage += 'Please try again.';
        }
        
        formStatus.textContent = errorMessage;
        formStatus.className = 'form-status error';
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        
        // Hide status message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
});

// Add scroll reveal animations
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}); 