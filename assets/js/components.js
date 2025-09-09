// Component loader utility
function loadComponent(componentPath, targetSelector) {
    return fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }
            return response.text();
        })
        .then(html => {
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = html;
            } else {
                console.error(`Target element not found: ${targetSelector}`);
            }
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    loadComponent('components/header.html', '#header-placeholder')
        .then(() => {
            // Initialize header functionality after loading
            initializeHeader();
        });
    
    // Load footer
    loadComponent('components/footer.html', '#footer-placeholder');
});

// Initialize header functionality
function initializeHeader() {
    const mobileMenuBtn = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}
