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
        // Custom cursor effect disabled
        return;
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

// Dynamic Titles Module
const dynamicTitles = {
    init() {
        this.setupSplitText();
        this.setupTypingEffects();
        this.setupInteractiveEffects();
        this.observeTitles();
    },

    setupSplitText() {
        const splitTextTitles = document.querySelectorAll('.section-title.split-text');
        
        splitTextTitles.forEach(title => {
            const text = title.textContent;
            title.innerHTML = '';
            
            // Split text into individual letters
            [...text].forEach((letter, index) => {
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = letter === ' ' ? '\u00A0' : letter;
                span.style.animationDelay = `${index * 0.1}s`;
                title.appendChild(span);
            });
        });
    },

    setupTypingEffects() {
        const typingTitles = document.querySelectorAll('.section-title.typing-effect');
        
        typingTitles.forEach(title => {
            const text = title.getAttribute('data-text') || title.textContent;
            title.textContent = '';
            
            let index = 0;
            const typeWriter = () => {
                if (index < text.length) {
                    title.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove typing cursor after completion
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            // Start typing when title becomes visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && title.textContent === '') {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(title);
                    }
                });
            });
            
            observer.observe(title);
        });
    },

    setupInteractiveEffects() {
        const interactiveTitles = document.querySelectorAll('.section-title.interactive');
        
        interactiveTitles.forEach(title => {
            title.addEventListener('click', () => {
                this.triggerRandomEffect(title);
            });

            title.addEventListener('mouseenter', () => {
                title.style.cursor = 'pointer';
            });
        });
    },

    triggerRandomEffect(title) {
        const effects = ['bounce', 'shake', 'rotate', 'pulse', 'flash'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        
        title.classList.add(randomEffect);
        
        setTimeout(() => {
            title.classList.remove(randomEffect);
        }, 600);
    },

    observeTitles() {
        const titles = document.querySelectorAll('.section-title');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('title-visible');
                    this.animateTitle(entry.target);
                }
            });
        }, config.observerOptions);

        titles.forEach(title => observer.observe(title));
    },

    animateTitle(title) {
        // Add staggered animation to letters if split text
        if (title.classList.contains('split-text')) {
            const letters = title.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
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
    module.exports = { app, navigation, animations, effects, utils, certificateManager };
}
