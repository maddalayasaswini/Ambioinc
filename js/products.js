// Product data with detailed information
const productsData = {
    pharmaceuticals: {
        title: "Pharmaceuticals",
        icon: "fas fa-pills",
        description: "Advanced pharmaceutical formulations targeting critical therapeutic areas with innovative drug delivery systems and enhanced bioavailability.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        heading1: "Key Features",
        points1: [
            "Novel drug delivery systems for enhanced efficacy",
            "Targeted therapeutic formulations",
            "Advanced bioavailability enhancement",
            "Precision dosing technologies",
            "Patient-centric formulation design",
            "Regulatory-compliant manufacturing"
        ],
        heading2: "Therapeutic Applications",
        points2: [
            "Cardiovascular disease management",
            "Oncology and cancer treatment",
            "Neurological disorders",
            "Metabolic diseases and diabetes",
            "Respiratory conditions",
            "Pain management solutions"
        ]
    },
    vaccines: {
        title: "Vaccines",
        icon: "fas fa-syringe",
        description: "Next-generation vaccines utilizing cutting-edge immunology research for infectious disease prevention and therapeutic applications.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        heading1: "Key Features",
        points1: [
            "mRNA and viral vector platforms",
            "Enhanced immunogenicity profiles",
            "Thermostable formulations",
            "Adjuvant optimization",
            "Multi-strain protection",
            "Rapid development capabilities"
        ],
        heading2: "Vaccine Applications",
        points2: [
            "Infectious disease prevention",
            "Pandemic preparedness",
            "Therapeutic cancer vaccines",
            "Pediatric immunization programs",
            "Travel and endemic disease protection",
            "Immunocompromised patient solutions"
        ]
    },
    biologics: {
        title: "Biologics",
        icon: "fas fa-dna",
        description: "Innovative biological therapies including monoclonal antibodies, recombinant proteins, and cell-based therapeutics for complex diseases.",
        image: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        heading1: "Key Features",
        points1: [
            "Monoclonal antibody development",
            "Recombinant protein therapeutics",
            "Cell and gene therapy platforms",
            "Immunotherapy solutions",
            "Precision medicine approaches",
            "Advanced purification technologies"
        ],
        heading2: "Clinical Applications",
        points2: [
            "Autoimmune disease treatment",
            "Cancer immunotherapy",
            "Rare genetic disorders",
            "Inflammatory conditions",
            "Regenerative medicine",
            "Organ transplant support"
        ]
    },
    biosimilars: {
        title: "Biosimilars",
        icon: "fas fa-microscope",
        description: "High-quality biosimilar products providing accessible treatment options with demonstrated similarity to reference biologics.",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        heading1: "Key Features",
        points1: [
            "Rigorous analytical comparability",
            "Clinical equivalence demonstration",
            "Cost-effective manufacturing",
            "Regulatory pathway expertise",
            "Quality assurance systems",
            "Global market access"
        ],
        heading2: "Product Categories",
        points2: [
            "Insulin and diabetes management",
            "Growth hormone therapies",
            "Monoclonal antibody biosimilars",
            "Cytokine and interferon products",
            "Enzyme replacement therapies",
            "Oncology biosimilar portfolio"
        ]
    },
    genomics: {
        title: "Genomic Diagnostics",
        icon: "fas fa-search",
        description: "Precision diagnostic tools leveraging genomic technologies for personalized medicine and targeted therapeutic approaches.",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        heading1: "Key Features",
        points1: [
            "Next-generation sequencing platforms",
            "Companion diagnostic development",
            "Pharmacogenomic testing",
            "Liquid biopsy technologies",
            "AI-powered analysis algorithms",
            "Point-of-care diagnostic solutions"
        ],
        heading2: "Diagnostic Applications",
        points2: [
            "Cancer genomic profiling",
            "Hereditary disease screening",
            "Pharmacogenomic testing",
            "Infectious disease detection",
            "Prenatal genetic testing",
            "Personalized treatment selection"
        ]
    }
};

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeProductCards();
    initializeModal();
    initializeAnimations();
    initializeCounterAnimations();
    initializeCTAButtons();
    
    console.log('Products page initialized successfully');
});

// ===================================
// PRODUCT CARDS INITIALIZATION
// ===================================
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add click handler
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            if (category && productsData[category]) {
                showProductModal(productsData[category]);
                trackProductInteraction(category);
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
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
            
            this.style.position = 'relative';
            this.appendChild(glowElement);
        });
        
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
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add accessibility attributes
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Learn more about ${card.querySelector('h3').textContent}`);
    });
}

// ===================================
// MODAL FUNCTIONALITY
// ===================================
function initializeModal() {
    const modal = document.getElementById('productModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeButton = document.querySelector('.modal-close');
    
    // Close modal handlers
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Escape key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

function showProductModal(productData) {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    
    // Update modal content
    updateModalContent(productData);
    
    // Show modal with animation
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    
    // Trigger animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Focus management for accessibility
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.focus();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function updateModalContent(productData) {
    // Update title and description
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalIcon = document.getElementById('modal-icon');
    const modalImg = document.getElementById('modal-img');
    
    if (modalTitle) modalTitle.textContent = productData.title;
    if (modalDescription) modalDescription.textContent = productData.description;
    if (modalIcon) modalIcon.className = productData.icon;
    if (modalImg) {
        modalImg.src = productData.image;
        modalImg.alt = `${productData.title} illustration`;
    }
    
    // Update sections
    updateModalSection('modal-heading1', 'modal-points1', productData.heading1, productData.points1);
    updateModalSection('modal-heading2', 'modal-points2', productData.heading2, productData.points2);
}

function updateModalSection(headingId, pointsId, heading, points) {
    const headingElement = document.getElementById(headingId);
    const pointsElement = document.getElementById(pointsId);
    
    if (headingElement) headingElement.textContent = heading;
    if (pointsElement && points) {
        pointsElement.innerHTML = '';
        points.forEach(point => {
            const li = document.createElement('li');
            li.textContent = point;
            pointsElement.appendChild(li);
        });
    }
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Make closeModal globally available for onclick handlers
window.closeModal = closeModal;

// ===================================
// COUNTER ANIMATIONS
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
// SCROLL ANIMATIONS
// ===================================
function initializeAnimations() {
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
// CTA BUTTON HANDLERS
// ===================================
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add ripple effect
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
                background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
            
            // Handle button action based on class
            if (this.classList.contains('cta-primary')) {
                handleRequestInformation();
            } else if (this.classList.contains('cta-secondary')) {
                handleScheduleMeeting();
            } else if (this.classList.contains('cta-button')) {
                handleContactTeam();
            }
        });
    });
}

function handleRequestInformation() {
    // Scroll to contact section or show contact form
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Redirect to contact page
        window.location.href = './index.html#contact';
    }
}

function handleScheduleMeeting() {
    // Open scheduling modal or redirect to scheduling page
    showNotification('Meeting scheduling feature would be implemented here', 'info');
}

function handleContactTeam() {
    // Open contact form or redirect to contact page
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = './index.html#contact';
    }
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
// ANALYTICS AND TRACKING
// ===================================
function trackProductInteraction(productCategory) {
    // Track product interactions for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'product_interaction', {
            'product_category': productCategory,
            'page_title': document.title
        });
    }
    
    console.log(`Product interaction tracked: ${productCategory}`);
}

// ===================================
// LAZY LOADING FOR PRODUCT IMAGES
// ===================================
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
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
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
function initializeAccessibility() {
    // Add ARIA labels for better screen reader support
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.setAttribute('aria-describedby', `product-description-${index}`);
    });
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('productModal');
        if (modal && modal.classList.contains('show')) {
            if (e.key === 'Tab') {
                // Trap focus within modal
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
function optimizePerformance() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            .product-card,
            .innovation-item,
            .stat-item {
                transition: transform 0.1s ease !important;
            }
            .product-gif {
                animation: none !important;
            }
            .product-card:hover .product-animation {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Pause animations when not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const gifs = entry.target.querySelectorAll('.product-gif');
            gifs.forEach(gif => {
                if (entry.isIntersecting) {
                    gif.play && gif.play();
                } else {
                    gif.pause && gif.pause();
                }
            });
        });
    });
    
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => observer.observe(card));
}

// ===================================
// ERROR HANDLING
// ===================================
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.error('Products page error:', e.error);
        
        // Graceful fallback for animation errors
        if (e.error && e.error.message.includes('animation')) {
            const gifs = document.querySelectorAll('.product-gif');
            gifs.forEach(gif => {
                gif.style.display = 'none';
            });
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
        
        @keyframes productFloat {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        @keyframes cardGlow {
            0%, 100% {
                opacity: 0.3;
            }
            50% {
                opacity: 0.6;
            }
        }
        
        .card-glow {
            animation: cardGlow 2s ease-in-out infinite;
        }
        
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// INITIALIZATION COMPLETE
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeProductCards();
    initializeModal();
    initializeAnimations();
    initializeCounterAnimations();
    initializeCTAButtons();
    initializeLazyLoading();
    initializeAccessibility();
    optimizePerformance();
    handleErrors();
    addCustomAnimations();
    
    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
    
    console.log('Products page initialized successfully');
});

// ===================================
// CLEANUP ON PAGE UNLOAD
// ===================================
window.addEventListener('beforeunload', function() {
    // Clean up any running animations or intervals
    const gifs = document.querySelectorAll('.product-gif');
    gifs.forEach(gif => {
        gif.pause && gif.pause();
    });
});

// ===================================
// EXPORT FOR TESTING (if needed)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        productsData,
        showProductModal,
        closeModal,
        initializeProductCards
    };
}