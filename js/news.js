// ===================================
// NEWS PAGE SPECIFIC JAVASCRIPT
// Enhanced animations and interactions for the News page
// ===================================

// News data and state management
let allNewsArticles = [];
let filteredArticles = [];
let currentPage = 1;
const articlesPerPage = 9;
let isLoading = false;

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeNewsPage();
    initializeSearchAndFilter();
    initializeNewsletterForm();
    initializeAnimations();
    initializeLazyLoading();
    
    console.log('News page initialized successfully');
});

// ===================================
// NEWS PAGE INITIALIZATION
// ===================================
function initializeNewsPage() {
    // Get all news articles from the DOM
    allNewsArticles = Array.from(document.querySelectorAll('.news-card'));
    filteredArticles = [...allNewsArticles];
    
    // Initialize load more functionality
    initializeLoadMore();
    
    // Add click tracking to news cards
    allNewsArticles.forEach((card, index) => {
        card.addEventListener('click', () => {
            trackNewsClick(card, index);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = card.querySelector('a');
                if (link) {
                    window.open(link.href, '_blank', 'noopener,noreferrer');
                }
            }
        });
        
        // Add accessibility attributes
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
    });
}

// ===================================
// SEARCH AND FILTER FUNCTIONALITY
// ===================================
function initializeSearchAndFilter() {
    const searchInput = document.getElementById('newsSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        // Debounce search input
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            performFilter(e.target.value);
        });
    }
}

function performSearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    filteredArticles = allNewsArticles.filter(article => {
        const title = article.querySelector('.news-title')?.textContent.toLowerCase() || '';
        const excerpt = article.querySelector('.news-excerpt')?.textContent.toLowerCase() || '';
        const source = article.querySelector('.news-source')?.textContent.toLowerCase() || '';
        
        return title.includes(term) || excerpt.includes(term) || source.includes(term);
    });
    
    updateNewsDisplay();
    trackSearchInteraction(searchTerm);
}

function performFilter(category) {
    if (category === 'all') {
        filteredArticles = [...allNewsArticles];
    } else {
        filteredArticles = allNewsArticles.filter(article => {
            const articleCategory = article.dataset.category;
            return articleCategory === category;
        });
    }
    
    updateNewsDisplay();
    trackFilterInteraction(category);
}

function updateNewsDisplay() {
    // Hide all articles first
    allNewsArticles.forEach(article => {
        article.classList.add('hidden');
    });
    
    // Show filtered articles with animation
    filteredArticles.forEach((article, index) => {
        setTimeout(() => {
            article.classList.remove('hidden');
            article.classList.add('animate');
        }, index * 100);
    });
    
    // Update load more button visibility
    updateLoadMoreButton();
    
    // Show no results message if needed
    showNoResultsMessage();
}

function showNoResultsMessage() {
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (filteredArticles.length === 0) {
        const newsGrid = document.getElementById('newsGrid');
        const message = document.createElement('div');
        message.className = 'no-results-message fade-in-up';
        message.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or filter criteria.</p>
                <button class="clear-filters-btn" onclick="clearAllFilters()">
                    <span>Clear Filters</span>
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        message.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            padding: var(--space-16);
            background: var(--bg-secondary);
            border-radius: 16px;
            border: 2px dashed var(--border-color);
        `;
        
        newsGrid.appendChild(message);
        
        // Trigger animation
        setTimeout(() => {
            message.classList.add('animate');
        }, 100);
    }
}

function clearAllFilters() {
    const searchInput = document.getElementById('newsSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    
    filteredArticles = [...allNewsArticles];
    updateNewsDisplay();
}

// Make clearAllFilters globally available
window.clearAllFilters = clearAllFilters;

// ===================================
// LOAD MORE FUNCTIONALITY
// ===================================
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreArticles);
    }
    
    // Initially show only first page of articles
    showArticlesPage(1);
}

function loadMoreArticles() {
    if (isLoading) return;
    
    isLoading = true;
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Show loading state
    if (loadMoreBtn) {
        loadMoreBtn.innerHTML = `
            <span>Loading...</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;
        loadMoreBtn.disabled = true;
    }
    
    // Simulate loading delay
    setTimeout(() => {
        currentPage++;
        showArticlesPage(currentPage);
        
        // Reset button state
        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = `
                <span>Load More Articles</span>
                <i class="fas fa-chevron-down"></i>
            `;
            loadMoreBtn.disabled = false;
        }
        
        isLoading = false;
        updateLoadMoreButton();
    }, 1000);
}

function showArticlesPage(page) {
    const startIndex = 0;
    const endIndex = page * articlesPerPage;
    
    filteredArticles.forEach((article, index) => {
        if (index < endIndex) {
            article.style.display = 'block';
            // Add staggered animation
            setTimeout(() => {
                article.classList.add('animate');
            }, (index % articlesPerPage) * 100);
        } else {
            article.style.display = 'none';
        }
    });
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreContainer = document.querySelector('.load-more-container');
    
    if (!loadMoreBtn || !loadMoreContainer) return;
    
    const totalVisible = currentPage * articlesPerPage;
    const hasMoreArticles = totalVisible < filteredArticles.length;
    
    if (hasMoreArticles) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

// ===================================
// NEWSLETTER FORM FUNCTIONALITY
// ===================================
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }
}

function handleNewsletterSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    if (!email) return;
    
    // Show loading state
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `
        <span>Subscribing...</span>
        <i class="fas fa-spinner fa-spin"></i>
    `;
    submitBtn.disabled = true;
    
    // Simulate subscription process
    setTimeout(() => {
        // Show success message
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        
        // Reset form
        event.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        
        // Track subscription
        trackNewsletterSubscription(email);
    }, 2000);
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
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
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
            
            this.style.position = 'relative';
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
// LAZY LOADING FOR IMAGES
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
                imageLoader.onerror = () => {
                    // Fallback for broken images
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                    img.style.filter = 'blur(0px)';
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
function trackNewsClick(card, index) {
    const title = card.querySelector('.news-title')?.textContent || '';
    const source = card.querySelector('.news-source')?.textContent || '';
    const category = card.dataset.category || '';
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'news_click', {
            'news_title': title,
            'news_source': source,
            'news_category': category,
            'news_position': index + 1
        });
    }
    
    console.log(`News click tracked: ${title}`);
}

function trackSearchInteraction(searchTerm) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'news_search', {
            'search_term': searchTerm,
            'results_count': filteredArticles.length
        });
    }
    
    console.log(`News search tracked: ${searchTerm}`);
}

function trackFilterInteraction(category) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'news_filter', {
            'filter_category': category,
            'results_count': filteredArticles.length
        });
    }
    
    console.log(`News filter tracked: ${category}`);
}

function trackNewsletterSubscription(email) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_subscription', {
            'method': 'news_page'
        });
    }
    
    console.log(`Newsletter subscription tracked`);
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
function initializeAccessibility() {
    // Add ARIA labels for better screen reader support
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach((card, index) => {
        const title = card.querySelector('.news-title')?.textContent || '';
        card.setAttribute('aria-label', `Read article: ${title}`);
        card.setAttribute('aria-describedby', `news-meta-${index}`);
        
        const meta = card.querySelector('.news-meta');
        if (meta) {
            meta.id = `news-meta-${index}`;
        }
    });
    
    // Keyboard navigation for search and filter
    const searchInput = document.getElementById('newsSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                performSearch('');
            }
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                categoryFilter.value = 'all';
                performFilter('all');
            }
        });
    }
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
function optimizePerformance() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            .news-card,
            .load-more-btn,
            .newsletter-form button {
                transition: transform 0.1s ease !important;
            }
            .news-card:hover {
                animation: none !important;
            }
            .news-image img {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Intersection observer for performance monitoring
    const performanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Preload images in viewport
                const images = entry.target.querySelectorAll('img[loading="lazy"]');
                images.forEach(img => {
                    if (!img.src) {
                        img.src = img.dataset.src || img.src;
                    }
                });
            }
        });
    });
    
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => performanceObserver.observe(card));
}

// ===================================
// ERROR HANDLING
// ===================================
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.error('News page error:', e.error);
        
        // Graceful fallback for image loading errors
        if (e.error && e.error.message.includes('image')) {
            const brokenImages = document.querySelectorAll('img[src=""]');
            brokenImages.forEach(img => {
                img.style.display = 'none';
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
        
        @keyframes newsCardFloat {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-5px);
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
        
        .no-results-content {
            color: var(--text-secondary);
        }
        
        .no-results-content i {
            font-size: 3rem;
            margin-bottom: 1rem;
            opacity: 0.5;
        }
        
        .no-results-content h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--primary-color-1);
        }
        
        .clear-filters-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: var(--primary-color-1);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 1rem;
            transition: all 0.3s ease;
        }
        
        .clear-filters-btn:hover {
            background: var(--primary-color-1-hover);
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// INITIALIZATION COMPLETE
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeNewsPage();
    initializeSearchAndFilter();
    initializeNewsletterForm();
    initializeAnimations();
    initializeLazyLoading();
    initializeAccessibility();
    optimizePerformance();
    handleErrors();
    addCustomAnimations();
    
    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
    
    console.log('News page initialized successfully');
});

// ===================================
// CLEANUP ON PAGE UNLOAD
// ===================================
window.addEventListener('beforeunload', function() {
    // Clean up any running timers or intervals
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
        notification.remove();
    });
});

// ===================================
// EXPORT FOR TESTING (if needed)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        performSearch,
        performFilter,
        loadMoreArticles,
        handleNewsletterSubmission
    };
}
