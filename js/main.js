/*
 * Marine Survey Website JavaScript
 * Adds interactivity and dynamic elements to the website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksLi = document.querySelectorAll('.nav-links li');
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    const surveyForm = document.getElementById('survey-request-form');
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    // Add scrolled class to navbar when scrolled
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    navLinksLi.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    scrollLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            // Get the target section id
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;
            
            // Calculate scroll position (offset for navbar)
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission handling
    if (surveyForm) {
        surveyForm.addEventListener('submit', e => {
            e.preventDefault();
            
            // Normally you would send this data to a server
            // For this example, we'll just show a success message
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const vesselType = document.getElementById('vessel-type').value;
            const message = document.getElementById('message').value;
            
            // Create success message
            const formContainer = surveyForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Thank you, ${name}!</h3>
                <p>Your survey request has been submitted successfully. We will contact you shortly at ${email} or ${phone}.</p>
                <p>Details:</p>
                <ul>
                    <li>Vessel Type: ${vesselType || 'Not specified'}</li>
                    <li>Message: ${message || 'None'}</li>
                </ul>
            `;
            
            // Hide form and show success message
            surveyForm.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Style the success message
            successMessage.style.backgroundColor = '#e8f5e9';
            successMessage.style.padding = '20px';
            successMessage.style.borderRadius = '8px';
            successMessage.style.border = '1px solid #a5d6a7';
        });
    }
    
    // Animation on scroll functionality
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll('.process-card, .cert-card, .exp-item, .about-image');
    
    animateElements.forEach(element => {
        // Add initial animation class
        element.classList.add('animate-on-scroll');
        // Observe element
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.classList.add('loaded');
            }
        });
    }
    
    // Add responsive image handling
    function setResponsiveBackground() {
        const heroElement = document.querySelector('.hero');
        const aboutImage = document.querySelector('.image-placeholder');
        
        // Change background images based on screen size
        if (window.innerWidth < 768) {
            // Mobile optimized images (smaller file size)
            if (heroElement) {
                heroElement.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../images/Marina.jpeg')";
            }
            if (aboutImage) {
                aboutImage.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('../images/BoatBackGround1.jpeg')";
            }
        } else {
            // Desktop high quality images
            if (heroElement) {
                heroElement.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../images/Marina.jpeg')";
            }
            if (aboutImage) {
                aboutImage.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('../images/BoatBackGround1.jpeg')";
            }
        }
    }
    
    // Set responsive backgrounds initially and on resize
    setResponsiveBackground();
    window.addEventListener('resize', setResponsiveBackground);
});