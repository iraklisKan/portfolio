// Portfolio JavaScript - Modular Approach

// DOM Elements
const elements = {
    navbar: document.querySelector('.navbar'),
    navLinks: document.querySelectorAll('a[href^="#"]'),
    sections: document.querySelectorAll('.section'),
    mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
    navLinksContainer: document.querySelector('.nav-links'),
    heroContent: document.querySelector('.hero-content'),
    hero: document.querySelector('.hero')
};

// Configuration
const config = {
    scrollThreshold: 100,
    particleCount: 20,
    observerOptions: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
};

// Utility Functions
const utils = {
    throttle: (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    },

    debounce: (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    getRandomBetween: (min, max) => Math.random() * (max - min) + min,

    createElement: (tag, className, styles = {}) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.assign(element.style, styles);
        return element;
    }
};

// Animation Module
const animations = {
    // Intersection Observer for section animations
    initSectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateChildren(entry.target);
                }
            });
        }, config.observerOptions);

        elements.sections.forEach(section => observer.observe(section));
    },

    // Animate child elements with stagger effect
    animateChildren(section) {
        const children = section.querySelectorAll('.project-card, .skill-card, .contact-item, .experience-content');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.transform = 'translateY(0) rotateX(0)';
                child.style.opacity = '1';
                child.classList.add('visible', 'animate');
            }, index * 100);
        });
    },

    // Parallax effect for hero section
    initParallax() {
        const parallaxHandler = utils.throttle(() => {
            const scrolled = window.pageYOffset;
            if (elements.hero) {
                elements.hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }, 16); // ~60fps

        window.addEventListener('scroll', parallaxHandler);
    },

    // Fade in animation for elements
    fadeInUp(element, delay = 0) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }
};

// Navigation Module
const navigation = {
    init() {
        this.handleScroll();
        this.setupSmoothScroll();
        this.setupMobileMenu();
    },

    handleScroll() {
        const scrollHandler = utils.throttle(() => {
            if (window.scrollY > config.scrollThreshold) {
                elements.navbar?.classList.add('scrolled');
            } else {
                elements.navbar?.classList.remove('scrolled');
            }
        }, 16);

        window.addEventListener('scroll', scrollHandler);
    },

    setupSmoothScroll() {
        elements.navLinks.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },

    setupMobileMenu() {
        elements.mobileMenuToggle?.addEventListener('click', () => {
            const isVisible = elements.navLinksContainer.style.display === 'flex';
            elements.navLinksContainer.style.display = isVisible ? 'none' : 'flex';
        });
    }
};

// Effects Module
const effects = {
    init() {
        this.createParticles();
        this.createCursorEffect();
        this.initHoverEffects();
    },

    createParticles() {
        const particlesContainer = utils.createElement('div', 'particles');
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < config.particleCount; i++) {
            const particle = utils.createElement('div', 'particle', {
                left: `${utils.getRandomBetween(0, 100)}%`,
                animationDelay: `${utils.getRandomBetween(0, 8)}s`,
                animationDuration: `${utils.getRandomBetween(8, 16)}s`
            });
            
            particlesContainer.appendChild(particle);
        }
    },

    createCursorEffect() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = utils.createElement('div', '', {
            position: 'fixed',
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.8), transparent)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transition: 'transform 0.1s ease'
        });

        document.body.appendChild(cursor);

        const updateCursor = utils.throttle((e) => {
            cursor.style.left = `${e.clientX - 10}px`;
            cursor.style.top = `${e.clientY - 10}px`;
        }, 16);

        document.addEventListener('mousemove', updateCursor);

        // Scale cursor on interactive elements
        this.setupCursorInteractions(cursor);
    },

    setupCursorInteractions(cursor) {
        const interactiveElements = document.querySelectorAll(
            'a, button, .project-card, .skill-card, .contact-item, .experience-content'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    },

    initHoverEffects() {
        // Add ripple effect to cards
        const cards = document.querySelectorAll('.project-card, .skill-card, .experience-content');
        
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.createRipple(e, card);
            });
        });
    },

    createRipple(event, element) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const ripple = utils.createElement('div', '', {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            width: '0',
            height: '0',
            borderRadius: '50%',
            background: 'rgba(37, 99, 235, 0.3)',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s ease-out',
            pointerEvents: 'none'
        });

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
};

// Performance Monitor
const performance = {
    init() {
        this.monitorFPS();
        this.optimizeAnimations();
    },

    monitorFPS() {
        let lastTime = performance.now();
        let frameCount = 0;

        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
                
                if (fps < 30) {
                    console.warn('Low FPS detected:', fps);
                    this.reduceAnimations();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    },

    optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition', 'none');
            config.particleCount = 5;
        }
    },

    reduceAnimations() {
        // Reduce particle count and animation complexity
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > config.particleCount / 2) {
                particle.remove();
            }
        });
    }
};

// Main App Module
const app = {
    init() {
        this.checkBrowserSupport();
        this.loadComponents();
        this.bindEvents();
    },

    checkBrowserSupport() {
        const features = {
            intersectionObserver: 'IntersectionObserver' in window,
            requestAnimationFrame: 'requestAnimationFrame' in window,
            cssGrid: CSS.supports('display', 'grid')
        };

        Object.entries(features).forEach(([feature, supported]) => {
            if (!supported) {
                console.warn(`${feature} not supported`);
            }
        });
    },

    loadComponents() {
        try {
            navigation.init();
            animations.initSectionObserver();
            animations.initParallax();
            effects.init();
            performance.init();
            
            console.log('Portfolio loaded successfully');
        } catch (error) {
            console.error('Error loading portfolio:', error);
        }
    },

    bindEvents() {
        // Window resize handler
        const resizeHandler = utils.debounce(() => {
            this.handleResize();
        }, 250);

        window.addEventListener('resize', resizeHandler);

        // Page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    },

    handleResize() {
        // Recalculate animations and layouts on resize
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Disable expensive animations on mobile
            config.particleCount = 10;
        } else {
            config.particleCount = 20;
        }
    },

    pauseAnimations() {
        // Pause animations when page is not visible
        document.documentElement.style.animationPlayState = 'paused';
    },

    resumeAnimations() {
        // Resume animations when page becomes visible
        document.documentElement.style.animationPlayState = 'running';
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Handle page load
window.addEventListener('load', () => {
    // Remove loading states, start entrance animations
    document.body.classList.add('loaded');
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { app, navigation, animations, effects, utils };
}
