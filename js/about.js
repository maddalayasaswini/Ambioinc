// ===================================
// ABOUT PAGE SPECIFIC JAVASCRIPT
// Enhanced animations and interactions for the About page
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize about page specific features
    initializeCounterAnimations();
    initializeProgressiveImageLoading();
    initializeParallaxEffects();
    initializeCardInteractions();
});

// ===================================
// COUNTER ANIMATIONS FOR STATISTICS
// ===================================
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                counter.classList.add('counting');
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===================================
// PROGRESSIVE IMAGE LOADING
// ===================================
function initializeProgressiveImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading state
                img.style.filter = 'blur(5px)';
                img.style.transition = 'filter 0.3s ease';
                
                // Create a new image to preload
                const imageLoader = new Image();
                imageLoader.onload = () => {
                    img.src = imageLoader.src;
                    img.style.filter = 'blur(0px)';
                    img.classList.add('loaded');
                };
                imageLoader.src = img.src;
                
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// PARALLAX EFFECTS
// ===================================
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.info-section, .values-section');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                element.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===================================
// CARD INTERACTIONS
// ===================================
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.sub-section, .strategy, .value-card, .leader-card, .stat-item');
    
    cards.forEach(card => {
        // Add mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add glow effect
            const glowElement = document.createElement('div');
            glowElement.className = 'card-glow';
            glowElement.style.cssText = `
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(45deg, var(--primary-color-1), var(--accent-color));
                border-radius: inherit;
                z-index: -1;
                opacity: 0.3;
                filter: blur(8px);
                transition: opacity 0.3s ease;
            `;
            
            if (this.style.position !== 'relative') {
                this.style.position = 'relative';
            }
            this.appendChild(glowElement);
        });
        
        // Add mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            // Remove glow effect
            const glowElement = this.querySelector('.card-glow');
            if (glowElement) {
                glowElement.style.opacity = '0';
                setTimeout(() => {
                    if (glowElement.parentNode) {
                        glowElement.parentNode.removeChild(glowElement);
                    }
                }, 300);
            }
        });
        
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            if (this.style.position !== 'relative') {
                this.style.position = 'relative';
            }
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// ===================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ===================================
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// ENHANCED SCROLL ANIMATIONS
// ===================================
function initializeEnhancedScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .slide-in-left, .slide-in-right, .zoom-in'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    
                    // Add custom animation based on element type
                    if (entry.target.classList.contains('stat-item')) {
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }, index * 100);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// ===================================
// DYNAMIC BACKGROUND EFFECTS
// ===================================
function initializeDynamicBackgrounds() {
    const sections = document.querySelectorAll('.info-section, .values-section, .leadership-section');
    
    sections.forEach(section => {
        // Create floating particles
        const particleCount = 20;
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite linear;
            `;
            particlesContainer.appendChild(particle);
        }
        
        section.style.position = 'relative';
        section.appendChild(particlesContainer);
    });
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
function initializeAccessibilityFeatures() {
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.sub-section, .value-card, .leader-card');
    
    interactiveCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color-1)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add ARIA labels for better screen reader support
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const label = stat.nextElementSibling.textContent;
        stat.setAttribute('aria-label', `${stat.textContent} ${label}`);
    });
}

// ===================================
// PERFORMANCE MONITORING
// ===================================
function initializePerformanceMonitoring() {
    // Monitor animation performance
    let animationFrameId;
    let lastTime = performance.now();
    
    function checkPerformance(currentTime) {
        const deltaTime = currentTime - lastTime;
        
        // If frame rate drops below 30fps, reduce animations
        if (deltaTime > 33) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
        
        lastTime = currentTime;
        animationFrameId = requestAnimationFrame(checkPerformance);
    }
    
    // Start monitoring
    animationFrameId = requestAnimationFrame(checkPerformance);
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
}

// ===================================
// CSS ANIMATIONS KEYFRAMES
// ===================================
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
            }
        }
        
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .card-hover-effect {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover-effect:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all about page features
    initializeCounterAnimations();
    initializeProgressiveImageLoading();
    initializeParallaxEffects();
    initializeCardInteractions();
    initializeSmoothScroll();
    initializeEnhancedScrollAnimations();
    initializeDynamicBackgrounds();
    initializeAccessibilityFeatures();
    initializePerformanceMonitoring();
    addCustomAnimations();
    
    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', function(e) {
    console.error('About page error:', e.error);
    // Gracefully handle errors without breaking the user experience
});

// ===================================
// CLEANUP ON PAGE UNLOAD
// ===================================
window.addEventListener('beforeunload', function() {
    // Clean up any running animations or intervals
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach(particle => {
        particle.style.animation = 'none';
    });
});
