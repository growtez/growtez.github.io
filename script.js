// Services Slider (Swiper.js)
document.addEventListener('DOMContentLoaded', function () {
    // Wait for all elements to be loaded
    setTimeout(() => {
        const servicesSlider = document.querySelector('.services-slider');
        if (servicesSlider) {
            const slidesCount = servicesSlider.querySelectorAll('.swiper-slide').length;

            const swiper = new Swiper(servicesSlider, {
                loop: false, // avoid warnings when slides <= slidesPerView
                watchOverflow: false,
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 600,
                centeredSlides: false,
                grabCursor: true,
                navigation: {
                    nextEl: servicesSlider.querySelector('.swiper-button-next'),
                    prevEl: servicesSlider.querySelector('.swiper-button-prev'),
                },
                pagination: {
                    el: servicesSlider.querySelector('.swiper-pagination'),
                    clickable: true,
                    dynamicBullets: false,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '"></span>';
                    },
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        centeredSlides: true,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                        centeredSlides: false,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        centeredSlides: false,
                    },
                    1200: {
                        slidesPerView: 3, // show 3 on wide screens so navigation has room to move
                        spaceBetween: 30,
                        centeredSlides: false,
                    }
                },
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                on: {
                    init: function () {
                        console.log('Services Swiper initialized successfully', { slidesCount });
                        // Move nav arrows next to pagination dots
                        try {
                            const paginationEl = servicesSlider.querySelector('.swiper-pagination');
                            const prevEl = servicesSlider.querySelector('.swiper-button-prev');
                            const nextEl = servicesSlider.querySelector('.swiper-button-next');
                            if (paginationEl && prevEl && nextEl) {
                                paginationEl.classList.add('with-arrows');
                                // Ensure buttons are first/last in pagination line
                                paginationEl.prepend(prevEl);
                                paginationEl.appendChild(nextEl);
                            }
                        } catch (e) { /* noop */ }
                    }
                }
            });

            // Ensure Swiper recalculates sizes once images/fonts are loaded
            window.addEventListener('load', () => {
                try { swiper.update(); } catch (e) { }
            });

            // Update on container resize
            if (window.ResizeObserver) {
                const ro = new ResizeObserver(() => {
                    try { swiper.update(); } catch (e) { }
                });
                ro.observe(servicesSlider);
            } else {
                window.addEventListener('resize', () => {
                    try { swiper.update(); } catch (e) { }
                });
            }
        }
    }, 100);
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        const setMenuState = (open) => {
            hamburger.classList.toggle('active', open);
            navMenu.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', String(open));
        };

        // Click toggle
        hamburger.addEventListener('click', function () {
            const isOpen = hamburger.classList.contains('active');
            setMenuState(!isOpen);
        });

        // Keyboard accessibility: Enter/Space toggle
        hamburger.addEventListener('keydown', function (e) {
            const key = e.key || e.code;
            if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
                e.preventDefault();
                const isOpen = hamburger.classList.contains('active');
                setMenuState(!isOpen);
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setMenuState(false);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                setMenuState(false);
            }
        });
    }

    // Mobile Dropdown Toggle (click-based for touch devices)
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = this.closest('.nav-dropdown');
            const isOpen = dropdown.classList.contains('dropdown-open');

            // Close all other dropdowns first
            document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('dropdown-open'));

            // Toggle current dropdown
            if (!isOpen) {
                dropdown.classList.add('dropdown-open');
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('dropdown-open'));
        }
    });
});

// Smooth Scrolling
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

// Header Scroll Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item, .blog-card, .team-member');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .testimonial-card,
    .portfolio-item,
    .blog-card,
    .team-member {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .service-card.animate-in,
    .testimonial-card.animate-in,
    .portfolio-item.animate-in,
    .blog-card.animate-in,
    .team-member.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Form Validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        const value = field.value.trim();
        const errorElement = field.parentNode.querySelector('.error-message');

        // Remove existing error message
        if (errorElement) {
            errorElement.remove();
        }

        // Remove error styling
        field.classList.remove('error');

        if (!value) {
            isValid = false;
            field.classList.add('error');
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = `${field.getAttribute('data-name') || 'This field'} is required`;
            field.parentNode.appendChild(error);
        } else if (field.type === 'email' && !isValidEmail(value)) {
            isValid = false;
            field.classList.add('error');
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = 'Please enter a valid email address';
            field.parentNode.appendChild(error);
        }
    });

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm(this)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate form submission (replace with actual submission logic)
                setTimeout(() => {
                    // Show success message
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    this.reset();

                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                transform: translateX(450px);
                transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                background: #2ecc71;
                color: white;
            }
            
            .notification-error {
                background: #e74c3c;
                color: white;
            }
            
            .notification-info {
                background: #3498db;
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .error-message {
                color: #e74c3c;
                font-size: 0.85rem;
                margin-top: 0.5rem;
            }
            
            .form-group input.error,
            .form-group textarea.error,
            .form-group select.error {
                border-color: #e74c3c;
                box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
            }
        `;
        document.head.appendChild(notificationStyles);
    }

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Counter Animation
function animateCounter(element, target) {
    const start = 0;
    const increment = target / 100;
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);

        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Initialize counters when they come into view
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter-number');

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Portfolio Filter
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');

                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Add fade in animation
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(fadeInStyle);

// Back to Top Button
document.addEventListener('DOMContentLoaded', function () {
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: none;
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        z-index: 1000;
    `;

    document.body.appendChild(backToTop);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'translateY(20px)';
        }
    });

    // Scroll to top functionality
    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTop.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = 'none';
    });

    backToTop.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Hero Image Slider
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        let intervalId = null;
        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const showNextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        const startSlider = () => {
            if (intervalId || prefersReducedMotion || document.hidden || !heroInView) return;
            intervalId = setInterval(showNextSlide, 3000);
        };

        const stopSlider = () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };

        // Pause when page is hidden / resume when visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopSlider();
            } else {
                startSlider();
            }
        });

        // Pause when hero is out of view
        let heroInView = true;
        const heroSection = document.querySelector('.hero');
        if ('IntersectionObserver' in window && heroSection) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    heroInView = entry.isIntersecting;
                    if (heroInView) {
                        startSlider();
                    } else {
                        stopSlider();
                    }
                });
            }, { threshold: 0.2 });
            io.observe(heroSection);
        }

        // Only run the slider if the user has not requested reduced motion
        if (!prefersReducedMotion) {
            startSlider();
        }
    }
});
document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle("active");
    });
});

// Service Worker Registration (for PWA)
/* if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
} */

// Error Handling
window.addEventListener('error', function (event) {
    console.error('JavaScript error:', event.error);
    // You can send error reports to your analytics service here
});

window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled promise rejection:', event.reason);
    // You can send error reports to your analytics service here
});

// Make entire tool card clickable (desktop and mobile)
document.addEventListener('DOMContentLoaded', function () {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        const link = card.querySelector('.tool-cta');
        if (!link) return;

        // Improve accessibility
        if (!card.hasAttribute('tabindex')) {
            card.setAttribute('tabindex', '0');
        }
        card.setAttribute('role', 'link');

        // Click anywhere on the card navigates to tool page
        card.addEventListener('click', (e) => {
            // If an anchor inside was clicked, let it handle navigation
            if (e.target.closest('a')) return;
            const href = link.getAttribute('href');
            if (href) window.location.href = href;
        });

        // Keyboard support
        card.addEventListener('keydown', (e) => {
            const key = e.key || e.code;
            if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) window.location.href = href;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

console.log('DevCraft JavaScript loaded successfully!');