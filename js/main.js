// ===================================
// AMERICAN BIOSOURCES INC. - MAIN JAVASCRIPT
// Enhanced with modern animations, lazy loading, and responsive features
// ===================================

// ===================================
// LOADING SCREEN MANAGEMENT
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Initialize animations after loading screen disappears
            setTimeout(initializeAnimations, 500);
        }, 1000);
    });
});

// ===================================
// NAVBAR RESPONSIVE FUNCTIONALITY
// ===================================
const toggleBtn = document.getElementById('mobileToggle');
const nav = document.getElementById('navigation');
const navbar = document.getElementById('navbar');

// Mobile menu toggle functionality
if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
            toggleBtn.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// LAZY LOADING IMPLEMENTATION
// ===================================
function initializeLazyLoading() {
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"], .lazy-image');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Handle data-bg attribute for background images
                if (img.dataset.bg) {
                    img.style.backgroundImage = `url(${img.dataset.bg})`;
                }
                
                // Handle regular src loading
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Lazy loading for background images
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    
    const backgroundObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.backgroundImage = `url(${element.dataset.bg})`;
                element.classList.add('bg-loaded');
                observer.unobserve(element);
            }
        });
    }, {
        rootMargin: '100px 0px',
        threshold: 0.1
    });

    lazyBackgrounds.forEach(bg => backgroundObserver.observe(bg));
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initializeAnimations() {
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .slide-in-left, .slide-in-right, .zoom-in'
    );

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for multiple elements
                const siblings = entry.target.parentElement.querySelectorAll(
                    '.fade-in-up, .slide-in-left, .slide-in-right, .zoom-in'
                );
                
                siblings.forEach((sibling, index) => {
                    if (sibling === entry.target) return;
                    setTimeout(() => {
                        sibling.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// ===================================
// CAROUSEL/SLIDER FUNCTIONALITY
// ===================================
$(document).ready(function () {
    // Initialize carousel with enhanced settings
    if ($('.card-row').length) {
        $('.card-row').carousel({
            padding: 200,
            numVisible: 5,
            shift: 1,
            duration: 300
        });
        
        // Auto-play functionality with pause on hover
        let autoplayInterval;
        
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                $('.card-row').carousel('next');
            }, 4500);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Start autoplay
        startAutoplay();
        
        // Pause on hover
        $('.card-row').hover(stopAutoplay, startAutoplay);
        
        // Add touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        $('.card-row').on('touchstart', function(e) {
            startX = e.originalEvent.touches[0].clientX;
        });
        
        $('.card-row').on('touchend', function(e) {
            endX = e.originalEvent.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    $('.card-row').carousel('next');
                } else {
                    $('.card-row').carousel('prev');
                }
            }
        }
    }
});

// ===================================
// CONTACT FORM FUNCTIONALITY
// ===================================
const serviceDropdown = document.getElementById("serviceDropdown");
const productDropdown = document.getElementById("productDropdown");

// Enhanced product options with more realistic pharmaceutical products
const productOptions = {
    Pharmaceuticals: [
        "Cardiovascular Medications",
        "Oncology Treatments", 
        "Neurological Therapies",
        "Respiratory Medicines",
        "Diabetes Management",
        "Pain Management Solutions"
    ],
    Vaccines: [
        "Preventive Vaccines",
        "Therapeutic Vaccines", 
        "Pediatric Immunizations",
        "Adult Immunizations",
        "Travel Vaccines",
        "Seasonal Vaccines"
    ],
    Biologics: [
        "Monoclonal Antibodies",
        "Protein Therapeutics",
        "Cell Therapies",
        "Gene Therapies",
        "Immunotherapies",
        "Biosimilar Products"
    ],
    Biosimilars: [
        "Insulin Biosimilars",
        "Growth Hormone Biosimilars",
        "Antibody Biosimilars",
        "Enzyme Biosimilars",
        "Cytokine Biosimilars",
        "Hormone Biosimilars"
    ],
    Genomic: [
        "Diagnostic Testing",
        "Pharmacogenomics",
        "Companion Diagnostics",
        "Liquid Biopsy",
        "Genetic Screening",
        "Personalized Medicine"
    ]
};

// Service dropdown change handler with animation
if (serviceDropdown && productDropdown) {
    serviceDropdown.addEventListener("change", function () {
        const selectedService = this.value;
        
        // Clear and animate product dropdown
        productDropdown.style.opacity = '0.5';
        productDropdown.innerHTML = `<option value="">Select a Product</option>`;
        
        setTimeout(() => {
            if (productOptions[selectedService]) {
                productOptions[selectedService].forEach(product => {
                    const option = document.createElement("option");
                    option.value = product;
                    option.textContent = product;
                    productDropdown.appendChild(option);
                });
            }
            productDropdown.style.opacity = '1';
        }, 150);
    });
}

// Enhanced form submission with validation and feedback
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            this.reset();
            productDropdown.innerHTML = `<option value="">Select a Product</option>`;
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// DNA ANIMATION CANVAS
// ===================================
function initializeDNAAnimation() {
    const canvas = document.getElementById('dna-animation');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // DNA animation variables
    let time = 0;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Draw connecting lines
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) + 
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        time += 0.01;
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Pause animation when not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
            } else {
                cancelAnimationFrame(animationId);
            }
        });
    });
    
    observer.observe(canvas);
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.target.closest('.carousel')) {
        if (e.key === 'ArrowLeft') {
            $('.card-row').carousel('prev');
        } else if (e.key === 'ArrowRight') {
            $('.card-row').carousel('next');
        }
    }
});

// Focus management for mobile menu
if (toggleBtn && nav) {
    toggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleBtn.click();
        }
    });
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeLazyLoading();
    initializeDNAAnimation();
    
    // Add smooth scrolling to all anchor links
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
    
    // Preload critical images
    const criticalImages = [
        './asserts/logo.png',
        './asserts/images/5.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// ===================================
// FOOTER SUBSCRIPTION FORM
// ===================================
const subscribeForm = document.getElementById("subscribeForm");
if (subscribeForm) {
    subscribeForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        
        if (email) {
            showNotification(`Thank you for subscribing with: ${email}`, 'success');
            this.reset();
        }
    });
}

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Optionally show user-friendly error message
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

// ===================================
// BROWSER COMPATIBILITY CHECKS
// ===================================
function checkBrowserSupport() {
    // Check for IntersectionObserver support
    if (!window.IntersectionObserver) {
        // Fallback for older browsers
        const elements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .zoom-in');
        elements.forEach(el => el.classList.add('animate'));
    }
    
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        document.body.classList.add('no-grid-support');
    }
}

checkBrowserSupport();