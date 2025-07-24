// Portfolio JavaScript - Modular Approach

// DOM Elements - Cached for performance
const elements = {
    navbar: null,
    navLinks: null,
    sections: null,
    mobileMenuToggle: null,
    navLinksContainer: null,
    heroContent: null,
    hero: null,
    // Commonly queried elements cached here
    projectCards: null,
    skillCards: null,
    contactItems: null,
    experienceContent: null,
    interactiveElements: null,
    splitTextTitles: null,
    typingTitles: null,
    interactiveTitles: null,
    sectionTitles: null
};

// Initialize DOM elements cache
const initializeElements = () => {
    elements.navbar = document.querySelector('.navbar');
    elements.navLinks = document.querySelectorAll('a[href^="#"]');
    elements.sections = document.querySelectorAll('.section');
    elements.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    elements.navLinksContainer = document.querySelector('.nav-links');
    elements.heroContent = document.querySelector('.hero-content');
    elements.hero = document.querySelector('.hero');
    
    // Cache commonly queried elements
    elements.projectCards = document.querySelectorAll('.project-card');
    elements.skillCards = document.querySelectorAll('.skill-card');
    elements.contactItems = document.querySelectorAll('.contact-item');
    elements.experienceContent = document.querySelectorAll('.experience-content');
    elements.interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-item, .experience-content');
    elements.splitTextTitles = document.querySelectorAll('.section-title.split-text');
    elements.typingTitles = document.querySelectorAll('.section-title.typing-effect');
    elements.interactiveTitles = document.querySelectorAll('.section-title.interactive');
    elements.sectionTitles = document.querySelectorAll('.section-title');
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

// Global state for cleanup
const state = {
    observers: [],
    eventListeners: [],
    animationFrames: [],
    timeouts: []
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
    },

    // Performance-optimized timeout that tracks timeouts for cleanup
    setTimeout: (callback, delay) => {
        const timeoutId = setTimeout(callback, delay);
        state.timeouts.push(timeoutId);
        return timeoutId;
    },

    // Performance-optimized RAF that tracks frames for cleanup
    requestAnimationFrame: (callback) => {
        const frameId = requestAnimationFrame(callback);
        state.animationFrames.push(frameId);
        return frameId;
    },

    // Add event listener with cleanup tracking
    addEventListener: (element, event, handler, options = {}) => {
        element.addEventListener(event, handler, options);
        state.eventListeners.push({ element, event, handler, options });
    },

    // Batch DOM updates to reduce reflows
    batchDOMUpdates: (updates) => {
        const fragment = document.createDocumentFragment();
        updates.forEach(update => update(fragment));
        return fragment;
    }
};

// Animation Module
const animations = {
    observer: null,

    // Intersection Observer for section animations
    initSectionObserver() {
        if (this.observer) {
            this.observer.disconnect();
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateChildren(entry.target);
                }
            });
        }, config.observerOptions);

        state.observers.push(this.observer);
        elements.sections.forEach(section => this.observer.observe(section));
    },

    // Animate child elements with stagger effect - optimized with cached selectors
    animateChildren(section) {
        const children = section.querySelectorAll('.project-card, .skill-card, .contact-item, .experience-content');
        
        // Batch DOM updates for better performance
        children.forEach((child, index) => {
            utils.setTimeout(() => {
                // Use will-change to optimize animations
                child.style.willChange = 'transform, opacity';
                child.style.transform = 'translateY(0) rotateX(0)';
                child.style.opacity = '1';
                child.classList.add('visible', 'animate');
                
                // Remove will-change after animation
                utils.setTimeout(() => {
                    child.style.willChange = 'auto';
                }, 800);
            }, index * 100);
        });
    },

    // Parallax effect for hero section
    initParallax() {
        if (!elements.hero) return;

        const parallaxHandler = utils.throttle(() => {
            const scrolled = window.pageYOffset;
            // Use transform3d for hardware acceleration
            elements.hero.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
        }, 16); // ~60fps

        utils.addEventListener(window, 'scroll', parallaxHandler);
    },

    // Fade in animation for elements - optimized with RAF
    fadeInUp(element, delay = 0) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.willChange = 'transform, opacity';
        
        utils.setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            // Cleanup will-change
            utils.setTimeout(() => {
                element.style.willChange = 'auto';
            }, 800);
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

        utils.addEventListener(window, 'scroll', scrollHandler);
    },

    setupSmoothScroll() {
        elements.navLinks.forEach(anchor => {
            utils.addEventListener(anchor, 'click', (e) => {
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
        if (!elements.mobileMenuToggle) return;

        utils.addEventListener(elements.mobileMenuToggle, 'click', () => {
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
        
        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < config.particleCount; i++) {
            const particle = utils.createElement('div', 'particle', {
                left: `${utils.getRandomBetween(0, 100)}%`,
                animationDelay: `${utils.getRandomBetween(0, 8)}s`,
                animationDuration: `${utils.getRandomBetween(8, 16)}s`
            });
            
            fragment.appendChild(particle);
        }
        
        particlesContainer.appendChild(fragment);
        document.body.appendChild(particlesContainer);
    },

    createCursorEffect() {
        // Custom cursor effect disabled
        return;
    },

    setupCursorInteractions(cursor) {
        elements.interactiveElements.forEach(el => {
            utils.addEventListener(el, 'mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            
            utils.addEventListener(el, 'mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    },

    initHoverEffects() {
        // Use cached elements instead of querying DOM again
        const allCards = [
            ...elements.projectCards,
            ...elements.skillCards,
            ...elements.experienceContent
        ];
        
        allCards.forEach(card => {
            utils.addEventListener(card, 'click', (e) => {
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

        utils.setTimeout(() => ripple.remove(), 600);
    }
};

// Performance Monitor
const performance = {
    frameId: null,

    init() {
        this.monitorFPS();
        this.optimizeAnimations();
    },

    monitorFPS() {
        let lastTime = window.performance.now();
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
            
            this.frameId = utils.requestAnimationFrame(measureFPS);
        };

        this.frameId = utils.requestAnimationFrame(measureFPS);
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
    },

    // Cleanup method for performance monitor
    cleanup() {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }
};

// Dynamic Titles Module
const dynamicTitles = {
    observers: [],

    init() {
        this.setupSplitText();
        this.setupTypingEffects();
        this.setupInteractiveEffects();
        this.observeTitles();
    },

    setupSplitText() {
        elements.splitTextTitles.forEach(title => {
            const text = title.textContent;
            title.innerHTML = '';
            
            // Use DocumentFragment for better performance
            const fragment = document.createDocumentFragment();
            
            // Split text into individual letters
            [...text].forEach((letter, index) => {
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.style.animationDelay = `${index * 0.1}s`;
                fragment.appendChild(span);
            });
            
            title.appendChild(fragment);
        });
    },

    setupTypingEffects() {
        elements.typingTitles.forEach(title => {
            const text = title.getAttribute('data-text') || title.textContent;
            title.textContent = '';
            
            let index = 0;
            let animationId = null;
            
            // Optimized typing effect using RAF
            const typeWriter = () => {
                if (index < text.length) {
                    title.textContent += text.charAt(index);
                    index++;
                    animationId = utils.setTimeout(typeWriter, 100);
                } else {
                    // Remove typing cursor after completion
                    utils.setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            // Start typing when title becomes visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && title.textContent === '') {
                        utils.setTimeout(typeWriter, 500);
                        observer.unobserve(title);
                    }
                });
            });
            
            this.observers.push(observer);
            state.observers.push(observer);
            observer.observe(title);
        });
    },

    setupInteractiveEffects() {
        elements.interactiveTitles.forEach(title => {
            utils.addEventListener(title, 'click', () => {
                this.triggerRandomEffect(title);
            });

            utils.addEventListener(title, 'mouseenter', () => {
                title.style.cursor = 'pointer';
            });
        });
    },

    triggerRandomEffect(title) {
        const effects = ['bounce', 'shake', 'rotate', 'pulse', 'flash'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        
        title.classList.add(randomEffect);
        
        utils.setTimeout(() => {
            title.classList.remove(randomEffect);
        }, 600);
    },

    observeTitles() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('title-visible');
                    this.animateTitle(entry.target);
                }
            });
        }, config.observerOptions);

        this.observers.push(observer);
        state.observers.push(observer);
        elements.sectionTitles.forEach(title => observer.observe(title));
    },

    animateTitle(title) {
        // Add staggered animation to letters if split text
        if (title.classList.contains('split-text')) {
            const letters = title.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                utils.setTimeout(() => {
                    letter.style.transform = 'translateY(0)';
                    letter.style.opacity = '1';
                }, index * 50);
            });
        }
    }
};

// Main App Module
const app = {
    init() {
        this.checkBrowserSupport();
        initializeElements(); // Initialize cached DOM elements first
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
            dynamicTitles.init(); // Add missing dynamicTitles initialization
            
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

        utils.addEventListener(window, 'resize', resizeHandler);

        // Page visibility change
        utils.addEventListener(document, 'visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Cleanup on page unload
        utils.addEventListener(window, 'beforeunload', () => {
            this.cleanup();
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
    },

    // Cleanup method to prevent memory leaks
    cleanup() {
        // Clean up observers
        state.observers.forEach(observer => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
        });

        // Clean up event listeners
        state.eventListeners.forEach(({ element, event, handler, options }) => {
            element.removeEventListener(event, handler, options);
        });

        // Clean up animation frames
        state.animationFrames.forEach(frameId => {
            cancelAnimationFrame(frameId);
        });

        // Clean up timeouts
        state.timeouts.forEach(timeoutId => {
            clearTimeout(timeoutId);
        });

        // Clean up performance monitor
        performance.cleanup();

        // Clear state arrays
        state.observers.length = 0;
        state.eventListeners.length = 0;
        state.animationFrames.length = 0;
        state.timeouts.length = 0;

        console.log('Portfolio cleanup completed');
    }
};

// Certificate Functions
const certificateManager = {
    /**
     * View certificate in a new tab/window
     * @param {string} filename - Name of the certificate file
     */
    viewCertificate: (filename) => {
        const certificatePath = `./${filename}`;
        
        // Check if file exists by trying to load it
        const link = document.createElement('a');
        link.href = certificatePath;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        // Add some visual feedback
        const button = event.target.closest('.certificate-btn');
        if (button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        }
        
        // Open in new tab
        window.open(certificatePath, '_blank', 'noopener,noreferrer');
    },

    /**
     * Download certificate file
     * @param {string} filename - Name of the certificate file
     * @param {string} displayName - Display name for the download
     */
    downloadCertificate: (filename, displayName) => {
        const certificatePath = `./${filename}`;
        
        // Create a temporary link element for download
        const link = document.createElement('a');
        link.href = certificatePath;
        link.download = displayName || filename;
        
        // Add visual feedback
        const button = event.target.closest('.certificate-btn');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="certificate-icon">⏳</span>Downloading...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        }
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// Global functions for HTML onclick handlers
window.viewCertificate = certificateManager.viewCertificate;
window.downloadCertificate = certificateManager.downloadCertificate;

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
    module.exports = { app, navigation, animations, effects, utils, certificateManager, dynamicTitles, performance };
}
