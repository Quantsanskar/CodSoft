// Initialize Vanta.js background
VANTA.NET({
    el: "#vanta-background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x4caf50,
    backgroundColor: 0x0,
    points: 15.00,
    maxDistance: 25.00,
    spacing: 17.00
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1
        }
    });
});

// Responsive navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Animate skill bars
gsap.utils.toArray('.skill-progress').forEach(skill => {
    gsap.to(skill, {
        width: skill.getAttribute('data-progress') + '%',
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '#skills',
            start: "top 80%"
        }
    });
});

// Typing and erasing effect for the main heading
const mainHeading = document.querySelector('#home h1');
const text = "Sanskar Bhardwaj";
mainHeading.textContent = '';
mainHeading.setAttribute('data-text', text);

let isTyping = true;
let i = 0;

function typeWriter() {
    if (isTyping) {
        if (i < text.length) {
            mainHeading.textContent += text.charAt(i);
            mainHeading.setAttribute('data-text', mainHeading.textContent);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            isTyping = false;
            setTimeout(typeWriter, 1000); // Pause before erasing
        }
    } else {
        if (i > 0) {
            mainHeading.textContent = text.substring(0, i - 1);
            mainHeading.setAttribute('data-text', mainHeading.textContent);
            i--;
            setTimeout(typeWriter, 50);
        } else {
            isTyping = true;
            setTimeout(typeWriter, 1000); // Pause before typing again
        }
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.3 });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3 });
    });
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    gsap.to(testimonials, { opacity: 0, duration: 0.5 });
    gsap.to(testimonials[index], { opacity: 1, duration: 0.5, delay: 0.5 });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Parallax effect for background images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSections = document.querySelectorAll('.parallax-bg');
    parallaxSections.forEach(section => {
        const speed = 0.5;
        section.style.backgroundPositionY = -(scrolled * speed) + 'px';
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:sanskarsrdav@gmail.com?subject=Contact Form Submission&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

    window.location.href = mailtoLink;

    // Reset the form
    document.getElementById('contactForm').reset();
});

// Initialize animations and effects on page load
window.onload = () => {
    typeWriter();
    mainHeading.classList.add('glitch');
    showTestimonial(currentTestimonial);
    setInterval(nextTestimonial, 5000);

    // Animate skill bars on page load
    animateSkills();
};

// Intersection Observer for skill bars animation
function animateSkills() {
    const skills = document.querySelectorAll('.skill-progress');
    skills.forEach(skill => {
        const target = skill.getAttribute('data-progress');
        const name = skill.getAttribute('name');
        gsap.to(skill, {
            width: target + '%',
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => {
                skill.textContent = name + " " + target + '%';
            }
        });
    });
}

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.disconnect(); // Stop observing after animating
        }
    });
}

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1
    });
    observer.observe(skillsSection);
}



document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadResume');
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Replace 'path/to/your/resume.pdf' with the actual path to your resume
        const resumeUrl = '/myresume.pdf';
        
        // Open the PDF in a new tab
        window.open(resumeUrl, '_blank');
    });
});