// Portfolio Page JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize all portfolio functionality
function initializePortfolio() {
    initMobileNavigation();
    initSmoothScrolling();
    initHeaderScrollEffect();
    initPortfolioInteractions();
    initImageHandling();
    initCTATracking();
    initScrollAnimations();
    initPerformanceOptimizations();
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add transparency and blur effect
            if (scrollTop > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'var(--white)';
                header.style.backdropFilter = 'none';
                header.style.borderBottom = 'none';
            }

            // Hide/show header on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
}

// Portfolio interactions
function initPortfolioInteractions() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        // Click tracking (don't trigger if clicking on visit button)
        item.addEventListener('click', function(e) {
            if (!e.target.closest('.visit-btn')) {
                const visitBtn = this.querySelector('.visit-btn');
                if (visitBtn) {
                    // Add subtle feedback animation
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                    
                    // Optional: Auto-click the visit button after a delay
                    // setTimeout(() => visitBtn.click(), 300);
                }
            }
        });

        // Enhanced hover effects
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            
            // Add subtle rotation effect
            const image = this.querySelector('.portfolio-image');
            if (image) {
                image.style.transform = 'rotate(-1deg) scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            
            // Reset rotation
            const image = this.querySelector('.portfolio-image');
            if (image) {
                image.style.transform = 'rotate(0deg) scale(1)';
            }
        });

        // Add ripple effect on click
        item.addEventListener('mousedown', function(e) {
            createRippleEffect(e, this);
        });
    });
}

// Create ripple effect
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(15, 138, 138, 0.1);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // Add ripple keyframes if not already added
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Image handling
function initImageHandling() {
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    
    portfolioImages.forEach(img => {
        // Add loading class initially
        img.parentElement.classList.add('loading');
        
        img.addEventListener('load', function() {
            this.parentElement.classList.remove('loading');
            this.parentElement.classList.add('loaded');
            
            // Fade in effect
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            }, 100);
        });
        
        img.addEventListener('error', function() {
            // Fallback to icon if image fails to load
            this.parentElement.classList.add('icon-fallback');
            this.parentElement.classList.remove('loading');
            this.style.display = 'none';
            
            console.warn('Failed to load image:', this.src);
        });
        
        // Lazy loading for better performance
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        }
    });
}

// CTA button tracking
function initCTATracking() {
    document.querySelectorAll('.cta-buttons a, .visit-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonHref = this.href;
            
            // Analytics tracking (replace with your actual analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': buttonText,
                    'value': buttonHref
                });
            }
            
            // Console log for debugging
            console.log('Button clicked:', {
                text: buttonText,
                url: buttonHref,
                timestamp: new Date().toISOString()
            });
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animation for portfolio items
                    if (entry.target.classList.contains('portfolio-item')) {
                        const items = document.querySelectorAll('.portfolio-item');
                        const index = Array.from(items).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);

        // Observe portfolio items
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });

        // Observe other elements
        document.querySelectorAll('.section-header, .cta-content').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(element);
        });
    }

    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animationStyles);
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = requestAnimationFrame(function() {
            // Your scroll handling code here
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        });
    }, { passive: true });

    // Preload important images
    const importantImages = [
        // Add paths to your most important project images
        // 'path/to/important-project.jpg',
    ];
    
    importantImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Utility functions
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
    }
}

// Right-click to copy URL feature (bonus)
document.querySelectorAll('.visit-btn').forEach(btn => {
    btn.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        const url = this.href;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showTooltip(this, 'URL copied!');
            }).catch(err => {
                console.error('Failed to copy URL:', err);
            });
        }
    });
});

// Show tooltip function
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--text-dark);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        top: -45px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create arrow
    const arrow = document.createElement('div');
    arrow.style.cssText = `
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: var(--text-dark);
    `;
    tooltip.appendChild(arrow);
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    // Fade in
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }, 2000);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio page error:', e.error);
});

// Export functions for potential external use
window.PortfolioJS = {
    initializePortfolio,
    createRippleEffect,
    showTooltip,
    debounce,
    throttle
};