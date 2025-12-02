// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Active navigation link highlight
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced Navbar on scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Tooltip functionality
function initTooltips() {
    const tooltip = document.getElementById('tooltip');
    const tooltipTargets = document.querySelectorAll('[data-tooltip]');
    
    tooltipTargets.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            if (!tooltipText) return;
            
            tooltip.textContent = tooltipText;
            tooltip.classList.add('visible');
            
            positionTooltip(e, tooltip);
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
        
        element.addEventListener('mousemove', (e) => {
            if (tooltip.classList.contains('visible')) {
                positionTooltip(e, tooltip);
            }
        });
    });
}

function positionTooltip(event, tooltip) {
    const offset = 15;
    let x = event.pageX + offset;
    let y = event.pageY + offset;
    
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (x + tooltipRect.width > viewportWidth + window.pageXOffset) {
        x = event.pageX - tooltipRect.width - offset;
    }
    
    if (y + tooltipRect.height > viewportHeight + window.pageYOffset) {
        y = event.pageY - tooltipRect.height - offset;
    }
    
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

// Scroll Reveal Animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.nextElementSibling.textContent.includes('Uptime') ? '%' : '+');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.nextElementSibling.textContent.includes('Uptime') ? '%' : '+');
        }
    };
    
    updateCounter();
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        
        if (heroVisual && scrolled < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// Enhanced Project Card Glow Effect
function initProjectCardGlow() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = card.querySelector('.project-bg-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.2) 0%, transparent 50%)`;
            }
        });
    });
}

// Initialize all features
function init() {
    // Scroll-based features
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        handleNavbarScroll();
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize counters
    initCounters();
    
    // Initialize parallax effect
    initParallax();
    
    // Initialize project card glow
    initProjectCardGlow();
    
    // Initial calls
    updateActiveNavLink();
    handleNavbarScroll();
}

// Run when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeElement = document.activeElement;
        if (activeElement) {
            activeElement.blur();
        }
        
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.classList.remove('visible');
        }
    }
});

// Performance optimization
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

window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
    handleNavbarScroll();
}, 10));

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});