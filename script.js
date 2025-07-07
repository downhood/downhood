// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('navigation');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Handle scroll effects for navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('nav-backdrop');
        } else {
            nav.classList.remove('nav-backdrop');
        }
    });
    
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.className = 'fas fa-bars';
        } else {
            icon.className = 'fas fa-times';
        }
    });
    
    // Initialize animations on scroll
    initializeScrollAnimations();
    
    // Initialize intersection observer for fade-in animations
    initializeIntersectionObserver();
});

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        document.querySelector('#mobile-menu-button i').className = 'fas fa-bars';
    }
}

// Product scrolling functionality
function scrollProducts(containerId, direction) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const scrollAmount = 300;
    const currentScroll = container.scrollLeft;
    const newScroll = direction === 'left' ? 
        currentScroll - scrollAmount : 
        currentScroll + scrollAmount;
    
    container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
    });
}

// Newsletter form submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (email) {
        showToast('Thank you for subscribing!', "You'll receive our latest updates and exclusive offers.");
        form.reset();
    }
}

// Toast notification system
function showToast(title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}

// Scroll animations initialization
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animate');
                element.classList.add('animate-' + animationType);
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Intersection Observer for fade-in animations
function initializeIntersectionObserver() {
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeObserver.observe(element);
    });
}

// Product card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Lifestyle items hover effects
document.addEventListener('DOMContentLoaded', function() {
    const lifestyleItems = document.querySelectorAll('.lifestyle-item');
    
    lifestyleItems.forEach(item => {
        const img = item.querySelector('img');
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            if (img) {
                img.style.transform = 'scale(1.05)';
                img.style.filter = 'brightness(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            if (img) {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1)';
            }
        });
    });
});

// Hero parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Smooth scroll for anchor links
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

// Loading animations for images
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add loading placeholder
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
}

// Initialize image loading on DOM content loaded
document.addEventListener('DOMContentLoaded', initializeImageLoading);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.querySelector('#mobile-menu-button i').className = 'fas fa-bars';
        }
    }
    
    // Arrow keys for product scrolling (when focused on scroll containers)
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('product-scroll-container')) {
            e.preventDefault();
            const direction = e.key === 'ArrowLeft' ? 'left' : 'right';
            scrollProducts(activeElement.id, direction);
        }
    }
});

// Add focus support for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const scrollContainers = document.querySelectorAll('.product-scroll-container');
    
    scrollContainers.forEach(container => {
        container.setAttribute('tabindex', '0');
        container.setAttribute('role', 'region');
        container.setAttribute('aria-label', 'Product carousel');
    });
});

// Dynamic content loading (if needed for future enhancements)
function loadProductData() {
    // This function can be extended to load product data from an API
    // For now, it's a placeholder for future enhancements
    console.log('Product data loaded');
}

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Social media link handlers
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links i');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.className.split(' ')[1].replace('fa-', '');
            console.log(`Opening ${platform} social media page`);
            // Add actual social media URLs here
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
    initializeSocialLinks();
    loadProductData();
});

// Utility function for debouncing scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const scrolled = window.pageYOffset;
    const nav = document.getElementById('navigation');
    const heroBackground = document.querySelector('.hero-background');
    
    // Navigation backdrop effect
    if (scrolled > 100) {
        nav.classList.add('nav-backdrop');
    } else {
        nav.classList.remove('nav-backdrop');
    }
    
    // Hero parallax effect
    if (heroBackground && scrolled < window.innerHeight) {
        const rate = scrolled * -0.3;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
}, 10);

// Replace the existing scroll event listener
window.removeEventListener('scroll', optimizedScrollHandler);
window.addEventListener('scroll', optimizedScrollHandler, { passive: true });