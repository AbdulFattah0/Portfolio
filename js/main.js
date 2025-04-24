

// ===== 1. Variables & Selectors =====
// Header elements
const header = document.getElementById('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

// Typed text element
const typedTextElement = document.querySelector('.typed-text');
const textArray = [ 'Software Developer' ];//'Web Developer', 'Designer', 'Freelancer', 'Problem Solver'
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;

// Sections for scroll animations
const sections = document.querySelectorAll('section');

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

// Testimonial slider removed as per client request

// Contact form
const contactForm = document.getElementById('contactForm');

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

// ===== 2. Event Listeners =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    if (typedTextElement) typeWriter();
    
    // Initialize testimonial slider
    if (testimonialItems.length > 0) {
        showSlide(currentSlide);
        startTestimonialSlider();
    }
    
    // Add animation classes to sections
    addAnimationClasses();
    
    // Initialize skill bars animation
    animateSkillBars();
});

window.addEventListener('scroll', function() {
    // Header scroll effect
    toggleHeaderClass();
    
    // Reveal elements on scroll
    revealOnScroll();
    
    // Toggle back to top button
    toggleBackToTopButton();
});

window.addEventListener('resize', function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== 3. Header & Navigation =====
// Toggle header class on scroll
function toggleHeaderClass() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
navItems.forEach(item => {
    item.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Remove active class from all nav items
        navItems.forEach(navItem => navItem.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
    });
});

// Update active nav item on scroll
window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// ===== 4. Typing Animation =====
function typeWriter() {
    if (!typedTextElement) return;
    
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        // Remove character
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 100; // Faster when deleting
    } else {
        // Add character
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200; // Normal typing speed
    }
    
    // If word is complete
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 1000; // Pause at end of word
    } 
    // If deletion is complete
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length; // Move to next word
        typingDelay = 500; // Pause before typing next word
    }
    
    setTimeout(typeWriter, typingDelay);
}

// ===== 5. Scroll Animations =====
// Add animation classes to elements
function addAnimationClasses() {
    // Hero section animations
    const heroElements = document.querySelectorAll('#hero h1, #hero h2, #hero p, #hero .hero-buttons, #hero .social-icons');
    heroElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.classList.add(`delay-${index + 1}`);
    });
    
    // About section animations
    const aboutImg = document.querySelector('.about-img');
    const aboutText = document.querySelector('.about-text');
    
    if (aboutImg) aboutImg.classList.add('slide-in-left');
    if (aboutText) aboutText.classList.add('slide-in-right');
}

// Reveal elements on scroll
function revealOnScroll() {
    const revealPoint = 150;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < window.innerHeight - revealPoint) {
            section.classList.add('fade-in');
        }
    });
    
    // Animate skill bars when in viewport
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const sectionTop = skillsSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 150) {
            animateSkillBars();
        }
    }
}

// Animate skill bars
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    // Check if animation has already run
    if (window.skillBarsAnimated) return;
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 300);
        });
    });
    
    // Set flag to prevent repeated animations
    window.skillBarsAnimated = true;
}

// ===== 6. Project Filtering =====
// Filter projects by category
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});


// ===== 8. Form Validation =====
// Contact form validation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // No need to prevent default as we want the form to submit to Formspree
        
        // Get form values for validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Please fill in all fields');
            e.preventDefault();
            return false;
        }
        
        // Email validation
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            e.preventDefault();
            return false;
        }
        
        
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== 9. Back to Top Button =====
// Toggle back to top button
function toggleBackToTopButton() {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
}

// Scroll to top when button is clicked
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== 10. Utility Functions =====
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});
