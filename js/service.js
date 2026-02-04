// ===================================
// SERVICES PAGE SPECIFIC JAVASCRIPT
// Enhanced animations and interactions for the Services page
// ===================================

// Service data with detailed information
const servicesData = [
    {
        title: "Technology Transfer Partnerships",
        icon: "fas fa-exchange-alt",
        description: "Seamless technology transfer partnerships to accelerate innovation and bring cutting-edge biopharmaceutical solutions to market efficiently.",
        features: [
            "Intellectual Property Assessment & Valuation",
            "Regulatory Compliance & Documentation",
            "Process Optimization & Scale-up",
            "Quality Systems Implementation",
            "Risk Assessment & Mitigation"
        ]
    },
    {
        title: "CRO & CDMO Partnerships",
        icon: "fas fa-flask",
        description: "Strategic partnerships with leading Contract Research Organizations and Contract Development Manufacturing Organizations worldwide.",
        features: [
            "Vendor Selection & Due Diligence",
            "Quality Assurance & Compliance",
            "Cost Optimization Strategies",
            "Project Management & Oversight",
            "Supply Chain Management"
        ]
    },
    {
        title: "Business Development Strategy",
        icon: "fas fa-chart-line",
        description: "Comprehensive business development strategies designed to maximize market opportunities and accelerate sustainable growth.",
        features: [
            "Market Analysis & Competitive Intelligence",
            "Strategic Planning & Roadmapping",
            "Partnership Development & Negotiations",
            "Revenue Model Optimization",
            "Go-to-Market Strategy"
        ]
    },
    {
        title: "Digital Marketing Strategy",
        icon: "fas fa-digital-tachograph",
        description: "Advanced digital marketing strategies specifically tailored for the complex biopharmaceutical industry landscape.",
        features: [
            "Brand Strategy & Positioning",
            "Digital Campaign Development",
            "Market Penetration Analysis",
            "Content Marketing & Thought Leadership",
            "Performance Analytics & ROI Tracking"
        ]
    },
    {
        title: "In & Out Licensing Solutions",
        icon: "fas fa-balance-scale",
        description: "Expert guidance on licensing opportunities to maximize intellectual property value and strategic asset utilization.",
        features: [
            "License Agreement Negotiations",
            "Technical & Commercial Due Diligence",
            "Contract Management & Compliance",
            "Portfolio Valuation & Strategy",
            "Risk Assessment & Mitigation"
        ]
    },
    {
        title: "Financial Strategy & Planning",
        icon: "fas fa-coins",
        description: "Comprehensive financial planning and strategic development for sustainable growth and optimal capital allocation.",
        features: [
            "Financial Modeling & Forecasting",
            "Investment Strategy Development",
            "Risk Management & Mitigation",
            "Capital Structure Optimization",
            "Valuation & Exit Strategy Planning"
        ]
    },
    {
        title: "Investment Banking Advisory",
        icon: "fas fa-university",
        description: "Strategic advisory services for investment banks and emerging biotechnology startups seeking growth capital.",
        features: [
            "Deal Structuring & Execution",
            "Market Research & Analysis",
            "Investor Relations Support",
            "Regulatory Strategy Guidance",
            "Post-Transaction Integration"
        ]
    },
    {
        title: "Technical Due Diligence",
        icon: "fas fa-search",
        description: "Comprehensive technical due diligence services for informed investment and partnership decisions.",
        features: [
            "Technology Assessment & Validation",
            "Regulatory Pathway Analysis",
            "Manufacturing Feasibility Review",
            "Competitive Landscape Analysis",
            "Risk-Benefit Assessment"
        ]
    },
    {
        title: "Non-Profit Partnerships",
        icon: "fas fa-hands-helping",
        description: "Strategic partnerships with philanthropic and non-profit organizations to advance global health initiatives.",
        features: [
            "Partnership Strategy Development",
            "Grant Writing & Funding Support",
            "Program Design & Implementation",
            "Impact Measurement & Reporting",
            "Stakeholder Engagement"
        ]
    },
    {
        title: "M&A Advisory Services",
        icon: "fas fa-handshake",
        description: "Expert mergers and acquisitions advisory services to maximize value creation and strategic positioning.",
        features: [
            "Target Identification & Screening",
            "Valuation & Deal Structuring",
            "Due Diligence Coordination",
            "Negotiation Support & Execution",
            "Post-Merger Integration Planning"
        ]
    }
];

// Canvas and animation variables
let canvas, ctx, animationId;
let dots = [];
let buttonElements = [];
const total = 50;
let amplitude = 100;
let centerX = 0;

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvas();
    setupServiceButtons();
    initializePopupHandlers();
    initializeAnimations();
    
    // Start the DNA animation
    startDNAAnimation();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
});

// ===================================
// CANVAS SETUP AND ANIMATION
// ===================================
function initializeCanvas() {
    canvas = document.getElementById("dnaCanvas");
    if (!canvas) return;
    
    ctx = canvas.getContext("2d");
    resizeCanvas();
    
    // Initialize DNA dots
    dots = [];
    for (let i = 0; i < total; i++) {
        dots.push({
            y: i * 20,
            phase: i * 0.2
        });
    }
}

function resizeCanvas() {
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    amplitude = Math.min(canvas.width * 0.15, 120);
}

function startDNAAnimation() {
    if (!canvas || !ctx) return;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const time = Date.now() / 1000;
        
        // Draw DNA strands
        dots.forEach((dot) => {
            const offset = Math.sin(time + dot.phase) * amplitude;
            const x1 = centerX + offset;
            const x2 = centerX - offset;
            const y = dot.y;
            
            // Draw left strand (red)
            ctx.beginPath();
            ctx.arc(x1, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(220, 38, 38, 0.8)";
            ctx.fill();
            
            // Draw right strand (blue)
            ctx.beginPath();
            ctx.arc(x2, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(30, 58, 138, 0.8)";
            ctx.fill();
            
            // Draw connecting line
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.strokeStyle = "rgba(100, 116, 139, 0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();
        });
        
        // Update button positions with floating animation
        updateButtonPositions(time);
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// ===================================
// SERVICE BUTTONS SETUP
// ===================================
function setupServiceButtons() {
    const buttonContainer = document.getElementById("buttons-container");
    if (!buttonContainer) return;
    
    // Clear existing buttons
    buttonContainer.innerHTML = "";
    buttonElements = [];
    
    const containerRect = buttonContainer.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const baseSpacing = Math.min(window.innerHeight / (servicesData.length + 1), 80);
    const offsetX = Math.min(window.innerWidth * 0.25, 280);
    
    servicesData.forEach((service, i) => {
        const button = document.createElement("button");
        button.className = "service-button";
        button.type = "button";
        button.innerText = service.title;
        button.setAttribute('data-service-index', i);
        button.setAttribute('aria-label', `Learn more about ${service.title}`);
        
        // Position buttons alternately on left and right
        const isLeft = i % 2 === 0;
        const leftPos = isLeft 
            ? centerX - offsetX 
            : centerX + offsetX - 250; // Approximate button width
        
        button.style.left = `${Math.max(20, leftPos)}px`;
        
        // Add to container and track
        buttonContainer.appendChild(button);
        buttonElements.push({
            element: button,
            baseY: baseSpacing * (i + 1) + 100,
            phase: i * 0.5,
            serviceIndex: i
        });
        
        // Add click handler
        button.addEventListener('click', (e) => handleServiceClick(e, i));
        
        // Add hover effects
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-50%) scale(1.05)';
            button.classList.add('floating');
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(-50%) scale(1)';
            button.classList.remove('floating');
        });
    });
}

function updateButtonPositions(time) {
    buttonElements.forEach((btn) => {
        const float = Math.sin(time + btn.phase) * 8;
        btn.element.style.top = `${btn.baseY + float}px`;
    });
}

// ===================================
// POPUP HANDLERS
// ===================================
function initializePopupHandlers() {
    const popupBox = document.getElementById("popup-box");
    const closeBtn = document.querySelector(".close-btn");
    
    if (closeBtn) {
        closeBtn.addEventListener("click", closePopup);
    }
    
    if (popupBox) {
        // Close popup when clicking outside content
        popupBox.addEventListener("click", (e) => {
            if (e.target === popupBox) {
                closePopup();
            }
        });
        
        // Handle escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && popupBox.style.display === "flex") {
                closePopup();
            }
        });
    }
}

function handleServiceClick(event, serviceIndex) {
    event.preventDefault();
    
    const service = servicesData[serviceIndex];
    if (!service) return;
    
    showServicePopup(service, serviceIndex);
    
    // Add analytics tracking
    trackServiceInteraction(service.title);
}

function showServicePopup(service, serviceIndex) {
    const popupBox = document.getElementById("popup-box");
    const popupTitle = document.getElementById("popup-title");
    const popupText = document.getElementById("popup-text");
    const popupIcon = document.querySelector(".popup-icon i");
    const featuresList = document.getElementById("popup-features-list");
    
    if (!popupBox || !popupTitle || !popupText) return;
    
    // Update popup content
    popupTitle.textContent = service.title;
    popupText.textContent = service.description;
    
    // Update icon
    if (popupIcon) {
        popupIcon.className = service.icon;
    }
    
    // Update features list
    if (featuresList && service.features) {
        featuresList.innerHTML = '';
        service.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }
    
    // Show popup with animation
    popupBox.style.display = "flex";
    popupBox.setAttribute('aria-hidden', 'false');
    
    // Trigger animation
    setTimeout(() => {
        popupBox.classList.add('show');
    }, 10);
    
    // Focus management for accessibility
    const closeButton = popupBox.querySelector('.close-btn');
    if (closeButton) {
        closeButton.focus();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const popupBox = document.getElementById("popup-box");
    if (!popupBox) return;
    
    popupBox.classList.remove('show');
    popupBox.setAttribute('aria-hidden', 'true');
    
    setTimeout(() => {
        popupBox.style.display = "none";
        document.body.style.overflow = '';
    }, 300);
}

// ===================================
// RESPONSIVE HANDLING
// ===================================
function handleResize() {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        resizeCanvas();
        setupServiceButtons();
    }, 250);
}

// ===================================
// ANIMATIONS AND INTERACTIONS
// ===================================
function initializeAnimations() {
    // Initialize scroll animations
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
                }, index * 100);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Initialize card hover effects
    initializeCardEffects();
}

function initializeCardEffects() {
    const cards = document.querySelectorAll('.service-card, .benefit-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ===================================
// CTA BUTTON HANDLERS
// ===================================
function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    
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
            
            // Handle button action
            if (this.classList.contains('cta-primary')) {
                handleGetStarted();
            } else {
                handleScheduleConsultation();
            }
        });
    });
}

function handleGetStarted() {
    // Scroll to contact section or show contact form
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Redirect to contact page or show modal
        window.location.href = './index.html#contact';
    }
}

function handleScheduleConsultation() {
    // Open scheduling modal or redirect to scheduling page
    alert('Scheduling consultation feature would be implemented here');
}

// ===================================
// ANALYTICS AND TRACKING
// ===================================
function trackServiceInteraction(serviceName) {
    // Track service interactions for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'service_interaction', {
            'service_name': serviceName,
            'page_title': document.title
        });
    }
    
    console.log(`Service interaction tracked: ${serviceName}`);
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
function initializeAccessibility() {
    // Add ARIA labels and roles
    const serviceButtons = document.querySelectorAll('.service-button');
    serviceButtons.forEach((button, index) => {
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        button.setAttribute('aria-describedby', `service-description-${index}`);
    });
    
    // Keyboard navigation for service buttons
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('service-button')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.target.click();
            }
        }
    });
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
function optimizePerformance() {
    // Pause animations when not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) startDNAAnimation();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        });
    });
    
    if (canvas) {
        observer.observe(canvas);
    }
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable floating animations
        const style = document.createElement('style');
        style.textContent = `
            .service-button.floating {
                animation: none !important;
            }
            .service-button {
                transition: transform 0.1s ease !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// ERROR HANDLING
// ===================================
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.error('Services page error:', e.error);
        
        // Graceful fallback for canvas errors
        if (e.error && e.error.message.includes('canvas')) {
            const canvas = document.getElementById('dnaCanvas');
            if (canvas) {
                canvas.style.display = 'none';
            }
        }
    });
}

// ===================================
// INITIALIZATION COMPLETE
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeCanvas();
    setupServiceButtons();
    initializePopupHandlers();
    initializeAnimations();
    initializeCTAButtons();
    initializeAccessibility();
    optimizePerformance();
    handleErrors();
    
    // Start DNA animation
    startDNAAnimation();
    
    console.log('Services page initialized successfully');
});

// ===================================
// CLEANUP ON PAGE UNLOAD
// ===================================
window.addEventListener('beforeunload', function() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Clean up event listeners
    window.removeEventListener('resize', handleResize);
});

// ===================================
// EXPORT FOR TESTING (if needed)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        servicesData,
        initializeCanvas,
        setupServiceButtons,
        showServicePopup,
        closePopup
    };
}
