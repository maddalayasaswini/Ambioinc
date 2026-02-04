// ===================================
// INVESTOR PAGE SPECIFIC JAVASCRIPT
// Enhanced animations and interactions for the Investor Relations page
// ===================================

// FAQ data
const faqData = [
    {
        question: "What is American Biosources Inc.'s stock ticker symbol?",
        answer: "Our company is privately held and not currently traded on a public stock exchange. We are focused on building long-term value and may consider an IPO in the future."
    },
    {
        question: "How can I get a copy of the annual report?",
        answer: "As a private company, we do not publish a public annual report. Accredited investors may request financial information through our Investor Relations contact."
    },
    {
        question: "When is your next earnings release?",
        answer: "We provide quarterly financial updates to our current investors. For information on our financial calendar, please contact our Investor Relations team."
    },
    {
        question: "Who is your transfer agent?",
        answer: "As a private company, we manage our own capitalization table. For any questions regarding share ownership, please contact our legal department through Investor Relations."
    },
    {
        question: "How can I invest in American Biosources Inc.?",
        answer: "Currently, investment opportunities are limited to accredited investors and institutional partners. If you meet these criteria, please contact our Investor Relations team to discuss potential opportunities."
    },
    {
        question: "What is your corporate governance structure?",
        answer: "We are committed to strong corporate governance principles. Our board of directors includes a mix of company founders and independent directors with extensive industry experience."
    }
];

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeInvestorPage();
    initializeFAQ();
    initializeInvestorForm();
    initializeAnimations();
    
    console.log('Investor page initialized successfully');
});

// ===================================
// INVESTOR PAGE INITIALIZATION
// ===================================
function initializeInvestorPage() {
    // Use the generic counter animation from main.js
    if (typeof initializeCounterAnimations === 'function') {
        initializeCounterAnimations();
    }
}

// ===================================
// FAQ ACCORDION FUNCTIONALITY
// ===================================
function initializeFAQ() {
    const accordion = document.getElementById('faqAccordion');
    if (!accordion) return;

    // Generate FAQ items from data
    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question" role="button" aria-expanded="false" aria-controls="faq-answer-${index}">
                <span>${item.question}</span>
                <i class="fas fa-plus faq-icon"></i>
            </div>
            <div class="faq-answer" id="faq-answer-${index}" role="region">
                <p>${item.answer}</p>
            </div>
        `;
        accordion.appendChild(faqItem);
    });

    // Add event listeners to generated items
    const faqItems = accordion.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items for a clean accordion experience
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    otherItem.querySelector('.faq-icon').classList.remove('fa-minus');
                    otherItem.querySelector('.faq-icon').classList.add('fa-plus');
                }
            });

            // Toggle the clicked item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                answer.style.maxHeight = null;
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
}

// ===================================
// INVESTOR CONTACT FORM
// ===================================
function initializeInvestorForm() {
    const investorForm = document.getElementById('investorContactForm');
    if (!investorForm) return;

    investorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Use the global notification function from main.js
            if (typeof showNotification === 'function') {
                showNotification('Your inquiry has been sent to our Investor Relations team.', 'success');
            } else {
                alert('Your inquiry has been sent successfully.');
            }

            // Reset form and button
            this.reset();
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initializeAnimations() {
    // This uses the global animation initializer from main.js
    if (typeof initializeScrollAnimations === 'function') {
        initializeScrollAnimations();
    }
}

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', function(e) {
    console.error('Investor page error:', e.error);
});